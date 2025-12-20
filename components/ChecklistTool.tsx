import React, { useState } from 'react';
import { CheckSquare, Square, Save, RotateCcw } from 'lucide-react';
import { ChecklistItem } from '../types';

const INITIAL_ITEMS: ChecklistItem[] = [
  { id: '1', text: 'Patient identity, site, procedure confirmed', phase: 'Pre-op', completed: false },
  { id: '2', text: 'Site marked (if applicable)', phase: 'Pre-op', completed: false },
  { id: '3', text: 'Anesthesia safety check completed', phase: 'Pre-op', completed: false },
  { id: '4', text: 'Pulse oximeter on and functioning', phase: 'Pre-op', completed: false },
  { id: '5', text: 'Does patient have known allergy?', phase: 'Pre-op', completed: false },
  { id: '6', text: 'All team members introduced themselves by name and role', phase: 'Intra-op', completed: false },
  { id: '7', text: 'Surgeon, anesthesia professional, and nurse verbally confirm patient identity', phase: 'Intra-op', completed: false },
  { id: '8', text: 'Antibiotic prophylaxis given within last 60 mins', phase: 'Intra-op', completed: false },
  { id: '9', text: 'Instrument, sponge and needle counts correct', phase: 'Post-op', completed: false },
  { id: '10', text: 'Specimen labeled correctly (including patient name)', phase: 'Post-op', completed: false },
];

const ChecklistTool: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>(INITIAL_ITEMS);
  const [activeTab, setActiveTab] = useState<'Pre-op' | 'Intra-op' | 'Post-op'>('Pre-op');

  const toggleItem = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const filteredItems = items.filter(item => item.phase === activeTab);
  const completionRate = Math.round((items.filter(i => i.completed).length / items.length) * 100);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Surgical Safety Checklist</h2>
          <p className="text-slate-500 text-sm">WHO Mandatory Standard Operating Procedure</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm font-semibold text-slate-600">Overall Progress</span>
          <div className="w-32 h-2 bg-slate-200 rounded-full mt-1 overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex border-b border-slate-100">
        {(['Pre-op', 'Intra-op', 'Post-op'] as const).map(phase => (
          <button
            key={phase}
            onClick={() => setActiveTab(phase)}
            className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === phase
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30'
              : 'text-slate-500 hover:text-slate-700 hover:text-slate-700 hover:bg-slate-50'
              }`}
          >
            {phase}
          </button>
        ))}
      </div>

      <div className="p-6 space-y-3 min-h-[400px]">
        {filteredItems.map(item => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${item.completed
              ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
              : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
              }`}
          >
            {item.completed ? (
              <CheckSquare className="text-emerald-500 flex-shrink-0" />
            ) : (
              <Square className="text-slate-300 flex-shrink-0" />
            )}
            <span className="font-medium">{item.text}</span>
          </div>
        ))}
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
        <button
          onClick={() => setItems(INITIAL_ITEMS)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
        >
          <RotateCcw size={18} />
          Reset Checklist
        </button>
        <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
          <Save size={18} />
          Finalize & Log
        </button>
      </div>
    </div>
  );
};

export default ChecklistTool;
