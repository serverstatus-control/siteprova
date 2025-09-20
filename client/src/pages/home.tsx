import React, { useState, useEffect, Suspense, lazy } from 'react';
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

// Lazy loading per componenti non critici
const ServiceDetailModal = lazy(() => import('../components/ServiceDetailModal'));

const Home: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [serviceHistory, setServiceHistory] = useState<UptimeHistory[]>([]);
  const [serviceIncidents, setServiceIncidents] = useState<Incident[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch categories
  const { 
    data: categories = [],
    isLoading: isCategoriesLoading
  } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  // Fetch services
  const { 
    data: services = [],
    isLoading: isServicesLoading
  } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  // Fetch status summary
  const { 
    data: statusSummary = null,
    isLoading: isSummaryLoading,
    refetch: refetchSummary
  } = useQuery<import('../types').StatusSummary | null>({
    queryKey: ['/api/status-summary'],
    refetchInterval: 30000, // Aggiorna ogni 30 secondi
    staleTime: 29000, // Considera i dati "stale" dopo 29 secondi
    refetchOnMount: true
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
    if (selectedService) {
      // Fetch service history
      fetch(`/api/services/${selectedService.id}/history`, { credentials: 'include' })
        .then(res => res.json())
        .then(data => setServiceHistory(data))
        .catch(err => console.error('Error fetching service history:', err));

      // Fetch service incidents
      fetch(`/api/services/${selectedService.id}/incidents`, { credentials: 'include' })
        .then(res => res.json())
        .then(data => setServiceIncidents(data))
        .catch(err => console.error('Error fetching service incidents:', err));
    }
  }, [selectedService]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCheckNow = () => {
    checkNow();
  };

  // Filter services based on search term
  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group services by category
  const servicesByCategory: Record<number, Service[]> = {};
  filteredServices.forEach(service => {
    if (!servicesByCategory[service.categoryId]) {
      servicesByCategory[service.categoryId] = [];
    }
    servicesByCategory[service.categoryId].push(service);
  });

  // Show loading state
  if (isCategoriesLoading || isServicesLoading || isSummaryLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="bg-dark text-gray-100 font-sans min-h-screen">
      <Header onMenuToggle={toggleMobileMenu} onSearch={handleSearch} services={services} />
      
      <div className="flex min-h-[calc(100vh-64px)]">
        <Sidebar categories={categories} statusSummary={statusSummary} />
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={toggleMobileMenu} 
          categories={categories}
          statusSummary={statusSummary}
        />
        
        <main className="flex-1 lg:ml-64 pb-12">
          <StatusSummary 
            summary={statusSummary} 
            onCheckNow={handleCheckNow}
            isChecking={isChecking} 
          />
          
          <div className="container mx-auto px-4 py-6">
            {searchTerm && filteredServices.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-400 mb-2">No services found matching "{searchTerm}"</p>
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
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
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
