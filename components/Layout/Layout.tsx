import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
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
  AlertTriangle,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { fetchNotifications, markNotificationRead } from '../../services/api';

const navigation = [
  { path: '/', name: 'Dashboard', icon: LayoutDashboard },
  { path: '/checklist', name: 'Safety Checklist', icon: ClipboardCheck },
  { path: '/auditor', name: 'Risk Auditor', icon: ShieldAlert },
  { path: '/standards', name: 'Standards & SOPs', icon: FileText },
  { path: '/reporting', name: 'Report Incident', icon: AlertTriangle },
];

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [airQuality, setAirQuality] = useState(99);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    // Air Quality Simulation
    const interval = setInterval(() => {
      setAirQuality(prev => {
        // slightly drift the value by -1, 0, or +1, keeping it bounded between 92 and 100
        const drift = Math.floor(Math.random() * 3) - 1;
        let newValue = prev + drift;
        if (newValue > 100) newValue = 100;
        if (newValue < 92) newValue = 92;
        return newValue;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await fetchNotifications();
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };
    if (user) {
      loadNotifications();
      // Polling could be added here
    }
  }, [user]);

  const handleNotificationClick = async (id: string, is_read: boolean) => {
    if (!is_read) {
      try {
        await markNotificationRead(id);
        setNotifications(notifications.map(n => 
          n.id === id ? { ...n, is_read: true } : n
        ));
      } catch (error) {
        console.error("Failed to mark as read:", error);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

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
                  <span className={airQuality >= 97 ? 'text-emerald-400' : airQuality >= 95 ? 'text-amber-400' : 'text-rose-400'}>
                    {airQuality >= 95 ? `HEPA-${airQuality}%` : `WARN-${airQuality}%`}
                  </span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    animate={{ width: `${airQuality}%` }}
                    transition={{ duration: 1 }}
                    className={`h-full bg-gradient-to-r ${
                      airQuality >= 97 
                        ? 'from-emerald-500 to-emerald-400' 
                        : airQuality >= 95 
                        ? 'from-amber-500 to-amber-400' 
                        : 'from-rose-500 to-rose-400'
                    }`}
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

          <div className="flex items-center gap-3 md:gap-5 relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl relative transition-colors"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <>
                  <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white animate-ping"></span>
                  <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                </>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute top-full right-20 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50">
                <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <h3 className="font-bold text-slate-800 text-sm">Notifications</h3>
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-semibold">{unreadCount} new</span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-slate-500 text-sm">No notifications yet</div>
                  ) : (
                    notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        onClick={() => handleNotificationClick(notification.id, notification.is_read)}
                        className={`p-3 border-b border-slate-100 cursor-pointer transition-colors hover:bg-slate-50 ${!notification.is_read ? 'bg-blue-50/30' : ''}`}
                      >
                        <div className="flex gap-3">
                          <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${!notification.is_read ? 'bg-blue-500' : 'bg-slate-300'}`}></div>
                          <div>
                            <p className={`text-sm ${!notification.is_read ? 'text-slate-800 font-semibold' : 'text-slate-600'}`}>{notification.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{notification.message}</p>
                            <p className="text-[10px] text-slate-400 mt-1">{new Date(notification.created_at).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
            
            <div 
              onClick={() => navigate('/profile')}
              className="flex items-center gap-3 group relative cursor-pointer group p-1 pr-2 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {user ? `Dr. ${user.first_name || user.username}` : 'Loading...'}
                </p>
                <p className="text-[10px] text-slate-400 font-bold uppercase">{user?.profile?.specialty || 'Medical Staff'}</p>
              </div>
              <img
                src={user?.profile?.avatar || `https://ui-avatars.com/api/?name=${user?.username || 'U'}&background=random`}
                alt="Profile"
                className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm ring-1 ring-slate-100 group-hover:ring-blue-200 transition-all"
              />
              <button 
                onClick={(e) => { e.stopPropagation(); handleLogout(); }}
                className="absolute right-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-rose-500 hover:bg-rose-50 rounded-xl"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
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
