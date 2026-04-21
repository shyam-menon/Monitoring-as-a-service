import React, { useState } from 'react';
import { Activity, AlertTriangle, CheckCircle, Clock, Database, DollarSign, FileText, Layers, Monitor, Shield, User, Zap } from 'lucide-react';
import { Card, MetricCard, Badge, Button } from './UIComponents';
import { SimpleLineChart, SimpleBarChart, SimpleDonutChart, SimpleAreaChart } from './Charts';
import { MOCK_KPIS, MOCK_ALERTS, MOCK_INCIDENTS, TIME_SERIES_DATA, FUNNEL_DATA, COST_DATA, HEATMAP_DATA } from '../constants';

// --- 1. Overview Tab ---
export const OverviewTab: React.FC = () => (
  <div className="space-y-6">
    {/* Health Header */}
    <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white border-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.6)]">
             <CheckCircle size={40} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">System Healthy</h2>
            <p className="text-slate-300 mt-1">All core services are operating within normal parameters.</p>
          </div>
        </div>
        <div className="flex space-x-8 text-center">
          <div>
            <div className="text-3xl font-bold">99.99%</div>
            <div className="text-xs text-slate-400 uppercase tracking-wide">Availability</div>
          </div>
          <div>
            <div className="text-3xl font-bold">345ms</div>
            <div className="text-xs text-slate-400 uppercase tracking-wide">Latency P95</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">0.12%</div>
            <div className="text-xs text-slate-400 uppercase tracking-wide">Error Rate</div>
          </div>
        </div>
      </div>
    </Card>

    {/* KPI Sparklines */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {MOCK_KPIS.slice(0, 4).map((kpi) => (
        <MetricCard 
          key={kpi.id} 
          title={kpi.name} 
          value={`${kpi.value}${kpi.unit}`} 
          delta={kpi.delta} 
          trend={kpi.trend} 
          icon={<Activity size={16} />}
        />
      ))}
    </div>

    {/* Top Issues & Alerts */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="Active Alerts">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50">
              <tr>
                <th className="px-4 py-3">Severity</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Time</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ALERTS.slice(0,3).map(alert => (
                <tr key={alert.id} className="border-b border-slate-100">
                  <td className="px-4 py-3"><Badge type={alert.severity === 'critical' ? 'critical' : alert.severity === 'warning' ? 'warning' : 'info'} text={alert.severity.toUpperCase()} /></td>
                  <td className="px-4 py-3 font-medium text-slate-700">{alert.message}</td>
                  <td className="px-4 py-3 text-slate-500">{alert.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      <Card title="Operations Trend (24h)">
         <div className="h-48">
           <SimpleAreaChart data={TIME_SERIES_DATA} dataKey="value" />
         </div>
      </Card>
    </div>
  </div>
);

// --- 2. KPIs Tab ---
export const KPIsTab: React.FC = () => {
  const [selectedKPI, setSelectedKPI] = useState(MOCK_KPIS[0]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)]">
      {/* KPI Explorer List */}
      <Card className="w-full lg:w-1/3 flex flex-col" title="KPI Explorer">
        <div className="mb-4">
           <input type="text" placeholder="Search KPIs..." className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-2">
          {MOCK_KPIS.map(kpi => (
            <div 
              key={kpi.id} 
              onClick={() => setSelectedKPI(kpi)}
              className={`p-3 rounded-md cursor-pointer border transition-all ${selectedKPI.id === kpi.id ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-slate-800">{kpi.name}</span>
                <Badge type={kpi.status} text={kpi.status} />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>{kpi.category}</span>
                <span className="font-mono text-slate-700">{kpi.value}{kpi.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* KPI Detail View */}
      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        <Card className="flex-1" title={`Details: ${selectedKPI.name}`} extra={<Button variant="secondary" className="text-xs">Export Data</Button>}>
          <div className="grid grid-cols-3 gap-4 mb-6">
             <div className="p-3 bg-slate-50 rounded-md">
               <div className="text-xs text-slate-500 uppercase">Current Value</div>
               <div className="text-2xl font-bold text-slate-900">{selectedKPI.value}{selectedKPI.unit}</div>
             </div>
             <div className="p-3 bg-slate-50 rounded-md">
               <div className="text-xs text-slate-500 uppercase">Target Threshold</div>
               <div className="text-2xl font-bold text-slate-900">&lt; {selectedKPI.thresholds?.warning}</div>
             </div>
             <div className="p-3 bg-slate-50 rounded-md">
               <div className="text-xs text-slate-500 uppercase">Owner</div>
               <div className="text-lg font-medium text-slate-900">{selectedKPI.owner}</div>
             </div>
          </div>
          
          <div className="mb-6 h-64">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Performance Trend</h4>
            <SimpleLineChart data={TIME_SERIES_DATA} dataKey="value" target={300} />
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <h4 className="font-semibold text-slate-800 mb-1">Description</h4>
              <p className="text-slate-600 leading-relaxed">{selectedKPI.description}</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-1">Calculation Formula</h4>
              <code className="block bg-slate-100 p-2 rounded text-slate-700 font-mono text-xs border border-slate-200">
                {selectedKPI.formula}
              </code>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// --- 3. UX & Journeys Tab ---
export const UXTab: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <MetricCard title="Task Success Rate" value="88.5%" trend="up" delta={2.1} />
      <MetricCard title="Avg Time to Complete" value="1m 45s" trend="down" delta={5} subtext="Improved by 10s" />
      <MetricCard title="Friction Index" value="12.4" trend="down" delta={1.2} subtext="Lower is better" />
      <MetricCard title="Retry Rate" value="4.5%" trend="stable" delta={0.1} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="User Journey Funnel: Create Quote">
        <div className="h-64">
          <SimpleBarChart data={FUNNEL_DATA} dataKey="value" />
        </div>
        <p className="text-xs text-slate-500 mt-4 text-center">Significant drop-off detected between 'Review' and 'Submit' steps.</p>
      </Card>

      <Card title="Error Heatmap by Step">
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Step Name</th>
                <th className="px-4 py-3 text-right">Error Count</th>
                <th className="px-4 py-3 text-right">Latency Impact</th>
              </tr>
            </thead>
            <tbody>
              {HEATMAP_DATA.map((row, idx) => (
                <tr key={idx} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3 font-medium text-slate-700">{row.step}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-bold ${row.errors > 20 ? 'text-red-600' : row.errors > 10 ? 'text-amber-600' : 'text-slate-700'}`}>
                      {row.errors}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                     <Badge type={row.latency === 'High' ? 'critical' : row.latency === 'Med' ? 'warning' : 'success'} text={row.latency} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  </div>
);

// --- 4. Operations Tab ---
export const OpsTab: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <MetricCard title="API Availability" value="99.99%" trend="stable" delta={0} icon={<Zap size={16} />} />
      <MetricCard title="Throughput" value="4.5k rps" trend="up" delta={12} icon={<Activity size={16} />} />
      <MetricCard title="Active Connections" value="1,240" trend="up" delta={5} icon={<Layers size={16} />} />
      <MetricCard title="Avg Response Time" value="124ms" trend="down" delta={3} icon={<Clock size={16} />} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card title="Infrastructure Metrics (AWS)" className="lg:col-span-2">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-50 p-3 rounded border border-slate-200 text-center">
              <div className="text-xs text-slate-500 mb-1">CPU Load</div>
              <div className="text-xl font-bold text-slate-800">45%</div>
            </div>
            <div className="bg-slate-50 p-3 rounded border border-slate-200 text-center">
              <div className="text-xs text-slate-500 mb-1">Memory</div>
              <div className="text-xl font-bold text-slate-800">62%</div>
            </div>
            <div className="bg-slate-50 p-3 rounded border border-slate-200 text-center">
              <div className="text-xs text-slate-500 mb-1">DB Conn</div>
              <div className="text-xl font-bold text-slate-800">85</div>
            </div>
            <div className="bg-slate-50 p-3 rounded border border-slate-200 text-center">
              <div className="text-xs text-slate-500 mb-1">Queue Depth</div>
              <div className="text-xl font-bold text-slate-800">12</div>
            </div>
         </div>
         <div className="h-64">
            <SimpleLineChart data={TIME_SERIES_DATA} dataKey="value" color="#6366f1" />
         </div>
      </Card>

      <Card title="Recent Major Incidents">
        <div className="space-y-4">
          {MOCK_INCIDENTS.map(inc => (
            <div key={inc.id} className="p-3 border border-slate-100 rounded bg-slate-50">
              <div className="flex justify-between items-start mb-2">
                <Badge type={inc.severity === 'Sev1' ? 'critical' : 'warning'} text={inc.severity} />
                <span className={`text-xs font-medium ${inc.status === 'Resolved' ? 'text-green-600' : 'text-amber-600'}`}>{inc.status}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-800 mb-1">{inc.title}</h4>
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>Started: {inc.startedAt}</span>
                <span>Duration: {inc.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

// --- 5. Value Tab ---
export const ValueTab: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="border-l-4 border-l-emerald-500">
        <div className="flex items-center justify-between">
          <div>
             <div className="text-slate-500 text-sm font-medium uppercase">Productivity Gain</div>
             <div className="text-2xl font-bold text-slate-900 mt-1">1,250 hrs</div>
             <div className="text-xs text-slate-400 mt-1">Saved this month</div>
          </div>
          <Clock className="text-emerald-500 opacity-20" size={40} />
        </div>
      </Card>
      <Card className="border-l-4 border-l-blue-500">
        <div className="flex items-center justify-between">
          <div>
             <div className="text-slate-500 text-sm font-medium uppercase">Tickets Avoided</div>
             <div className="text-2xl font-bold text-slate-900 mt-1">450</div>
             <div className="text-xs text-slate-400 mt-1">Auto-remediated</div>
          </div>
          <Shield className="text-blue-500 opacity-20" size={40} />
        </div>
      </Card>
      <Card className="border-l-4 border-l-purple-500">
        <div className="flex items-center justify-between">
          <div>
             <div className="text-slate-500 text-sm font-medium uppercase">Est. Cost Savings</div>
             <div className="text-2xl font-bold text-slate-900 mt-1">$45,200</div>
             <div className="text-xs text-slate-400 mt-1">Based on efficiency</div>
          </div>
          <DollarSign className="text-purple-500 opacity-20" size={40} />
        </div>
      </Card>
    </div>

    <Card title="Before vs After: MaaS Implementation Impact">
      <div className="h-64">
        <SimpleBarChart data={[
          { name: 'Incidents/Month', value: 45, fill: '#94a3b8' }, // Before
          { name: 'Incidents/Month (Now)', value: 12, fill: '#10b981' }, // After
          { name: 'Deployment Time (min)', value: 60, fill: '#94a3b8' },
          { name: 'Deployment Time (Now)', value: 15, fill: '#10b981' },
        ]} dataKey="value" />
      </div>
    </Card>
  </div>
);

// --- 6. Cost Tab ---
export const CostTab: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="Monthly Cost Distribution">
        <div className="h-64">
          <SimpleDonutChart data={COST_DATA} />
        </div>
      </Card>
      <Card title="Cost Summary">
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <span className="text-slate-600">Total Projected Cost</span>
            <span className="text-2xl font-bold text-slate-900">$10,500</span>
          </div>
           <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <span className="text-slate-600">Budget</span>
            <span className="text-xl font-medium text-slate-900">$12,000</span>
          </div>
          <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
            <div className="flex items-start gap-3">
              <Zap size={18} className="text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-blue-800">Optimization Tip</h4>
                <p className="text-sm text-blue-700 mt-1">Log ingestion for "Dev" environment is 30% higher than average. Consider adjusting log levels to WARN to save approx $400/mo.</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

// --- 7. KPI Registry Tab ---
export const RegistryTab: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-96">
           <input type="text" placeholder="Search KPI Registry..." className="w-full px-4 py-2 pl-10 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
           <div className="absolute left-3 top-2.5 text-slate-400"><Database size={16}/></div>
        </div>
        <Button onClick={() => setModalOpen(true)}>+ Add New KPI</Button>
      </div>

      <Card className="overflow-hidden p-0">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">KPI Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Owner</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Thresholds</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_KPIS.map(kpi => (
              <tr key={kpi.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">{kpi.name}</td>
                <td className="px-6 py-4 text-slate-600">{kpi.category}</td>
                <td className="px-6 py-4 text-slate-600">{kpi.owner}</td>
                <td className="px-6 py-4"><Badge type="success" text="Active" /></td>
                <td className="px-6 py-4 text-slate-600 font-mono text-xs">{kpi.thresholds ? `W: ${kpi.thresholds.warning} | C: ${kpi.thresholds.critical}` : 'N/A'}</td>
                <td className="px-6 py-4 text-right text-blue-600 font-medium cursor-pointer hover:underline">Edit</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Fake Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-[600px] p-6 animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Define New KPI</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">KPI Name</label>
                <input type="text" className="w-full border border-slate-300 rounded px-3 py-2" placeholder="e.g. Cart Abandonment Rate" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                   <select className="w-full border border-slate-300 rounded px-3 py-2">
                     <option>Business Value</option>
                     <option>UX</option>
                     <option>Operational</option>
                   </select>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Owner</label>
                   <input type="text" className="w-full border border-slate-300 rounded px-3 py-2" placeholder="Team Name" />
                 </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Calculation Formula</label>
                <textarea className="w-full border border-slate-300 rounded px-3 py-2 font-mono text-sm h-24" placeholder="Enter pseudo-code or metric query..." />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={() => setModalOpen(false)}>Save KPI</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- 8. Evaluation Tab ---
export const EvaluationTab: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <div className="text-center py-4">
           <div className="text-4xl font-bold text-slate-800 mb-2">92/100</div>
           <Badge type="success" text="Excellent" />
           <p className="text-sm text-slate-500 mt-3">Overall Data Confidence Score</p>
        </div>
      </Card>
      <Card title="Data Quality Issues">
         <div className="space-y-3">
           <div className="flex justify-between items-center">
             <span className="text-sm text-slate-600">Stale Data Feeds</span>
             <span className="font-bold text-slate-900">0</span>
           </div>
           <div className="flex justify-between items-center">
             <span className="text-sm text-slate-600">Missing Thresholds</span>
             <span className="font-bold text-amber-600">2</span>
           </div>
           <div className="flex justify-between items-center">
             <span className="text-sm text-slate-600">Schema Drift</span>
             <span className="font-bold text-slate-900">0</span>
           </div>
         </div>
      </Card>
    </div>

    <Card title="Confidence by KPI">
      <table className="w-full text-sm text-left">
         <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
           <tr>
             <th className="px-4 py-3">KPI</th>
             <th className="px-4 py-3">Source</th>
             <th className="px-4 py-3">Last Evaluated</th>
             <th className="px-4 py-3">Confidence</th>
           </tr>
         </thead>
         <tbody>
           {MOCK_KPIS.map((k, i) => (
             <tr key={k.id} className="border-b border-slate-100">
               <td className="px-4 py-3 font-medium">{k.name}</td>
               <td className="px-4 py-3 text-slate-500">{i % 2 === 0 ? 'App Telemetry' : 'AWS CloudWatch'}</td>
               <td className="px-4 py-3 text-slate-500">10 mins ago</td>
               <td className="px-4 py-3">
                 <div className="w-full bg-slate-200 rounded-full h-2.5 max-w-[100px]">
                   <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${90 + (i * 2)}%` }}></div>
                 </div>
               </td>
             </tr>
           ))}
         </tbody>
      </table>
    </Card>
  </div>
);

export const AlertsTab: React.FC = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Critical Alerts" value="1" trend="down" delta={2} icon={<AlertTriangle size={16} className="text-red-500"/>} />
        <MetricCard title="Warnings" value="4" trend="up" delta={1} icon={<AlertTriangle size={16} className="text-amber-500"/>} />
        <MetricCard title="MTTR (Avg)" value="14m" trend="down" delta={5} icon={<Clock size={16} />} />
      </div>
      <Card title="Active Alert Queue">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Severity</th>
              <th className="px-4 py-3">Issue</th>
              <th className="px-4 py-3">Metric Source</th>
              <th className="px-4 py-3">Triggered</th>
              <th className="px-4 py-3">Value / Threshold</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
             {MOCK_ALERTS.map(alert => (
               <tr key={alert.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                 <td className="px-4 py-3"><Badge type={alert.severity as any} text={alert.severity.toUpperCase()} /></td>
                 <td className="px-4 py-3 font-medium text-slate-800">{alert.message}</td>
                 <td className="px-4 py-3 text-slate-500">{alert.source}</td>
                 <td className="px-4 py-3 text-slate-500">{alert.timestamp}</td>
                 <td className="px-4 py-3 text-mono text-xs">{alert.value} <span className="text-slate-400">vs</span> {alert.threshold}</td>
                 <td className="px-4 py-3 text-right">
                   <Button variant="secondary" className="px-2 py-1 text-xs">Ack</Button>
                 </td>
               </tr>
             ))}
          </tbody>
        </table>
      </Card>
    </div>
);
