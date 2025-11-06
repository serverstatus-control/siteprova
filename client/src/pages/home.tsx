import React, { useState, useEffect, Suspense, lazy, useMemo, useCallback, useDeferredValue } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';
import { Category, Service, ServiceWithDetails, UptimeHistory, Incident } from '../types';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileMenu from '../components/MobileMenu';
import CategorySection from '../components/CategorySection';
import StatusSummary from '../components/StatusSummary';
import Footer from '../components/Footer';
import { apiRequest } from '../lib/queryClient';
import { useSettings } from '../hooks/use-settings';

// Lazy loading per componenti non critici
const ServiceDetailModal = lazy(() => import('../components/ServiceDetailModal'));

const Home: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [serviceHistory, setServiceHistory] = useState<UptimeHistory[]>([]);
  const [serviceIncidents, setServiceIncidents] = useState<Incident[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useSettings();

  // Fetch categories
  const { 
    data: categories = [],
    isLoading: isCategoriesLoading
  } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
    staleTime: 10 * 60 * 1000, // 10 minuti - i dati delle categorie cambiano raramente
  });

  // Fetch services
  const { 
    data: services = [],
    isLoading: isServicesLoading
  } = useQuery<Service[]>({
    queryKey: ['/api/services'],
    staleTime: 2 * 60 * 1000, // 2 minuti
  });

  // Fetch status summary
  const { 
    data: statusSummary = null,
    isLoading: isSummaryLoading,
    refetch: refetchSummary
  } = useQuery<import('../types').StatusSummary | null>({
    queryKey: ['/api/status-summary'],
    refetchInterval: 30000, // Aggiorna ogni 30 secondi
    staleTime: 25000, // Considera i dati "stale" dopo 25 secondi
    refetchOnMount: 'always'
  });

  // Check now mutation
  const { mutate: checkNow, isPending: isChecking } = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/check-now', {});
      // server returns { message, lastChecked }
      return res.json();
    },
    onSuccess: () => {
      // Invalida e forza il refetch della cache rilevante
      queryClient.invalidateQueries({ queryKey: ['/api/status-summary'] });
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
      // opzionale: richiedi il refetch immediato
      refetchSummary();
    }
  });

  // Fetch service details when a service is selected
  useEffect(() => {
    if (!selectedService) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const fetchDetails = async () => {
      try {
        const [historyRes, incidentsRes] = await Promise.all([
          fetch(`/api/services/${selectedService.id}/history`, {
            credentials: 'include',
            signal,
          }),
          fetch(`/api/services/${selectedService.id}/incidents`, {
            credentials: 'include',
            signal,
          }),
        ]);

        if (signal.aborted) {
          return;
        }

        const [historyData, incidentsData] = await Promise.all([
          historyRes.json(),
          incidentsRes.json(),
        ]);

        setServiceHistory(historyData);
        setServiceIncidents(incidentsData);
      } catch (err) {
        if ((err as Error).name === 'AbortError') {
          return;
        }
        console.error('Error fetching service details:', err);
      }
    };

    fetchDetails();

    return () => {
      controller.abort();
    };
  }, [selectedService]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleServiceClick = useCallback((service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleCheckNow = useCallback(() => {
    checkNow();
  }, [checkNow]);

  // Filter services based on search term
  const filteredServices = useMemo(() => {
    const normalizedSearch = deferredSearchTerm.trim().toLowerCase();
    if (!normalizedSearch) {
      return services;
    }

    return services.filter((service) =>
      service.name.toLowerCase().includes(normalizedSearch)
    );
  }, [services, deferredSearchTerm]);

  // Group services by category
  const servicesByCategory = useMemo(() => {
    return filteredServices.reduce<Record<number, Service[]>>((acc, service) => {
      if (!acc[service.categoryId]) {
        acc[service.categoryId] = [];
      }
      acc[service.categoryId].push(service);
      return acc;
    }, {});
  }, [filteredServices]);

  // Show loading state
  if (isCategoriesLoading || isServicesLoading || isSummaryLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark">
        <div className="text-xl text-white">{t.loadingData}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans text-gray-100 bg-dark">
      <Header onMenuToggle={toggleMobileMenu} onSearch={handleSearch} services={services} />
      
      <div className="flex min-h-[calc(100vh-64px)]">
        <Sidebar categories={categories} statusSummary={statusSummary} />
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={toggleMobileMenu} 
          categories={categories}
          statusSummary={statusSummary}
        />
        
        <main className="flex-1 pb-12 lg:ml-64">
          <StatusSummary 
            summary={statusSummary} 
            onCheckNow={handleCheckNow}
            isChecking={isChecking} 
          />
          
          <div className="container px-4 py-6 mx-auto">
            {searchTerm && filteredServices.length === 0 ? (
              <div className="py-10 text-center">
                <p className="mb-2 text-gray-400">No services found matching "{searchTerm}"</p>
                <button 
                  className="text-primary hover:text-blue-400"
                  onClick={() => setSearchTerm('')}
                >
                  Clear search
                </button>
              </div>
            ) : (
              categories.map(category => {
                const categoryServices = servicesByCategory[category.id] || [];
                if (categoryServices.length === 0) return null;
                
                return (
                  <CategorySection 
                    key={category.id}
                    id={category.slug}
                    name={category.name}
                    icon={category.icon}
                    services={categoryServices}
                    onServiceClick={handleServiceClick}
                  />
                );
              })
            )}
          </div>
        </main>
      </div>
      
      <Footer />
      
      {isModalOpen && (
        <Suspense fallback={
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="w-8 h-8 border-b-2 border-white rounded-full animate-spin"></div>
          </div>
        }>
          <ServiceDetailModal 
            service={selectedService}
            history={serviceHistory}
            incidents={serviceIncidents}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Home;
