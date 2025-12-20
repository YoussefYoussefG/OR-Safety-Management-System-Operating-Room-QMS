import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { Shield, Activity, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { fetchDashboardStats } from '../services/api';

const data = [
  { name: 'Mon', incidents: 0, compliance: 98 },
  { name: 'Tue', incidents: 1, compliance: 95 },
  { name: 'Wed', incidents: 0, compliance: 99 },
  { name: 'Thu', incidents: 2, compliance: 92 },
  { name: 'Fri', incidents: 0, compliance: 100 },
  { name: 'Sat', incidents: 0, compliance: 98 },
  { name: 'Sun', incidents: 0, compliance: 99 },
];

const pieData = [
  { name: 'Sterile', value: 85, color: '#10b981' },
  { name: 'Cleaning', value: 10, color: '#f59e0b' },
  { name: 'Contaminated', value: 5, color: '#ef4444' },
];

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    compliance_score: 97.2,
    total_incidents: 3,
    open_incidents: 0,
    system_status: "Healthy"
  });

  useEffect(() => {
    fetchDashboardStats().then(data => {
      // Only update if data is valid/non-empty to prevent UI flash if API fails 
      if (data) setStats(data);
    }).catch(err => {
      console.warn("Using simulated data (API failure)", err);
    });
  }, []);

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">QMS Real-time Dashboard</h1>
          <p className="text-slate-500">Live monitoring of Operating Room health and safety standards.</p>
        </div>
        <div className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full border ${stats.open_incidents === 0
          ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
          : 'bg-rose-50 border-rose-100 text-rose-600'
          }`}>
          <Activity size={16} />
          <span>System Status: {stats.open_incidents === 0 ? "Normal" : `${stats.open_incidents} Active Alerts`}</span>
        </div>
      </header>

      { }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Compliance Score', value: `${stats.compliance_score}%`, icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Total Reports', value: stats.total_incidents, icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Pending Audits', value: '3', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Active Alerts', value: stats.open_incidents, icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className={`p-2 rounded-lg ${kpi.bg} ${kpi.color}`}>
                <kpi.icon size={20} />
              </span>
              <span className="text-xs font-medium text-slate-400">Live</span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{kpi.label}</p>
            <h3 className="text-2xl font-bold text-slate-800">{kpi.value}</h3>
          </div>
        ))}
      </div>

      { }
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Weekly Compliance Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} domain={[80, 100]} />
                <Tooltip />
                <Area type="monotone" dataKey="compliance" stroke="#3b82f6" fillOpacity={1} fill="url(#colorComp)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Equipment Status Distribution</h3>
          <div className="h-[300px] flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2 pr-4">
              {pieData.map((d, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                  <span className="text-slate-600 font-medium">{d.name}</span>
                  <span className="text-slate-400">({d.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
