import React from 'react';
import StatusBadge from './StatusBadge';
import UptimeHistoryDisplay from './UptimeHistory';
import { Service, UptimeHistory, Incident } from '../types';
import { format } from 'date-fns';
import { getServiceIcon } from '../lib/icons';
import { formatTimeAgo, localeMap } from '../lib/utils';
import { useSettings } from '@/hooks/use-settings';

interface ServiceDetailModalProps {
  service: Service | null;
  history: UptimeHistory[];
  incidents: Incident[];
  isOpen: boolean;
  onClose: () => void;
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ 
  service, 
  history, 
  incidents, 
  isOpen, 
  onClose 
}) => {
  // Aggiungi gestore tasto ESC
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!service || !isOpen) return null;

  const { 
    name, 
    logo, 
    status, 
    responseTime, 
    lastChecked, 
    uptimePercentage 
  } = service;

  const { t, language } = useSettings();
  
  const formattedLastChecked = lastChecked ? 
    formatTimeAgo(lastChecked, language) : 
    t.unknown || 'Unknown';

  const formatIncidentDate = (startTime: string, endTime: string | null) => {
    const start = format(new Date(startTime), 'MMM d, yyyy - HH:mm', { locale: localeMap[language] });
    if (!endTime) return `${start} ${t.toPresent || 'to present'}`;
    return `${start} ${t.to || 'to'} ${format(new Date(endTime), 'HH:mm', { locale: localeMap[language] })}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60">
      <div className="relative w-[95vw] max-w-3xl bg-dark-light rounded-lg shadow-xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="sticky top-0 z-10 flex items-center justify-end p-4 bg-dark-light/80 backdrop-blur-sm border-b border-dark-lighter">
          <button 
            onClick={onClose} 
            className="group p-2 transition-all duration-200 rounded-lg hover:bg-dark-lighter focus:outline-none focus:ring-2 focus:ring-primary/40"
            aria-label="Chiudi"
          >
            <svg 
              className="w-6 h-6 transition-colors duration-200 text-muted-foreground group-hover:text-foreground" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto scrollbar-hide">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-dark-lighter rounded-full flex items-center justify-center mr-4">
              <i className={logo || getServiceIcon(name) + " text-2xl"}></i>
            </div>
            <div>
              <h3 className="text-xl font-bold">{name}</h3>
              <div className="flex items-center mt-1">
                <StatusBadge status={status} className="mr-2" />
                <span className="text-xs text-gray-400">{t.lastCheck} {formattedLastChecked}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">Current Status</h4>
            <div className="bg-dark-lighter rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">{t.responseTime || 'Response Time'}</p>
                  <p className="font-mono text-lg">{status === 'down' ? 'Timeout' : `${responseTime}ms`}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Uptime (30 days)</p>
                  <p className="font-mono text-lg">{uptimePercentage}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Last Outage</p>
                  <p className="font-mono text-lg">
                    {incidents.length > 0 
                      ? formatTimeAgo(incidents[0].startTime, language) 
                      : 'No recent outages'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Avg. Response</p>
                  <p className="font-mono text-lg">
                    {status === 'down' 
                      ? 'N/A' 
                      : `${Math.round(history.reduce((sum, item) => sum + item.responseTime, 0) / (history.length || 1))}ms`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">Uptime History</h4>
            <div className="bg-dark-lighter rounded-lg p-4">
              {history.length > 0 ? (
                <UptimeHistoryDisplay history={history} />
              ) : (
                <p className="text-sm text-gray-400">No history available</p>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">Recent Incidents</h4>
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
                <p className="text-sm text-gray-400">No incidents reported</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-dark-lighter flex justify-end gap-3 bg-dark-lighter/50 backdrop-blur-sm">
          <button 
            className="px-4 py-2 text-sm font-medium text-white transition-all duration-200 rounded-md bg-primary hover:bg-primary/90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            {t.subscribeToUpdates || 'Subscribe to Updates'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailModal;
