import React, { useState } from 'react';
import {
  Activity,
  LayoutDashboard,
  ClipboardCheck,
  ShieldAlert,
  FileText,
  Settings,
  Menu,
  X,
  Search,
  Bell,
  Stethoscope,
  AlertTriangle
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import ChecklistTool from './components/ChecklistTool';
import RiskAuditor from './components/RiskAuditor';
import StandardsViewer from './components/StandardsViewer';
import IncidentForm from './components/IncidentForm';

type Page = 'dashboard' | 'checklist' | 'auditor' | 'standards' | 'reporting';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'checklist', name: 'Safety Checklist', icon: ClipboardCheck },
    { id: 'auditor', name: 'Risk Auditor', icon: ShieldAlert },
    { id: 'standards', name: 'Standards & SOPs', icon: FileText },
    { id: 'reporting', name: 'Report Incident', icon: AlertTriangle },
  ];

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />;
      case 'checklist': return <ChecklistTool />;
      case 'auditor': return <RiskAuditor />;
      case 'standards': return <StandardsViewer />;
      case 'reporting': return <IncidentForm />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      { }
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      { }
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Stethoscope className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-white font-bold tracking-tight">SafeOR</h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Operating QMS</p>
            </div>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id as Page);
                  setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${activePage === item.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'hover:bg-slate-800 text-slate-400 hover:text-white'}
                `}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-800">
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Activity size={16} className="text-emerald-500" />
                </div>
                <p className="text-xs font-semibold text-white">OR-A Status</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px]">
                  <span>Air Quality</span>
                  <span className="text-emerald-500">HEPA-99</span>
                </div>
                <div className="w-full bg-slate-700 h-1 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[99%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-slate-800">
            <button className="flex items-center gap-3 px-4 py-2 w-full text-sm text-slate-500 hover:text-white transition-colors">
              <Settings size={18} />
              Settings
            </button>
          </div>
        </div>
      </aside>

      { }
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        { }
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
            >
              <Menu size={20} />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 w-64">
              <Search size={16} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search audit logs..."
                className="bg-transparent text-sm w-full outline-none text-slate-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>
            <div className="flex items-center gap-3 pl-1 sm:pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800">Dr. Sarah Chen</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Chief of Surgery</p>
              </div>
              <img
                src="https://picsum.photos/seed/doc/100/100"
                alt="Profile"
                className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm ring-1 ring-slate-100"
              />
            </div>
          </div>
        </header>

        { }
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>

        { }
        <footer className="h-10 border-t border-slate-200 bg-white px-6 flex items-center justify-between text-[10px] text-slate-400 font-medium">
          <div className="flex gap-4">
            <span>Server Time: {new Date().toLocaleTimeString()}</span>
            <span>Version: 2.1.0-stable</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-600 font-bold uppercase">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            System Secure
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
