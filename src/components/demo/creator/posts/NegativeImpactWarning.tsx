"use client";

import React from 'react';
import { Card } from '@/components/ui';
import { AlertTriangle, X, CheckCircle, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

interface NegativeImpactWarningProps {
  isOpen: boolean;
  onClose: () => void;
  onRevise: () => void;
  onContinue: () => void;
  warningData: {
    angle: string;
    issues: Array<{
      issue: string;
      reason: string;
    }>;
    fixes: string[];
    purpose: string;
    goal: string;
  };
}

export default function NegativeImpactWarning({ 
  isOpen, 
  onClose, 
  onRevise, 
  onContinue, 
  warningData 
}: NegativeImpactWarningProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl mx-4">
        <Card className="bg-red-50 border-red-200 shadow-2xl">
          <div className="p-8">
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-red-900 mb-2">
                  ⛔ NEGATIVE AI IMPACT WARNING
                </h2>
                <p className="text-red-800">
                  This angle may hurt your AI authority: <strong>"{warningData.angle}"</strong>
                </p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-red-100 transition"
              >
                <X className="h-5 w-5 text-red-600" />
              </button>
            </div>

            {/* Why it's risky */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-red-900 mb-3">Why it's risky:</h3>
              <div className="space-y-3">
                {warningData.issues.map((issue, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-red-100 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-red-900">{issue.issue}</div>
                      <div className="text-xs text-red-700 mt-1">({issue.reason})</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendation */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-red-900 mb-3">Recommendation:</h3>
              <div className="space-y-2">
                {warningData.fixes.map((fix, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-red-800">{fix}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alternative option */}
            <div className="mb-6 p-4 bg-red-100 rounded-lg">
              <p className="text-sm text-red-800">
                <strong>Or:</strong> Accept this is a <strong>{warningData.purpose}</strong> asset
                <br />
                <span className="text-red-700">(valuable for {warningData.goal}, just not AI visibility)</span>
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-4">
              <Button
                onClick={onRevise}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                Revise Angle
              </Button>
              <Button
                onClick={onContinue}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium"
              >
                Continue Anyway
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
