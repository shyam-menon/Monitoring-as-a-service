import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BarChart2, 
  Users, 
  Activity, 
  TrendingUp, 
  Bell, 
  DollarSign, 
  List, 
  ShieldCheck, 
  UserCircle, 
  ChevronDown, 
  Globe, 
  Settings
} from 'lucide-react';
import { OverviewTab, KPIsTab, UXTab, OpsTab, ValueTab, CostTab, RegistryTab, EvaluationTab, AlertsTab } from './components/TabViews';
import { TENANTS, APPS } from './constants';
import { Persona, TimeRange } from './types';

const App: React.FC = () => {
  // Global State
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTenant, setSelectedTenant] = useState(TENANTS[0].id);
  const [selectedApp, setSelectedApp] = useState(APPS[0].id);
  const [timeRange, setTimeRange] = useState<TimeRange>('Last 24h');
  const [persona, setPersona] = useState<Persona>('Product Owner');

  // Filters
  const filteredApps = APPS.filter(app => app.tenantId === selectedTenant);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab />;
      case 'kpis': return <KPIsTab />;
      case 'ux': return <UXTab />;
      case 'ops': return <OpsTab />;
      case 'value': return <ValueTab />;
      case 'alerts': return <AlertsTab />;
      case 'cost': return <CostTab />;
      case 'registry': return <RegistryTab />;
      case 'evaluation': return <EvaluationTab />;
      default: return <OverviewTab />;
    }
  };

  const SidebarItem: React.FC<{ id: string; icon: React.ReactNode; label: string }> = ({ id, icon, label }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors rounded-md ${activeTab === id ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top Nav */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 fixed w-full z-30 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-600 p-1.5 rounded text-white">
             <Activity size={20} />
          </div>
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">Monitoring as a Service <span className="text-slate-400 font-light">| MaaS</span></h1>
          <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs font-bold uppercase border border-purple-200">Prod</span>
        </div>

        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-2 text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
             <Globe size={14} />
             <span>{TENANTS.find(t => t.id === selectedTenant)?.name}</span>
             <span className="text-slate-300">/</span>
             <span className="font-medium text-slate-900">{APPS.find(a => a.id === selectedApp)?.name}</span>
          </div>
          
          <div className="flex items-center space-x-2 border-l pl-6 border-slate-200">
             <div className="text-right hidden md:block">
               <div className="text-sm font-medium text-slate-900">John Doe</div>
               <div className="text-xs text-slate-500">{persona}</div>
             </div>
             <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 border border-slate-300">
               <UserCircle size={20} />
             </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        {/* Left Sidebar */}
        <aside className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 fixed h-full overflow-y-auto z-20 hidden md:flex flex-col">
          <div className="p-6 space-y-6">
            {/* Context Selectors */}
            <div className="space-y-4">
               <div>
                 <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Tenant</label>
                 <div className="relative">
                    <select 
                      value={selectedTenant} 
                      onChange={(e) => { setSelectedTenant(e.target.value); setSelectedApp(APPS.filter(a => a.tenantId === e.target.value)[0].id); }}
                      className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded px-3 py-2 appearance-none focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                      {TENANTS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-3 text-slate-500 pointer-events-none"/>
                 </div>
               </div>
               <div>
                 <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Application</label>
                 <div className="relative">
                    <select 
                      value={selectedApp}
                      onChange={(e) => setSelectedApp(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded px-3 py-2 appearance-none focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                      {filteredApps.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-3 text-slate-500 pointer-events-none"/>
                 </div>
               </div>
               <div>
                 <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Time Range</label>
                 <div className="grid grid-cols-4 gap-1 bg-slate-800 p-1 rounded border border-slate-700">
                    {['1h', '24h', '7d', '30d'].map(range => (
                      <button 
                        key={range}
                        onClick={() => setTimeRange(`Last ${range}` as TimeRange)}
                        className={`text-[10px] font-medium py-1 rounded ${timeRange === `Last ${range}` ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                      >
                        {range}
                      </button>
                    ))}
                 </div>
               </div>
            </div>

            <div className="border-t border-slate-800 pt-4">
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Views</label>
              <nav className="space-y-1">
                <SidebarItem id="overview" icon={<LayoutDashboard size={18} />} label="Overview" />
                <SidebarItem id="kpis" icon={<BarChart2 size={18} />} label="KPIs" />
                <SidebarItem id="ux" icon={<Users size={18} />} label="UX & Journeys" />
                <SidebarItem id="ops" icon={<Activity size={18} />} label="Operations" />
                <SidebarItem id="value" icon={<TrendingUp size={18} />} label="Value" />
                <SidebarItem id="alerts" icon={<Bell size={18} />} label="Alerts & Incidents" />
                <SidebarItem id="cost" icon={<DollarSign size={18} />} label="Cost & Usage" />
              </nav>
            </div>

            <div className="border-t border-slate-800 pt-4">
               <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Governance</label>
               <nav className="space-y-1">
                 <SidebarItem id="registry" icon={<List size={18} />} label="KPI Registry" />
                 <SidebarItem id="evaluation" icon={<ShieldCheck size={18} />} label="Evaluation" />
               </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-8 overflow-y-auto h-[calc(100vh-64px)] bg-slate-50/50">
           <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-end mb-8">
                <div>
                   <h2 className="text-2xl font-bold text-slate-900 capitalize">{activeTab.replace('-', ' ')}</h2>
                   <p className="text-slate-500 mt-1">
                     Showing data for <span className="font-semibold text-slate-700">{TENANTS.find(t => t.id === selectedTenant)?.name} - {APPS.find(a => a.id === selectedApp)?.name}</span> over {timeRange}.
                   </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">Persona View:</span>
                  <select 
                    value={persona} 
                    onChange={(e) => setPersona(e.target.value as Persona)}
                    className="bg-white border border-slate-300 text-slate-700 text-sm rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Product Owner</option>
                    <option>DevOps</option>
                    <option>Leadership</option>
                  </select>
                </div>
              </div>

              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {renderContent()}
              </div>
           </div>
        </main>
      </div>
    </div>
  );
};

export default App;
