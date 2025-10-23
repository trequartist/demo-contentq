"use client";

import { useState } from 'react';
import { ChevronDown, MessageSquare, Search } from 'lucide-react';
import { ChatMode } from '@/lib/demo/creator/types';

interface InlineModeSwitcherProps {
  activeMode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
  className?: string;
}

const modeOptions: { id: ChatMode; label: string; icon: React.ReactNode; description: string }[] = [
  {
    id: 'normal',
    label: 'Normal',
    icon: <MessageSquare className="w-3 h-3" />,
    description: 'Standard chat mode'
  },
  {
    id: 'research',
    label: 'Research',
    icon: <Search className="w-3 h-3" />,
    description: 'Upload files and synthesize'
  }
];

export function InlineModeSwitcher({ activeMode, onModeChange, className = '' }: InlineModeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const activeOption = modeOptions.find(option => option.id === activeMode);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
      >
        {activeOption?.icon}
        <span>{activeOption?.label}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-full left-0 mb-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-20">
            <div className="p-2">
              {modeOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    onModeChange(option.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                    activeMode === option.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex-shrink-0">
                    {option.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{option.label}</div>
                    <div className="text-xs text-gray-500">{option.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
