import React from 'react';
import { Sparkles, Star, ArrowRight, ShieldAlert } from 'lucide-react';

interface BetaFormProps {
  onGenerateRoadmap: () => void;
  registeredCount: number;
}

export default function BetaForm({ onGenerateRoadmap, registeredCount }: BetaFormProps) {
  // Fictional social proof log of recent signups to validate the demand
  const recentSignups = [
    { name: "Sofía M.", career: "Ing. Industrial", time: "Hace 2 minutos" },
    { name: "Mateo S.", career: "Administración", time: "Hace 15 minutos" },
    { name: "Camila V.", career: "Psicología", time: "Hace 1 hora" },
    { name: "Diego G.", career: "Marketing", time: "Hace 3 horas" }
  ];

  return (
    <section id="beta-cta" className="bg-[#05070A] py-16 sm:py-24 border-t border-[rgba(255,255,255,0.08)] relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-0.5 bg-gradient-to-r from-transparent via-[#0042FF]/40 to-transparent" />
      
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="glass p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Neon background decorations */}
          <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-[#0042FF]/5 blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[#0042FF]/4 blur-3xl -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (Info) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0042FF]/30 bg-[#0042FF]/10 px-3.5 py-1 text-xs text-blue-400 font-medium">
                <Sparkles className="h-3.5 w-3.5 animate-pulse text-[#0042FF]" />
                Acceso Total al Copiloto de Carrera
              </span>

              <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                Estamos construyendo una nueva forma de orientar carreras profesionales. Genera tu mapa personalizado hoy.
              </h2>
              
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                Nuestra plataforma te ayuda a estructurar tus metas de forma inteligente. Consigue antes que nadie las mejores hojas de ruta extendidas, un comparador salarial integrado y las habilidades más demandadas en el mercado corporativo.
              </p>

              {/* Social Proof Stats */}
              <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="h-7 w-7 rounded-full bg-indigo-500 border-2 border-[#05070A] flex items-center justify-center text-[10px] font-bold text-white">SM</div>
                    <div className="h-7 w-7 rounded-full bg-purple-600 border-2 border-[#05070A] flex items-center justify-center text-[10px] font-bold text-white">MS</div>
                    <div className="h-7 w-7 rounded-full bg-pink-500 border-2 border-[#05070A] flex items-center justify-center text-[10px] font-bold text-white">CV</div>
                  </div>
                  <span className="text-xs text-gray-300 font-medium">
                    +<strong className="text-indigo-400">{registeredCount}</strong> roadmaps generados esta semana
                  </span>
                </div>
                
                <div className="text-xs text-gray-500 flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                  <span>Calificación promedio 4.9/5 de la comunidad</span>
                </div>
              </div>
            </div>

            {/* Right Content (CTA Card) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0A0D14]/90 p-6 sm:p-8 shadow-xl text-center space-y-6">
                <div>
                  <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#00A3FF]">Comienza tu Viaje</h3>
                  <p className="text-xs text-gray-400 mt-2">
                    Ingresa tus intereses, etapa académica e industria de enfoque para generar un mapa dinámico y personalizado con IA.
                  </p>
                </div>

                <button
                  onClick={onGenerateRoadmap}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#0042FF] to-[#00A3FF] py-4 text-xs sm:text-sm font-bold text-white shadow-lg shadow-[#0042FF]/15 hover:shadow-[#0042FF]/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-250 cursor-pointer"
                >
                  Generar Roadmap de Carrera
                  <ArrowRight className="h-4 w-4" />
                </button>

                <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1.5">
                  <ShieldAlert className="h-3 w-3" /> Es 100% gratuito y libre de registros complejos
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Fictional Live Activity Log */}
        <div className="mt-8 text-center">
          <span className="text-[10px] uppercase font-mono tracking-widest text-gray-600 block mb-3">ACTIVIDAD RECIENTE EN LA PLATAFORMA</span>
          <div className="flex flex-wrap justify-center gap-3">
            {recentSignups.map((act, i) => (
              <div 
                key={i}
                className="bg-[#111827]/40 border border-[rgba(255,255,255,0.06)] px-3 py-1.5 rounded-full text-xs text-gray-400 flex items-center gap-2"
              >
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span><strong className="text-gray-300 font-semibold">{act.name}</strong> ({act.career}) generó su roadmap</span>
                <span className="text-[10px] text-gray-600 font-mono">{act.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
