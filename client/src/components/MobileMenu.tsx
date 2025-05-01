import React from 'react';
import { Link, useLocation } from 'wouter';
import { Category, StatusSummary } from '../types';
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
    return t[key] || categoryName;
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 lg:hidden ${isOpen ? '' : 'pointer-events-none'}`}>
      <div 
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ease-in-out
          ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      ></div>
      
      <div className={`absolute top-0 right-0 w-64 h-full bg-dark-light transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="p-4">
          <div className="mb-6">
            <div className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">{t.serverStatus}</div>
            <div className="p-3 rounded-lg bg-dark-lighter">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{t.overall}</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-20 text-success">
                  {statusSummary?.down && statusSummary.down > 0 
                    ? t.partialOutage
                    : statusSummary?.degraded && statusSummary.degraded > 0 
                      ? t.degraded
                      : t.operational
                  }
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t.lastCheck}</span>
                <span className="font-mono text-xs text-gray-400">{formattedLastUpdate}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">{t.categories}</div>
            <ul>
              {categories.map(category => (
                <li key={category.id} className="mb-1">
                  <a 
                    href={`#${category.slug}`} 
                    className="flex items-center px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-dark-lighter"
                    onClick={onClose}
                  >
                    <i className={`${category.icon} w-5 mr-2`}></i>
                    <span>{getCategoryTranslation(category.name)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">Account</div>
            <ul>
              {user ? (
                <li className="mb-1">
                  <button 
                    className="flex items-center justify-center w-full px-3 py-2 text-sm text-left text-gray-300 rounded-md hover:bg-dark-lighter"
                    onClick={() => handleNavigate('/auth')}
                  >
                    <i className="w-5 fas fa-user"></i>
                  </button>
                </li>
              ) : (
                <li className="mb-1">
                  <button 
                    className="flex items-center justify-center w-full px-3 py-2 text-sm text-left text-gray-300 rounded-md hover:bg-dark-lighter"
                    onClick={() => handleNavigate('/auth')}
                  >
                    <i className="w-5 fas fa-user"></i>
                  </button>
                </li>
              )}
            </ul>
          </div>
          
          <div className="mt-6">
            <div className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">Links</div>
            <ul>
              <li className="mb-1">
                <button 
                  className="flex items-center w-full px-3 py-2 text-sm text-left text-gray-300 rounded-md hover:bg-dark-lighter"
                  onClick={() => handleNavigate('/info')}
                >
                  <i className="w-5 mr-2 fas fa-info-circle"></i>
                  <span>{t.infoAndContacts}</span>
                </button>
              </li>
              <li className="mb-1">
                <a 
                  href="#" 
                  className="flex items-center px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-dark-lighter"
                  onClick={onClose}
                >
                  <i className="w-5 mr-2 fas fa-history"></i>
                  <span>Incident History</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
