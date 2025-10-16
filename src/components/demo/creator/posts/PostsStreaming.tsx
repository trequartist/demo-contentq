"use client";

import { useEffect, useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { IntermediateStep } from '@/lib/demo/creator/types';

interface PostsStreamingProps {
  steps: IntermediateStep[];
}

export function PostsStreaming({ steps }: PostsStreamingProps) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const getStepIcon = (status: IntermediateStep['status']) => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'running':
        return <Loader2 className="h-5 w-5 animate-spin text-blue-600" />;
      case 'pending':
        return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />;
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center p-12">
      <div className="relative mb-8">
        <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
      </div>

      <h3 className="mb-2 text-xl font-semibold text-gray-900">
        Creating Content{dots}
      </h3>
      <p className="mb-8 text-sm text-gray-500">
        This may take a few moments
      </p>

      <div className="w-full max-w-lg space-y-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex items-start gap-4 rounded-xl bg-white border border-gray-100 p-5 shadow-sm"
            style={{
              animation: `fadeIn 0.3s ease-in-out ${index * 0.15}s both`,
            }}
          >
            <div className="flex-shrink-0 mt-0.5">
              {getStepIcon(step.status)}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1">{step.label}</h4>
              {step.description && (
                <p className="text-sm text-gray-600">{step.description}</p>
              )}
            </div>
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

