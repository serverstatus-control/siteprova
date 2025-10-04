import React, { useState } from 'react';
import { Service } from '../types';
import ServiceCard from './ServiceCard';
import { useSettings, type Translation } from '@/hooks/use-settings';
import { getCategoryIconComponent } from '@/lib/categoryIcons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownWideNarrow, ArrowUpAZ, Clock, TrendingUp } from "lucide-react";

interface CategorySectionProps {
  name: string;
  icon: string;
  services: Service[];
  id: string;
  onServiceClick: (service: Service) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ 
  name, 
  icon, 
  services, 
  id, 
  onServiceClick 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sortBy, setSortBy] = useState<'alpha' | 'status' | 'responseTime' | 'uptimePercentage'>('status');
  const { t, language } = useSettings();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Traduci il nome della categoria
  const getCategoryTranslation = (categoryName: string): string => {
    // Ottieni la chiave di traduzione dal nome della categoria
    const key = categoryName.toLowerCase().replace(/[^a-z]/g, '') as keyof Translation;
    // Usa la traduzione se disponibile e se è una stringa, altrimenti usa il nome originale
    const translation = t[key];
    return (typeof translation === 'string' ? translation : categoryName);
  };

  // Ordina i servizi in base al criterio selezionato
  const sortedServices = [...services].sort((a, b) => {
    switch (sortBy) {
      case 'alpha':
        return a.name.localeCompare(b.name);
      case 'status':
        // Prima i down, poi i degraded, poi gli operational
        const statusOrder = { down: 0, degraded: 1, operational: 2 };
        return statusOrder[a.status] - statusOrder[b.status];
      case 'responseTime':
        // I più veloci prima (tempo di risposta minore)
        return a.responseTime - b.responseTime;
      case 'uptimePercentage':
        // Uptime maggiore prima
        return b.uptimePercentage - a.uptimePercentage;
      default:
        return 0;
    }
  });

  return (
    <section id={id} className="px-1 mb-8 sm:mb-10 sm:px-0">
      <div className="flex flex-col gap-2 mb-3 sm:flex-row sm:items-center sm:justify-between sm:mb-4 sm:gap-0">
        <button 
          onClick={toggleCollapse}
          className="flex items-center text-lg font-bold transition-colors sm:text-xl hover:text-primary group"
        >
          <span className="flex items-center justify-center w-8 h-8 mr-2 text-white transition-transform duration-300 rounded-full shadow-lg bg-gradient-to-br from-primary to-blue-400 group-hover:scale-110">
            {getCategoryIconComponent(name, 'w-5 h-5 text-white')}
          </span>
          {getCategoryTranslation(name)}
          <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-down'} ml-2 text-sm opacity-60 group-hover:opacity-100`}></i>
        </button>
        
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as typeof sortBy)}
            >
              <SelectTrigger className="w-[180px] h-9">
                <SelectValue placeholder={t.sortBy + "..."} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="status">
                  <div className="flex items-center gap-2">
                    <ArrowDownWideNarrow className="w-4 h-4" />
                    <span>{t.firstDown}</span>
                  </div>
                </SelectItem>
                <SelectItem value="alpha">
                  <div className="flex items-center gap-2">
                    <ArrowUpAZ className="w-4 h-4" />
                    <span>{t.alphabetical}</span>
                  </div>
                </SelectItem>
                <SelectItem value="responseTime">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{t.responseTime}</span>
                  </div>
                </SelectItem>
                <SelectItem value="uptimePercentage">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>{t.uptimePercentage}</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {!isCollapsed && (
        <>
          <div className="w-full overflow-x-auto">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {sortedServices.map(service => (
                <div
                  key={service.id}
                  className={`mb-3 ${service.name === 'Fascicolo Sanitario' ? 'ml-2' : ''}`}
                >
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default CategorySection;
