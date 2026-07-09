import React from 'react';
import { Eye, Scale, Cpu, ShieldCheck, MapPin, Target, Sparkles, TrendingUp, Layers } from 'lucide-react';
import CornerCuts from './CornerCuts';

export default function ValueProps() {
  const props = [
    {
      icon: <Layers className="h-6 w-6 text-brand-blue" />,
      title: "Explora Áreas Reales",
      desc: "Descubre qué ramas de especialización existen dentro de tu carrera que a veces no enseñan en la universidad, desde Growth Marketing hasta SCM en planta."
    },
    {
      icon: <Scale className="h-6 w-6 text-brand-blue" />,
      title: "Compara Caminos",
      desc: "Compara métricas objetivas de demanda, uso de datos, creatividad y contacto social para tomar una decisión informada y alineada con tu personalidad."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-brand-blue" />,
      title: "Identifica Habilidades",
      desc: "Entiende exactamente qué herramientas técnicas (Excel, Power BI, SQL, Scrum) solicita el mercado real de reclutamiento laboral hoy en día."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-brand-blue" />,
      title: "Visualiza el Crecimiento",
      desc: "Observa los salarios estimados y los años de experiencia requeridos desde tus primeras prácticas pre-profesionales hasta un puesto de Gerencia."
    },
    {
      icon: <Cpu className="h-6 w-6 text-brand-blue" />,
      title: "Roadmap Dinámico",
      desc: "Genera al instante un roadmap estructurado según tu etapa académica actual (estudiante, egresado, junior) y objetivos específicos del año."
    }
  ];

  return (
    <section 
      id="propuesta" 
      className="bg-brand-bg py-16 sm:py-24 border-t-2 border-brand-charcoal relative overflow-hidden"
      data-scroll-section
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="lg:text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-charcoal bg-[#FFFFFF] border-2 border-brand-charcoal px-3 py-1 shadow-[2px_2px_0px_rgba(51,49,51,1)] inline-flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-brand-blue" />
            <span>[ EL ENFOQUE JOURNEY ]</span>
          </span>
          <h2 className="text-3xl font-black uppercase text-brand-charcoal tracking-tight sm:text-4xl mt-4">
            no es un catálogo de cursos. es tu brújula profesional.
          </h2>
          <p className="mt-3 text-brand-charcoal/80 text-xs sm:text-sm leading-relaxed font-medium">
            Las universidades te dan la teoría, y las plataformas de internet te venden cursos aislados. Journey integra todo en una ruta visual dinámica que te ayuda a construir un perfil de alto impacto.
          </p>
        </div>

        {/* Features Bento/Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Main big value card (High Contrast Blue) */}
          <div className="md:col-span-2 lg:col-span-1 border-2 border-brand-charcoal bg-brand-blue text-white p-8 flex flex-col justify-between relative overflow-hidden shadow-[4px_4px_0px_rgba(51,49,51,1)]">
            <CornerCuts size={16} color="text-brand-bg" />
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-white text-brand-charcoal border border-brand-charcoal px-2 py-0.5 inline-block">
                DIFERENCIADOR CLAVE
              </span>
              <h3 className="text-2xl font-black uppercase mt-4 leading-[1.1] font-sans">
                Orientación laboral basada en el mercado real
              </h3>
              <p className="text-xs text-brand-light-blue mt-4 leading-relaxed font-medium">
                Mapeamos salarios, subáreas y puestos basándonos en convocatorias reales de reclutamiento corporativo. Evitamos el "ruido de cursos" y te damos el destino exacto junto con el vehículo necesario para llegar.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-3 pt-4 border-t border-white/20">
              <span className="text-3xl font-black font-mono">100%</span>
              <span className="text-[9px] font-mono font-bold uppercase text-brand-light-blue/80 leading-snug">
                Personalizado por tu perfil e interés académico
              </span>
            </div>
          </div>

          {/* Individual Feature Cards */}
          {props.map((prop, idx) => (
            <div
              key={idx}
              className="relative border-2 border-brand-charcoal bg-white p-6 sm:p-8 shadow-[4px_4px_0px_rgba(51,49,51,1)] hover:shadow-[6px_6px_0px_rgba(0,66,255,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 overflow-hidden"
            >
              <CornerCuts size={16} color="text-brand-bg" />
              <div className="flex h-12 w-12 items-center justify-center border-2 border-brand-charcoal bg-brand-light-blue mb-6">
                {prop.icon}
              </div>
              <h3 className="text-base sm:text-lg font-black uppercase text-brand-charcoal font-mono mb-2">
                {prop.title}
              </h3>
              <p className="text-xs text-brand-charcoal/70 leading-relaxed font-medium">
                {prop.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
