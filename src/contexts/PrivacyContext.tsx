'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface PrivacyContextType {
  privacyMode: boolean;
  setPrivacyMode: (enabled: boolean) => void;
  anonymizeName: (name: string) => string;
  anonymizeEmail: (email: string) => string;
}

const PrivacyContext = createContext<PrivacyContextType | undefined>(undefined);

export function PrivacyProvider({ children }: { children: React.ReactNode }) {
  const [privacyMode, setPrivacyModeState] = useState(false);

  // Load privacy mode from localStorage on mount
  useEffect(() => {
    const savedPrivacyMode = localStorage.getItem('privacy-mode');
    if (savedPrivacyMode !== null) {
      setPrivacyModeState(JSON.parse(savedPrivacyMode));
    }
  }, []);

  // Save privacy mode to localStorage when it changes
  const setPrivacyMode = (enabled: boolean) => {
    setPrivacyModeState(enabled);
    localStorage.setItem('privacy-mode', JSON.stringify(enabled));
  };

  // Function to anonymize names
  const anonymizeName = (name: string) => {
    if (!privacyMode) return name;
    return 'John Doe';
  };

  // Function to anonymize emails
  const anonymizeEmail = (email: string) => {
    if (!privacyMode) return email;
    return 'john.doe';
  };

  return (
    <PrivacyContext.Provider value={{ privacyMode, setPrivacyMode, anonymizeName, anonymizeEmail }}>
      {children}
    </PrivacyContext.Provider>
  );
}

export function usePrivacy() {
  const context = useContext(PrivacyContext);
  if (context === undefined) {
    throw new Error('usePrivacy must be used within a PrivacyProvider');
  }
  return context;
}
