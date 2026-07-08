import React from 'react';
import { Compass, Mail, Shield, MessageCircle } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (id: string) => void;
  onStartOnboarding: () => void;
}

export default function Footer({ onScrollToSection, onStartOnboarding }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#05070A] border-t border-[rgba(255,255,255,0.08)] text-gray-400 text-xs sm:text-sm py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onScrollToSection('hero')}>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#6366F1] to-[#A855F7] shadow-lg">
                <Compass className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">Journey</span>
            </div>
            
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              Roadmaps profesionales dinámicos para estudiantes y jóvenes profesionales. 
              Encuentra tu ruta de aprendizaje técnico y despegue de prácticas antes de terminar tu ciclo universitario.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Recursos</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onScrollToSection('hero')} 
                  className="hover:text-white transition-colors cursor-pointer text-xs"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button 
                  onClick={onStartOnboarding} 
                  className="hover:text-white transition-colors cursor-pointer text-xs"
                >
                  Generador de Roadmaps
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollToSection('comparador')} 
                  className="hover:text-white transition-colors cursor-pointer text-xs"
                >
                  Comparador de Áreas
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onScrollToSection('beta-cta')} 
                  className="hover:text-white transition-colors cursor-pointer text-xs"
                >
                  Beta Cerrada
                </button>
              </li>
            </ul>
          </div>

          {/* Contact and Social */}
          <div>
            <h4 className="text-white font-semibold mb-3">Soporte e Interacción</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5 text-xs text-gray-400">
                <Mail className="h-3.5 w-3.5 text-indigo-400" />
                <span>hola@journey.career</span>
              </li>
              <li className="flex items-center gap-1.5 text-xs text-gray-400">
                <MessageCircle className="h-3.5 w-3.5 text-purple-400" />
                <span>@journey_latam</span>
              </li>
              <li className="flex items-center gap-1.5 text-xs text-gray-400">
                <Shield className="h-3.5 w-3.5 text-emerald-400" />
                <span>Términos y Privacidad</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer bottom */}
        <div className="mt-12 pt-6 border-t border-[rgba(255,255,255,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-gray-500">
            &copy; {currentYear} Journey. Todos los derechos reservados. Diseñado para impulsar el talento joven en Latinoamérica.
          </p>
          <div className="flex gap-4 text-[10px] text-gray-500">
            <span className="hover:text-white transition-colors cursor-pointer">Seguridad</span>
            <span className="hover:text-white transition-colors cursor-pointer">Cookies</span>
            <span className="hover:text-white transition-colors cursor-pointer">FAQ de la Beta</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
