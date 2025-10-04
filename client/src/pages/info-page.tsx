import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import MobileMenu from "@/components/MobileMenu";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/use-settings";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";

const InfoPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useSettings();

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
                href="/" 
                className="inline-flex items-center px-3 py-2 mb-4 transition-all duration-200 rounded-md text-primary hover:text-primary/80 hover:bg-muted/50 hover:-translate-x-1 focus:outline-none focus:ring-1 focus:ring-primary/40"
              >
                <i className="mr-2 transition-transform duration-200 fas fa-arrow-left group-hover:scale-110"></i>
                {t.backToDashboard}
              </Link>
            </div>

            <Card className="w-full max-w-3xl px-2 mx-auto sm:px-6 border-2 border-white">
              <CardHeader className="text-center">
                <CardTitle className="text-xl md:text-3xl">{t.infoAndContacts}</CardTitle>
                <CardDescription className="text-sm md:text-base">{t.infoContactsSubtitle}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-3 rounded-lg sm:p-4 bg-muted/50">
                  <h3 className="mb-2 text-lg font-medium">{t.supportTitle}</h3>
                  <p className="mb-2 text-sm sm:text-base">{t.supportText}</p>
                  <a 
                    href="mailto:server.status2317@gmail.com" 
                    className="font-medium break-all text-primary hover:text-primary/80"
                  >
                    server.status2317@gmail.com
                  </a>
                </div>

                <div className="p-3 rounded-lg sm:p-4 bg-muted/50">
                  <h3 className="mb-2 text-lg font-medium">{t.projectInfoTitle}</h3>
                  <p className="mb-4 text-sm sm:text-base">{t.projectInfoText}</p>
                  <p className="font-medium">
                    {t.versionLabel}: 0.3.00
                  </p>
                </div>

                <div className="p-3 rounded-lg sm:p-4 bg-muted/50">
                  <h3 className="mb-2 text-lg font-medium">{t.teamTitle}</h3>
                  <p className="mb-2 text-sm sm:text-base">{t.createdBy}</p>
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
            </Card>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default InfoPage;
