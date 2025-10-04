import React from 'react';
import { Link, useLocation } from 'wouter';
import { Category, StatusSummary } from '../types';
import { getCategoryIconComponent } from '@/lib/categoryIcons';
import { useAuth } from '@/hooks/use-auth';
import { useSettings } from '@/hooks/use-settings';
import { UserRole } from '@shared/schema';
import { formatTimeAgo } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  statusSummary: StatusSummary | null;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  onClose, 
  categories, 
  statusSummary 
}) => {
  const { user, logoutMutation } = useAuth();
  const [_, navigate] = useLocation();
  const { t, language } = useSettings();

  const formattedLastUpdate = statusSummary?.lastChecked 
    ? formatTimeAgo(statusSummary.lastChecked, language)
    : t.unknown || 'Unknown';

  const handleLogout = () => {
    logoutMutation.mutate();
    onClose();
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const getCategoryTranslation = (categoryName: string): string => {
    const key = categoryName.toLowerCase().replace(/[^a-z]/g, '') as keyof typeof t;
    const translation = t[key];
    return typeof translation === 'string' ? translation : categoryName;
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 lg:hidden ${isOpen ? '' : 'pointer-events-none'}`}>
      <div 
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ease-in-out
          ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      ></div>
      
      <div className={`absolute top-0 right-0 w-[80vw] max-w-[270px] min-w-[150px] h-full bg-dark-light transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{fontSize: 'clamp(0.93rem, 1.7vw, 1.01rem)', wordBreak: 'break-word'}}
      >
        <div className="p-2">
          <div className="mb-4">
            <div className="mb-1 overflow-x-auto text-xs font-semibold tracking-wider text-gray-400 uppercase whitespace-nowrap">{t.serverStatus}</div>
            <div className="p-2 rounded bg-dark-lighter transition-all duration-200 hover:bg-dark-lighter/80 hover:scale-[1.02] cursor-pointer">
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-xs font-medium whitespace-nowrap">{t.overall}</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-20 text-success whitespace-nowrap transition-colors duration-200">
                  {statusSummary?.down && statusSummary.down > 0 
                    ? t.partialOutage
                    : statusSummary?.degraded && statusSummary.degraded > 0 
                      ? t.degraded
                      : t.operational
                  }
                </span>
              </div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs font-medium whitespace-nowrap">{t.lastCheck}</span>
                <span className="font-mono text-xs text-gray-400 whitespace-nowrap">{formattedLastUpdate}</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="mb-1 overflow-x-auto text-xs font-semibold tracking-wider text-gray-400 uppercase whitespace-nowrap">{t.categories}</div>
            <ul>
              {categories.map(category => (
                <li key={category.id} className="mb-0.5">
                  <a 
                    href={`#${category.slug}`} 
                    className="flex items-center px-2 py-1.5 text-xs text-gray-300 rounded transition-all duration-200 hover:bg-dark-lighter hover:text-primary hover:translate-x-1 focus:outline-none focus:ring-1 focus:ring-primary/40 gap-2 overflow-x-auto min-w-0"
                    onClick={onClose}
                  >
                    <span className="flex-shrink-0 w-5 mr-1 transition-transform duration-200">
                      {getCategoryIconComponent(category.name, 'w-5 h-5')}
                    </span>
                    <span className="truncate max-w-[110px]">{getCategoryTranslation(category.name)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <div className="mb-1 text-xs font-semibold tracking-wider text-gray-400 uppercase">{t.links || 'Links'}</div>
            <ul>
              <li className="mb-0.5">
                  <button 
                    className="flex items-center w-full px-2 py-1.5 text-xs text-left text-gray-300 rounded transition-all duration-200 hover:bg-dark-lighter hover:text-primary hover:translate-x-1 focus:outline-none focus:ring-1 focus:ring-primary/40"
                    onClick={() => handleNavigate('/info')}
                  >
                  <i className="w-5 mr-1 transition-transform duration-200 fas fa-info-circle group-hover:scale-110"></i>
                  <span>{t.infoAndContacts}</span>
                </button>
              </li>
              <li className="mb-0.5">
                  <button 
                    className="flex items-center w-full px-2 py-1.5 text-xs text-left text-gray-300 rounded transition-all duration-200 hover:bg-dark-lighter hover:text-primary hover:translate-x-1 focus:outline-none focus:ring-1 focus:ring-primary/40"
                    onClick={() => handleNavigate('/updates')}
                  >
                  <i className="w-5 mr-1 transition-transform duration-200 fas fa-history group-hover:scale-110"></i>
                  <span>{t.updates}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Other: Settings e Account in fondo */}
          <div className="mt-4">
            <div className="mb-1 text-xs font-semibold tracking-wider text-gray-400 uppercase">Other</div>
            <ul>
              <li className="mb-0.5">
                <button 
                  className="flex items-center w-full px-2 py-1.5 text-xs text-left text-gray-300 rounded transition-all duration-200 hover:bg-dark-lighter hover:text-primary hover:translate-x-1 focus:outline-none focus:ring-1 focus:ring-primary/40"
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('open-settings-dialog'));
                    onClose();
                  }}
                >
                  <i className="w-5 mr-2 transition-transform duration-200 fas fa-cog group-hover:scale-110"></i>
                  <span>{t.settings || 'Impostazioni'}</span>
                </button>
              </li>
              <li className="mb-0.5">
                  <button 
                    className="flex items-center w-full px-2 py-1.5 text-xs text-left text-gray-300 rounded transition-all duration-200 hover:bg-dark-lighter hover:text-primary hover:translate-x-1 focus:outline-none focus:ring-1 focus:ring-primary/40"
                    onClick={() => handleNavigate('/account-dashboard')}
                  >
                  <i className="w-5 mr-2 transition-transform duration-200 fas fa-user group-hover:scale-110"></i>
                  <span>Account</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
