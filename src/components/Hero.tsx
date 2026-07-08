import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Map, Compass, TrendingUp, Cpu, Network } from 'lucide-react';

interface HeroProps {
  onStartOnboarding: () => void;
  onExploreCaminos: () => void;
}

export default function Hero({ onStartOnboarding, onExploreCaminos }: HeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden bg-[#05070A] pt-20 pb-16 md:pt-28 md:pb-24 lg:pt-36 lg:pb-32">
      {/* Decorative Gradients & Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
      
      <div className="absolute top-0 left-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-[#0042FF]/10 blur-[100px]" />
      <div className="absolute top-20 right-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-[#0042FF]/8 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Tagline / Batch */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#0042FF]/30 bg-[#0042FF]/10 px-3.5 py-1.5 text-xs sm:text-sm text-blue-400 font-medium backdrop-blur-md mb-8"
        >
          <Sparkles className="h-4 w-4 animate-spin text-[#0042FF]" style={{ animationDuration: '3s' }} />
          <span>Plataforma interactiva para estudiantes y recién egresados</span>
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Descubre tu{' '}
          <span className="bg-gradient-to-r from-[#0042FF] via-[#00A3FF] to-[#38BDF8] bg-clip-text text-transparent">
            roadmap profesional
          </span>{' '}
          con IA
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed"
        >
          Explora los caminos que puede tomar tu carrera, descubre áreas especializadas y genera una ruta personalizada para empezar tus prácticas o construir tu futuro profesional.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <button
            onClick={onStartOnboarding}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#0042FF] to-[#00A3FF] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#0042FF]/20 hover:shadow-[#0042FF]/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Compass className="h-5 w-5" />
            Generar mi roadmap
          </button>
          
          <button
            onClick={onExploreCaminos}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-gray-700 bg-gray-900/30 hover:bg-gray-800/80 px-8 py-4 text-base font-semibold text-[#F3F4F6] transition-all duration-200 cursor-pointer"
          >
            <Map className="h-5 w-5" />
            Explorar caminos
          </button>
        </motion.div>

        {/* Visual Preview Simulation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mx-auto mt-16 max-w-5xl rounded-2xl border border-[rgba(255,255,255,0.08)] bg-white/[0.03] p-2 shadow-2xl backdrop-blur-md"
        >
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-[#0042FF]/10 to-[#00A3FF]/10 opacity-30 blur-md" />
          <div className="relative rounded-xl bg-[#0B0F19]/90 p-4 sm:p-6 lg:p-8">
            {/* Simulation Header */}
            <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500" />
                <span className="h-3 w-3 rounded-full bg-amber-500" />
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-[#0042FF]/10 border border-[#0042FF]/20 px-3 py-1 rounded-md text-xs text-blue-400">
                <Cpu className="h-3 w-3 text-blue-400" />
                <span>Generador de Caminos Inteligentes v1.4</span>
              </div>
            </div>

            {/* Simulated Roadmap Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* Connector Lines (Decorative SVG) */}
              <div className="hidden md:block absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                <svg className="w-full h-full text-gray-800 opacity-60" fill="none">
                  <path d="M 160,50 L 340,50 M 500,50 L 680,50 M 160,50 Q 250,120 340,120" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
              </div>

              {/* Node 1 */}
              <div className="relative z-10 flex flex-col items-center p-4 rounded-xl border border-[rgba(255,255,255,0.08)] bg-white/[0.02]">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
                  <Network className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-semibold text-white">1. Tu Carrera</h4>
                <p className="text-xs text-gray-400 text-center mt-1">Ej. Administración o Ingeniería Industrial</p>
                <div className="mt-3 flex flex-wrap justify-center gap-1">
                  <span className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded">Excel</span>
                  <span className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded">Gestión de Proyectos</span>
                </div>
              </div>

              {/* Node 2 */}
              <div className="relative z-10 flex flex-col items-center p-4 rounded-xl border border-[#0042FF]/30 bg-[#0042FF]/5 shadow-lg shadow-[#0042FF]/5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0042FF] text-white shadow-md shadow-[#0042FF]/20 mb-3 animate-pulse">
                  <Compass className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-semibold text-blue-300">2. Áreas de Especialización</h4>
                <p className="text-xs text-gray-300 text-center mt-1">Nodos ramificados: Finanzas, Logística, Marketing...</p>
                <div className="mt-3 flex flex-wrap justify-center gap-1">
                  <span className="text-[10px] bg-[#0042FF]/10 text-blue-300 border border-[#0042FF]/20 px-2 py-0.5 rounded">Subáreas</span>
                  <span className="text-[10px] bg-purple-400/10 text-purple-300 border border-purple-400/20 px-2 py-0.5 rounded">Demanda S/</span>
                </div>
              </div>

              {/* Node 3 */}
              <div className="relative z-10 flex flex-col items-center p-4 rounded-xl border border-[rgba(255,255,255,0.08)] bg-white/[0.02]">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-3">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-semibold text-white">3. Línea de Crecimiento</h4>
                <p className="text-xs text-gray-400 text-center mt-1">Practicante → Analista → Manager</p>
                <div className="mt-3 flex flex-wrap justify-center gap-1">
                  <span className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded">Rangos Salariales</span>
                  <span className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded">Habilidades</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
