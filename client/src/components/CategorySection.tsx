import React, { useState } from 'react';
import { Service } from '../types';
import ServiceCard from './ServiceCard';
import { useSettings, type Translation } from '@/hooks/use-settings';
import { getCategoryIconComponent } from '@/lib/categoryIcons';

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
    // Usa la traduzione se disponibile, altrimenti usa il nome originale
    return t[key] || categoryName;
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
        
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="relative px-3 py-2 pr-8 text-sm border rounded-md outline-none appearance-none cursor-pointer h-9 text-muted-foreground bg-background hover:bg-accent hover:text-accent-foreground border-input hover:border-primary focus:ring-1 focus:ring-primary"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em'
            }}
          >
            <option value="status" className="py-2">
              🔴 Prima i down
            </option>
            <option value="alpha" className="py-2">
              🔤 Ordine alfabetico
            </option>
            <option value="responseTime" className="py-2">
              ⚡ Tempo di risposta
            </option>
            <option value="uptimePercentage" className="py-2">
              📈 Uptime %
            </option>
          </select>
        </div>
      </div>

      {!isCollapsed && (
        <>
          <div className="w-full overflow-x-auto">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {sortedServices.map((service: Service) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  onClick={() => onServiceClick(service)}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default CategorySection;
