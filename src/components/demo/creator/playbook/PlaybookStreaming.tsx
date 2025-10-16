"use client";

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export function PlaybookStreaming() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    'Analyzing scenario',
    'Identifying key objectives',
    'Structuring action steps',
    'Calculating time estimates',
  ];

  return (
    <div className="flex h-screen flex-col items-center justify-center p-12">
      <div className="relative mb-8">
        <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
      </div>

      <h3 className="mb-2 text-xl font-semibold text-gray-900">
        Generating Playbook{dots}
      </h3>
      <p className="mb-8 text-sm text-gray-500">
        Building your strategic guide
      </p>

      <div className="w-full max-w-md space-y-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-xl bg-white border border-gray-100 px-4 py-3 shadow-sm"
            style={{
              animation: `fadeIn 0.3s ease-in-out ${index * 0.2}s both`,
            }}
          >
            <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></div>
            <span className="text-sm text-gray-700">{step}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

