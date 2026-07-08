import React from 'react';
import { Compass, Sparkles, Users, Layers, Award } from 'lucide-react';
import JourneyLogo from './JourneyLogo';

interface NavbarProps {
  onStartOnboarding: () => void;
  onScrollToSection: (id: string) => void;
  registeredCount: number;
}

export default function Navbar({ onStartOnboarding, onScrollToSection, registeredCount }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[rgba(255,255,255,0.08)] bg-[#05070A]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div 
          onClick={() => onScrollToSection('hero')} 
          className="flex cursor-pointer items-center gap-2.5 group"
        >
          <div className="flex h-9 w-9 items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <JourneyLogo className="h-full w-full" />
          </div>
          <div className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-white transition-colors group-hover:text-[#0042FF]">Journey</span>
            <span className="ml-2 text-[10px] font-semibold bg-[#0042FF]/10 text-[#0042FF] px-1.5 py-0.5 rounded-full border border-[#0042FF]/20">
              BETA
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => onScrollToSection('hero')} 
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Inicio
          </button>
          <button 
            onClick={() => onScrollToSection('propuesta')} 
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            ¿Por qué Journey?
          </button>
          <button 
            onClick={() => onScrollToSection('comparador')} 
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Comparar Áreas
          </button>
          <button 
            onClick={() => onScrollToSection('beta-cta')} 
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Comunidad Beta
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 bg-[#111827] border border-[rgba(255,255,255,0.08)] px-3 py-1.5 rounded-lg text-xs text-gray-300">
            <Users className="h-3.5 w-3.5 text-[#0042FF]" />
            <span><strong className="text-[#0042FF] font-bold">{registeredCount}</strong> miembros unidos</span>
          </div>
          
          <button
            onClick={onStartOnboarding}
            className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-white text-black hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Generar mi roadmap
          </button>
        </div>
      </div>
    </header>
  );
}
