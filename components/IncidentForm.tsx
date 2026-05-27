import React, { useState } from 'react';
import { reportIncident } from '../services/api';
import { AlertTriangle, Send, Loader2, CheckCircle2, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const IncidentForm: React.FC = () => {
    const [formData, setFormData] = useState({
        type: '',
        description: '',
        severity: 'LOW',
        reported_by: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            await reportIncident({
                ...formData,
                status: 'OPEN'
            });
            setSuccess(true);
            setFormData({ type: '', description: '', severity: 'LOW', reported_by: '' });
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            console.error(err);
            setError('Failed to submit report. Please check API connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
            >
                <div className="bg-rose-600 p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                        <ShieldAlert size={160} />
                    </div>
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                            <AlertTriangle className="text-white" size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Report Safety Incident</h2>
                            <p className="text-rose-100 mt-1 font-medium text-sm">Log a new QMS non-conformance or safety event immediately.</p>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <AnimatePresence mode="wait">
                        {success && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 shadow-sm"
                            >
                                <div className="p-2 bg-emerald-100 rounded-lg"><CheckCircle2 size={20} className="text-emerald-600" /></div>
                                <p className="font-semibold">Incident reported successfully. Security protocols updated. Monitor the Dashboard for status.</p>
                            </motion.div>
                        )}

                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-8 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-800 shadow-sm"
                            >
                                <div className="p-2 bg-rose-100 rounded-lg"><AlertTriangle size={20} className="text-rose-600" /></div>
                                <p className="font-semibold">{error}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700">Incident Type</label>
                                <select
                                    required
                                    className="w-full p-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none font-medium text-slate-700 transition-all"
                                    value={formData.type}
                                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option value="">Select Type...</option>
                                    <option value="Sterility Breach">Sterility Breach</option>
                                    <option value="Equipment Failure">Equipment Failure</option>
                                    <option value="Medication Error">Medication Error</option>
                                    <option value="Staff Injury">Staff Injury</option>
                                    <option value="Documentation Gap">Documentation Gap</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700">Severity Level</label>
                                <select
                                    className="w-full p-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none font-medium text-slate-700 transition-all"
                                    value={formData.severity}
                                    onChange={e => setFormData({ ...formData, severity: e.target.value })}
                                >
                                    <option value="LOW">Low - Minor issue</option>
                                    <option value="MEDIUM">Medium - Process interruption</option>
                                    <option value="HIGH">High - Patient risk</option>
                                    <option value="CRITICAL">Critical - Immediate danger</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-700">Description</label>
                            <textarea
                                required
                                className="w-full min-h-[160px] p-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-y font-medium text-slate-700 transition-all"
                                placeholder="Describe what happened, where, and who was involved in vivid detail..."
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-700">Reported By (Optional)</label>
                            <input
                                type="text"
                                className="w-full p-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none font-medium text-slate-700 transition-all"
                                placeholder="Your Name or Employee ID"
                                value={formData.reported_by}
                                onChange={e => setFormData({ ...formData, reported_by: e.target.value })}
                            />
                        </div>

                        <div className="pt-6 border-t border-slate-100">
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-xl font-bold tracking-wide hover:shadow-lg hover:shadow-rose-500/30 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                                {loading ? 'Submitting Report Safely...' : 'Submit Incident Report'}
                            </motion.button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default IncidentForm;
