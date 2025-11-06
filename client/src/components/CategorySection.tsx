import React, { useState, useMemo, useCallback, memo, useDeferredValue } from 'react';
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

const CategorySectionComponent: React.FC<CategorySectionProps> = ({ 
  name, 
  icon, 
  services, 
  id, 
  onServiceClick 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sortBy, setSortBy] = useState<'alpha' | 'status' | 'responseTime' | 'uptimePercentage'>('status');
  const { t } = useSettings();

  // Defer sorting for better interaction responsiveness
  const deferredSortBy = useDeferredValue(sortBy);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const translatedCategoryName = useMemo(() => {
    const key = name.toLowerCase().replace(/[^a-z]/g, '') as keyof Translation;
    const translation = t[key];
    return typeof translation === 'string' ? translation : name;
  }, [name, t]);

  const sortedServices = useMemo(() => {
    const next = [...services];
    return next.sort((a, b) => {
      switch (deferredSortBy) {
        case 'alpha':
          return a.name.localeCompare(b.name);
        case 'status': {
          const statusOrder = { down: 0, degraded: 1, operational: 2 };
          return statusOrder[a.status] - statusOrder[b.status];
        }
        case 'responseTime':
          return a.responseTime - b.responseTime;
        case 'uptimePercentage':
          return b.uptimePercentage - a.uptimePercentage;
        default:
          return 0;
      }
    });
  }, [services, deferredSortBy]);

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value as typeof sortBy);
  }, []);

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
          {translatedCategoryName}
          <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-down'} ml-2 text-sm opacity-60 group-hover:opacity-100`}></i>
        </button>
        
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Select
              value={sortBy}
              onValueChange={handleSortChange}
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {sortedServices.map(service => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onClick={() => onServiceClick(service)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

CategorySectionComponent.displayName = 'CategorySection';

export default memo(CategorySectionComponent);
