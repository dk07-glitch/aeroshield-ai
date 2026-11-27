import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

/**
 * ErrorBoundary component that catches JavaScript errors anywhere in their child
 * component tree, logs the errors, and displays a fallback UI instead of crashing.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div 
          role="alert" 
          aria-live="assertive"
          className="min-h-screen bg-[#070b14] text-slate-100 flex items-center justify-center p-6"
        >
          <div className="bg-[#0f172a] border border-red-500/50 rounded-3xl max-w-lg w-full p-8 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-red-500/20 text-red-400 flex items-center justify-center mx-auto border border-red-500/30">
              <AlertTriangle className="w-8 h-8" aria-hidden="true" />
            </div>
            <h1 className="text-xl font-bold font-['Outfit'] text-white">
              Application Notice
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              An unexpected condition occurred while rendering this view. Your session state is preserved and you can reload the dashboard safely.
            </p>
            {this.state.error?.message && (
              <pre className="bg-slate-950 p-3 rounded-xl text-[11px] text-red-300 text-left overflow-x-auto max-h-32">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-500/20 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              <span>Reload AeroShield Dashboard</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
