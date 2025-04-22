import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useSettings } from "@/hooks/use-settings";
import { UserRole } from "@shared/schema";
import { Button } from "@/components/ui/button";
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
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="flex items-center w-full px-4 py-3">
        {/* Scritta Server Status allineata a sinistra con padding */}
        <div className="flex items-center select-none">
          <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="font-extrabold text-2xl md:text-3xl tracking-tight text-primary drop-shadow-sm uppercase cursor-pointer">
              {t.serverStatus}
            </span>
          </Link>
          <span className="hidden md:inline-flex items-center bg-muted px-2 py-1 rounded text-xs font-mono ml-6">
            v: 0.3.00
          </span>
        </div>
        {/* Barra di ricerca centrata nella navbar */}
        <div className="flex-1 flex justify-center">
          <div className="relative hidden md:block w-full max-w-md">
            <input
              type="text"
              placeholder="Search services"
              className="w-full bg-background border border-input rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        {/* Azioni lato destro */}
        <div className="flex items-center gap-1 justify-end">
          <button
            className="lg:hidden text-muted-foreground hover:text-foreground p-2"
            onClick={onMenuToggle}
          >
            <Menu className="h-5 w-5" />
          </button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSearchVisible(!searchVisible)}
          >
            <Search className="h-5 w-5" />
          </Button>
          {/* Impostazioni prima dell'account */}
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground hover:bg-muted/50 hidden md:flex"
            onClick={() => setSettingsOpen(true)}
          >
            <Settings className="h-5 w-5" />
          </Button>
          {favorites.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground hover:bg-muted/50"
                >
                  <Star className="h-5 w-5 text-amber-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
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
          )}
          {user?.role === UserRole.ADMIN && (
            <Link href="/admin">
              <Button
                variant="ghost"
                className="hidden md:flex gap-1 text-muted-foreground hover:text-foreground"
              >
                <Shield className="h-4 w-4" />
                <span>{t.admin}</span>
              </Button>
            </Link>
          )}
          {/* Account menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground hover:bg-muted/50"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {user ? (
                <>
                  <DropdownMenuItem
                    className="flex items-center gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{t.logout}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2"
                    onClick={() => setSettingsOpen(true)}
                  >
                    <Settings className="h-4 w-4" />
                    <span>{t.settings}</span>
                  </DropdownMenuItem>
                  {user.role === UserRole.ADMIN && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => navigate("/admin")}
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        <span>{t.admin}</span>
                      </DropdownMenuItem>
                    </>
                  )}
                </>
              ) : (
                <>
                  <DropdownMenuItem onClick={() => navigate("/auth")}> 
                    <LogIn className="h-4 w-4 mr-2" />
                    <span>{t.login}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {
                    navigate("/auth?tab=register");
                  }}>
                    <i className="fas fa-user-plus w-4 h-4 mr-2"></i>
                    <span>{t.register || "Sign up"}</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Barra di ricerca mobile */}
      {searchVisible && (
        <div className="mt-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search services"
              className="w-full bg-background border border-input rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}

      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        services={services}
      />
    </header>
  );
};

export default Header;
