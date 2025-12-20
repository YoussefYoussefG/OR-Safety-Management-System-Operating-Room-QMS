import React, { useState } from 'react';
import { reportIncident } from '../services/api';
import { AlertTriangle, Send, Loader2, CheckCircle2 } from 'lucide-react';

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
            // Reset success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            console.error(err);
            setError('Failed to submit report. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                        <AlertTriangle className="text-rose-600" size={20} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Report Safety Incident</h2>
                        <p className="text-slate-500 text-sm">Log a new QMS non-conformance or safety event.</p>
                    </div>
                </div>

                {success && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center gap-2 text-emerald-700">
                        <CheckCircle2 size={18} />
                        <p className="text-sm font-semibold">Incident reported successfully. Use Dashboard to monitor status.</p>
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-lg flex items-center gap-2 text-rose-700">
                        <AlertTriangle size={18} />
                        <p className="text-sm font-semibold">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Incident Type</label>
                            <select
                                required
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Severity Level</label>
                            <select
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                        <textarea
                            required
                            className="w-full h-32 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            placeholder="Describe what happened, where, and who was involved..."
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Reported By (Optional)</label>
                        <input
                            type="text"
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Your Name / ID"
                            value={formData.reported_by}
                            onChange={e => setFormData({ ...formData, reported_by: e.target.value })}
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                            Submit Incident Report
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default IncidentForm;
