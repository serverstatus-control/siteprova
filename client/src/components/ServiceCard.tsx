import React from 'react';
import { Link } from 'wouter';
import { Service } from '../types';
import StatusBadge from './StatusBadge';
import { getServiceIcon } from '../lib/icons';
import { useSettings } from '@/hooks/use-settings';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Star, StarOff } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { formatTimeAgo } from '@/lib/utils';

interface ServiceCardProps {
  service: Service;
  onClick?: () => void;
}

const ServiceCard = ({ service, onClick }: ServiceCardProps) => {
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
  const { user } = useAuth();
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
      <span key={i} className={`inline-block w-2 h-8 ${statusClass} rounded-sm`} />
    );
  }

  const formattedLastChecked = lastChecked ? 
    formatTimeAgo(lastChecked, language) : 
    t.unknown || 'Unknown';

  const { toast } = useToast();

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!user) {
      toast({
        title: t.error || "Error",
        description: "Devi effettuare l'accesso per aggiungere servizi ai preferiti",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Toggling favorite for service:', id, 'Current state:', isFav);
      if (isFav) {
        await removeFavorite(id);
      } else {
        await addFavorite(id);
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      toast({
        title: "Errore",
        description: error instanceof Error ? error.message : "Errore nell'aggiornamento dei preferiti",
        variant: "destructive",
      });
    }
  };

  return (
    <div 
        className="relative w-full overflow-hidden transition-all duration-300 border rounded-lg bg-card border-border hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 group cursor-pointer"
        onClick={(e) => { e.preventDefault(); if (onClick) onClick(); }}
        aria-label={t.viewDetails || 'View Details'}
        role="button"
        tabIndex={0}>
      
      <div className="relative flex flex-col h-full pb-16">
        <div className="flex items-start justify-between p-4 mb-2">
          <div className="flex items-start flex-1 min-w-0 mr-4">
            <div className="flex items-center justify-center w-10 h-10 mr-3 transition-transform duration-300 rounded-lg bg-background group-hover:scale-110 group-hover:shadow-md shrink-0">
              <i className={`${logo || getServiceIcon(name)} text-xl transition-all duration-300 group-hover:text-primary`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium leading-tight transition-colors duration-300 group-hover:text-primary">{name}</h3>
            </div>
          </div>
          <StatusBadge status={status} className="transition-transform duration-300 group-hover:scale-105 shrink-0" />
        </div>
        
        <div className="grid gap-2 px-4 mb-4 text-sm text-muted-foreground">
          <div className="grid grid-cols-[auto,1fr] items-center gap-x-4 transition-colors duration-300 group-hover:text-foreground">
            <span className="flex items-center whitespace-nowrap">
              <i className="mr-2 text-xs far fa-clock opacity-70" />
              {t.lastCheck}:
            </span>
            <span className="min-w-0 font-mono font-medium text-right break-all">{formattedLastChecked}</span>
          </div>
          <div className="grid grid-cols-[auto,1fr] items-center gap-x-4 transition-colors duration-300 group-hover:text-foreground">
            <span className="flex items-center whitespace-nowrap">
              <i className="mr-2 text-xs fas fa-tachometer-alt opacity-70" />
              {t.responseTime || 'Response time'}:
            </span>
            <span className="font-mono font-medium text-right">{status === 'down' ? 'Timeout' : `${responseTime}ms`}</span>
          </div>
        </div>
        
        <div className="flex items-center px-4 mb-2 space-x-1.5">
          {statusHistory}
        </div>

        <div className="absolute bottom-0 left-0 right-0 transition-all duration-300 border-t border-border/50 bg-muted/50 backdrop-blur-sm group-hover:bg-primary">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2.5 text-sm font-semibold text-foreground group-hover:text-primary-foreground">
              <i className="fas fa-chart-line" />
              <span>{t.viewDetails || 'View Details'}</span>
              <i className="transition-all duration-300 opacity-50 fas fa-chevron-right group-hover:opacity-100 group-hover:translate-x-1.5" />
            </div>

            <TooltipProvider>
              <Tooltip>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`relative z-50 w-8 h-8 rounded-full border border-border transition-all duration-300
                      ${isFav 
                        ? 'text-amber-400 hover:border-amber-400 hover:-translate-y-1' 
                        : 'text-gray-400 hover:text-amber-400 hover:border-amber-400 hover:-translate-y-1'}
                      group flex items-center justify-center hover:bg-background/50`}
                    onClick={(e) => { e.stopPropagation(); handleFavoriteToggle(e); }}
                    aria-label={isFav ? t.removeFromFavorites : t.addToFavorites}
                  >
                    {isFav ? (
                      <Star className="w-4 h-4 transition-transform duration-300 fill-amber-400 drop-shadow" />
                    ) : (
                      <StarOff className="w-4 h-4 transition-all duration-300" />
                    )}
                  </Button>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
