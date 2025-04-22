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
  statusSummary: StatusSummary;
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden">
      <div className="bg-dark-light w-64 h-full overflow-y-auto">
        <div className="p-4 flex justify-between items-center border-b border-dark-lighter">
          <h2 className="font-semibold">Menu</h2>
          <button className="text-gray-400 hover:text-white" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <nav className="p-4">
          <div className="mb-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">System Status</div>
            <div className="bg-dark-lighter rounded-lg p-3 mb-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Status</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-20 text-success">
                  {statusSummary?.down > 0 
                    ? 'Partial Outage' 
                    : statusSummary?.degraded > 0 
                      ? 'Degraded' 
                      : 'Operational'
                  }
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Updated</span>
                <span className="text-xs text-gray-400 font-mono">{formattedLastUpdate}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Categories</div>
            <ul>
              {categories.map(category => (
                <li key={category.id} className="mb-1">
                  <a 
                    href={`#${category.slug}`} 
                    className="flex items-center px-3 py-2 text-sm rounded-md text-gray-300 hover:bg-dark-lighter"
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
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Account</div>
            <ul>
              {/* Admin link - only show for admin users */}
              {user?.role === UserRole.ADMIN && (
                <li className="mb-1">
                  <button 
                    className="flex items-center w-full px-3 py-2 text-sm rounded-md text-gray-300 hover:bg-dark-lighter text-left"
                    onClick={() => handleNavigate('/admin')}
                  >
                    <i className="fas fa-shield-alt w-5 mr-2"></i>
                    <span>Admin</span>
                  </button>
                </li>
              )}
              
              {/* Authentication links */}
              {user ? (
                <li className="mb-1">
                  <button 
                    className="flex items-center w-full px-3 py-2 text-sm rounded-md text-gray-300 hover:bg-dark-lighter text-left"
                    onClick={handleLogout}
                  >
                    <i className="fas fa-sign-out-alt w-5 mr-2"></i>
                    <span>Logout ({user.username})</span>
                  </button>
                </li>
              ) : (
                <>
                  <li className="mb-1">
                    <button 
                      className="flex items-center w-full px-3 py-2 text-sm rounded-md text-gray-300 hover:bg-dark-lighter text-left"
                      onClick={() => handleNavigate('/auth')}
                    >
                      <i className="fas fa-sign-in-alt w-5 mr-2"></i>
                      <span>Login</span>
                    </button>
                  </li>
                  <li className="mb-1">
                    <button 
                      className="flex items-center w-full px-3 py-2 text-sm rounded-md text-gray-300 hover:bg-dark-lighter text-left"
                      onClick={() => handleNavigate('/auth?tab=register')}
                    >
                      <i className="fas fa-user-plus w-5 mr-2"></i>
                      <span>Sign up</span>
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
          
          <div className="mt-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Links</div>
            <ul>
              <li className="mb-1">
                <button 
                  className="flex items-center w-full px-3 py-2 text-sm rounded-md text-gray-300 hover:bg-dark-lighter text-left"
                  onClick={() => handleNavigate('/info')}
                >
                  <i className="fas fa-info-circle w-5 mr-2"></i>
                  <span>{t('infoAndContacts')}</span>
                </button>
              </li>
              <li className="mb-1">
                <a 
                  href="#" 
                  className="flex items-center px-3 py-2 text-sm rounded-md text-gray-300 hover:bg-dark-lighter"
                  onClick={onClose}
                >
                  <i className="fas fa-history w-5 mr-2"></i>
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
