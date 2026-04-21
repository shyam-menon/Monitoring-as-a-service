export type Environment = 'Dev' | 'Test' | 'Prod';
export type Persona = 'Product Owner' | 'DevOps' | 'Leadership';
export type TimeRange = 'Last 1h' | 'Last 24h' | 'Last 7d' | 'Last 30d';

export interface Tenant {
  id: string;
  name: string;
}

export interface AppDefinition {
  id: string;
  name: string;
  tenantId: string;
}

export interface KPI {
  id: string;
  name: string;
  category: 'Operational' | 'Reliability' | 'UX' | 'Business Value';
  value: number | string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  delta: number;
  status: 'success' | 'warning' | 'critical';
  description?: string;
  owner?: string;
  formula?: string;
  thresholds?: { warning: number; critical: number };
}

export interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
  source: string;
  metric: string;
  value: string;
  threshold: string;
}

export interface Incident {
  id: string;
  title: string;
  severity: 'Sev1' | 'Sev2' | 'Sev3';
  status: 'Open' | 'Investigating' | 'Resolved';
  duration: string;
  startedAt: string;
}

export interface FilterState {
  tenant: string;
  app: string;
  timeRange: TimeRange;
  persona: Persona;
}
