import React from 'react';
import { Eye, Scale, Cpu, ShieldCheck, MapPin, Target, Sparkles, TrendingUp, Layers } from 'lucide-react';

export default function ValueProps() {
  const props = [
    {
      icon: <Layers className="h-6 w-6 text-[#0042FF]" />,
      title: "Explora Áreas Reales",
      desc: "Descubre qué ramas de especialización existen dentro de tu carrera que a veces no enseñan en la universidad, desde Growth Marketing hasta SCM en planta."
    },
    {
      icon: <Scale className="h-6 w-6 text-sky-400" />,
      title: "Compara Caminos Alternativos",
      desc: "Compara métricas objetivas de demanda, uso de datos, creatividad y contacto social para tomar una decisión informada y alineada con tu personalidad."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />,
      title: "Identifica Habilidades Clave",
      desc: "Entiende exactamente qué herramientas técnicas (Excel, Power BI, SQL, Scrum) solicita el mercado real de reclutamiento laboral hoy en día."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-amber-400" />,
      title: "Visualiza tu Línea de Crecimiento",
      desc: "Observa los salarios estimados y los años de experiencia requeridos desde tus primeras prácticas pre-profesionales hasta un puesto de Gerente General."
    },
    {
      icon: <Cpu className="h-6 w-6 text-[#0042FF]" />,
      title: "Roadmap Dinámico con IA",
      desc: "Genera al instante un roadmap estructurado según tu etapa académica actual (estudiante, egresado, junior) y objetivos específicos del año."
    }
  ];

  return (
    <section id="propuesta" className="bg-[#05070A] py-16 sm:py-24 border-t border-[rgba(255,255,255,0.08)] relative overflow-hidden">
      {/* Decorative Blur BG */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[400px] w-[400px] rounded-full bg-[#0042FF]/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="lg:text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-[#0042FF]/10 border border-[#0042FF]/20 px-3 py-1 rounded-full inline-flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-[#0042FF]" /> El Enfoque Journey
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl mt-3">
            No es un catálogo de cursos. Es tu brújula profesional.
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base leading-relaxed">
            Las universidades te dan la teoría, y las plataformas de internet te venden cursos aislados. Journey integra todo en una ruta visual dinámica que te ayuda a construir un perfil de alto impacto.
          </p>
        </div>

        {/* Features Bento/Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Main big value card */}
          <div className="md:col-span-2 lg:col-span-1 glass p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-[#0042FF]/10 blur-3xl" />
            <div>
              <span className="text-xs font-bold uppercase text-[#0042FF] tracking-widest">Diferenciador Clave</span>
              <h3 className="text-2xl font-black text-white mt-2 leading-tight">
                Orientación laboral basada en el mercado real
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-4 leading-relaxed">
                Mapeamos salarios, subáreas y puestos basándonos en convocatorias reales de reclutamiento corporativo. Evitamos el "ruido de cursos" y te damos el destino exacto junto con el vehículo necesario para llegar.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2">
              <span className="text-2xl font-bold text-white">100%</span>
              <span className="text-[10px] text-gray-500 uppercase leading-snug">Personalizado por tu perfil e interés académico</span>
            </div>
          </div>

          {/* Individual Feature Cards */}
          {props.map((prop, idx) => (
            <div
              key={idx}
              className="glass glass-hover p-6 sm:p-8 hover:border-[rgba(255,255,255,0.14)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#111827] border border-[rgba(255,255,255,0.08)] mb-6 shadow-md">
                {prop.icon}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                {prop.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                {prop.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
