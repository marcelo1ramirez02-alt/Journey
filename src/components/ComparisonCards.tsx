import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Sparkles, UserCheck, Award, Layers, ShieldCheck, Zap, DollarSign } from 'lucide-react';
import { comparisonCards } from '../data/mockRoadmaps';
import { ComparisonCardData } from '../types';
import CornerCuts from './CornerCuts';

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

  // Helper to render rectangular brutalist indicators
  const renderMeter = (value: number, activeColorClass: string) => {
    return (
      <div className="flex items-center gap-1 select-none">
        {[1, 2, 3, 4, 5].map((idx) => (
          <div
            key={idx}
            className={`h-3 w-5 border border-brand-charcoal transition-colors duration-150 ${
              idx <= value ? activeColorClass : 'bg-white'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section 
      id="comparador" 
      className="bg-brand-bg py-16 sm:py-24 border-t-2 border-brand-charcoal"
      data-scroll-section
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-charcoal bg-[#FFFFFF] border-2 border-brand-charcoal px-3 py-1 shadow-[2px_2px_0px_rgba(51,49,51,1)] inline-flex items-center gap-1.5">
            <Zap className="h-3 w-3 text-brand-blue" />
            <span>[ COMPARADOR DE ÁREAS PROFESIONALES ]</span>
          </span>
          <h2 className="text-3xl font-black uppercase text-brand-charcoal tracking-tight sm:text-4xl mt-4">
            compara las principales especialidades
          </h2>
          <p className="mt-3 text-brand-charcoal/80 text-xs sm:text-sm font-medium">
            Descubre los niveles de demanda, exigencia técnica, habilidades necesarias y salarios iniciales estimados de cada especialidad empresarial.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-12 select-none">
          <button
            onClick={() => setFilter('all')}
            className={`brutalist-button text-xs py-2 px-4 shadow-[2px_2px_0px_rgba(51,49,51,1)] ${
              filter === 'all'
                ? 'bg-brand-blue text-white'
                : 'bg-white text-brand-charcoal'
            }`}
          >
            <CornerCuts size={6} color="text-brand-bg" />
            Todas las áreas
          </button>
          <button
            onClick={() => setFilter('high_demand')}
            className={`brutalist-button text-xs py-2 px-4 shadow-[2px_2px_0px_rgba(51,49,51,1)] ${
              filter === 'high_demand'
                ? 'bg-emerald-500 text-white'
                : 'bg-white text-brand-charcoal'
            }`}
          >
            <CornerCuts size={6} color="text-brand-bg" />
            🔥 Alta Demanda
          </button>
          <button
            onClick={() => setFilter('data')}
            className={`brutalist-button text-xs py-2 px-4 shadow-[2px_2px_0px_rgba(51,49,51,1)] ${
              filter === 'data'
                ? 'bg-[#6366F1] text-white'
                : 'bg-white text-brand-charcoal'
            }`}
          >
            <CornerCuts size={6} color="text-brand-bg" />
            📊 Uso de Datos (4+)
          </button>
          <button
            onClick={() => setFilter('creative')}
            className={`brutalist-button text-xs py-2 px-4 shadow-[2px_2px_0px_rgba(51,49,51,1)] ${
              filter === 'creative'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-brand-charcoal'
            }`}
          >
            <CornerCuts size={6} color="text-brand-bg" />
            💡 Alta Creatividad
          </button>
          <button
            onClick={() => setFilter('social')}
            className={`brutalist-button text-xs py-2 px-4 shadow-[2px_2px_0px_rgba(51,49,51,1)] ${
              filter === 'social'
                ? 'bg-amber-500 text-brand-charcoal'
                : 'bg-white text-brand-charcoal'
            }`}
          >
            <CornerCuts size={6} color="text-brand-bg" />
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
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              key={card.areaName}
              className="relative border-2 border-brand-charcoal bg-white p-6 flex flex-col justify-between shadow-[4px_4px_0px_rgba(51,49,51,1)] hover:shadow-[6px_6px_0px_rgba(0,66,255,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 group overflow-hidden"
            >
              <CornerCuts size={12} color="text-brand-bg" />

              <div>
                {/* Header info */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-base font-black uppercase text-brand-charcoal group-hover:text-brand-blue transition-colors">
                      {card.areaName}
                    </h3>
                    <span className="text-[9px] text-brand-charcoal/50 font-mono block mt-0.5">
                      Apto para: {card.careerName}
                    </span>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 border-2 font-mono font-bold uppercase shrink-0 ${
                    card.demand === 'Alta' 
                      ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30' 
                      : 'bg-amber-500/10 text-amber-600 border-amber-500/30'
                  }`}>
                    {card.demand === 'Alta' ? '[ Alta ]' : '[ Media ]'}
                  </span>
                </div>

                <p className="text-xs text-brand-charcoal/70 leading-relaxed mb-6 font-medium">
                  {card.description}
                </p>

                {/* Meter Gauges */}
                <div className="space-y-3 border-t-2 border-b-2 border-brand-charcoal/10 py-4 mb-6">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-brand-charcoal">
                    <span>📊 USO DE DATOS</span>
                    {renderMeter(card.dataUsage, 'bg-brand-blue')}
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-brand-charcoal">
                    <span>💡 CREATIVIDAD</span>
                    {renderMeter(card.creativity, 'bg-purple-500')}
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-brand-charcoal">
                    <span>🤝 CONTACTO HUMANO</span>
                    {renderMeter(card.socialContact, 'bg-amber-500')}
                  </div>
                </div>

                {/* Salary Range */}
                <div className="mb-5 bg-brand-bg p-3 border-2 border-brand-charcoal">
                  <span className="text-[9px] uppercase tracking-wider text-brand-charcoal/50 font-mono font-black block">RANGO SALARIAL ESTIMADO</span>
                  <span className="text-xs sm:text-sm font-mono font-black text-brand-charcoal flex items-center gap-0.5 mt-0.5">
                    <DollarSign className="h-4 w-4 text-brand-blue shrink-0" />
                    {card.salaryRange}
                  </span>
                </div>

                {/* Skills Section */}
                <div className="mb-5">
                  <span className="text-[9px] font-black text-brand-charcoal block mb-2 uppercase tracking-wide font-mono">[ Habilidades Clave ]</span>
                  <div className="flex flex-wrap gap-1.5">
                    {card.keySkills.map((skill) => (
                      <span key={skill} className="text-[9px] font-mono font-bold bg-white text-brand-charcoal border border-brand-charcoal px-2 py-0.5">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommended Entry Roles */}
              <div className="pt-4 border-t-2 border-brand-charcoal/10 mt-auto">
                <span className="text-[9px] font-black text-brand-blue block mb-2 uppercase tracking-wide font-mono">[ Puestos Sugeridos ]</span>
                <div className="flex flex-wrap gap-1.5">
                  {card.recommendedRoles.map((role) => (
                    <span key={role} className="text-[9px] font-mono font-bold bg-brand-light-blue text-brand-blue border border-brand-blue/30 px-2 py-0.5">
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
