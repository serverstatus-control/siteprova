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
  const { data: categories = [] } = useQuery({
    queryKey: ['/api/categories'],
  });

  const { data: statusSummary } = useQuery({
    queryKey: ['/api/status-summary'],
  });

  // Fetch services for header component
  const { data: services = [] } = useQuery({
    queryKey: ['/api/services'],
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (term: string) => {
    // Search functionality can be implemented here
  };

  return (
    <div className="bg-background text-foreground font-sans min-h-screen">
      <Header onMenuToggle={toggleMobileMenu} onSearch={handleSearch} services={services} />
      
      <div className="flex min-h-[calc(100vh-64px)]">
        <Sidebar categories={categories} statusSummary={statusSummary} />
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={toggleMobileMenu} 
          categories={categories}
          statusSummary={statusSummary}
        />
        
        <main className="flex-1 w-full lg:ml-64 pb-6 sm:pb-12">
          <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-12">
            <div className="mb-4 sm:mb-6 px-2">
              <Link href="/" className="text-primary hover:text-primary/80 mb-4 inline-flex items-center">
                <i className="fas fa-arrow-left mr-2"></i>
                Torna alla Dashboard
              </Link>
            </div>

            <Card className="max-w-3xl mx-auto w-full px-2 sm:px-6">
              <CardHeader className="text-center">
                <CardTitle className="text-xl md:text-3xl">Info & Contatti</CardTitle>
                <CardDescription className="text-sm md:text-base">Informazioni sul nostro servizio e come contattarci</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-3 sm:p-4 rounded-lg bg-muted/50">
                  <h3 className="text-lg font-medium mb-2">Supporto Tecnico</h3>
                  <p className="mb-2 text-sm sm:text-base">
                    Per informazioni e reclami scrivere al nostro team di supporto tecnico:
                  </p>
                  <a 
                    href="mailto:server.status2317@gmail.com" 
                    className="text-primary hover:text-primary/80 font-medium break-all"
                  >
                    server.status2317@gmail.com
                  </a>
                </div>

                <div className="p-3 sm:p-4 rounded-lg bg-muted/50">
                  <h3 className="text-lg font-medium mb-2">Informazioni sul progetto</h3>
                  <p className="mb-4 text-sm sm:text-base">
                    Se avete problemi con qualche app o sito, in questo sistema potrete controllare 
                    se effettivamente ci sono dei problemi.
                  </p>
                  <p className="font-medium">
                    Versione: 0.3.00
                  </p>
                </div>

                <div className="p-3 sm:p-4 rounded-lg bg-muted/50">
                  <h3 className="text-lg font-medium mb-2">Team</h3>
                  <p className="mb-2 text-sm sm:text-base">Creato da:</p>
                  <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
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
              <CardFooter className="flex justify-center border-t pt-6">
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
