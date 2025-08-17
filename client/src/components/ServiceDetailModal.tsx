import React from 'react';
import { Link, useLocation } from 'wouter';
import StatusBadge from './StatusBadge';
import { Service, UptimeHistory, Incident } from '../types';
import { getServiceIcon } from '../lib/icons';
import { formatTimeAgo } from '../lib/utils';
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
  const [_, navigate] = useLocation();
  const { t, language } = useSettings();

  const handleBackToDashboard = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    navigate('/siteprova/');
  };

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
    uptimePercentage,
    slug 
  } = service;

  const formattedLastChecked = lastChecked ? 
    formatTimeAgo(lastChecked, language) : 
    t.unknown || 'Unknown';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60">
      <div className="relative w-[95vw] max-w-2xl bg-dark-light rounded-lg shadow-xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="sticky top-0 z-10 flex items-center justify-end p-4 border-b bg-dark-light/80 backdrop-blur-sm border-dark-lighter">
          <button 
            onClick={onClose} 
            className="p-2 transition-all duration-200 rounded-lg group hover:bg-dark-lighter focus:outline-none focus:ring-2 focus:ring-primary/40"
            aria-label="Chiudi"
          >
            <i className="transition-colors duration-200 fas fa-times text-muted-foreground group-hover:text-foreground"></i>
          </button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto scrollbar-hide">
          <div className="mb-4">
            <Link 
              href={`/siteprova/services/${slug}`}
              onClick={(e) => {
                e.preventDefault();
                onClose();
                navigate(`/siteprova/services/${slug}`);
              }}
              className="inline-flex items-center gap-3 mb-3 text-sm text-primary hover:text-primary/80"
            >
              <i className={(logo || getServiceIcon(name)) + " text-2xl"}></i>
              {t.viewDetails || 'View Details'}
            </Link>
          </div>
+
          <div>
+            <h3 className="text-xl font-bold">{name}</h3>
+            <div className="flex items-center mt-1">
+              <StatusBadge status={status} className="mr-2" />
+              <span className="text-xs text-gray-400">{t.lastCheck} {formattedLastChecked}</span>
+            </div>
+          </div>
+
          <div className="grid grid-cols-2 gap-4 mb-6 sm:grid-cols-3">
            <div className="p-4 rounded-lg bg-dark-lighter">
              <p className="mb-1 text-xs text-gray-400">{t.responseTime || 'Response Time'}</p>
              <p className="font-mono text-lg">{status === 'down' ? 'Timeout' : `${responseTime}ms`}</p>
            </div>
            <div className="p-4 rounded-lg bg-dark-lighter">
              <p className="mb-1 text-xs text-gray-400">{t.uptime30d || 'Uptime (30d)'}</p>
              <p className="font-mono text-lg">{uptimePercentage}%</p>
            </div>
            <div className="col-span-2 p-4 rounded-lg bg-dark-lighter sm:col-span-1">
              <p className="mb-1 text-xs text-gray-400">{t.lastOutage || 'Last Outage'}</p>
              <p className="font-mono text-base truncate">
                {incidents.length > 0 
                  ? formatTimeAgo(incidents[0].startTime, language)
                  : t.noRecentOutages || 'No recent outages'}
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href={`/siteprova/services/${slug}`}
              onClick={(e) => {
                e.preventDefault();
                onClose();
                navigate(`/siteprova/services/${slug}`);
              }}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md text-primary hover:text-primary/80 hover:bg-muted/50"
            >
              {t.viewDetails || 'View Details'} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailModal;
