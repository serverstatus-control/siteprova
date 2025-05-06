import React from 'react';
import { Link } from 'wouter';
import { Service } from '../types';
import StatusBadge from './StatusBadge';
import { getServiceIcon } from '../lib/icons';
import { useSettings } from '@/hooks/use-settings';
import { Button } from '@/components/ui/button';
import { Star, StarOff } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatTimeAgo } from '@/lib/utils';

interface ServiceCardProps {
  service: Service;
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  const {
    id,
    name,
    logo,
    status,
    responseTime,
    lastChecked,
    slug
  } = service;

  const { isFavorite, addFavorite, removeFavorite, t, language } = useSettings();
  const isFav = isFavorite(id);

  // Create a status history visualization with 7 days
  const statusHistory = [];
  for (let i = 0; i < 7; i++) {
    let statusClass = 'bg-success';
    
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
    formatTimeAgo(lastChecked, language) : 
    t.unknown || 'Unknown';

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isFav) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  return (
    <div className="relative overflow-hidden transition-all duration-300 border rounded-lg bg-card border-border hover:border-border/80 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 group">
      <div className="p-4" onClick={onClick}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 mr-3 transition-transform duration-300 rounded-full bg-background group-hover:scale-110 group-hover:shadow-md">
              <i className={`${logo || getServiceIcon(name)} text-lg transition-all duration-300 group-hover:text-primary`}></i>
            </div>
            <h3 className="font-medium transition-colors duration-300 group-hover:text-primary">{name}</h3>
          </div>
          <StatusBadge status={status} className="transition-transform duration-300 group-hover:scale-105" />
        </div>
        <div className="mb-3 text-xs text-muted-foreground">
          <div className="flex items-center justify-between mb-1 transition-colors duration-300 group-hover:text-foreground">
            <span>{t.lastCheck}:</span>
            <span className="font-mono">{formattedLastChecked}</span>
          </div>
          <div className="flex items-center justify-between transition-colors duration-300 group-hover:text-foreground">
            <span>{t.responseTime || 'Response time'}:</span>
            <span className="font-mono">{status === 'down' ? 'Timeout' : `${responseTime}ms`}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {statusHistory}
        </div>
      </div>

      <div className="flex items-center gap-2 px-2 pb-2">
        <Link 
          to={`/services/${slug}`} 
          className="flex-1 px-4 py-2 text-sm text-center transition-all duration-300 rounded-full bg-muted hover:bg-background focus:z-10 group-hover:bg-primary/10 group-hover:text-primary"
        >
          {t.viewDetails || 'View Details'}
        </Link>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`relative z-10 rounded-full border border-border transition-all duration-300
                  ${isFav 
                    ? 'text-amber-400 hover:border-amber-400 hover:-translate-y-1' 
                    : 'text-gray-400 hover:text-amber-400 hover:border-amber-400 hover:-translate-y-1'}
                  group flex items-center justify-center w-9 h-9`}
                onClick={handleFavoriteToggle}
                tabIndex={0}
                aria-label={isFav ? t.removeFromFavorites : t.addToFavorites}
                onMouseDown={e => e.stopPropagation()}
                onTouchStart={e => e.stopPropagation()}
              >
                {isFav ? (
                  <Star className="w-5 h-5 transition-transform duration-300 fill-amber-400 drop-shadow" />
                ) : (
                  <StarOff className="w-5 h-5 transition-all duration-300" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              {isFav ? t.removeFromFavorites : t.addToFavorites}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ServiceCard;
