
import React, { useState, useCallback, useRef } from 'react';
import { enhancePCBLayout } from './services/geminiService';
import { EnhancementMode, PCBState } from './types';

// Components
import Sidebar from './components/Sidebar';
import ImageComparison from './components/ImageComparison';
import Header from './components/Header';
import WelcomeHero from './components/WelcomeHero';

const App: React.FC = () => {
  const [state, setState] = useState<PCBState>({
    originalImage: null,
    processedImage: null,
    isProcessing: false,
    error: null,
    mode: EnhancementMode.CLEAN_TRACES
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState(prev => ({
          ...prev,
          originalImage: reader.result as string,
          processedImage: null,
          error: null
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEnhance = async () => {
    if (!state.originalImage) return;

    setState(prev => ({ ...prev, isProcessing: true, error: null }));
    try {
      const result = await enhancePCBLayout(state.originalImage, state.mode);
      setState(prev => ({ ...prev, processedImage: result, isProcessing: false }));
    } catch (err: any) {
      console.error(err);
      setState(prev => ({ 
        ...prev, 
        isProcessing: false, 
        error: err.message || "Failed to process image. Please try again." 
      }));
    }
  };

  const handleModeChange = (mode: EnhancementMode) => {
    setState(prev => ({ ...prev, mode }));
  };

  const handleReset = () => {
    setState({
      originalImage: null,
      processedImage: null,
      isProcessing: false,
      error: null,
      mode: EnhancementMode.CLEAN_TRACES
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-950 text-slate-200">
      <Header />
      
      <main className="flex flex-1 overflow-hidden">
        {/* Sidebar Controls */}
        <Sidebar 
          mode={state.mode} 
          onModeChange={handleModeChange} 
          onEnhance={handleEnhance} 
          onReset={handleReset}
          isProcessing={state.isProcessing}
          hasImage={!!state.originalImage}
          hasProcessed={!!state.processedImage}
        />

        {/* Workspace */}
        <section className="flex-1 flex flex-col p-6 overflow-auto bg-slate-900/50">
          {!state.originalImage ? (
            <WelcomeHero onUploadClick={() => fileInputRef.current?.click()} />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              {state.error && (
                <div className="w-full max-w-4xl p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400 text-sm flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{state.error}</span>
                </div>
              )}
              
              <div className="w-full flex-1 min-h-0">
                <ImageComparison 
                  before={state.originalImage} 
                  after={state.processedImage} 
                  loading={state.isProcessing}
                />
              </div>

              {state.processedImage && (
                <a 
                  href={state.processedImage} 
                  download="enhanced-pcb.png"
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-full font-medium transition-colors flex items-center space-x-2 shadow-lg shadow-emerald-900/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download Result</span>
                </a>
              )}
            </div>
          )}
        </section>
      </main>

      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept="image/*" 
        className="hidden" 
      />
    </div>
  );
};

export default App;
