import { useEffect } from 'react';
import { useUIController } from '@/lib/ai-assistant/ui-context';

// Custom hook to register component state with UI controller
export function useRegisterUIState(stateMap: Record<string, any>) {
  const { registerState } = useUIController();
  
  useEffect(() => {
    // Register all state setters with the UI controller
    Object.entries(stateMap).forEach(([name, setter]) => {
      if (typeof setter === 'function') {
        registerState(name, setter);
      }
    });
  }, []); // Run only once on mount
  
  return registerState;
}
