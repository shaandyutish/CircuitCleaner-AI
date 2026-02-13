
import React, { useState, useEffect } from 'react';

interface ImageComparisonProps {
  before: string | null;
  after: string | null;
  loading: boolean;
}

const ImageComparison: React.FC<ImageComparisonProps> = ({ before, after, loading }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isResizing, setIsResizing] = useState(false);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isResizing && e.type !== 'touchmove') return;
    
    const container = e.currentTarget.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const relativeX = x - container.left;
    const percentage = Math.max(0, Math.min(100, (relativeX / container.width) * 100));
    setSliderPos(percentage);
  };

  // Auto-slide effect on initial load of 'after' image
  useEffect(() => {
    if (after && !loading) {
      let current = 0;
      const interval = setInterval(() => {
        if (current >= 100) {
          clearInterval(interval);
          setSliderPos(100);
          setTimeout(() => setSliderPos(50), 500);
        } else {
          current += 2;
          setSliderPos(current);
        }
      }, 10);
    }
  }, [after, loading]);

  if (!before) return null;

  return (
    <div 
      className="relative w-full h-full min-h-[400px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 select-none group"
      onMouseDown={() => setIsResizing(true)}
      onMouseUp={() => setIsResizing(false)}
      onMouseLeave={() => setIsResizing(false)}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* Before Image */}
      <div className="absolute inset-0">
        <img src={before} alt="Original" className="w-full h-full object-contain" />
        <div className="absolute top-4 left-4 px-3 py-1 bg-slate-900/80 backdrop-blur rounded text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-700">Original</div>
      </div>

      {/* After Image */}
      {after && (
        <div 
          className="absolute inset-0 z-10 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img src={after} alt="Processed" className="w-[100vw] max-w-none h-full object-contain" style={{ width: '100%' }} />
          <div className="absolute top-4 right-4 px-3 py-1 bg-indigo-600/80 backdrop-blur rounded text-[10px] font-bold text-white uppercase tracking-widest border border-indigo-400">Enhanced</div>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-20 bg-slate-950/60 backdrop-blur-sm flex flex-col items-center justify-center space-y-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <div className="text-center space-y-1">
            <p className="text-indigo-400 font-bold tracking-tight">AI Engine Processing</p>
            <p className="text-xs text-slate-400">Analyzing copper layers & trace topology...</p>
          </div>
        </div>
      )}

      {/* Slider Handle */}
      {after && !loading && (
        <div 
          className="absolute top-0 bottom-0 z-30 flex items-center justify-center cursor-ew-resize pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-0.5 h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
          <div className="absolute w-8 h-8 bg-white rounded-full shadow-2xl flex items-center justify-center pointer-events-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-900" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}

      {/* Helper text */}
      {after && !loading && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 px-4 py-2 bg-slate-900/60 backdrop-blur border border-slate-700 rounded-full text-[10px] font-semibold text-slate-300 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          Drag slider to compare before and after
        </div>
      )}
    </div>
  );
};

export default ImageComparison;
