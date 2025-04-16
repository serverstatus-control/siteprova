import React from 'react';
import { Link } from 'wouter';
import { Service } from '../types';
import StatusBadge from './StatusBadge';
import { formatDistanceToNow } from 'date-fns';
import { getServiceIcon } from '../lib/icons';

interface ServiceCardProps {
  service: Service;
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  const {
    name,
    logo,
    status,
    responseTime,
    lastChecked,
    slug
  } = service;

  // Create a status history visualization with 7 days
  const statusHistory = [];
  for (let i = 0; i < 7; i++) {
    let statusClass = 'bg-success';
    
    // Simulate history based on current status
    if (status === 'degraded' && i < 2) {
      statusClass = 'bg-warning';
    } else if (status === 'down' && i < 4) {
      statusClass = i < 3 ? 'bg-danger' : 'bg-warning';
    }
    
    statusHistory.push(
      <span key={i} className={`inline-block w-2 h-8 ${statusClass} rounded-sm`}></span>
    );
  }

  const formattedLastChecked = lastChecked ? 
    formatDistanceToNow(new Date(lastChecked), { addSuffix: false }) + ' ago' : 
    'Unknown';

  return (
    <div className="bg-dark-light rounded-lg overflow-hidden border border-dark-lighter hover:border-gray-600 transition-all">
      <div className="p-4" onClick={onClick}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-dark-lighter rounded-full flex items-center justify-center mr-3">
              <i className={logo || getServiceIcon(name)}></i>
            </div>
            <h3 className="font-medium">{name}</h3>
          </div>
          <StatusBadge status={status} />
        </div>
        <div className="text-xs text-gray-400 mb-3">
          <div className="flex items-center justify-between mb-1">
            <span>Last check:</span>
            <span className="font-mono">{formattedLastChecked}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Response time:</span>
            <span className="font-mono">{status === 'down' ? 'Timeout' : `${responseTime}ms`}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {statusHistory}
        </div>
      </div>
      <Link to={`/services/${slug}`} className="block bg-dark-lighter py-2 px-4 text-center text-sm hover:bg-dark-light">
        View Details
      </Link>
    </div>
  );
};

export default ServiceCard;
