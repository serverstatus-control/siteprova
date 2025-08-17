import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import MobileMenu from "@/components/MobileMenu";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";

const InfoPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Fetch categories and status summary for sidebar and mobile menu
  const { data: categories = [] } = useQuery<import('@/types').Category[]>({
    queryKey: ['/api/categories'],
  });

  const { data: statusSummary = null } = useQuery<import('@/types').StatusSummary | null>({
    queryKey: ['/api/status-summary'],
  });

  // Fetch services for header component
  const { data: services = [] } = useQuery<import('@/types').Service[]>({
    queryKey: ['/api/services'],
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (term: string) => {
    // Search functionality can be implemented here
  };

  return (
    <div className="min-h-screen font-sans bg-background text-foreground">
      <Header onMenuToggle={toggleMobileMenu} onSearch={handleSearch} services={services} />
      
      <div className="flex min-h-[calc(100vh-64px)]">
        <Sidebar categories={categories} statusSummary={statusSummary} />
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={toggleMobileMenu} 
          categories={categories}
          statusSummary={statusSummary}
        />
        
        <main className="flex-1 w-full pb-6 lg:ml-64 sm:pb-12">
          <div className="container px-2 py-4 mx-auto sm:px-4 sm:py-12">
            <div className="px-2 mb-4 sm:mb-6">
              <Link 
                href="/siteprova/" 
                className="inline-flex items-center px-3 py-2 mb-4 transition-all duration-200 rounded-md text-primary hover:text-primary/80 hover:bg-muted/50 hover:-translate-x-1 focus:outline-none focus:ring-1 focus:ring-primary/40"
              >
                <i className="mr-2 transition-transform duration-200 fas fa-arrow-left group-hover:scale-110"></i>
                Torna alla Dashboard
              </Link>
            </div>

            <Card className="w-full max-w-3xl px-2 mx-auto sm:px-6">
              <CardHeader className="text-center">
                <CardTitle className="text-xl md:text-3xl">Info & Contatti</CardTitle>
                <CardDescription className="text-sm md:text-base">Informazioni sul nostro servizio e come contattarci</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-3 rounded-lg sm:p-4 bg-muted/50">
                  <h3 className="mb-2 text-lg font-medium">Supporto Tecnico</h3>
                  <p className="mb-2 text-sm sm:text-base">
                    Per informazioni e reclami scrivere al nostro team di supporto tecnico:
                  </p>
                  <a 
                    href="mailto:server.status2317@gmail.com" 
                    className="font-medium break-all text-primary hover:text-primary/80"
                  >
                    server.status2317@gmail.com
                  </a>
                </div>

                <div className="p-3 rounded-lg sm:p-4 bg-muted/50">
                  <h3 className="mb-2 text-lg font-medium">Informazioni sul progetto</h3>
                  <p className="mb-4 text-sm sm:text-base">
                    Se avete problemi con qualche app o sito, in questo sistema potrete controllare 
                    se effettivamente ci sono dei problemi.
                  </p>
                  <p className="font-medium">
                    Versione: 0.3.00
                  </p>
                </div>

                <div className="p-3 rounded-lg sm:p-4 bg-muted/50">
                  <h3 className="mb-2 text-lg font-medium">Team</h3>
                  <p className="mb-2 text-sm sm:text-base">Creato da:</p>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <a 
                      href="https://www.instagram.com/_insubrico_/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80"
                    >
                      <i className="fab fa-instagram"></i>
                      <span>Matteo</span>
                    </a>
                    <span>&</span>
                    <a 
                      href="https://www.instagram.com/liampz_08/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80"
                    >
                      <i className="fab fa-instagram"></i>
                      <span>Liam</span>
                    </a>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center pt-6 border-t">
                <p className="text-sm text-muted-foreground">
                  &copy; 2025 Server Status. All rights reserved.
                </p>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default InfoPage;
