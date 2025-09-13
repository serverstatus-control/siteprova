export type ServiceStatus = 'operational' | 'degraded' | 'down';

export interface Category {
  id: number;
  name: string;
  icon: string;
  slug: string;
}

export interface DailyHistory {
  date: string;
  uptimePercentage: number;
  responseTime: number;
  downtimeMinutes: number;
  status: ServiceStatus;
}

export interface Service {
  id: number;
  name: string;
  logo: string;
  categoryId: number;
  status: ServiceStatus;
  responseTime: number;
  lastChecked: string;
  uptimePercentage: number;
  slug: string;
  history?: DailyHistory[];
}

export interface UptimeHistory {
  id: number;
  serviceId: number;
  date: string;
  uptimePercentage: number;
  status: ServiceStatus;
  responseTime: number;
  downtimeMinutes: number;
}

export interface Incident {
  id: number;
  serviceId: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string | null;
  status: ServiceStatus;
}

export interface StatusSummary {
  operational: number;
  degraded: number;
  down: number;
  lastChecked: string;
}

export interface ServiceWithDetails extends Service {
  history?: UptimeHistory[];
  incidents?: Incident[];
}
