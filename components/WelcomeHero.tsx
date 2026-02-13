
import React from 'react';

interface WelcomeHeroProps {
  onUploadClick: () => void;
}

const WelcomeHero: React.FC<WelcomeHeroProps> = ({ onUploadClick }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative group cursor-pointer" onClick={onUploadClick}>
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative w-32 h-32 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-5xl">
          📡
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-4xl font-extrabold text-white tracking-tight">
          Level Up Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">PCB Layouts</span>
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          Upload a hand-drawn sketch, a low-res photo, or a noisy scan of your circuit board. 
          Our AI engine will clean traces, remove noise, and prepare professional visual assets.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={onUploadClick}
          className="px-8 py-4 bg-white text-slate-950 rounded-xl font-bold hover:bg-slate-200 transition-all flex items-center space-x-2 shadow-2xl shadow-white/10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span>Select PCB Image</span>
        </button>
        <div className="text-slate-500 text-sm mono">JPG, PNG, WEBP (Max 10MB)</div>
      </div>

      <div className="grid grid-cols-3 gap-8 pt-8 w-full opacity-50">
        <div className="flex flex-col items-center space-y-2">
          <div className="h-0.5 w-8 bg-indigo-500"></div>
          <span className="text-[10px] uppercase tracking-widest font-bold">Trace Cleaning</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="h-0.5 w-8 bg-emerald-500"></div>
          <span className="text-[10px] uppercase tracking-widest font-bold">Noise Stripping</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="h-0.5 w-8 bg-indigo-500"></div>
          <span className="text-[10px] uppercase tracking-widest font-bold">Vector Mapping</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHero;
