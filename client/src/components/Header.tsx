import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { useSettings } from '@/hooks/use-settings';
import { UserRole } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Shield, LogIn, Settings, Star } from 'lucide-react';
import SettingsDialog from './SettingsDialog';

interface HeaderProps {
  onMenuToggle: () => void;
  onSearch: (term: string) => void;
  services: Array<{id: number; name: string; logo: string; slug: string; status: string}>;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, onSearch, services }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { user, logoutMutation } = useAuth();
  const { t, favorites, isFavorite } = useSettings();
  const [_, navigate] = useLocation();

  // Filtra i servizi preferiti
  const favoriteServices = services.filter(service => isFavorite(service.id));

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            id="menu-toggle" 
            className="lg:hidden text-muted-foreground hover:text-foreground"
            onClick={onMenuToggle}
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
          <Link href="/">
            <span className="font-bold text-xl md:text-2xl tracking-tight cursor-pointer">{t.serverStatus}</span>
          </Link>
          <span className="hidden md:inline-flex items-center bg-muted px-2 py-1 rounded text-xs font-mono">v0.3.0</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input 
              type="text" 
              id="search" 
              placeholder={t.search}
              className="bg-background border border-input rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring w-48 md:w-64"
              value={searchTerm}
              onChange={handleSearch}
            />
            <i className="fas fa-search absolute left-3 top-2.5 text-muted-foreground"></i>
          </div>
          
          {/* Pulsante di impostazioni */}
          <Button 
            variant="ghost" 
            size="icon"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => setSettingsOpen(true)}
          >
            <Settings className="h-5 w-5" />
          </Button>
          
          {/* Menu dei preferiti */}
          {favorites.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Star className="h-5 w-5 text-amber-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  {favoriteServices.map(service => (
                    <DropdownMenuItem key={service.id} asChild>
                      <Link href={`/services/${service.slug}`} className="flex items-center gap-2 cursor-pointer">
                        <i className={service.logo + " w-4 h-4"}></i>
                        <span>{service.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          {/* Admin button - only show for admin users */}
          {user?.role === UserRole.ADMIN && (
            <Link href="/admin">
              <Button variant="ghost" className="hidden md:flex gap-1 text-muted-foreground hover:text-foreground">
                <Shield className="h-4 w-4" />
                <span>{t.admin}</span>
              </Button>
            </Link>
          )}
          
          {/* Authentication UI */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex gap-1 text-muted-foreground hover:text-foreground">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">{user.username}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center gap-2" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  <span>{t.logout}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="ghost" 
              className="flex gap-1 text-muted-foreground hover:text-foreground"
              onClick={() => navigate('/auth')}
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden md:inline">{t.login}</span>
            </Button>
          )}
        </div>
      </div>
      
      {/* Dialog delle impostazioni */}
      <SettingsDialog 
        open={settingsOpen} 
        onOpenChange={setSettingsOpen} 
        services={services}
      />
    </header>
  );
};

export default Header;
