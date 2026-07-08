import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Sparkles, UserCheck, Award, Layers, ShieldCheck, Zap, DollarSign } from 'lucide-react';
import { comparisonCards } from '../data/mockRoadmaps';
import { ComparisonCardData } from '../types';

export default function ComparisonCards() {
  const [filter, setFilter] = useState<'all' | 'high_demand' | 'creative' | 'data' | 'social'>('all');

  const filteredCards = comparisonCards.filter((card) => {
    if (filter === 'all') return true;
    if (filter === 'high_demand') return card.demand === 'Alta';
    if (filter === 'creative') return card.creativity >= 4;
    if (filter === 'data') return card.dataUsage >= 4;
    if (filter === 'social') return card.socialContact >= 4;
    return true;
  });

  // Helper to render indicator circles
  const renderMeter = (value: number, activeColorClass: string) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((idx) => (
          <div
            key={idx}
            className={`h-2.5 w-2.5 rounded-full ${
              idx <= value ? activeColorClass : 'bg-[#111827] border border-[rgba(255,255,255,0.08)]'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="comparador" className="bg-[#05070A] py-16 sm:py-24 border-t border-[rgba(255,255,255,0.08)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-950/40 border border-indigo-800/30 px-3 py-1 rounded-full inline-flex items-center gap-1">
            <Zap className="h-3 w-3 text-indigo-400 animate-pulse" /> Comparador Profesional
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl mt-3">
            Compara las principales áreas profesionales
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base">
            Descubre los niveles de demanda, exigencia técnica, habilidades necesarias y salarios iniciales estimados de cada especialidad empresarial.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
              filter === 'all'
                ? 'bg-gradient-to-br from-[#6366F1] to-[#A855F7] text-white shadow-md shadow-indigo-500/10'
                : 'bg-[#111827] text-gray-400 border border-[rgba(255,255,255,0.08)] hover:border-gray-700 hover:text-white'
            }`}
          >
            Todas las áreas
          </button>
          <button
            onClick={() => setFilter('high_demand')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
              filter === 'high_demand'
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/10'
                : 'bg-[#111827] text-gray-400 border border-[rgba(255,255,255,0.08)] hover:border-gray-700 hover:text-white'
            }`}
          >
            🔥 Alta Demanda
          </button>
          <button
            onClick={() => setFilter('data')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
              filter === 'data'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/10'
                : 'bg-[#111827] text-gray-400 border border-[rgba(255,255,255,0.08)] hover:border-gray-700 hover:text-white'
            }`}
          >
            📊 Uso de Datos (4+)
          </button>
          <button
            onClick={() => setFilter('creative')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
              filter === 'creative'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/10'
                : 'bg-[#111827] text-gray-400 border border-[rgba(255,255,255,0.08)] hover:border-gray-700 hover:text-white'
            }`}
          >
            💡 Alta Creatividad
          </button>
          <button
            onClick={() => setFilter('social')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
              filter === 'social'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10 font-bold'
                : 'bg-[#111827] text-gray-400 border border-[rgba(255,255,255,0.08)] hover:border-gray-700 hover:text-white'
            }`}
          >
            🤝 Contacto Humano
          </button>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ 
                y: -6,
                scale: 1.015,
                borderColor: "rgba(99, 102, 241, 0.4)",
                boxShadow: "0 20px 40px -15px rgba(99, 102, 241, 0.25)"
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              key={card.areaName}
              className="glass p-6 flex flex-col justify-between transition-colors duration-300 hover:bg-[#111827]/30 group relative overflow-hidden"
            >
              {/* Card top banner decoration */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6366F1] to-[#A855F7] opacity-60 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header info */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {card.areaName}
                    </h3>
                    <span className="text-[10px] text-gray-500 font-mono block">
                      Apto para: {card.careerName}
                    </span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                    card.demand === 'Alta' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    Demanda {card.demand}
                  </span>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  {card.description}
                </p>

                {/* Meter Gauges */}
                <div className="space-y-3 border-t border-b border-[rgba(255,255,255,0.08)] py-4 mb-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">📊 Uso de Datos</span>
                    {renderMeter(card.dataUsage, 'bg-[#6366F1]')}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">💡 Creatividad</span>
                    {renderMeter(card.creativity, 'bg-purple-400')}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">🤝 Contacto Humano</span>
                    {renderMeter(card.socialContact, 'bg-amber-400')}
                  </div>
                </div>

                {/* Salary Range */}
                <div className="mb-5 bg-[#05070A]/50 p-3 rounded-xl border border-[rgba(255,255,255,0.06)]">
                  <span className="text-[9px] uppercase tracking-wider text-gray-500 block">Rango Salarial Promedio (S/.)</span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                    <DollarSign className="h-4 w-4 text-emerald-400 shrink-0" />
                    {card.salaryRange}
                  </span>
                </div>

                {/* Skills Section */}
                <div className="mb-5">
                  <span className="text-[10px] font-bold text-white block mb-2 uppercase tracking-wide">Habilidades Clave</span>
                  <div className="flex flex-wrap gap-1.5">
                    {card.keySkills.map((skill) => (
                      <span key={skill} className="text-[10px] bg-[#111827] text-gray-300 border border-[rgba(255,255,255,0.08)] px-2 py-0.5 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommended Entry Roles */}
              <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] mt-auto">
                <span className="text-[10px] font-bold text-indigo-400 block mb-2 uppercase tracking-wide">Primeros Puestos Sugeridos</span>
                <div className="flex flex-wrap gap-1">
                  {card.recommendedRoles.map((role) => (
                    <span key={role} className="text-[10px] bg-indigo-950/30 text-indigo-300 border border-indigo-800/20 px-2 py-0.5 rounded font-medium">
                      {role}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
