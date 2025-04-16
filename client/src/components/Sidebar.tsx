import React from 'react';
import { Category } from '../types';
import { StatusSummary } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface SidebarProps {
  categories: Category[];
  statusSummary: StatusSummary;
}

const Sidebar: React.FC<SidebarProps> = ({ categories, statusSummary }) => {
  const formattedLastUpdate = statusSummary?.lastChecked 
    ? formatDistanceToNow(new Date(statusSummary.lastChecked), { addSuffix: true }) 
    : 'Unknown';

  return (
    <aside id="sidebar" className="hidden lg:block w-64 bg-dark-light border-r border-dark-lighter overflow-y-auto fixed top-[64px] h-[calc(100vh-64px)]">
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
                <a href={`#${category.slug}`} className="flex items-center px-3 py-2 text-sm rounded-md text-gray-300 hover:bg-dark-lighter">
                  <i className={`${category.icon} w-5 mr-2`}></i>
                  <span>{category.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Links</div>
          <ul>
            <li className="mb-1">
              <a href="#" className="flex items-center px-3 py-2 text-sm rounded-md text-gray-300 hover:bg-dark-lighter">
                <i className="fas fa-info-circle w-5 mr-2"></i>
                <span>Info</span>
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="flex items-center px-3 py-2 text-sm rounded-md text-gray-300 hover:bg-dark-lighter">
                <i className="fas fa-history w-5 mr-2"></i>
                <span>Incident History</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
