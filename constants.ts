import { AppDefinition, KPI, Tenant, Alert, Incident } from './types';

export const TENANTS: Tenant[] = [
  { id: 't1', name: 'HP Internal' },
  { id: 't2', name: 'Partner Ecosystem' },
  { id: 't3', name: 'Customer Support' },
];

export const APPS: AppDefinition[] = [
  { id: 'a1', name: 'SCDI', tenantId: 't1' },
  { id: 'a2', name: 'CMO360', tenantId: 't1' },
  { id: 'a3', name: 'CC360', tenantId: 't1' },
  { id: 'a4', name: 'VendorPortal', tenantId: 't2' },
  { id: 'a5', name: 'HelpDesk AI', tenantId: 't3' },
];

export const MOCK_KPIS: KPI[] = [
  { id: 'k1', name: 'Global Error Rate', category: 'Reliability', value: 0.12, unit: '%', trend: 'down', delta: 0.05, status: 'success', description: 'Percentage of HTTP 5xx responses across all endpoints.', owner: 'SRE Team', formula: '(5xx_count / total_request_count) * 100', thresholds: { warning: 1, critical: 5 } },
  { id: 'k2', name: 'Latency P95', category: 'Operational', value: 345, unit: 'ms', trend: 'up', delta: 12, status: 'warning', description: '95th percentile of request duration.', owner: 'Platform Eng', formula: 'histogram_quantile(0.95, rate(http_request_duration_bucket[5m]))', thresholds: { warning: 300, critical: 800 } },
  { id: 'k3', name: 'Job Success Rate', category: 'Reliability', value: 99.8, unit: '%', trend: 'stable', delta: 0, status: 'success', description: 'Percentage of background jobs completing successfully.', owner: 'Backend Team', formula: '100 - (failed_jobs / total_jobs * 100)', thresholds: { warning: 98, critical: 95 } },
  { id: 'k4', name: 'UX Task Success', category: 'UX', value: 88.5, unit: '%', trend: 'up', delta: 2.1, status: 'success', description: 'User completion rate of primary defined workflows.', owner: 'Product Design', formula: 'completed_flows / started_flows * 100', thresholds: { warning: 80, critical: 70 } },
  { id: 'k5', name: 'Data Confidence', category: 'Business Value', value: 92, unit: 'Score', trend: 'down', delta: 3, status: 'warning', description: 'Aggregated score of data freshness, completeness, and accuracy.', owner: 'Data Stewards', formula: 'weighted_avg(freshness, completeness, accuracy)', thresholds: { warning: 90, critical: 75 } },
  { id: 'k6', name: 'Cost vs Budget', category: 'Business Value', value: 85, unit: '%', trend: 'up', delta: 5, status: 'success', description: 'Current cloud spend relative to allocated budget.', owner: 'FinOps', formula: 'current_spend / allocated_budget * 100', thresholds: { warning: 95, critical: 100 } },
];

export const MOCK_ALERTS: Alert[] = [
  { id: 'al1', severity: 'critical', message: 'High Latency on API Gateway', timestamp: '10 min ago', source: 'AWS CloudWatch', metric: 'Latency P99', value: '1.2s', threshold: '> 1s' },
  { id: 'al2', severity: 'warning', message: 'RDS CPU Utilization High', timestamp: '45 min ago', source: 'RDS', metric: 'CPU Utilization', value: '78%', threshold: '> 75%' },
  { id: 'al3', severity: 'info', message: 'Deployment Started', timestamp: '1h ago', source: 'Jenkins', metric: 'Event', value: 'v2.4.1', threshold: 'N/A' },
  { id: 'al4', severity: 'warning', message: 'Elevated Error Rate in Auth Service', timestamp: '2h ago', source: 'App Telemetry', metric: 'Error Rate', value: '2.1%', threshold: '> 2%' },
];

export const MOCK_INCIDENTS: Incident[] = [
  { id: 'inc1', title: 'Payment Gateway Timeouts', severity: 'Sev1', status: 'Resolved', duration: '45m', startedAt: 'Today, 09:15 AM' },
  { id: 'inc2', title: 'Slow Dashboard Loads', severity: 'Sev3', status: 'Investigating', duration: '2h 10m', startedAt: 'Today, 11:30 AM' },
];

// Mock Data for Charts
export const TIME_SERIES_DATA = [
  { time: '00:00', value: 240, target: 300 },
  { time: '04:00', value: 139, target: 300 },
  { time: '08:00', value: 380, target: 300 },
  { time: '12:00', value: 390, target: 300 },
  { time: '16:00', value: 480, target: 300 },
  { time: '20:00', value: 380, target: 300 },
  { time: '23:59', value: 430, target: 300 },
];

export const FUNNEL_DATA = [
  { name: 'Start Flow', value: 1000, fill: '#3b82f6' },
  { name: 'Fill Form', value: 800, fill: '#60a5fa' },
  { name: 'Review', value: 600, fill: '#93c5fd' },
  { name: 'Submit', value: 580, fill: '#bfdbfe' },
  { name: 'Success', value: 550, fill: '#10b981' },
];

export const COST_DATA = [
  { name: 'Compute', value: 4000 },
  { name: 'Storage', value: 3000 },
  { name: 'Network', value: 2000 },
  { name: 'MaaS Ingest', value: 1500 },
];

export const HEATMAP_DATA = [
  { step: 'Login', errors: 12, latency: 'Low' },
  { step: 'Dashboard Load', errors: 5, latency: 'Med' },
  { step: 'Search Query', errors: 45, latency: 'High' },
  { step: 'Export PDF', errors: 2, latency: 'High' },
];
