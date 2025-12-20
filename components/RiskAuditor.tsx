import React, { useState } from 'react';
import { analyzeRisk } from '../services/geminiService';
import { AlertCircle, Brain, Loader2, CheckCircle2, ShieldAlert, Info } from 'lucide-react';

const RiskAuditor: React.FC = () => {
  const [scenario, setScenario] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!scenario.trim()) return;
    setLoading(true);
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 text-blue-600 mb-4">
            <Brain size={24} />
            <h2 className="text-xl font-bold">AI Risk Auditor</h2>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mb-4 text-xs text-blue-800">
            <div className="flex gap-2 mb-1 font-bold">
              <Info size={14} />
              QMS Challenge: Subjectivity
            </div>
            Traditional risk assessment is subjective and reactive. This tool uses AI to standardize risk scoring and propose immediate remediation.
          </div>

          <p className="text-slate-500 text-sm mb-6">
            Input a scenario or observation to resolve QMS challenges using the AI-assisted resolution engine.
          </p>

          <div className="space-y-4">
            <textarea
              className="w-full h-32 p-3 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Describe the incident or finding..."
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
            ></textarea>

            <button
              onClick={handleAnalyze}
              disabled={loading || !scenario}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-blue-700 transition-colors"
            >
              {loading ? <Loader2 className="animate-spin" /> : <ShieldAlert size={18} />}
              Analyze Risk
            </button>
          </div>

          <div className="mt-8">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Suggested Templates</p>
            <div className="space-y-2">
              {PRESETS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setScenario(p)}
                  className="w-full text-left text-xs p-2 rounded bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100 truncate"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        {!result && !loading && (
          <div className="h-full flex flex-col items-center justify-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-12 text-center">
            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
              <Brain size={48} className="text-slate-300" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700">Ready for Analysis</h3>
            <p className="text-slate-400 max-w-xs mx-auto">Enter an OR scenario to the left to see potential risks and remediation steps.</p>
          </div>
        )}

        {loading && (
          <div className="h-full flex flex-col items-center justify-center bg-white border border-slate-100 rounded-xl p-12">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-slate-600 font-medium">Consulting QMS Standards Database...</p>
          </div>
        )}

        {result && !loading && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-800">Analysis Result</h3>
                <div className={`px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2 ${result.riskScore > 70 ? 'bg-rose-100 text-rose-700' :
                  result.riskScore > 30 ? 'bg-amber-100 text-amber-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>
                  <AlertCircle size={16} />
                  Risk Level: {result.riskScore}%
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Critical Findings</h4>
                  <ul className="space-y-3">
                    {result.findings.map((f: string, i: number) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-700 bg-rose-50/50 p-3 rounded-lg border border-rose-100">
                        <AlertCircle className="text-rose-500 flex-shrink-0" size={18} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Remediation Steps</h4>
                  <ul className="space-y-3">
                    {result.remediation.map((r: string, i: number) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-700 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
                        <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={18} />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <button className="w-full py-3 border-2 border-slate-100 text-slate-600 rounded-lg font-bold hover:bg-slate-50 transition-colors">
                  Export Assessment PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskAuditor;
