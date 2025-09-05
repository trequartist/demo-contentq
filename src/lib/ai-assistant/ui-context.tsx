"use client";

import React, { createContext, useContext, useRef } from 'react';
import { UIController } from './ui-controller';
import { useRouter } from 'next/navigation';

interface UIControllerContextType {
  controller: UIController | null;
  registerState: (name: string, setter: any) => void;
  executeAction: (action: any) => Promise<any>;
}

const UIControllerContext = createContext<UIControllerContextType>({
  controller: null,
  registerState: () => {},
  executeAction: async () => null
});

export function UIControllerProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const controllerRef = useRef<UIController>(new UIController(router));
  
  const registerState = (name: string, setter: any) => {
    if (controllerRef.current) {
      controllerRef.current.registerStateRef(name, setter);
    }
  };
  
  const executeAction = async (action: any) => {
    if (controllerRef.current) {
      return await controllerRef.current.execute(action);
    }
    return null;
  };
  
  return (
    <UIControllerContext.Provider value={{ 
      controller: controllerRef.current,
      registerState,
      executeAction 
    }}>
      {children}
    </UIControllerContext.Provider>
  );
}

export function useUIController() {
  const context = useContext(UIControllerContext);
  if (!context) {
    throw new Error('useUIController must be used within UIControllerProvider');
  }
  return context;
}

// HOC to auto-register component states
export function withUIControl<P extends object>(
  Component: React.ComponentType<P>,
  stateMap: Record<string, string>
) {
  return function UIControlledComponent(props: P) {
    const { registerState } = useUIController();
    const stateRefs = useRef<Record<string, any>>({});
    
    // Register all state setters
    React.useEffect(() => {
      Object.entries(stateMap).forEach(([stateName, setterName]) => {
        if ((props as any)[setterName]) {
          registerState(setterName, (props as any)[setterName]);
        }
      });
    }, []);
    
    return <Component {...props} />;
  };
}
