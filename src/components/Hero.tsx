import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Map, Compass, TrendingUp, Cpu, Network } from 'lucide-react';
import CornerCuts from './CornerCuts';

interface HeroProps {
  onStartOnboarding: () => void;
  onExploreCaminos: () => void;
}

export default function Hero({ onStartOnboarding, onExploreCaminos }: HeroProps) {
  return (
    <section 
      id="hero" 
      className="relative overflow-hidden bg-brand-bg pt-12 pb-16 md:pt-16 md:pb-24 lg:pt-24 lg:pb-32 border-b-2 border-brand-charcoal"
      data-scroll-section
    >
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(51,49,51,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(51,49,51,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      
      {/* Brutalist shapes for Locomotive Scroll visual interest */}
      <div 
        className="absolute top-20 right-10 w-24 h-24 bg-brand-blue/10 border-2 border-brand-charcoal pointer-events-none hidden lg:block"
        data-scroll
        data-scroll-speed="1.5"
        style={{ transform: 'rotate(15deg)' }}
      />
      <div 
        className="absolute bottom-20 left-10 w-32 h-12 bg-white border-2 border-brand-charcoal pointer-events-none hidden lg:block"
        data-scroll
        data-scroll-speed="0.8"
        style={{ transform: 'rotate(-5deg)' }}
      >
        <CornerCuts size={12} color="text-brand-bg" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Info Banner (Assemble style) */}
        <div className="flex justify-center mb-8">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-charcoal bg-[#FFFFFF] border-2 border-brand-charcoal px-4 py-1.5 shadow-[2px_2px_0px_rgba(51,49,51,1)]">
            [ plataforma interactiva / estudiantes y recién egresados / copiloto de carrera ]
          </span>
        </div>

        {/* Title (Brutalist style, large, lowercase) */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 
            className="text-4xl font-black uppercase tracking-tight text-brand-charcoal sm:text-5xl md:text-6xl lg:text-7.5xl leading-[1.05]"
            data-scroll
            data-scroll-speed="0.2"
          >
            descubre tu{' '}
            <span className="text-white bg-brand-blue px-3 py-1 inline-block border-2 border-brand-charcoal transform -rotate-1 relative">
              <CornerCuts size={10} color="text-brand-bg" />
              roadmap
            </span>{' '}
            profesional con IA
          </h1>
        </div>

        {/* Two Column Layout (Assemble style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-12">
          
          {/* Left Column: Description & CTAs */}
          <div className="lg:col-span-5 space-y-6 lg:text-left text-center">
            <p className="text-sm sm:text-base md:text-lg text-brand-charcoal/80 font-medium leading-relaxed">
              Explora los caminos que puede tomar tu carrera, descubre áreas especializadas y genera una ruta personalizada para empezar tus prácticas o construir tu futuro profesional hoy mismo.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-2">
              <button
                onClick={onStartOnboarding}
                className="w-full sm:w-auto brutalist-button brutalist-button-primary text-xs sm:text-sm font-bold uppercase px-8 py-4 flex items-center justify-center gap-2"
              >
                <CornerCuts color="text-brand-bg" size={8} />
                <Compass className="h-4.5 w-4.5 shrink-0" />
                Generar mi roadmap
              </button>
              
              <button
                onClick={onExploreCaminos}
                className="w-full sm:w-auto brutalist-button brutalist-button-secondary text-xs sm:text-sm font-bold uppercase px-8 py-4 flex items-center justify-center gap-2"
              >
                <CornerCuts color="text-brand-bg" size={8} />
                <Map className="h-4.5 w-4.5 shrink-0" />
                Explorar caminos
              </button>
            </div>
          </div>

          {/* Right Column: Visual Simulator Box (Assemble Image Style) */}
          <div 
            className="lg:col-span-7 relative"
            data-scroll
            data-scroll-speed="-0.3"
          >
            <div className="relative border-2 border-brand-charcoal bg-white p-1 shadow-[6px_6px_0px_rgba(51,49,51,1)] overflow-hidden">
              <CornerCuts size={16} color="text-brand-bg" />
              
              <div className="bg-brand-light-blue/40 p-4 sm:p-6 lg:p-8">
                {/* Header Simulator UI */}
                <div className="flex items-center justify-between border-b-2 border-brand-charcoal pb-4 mb-6">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3.5 w-3.5 border-2 border-brand-charcoal bg-rose-500 rounded-full" />
                    <span className="h-3.5 w-3.5 border-2 border-brand-charcoal bg-amber-500 rounded-full" />
                    <span className="h-3.5 w-3.5 border-2 border-brand-charcoal bg-emerald-500 rounded-full" />
                  </div>
                  <div className="flex items-center gap-1.5 bg-white border-2 border-brand-charcoal px-3 py-1 text-[10px] font-mono font-black uppercase text-brand-charcoal">
                    <Cpu className="h-3.5 w-3.5 text-brand-blue" />
                    <span>Generador v1.4</span>
                  </div>
                </div>

                {/* Node Simulation Tree */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                  {/* Connectors (Brutalist style solid paths) */}
                  <div className="hidden md:block absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                    <svg className="w-full h-full text-brand-charcoal" fill="none">
                      <path d="M 170,45 L 290,45 M 480,45 L 610,45 M 170,45 Q 230,110 290,110" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
                    </svg>
                  </div>

                  {/* Node 1 */}
                  <div className="relative z-10 flex flex-col items-center p-4 border-2 border-brand-charcoal bg-white">
                    <CornerCuts size={10} color="text-brand-light-blue" />
                    <div className="flex h-10 w-10 items-center justify-center border-2 border-brand-charcoal bg-brand-light-blue text-brand-blue mb-3">
                      <Network className="h-5 w-5" />
                    </div>
                    <h4 className="text-xs font-black uppercase font-mono text-brand-charcoal">1. Tu Carrera</h4>
                    <p className="text-[10px] text-brand-charcoal/60 text-center mt-1">Ej. Administración de Empresas</p>
                    <div className="mt-3 flex flex-wrap justify-center gap-1">
                      <span className="text-[9px] font-bold font-mono bg-brand-bg border border-brand-charcoal px-1.5 py-0.5">Finanzas</span>
                    </div>
                  </div>

                  {/* Node 2 */}
                  <div className="relative z-10 flex flex-col items-center p-4 border-2 border-brand-charcoal bg-white shadow-[3px_3px_0px_rgba(0,66,255,1)]">
                    <CornerCuts size={10} color="text-brand-light-blue" />
                    <div className="flex h-10 w-10 items-center justify-center border-2 border-brand-charcoal bg-brand-blue text-white mb-3">
                      <Compass className="h-5 w-5" />
                    </div>
                    <h4 className="text-xs font-black uppercase font-mono text-brand-blue">2. Especialidad</h4>
                    <p className="text-[10px] text-brand-charcoal/60 text-center mt-1">Especialización de Mercado</p>
                    <div className="mt-3 flex flex-wrap justify-center gap-1">
                      <span className="text-[9px] font-bold font-mono bg-brand-blue text-white px-1.5 py-0.5">FP&A</span>
                    </div>
                  </div>

                  {/* Node 3 */}
                  <div className="relative z-10 flex flex-col items-center p-4 border-2 border-brand-charcoal bg-white">
                    <CornerCuts size={10} color="text-brand-light-blue" />
                    <div className="flex h-10 w-10 items-center justify-center border-2 border-brand-charcoal bg-[#FEE2E2] text-rose-600 mb-3">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <h4 className="text-xs font-black uppercase font-mono text-brand-charcoal">3. Crecimiento</h4>
                    <p className="text-[10px] text-brand-charcoal/60 text-center mt-1">Escalera Corporativa</p>
                    <div className="mt-3 flex flex-wrap justify-center gap-1">
                      <span className="text-[9px] font-bold font-mono bg-brand-bg border border-brand-charcoal px-1.5 py-0.5">Gerente</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
