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
import { useAuth } from '@/hooks/use-auth';
import { UserRole } from '@shared/schema';
import { useLocation } from 'wouter';
import { Loader2 } from 'lucide-react';

const AdminPage: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [_, navigate] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isIncidentDialogOpen, setIsIncidentDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [incidentTitle, setIncidentTitle] = useState('');
  const [incidentDescription, setIncidentDescription] = useState('');

  // Fetch data
  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/categories');
      return res.json();
    },
  });

  const { data: services = [], isLoading: isServicesLoading } = useQuery<Service[]>({
    queryKey: ['/api/services'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/services');
      return res.json();
    },
  });

  const { data: statusSummary = null, isLoading: isSummaryLoading } = useQuery<StatusSummary | null>({
    queryKey: ['/api/status-summary'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/status-summary');
      return res.json();
    },
  });

  // Mutations
  const updateStatusMutation = useMutation({
    mutationFn: async ({ serviceId, status }: { serviceId: number; status: string }) => {
      return await apiRequest('PATCH', `/api/services/${serviceId}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
      queryClient.invalidateQueries({ queryKey: ['/api/status-summary'] });
      toast({
        title: 'Status updated',
        description: 'The service status has been updated successfully.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const createIncidentMutation = useMutation({
    mutationFn: async (data: { serviceId: number; title: string; description: string }) => {
      return await apiRequest('POST', `/api/services/${data.serviceId}/incidents`, data);
    },
    onSuccess: () => {
      setIsIncidentDialogOpen(false);
      setIncidentTitle('');
      setIncidentDescription('');
      setSelectedService(null);
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
      toast({
        title: 'Incident created',
        description: 'The incident has been created successfully.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Protect admin route
  React.useEffect(() => {
    if (!user) {
  navigate('/auth');
    } else if (user.role !== UserRole.ADMIN) {
  navigate('/');
    }
  }, [user, navigate]);

  // Handlers
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleStatusChange = async (serviceId: number, status: string) => {
    await updateStatusMutation.mutate({ serviceId, status });
  };

  const openIncidentDialog = (service: Service) => {
    setSelectedService(service);
    setIsIncidentDialogOpen(true);
  };

  const handleCreateIncident = async () => {
    if (!selectedService || !incidentTitle || !incidentDescription) return;

    await createIncidentMutation.mutate({
      serviceId: selectedService.id,
      title: incidentTitle,
      description: incidentDescription,
    });
  };

  // Filter services based on search
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading state
  if (isServicesLoading || isCategoriesLoading || isSummaryLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || user.role !== UserRole.ADMIN) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header services={services} onMenuToggle={toggleMobileMenu} onSearch={handleSearch} />
      
      <div className="flex min-h-[calc(100vh-64px)]">
        <Sidebar categories={categories} statusSummary={statusSummary} />
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={toggleMobileMenu} 
          categories={categories}
          statusSummary={statusSummary}
        />
        
        <main className="flex-1 pb-12 lg:ml-64">
          <div className="p-4 border-b md:p-6 border-border">
            <div className="container mx-auto">
              <h1 className="mb-2 text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage service statuses and incidents</p>
            </div>
          </div>
          
          <div className="container px-4 py-6 mx-auto">
            <div className="p-4 mb-8 border rounded-lg bg-card border-border">
              <h2 className="mb-4 text-xl font-semibold">Service Status Management</h2>
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
                                onValueChange={(value) => handleStatusChange(service.id, value)}
                                disabled={updateStatusMutation.isPending}
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
                                <i className="mr-1 fas fa-exclamation-triangle"></i> New Incident
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
        <DialogContent className="border-border">
          <DialogHeader>
            <DialogTitle>New Incident</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Create a new incident for {selectedService?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input 
                placeholder="Incident title" 
                value={incidentTitle} 
                onChange={(e) => setIncidentTitle(e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Describe the incident..."
                value={incidentDescription}
                onChange={(e) => setIncidentDescription(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select 
                defaultValue={selectedService?.status} 
                onValueChange={(value) => selectedService && handleStatusChange(selectedService.id, value)}
              >
                <SelectTrigger>
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
              disabled={createIncidentMutation.isPending || !incidentTitle || !incidentDescription}
            >
              {createIncidentMutation.isPending ? 'Creating...' : 'Create Incident'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;