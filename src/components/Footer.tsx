import React from 'react';
import { Mail, Shield, MessageCircle } from 'lucide-react';
import CornerCuts from './CornerCuts';
import JourneyLogo from './JourneyLogo';

interface FooterProps {
  onScrollToSection: (id: string) => void;
  onStartOnboarding: () => void;
}

export default function Footer({ onScrollToSection, onStartOnboarding }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="bg-brand-bg border-t-2 border-brand-charcoal text-brand-charcoal text-xs sm:text-sm py-12 relative overflow-hidden"
      data-scroll-section
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onScrollToSection('hero')}>
              <div className="flex h-8 w-8 items-center justify-center">
                <JourneyLogo className="h-full w-full" />
              </div>
              <span className="text-base font-black uppercase tracking-tight text-brand-charcoal">Journey</span>
            </div>
            
            <p className="text-xs text-brand-charcoal/70 max-w-sm leading-relaxed font-medium">
              Roadmaps profesionales dinámicos para estudiantes y jóvenes profesionales. 
              Encuentra tu ruta de aprendizaje técnico y despegue de prácticas antes de terminar tu ciclo universitario.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-brand-charcoal font-black font-mono uppercase text-xs sm:text-sm mb-3">Recursos</h4>
            <ul className="space-y-2 select-none">
              <li>
                <button 
                  onClick={() => onScrollToSection('hero')} 
                  className="text-brand-charcoal/70 hover:text-brand-blue transition-colors cursor-pointer text-xs font-mono font-bold uppercase"
                >
                  [ Inicio ]
                </button>
              </li>
              <li>
                <button 
                  onClick={onStartOnboarding} 
                  className="text-brand-charcoal/70 hover:text-brand-blue transition-colors cursor-pointer text-xs font-mono font-bold uppercase"
                >
                  [ Generar Roadmap ]
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollToSection('comparador')} 
                  className="text-brand-charcoal/70 hover:text-brand-blue transition-colors cursor-pointer text-xs font-mono font-bold uppercase"
                >
                  [ Comparar Áreas ]
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollToSection('beta-cta')} 
                  className="text-brand-charcoal/70 hover:text-brand-blue transition-colors cursor-pointer text-xs font-mono font-bold uppercase"
                >
                  [ Beta Cerrada ]
                </button>
              </li>
            </ul>
          </div>

          {/* Contact and Social */}
          <div>
            <h4 className="text-brand-charcoal font-black font-mono uppercase text-xs sm:text-sm mb-3">Soporte</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-1.5 text-xs text-brand-charcoal/80 font-mono font-bold">
                <Mail className="h-4 w-4 text-brand-blue shrink-0" />
                <span>hola@journey.career</span>
              </li>
              <li className="flex items-center gap-1.5 text-xs text-brand-charcoal/80 font-mono font-bold">
                <MessageCircle className="h-4 w-4 text-brand-blue shrink-0" />
                <span>@journey_latam</span>
              </li>
              <li className="flex items-center gap-1.5 text-xs text-brand-charcoal/80 font-mono font-bold">
                <Shield className="h-4 w-4 text-brand-blue shrink-0" />
                <span>Términos y Privacidad</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer bottom */}
        <div className="mt-12 pt-6 border-t-2 border-brand-charcoal/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-mono font-bold text-brand-charcoal/50">
            &copy; {currentYear} Journey. Todos los derechos reservados. Diseñado para impulsar el talento joven en Latinoamérica.
          </p>
          <div className="flex gap-4 text-[10px] font-mono font-bold text-brand-charcoal/50 select-none">
            <span className="hover:text-brand-blue transition-colors cursor-pointer">Seguridad</span>
            <span className="hover:text-brand-blue transition-colors cursor-pointer">Cookies</span>
            <span className="hover:text-brand-blue transition-colors cursor-pointer">FAQ de la Beta</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
