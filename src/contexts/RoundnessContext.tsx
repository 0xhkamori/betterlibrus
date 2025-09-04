'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface RoundnessContextType {
  roundedMode: boolean;
  setRoundedMode: (rounded: boolean) => void;
}

const RoundnessContext = createContext<RoundnessContextType | undefined>(undefined);

export function RoundnessProvider({ children }: { children: React.ReactNode }) {
  const [roundedMode, setRoundedModeState] = useState(false);

  // Load roundness preference from localStorage
  useEffect(() => {
    const savedRoundness = localStorage.getItem('roundedMode');
    if (savedRoundness !== null) {
      setRoundedModeState(savedRoundness === 'true');
    }
  }, []);

  // Apply roundness to document and save preference
  const setRoundedMode = (rounded: boolean) => {
    setRoundedModeState(rounded);
    localStorage.setItem('roundedMode', rounded.toString());
    
    // Apply CSS custom property for border radius
    if (rounded) {
      document.documentElement.style.setProperty('--radius', '1rem');
      document.documentElement.classList.add('rounded-mode');
    } else {
      document.documentElement.style.setProperty('--radius', '0.5rem');
      document.documentElement.classList.remove('rounded-mode');
    }
  };

  // Apply roundness on mount
  useEffect(() => {
    if (roundedMode) {
      document.documentElement.style.setProperty('--radius', '1rem');
      document.documentElement.classList.add('rounded-mode');
    } else {
      document.documentElement.style.setProperty('--radius', '0.5rem');
      document.documentElement.classList.remove('rounded-mode');
    }
  }, [roundedMode]);

  return (
    <RoundnessContext.Provider value={{ roundedMode, setRoundedMode }}>
      {children}
    </RoundnessContext.Provider>
  );
}

export function useRoundness() {
  const context = useContext(RoundnessContext);
  if (context === undefined) {
    throw new Error('useRoundness must be used within a RoundnessProvider');
  }
  return context;
}
