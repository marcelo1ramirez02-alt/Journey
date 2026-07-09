import React from 'react';
import { Sparkles, Star, ArrowRight, ShieldAlert } from 'lucide-react';
import CornerCuts from './CornerCuts';

interface BetaFormProps {
  onGenerateRoadmap: () => void;
  registeredCount: number;
}

export default function BetaForm({ onGenerateRoadmap, registeredCount }: BetaFormProps) {
  // Fictional social proof log of recent signups to validate the demand
  const recentSignups = [
    { name: "Sofía M.", career: "Ing. Industrial", time: "Hace 2 min" },
    { name: "Mateo S.", career: "Administración", time: "Hace 15 min" },
    { name: "Camila V.", career: "Psicología", time: "Hace 1 hora" },
    { name: "Diego G.", career: "Marketing", time: "Hace 3 horas" }
  ];

  return (
    <section 
      id="beta-cta" 
      className="bg-brand-charcoal py-16 sm:py-24 border-t-2 border-brand-charcoal relative overflow-hidden"
      data-scroll-section
    >
      {/* Decorative linear path */}
      <div className="absolute top-0 left-0 w-full h-1 bg-brand-blue" />
      
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Callout Card (White on Charcoal Section) */}
        <div className="relative border-2 border-brand-charcoal bg-white p-8 sm:p-12 shadow-[8px_8px_0px_rgba(0,66,255,1)] text-brand-charcoal overflow-hidden">
          <CornerCuts size={16} color="text-brand-charcoal" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (Info) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-brand-blue bg-brand-light-blue border border-brand-blue/30 px-3 py-1">
                [ ACCESO TOTAL AL COPILOTO DE CARRERA ]
              </span>

              <h2 className="text-3xl font-black uppercase text-brand-charcoal tracking-tight sm:text-4xl leading-[1.1]">
                construimos una nueva forma de orientar tu carrera profesional.
              </h2>
              
              <p className="text-brand-charcoal/70 text-xs sm:text-sm font-medium leading-relaxed">
                Nuestra plataforma te ayuda a estructurar tus metas de forma inteligente. Consigue antes que nadie las mejores hojas de ruta extendidas, un comparador salarial integrado y las habilidades más demandadas en el mercado corporativo.
              </p>

              {/* Social Proof Stats */}
              <div className="pt-5 border-t border-brand-charcoal/10 flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="h-7 w-7 rounded-full bg-brand-blue border-2 border-white flex items-center justify-center text-[9px] font-bold text-white">SM</div>
                    <div className="h-7 w-7 rounded-full bg-purple-600 border-2 border-white flex items-center justify-center text-[9px] font-bold text-white">MS</div>
                    <div className="h-7 w-7 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-[9px] font-bold text-brand-charcoal">CV</div>
                  </div>
                  <span className="text-xs text-brand-charcoal font-mono font-bold">
                    +<strong className="text-brand-blue">{registeredCount}</strong> roadmaps generados esta semana
                  </span>
                </div>
                
                <div className="text-xs text-brand-charcoal/60 flex items-center gap-1.5 font-mono font-bold">
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  <span>Calificación 4.9/5 de la comunidad</span>
                </div>
              </div>
            </div>

            {/* Right Content (CTA Card) */}
            <div className="lg:col-span-5">
              <div className="border-2 border-brand-charcoal bg-brand-bg p-6 sm:p-8 text-center space-y-6 relative overflow-hidden">
                <CornerCuts size={12} color="text-white" />
                <div>
                  <h3 className="text-xs font-black uppercase font-mono tracking-wider text-brand-blue">[ COMIENZA TU VIAJE ]</h3>
                  <p className="text-[10px] text-brand-charcoal/70 font-medium mt-2 leading-relaxed">
                    Ingresa tus intereses, etapa académica e industria de enfoque para generar un mapa dinámico y personalizado con IA.
                  </p>
                </div>

                <button
                  onClick={onGenerateRoadmap}
                  className="w-full brutalist-button brutalist-button-primary py-4 text-xs font-black uppercase flex items-center justify-center gap-2"
                >
                  <CornerCuts size={6} color="text-brand-bg" />
                  <span>Generar Roadmap</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </button>

                <p className="text-[9px] font-mono font-bold text-brand-charcoal/50 flex items-center justify-center gap-1.5">
                  <ShieldAlert className="h-3.5 w-3.5 text-brand-blue" /> 
                  <span>100% gratuito y libre de registros</span>
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Fictional Live Activity Log */}
        <div className="mt-12 text-center">
          <span className="text-[9px] uppercase font-mono tracking-widest text-white/50 block mb-4">
            // ACTIVIDAD RECIENTE EN LA PLATAFORMA
          </span>
          <div className="flex flex-wrap justify-center gap-3">
            {recentSignups.map((act, i) => (
              <div 
                key={i}
                className="bg-brand-charcoal border-2 border-white/10 px-3.5 py-1.5 text-xs text-white/80 flex items-center gap-2 font-mono font-bold"
              >
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{act.name} ({act.career}) generó su roadmap</span>
                <span className="text-[9px] text-white/40">{act.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
