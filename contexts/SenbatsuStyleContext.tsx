'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type SenbatsuStyle = {
  label: string;
  value: SenbatsuStyleValue;
  senbatsuItemShape: 'circular' | 'rectangular';
  senbatsuItemSize: { width: number; height: number };
  senbatsuItemOverlap?: true;
  senbatsuItemOverlapGap?: { x: number; y: number };
  senbatsuFieldOffset?: { x: number; y: number };
  senbatsuFieldScale?: number;
  senbatsuFieldStaggerEnabled?: boolean;
  backgroundImageOffset?: { x: number; y: number };
  backgroundImageScale?: number;
};
type SenbatsuStyleValue = 'none' | 'nogizaka' | 'sakurazaka' | 'hinatazaka';

const defaultRectangularSenbatsuItemSize = { width: 70, height: 94 };
const defaultCircularSenbatsuItemSize = { width: 94, height: 94 };

const senbatsuStyle: { [key: string]: SenbatsuStyle } = {
  "none": {
    label: 'None',
    value: 'none',
    senbatsuItemShape: 'circular',
    senbatsuItemSize: defaultCircularSenbatsuItemSize,
  },
  "nogizaka": {
    label: '乃木坂46',
    value: 'nogizaka',
    senbatsuItemShape: 'rectangular',
    senbatsuItemSize: { width: 100, height: 150 },
    senbatsuItemOverlap: true,
    senbatsuItemOverlapGap: { x: 25, y: 10 },
    senbatsuFieldOffset: { x: -12, y: 0 },
    senbatsuFieldScale: 0.79,
    senbatsuFieldStaggerEnabled: false,
  },
  "sakurazaka": {
    label: '櫻坂46',
    value: 'sakurazaka',
    senbatsuItemShape: 'circular',
    senbatsuItemSize: defaultCircularSenbatsuItemSize,
  },
  "hinatazaka": {
    label: '日向坂46',
    value: 'hinatazaka',
    senbatsuItemShape: 'circular',
    senbatsuItemSize: defaultCircularSenbatsuItemSize,
  },
}

interface SenbatsuStyleContextType {
  selectedStyle: SenbatsuStyle;
  setSelectedStyle: (style: SenbatsuStyle) => void;
  updateStyleProperty: <K extends keyof SenbatsuStyle>(property: K, value: SenbatsuStyle[K]) => void;
  senbatsuStyle: { [key: string]: SenbatsuStyle }
}

const SenbatsuStyleContext = createContext<SenbatsuStyleContextType | undefined>(undefined);

interface SenbatsuStyleProviderProps {
  children: ReactNode;
  initialStyle?: SenbatsuStyle;
}

export function SenbatsuStyleProvider({ children, initialStyle = senbatsuStyle["nogizaka"] }: SenbatsuStyleProviderProps) {
  const [selectedStyle, setSelectedStyle] = useState<SenbatsuStyle>(initialStyle);

  const updateStyleProperty = <K extends keyof SenbatsuStyle>(property: K, value: SenbatsuStyle[K]) => {
    setSelectedStyle(prev => ({ ...prev, [property]: value }));
  };

  return (
    <SenbatsuStyleContext.Provider value={{ selectedStyle, setSelectedStyle, updateStyleProperty, senbatsuStyle }}>
      {children}
    </SenbatsuStyleContext.Provider>
  );
}

export function useSenbatsuStyle() {
  const context = useContext(SenbatsuStyleContext);
  if (context === undefined) {
    throw new Error('useSenbatsuStyle must be used within a SenbatsuStyleProvider');
  }
  return context;
}
