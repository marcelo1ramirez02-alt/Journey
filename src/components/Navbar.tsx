import React from 'react';
import { Compass, Users } from 'lucide-react';
import JourneyLogo from './JourneyLogo';
import CornerCuts from './CornerCuts';

interface NavbarProps {
  onStartOnboarding: () => void;
  onScrollToSection: (id: string) => void;
  registeredCount: number;
}

export default function Navbar({ onStartOnboarding, onScrollToSection, registeredCount }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-brand-charcoal bg-brand-bg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div 
          onClick={() => onScrollToSection('hero')} 
          className="flex cursor-pointer items-center gap-2 group"
        >
          <div className="flex h-9 w-9 items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <JourneyLogo className="h-full w-full" />
          </div>
          <div className="flex items-center">
            <span className="text-xl font-black uppercase tracking-tighter text-brand-charcoal transition-colors group-hover:text-brand-blue">
              Journey
            </span>
            <span className="ml-2 text-[9px] font-bold font-mono bg-brand-blue text-white px-2 py-0.5 border border-brand-charcoal">
              BETA
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => onScrollToSection('hero')} 
            className="text-xs font-bold font-mono uppercase text-brand-charcoal/70 hover:text-brand-blue transition-colors cursor-pointer"
          >
            [ Inicio ]
          </button>
          <button 
            onClick={() => onScrollToSection('propuesta')} 
            className="text-xs font-bold font-mono uppercase text-brand-charcoal/70 hover:text-brand-blue transition-colors cursor-pointer"
          >
            [ ¿Por qué Journey? ]
          </button>
          <button 
            onClick={() => onScrollToSection('comparador')} 
            className="text-xs font-bold font-mono uppercase text-brand-charcoal/70 hover:text-brand-blue transition-colors cursor-pointer"
          >
            [ Comparar Áreas ]
          </button>
          <button 
            onClick={() => onScrollToSection('beta-cta')} 
            className="text-xs font-bold font-mono uppercase text-brand-charcoal/70 hover:text-brand-blue transition-colors cursor-pointer"
          >
            [ Comunidad ]
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 bg-[#FFFFFF] border-2 border-brand-charcoal px-3 py-1 text-xs text-brand-charcoal font-mono font-bold">
            <Users className="h-3.5 w-3.5 text-brand-blue" />
            <span>
              <strong className="text-brand-blue">{registeredCount}</strong> unidos
            </span>
          </div>
          
          <button
            onClick={onStartOnboarding}
            className="relative px-4 py-2 text-xs font-black font-mono uppercase text-white bg-brand-blue hover:bg-brand-blue/95 border-2 border-brand-charcoal shadow-[2px_2px_0px_rgba(51,49,51,1)] hover:shadow-[4px_4px_0px_rgba(51,49,51,1)] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_rgba(51,49,51,1)] overflow-hidden cursor-pointer"
          >
            <CornerCuts color="text-brand-bg" size={6} />
            Generar Roadmap
          </button>
        </div>

      </div>
    </header>
  );
}
