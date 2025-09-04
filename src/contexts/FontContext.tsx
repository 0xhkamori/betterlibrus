'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface FontOption {
  id: string;
  name: string;
  family: string;
  description: string;
  category: 'sans-serif' | 'serif' | 'monospace';
  googleFontUrl?: string;
}

export const fontOptions: FontOption[] = [
  {
    id: 'inter',
    name: 'Inter',
    family: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    description: 'Modern and highly readable',
    category: 'sans-serif',
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
  },
  {
    id: 'manrope',
    name: 'Manrope',
    family: 'Manrope, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    description: 'Geometric and friendly',
    category: 'sans-serif',
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap'
  },
  {
    id: 'poppins',
    name: 'Poppins',
    family: 'Poppins, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    description: 'Circular and contemporary',
    category: 'sans-serif',
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap'
  },
  {
    id: 'system',
    name: 'System UI',
    family: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    description: 'Native system font',
    category: 'sans-serif'
  },
  {
    id: 'opensans',
    name: 'Open Sans',
    family: 'Open Sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    description: 'Neutral and friendly',
    category: 'sans-serif',
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap'
  },
  {
    id: 'sourceserif',
    name: 'Source Serif Pro',
    family: 'Source Serif Pro, Georgia, serif',
    description: 'Professional serif font',
    category: 'serif',
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@400;600;700&display=swap'
  }
];

interface FontContextType {
  selectedFont: FontOption;
  setSelectedFont: (font: FontOption) => void;
  fontOptions: FontOption[];
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [selectedFont, setSelectedFontState] = useState<FontOption>(fontOptions[0]); // Default to Inter

  // Load font preference from localStorage
  useEffect(() => {
    const savedFontId = localStorage.getItem('selectedFont');
    if (savedFontId) {
      const savedFont = fontOptions.find(font => font.id === savedFontId);
      if (savedFont) {
        setSelectedFontState(savedFont);
      }
    }
  }, []);

  // Apply font to document and save preference
  const setSelectedFont = (font: FontOption) => {
    setSelectedFontState(font);
    localStorage.setItem('selectedFont', font.id);
    
    // Apply font to document root and body
    document.documentElement.style.setProperty('--font-family', font.family);
    document.documentElement.style.setProperty('--font-sans', font.family);
    document.body.style.fontFamily = font.family;
    
    // Load Google Font if needed
    if (font.googleFontUrl && !document.querySelector(`link[href="${font.googleFontUrl}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = font.googleFontUrl;
      document.head.appendChild(link);
    }
  };

  // Apply selected font on mount
  useEffect(() => {
    if (selectedFont) {
      document.documentElement.style.setProperty('--font-family', selectedFont.family);
      document.documentElement.style.setProperty('--font-sans', selectedFont.family);
      document.body.style.fontFamily = selectedFont.family;
      
      // Load Google Font if needed
      if (selectedFont.googleFontUrl && !document.querySelector(`link[href="${selectedFont.googleFontUrl}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = selectedFont.googleFontUrl;
        document.head.appendChild(link);
      }
    }
  }, [selectedFont]);

  return (
    <FontContext.Provider value={{ selectedFont, setSelectedFont, fontOptions }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
}
