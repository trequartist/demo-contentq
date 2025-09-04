"use client";

import React from 'react';
import { CheckCircle, Circle, Loader2 } from 'lucide-react';

interface WorkflowStage {
  id: string;
  label: string;
  description?: string;
}

interface WorkflowProgressProps {
  stages: WorkflowStage[];
  currentStageIndex: number;
  progress: number;
  estimatedTimeRemaining?: number;
  className?: string;
}

export default function WorkflowProgress({
  stages,
  currentStageIndex,
  progress,
  estimatedTimeRemaining,
  className = ''
}: WorkflowProgressProps) {
  return (
    <div className={`bg-white border-b border-gray-200 ${className}`}>
      <div className="px-8 py-6">
        {/* Overall Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">
              {stages[currentStageIndex]?.label || 'Processing'}
            </span>
            <div className="flex items-center space-x-3">
              {estimatedTimeRemaining && (
                <span className="text-gray-500">
                  ~{Math.ceil(estimatedTimeRemaining / 60)} min remaining
                </span>
              )}
              <span className="font-medium text-gray-900">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-black transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Stage Indicators */}
        <div className="flex items-center justify-between">
          {stages.map((stage, index) => {
            const isCompleted = index < currentStageIndex;
            const isCurrent = index === currentStageIndex;
            const isPending = index > currentStageIndex;

            return (
              <div key={stage.id} className="flex flex-col items-center flex-1">
                {/* Stage Circle */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-black text-white' 
                    : isCurrent 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : isCurrent ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>

                {/* Stage Label */}
                <span className={`text-sm text-center font-medium transition-colors duration-300 ${
                  isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {stage.label}
                </span>

                {/* Stage Description */}
                {stage.description && (isCurrent || isCompleted) && (
                  <span className="text-xs text-gray-500 text-center mt-1 max-w-20">
                    {stage.description}
                  </span>
                )}

                {/* Connector Line */}
                {index < stages.length - 1 && (
                  <div className="absolute top-5 left-1/2 w-full h-0.5 -z-10">
                    <div className={`h-full transition-colors duration-300 ${
                      index < currentStageIndex ? 'bg-black' : 'bg-gray-200'
                    }`} style={{
                      width: `calc(100% - 2.5rem)`,
                      marginLeft: '1.25rem'
                    }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
