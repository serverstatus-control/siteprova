import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import MobileMenu from "@/components/MobileMenu";
import { useQuery } from "@tanstack/react-query";
import { useSettings } from "@/hooks/use-settings";
import { Category, Service, StatusSummary } from "@/types";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";

const UpdatesPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useSettings();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Fetch categories and status summary for sidebar and mobile menu
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const { data: statusSummary = null } = useQuery<StatusSummary | null>({
    queryKey: ['/api/status-summary'],
  });

  // Fetch services for header component
  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (term: string) => {
    // Search functionality can be implemented here
  };

  // Lista degli aggiornamenti del sito
  const updates = [
    {
      version: "0.3.00",
      date: "??/12/2025",
      changes: [
        "Aggiunta sezione Aggiornamenti del sito",
        "Migliorata la visualizzazione dei tooltip",
        "Correzioni di bug minori"
      ]
    }
    // Aggiungi qui altri aggiornamenti quando necessario
  ];

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
                {t.backToDashboard}
              </Link>
            </div>

            <Card className="w-full max-w-3xl px-2 mx-auto sm:px-6">
              <CardHeader className="text-center">
                <CardTitle className="text-xl md:text-3xl">{t.siteUpdates}</CardTitle>
                <CardDescription className="text-sm md:text-base">Cronologia degli aggiornamenti e delle novità</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {updates.map((update, index) => (
                  <div key={index} className="p-3 rounded-lg sm:p-4 bg-muted/50">
                    <div className="flex items-baseline justify-between mb-2">
                      <h3 className="text-lg font-medium">Versione {update.version}</h3>
                      <span className="text-sm text-muted-foreground">{update.date}</span>
                    </div>
                    <ul className="ml-4 space-y-1 list-disc">
                      {update.changes.map((change, changeIndex) => (
                        <li key={changeIndex} className="text-sm sm:text-base">
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
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

export default UpdatesPage;