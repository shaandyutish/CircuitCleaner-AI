
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="h-16 px-6 flex items-center justify-between border-b border-slate-800 bg-slate-950 z-20">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-bold tracking-tight text-white">CircuitCleaner <span className="text-indigo-400">AI</span></h1>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-bold mono border border-slate-700">v1.6</span>
          </div>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mono">PCB Enhancement Engine</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Gemini 2.5 Flash</span>
        </span>
      </div>
    </header>
  );
};

export default Header;
