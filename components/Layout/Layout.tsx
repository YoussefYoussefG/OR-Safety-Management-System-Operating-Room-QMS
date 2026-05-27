import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  LayoutDashboard,
  ClipboardCheck,
  ShieldAlert,
  FileText,
  Settings,
  Menu,
  Search,
  Bell,
  Stethoscope,
  AlertTriangle
} from 'lucide-react';

const navigation = [
  { path: '/', name: 'Dashboard', icon: LayoutDashboard },
  { path: '/checklist', name: 'Safety Checklist', icon: ClipboardCheck },
  { path: '/auditor', name: 'Risk Auditor', icon: ShieldAlert },
  { path: '/standards', name: 'Standards & SOPs', icon: FileText },
  { path: '/reporting', name: 'Report Incident', icon: AlertTriangle },
];

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden font-sans text-slate-900">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col shadow-2xl lg:shadow-none">
          <div className="p-6 flex items-center gap-3 border-b border-slate-800">
            <motion.div 
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30"
            >
              <Stethoscope className="text-white" size={24} />
            </motion.div>
            <div>
              <h2 className="text-white font-bold tracking-tight text-lg">SafeOR</h2>
              <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Operating QMS</p>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) => `
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative
                  ${isActive
                    ? 'bg-blue-600/10 text-blue-400 shadow-md border border-blue-500/20'
                    : 'hover:bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-transparent'}
                `}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute inset-0 bg-blue-600 rounded-xl -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <item.icon size={20} className={`transition-colors ${isActive ? 'text-white' : 'group-hover:text-blue-400'}`} />
                    <span className={`font-medium ${isActive ? 'text-white' : ''}`}>{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-800">
            <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Activity size={16} className="text-emerald-400 animate-pulse" />
                </div>
                <p className="text-xs font-semibold text-slate-300">OR-A Status</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-medium">
                  <span className="text-slate-400">Air Quality</span>
                  <span className="text-emerald-400">HEPA-99</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "99%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full w-[99%]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 z-30 flex-shrink-0 support-backdrop-blur:bg-white/60">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <Menu size={20} />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-slate-100/80 hover:bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 w-72 transition-all focus-within:w-80 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400">
              <Search size={16} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search audit logs, incidents..."
                className="bg-transparent text-sm w-full outline-none text-slate-600 placeholder-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl relative transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"></span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
            <div className="flex items-center gap-3 cursor-pointer group p-1 pr-2 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Dr. Sarah Chen</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Chief of Surgery</p>
              </div>
              <img
                src="https://picsum.photos/seed/doc/100/100"
                alt="Profile"
                className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm ring-1 ring-slate-100 group-hover:ring-blue-200 transition-all"
              />
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50/50 relative p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-7xl mx-auto w-full h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Layout;
