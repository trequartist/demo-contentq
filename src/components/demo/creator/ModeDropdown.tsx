"use client";

import { useState } from 'react';
import { ChevronDown, MessageSquare, Search } from 'lucide-react';
import { ChatMode } from '@/lib/demo/creator/types';

interface ModeDropdownProps {
  activeMode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
}

const modeOptions: { id: ChatMode; label: string; icon: React.ReactNode; description: string }[] = [
  {
    id: 'normal',
    label: 'Normal',
    icon: <MessageSquare className="w-4 h-4" />,
    description: 'Standard chat mode for regular interactions'
  },
  {
    id: 'research',
    label: 'Research',
    icon: <Search className="w-4 h-4" />,
    description: 'Upload files and synthesize information'
  }
];

export function ModeDropdown({ activeMode, onModeChange }: ModeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const activeOption = modeOptions.find(option => option.id === activeMode);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        {activeOption?.icon}
        <span>{activeOption?.label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            <div className="p-2">
              {modeOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    onModeChange(option.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
                    activeMode === option.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {option.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{option.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{option.description}</div>
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
