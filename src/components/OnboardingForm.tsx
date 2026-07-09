import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, GraduationCap, Briefcase, ArrowRight, ArrowLeft, Sparkles, Building2 } from 'lucide-react';
import { OnboardingData } from '../types';
import CornerCuts from './CornerCuts';

interface OnboardingFormProps {
  onSubmit: (data: OnboardingData) => void;
  onCancel: () => void;
}

export default function OnboardingForm({ onSubmit, onCancel }: OnboardingFormProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedIndustryKey, setSelectedIndustryKey] = useState<string>('tecnologia');
  const [customIndustryText, setCustomIndustryText] = useState<string>('');
  
  const [industriesList, setIndustriesList] = useState<Array<{ id: string; label: string; desc: string }>>([]);
  const [loadingIndustries, setLoadingIndustries] = useState<boolean>(false);
  const [industryFetchError, setIndustryFetchError] = useState<string | null>(null);
  const [fetchedCareer, setFetchedCareer] = useState<string>('');

  const [formData, setFormData] = useState<OnboardingData>({
    fullName: '',
    email: '',
    career: '',
    stage: 'estudiante',
    areaOfInterest: 'General',
    objective: 'Desarrollo Profesional',
    industry: 'Tecnología',
    currentPosition: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Por favor ingresa tu nombre completo';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Por favor ingresa tu correo electrónico';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.career.trim()) {
      newErrors.career = 'Por favor ingresa el nombre de tu carrera profesional';
    }
    if (['practicante_pre', 'practicante_pro', 'junior'].includes(formData.stage) && (!formData.currentPosition || !formData.currentPosition.trim())) {
      newErrors.currentPosition = 'Por favor ingresa tu puesto actual, anterior o al que deseas apuntar';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (selectedIndustryKey === 'otra' && !customIndustryText.trim()) {
      newErrors.industry = 'Por favor escribe el nombre de la industria';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchDynamicIndustries = async (careerName: string) => {
    const trimmed = careerName.trim();
    if (fetchedCareer === trimmed && industriesList.length > 0) {
      return; // Already loaded
    }
    setLoadingIndustries(true);
    setIndustryFetchError(null);
    try {
      const res = await fetch('/api/industries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          career: trimmed,
          currentPosition: formData.currentPosition || '',
          stage: formData.stage
        }),
      });
      if (!res.ok) {
        let errMsg = 'Error al conectar con la IA';
        try {
          const errData = await res.json();
          if (errData && errData.error) {
            errMsg = `Error de la IA: ${errData.error}`;
          }
        } catch (_) {}
        throw new Error(errMsg);
      }
      const data = await res.json();
      if (data.industries && Array.isArray(data.industries)) {
        setIndustriesList(data.industries);
        setFetchedCareer(trimmed);
        if (data.industries.length > 0) {
          setSelectedIndustryKey(data.industries[0].id);
        }
      } else {
        throw new Error('Formato de respuesta incorrecto');
      }
    } catch (err: any) {
      console.error('Error fetching industries:', err);
      setIndustryFetchError(err.message || 'No pudimos generar industrias con IA. Usando una lista general de respaldo.');
      const defaultList = [
        { id: 'tecnologia', label: 'Tecnología y SaaS', desc: 'Startups, desarrollo de software, redes, hardware, ERPs, apps y productos digitales.' },
        { id: 'consumo_masivo', label: 'Consumo Masivo y Retail', desc: 'Supermercados, distribución, retail y marcas de consumo masivo.' },
        { id: 'banca', label: 'Banca y Seguros', desc: 'Bancos, fondos, seguros y corporativos financieros.' },
        { id: 'mineria', label: 'Minería, Energía y Petróleo', desc: 'Campamentos, producción, logística pesada, SST y recursos.' },
        { id: 'consultoria', label: 'Consultoría y Servicios', desc: 'Asesoramiento legal, auditoría, PMO y consultoría estratégica.' },
        { id: 'agro', label: 'Agroexportación y Alimentaria', desc: 'Comercio exterior, fábricas de alimentos, agroempresas y aduanas.' },
        { id: 'otra', label: 'Otra industria...', desc: 'Ingresa un sector o rubro específico personalizado.' }
      ];
      setIndustriesList(defaultList);
      setSelectedIndustryKey('tecnologia');
    } finally {
      setLoadingIndustries(false);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    } else if (step === 2) {
      if (validateStep2()) {
        setStep(3);
        fetchDynamicIndustries(formData.career);
      }
    } else if (step === 3) {
      if (validateStep3()) {
        // Resolve final industry name
        let finalIndustry = 'Tecnología';
        const matchingIndustryObj = industriesList.find(ind => ind.id === selectedIndustryKey);
        if (selectedIndustryKey === 'otra') {
          finalIndustry = customIndustryText.trim();
        } else if (matchingIndustryObj) {
          finalIndustry = matchingIndustryObj.label;
        }

        const finalData = {
          ...formData,
          industry: finalIndustry
        };
        onSubmit(finalData);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    } else {
      onCancel();
    }
  };

  const stages = [
    { id: 'estudiante', label: 'Estudiante', desc: 'Ciclos iniciales o intermedios' },
    { id: 'practicante_pre', label: 'Practicante Pre', desc: 'Últimos ciclos (7° a 10°)' },
    { id: 'practicante_pro', label: 'Practicante Pro (Egresado)', desc: 'Prácticas profesionales post-grado' },
    { id: 'junior', label: 'Junior / Analyst / Specialist', desc: 'Trabajo formal de tiempo completo' }
  ];

  const progressPercentage = (step / 3) * 100;

  return (
    <div id="onboarding-card" className="mx-auto max-w-2xl bg-[#FFFFFF] border-2 border-brand-charcoal p-6 sm:p-8 shadow-[6px_6px_0px_rgba(51,49,51,1)] relative overflow-hidden">
      <CornerCuts size={16} color="text-brand-bg" />

      {/* Header Info */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-brand-charcoal/60">[ PASO {step} DE 3 ]</span>
          <h3 className="text-lg font-black uppercase tracking-tight text-brand-charcoal mt-1">
            {step === 1 && 'Datos de Registro'}
            {step === 2 && 'Carrera y Nivel'}
            {step === 3 && 'Rubro e Industria'}
          </h3>
        </div>
        <div className="flex items-center gap-1.5 bg-brand-light-blue border-2 border-brand-charcoal px-3 py-1 font-mono text-[9px] font-bold text-brand-charcoal uppercase">
          <Sparkles className="h-3.5 w-3.5 text-brand-blue" />
          <span>IA Copilot</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#FFFFFF] border-2 border-brand-charcoal h-3 mb-8 overflow-hidden relative">
        <motion.div 
          className="bg-brand-blue h-full border-r border-brand-charcoal"
          initial={{ width: '33%' }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Form Steps */}
      <div className="min-h-[260px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <p className="text-xs text-brand-charcoal/70 font-medium">
                Antes de generar tu roadmap dinámico, ingresa tus datos básicos para poder personalizar la experiencia y guardar tu progreso en la beta.
              </p>

              <div>
                <label className="block text-[10px] font-black font-mono text-brand-charcoal uppercase tracking-wider mb-2">Nombre completo</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <User className="h-4.5 w-4.5 text-brand-charcoal/60" />
                  </div>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="block w-full border-2 border-brand-charcoal bg-white p-3.5 pl-10 text-xs font-mono font-bold text-brand-charcoal placeholder-brand-charcoal/40 focus:border-brand-blue focus:outline-none"
                    placeholder="Marcelo Ramírez"
                    required
                  />
                </div>
                {errors.fullName && <p className="text-red-500 font-mono text-[10px] font-bold mt-1.5">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-black font-mono text-brand-charcoal uppercase tracking-wider mb-2">Correo electrónico</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <Mail className="h-4.5 w-4.5 text-brand-charcoal/60" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="block w-full border-2 border-brand-charcoal bg-white p-3.5 pl-10 text-xs font-mono font-bold text-brand-charcoal placeholder-brand-charcoal/40 focus:border-brand-blue focus:outline-none"
                    placeholder="ejemplo@correo.com"
                    required
                  />
                </div>
                {errors.email && <p className="text-red-500 font-mono text-[10px] font-bold mt-1.5">{errors.email}</p>}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Career input */}
              <div>
                <label className="block text-[10px] font-black font-mono text-brand-charcoal uppercase tracking-wider mb-2">¿Qué carrera estudias o estudiaste?</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <GraduationCap className="h-4.5 w-4.5 text-brand-charcoal/60" />
                  </div>
                  <input
                    type="text"
                    value={formData.career}
                    onChange={(e) => setFormData(prev => ({ ...prev, career: e.target.value }))}
                    className="block w-full border-2 border-brand-charcoal bg-white p-3.5 pl-10 text-xs font-mono font-bold text-brand-charcoal placeholder-brand-charcoal/40 focus:border-brand-blue focus:outline-none"
                    placeholder="Ingeniería de Sistemas, Administración..."
                    required
                    autoFocus
                  />
                </div>
                <p className="text-[9px] font-mono text-brand-charcoal/50 mt-1">Escribe tu carrera profesional para que la IA estructure las habilidades específicas de tu sector.</p>
                {errors.career && <p className="text-red-500 font-mono text-[10px] font-bold mt-1.5">{errors.career}</p>}
              </div>

              {/* Stage selector */}
              <div>
                <label className="block text-[10px] font-black font-mono text-brand-charcoal uppercase tracking-wider mb-3">Etapa o ciclo actual (Punto de partida)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {stages.map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, stage: st.id }))}
                      className={`flex flex-col p-3 border-2 text-left transition-all duration-150 cursor-pointer relative overflow-hidden ${
                        formData.stage === st.id
                          ? 'border-brand-blue bg-brand-light-blue text-brand-charcoal shadow-[3px_3px_0px_rgba(51,49,51,1)]'
                          : 'border-brand-charcoal/30 bg-white text-brand-charcoal/80 hover:border-brand-charcoal hover:text-brand-charcoal'
                      }`}
                    >
                      <CornerCuts size={8} color={formData.stage === st.id ? "text-brand-light-blue" : "text-white"} />
                      <div className="flex items-center gap-2">
                        <Briefcase className={`h-4 w-4 ${formData.stage === st.id ? 'text-brand-blue' : 'text-brand-charcoal/50'}`} />
                        <span className="text-xs sm:text-sm font-black uppercase font-mono">{st.label}</span>
                      </div>
                      <span className="text-[10px] text-brand-charcoal/60 mt-1 leading-normal">{st.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Conditional position input */}
              {['practicante_pre', 'practicante_pro', 'junior'].includes(formData.stage) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2 pt-2"
                >
                  <label className="block text-[10px] font-black font-mono text-brand-charcoal uppercase tracking-wider">
                    ¿Cuál es tu puesto actual, anterior o al que deseas apuntar?
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                      <Briefcase className="h-4.5 w-4.5 text-brand-charcoal/60" />
                    </div>
                    <input
                      type="text"
                      value={formData.currentPosition || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, currentPosition: e.target.value }))}
                      className="block w-full border-2 border-brand-charcoal bg-white p-3.5 pl-10 text-xs font-mono font-bold text-brand-charcoal placeholder-brand-charcoal/40 focus:border-brand-blue focus:outline-none"
                      placeholder="Ej. Practicante de FP&A, Analista Junior..."
                      required
                    />
                  </div>
                  <p className="text-[9px] font-mono text-brand-charcoal/50 mt-1">
                    Ingresa tu puesto para mapear alternativas, transiciones de carrera y puestos siguientes.
                  </p>
                  {errors.currentPosition && <p className="text-red-500 font-mono text-[10px] font-bold mt-1.5">{errors.currentPosition}</p>}
                </motion.div>
              )}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <p className="text-xs text-brand-charcoal/70 font-medium">
                Selecciona la industria en la que deseas trabajar. La especialización, proyectos de CV, herramientas y requisitos del roadmap se adaptarán según el rubro.
              </p>

              {loadingIndustries ? (
                <div className="space-y-4 py-4 text-center">
                  <div className="flex justify-center items-center gap-3">
                    <Sparkles className="h-5 w-5 text-brand-blue animate-spin" />
                    <span className="text-xs font-black uppercase font-mono text-brand-charcoal">IA estructurando industrias para {formData.career}...</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
                    {[1, 2, 3, 4].map((idx) => (
                      <div key={idx} className="animate-pulse flex flex-col p-4 border-2 border-brand-charcoal bg-[#FFFFFF] space-y-2 relative">
                        <CornerCuts size={8} color="text-brand-bg" />
                        <div className="h-3.5 bg-brand-light-blue rounded w-2/3 border border-brand-charcoal/10" />
                        <div className="h-2.5 bg-brand-light-blue rounded w-full border border-brand-charcoal/10" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {industryFetchError && (
                    <div className="bg-amber-500/10 border-2 border-brand-charcoal text-amber-800 text-xs p-3 font-mono font-bold">
                      {industryFetchError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {industriesList.map((ind) => (
                      <button
                        key={ind.id}
                        type="button"
                        onClick={() => {
                          setSelectedIndustryKey(ind.id);
                          if (ind.id !== 'otra') {
                            setErrors(prev => {
                              const copy = { ...prev };
                              delete copy.industry;
                              return copy;
                            });
                          }
                        }}
                        className={`flex flex-col p-3 border-2 text-left transition-all duration-150 cursor-pointer relative overflow-hidden ${
                          selectedIndustryKey === ind.id
                            ? 'border-brand-blue bg-brand-light-blue text-brand-charcoal shadow-[3px_3px_0px_rgba(51,49,51,1)]'
                            : 'border-brand-charcoal/30 bg-white text-brand-charcoal/80 hover:border-brand-charcoal hover:text-brand-charcoal'
                        }`}
                      >
                        <CornerCuts size={8} color={selectedIndustryKey === ind.id ? "text-brand-light-blue" : "text-white"} />
                        <div className="flex items-center gap-2">
                          <Building2 className={`h-4 w-4 ${selectedIndustryKey === ind.id ? 'text-brand-blue' : 'text-brand-charcoal/50'}`} />
                          <span className="text-xs sm:text-sm font-black uppercase font-mono">{ind.label}</span>
                        </div>
                        <span className="text-[10px] text-brand-charcoal/60 mt-1 leading-normal">{ind.desc}</span>
                      </button>
                    ))}
                  </div>

                  {selectedIndustryKey === 'otra' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3"
                    >
                      <label className="block text-[10px] font-black font-mono text-brand-charcoal uppercase tracking-wider mb-2">Escribe tu industria personalizada</label>
                      <input
                        type="text"
                        value={customIndustryText}
                        onChange={(e) => setCustomIndustryText(e.target.value)}
                        className="block w-full border-2 border-brand-charcoal bg-white p-3.5 text-xs font-mono font-bold text-brand-charcoal placeholder-brand-charcoal/40 focus:border-brand-blue focus:outline-none"
                        placeholder="Ej. Minería y Construcción, Sector Público..."
                        required
                        autoFocus
                      />
                      {errors.industry && <p className="text-red-500 font-mono text-[10px] font-bold mt-1.5">{errors.industry}</p>}
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="mt-8 pt-4 border-t-2 border-brand-charcoal flex justify-between items-center">
        <button
          type="button"
          onClick={handleBack}
          className="brutalist-button brutalist-button-secondary text-xs py-2 px-4 flex items-center gap-1.5 uppercase"
        >
          <CornerCuts size={6} color="text-white" />
          <ArrowLeft className="h-3.5 w-3.5" />
          Atrás
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="brutalist-button brutalist-button-primary text-xs py-2.5 px-5 flex items-center gap-1.5 uppercase"
        >
          <CornerCuts size={6} color="text-brand-blue" />
          {step === 3 ? 'Generar Roadmap' : 'Siguiente'}
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
