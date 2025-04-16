import React from 'react';
import StatusBadge from './StatusBadge';
import UptimeHistoryDisplay from './UptimeHistory';
import { Service, UptimeHistory, Incident } from '../types';
import { formatDistanceToNow, format } from 'date-fns';
import { getServiceIcon } from '../lib/icons';

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
  if (!service || !isOpen) return null;

  const { 
    name, 
    logo, 
    status, 
    responseTime, 
    lastChecked, 
    uptimePercentage 
  } = service;

  const formattedLastChecked = lastChecked ? 
    formatDistanceToNow(new Date(lastChecked), { addSuffix: false }) + ' ago' : 
    'Unknown';

  const formatIncidentDate = (startTime: string, endTime: string | null) => {
    const start = format(new Date(startTime), 'MMM d, yyyy - HH:mm');
    if (!endTime) return start + ' to present';
    return start + ' to ' + format(new Date(endTime), 'HH:mm');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-dark-light rounded-lg max-w-2xl w-full mx-4 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-dark-lighter flex items-center justify-between">
          <h2 className="font-bold text-lg">Service Details</h2>
          <button className="text-gray-400 hover:text-white" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-dark-lighter rounded-full flex items-center justify-center mr-4">
              <i className={logo || getServiceIcon(name) + " text-2xl"}></i>
            </div>
            <div>
              <h3 className="text-xl font-bold">{name}</h3>
              <div className="flex items-center mt-1">
                <StatusBadge status={status} className="mr-2" />
                <span className="text-xs text-gray-400">Updated {formattedLastChecked}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">Current Status</h4>
            <div className="bg-dark-lighter rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Response Time</p>
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
                      ? formatDistanceToNow(new Date(incidents[0].startTime), { addSuffix: true }) 
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
        <div className="p-4 border-t border-dark-lighter text-right">
          <button className="bg-dark-lighter hover:bg-gray-700 text-white py-2 px-4 rounded text-sm mr-2">
            View Full History
          </button>
          <button className="bg-primary hover:bg-blue-600 text-white py-2 px-4 rounded text-sm">
            Subscribe to Updates
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailModal;
