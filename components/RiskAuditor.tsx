import React, { useState } from 'react';
import { analyzeRisk } from '../services/geminiService';
import { AlertCircle, Brain, Loader2, CheckCircle2, ShieldAlert, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RiskAuditor: React.FC = () => {
  const [scenario, setScenario] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!scenario.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const data = await analyzeRisk(scenario);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const PRESETS = [
    "Possible sterile field contamination during long orthopedic procedure.",
    "HVAC system pressure drop in OR 4 during active surgery.",
    "Post-operative spike in SSI rates for surgeons using new suturing equipment.",
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
          <div className="flex items-center gap-3 text-blue-600 mb-6">
            <div className="p-2 bg-blue-50 rounded-xl">
              <Brain size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">AI Risk Auditor</h2>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100/50 mb-6 shadow-inner">
            <div className="flex items-center gap-2 mb-2 font-bold text-blue-800 text-sm">
              <Info size={16} />
              QMS Challenge: Subjectivity
            </div>
            <p className="text-xs text-blue-700/80 leading-relaxed">
              Traditional risk assessment is subjective and reactive. This tool uses AI to standardize risk scoring and propose immediate remediation.
            </p>
          </div>

          <div className="flex-1 flex flex-col space-y-4">
            <textarea
              className="w-full flex-1 min-h-[150px] p-4 text-sm border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none shadow-sm placeholder:text-slate-400"
              placeholder="Describe the incident, observation, or finding in detail..."
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
            ></textarea>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAnalyze}
              disabled={loading || !scenario}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 hover:shadow-lg hover:shadow-blue-500/30 transition-all"
            >
              {loading ? <Loader2 className="animate-spin" /> : <ShieldAlert size={18} />}
              {loading ? 'Analyzing...' : 'Analyze Risk'}
            </motion.button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Suggested Templates</p>
            <div className="space-y-2">
              {PRESETS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setScenario(p)}
                  className="w-full text-left text-xs p-3 rounded-xl bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-700 border border-slate-100 hover:border-blue-200 transition-all truncate"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 flex flex-col">
        <AnimatePresence mode="wait">
          {!result && !loading && (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 flex flex-col items-center justify-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center"
            >
              <div className="bg-white p-6 rounded-3xl shadow-sm mb-6 border border-slate-100">
                <Brain size={48} className="text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">Ready for Analysis</h3>
              <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
                Enter an OR scenario to the left to perform an AI-driven safety analysis mapping against QMS standards.
              </p>
            </motion.div>
          )}

          {loading && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center bg-white border border-slate-100 shadow-sm rounded-2xl p-12"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
                <Loader2 className="w-16 h-16 text-blue-600 animate-spin relative z-10" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Analyzing Scenario</h3>
              <p className="text-slate-500 font-medium animate-pulse">Consulting QMS Standards Database...</p>
            </motion.div>
          )}

          {result && !loading && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 flex-1"
            >
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">Analysis Result</h3>
                    <p className="text-slate-500 text-sm mt-1">Generated by Gemini 2.5 Safety Model</p>
                  </div>
                  <div className={`px-6 py-2 rounded-2xl text-lg font-bold flex items-center gap-3 border ${
                    result.riskScore > 70 ? 'bg-rose-50 text-rose-700 border-rose-200 shadow-rose-100' :
                    result.riskScore > 30 ? 'bg-amber-50 text-amber-700 border-amber-200 shadow-amber-100' :
                    'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-emerald-100'
                  } shadow-sm`}>
                    <AlertCircle size={24} />
                    Risk Score: {result.riskScore}/100
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                       <div className="p-1.5 bg-rose-100 rounded-lg text-rose-600"><AlertCircle size={16} /></div>
                       <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Critical Findings</h4>
                    </div>
                    <ul className="space-y-3">
                      {result.findings.map((f: string, i: number) => (
                        <motion.li 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          key={i} 
                          className="flex gap-3 text-sm text-slate-700 bg-rose-50/30 p-4 rounded-xl border border-rose-100 shadow-sm"
                        >
                          <span className="text-rose-500 font-bold mt-0.5">•</span>
                          {f}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                       <div className="p-1.5 bg-emerald-100 rounded-lg text-emerald-600"><CheckCircle2 size={16} /></div>
                       <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Remediation Steps</h4>
                    </div>
                    <ul className="space-y-3">
                      {result.remediation.map((r: string, i: number) => (
                        <motion.li 
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          key={i} 
                          className="flex gap-3 text-sm text-slate-700 bg-emerald-50/30 p-4 rounded-xl border border-emerald-100 shadow-sm"
                        >
                          <span className="text-emerald-500 font-bold mt-0.5">{i + 1}.</span>
                          {r}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <button className="w-full py-4 border-2 border-slate-200 text-slate-600 hover:text-slate-800 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
                    <FileText size={18} />
                    Export Assessment Report PDF
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RiskAuditor;
