import React, { useEffect, useState } from 'react';
import { fetchStandards } from '../services/api';
import { FileText, Loader2, AlertCircle } from 'lucide-react';

interface Standard {
    id: string;
    title: string;
    category: string;
    content: string;
    version: string;
}

const StandardsViewer: React.FC = () => {
    const [standards, setStandards] = useState<Standard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedStandard, setSelectedStandard] = useState<Standard | null>(null);

    useEffect(() => {
        loadStandards();
    }, []);

    const loadStandards = async () => {
        try {
            const data = await fetchStandards();
            setStandards(data);
        } catch (err) {
            console.error(err);
            setError('Failed to load standards. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
            { }
            <div className="md:col-span-1 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-100 bg-slate-50">
                    <h2 className="font-bold text-slate-800 flex items-center gap-2">
                        <FileText size={18} />
                        QMS Standards
                    </h2>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {loading && <div className="p-8 text-center"><Loader2 className="animate-spin mx-auto text-blue-500" /></div>}

                    {error && (
                        <div className="p-4 bg-rose-50 text-rose-600 text-sm rounded-lg m-2 border border-rose-100 flex gap-2">
                            <AlertCircle size={16} className="shrink-0 mt-0.5" />
                            {error}
                        </div>
                    )}

                    {!loading && !error && standards.length === 0 && (
                        <div className="p-8 text-center text-slate-400 text-sm">No standards found in database.</div>
                    )}

                    {standards.map(std => (
                        <button
                            key={std.id}
                            onClick={() => setSelectedStandard(std)}
                            className={`w-full text-left p-3 rounded-lg border transition-all ${selectedStandard?.id === std.id
                                ? 'bg-blue-50 border-blue-200 text-blue-700'
                                : 'bg-white border-slate-100 hover:border-blue-300'
                                }`}
                        >
                            <p className="font-semibold text-sm">{std.title}</p>
                            <div className="flex justify-between mt-1 text-xs text-slate-400">
                                <span>{std.category}</span>
                                <span>v{std.version}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            { }
            <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
                {selectedStandard ? (
                    <div className="flex flex-col h-full">
                        <div className="p-6 border-b border-slate-100">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-1 rounded bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                    {selectedStandard.category}
                                </span>
                                <span className="text-xs text-slate-400">Version {selectedStandard.version}</span>
                            </div>
                            <h1 className="text-2xl font-bold text-slate-800">{selectedStandard.title}</h1>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 prose prose-slate max-w-none">
                            <div className="whitespace-pre-wrap text-slate-600">
                                {selectedStandard.content}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                        <FileText size={48} className="mb-4 text-slate-200" />
                        <p>Select a standard to view details</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StandardsViewer;
