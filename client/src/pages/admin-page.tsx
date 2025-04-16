import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { Service, Category, StatusSummary } from '@/types';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MobileMenu from '@/components/MobileMenu';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import StatusBadge from '@/components/StatusBadge';

const AdminPage: React.FC = () => {
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isIncidentDialogOpen, setIsIncidentDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [incidentTitle, setIncidentTitle] = useState('');
  const [incidentDescription, setIncidentDescription] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'operational' | 'degraded' | 'down'>('operational');

  // Fetch categories
  const { 
    data: categories = [],
    isLoading: isCategoriesLoading
  } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  // Fetch services
  const { 
    data: services = [],
    isLoading: isServicesLoading
  } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  // Fetch status summary
  const { 
    data: statusSummary = {
      operational: 0,
      degraded: 0,
      down: 0,
      lastChecked: new Date().toISOString()
    },
    isLoading: isSummaryLoading,
  } = useQuery<StatusSummary>({
    queryKey: ['/api/status-summary'],
  });

  // Update service status mutation
  const { mutate: updateServiceStatus, isPending: isUpdatingStatus } = useMutation({
    mutationFn: async ({ serviceId, status, responseTime }: { serviceId: number, status: string, responseTime?: number }) => {
      return apiRequest('PATCH', `/api/services/${serviceId}/status`, { status, responseTime });
    },
    onSuccess: () => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
      queryClient.invalidateQueries({ queryKey: ['/api/status-summary'] });
      
      toast({
        title: "Status Updated",
        description: "Service status has been updated successfully.",
      });
    },
    onError: (error) => {
      console.error("Error updating service status:", error);
      toast({
        title: "Update Failed",
        description: "Failed to update service status. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Create incident mutation
  const { mutate: createIncident, isPending: isCreatingIncident } = useMutation({
    mutationFn: async ({ serviceId, title, description, status }: { serviceId: number, title: string, description: string, status: string }) => {
      return apiRequest('POST', `/api/incidents`, { 
        serviceId, 
        title, 
        description, 
        status,
        startTime: new Date().toISOString(),
        endTime: null 
      });
    },
    onSuccess: () => {
      // Clear form and close dialog
      setIncidentTitle('');
      setIncidentDescription('');
      setIsIncidentDialogOpen(false);
      setSelectedService(null);
      
      // Invalidate incident queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
      
      toast({
        title: "Incident Created",
        description: "New incident has been created successfully.",
      });
    },
    onError: (error) => {
      console.error("Error creating incident:", error);
      toast({
        title: "Creation Failed",
        description: "Failed to create incident. Please try again.",
        variant: "destructive"
      });
    }
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleStatusChange = (serviceId: number, status: 'operational' | 'degraded' | 'down') => {
    // Get mock response times based on status
    const responseTime = status === 'operational' ? 120 : 
                        status === 'degraded' ? 450 : 0;
    
    // Update service status
    updateServiceStatus({ serviceId, status, responseTime });
  };

  const openIncidentDialog = (service: Service) => {
    setSelectedService(service);
    setSelectedStatus(service.status as 'operational' | 'degraded' | 'down');
    setIsIncidentDialogOpen(true);
  };

  const handleCreateIncident = () => {
    if (!selectedService) return;
    
    if (!incidentTitle || !incidentDescription) {
      toast({
        title: "Missing Information",
        description: "Please provide both a title and description for the incident.",
        variant: "destructive"
      });
      return;
    }
    
    // Create incident
    createIncident({
      serviceId: selectedService.id,
      title: incidentTitle,
      description: incidentDescription,
      status: selectedStatus
    });
    
    // Also update the service status to match the incident
    updateServiceStatus({ 
      serviceId: selectedService.id, 
      status: selectedStatus,
      responseTime: selectedStatus === 'operational' ? 120 : 
                   selectedStatus === 'degraded' ? 450 : 0
    });
  };

  // Filter services based on search term
  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading state
  if (isCategoriesLoading || isServicesLoading || isSummaryLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="bg-dark text-gray-100 font-sans min-h-screen">
      <Header onMenuToggle={toggleMobileMenu} onSearch={handleSearch} />
      
      <div className="flex min-h-[calc(100vh-64px)]">
        <Sidebar categories={categories} statusSummary={statusSummary} />
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={toggleMobileMenu} 
          categories={categories}
          statusSummary={statusSummary}
        />
        
        <main className="flex-1 lg:ml-64 pb-12">
          <div className="bg-dark-light p-4 md:p-6 border-b border-dark-lighter">
            <div className="container mx-auto">
              <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-gray-400">Manage service statuses and incidents</p>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-6">
            <div className="bg-dark-light rounded-lg border border-dark-lighter p-4 mb-8">
              <h2 className="text-xl font-semibold mb-4">Service Status Management</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Current Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredServices.map(service => {
                      const category = categories.find(c => c.id === service.categoryId);
                      return (
                        <TableRow key={service.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <i className={`${service.logo} text-lg mr-2`}></i>
                              <span>{service.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{category?.name || 'Unknown'}</TableCell>
                          <TableCell>
                            <StatusBadge status={service.status} />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Select 
                                defaultValue={service.status} 
                                onValueChange={(value) => handleStatusChange(service.id, value as 'operational' | 'degraded' | 'down')}
                                disabled={isUpdatingStatus}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="operational">Operational</SelectItem>
                                  <SelectItem value="degraded">Degraded</SelectItem>
                                  <SelectItem value="down">Down</SelectItem>
                                </SelectContent>
                              </Select>
                              
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => openIncidentDialog(service)}
                              >
                                <i className="fas fa-exclamation-triangle mr-1"></i> New Incident
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
      
      {/* New Incident Dialog */}
      <Dialog open={isIncidentDialogOpen} onOpenChange={setIsIncidentDialogOpen}>
        <DialogContent className="bg-dark-light border-dark-lighter text-white">
          <DialogHeader>
            <DialogTitle>New Incident</DialogTitle>
            <DialogDescription className="text-gray-400">
              Create a new incident for {selectedService?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input 
                placeholder="Incident title" 
                value={incidentTitle} 
                onChange={(e) => setIncidentTitle(e.target.value)} 
                className="bg-dark-lighter border-dark-lighter"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea 
                placeholder="Incident description" 
                value={incidentDescription} 
                onChange={(e) => setIncidentDescription(e.target.value)} 
                className="bg-dark-lighter border-dark-lighter min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select 
                value={selectedStatus} 
                onValueChange={(value) => setSelectedStatus(value as 'operational' | 'degraded' | 'down')}
              >
                <SelectTrigger className="w-full bg-dark-lighter border-dark-lighter">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="degraded">Degraded</SelectItem>
                  <SelectItem value="down">Down</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsIncidentDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateIncident} 
              disabled={isCreatingIncident || !incidentTitle || !incidentDescription}
            >
              {isCreatingIncident ? 'Creating...' : 'Create Incident'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;