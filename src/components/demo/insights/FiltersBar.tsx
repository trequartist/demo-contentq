"use client";

import React from 'react';
import { Button, Input } from '@/components/ui';
import { Filter } from 'lucide-react';

interface FiltersBarProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedPriority: string;
  setSelectedPriority: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  dense: boolean;
  setDense: (value: boolean) => void;
  showAdditionalInsights: boolean;
  setShowAdditionalInsights: (value: boolean) => void;
}

export default function FiltersBar(props: FiltersBarProps): React.ReactElement {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedPriority,
    setSelectedPriority,
    searchQuery,
    setSearchQuery,
    dense,
    setDense,
    showAdditionalInsights,
    setShowAdditionalInsights,
  } = props;

  return (
    <div className="border-b border-black/10">
      <div className="px-4 sm:px-6 lg:px-8 py-3 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-black/60">Category:</span>
              <div className="flex gap-2">
                {['all', 'opportunity', 'issue', 'trend', 'recommendation'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 text-sm rounded-lg transition-all ${
                      selectedCategory === cat
                        ? 'bg-black text-white'
                        : 'bg-white text-black/60 hover:text-black border border-black/10'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-black/60">Priority:</span>
              <div className="flex gap-2">
                {['all', 'critical', 'high', 'medium', 'low'].map(priority => (
                  <button
                    key={priority}
                    onClick={() => setSelectedPriority(priority)}
                    className={`px-3 py-1 text-sm rounded-lg transition-all ${
                      selectedPriority === priority
                        ? 'bg-black text-white'
                        : 'bg-white text-black/60 hover:text-black border border-black/10'
                    }`}
                  >
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Input
                value={searchQuery}
                onChange={(e: any) => setSearchQuery(e.target.value)}
                placeholder="Search insights..."
                className="w-56 bg-white border border-black/20 text-sm"
              />
            </div>
            <Button
              variant="secondary"
              className="bg-white text-black border border-black/20 hover:bg-black/5"
              onClick={() => setShowAdditionalInsights(!showAdditionalInsights)}
            >
              <Filter className="w-4 h-4 mr-2" />
              {showAdditionalInsights ? 'Hide' : 'Show'} Market Intelligence
            </Button>
            <button
              onClick={() => setDense(!dense)}
              className={`px-3 py-1 text-sm rounded-lg border transition-colors ${
                dense ? 'bg-black text-white border-black' : 'bg-white text-black/70 border-black/20 hover:text-black'
              }`}
              aria-pressed={dense}
            >
              {dense ? 'Dense View' : 'Comfort View'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


