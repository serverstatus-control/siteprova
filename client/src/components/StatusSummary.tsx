import React from 'react';
import { StatusSummary } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { apiRequest } from '../lib/queryClient';
import { useToast } from '../hooks/use-toast';

interface StatusSummaryProps {
  summary: StatusSummary;
  onCheckNow: () => void;
  isChecking: boolean;
}

const StatusSummaryComponent: React.FC<StatusSummaryProps> = ({ 
  summary, 
  onCheckNow,
  isChecking 
}) => {
  const { toast } = useToast();
  const total = summary?.operational + summary?.degraded + summary?.down || 0;

  const operationalPercentage = total > 0 
    ? (summary.operational / total) * 100 
    : 0;

  const degradedPercentage = total > 0 
    ? (summary.degraded / total) * 100 
    : 0;

  const downPercentage = total > 0 
    ? (summary.down / total) * 100 
    : 0;

  const formattedLastChecked = summary?.lastChecked
    ? formatDistanceToNow(new Date(summary.lastChecked), { addSuffix: true })
    : 'Unknown';

  const handleCheckNow = async () => {
    if (isChecking) return;

    try {
      onCheckNow();
      toast({
        title: "Service Check",
        description: "Checking all services...",
      });
    } catch (error) {
      console.error("Failed to check services:", error);
      toast({
        title: "Error",
        description: "Failed to check services. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="bg-dark-light p-4 md:p-6 border-b border-dark-lighter">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-dark-lighter rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-400">Operational</h3>
              <span className="text-2xl font-bold text-success">{summary?.operational || 0}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-success h-2 rounded-full" 
                style={{ width: `${operationalPercentage}%` }}
              ></div>
            </div>
          </div>
          <div className="bg-dark-lighter rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-400">Degraded</h3>
              <span className="text-2xl font-bold text-warning">{summary?.degraded || 0}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-warning h-2 rounded-full" 
                style={{ width: `${degradedPercentage}%` }}
              ></div>
            </div>
          </div>
          <div className="bg-dark-lighter rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-400">Down</h3>
              <span className="text-2xl font-bold text-danger">{summary?.down || 0}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-danger h-2 rounded-full" 
                style={{ width: `${downPercentage}%` }}
              ></div>
            </div>
          </div>
          <div className="bg-dark-lighter rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-400">Last Check</h3>
              <span className="text-sm font-mono text-gray-300">{formattedLastChecked}</span>
            </div>
            <button 
              className={`mt-2 w-full ${isChecking ? 'bg-gray-600' : 'bg-primary hover:bg-blue-600'} text-white py-1 px-3 rounded text-sm transition`}
              onClick={handleCheckNow}
              disabled={isChecking}
            >
              {isChecking ? 'Checking...' : 'Check Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusSummaryComponent;