import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useSettings } from "@/hooks/use-settings";
import { UserRole } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  User,
  LogOut,
  Shield,
  LogIn,
  Settings,
  Star,
  Menu,
  Search,
  Home,
} from "lucide-react";
import SettingsDialog from "./SettingsDialog";

interface HeaderProps {
  onMenuToggle: () => void;
  onSearch: (term: string) => void;
  services: Array<{
    id: number;
    name: string;
    logo: string;
    slug: string;
    status: string;
  }>;
}

const Header: React.FC<HeaderProps> = ({
  onMenuToggle,
  onSearch,
  services,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const { user, logoutMutation } = useAuth();
  const { t, favorites, isFavorite } = useSettings();
  const [_, navigate] = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Apre il dialog impostazioni su mobile/tablet quando riceve l'evento custom
  useEffect(() => {
    const handler = () => {
      if (typeof window !== 'undefined') {
        const evt = new CustomEvent('open-settings-dialog');
        window.dispatchEvent(evt);
      }
    };
    window.addEventListener('open-settings-dialog', () => {
      const dialog = document.getElementById('settings-dialog') as HTMLDialogElement | null;
      if (dialog && typeof dialog.showModal === 'function') {
        dialog.showModal();
      }
    });
    return () => {
      window.removeEventListener('open-settings-dialog', handler);
    };
  }, []);

  const favoriteServices = (services || []).filter((service) =>
    isFavorite(service.id),
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="sticky top-0 z-50 transition-colors duration-300 ease-in-out border-b shadow-sm bg-background border-border backdrop-blur-md">
      <div className="flex items-center w-full gap-2 px-0 py-3 transition-all duration-300 ease-in-out sm:px-2 md:px-6 md:gap-4">
        {/* Colonna sinistra: logo sempre allineato a sinistra, ottimizzato per mobile */}
        <div className="flex items-center select-none flex-shrink-0 flex-grow-0 min-w-[90px] md:min-w-[160px] pl-2 md:pl-0 justify-start ml-0 md:ml-0 transition-all duration-300 ease-in-out">
          <span className="text-lg font-extrabold leading-none tracking-tight uppercase transition-colors duration-200 cursor-default sm:text-2xl md:text-3xl text-primary drop-shadow-sm md:leading-tight">
            {t.serverStatus}
          </span>
          <span className="items-center hidden px-2 py-1 ml-2 font-mono text-xs transition-colors duration-200 rounded sm:ml-4 md:inline-flex bg-muted">
            v: 0.3.00
          </span>
        </div>
        {/* Colonna centrale: search sempre visibile e centrata, responsive */}
        <div className="flex justify-center flex-1">
          {/* Desktop/tablet: search visibile */}
          <div className="relative items-center hidden w-full max-w-xs mx-auto transition-all duration-300 ease-in-out sm:max-w-sm md:max-w-md lg:max-w-lg md:flex">
            <span className="absolute flex items-center justify-center w-5 h-5 -translate-y-1/2 pointer-events-none select-none left-3 top-1/2">
              <Search className="w-4 h-4 transition-colors duration-200 text-muted-foreground" />
            </span>
            <input
              ref={searchInputRef}
              type="text"
              placeholder={t.searchServices}
              className="w-full py-1.5 pl-10 pr-10 text-sm border rounded-lg bg-background border-input focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200"
              value={searchTerm}
              onChange={handleSearch}
            />
            {favorites.length > 0 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          tabIndex={0}
                          aria-label={t.favorites}
                          className="absolute transition-colors duration-200 -translate-y-1/2 outline-none right-2 top-1/2 text-muted-foreground hover:text-foreground hover:bg-muted/50 ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                        >
                          <Star className="w-5 h-5 transition-transform duration-200 text-amber-400 group-hover:scale-110" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 animate-fade-in">
                        <DropdownMenuGroup>
                          {favoriteServices.map((service) => (
                            <DropdownMenuItem key={service.id} asChild>
                              <Link
                                href={`/services/${service.slug}`}
                                className="flex items-center gap-2 cursor-pointer"
                              >
                                <i className={service.logo + " w-4 h-4"}></i>
                                <span>{service.name}</span>
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    {t.favorites}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          {/* Mobile: solo icona search, cliccabile */}
          <button
            className="flex items-center justify-center w-10 h-10 transition-colors duration-200 rounded-full md:hidden hover:bg-muted/50 text-muted-foreground hover:text-foreground active:scale-95 focus:ring-2 focus:ring-primary/40"
            aria-label={t.searchServices}
            onClick={() => setSearchVisible(true)}
            type="button"
          >
            <Search className="w-5 h-5 transition-transform duration-200" />
          </button>
        </div>
        {/* Colonna destra: azioni sempre a destra */}
        <div className="flex items-center justify-end gap-1 flex-shrink-0 ml-auto min-w-[100px] md:min-w-[160px]">
          <button
            className="p-2 transition-colors duration-200 lg:hidden text-muted-foreground hover:text-foreground active:scale-95"
            onClick={onMenuToggle}
          >
            <Menu className="w-5 h-5 transition-transform duration-200" />
          </button>
          {/* Impostazioni desktop/tablet */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden transition-colors duration-200 lg:flex text-muted-foreground hover:text-foreground hover:bg-muted/50"
            onClick={() => setSettingsOpen(true)}
          >
            <Settings className="w-5 h-5 transition-transform duration-200" />
          </Button>
          {user?.role === UserRole.ADMIN && (
            <Link href="/admin">
              <Button
                variant="outline"
                className="items-center hidden gap-2 transition-colors duration-200 md:flex text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Shield className="w-4 h-4 transition-transform duration-200" />
                <span className="font-medium">{t.admin}</span>
              </Button>
            </Link>
          )}
          {/* Account solo desktop */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden transition-colors duration-200 lg:flex text-muted-foreground hover:text-foreground hover:bg-muted/50"
            onClick={() => navigate("/account-dashboard")}
          >
            <User className="w-5 h-5 transition-transform duration-200" />
          </Button>
        </div>
      </div>
      {/* Popup ricerca mobile */}
      {searchVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 md:hidden animate-fade-in">
          <div className="relative w-[90vw] max-w-sm bg-background rounded-lg p-4 shadow-lg animate-slide-up transition-all duration-300">
            <button
              className="absolute text-2xl font-bold transition-colors duration-200 top-2 right-2 text-muted-foreground hover:text-foreground focus:outline-none focus-visible:outline-none"
              aria-label="Chiudi"
              onClick={() => setSearchVisible(false)}
              type="button"
            >
              ×
            </button>
            <div className="relative flex items-center w-full">
              <span className="absolute flex items-center justify-center w-5 h-5 -translate-y-1/2 pointer-events-none select-none left-3 top-1/2">
                <Search className="w-4 h-4 transition-colors duration-200 text-muted-foreground" />
              </span>
              <input
                ref={searchInputRef}
                type="text"
                placeholder={t.searchServices}
                className="w-full py-2 pl-10 pr-10 text-sm transition-all duration-200 border rounded-lg bg-background border-input focus:ring-2 focus:ring-primary/40 focus:border-primary"
                value={searchTerm}
                onChange={handleSearch}
                autoFocus
              />
              {favorites.length > 0 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            tabIndex={0}
                            aria-label={t.favorites}
                            className="absolute transition-colors duration-200 -translate-y-1/2 outline-none right-2 top-1/2 text-muted-foreground hover:text-foreground hover:bg-muted/50 ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                          >
                            <Star className="w-5 h-5 transition-transform duration-200 text-amber-400 group-hover:scale-110" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 animate-fade-in">
                          <DropdownMenuGroup>
                            {favoriteServices.map((service) => (
                              <DropdownMenuItem key={service.id} asChild>
                                <Link
                                  href={`/services/${service.slug}`}
                                  className="flex items-center gap-2 cursor-pointer"
                                >
                                  <i className={service.logo + " w-4 h-4"}></i>
                                  <span>{service.name}</span>
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      {t.favorites}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        </div>
      )}

      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        services={services.map(service => ({
          ...service,
          categoryId: 0, // Default value
          responseTime: null, // Default value
          lastChecked: null, // Default value
          uptimePercentage: null, // Default value
        }))}
      />
    </header>
  );
};

export default Header;
