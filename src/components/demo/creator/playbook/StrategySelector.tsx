"use client";

import { useState } from 'react';
import { PlaybookStrategy } from '@/lib/demo/creator/types';
import { CheckCircle2, Circle, TrendingUp, Zap } from 'lucide-react';
import Button from '@/components/ui/Button';

interface StrategySelectorProps {
  strategies: PlaybookStrategy[];
  onConfirm: (selectedIds: string[]) => void;
}

export function StrategySelector({ strategies, onConfirm }: StrategySelectorProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showOnlySelected, setShowOnlySelected] = useState(false);

  const toggleStrategy = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleConfirm = () => {
    if (selected.size > 0) {
      setShowOnlySelected(true);
    }
    onConfirm(Array.from(selected));
  };

  const resetSelection = () => {
    setSelected(new Set());
    setShowOnlySelected(false);
  };

  // Filter strategies based on selection state
  const displayStrategies = showOnlySelected 
    ? strategies.filter(strategy => selected.has(strategy.id))
    : strategies;

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-gray-900">
            {showOnlySelected ? 'Selected Strategies' : 'Select Strategies'} ({selected.size} selected)
          </h3>
          {showOnlySelected && (
            <button
              onClick={resetSelection}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              Change Selection
            </button>
          )}
        </div>
        <p className="text-xs text-gray-600">
          {showOnlySelected 
            ? 'These are the strategies that will be included in your playbook'
            : 'Choose one or more strategies to include in your playbook'
          }
        </p>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {displayStrategies.map((strategy) => {
          const isSelected = selected.has(strategy.id);

          return (
            <button
              key={strategy.id}
              onClick={() => !showOnlySelected && toggleStrategy(strategy.id)}
              className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
                showOnlySelected
                  ? 'border-green-500 bg-green-50 shadow-md cursor-default'
                  : isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {showOnlySelected ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : isSelected ? (
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{strategy.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{strategy.description}</p>

                  <div className="flex items-center gap-2">
                    <span className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${getImpactColor(strategy.impact)}`}>
                      <TrendingUp className="h-3 w-3" />
                      {strategy.impact} impact
                    </span>
                    <span className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${getEffortColor(strategy.effort)}`}>
                      <Zap className="h-3 w-3" />
                      {strategy.effort} effort
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <Button
        onClick={handleConfirm}
        disabled={selected.size === 0}
        variant="primary"
        className="w-full rounded-xl bg-black py-3 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {showOnlySelected 
          ? `Generate Playbook with ${selected.size} ${selected.size === 1 ? 'strategy' : 'strategies'}`
          : `Generate Playbook (${selected.size} ${selected.size === 1 ? 'strategy' : 'strategies'})`
        }
      </Button>
    </div>
  );
}

