import React, { useState } from 'react';
import { Service } from '../types';
import ServiceCard from './ServiceCard';
import { useSettings } from '@/hooks/use-settings';
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
  const { t } = useSettings();

  const visibleServices = services;
  const hasMoreServices = false;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Traduci il nome della categoria
  const getCategoryTranslation = (categoryName: string): string => {
    const key = categoryName.toLowerCase().replace(/[^a-z]/g, '') as keyof typeof t;
    return t[key] || categoryName;
  };

  return (
    <section id={id} className="mb-8 sm:mb-10 px-1 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-bold flex items-center">
          <span className="mr-2 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-400 shadow-lg transition-transform duration-300 hover:scale-110 text-white">
            {getCategoryIconComponent(name, 'w-5 h-5 text-white')}
          </span>
          {getCategoryTranslation(name)}
        </h2>
        <button 
          className="text-xs sm:text-sm text-gray-400 hover:text-white"
          onClick={toggleCollapse}
        >
          <i className={`fas ${isCollapsed ? 'fa-chevron-up' : 'fa-chevron-down'} mr-1`}></i>
          {isCollapsed ? t.expand : t.collapse}
        </button>
      </div>

      {!isCollapsed && (
        <>
          <div className="w-full overflow-x-auto">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-w-[260px]">
              {visibleServices.map(service => (
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
