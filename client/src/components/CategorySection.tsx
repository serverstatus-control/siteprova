import React, { useState } from 'react';
import { Service } from '../types';
import ServiceCard from './ServiceCard';
import { t } from '../lib/utils';
import { Server, Cloud, Globe, Users, Database, Shield, Monitor, Activity, Wifi, ShoppingCart, Music, Film, Gamepad, Mail, Bot, Star, Wrench, AlertTriangle } from "lucide-react";

// Mappa nome categoria -> icona Lucide
const categoryIcons: Record<string, React.ReactNode> = {
  server: <Server className="w-5 h-5" />,
  cloud: <Cloud className="w-5 h-5" />,
  web: <Globe className="w-5 h-5" />,
  social: <Users className="w-5 h-5" />,
  database: <Database className="w-5 h-5" />,
  security: <Shield className="w-5 h-5" />,
  monitoring: <Monitor className="w-5 h-5" />,
  performance: <Activity className="w-5 h-5" />,
  network: <Wifi className="w-5 h-5" />,
  shop: <ShoppingCart className="w-5 h-5" />,
  music: <Music className="w-5 h-5" />,
  video: <Film className="w-5 h-5" />,
  game: <Gamepad className="w-5 h-5" />,
  mail: <Mail className="w-5 h-5" />,
  ai: <Bot className="w-5 h-5" />,
  star: <Star className="w-5 h-5" />,
  tool: <Wrench className="w-5 h-5" />,
  alert: <AlertTriangle className="w-5 h-5" />,
};

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

  // Mostra sempre tutti i servizi
  const visibleServices = services;
  const hasMoreServices = false;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <section id={id} className="mb-8 sm:mb-10 px-1 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-bold flex items-center">
          <span className="mr-2 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-400 shadow-lg transition-transform duration-300 hover:scale-110">
            {categoryIcons[name.toLowerCase()] || <Server className="w-5 h-5 text-white" />}
          </span>
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
        </>
      )}
    </section>
  );
};

export default CategorySection;
