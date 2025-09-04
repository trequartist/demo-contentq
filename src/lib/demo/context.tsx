"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DEMO_CONFIG } from './demo-config';

interface DemoState {
  metrics: {
    authorityScore: number;
    aiVisibility: number;
    contentVelocity: number;
    opportunityValue: number;
    missedSearches: number;
  };
}

const DemoContext = createContext<DemoState | undefined>(undefined);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [metrics] = useState({
    authorityScore: DEMO_CONFIG.AUTHORITY_SCORE,
    aiVisibility: DEMO_CONFIG.AI_VISIBILITY,
    contentVelocity: DEMO_CONFIG.CONTENT_VELOCITY,
    opportunityValue: DEMO_CONFIG.OPPORTUNITY_VALUE,
    missedSearches: DEMO_CONFIG.MISSED_SEARCHES
  });

  const value: DemoState = {
    metrics
  };

  return (
    <DemoContext.Provider value={value}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemoContext() {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error('useDemoContext must be used within a DemoProvider');
  }
  return context;
}
