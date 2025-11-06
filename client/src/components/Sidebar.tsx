import React from 'react';
import { useLocation } from 'wouter';
import { Category, Service, StatusSummary } from '../types';
import { useSettings } from '@/hooks/use-settings';
import { getCategoryIconComponent } from '@/lib/categoryIcons';
import { formatTimeAgo } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

interface SidebarProps {
  categories: Category[];
  statusSummary: StatusSummary | null;
}

const Sidebar: React.FC<SidebarProps> = ({ categories, statusSummary }) => {
  const { t, language } = useSettings();
  const [_, navigate] = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    const element = document.getElementById(slug);
    if (element) {
      const offset = 100; // Offset in pixel per mostrare meglio l'header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

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

  // Traduci il nome della categoria
  const getCategoryTranslation = (categoryName: string): string => {
    const key = categoryName.toLowerCase().replace(/[^a-z]/g, '') as keyof typeof t;
    const translation = t[key];
    return typeof translation === 'string' ? translation : categoryName;
  };

  const isOperational = statusSummary?.operational ?? 0;
  const isDegraded = statusSummary?.degraded ?? 0;
  const isDown = statusSummary?.down ?? 0;

  return (
    <aside id="sidebar" className="hidden lg:block w-64 bg-dark-light border-r border-dark-lighter overflow-y-auto scrollbar-hide fixed top-[64px] h-[calc(100vh-64px)]">
      <nav className="p-3">
        <div className="mb-3">
          <div className="mb-1.5 text-xs font-semibold tracking-wider text-gray-400 uppercase">{t.serverStatus}</div>
          <div className="p-2.5 mb-2 rounded-lg bg-dark-lighter">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium">{t.overall || 'Overall Status'}</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-20 text-success">
                {isDown > 0 
                  ? t.partialOutage || 'Partial Outage'
                  : isDegraded > 0 
                    ? t.degraded
                    : t.operational
                }
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">{t.lastCheck}</span>
              <span className="font-mono text-xs text-gray-400">{formattedLastUpdate}</span>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="mb-1.5 text-xs font-semibold tracking-wider text-gray-400 uppercase">{t.categories || 'Categories'}</div>
          <ul className="space-y-0.5">
            {categories.map(category => (
              <li key={category.id}>
                <a 
                  href={`#${category.slug}`}
                  onClick={(e) => handleCategoryClick(e, category.slug)}
                  className="flex items-center px-2.5 py-1.5 text-sm text-gray-300 rounded-md cursor-pointer hover:bg-dark-lighter transition-colors"
                >
                  <span className="flex items-center justify-center w-4 mr-2">{getCategoryIconComponent(category.name, 'w-4 h-4')}</span>
                  <span className="flex-1 truncate">{getCategoryTranslation(category.name)}</span>
                  <span className="ml-2 text-xs text-gray-500 shrink-0">{servicesByCategory[category.id]?.length || 0}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Sezione Links sempre visibile anche su desktop/tablet */}
        <div className="mt-3">
          <div className="mb-1.5 text-xs font-semibold tracking-wider text-gray-400 uppercase">{t.links || 'Links'}</div>
          <ul className="space-y-0.5">
            <li>
              <button 
                className="flex items-center w-full px-2.5 py-1.5 text-sm font-normal text-left text-gray-300 transition-all duration-200 rounded-md hover:bg-dark-lighter hover:text-primary focus:outline-none focus:ring-1 focus:ring-primary/40"
                onClick={() => handleNavigate('/info')}
              >
                <i className="w-4 mr-2 text-sm transition-transform duration-200 fas fa-info-circle"></i>
                <span>{t.infoAndContacts}</span>
              </button>
            </li>
            <li>
              <button 
                className="flex items-center w-full px-2.5 py-1.5 text-sm font-normal text-left text-gray-300 transition-all duration-200 rounded-md hover:bg-dark-lighter hover:text-primary focus:outline-none focus:ring-1 focus:ring-primary/40"
                onClick={() => handleNavigate('/updates')}
              >
                <i className="w-4 mr-2 text-sm fas fa-clock-rotate-left"></i>
                <span>{t.siteUpdates}</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
