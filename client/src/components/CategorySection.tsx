import React, { useState } from 'react';
import { Service } from '../types';
import ServiceCard from './ServiceCard';
import { getCategoryIcon } from '../lib/icons';
import { t } from '../lib/utils';

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

  // Default to showing 4 services, rest hidden
  const [showAll, setShowAll] = useState(false);
  const visibleServices = showAll ? services : services.slice(0, 4);
  const hasMoreServices = services.length > 4;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <section id={id} className="mb-8 sm:mb-10 px-1 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-bold flex items-center">
          <i className={`${icon || getCategoryIcon(name)} mr-2 text-primary`}></i>
          {name}
        </h2>
        <button 
          className="text-xs sm:text-sm text-gray-400 hover:text-white"
          onClick={toggleCollapse}
        >
          <i className={`fas ${isCollapsed ? 'fa-chevron-up' : 'fa-chevron-down'} mr-1`}></i>
          {isCollapsed ? t('expand') : t('collapse')}
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

          {hasMoreServices && (
            <button 
              className="mt-4 text-primary hover:text-blue-400 text-xs sm:text-sm font-medium"
              onClick={toggleShowAll}
            >
              {showAll 
                ? t('showLessCategory')
                : t('showAllCategory', { category: name, count: services.length })}
            </button>
          )}
        </>
      )}
    </section>
  );
};

export default CategorySection;
