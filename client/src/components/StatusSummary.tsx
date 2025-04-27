import React from 'react';
import { StatusSummary } from '../types';
import { formatTimeAgo } from '../lib/utils';
import { apiRequest } from '../lib/queryClient';
import { useToast } from '../hooks/use-toast';
import { useSettings } from "@/hooks/use-settings";

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
  const { t, language } = useSettings();
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
    ? formatTimeAgo(summary.lastChecked, language)
    : t.unknown || 'Unknown';

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
    <div className="bg-dark-light p-3 md:p-5 border-b border-dark-lighter">
      <div className="container mx-auto">
        <h1 className="text-xl md:text-2xl font-extrabold text-primary drop-shadow mb-1 text-center md:text-left">{t.dashboard || "Dashboard"}</h1>
        <p className="text-gray-400 text-sm md:text-base mb-4 text-center md:text-left">{t.dashboardDescription || "Controlla lo stato dei servizi in tempo reale e ricevi aggiornamenti immediati."}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-dark-lighter rounded-lg p-4 shadow hover:shadow-lg transition-all flex flex-col items-center text-center">
            <div className="flex items-center justify-between w-full mb-2">
              <h3 className="text-xs font-medium text-gray-400">{t.operational}</h3>
              <span className="text-xl font-bold text-success">{summary?.operational || 0}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
              <div 
                className="bg-success h-2 rounded-full transition-all" 
                style={{ width: `${operationalPercentage}%` }}
              ></div>
            </div>
          </div>
          <div className="bg-dark-lighter rounded-lg p-4 shadow hover:shadow-lg transition-all flex flex-col items-center text-center">
            <div className="flex items-center justify-between w-full mb-2">
              <h3 className="text-xs font-medium text-gray-400">{t.degraded}</h3>
              <span className="text-xl font-bold text-warning">{summary?.degraded || 0}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
              <div 
                className="bg-warning h-2 rounded-full transition-all" 
                style={{ width: `${degradedPercentage}%` }}
              ></div>
            </div>
          </div>
          <div className="bg-dark-lighter rounded-lg p-4 shadow hover:shadow-lg transition-all flex flex-col items-center text-center">
            <div className="flex items-center justify-between w-full mb-2">
              <h3 className="text-xs font-medium text-gray-400">{t.down}</h3>
              <span className="text-xl font-bold text-danger">{summary?.down || 0}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
              <div 
                className="bg-danger h-2 rounded-full transition-all" 
                style={{ width: `${downPercentage}%` }}
              ></div>
            </div>
          </div>
          <div className="bg-dark-lighter rounded-lg p-4 shadow hover:shadow-lg transition-all flex flex-col items-center text-center">
            <div className="flex items-center justify-between w-full mb-2">
              <h3 className="text-xs font-medium text-gray-400">{t.lastCheck}</h3>
              <span className="text-xs font-mono text-gray-300">{formattedLastChecked}</span>
            </div>
            <button 
              className={`mt-3 w-full ${isChecking ? 'bg-gray-600' : 'bg-primary hover:bg-blue-600'} text-white py-1 px-2 rounded text-xs font-semibold transition`}
              onClick={handleCheckNow}
              disabled={isChecking}
            >
              {isChecking ? (t.checkingNow || 'Checking...') : (t.checkNow || 'Check Now')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusSummaryComponent;