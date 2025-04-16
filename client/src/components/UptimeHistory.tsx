import React from 'react';
import { UptimeHistory } from '../types';
import { format } from 'date-fns';

interface UptimeHistoryProps {
  history: UptimeHistory[];
}

const UptimeHistoryDisplay: React.FC<UptimeHistoryProps> = ({ history }) => {
  // Sort history by date, newest first
  const sortedHistory = [...history].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getStatusColor = (status: string, percentage: number) => {
    if (status === 'down') return 'bg-danger';
    if (status === 'degraded' || percentage < 95) return 'bg-warning';
    return 'bg-success';
  };

  const getTextColor = (status: string, percentage: number) => {
    if (status === 'down') return 'text-danger';
    if (status === 'degraded' || percentage < 95) return 'text-warning';
    return 'text-success';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return format(date, 'MMM d');
    }
  };

  return (
    <div className="space-y-2">
      {sortedHistory.map((item, index) => {
        const statusColor = getStatusColor(item.status, item.uptimePercentage);
        const textColor = getTextColor(item.status, item.uptimePercentage);
        const displayDate = formatDate(item.date);
        
        return (
          <div key={index}>
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-gray-400">{displayDate}</p>
              <p className={`text-xs font-mono ${textColor}`}>{item.uptimePercentage}%</p>
            </div>
            <div className="flex items-center space-x-1">
              {item.uptimePercentage === 100 ? (
                <span className={`inline-block w-full h-2 ${statusColor} rounded-sm`}></span>
              ) : (
                <>
                  <span className={`inline-block h-2 bg-success rounded-sm`} style={{ width: `${item.uptimePercentage}%` }}></span>
                  <span className={`inline-block h-2 ${item.status === 'down' ? 'bg-danger' : 'bg-warning'} rounded-sm`} style={{ width: `${100 - item.uptimePercentage}%` }}></span>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UptimeHistoryDisplay;
