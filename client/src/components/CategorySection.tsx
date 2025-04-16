import React, { useState } from 'react';
import { Service } from '../types';
import ServiceCard from './ServiceCard';
import { getCategoryIcon } from '../lib/icons';

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

  if (isCollapsed) {
    return (
      <section id={id} className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <i className={`${icon || getCategoryIcon(name)} mr-2 text-primary`}></i>
            {name}
          </h2>
          <button 
            className="text-sm text-gray-400 hover:text-white"
            onClick={toggleCollapse}
          >
            <i className="fas fa-chevron-up mr-1"></i>
            Expand
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <i className={`${icon || getCategoryIcon(name)} mr-2 text-primary`}></i>
          {name}
        </h2>
        <button 
          className="text-sm text-gray-400 hover:text-white"
          onClick={toggleCollapse}
        >
          <i className="fas fa-chevron-down mr-1"></i>
          Collapse
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {visibleServices.map(service => (
          <ServiceCard 
            key={service.id} 
            service={service} 
            onClick={() => onServiceClick(service)}
          />
        ))}
      </div>

      {hasMoreServices && (
        <button 
          className="mt-4 text-primary hover:text-blue-400 text-sm font-medium"
          onClick={toggleShowAll}
        >
          {showAll 
            ? "Show fewer services" 
            : `Show all ${name} services (${services.length})`}
        </button>
      )}
    </section>
  );
};

export default CategorySection;
