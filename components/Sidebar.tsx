
import React from 'react';
import { EnhancementMode } from '../types';

interface SidebarProps {
  mode: EnhancementMode;
  onModeChange: (mode: EnhancementMode) => void;
  onEnhance: () => void;
  onReset: () => void;
  isProcessing: boolean;
  hasImage: boolean;
  hasProcessed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  mode, 
  onModeChange, 
  onEnhance, 
  onReset, 
  isProcessing, 
  hasImage,
  hasProcessed
}) => {
  const modes = [
    { id: EnhancementMode.CLEAN_TRACES, label: 'Clean Traces', description: 'Smooth traces and sharpen edges', icon: '⚡' },
    { id: EnhancementMode.VECTORIZE, label: 'Vector Look', description: 'High contrast B&W schematic output', icon: '📐' },
    { id: EnhancementMode.NOISE_REDUCTION, label: 'Noise Reduction', description: 'Remove shadows and photo artifacts', icon: '🔇' },
    { id: EnhancementMode.COLOR_CORRECTION, label: 'Pro Finish', description: 'Standardize mask and pad colors', icon: '🎨' },
    { id: EnhancementMode.NEGATIVE, label: 'Negative Mask', description: 'Invert colors for negative layouts', icon: '🌓' },
  ];

  return (
    <aside className="w-80 border-r border-slate-800 p-6 flex flex-col space-y-8 bg-slate-950 z-10">
      <div className="space-y-4">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Enhancement Mode</label>
        <div className="grid grid-cols-1 gap-3 overflow-y-auto max-h-[50vh] pr-1 custom-scrollbar">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => onModeChange(m.id)}
              disabled={isProcessing}
              className={`p-3 text-left rounded-xl border transition-all ${
                mode === m.id 
                  ? 'bg-indigo-600/10 border-indigo-500 shadow-[0_0_15px_-5px_rgba(99,102,241,0.4)]' 
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{m.icon}</span>
                <div>
                  <div className={`font-medium text-sm ${mode === m.id ? 'text-indigo-300' : 'text-slate-300'}`}>{m.label}</div>
                  <div className="text-[10px] text-slate-500 leading-tight">{m.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1"></div>

      <div className="space-y-3">
        <button
          onClick={onEnhance}
          disabled={!hasImage || isProcessing}
          className={`w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all shadow-xl ${
            !hasImage || isProcessing 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/20 active:scale-95'
          }`}
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/center" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.047a1 1 0 01.897.95V4.282l2.392 2.392a.5.5 0 010 .708l-.707.707a.5.5 0 01-.707 0L10.782 5.7l-2.392 2.392a.5.5 0 01-.708 0l-.707-.707a.5.5 0 010-.707L9.366 4.282V1.997a1 1 0 01.897-.95l.037-.001.037.001a1 1 0 01.897.95v2.285l2.392 2.392a.5.5 0 00.707 0l.707-.707a.5.5 0 000-.707l-2.392-2.392V1.997a1 1 0 01.897-.95z" />
                <path d="M5 11a1 1 0 11-2 0 1 1 0 012 0zm10 0a1 1 0 11-2 0 1 1 0 012 0z" />
                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.94 13.06a1.5 1.5 0 112.12-2.12 1.5 1.5 0 01-2.12 2.12zm5.82-2.12a1.5 1.5 0 102.12 2.12 1.5 1.5 0 00-2.12-2.12z" clipRule="evenodd" />
              </svg>
              <span>Run Enhancement</span>
            </>
          )}
        </button>

        {hasImage && (
          <button
            onClick={onReset}
            className="w-full py-2 text-xs text-slate-500 hover:text-slate-300 transition-colors uppercase font-bold tracking-widest"
          >
            Reset Workspace
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
