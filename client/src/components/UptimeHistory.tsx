import React from 'react';
import { UptimeHistory } from '../types';
import { format } from 'date-fns';
import { it, enUS, es, fr, de, pt, ru, zhCN, ja, Locale } from 'date-fns/locale';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useSettings } from '@/hooks/use-settings';

interface UptimeHistoryProps {
  history: UptimeHistory[];
}

const localeMap: Record<string, Locale> = {
  it, en: enUS, es, fr, de, pt, ru, zh: zhCN, ja
};

const UptimeHistoryDisplay: React.FC<UptimeHistoryProps> = ({ history }) => {
  const { t, language } = useSettings();

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
    const locale = localeMap[language] || enUS;
    return format(date, 'd MMM HH:mm', { locale });
  };

  return (
    <TooltipProvider>
      <div className="space-y-3">
        {sortedHistory.map((item, index) => {
          const statusColor = getStatusColor(item.status, item.uptimePercentage);
          const textColor = getTextColor(item.status, item.uptimePercentage);
          const displayDate = formatDate(item.date);
          const tooltipText = `${item.uptimePercentage}% uptime - ${item.status.charAt(0).toUpperCase() + item.status.slice(1)}`;
          return (
            <div key={index} className="flex items-center gap-3">
              <span className="text-xs text-gray-400 w-16">{displayDate}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex-1 flex items-center h-4 cursor-pointer">
                    {item.uptimePercentage === 100 ? (
                      <span className={`inline-block h-3 w-full ${statusColor} rounded-full transition-all`}></span>
                    ) : (
                      <>
                        <span className={`inline-block h-3 rounded-l-full ${item.uptimePercentage > 0 ? 'bg-success' : ''}`} style={{ width: `${item.uptimePercentage}%` }}></span>
                        <span className={`inline-block h-3 rounded-r-full ${item.status === 'down' ? 'bg-danger' : 'bg-warning'}`} style={{ width: `${100 - item.uptimePercentage}%` }}></span>
                      </>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  {tooltipText}
                </TooltipContent>
              </Tooltip>
              <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${statusColor} bg-opacity-80 text-white font-semibold shadow`}>
                {item.uptimePercentage}%
              </span>
            </div>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default UptimeHistoryDisplay;
