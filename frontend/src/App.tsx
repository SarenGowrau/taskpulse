import { useState, useEffect } from 'react';
import { Activity, CheckCircle2, AlertCircle, RefreshCw, Layers, Sparkles, Terminal } from 'lucide-react';

interface HealthResponse {
  status: string;
  message: string;
}

export default function App() {
  const [backendHealth, setBackendHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const checkBackendStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      // Direct call using relative path proxy or fallback to full localhost URL
      const response = await fetch('/api/health');
      if (!response.ok) {
        throw new Error(`Server responded with HTTP ${response.status}`);
      }
      const data: HealthResponse = await response.json();
      setBackendHealth(data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reach FastAPI backend';
      setError(errorMessage);
      setBackendHealth(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkBackendStatus();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 selection:bg-indigo-500 selection:text-white">
      {/* Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl rounded-2xl p-8 shadow-2xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                TaskPulse
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  v0.1.0 Initial Setup
                </span>
              </h1>
              <p className="text-sm text-slate-400">Tiny full-stack task prioritization application</p>
            </div>
          </div>
        </div>

        {/* System Health Status Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-400" />
              Service Status Checks
            </h2>
            <button
              onClick={checkBackendStatus}
              disabled={loading}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-indigo-400 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Recheck
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Frontend Status Card */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-slate-200">React Frontend</p>
                <p className="text-xs text-slate-400 mt-0.5">Vite + React + TypeScript + Tailwind CSS active</p>
              </div>
            </div>

            {/* Backend Status Card */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start space-x-3">
              {loading ? (
                <div className="w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin shrink-0 mt-0.5" />
              ) : backendHealth ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="text-sm font-semibold text-slate-200">FastAPI Backend</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {loading
                    ? 'Connecting to backend...'
                    : backendHealth
                    ? backendHealth.message
                    : error || 'Backend offline'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pipeline Info */}
        <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-slate-300 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-indigo-300">
            <Layers className="w-4 h-4" />
            <span>Architecture & Roadmap</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Project structure is verified and separated cleanly. Subsequent steps will introduce the task models, prioritization engine, and Gemini AI integration.
          </p>
        </div>

        {/* Footer */}
        <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>TaskPulse Learning Project</span>
          </div>
          <span>FastAPI :8000 &bull; Vite :5173</span>
        </div>
      </div>
    </div>
  );
}
