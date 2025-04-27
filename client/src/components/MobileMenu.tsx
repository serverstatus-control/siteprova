import React from 'react';
import { Link, useLocation } from 'wouter';
import { Category, StatusSummary } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';
import { UserRole } from '@shared/schema';
import { t } from '../lib/utils';

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
  
  const formattedLastUpdate = statusSummary?.lastChecked 
    ? formatDistanceToNow(new Date(statusSummary.lastChecked), { addSuffix: true }) 
    : 'Unknown';
    
  const handleLogout = () => {
    logoutMutation.mutate();
    onClose();
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden">
      <div className="w-64 h-full overflow-y-auto bg-dark-light">
        <div className="flex items-center justify-between p-4 border-b border-dark-lighter">
          <h2 className="font-semibold">Menu</h2>
          <button className="text-gray-400 hover:text-white" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <nav className="p-4">
          <div className="mb-4">
            <div className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">System Status</div>
            <div className="p-3 mb-2 rounded-lg bg-dark-lighter">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Status</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-20 text-success">
                  {statusSummary?.down && statusSummary.down > 0 
                    ? 'Partial Outage' 
                    : statusSummary?.degraded && statusSummary.degraded > 0 
                      ? 'Degraded' 
                      : 'Operational'
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
            <div className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">Categories</div>
            <ul>
              {categories.map(category => (
                <li key={category.id} className="mb-1">
                  <a 
                    href={`#${category.slug}`} 
                    className="flex items-center px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-dark-lighter"
                    onClick={onClose}
                  >
                    <i className={`${category.icon} w-5 mr-2`}></i>
                    <span>{category.name}</span>
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
                  <span>{t('infoAndContacts')}</span>
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
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
