"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDemo } from '@/lib/demo/demo-context';

interface Shortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  description: string;
  action: () => void;
}

export function useKeyboardShortcuts() {
  const router = useRouter();
  const { actions } = useDemo();
  const [showHelp, setShowHelp] = useState(false);

  const shortcuts: Shortcut[] = [
    // Navigation shortcuts
    { key: 'd', alt: true, description: 'Go to Dashboard', action: () => router.push('/demo/dashboard') },
    { key: 'c', alt: true, description: 'Go to Content Studio', action: () => router.push('/demo/content-studio') },
    { key: 'a', alt: true, description: 'Go to Analytics', action: () => router.push('/demo/analytics') },
    { key: 's', alt: true, description: 'Go to Settings', action: () => router.push('/demo/settings') },
    
    // Action shortcuts
    { key: 'n', ctrl: true, description: 'Create New Content', action: () => router.push('/demo/content-studio/create') },
    { key: 'k', ctrl: true, description: 'Search', action: () => document.getElementById('global-search')?.focus() },
    { key: '/', ctrl: true, description: 'Show Keyboard Shortcuts', action: () => setShowHelp(true) },
    { key: 'Escape', description: 'Close Modal/Dialog', action: () => setShowHelp(false) },
    
    // Document actions (when on document pages)
    { key: 's', ctrl: true, description: 'Save Document', action: () => console.log('Saving document...') },
    { key: 'e', ctrl: true, description: 'Edit Document', action: () => console.log('Editing document...') },
    { key: 'p', ctrl: true, shift: true, description: 'Preview Document', action: () => console.log('Preview mode...') },
    
    // View shortcuts
    { key: '1', alt: true, description: 'Grid View', action: () => console.log('Switched to grid view') },
    { key: '2', alt: true, description: 'List View', action: () => console.log('Switched to list view') },
    { key: '3', alt: true, description: 'Calendar View', action: () => router.push('/demo/content-studio/calendar') },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if user is typing in an input or textarea
      if (e.target instanceof HTMLInputElement || 
          e.target instanceof HTMLTextAreaElement || 
          (e.target as HTMLElement).contentEditable === 'true') {
        // Allow Escape key even in inputs
        if (e.key !== 'Escape') return;
      }

      for (const shortcut of shortcuts) {
        const matchesKey = e.key === shortcut.key || e.key.toLowerCase() === shortcut.key.toLowerCase();
        const matchesCtrl = shortcut.ctrl ? (e.ctrlKey || e.metaKey) : true;
        const matchesShift = shortcut.shift ? e.shiftKey : true;
        const matchesAlt = shortcut.alt ? e.altKey : true;

        if (matchesKey && matchesCtrl && matchesShift && matchesAlt) {
          e.preventDefault();
          shortcut.action();
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);

  return {
    shortcuts,
    showHelp,
    setShowHelp
  };
}

// Keyboard Shortcuts Help Modal Component
export function KeyboardShortcutsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  const shortcuts = [
    { category: 'Navigation', items: [
      { keys: ['Alt', 'D'], description: 'Go to Dashboard' },
      { keys: ['Alt', 'C'], description: 'Go to Content Studio' },
      { keys: ['Alt', 'A'], description: 'Go to Analytics' },
      { keys: ['Alt', 'S'], description: 'Go to Settings' },
    ]},
    { category: 'Actions', items: [
      { keys: ['Ctrl', 'N'], description: 'Create New Content' },
      { keys: ['Ctrl', 'K'], description: 'Search' },
      { keys: ['Ctrl', '/'], description: 'Show Keyboard Shortcuts' },
      { keys: ['Esc'], description: 'Close Modal/Dialog' },
    ]},
    { category: 'Document', items: [
      { keys: ['Ctrl', 'S'], description: 'Save Document' },
      { keys: ['Ctrl', 'E'], description: 'Edit Document' },
      { keys: ['Ctrl', 'Shift', 'P'], description: 'Preview Document' },
    ]},
    { category: 'Views', items: [
      { keys: ['Alt', '1'], description: 'Grid View' },
      { keys: ['Alt', '2'], description: 'List View' },
      { keys: ['Alt', '3'], description: 'Calendar View' },
    ]},
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-black">Keyboard Shortcuts</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black transition-colors"
          >
            ×
          </button>
        </div>
        
        <div className="px-6 py-4 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-2 gap-6">
            {shortcuts.map((section) => (
              <div key={section.category}>
                <h3 className="font-semibold text-black mb-3">{section.category}</h3>
                <div className="space-y-2">
                  {section.items.map((shortcut, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{shortcut.description}</span>
                      <div className="flex items-center space-x-1">
                        {shortcut.keys.map((key, keyIndex) => (
                          <React.Fragment key={keyIndex}>
                            <kbd className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded">
                              {key}
                            </kbd>
                            {keyIndex < shortcut.keys.length - 1 && (
                              <span className="text-gray-400">+</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Tip: Press <kbd className="px-1 py-0.5 text-xs bg-gray-100 border border-gray-300 rounded">Ctrl</kbd> + <kbd className="px-1 py-0.5 text-xs bg-gray-100 border border-gray-300 rounded">/</kbd> anytime to view this help
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
