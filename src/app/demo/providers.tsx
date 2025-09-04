"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  avatar: string;
  memberSince: string;
}

interface DemoState {
  user: DemoUser;
  currentStep: number;
  isPresenterMode: boolean;
  animationSpeed: number;
  autoProgress: boolean;
}

interface DemoContextType {
  state: DemoState;
  updateStep: (step: number) => void;
  togglePresenterMode: () => void;
  setAnimationSpeed: (speed: number) => void;
  toggleAutoProgress: () => void;
  resetDemo: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

const initialState: DemoState = {
  user: {
    id: 'demo-user-001',
    name: 'Max',
    email: 'max@gumloop.com',
    role: 'Founder CEO',
    company: 'Gumloop',
    avatar: '/avatars/max.jpg',
    memberSince: '2 months ago'
  },
  currentStep: 0,
  isPresenterMode: false,
  animationSpeed: 1,
  autoProgress: false
};

export default function PresenterProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoState>(initialState);

  // Check for presenter mode via URL params or Konami code
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('presenter') === 'true') {
      setState(prev => ({ ...prev, isPresenterMode: true }));
    }

    // Konami code: up, up, down, down, left, right, left, right, b, a
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setState(prev => ({ ...prev, isPresenterMode: !prev.isPresenterMode }));
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  const updateStep = (step: number) => {
    setState(prev => ({ ...prev, currentStep: step }));
  };

  const togglePresenterMode = () => {
    setState(prev => ({ ...prev, isPresenterMode: !prev.isPresenterMode }));
  };

  const setAnimationSpeed = (speed: number) => {
    setState(prev => ({ ...prev, animationSpeed: speed }));
  };

  const toggleAutoProgress = () => {
    setState(prev => ({ ...prev, autoProgress: !prev.autoProgress }));
  };

  const resetDemo = () => {
    setState(initialState);
    window.location.href = '/demo/dashboard';
  };

  const value: DemoContextType = {
    state,
    updateStep,
    togglePresenterMode,
    setAnimationSpeed,
    toggleAutoProgress,
    resetDemo
  };

  return (
    <DemoContext.Provider value={value}>
      {children}
      {state.isPresenterMode && <PresenterControls />}
    </DemoContext.Provider>
  );
}

export function usePresenter() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('usePresenter must be used within a PresenterProvider');
  }
  return context;
}

// Presenter Controls Overlay
function PresenterControls() {
  const { state, updateStep, toggleAutoProgress, setAnimationSpeed, resetDemo } = usePresenter();

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/90 text-white p-4 rounded-lg backdrop-blur-sm">
      <div className="text-xs font-semibold mb-2 text-yellow-400">PRESENTER MODE</div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs">Step:</span>
          <input
            type="number"
            value={state.currentStep}
            onChange={(e) => updateStep(Number(e.target.value))}
            className="w-16 px-2 py-1 text-xs bg-white/10 rounded"
            min="0"
            max="25"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs">Speed:</span>
          <input
            type="range"
            value={state.animationSpeed}
            onChange={(e) => setAnimationSpeed(Number(e.target.value))}
            className="w-20"
            min="0.5"
            max="2"
            step="0.1"
          />
          <span className="text-xs">{state.animationSpeed}x</span>
        </div>
        <button
          onClick={toggleAutoProgress}
          className={`text-xs px-2 py-1 rounded ${
            state.autoProgress ? 'bg-green-600' : 'bg-gray-600'
          }`}
        >
          Auto: {state.autoProgress ? 'ON' : 'OFF'}
        </button>
        <button
          onClick={resetDemo}
          className="text-xs px-2 py-1 bg-red-600 rounded w-full"
        >
          Reset Demo
        </button>
      </div>
      <div className="mt-2 pt-2 border-t border-white/20">
        <div className="text-xs opacity-70">
          Press 1-5: Jump to section<br />
          Space: Pause/Play<br />
          Cmd+Shift+R: Reset
        </div>
      </div>
    </div>
  );
}
