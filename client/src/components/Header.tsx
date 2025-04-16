import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { UserRole } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Shield, LogIn } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  onSearch: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { user, logoutMutation } = useAuth();
  const [_, navigate] = useLocation();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="bg-dark-light border-b border-dark-lighter sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            id="menu-toggle" 
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={onMenuToggle}
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
          <Link href="/">
            <a className="font-bold text-xl md:text-2xl tracking-tight text-white cursor-pointer">SERVER STATUS</a>
          </Link>
          <span className="hidden md:inline-flex items-center bg-dark-lighter px-2 py-1 rounded text-xs font-mono">v0.3.0</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input 
              type="text" 
              id="search" 
              placeholder="Search services..." 
              className="bg-dark-lighter border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary w-48 md:w-64"
              value={searchTerm}
              onChange={handleSearch}
            />
            <i className="fas fa-search absolute left-3 top-2.5 text-gray-500"></i>
          </div>
          
          {/* Admin button - only show for admin users */}
          {user?.role === UserRole.ADMIN && (
            <Link href="/admin">
              <Button variant="ghost" className="hidden md:flex gap-1 text-gray-400 hover:text-white">
                <Shield className="h-4 w-4" />
                <span>Admin</span>
              </Button>
            </Link>
          )}
          
          {/* Authentication UI */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex gap-1 text-gray-400 hover:text-white">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">{user.username}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center gap-2" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="ghost" 
              className="flex gap-1 text-gray-400 hover:text-white"
              onClick={() => navigate('/auth')}
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden md:inline">Login</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
