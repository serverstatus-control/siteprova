import React, { useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Service, UptimeHistory, Incident, Category, StatusSummary } from '../types';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileMenu from '../components/MobileMenu';
import Footer from '../components/Footer';
import StatusBadge from '../components/StatusBadge';
import UptimeHistoryDisplay from '../components/UptimeHistory';
import { formatDistanceToNow, format } from 'date-fns';
import { getServiceIcon } from '../lib/icons';
import { formatTimeAgo, localeMap } from '@/lib/utils';
import { useSettings } from '@/hooks/use-settings';

const ServiceDetail: React.FC = () => {
  const [match, params] = useRoute('/services/:slug');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { 
    data: categories = [],
    isLoading: isCategoriesLoading
  } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const { 
    data: statusSummary = null,
    isLoading: isSummaryLoading
  } = useQuery<StatusSummary>({
    queryKey: ['/api/status-summary'],
  });

  const { 
    data: service,
    isLoading: isServiceLoading,
    error: serviceError
  } = useQuery<Service>({
    queryKey: [`/api/services/${params?.slug}`],
    enabled: !!params?.slug,
  });

  const { 
    data: services = [],
    isLoading: isServicesLoading
  } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  const { 
    data: history = [],
    isLoading: isHistoryLoading
  } = useQuery<UptimeHistory[]>({
    queryKey: [`/api/services/${service?.id}/history`],
    enabled: !!service?.id,
  });

  const { 
    data: incidents = [],
    isLoading: isIncidentsLoading
  } = useQuery<Incident[]>({
    queryKey: [`/api/services/${service?.id}/incidents`],
    enabled: !!service?.id,
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const { t, language } = useSettings();

  const formatIncidentDate = (startTime: string, endTime: string | null) => {
    const start = format(new Date(startTime), 'MMM d, yyyy - HH:mm', { locale: localeMap[language] });
    if (!endTime) return `${start} ${t.toPresent || 'to present'}`;
    return `${start} ${t.to || 'to'} ${format(new Date(endTime), 'HH:mm', { locale: localeMap[language] })}`;
  };

  const isLoading = isCategoriesLoading || isSummaryLoading || 
                   isServiceLoading || isHistoryLoading || 
                   isIncidentsLoading || isServicesLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading service details...</div>
      </div>
    );
  }

  if (serviceError || !service) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white text-xl">Service not found</div>
      </div>
    );
  }

  const formattedLastChecked = service.lastChecked ? 
    formatTimeAgo(service.lastChecked, language) : 
    t.unknown || 'Unknown';

  return (
    <div className="bg-dark text-gray-100 font-sans min-h-screen">
      <Header 
        onMenuToggle={toggleMobileMenu} 
        onSearch={handleSearch}
        services={services}
      />
      
      <div className="flex min-h-[calc(100vh-64px)]">
        <Sidebar categories={categories} statusSummary={statusSummary} />
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={toggleMobileMenu} 
          categories={categories}
          statusSummary={statusSummary}
        />
        
        <main className="flex-1 lg:ml-64 pb-12">
          <div className="container mx-auto px-4 py-6">
            <div className="mb-6">
              <a href="/" className="text-primary hover:text-blue-400 mb-4 inline-flex items-center">
                <i className="fas fa-arrow-left mr-2"></i>
                Back to Dashboard
              </a>
              
              <div className="bg-dark-light p-6 rounded-lg border border-dark-lighter mt-4">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-dark-lighter rounded-full flex items-center justify-center mr-6">
                    <i className={`${service.logo || getServiceIcon(service.name)} text-3xl`}></i>
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold">{service.name}</h1>
                    <div className="flex items-center mt-2">
                      <StatusBadge status={service.status} className="mr-3" />
                      <span className="text-sm text-gray-400">{t.lastCheck}: {formattedLastChecked}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-4">{t.currentStatus || 'Current Status'}</h2>
                    <div className="bg-dark-lighter rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-400 mb-1">{t.responseTime || 'Response Time'}</p>
                          <p className="font-mono text-lg">
                            {service.status === 'down' ? 'Timeout' : `${service.responseTime}ms`}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-1">{t.uptime30d || 'Uptime (30 days)'}</p>
                          <p className="font-mono text-lg">{service.uptimePercentage}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-1">{t.lastOutage || 'Last Outage'}</p>
                          <p className="font-mono text-lg">
                            {incidents.length > 0 
                              ? formatTimeAgo(incidents[0].startTime, language)
                              : t.noRecentOutages || 'No recent outages'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-1">{t.avgResponse || 'Avg. Response'}</p>
                          <p className="font-mono text-lg">
                            {service.status === 'down' 
                              ? 'N/A' 
                              : `${Math.round(history.reduce((sum, item) => sum + item.responseTime, 0) / (history.length || 1))}ms`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-semibold mb-4">{t.uptimeHistory || 'Uptime History'}</h2>
                    <div className="bg-dark-lighter rounded-lg p-4">
                      {history.length > 0 ? (
                        <UptimeHistoryDisplay history={history} />
                      ) : (
                        <p className="text-sm text-gray-400">{t.noHistoryAvailable || 'No history available'}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold mb-4">{t.recentIncidents || 'Recent Incidents'}</h2>
                  <div className="bg-dark-lighter rounded-lg p-4">
                    {incidents.length > 0 ? (
                      <div className="space-y-4">
                        {incidents.map((incident) => (
                          <div key={incident.id} className="pb-4 border-b border-gray-700 last:border-0 last:pb-0">
                            <div className="flex items-start">
                              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full bg-${incident.status === 'down' ? 'danger' : 'warning'} bg-opacity-20 text-${incident.status === 'down' ? 'danger' : 'warning'} mt-0.5 mr-3`}>
                                <i className={`fas fa-${incident.status === 'down' ? 'exclamation-circle' : 'exclamation-triangle'} text-sm`}></i>
                              </span>
                              <div>
                                <h5 className="font-medium mb-1">{incident.title}</h5>
                                <p className="text-sm text-gray-400 mb-2">{incident.description}</p>
                                <div className="text-xs text-gray-500 font-mono">
                                  {formatIncidentDate(incident.startTime, incident.endTime)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">{t.noIncidentsReported || 'No incidents reported'}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default ServiceDetail;
