import React from 'react';
import { Link } from 'wouter';
import { Service } from '../types';
import StatusBadge from './StatusBadge';
import { formatDistanceToNow } from 'date-fns';
import { getServiceIcon } from '../lib/icons';
import { useSettings } from '@/hooks/use-settings';
import { Button } from '@/components/ui/button';
import { Star, StarOff } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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

  const { isFavorite, addFavorite, removeFavorite, t } = useSettings();
  const isFav = isFavorite(id);

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
    <div className="relative bg-card rounded-lg overflow-hidden border border-border hover:border-border/80 transition-all">
      <div className="p-4" onClick={onClick}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-background rounded-full flex items-center justify-center mr-3">
              <i className={`${logo || getServiceIcon(name)} text-lg`}></i>
            </div>
            <h3 className="font-medium">{name}</h3>
          </div>
          <StatusBadge status={status} />
        </div>
        <div className="text-xs text-muted-foreground mb-3">
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
      <div className="flex items-center">
        <Link to={`/services/${slug}`} className="block flex-1 bg-muted py-2 px-4 text-center text-sm hover:bg-background transition-colors">
          View Details
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-full rounded-none aspect-square border-l border-border z-10 transition-all duration-200
                  ${isFav ? 'bg-amber-100/20 hover:bg-amber-200/40' : 'bg-muted hover:bg-background'}
                  group`} 
                onClick={handleFavoriteToggle}
                tabIndex={0}
                aria-label={isFav ? t.removeFromFavorites : t.addToFavorites}
                onMouseDown={e => e.stopPropagation()}
                onTouchStart={e => e.stopPropagation()}
              >
                {isFav ? (
                  <Star className="h-6 w-6 text-amber-400 fill-amber-400 drop-shadow group-hover:scale-110 transition-transform duration-200" />
                ) : (
                  <StarOff className="h-6 w-6 text-gray-400 group-hover:text-amber-400 transition-colors duration-200" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isFav ? t.removeFromFavorites : t.addToFavorites}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ServiceCard;
