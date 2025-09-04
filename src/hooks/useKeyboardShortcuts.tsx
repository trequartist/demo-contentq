"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  action: () => void;
  description: string;
}

export function useKeyboardShortcuts() {
  const router = useRouter();

  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'k',
      metaKey: true,
      action: () => {
        // Focus search input
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      },
      description: 'Focus search'
    },
    {
      key: 'n',
      metaKey: true,
      action: () => router.push('/demo/content-studio/create'),
      description: 'New content'
    },
    {
      key: 'd',
      metaKey: true,
      action: () => router.push('/demo/dashboard'),
      description: 'Go to dashboard'
    },
    {
      key: 'c',
      metaKey: true,
      action: () => router.push('/demo/content-studio'),
      description: 'Go to content studio'
    },
    {
      key: 'p',
      metaKey: true,
      action: () => router.push('/demo/playbook'),
      description: 'Go to playbook'
    },
    {
      key: 'a',
      metaKey: true,
      action: () => router.push('/demo/analytics'),
      description: 'Go to analytics'
    },
    {
      key: 'r',
      metaKey: true,
      shiftKey: true,
      action: () => {
        // Reset demo
        if (confirm('Reset the entire demo? This will clear all progress.')) {
          localStorage.clear();
          router.push('/demo/dashboard');
          window.location.reload();
        }
      },
      description: 'Reset demo'
    },
    {
      key: '/',
      metaKey: true,
      action: () => {
        // Show keyboard shortcuts help
        showKeyboardHelp();
      },
      description: 'Show keyboard shortcuts'
    },
    {
      key: 'Escape',
      action: () => {
        // Close modals, clear selections
        const modals = document.querySelectorAll('[role="dialog"]');
        modals.forEach(modal => {
          const closeButton = modal.querySelector('button[aria-label*="close"], button[aria-label*="Close"]') as HTMLButtonElement;
          if (closeButton) {
            closeButton.click();
          }
        });
        
        // Clear any focused inputs
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && activeElement.blur) {
          activeElement.blur();
        }
      },
      description: 'Close modals/clear focus'
    },
    {
      key: 'Tab',
      shiftKey: true,
      action: () => {
        // Enhanced tab navigation (handled by browser but we can add custom logic)
        // This is mainly for documentation
      },
      description: 'Navigate backwards'
    }
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip if user is typing in an input field
      const activeElement = document.activeElement;
      const isInputField = activeElement instanceof HTMLInputElement || 
                          activeElement instanceof HTMLTextAreaElement ||
                          activeElement instanceof HTMLSelectElement ||
                          (activeElement && activeElement.getAttribute('contenteditable') === 'true');

      if (isInputField && !event.metaKey && !event.ctrlKey) {
        return;
      }

      // Find matching shortcut
      const matchingShortcut = shortcuts.find(shortcut => {
        return shortcut.key.toLowerCase() === event.key.toLowerCase() &&
               !!shortcut.metaKey === (event.metaKey || event.ctrlKey) &&
               !!shortcut.shiftKey === event.shiftKey;
      });

      if (matchingShortcut) {
        event.preventDefault();
        event.stopPropagation();
        matchingShortcut.action();
      }
    };

    // Add keyboard listener
    document.addEventListener('keydown', handleKeyDown);

    // Add keyboard shortcuts help to page
    addKeyboardShortcutsToPage(shortcuts);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [router]);

  return { shortcuts };
}

function showKeyboardHelp() {
  // Check if help modal already exists
  if (document.getElementById('keyboard-help-modal')) {
    return;
  }

  const modal = document.createElement('div');
  modal.id = 'keyboard-help-modal';
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'keyboard-help-title');

  modal.innerHTML = `
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h2 id="keyboard-help-title" class="text-lg font-semibold text-gray-900">Keyboard Shortcuts</h2>
          <button class="p-2 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close help">
            ×
          </button>
        </div>
      </div>
      <div class="p-6 space-y-3 max-h-96 overflow-y-auto">
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-700">Search</span>
          <kbd class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">⌘K</kbd>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-700">New content</span>
          <kbd class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">⌘N</kbd>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-700">Dashboard</span>
          <kbd class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">⌘D</kbd>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-700">Content Studio</span>
          <kbd class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">⌘C</kbd>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-700">Playbook</span>
          <kbd class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">⌘P</kbd>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-700">Analytics</span>
          <kbd class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">⌘A</kbd>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-700">Close modals</span>
          <kbd class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">Esc</kbd>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-700">Reset demo</span>
          <kbd class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">⌘⇧R</kbd>
        </div>
      </div>
    </div>
  `;

  // Close modal functionality
  const closeButton = modal.querySelector('button[aria-label*="Close"]');
  const closeModal = () => {
    document.body.removeChild(modal);
  };

  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on escape
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);

  document.body.appendChild(modal);

  // Focus the modal for accessibility
  modal.focus();
}

function addKeyboardShortcutsToPage(shortcuts: KeyboardShortcut[]) {
  // Add screen reader announcement for keyboard shortcuts
  let announcement = document.getElementById('keyboard-shortcuts-announcement');
  if (!announcement) {
    announcement = document.createElement('div');
    announcement.id = 'keyboard-shortcuts-announcement';
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    document.body.appendChild(announcement);
  }

  announcement.textContent = `Keyboard shortcuts available. Press Command+/ for help.`;
}

// Accessibility enhancements
export function useAccessibilityEnhancements() {
  useEffect(() => {
    // Add skip link for screen readers
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded-lg';
    
    if (!document.getElementById('skip-link')) {
      skipLink.id = 'skip-link';
      document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // Enhance focus management
    const handleFocusVisible = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.matches('button, a, input, textarea, select, [tabindex]')) {
        target.classList.add('focus-visible');
      }
    };

    const handleBlur = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target) {
        target.classList.remove('focus-visible');
      }
    };

    document.addEventListener('focusin', handleFocusVisible);
    document.addEventListener('focusout', handleBlur);

    // Add ARIA landmarks
    const main = document.querySelector('main');
    if (main && !main.getAttribute('role')) {
      main.setAttribute('role', 'main');
      main.id = 'main-content';
    }

    const nav = document.querySelector('nav');
    if (nav && !nav.getAttribute('role')) {
      nav.setAttribute('role', 'navigation');
      nav.setAttribute('aria-label', 'Main navigation');
    }

    return () => {
      document.removeEventListener('focusin', handleFocusVisible);
      document.removeEventListener('focusout', handleBlur);
    };
  }, []);
}