"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadClientData, ClientData } from './data-loader';

interface DemoState {
  clientData: ClientData | null;
  isLoading: boolean;
  error: string | null;
  selectedAsset: string | null;
  searchQuery: string;
  filters: {
    status: string[];
    type: string[];
  };
}

interface DemoContextType {
  state: DemoState;
  actions: {
    setSelectedAsset: (assetId: string) => void;
    setSearchQuery: (query: string) => void;
    setFilters: (filters: any) => void;
    refreshData: () => Promise<void>;
  };
}

const DemoContext = createContext<DemoContextType | null>(null);

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within DemoProvider');
  }
  return context;
};

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<DemoState>({
    clientData: null,
    isLoading: true,
    error: null,
    selectedAsset: null,
    searchQuery: '',
    filters: {
      status: [],
      type: []
    }
  });

  // Load client data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const data = await loadClientData();
      setState(prev => ({ 
        ...prev, 
        clientData: data, 
        isLoading: false,
        selectedAsset: data.company.assets[0]?.id || null
      }));
    } catch (error) {
      console.error('Failed to load client data:', error);
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to load demo data. Please refresh the page.', 
        isLoading: false 
      }));
    }
  };

  const actions = {
    setSelectedAsset: (assetId: string) => {
      setState(prev => ({ ...prev, selectedAsset: assetId }));
    },
    
    setSearchQuery: (query: string) => {
      setState(prev => ({ ...prev, searchQuery: query }));
    },

    setFilters: (filters: any) => {
      setState(prev => ({ ...prev, filters }));
    },

    refreshData: async () => {
      await loadData();
    }
  };

  return (
    <DemoContext.Provider value={{ state, actions }}>
      {children}
    </DemoContext.Provider>
  );
};

export default DemoProvider;