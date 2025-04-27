import React from 'react';
import { Category, Service, StatusSummary } from '../types';
import { useSettings } from '@/hooks/use-settings';
import { formatTimeAgo } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

interface SidebarProps {
  categories: Category[];
  statusSummary: StatusSummary | null;
}

const Sidebar: React.FC<SidebarProps> = ({ categories, statusSummary }) => {
  const { t, language } = useSettings();

  // Ottieni i servizi per ogni categoria
  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  const formattedLastUpdate = statusSummary?.lastChecked 
    ? formatTimeAgo(statusSummary.lastChecked, language)
    : t.unknown || 'Unknown';

  // Raggruppa i servizi per categoria
  const servicesByCategory = services.reduce<Record<number, Service[]>>((acc, service) => {
    if (!acc[service.categoryId]) {
      acc[service.categoryId] = [];
    }
    acc[service.categoryId].push(service);
    return acc;
  }, {});

  const isOperational = statusSummary?.operational ?? 0;
  const isDegraded = statusSummary?.degraded ?? 0;
  const isDown = statusSummary?.down ?? 0;

  return (
    <aside id="sidebar" className="hidden lg:block w-64 bg-dark-light border-r border-dark-lighter overflow-y-auto fixed top-[64px] h-[calc(100vh-64px)]">
      <nav className="p-4">
        <div className="mb-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">{t.serverStatus}</div>
          <div className="bg-dark-lighter rounded-lg p-3 mb-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{t.overall || 'Overall Status'}</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-20 text-success">
                {isDown > 0 
                  ? t.partialOutage || 'Partial Outage'
                  : isDegraded > 0 
                    ? t.degraded
                    : t.operational
                }
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t.lastCheck}</span>
              <span className="text-xs text-gray-400 font-mono">{formattedLastUpdate}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">{t.categories || 'Categorie'}</div>
          <ul>
            {categories.map(category => (
              <li key={category.id} className="mb-1">
                <a href={`#${category.slug}`} className="flex items-center px-3 py-2 text-sm rounded-md text-gray-300 hover:bg-dark-lighter cursor-pointer">
                  <i className={`${category.icon} w-5 mr-2`}></i>
                  <span>{category.name}</span>
                  <span className="ml-auto text-xs text-gray-500">{servicesByCategory[category.id]?.length || 0}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
