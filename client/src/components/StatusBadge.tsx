import React from 'react';
import { ServiceStatus } from '../types';

interface StatusBadgeProps {
  status: ServiceStatus;
  className?: string;
}

const getStatusInfo = (status: ServiceStatus): { label: string; bgColor: string; textColor: string } => {
  switch (status) {
    case 'operational':
      return { 
        label: 'Up', 
        bgColor: 'bg-success bg-opacity-20', 
        textColor: 'text-success' 
      };
    case 'degraded':
      return { 
        label: 'Degraded', 
        bgColor: 'bg-warning bg-opacity-20', 
        textColor: 'text-warning' 
      };
    case 'down':
      return { 
        label: 'Down', 
        bgColor: 'bg-danger bg-opacity-20', 
        textColor: 'text-danger' 
      };
    default:
      return { 
        label: 'Unknown', 
        bgColor: 'bg-gray-400 bg-opacity-20', 
        textColor: 'text-gray-400' 
      };
  }
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const { label, bgColor, textColor } = getStatusInfo(status);

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor} ${className}`}>
      <span className={`w-1.5 h-1.5 ${textColor.replace('text-', 'bg-')} rounded-full mr-1`}></span>
      {label}
    </span>
  );
};

export default StatusBadge;
