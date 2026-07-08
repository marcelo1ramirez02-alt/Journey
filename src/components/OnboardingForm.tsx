import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, GraduationCap, Briefcase, ArrowRight, ArrowLeft, Sparkles, Building2 } from 'lucide-react';
import { OnboardingData } from '../types';

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
    <div id="onboarding-card" className="mx-auto max-w-2xl glass p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
      {/* Glow backgrounds */}
      <div className="absolute -top-10 -left-10 -z-10 h-32 w-32 rounded-full bg-[#0042FF]/10 blur-2xl" />
      <div className="absolute -bottom-10 -right-10 -z-10 h-32 w-32 rounded-full bg-[#0042FF]/10 blur-2xl" />

      {/* Header Info */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0042FF]">Paso {step} de 3</span>
          <h3 className="text-xl font-bold text-white mt-1">
            {step === 1 && 'Ingreso de Acceso'}
            {step === 2 && 'Tu Carrera y Etapa'}
            {step === 3 && 'Tu Industria de Interés'}
          </h3>
        </div>
        <div className="flex items-center gap-1.5 bg-[#0042FF]/10 px-2.5 py-1 rounded-full border border-[#0042FF]/20">
          <Sparkles className="h-3.5 w-3.5 text-[#0042FF] animate-pulse" />
          <span className="text-[10px] text-blue-300 font-medium">Asistente IA</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#111827] h-1.5 rounded-full mb-8 overflow-hidden">
        <motion.div 
          className="bg-gradient-to-r from-[#0042FF] to-[#00A3FF] h-full rounded-full"
          initial={{ width: '33%' }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Form Steps container with animations */}
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
              <p className="text-sm text-slate-400">
                Antes de generar tu roadmap dinámico, ingresa tus datos básicos para poder personalizar la experiencia y guardar tu progreso en la beta.
              </p>

              <div>
                <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-2">Nombre completo</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="h-4.5 w-4.5 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="block w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-3.5 pl-10 text-sm text-white placeholder-gray-500 focus:border-[#0042FF] focus:outline-none focus:ring-1 focus:ring-[#0042FF] transition-colors"
                    placeholder="Ej. Marcelo Ramírez"
                    required
                  />
                </div>
                {errors.fullName && <p className="text-rose-400 text-xs mt-1.5">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-2">Correo electrónico</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-4.5 w-4.5 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="block w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-3.5 pl-10 text-sm text-white placeholder-gray-500 focus:border-[#0042FF] focus:outline-none focus:ring-1 focus:ring-[#0042FF] transition-colors"
                    placeholder="ejemplo@correo.com"
                    required
                  />
                </div>
                {errors.email && <p className="text-rose-400 text-xs mt-1.5">{errors.email}</p>}
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
              {/* Career text input */}
              <div>
                <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-2">¿Qué carrera estudias o estudiaste?</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <GraduationCap className="h-4.5 w-4.5 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    value={formData.career}
                    onChange={(e) => setFormData(prev => ({ ...prev, career: e.target.value }))}
                    className="block w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-3.5 pl-10 text-sm text-white placeholder-gray-500 focus:border-[#0042FF] focus:outline-none focus:ring-1 focus:ring-[#0042FF] transition-colors"
                    placeholder="Ej. Ingeniería de Sistemas, Administración de Empresas, Psicología..."
                    required
                    autoFocus
                  />
                </div>
                <p className="text-[10px] text-gray-500 mt-1">Escribe tu carrera profesional para que la IA estructure las habilidades específicas de tu sector.</p>
                {errors.career && <p className="text-rose-400 text-xs mt-1.5">{errors.career}</p>}
              </div>

              {/* Stage selector */}
              <div>
                <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-3">Etapa o ciclo actual (Tu punto de partida)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {stages.map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, stage: st.id }))}
                      className={`flex flex-col p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                        formData.stage === st.id
                          ? 'border-[#0042FF] bg-[#0042FF]/10 text-white shadow-md shadow-[#0042FF]/5'
                          : 'border-[rgba(255,255,255,0.08)] bg-[#111827] text-gray-400 hover:border-gray-700 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Briefcase className={`h-4 w-4 ${formData.stage === st.id ? 'text-[#0042FF]' : 'text-gray-500'}`} />
                        <span className="text-xs sm:text-sm font-semibold">{st.label}</span>
                      </div>
                      <span className="text-[10px] text-gray-500 mt-1 leading-normal">{st.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Conditional current/previous/desired position field */}
              {['practicante_pre', 'practicante_pro', 'junior'].includes(formData.stage) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2 pt-2"
                >
                  <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider">
                    ¿Cuál es tu puesto actual, anterior o al que deseas apuntar?
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Briefcase className="h-4.5 w-4.5 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      value={formData.currentPosition || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, currentPosition: e.target.value }))}
                      className="block w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-3.5 pl-10 text-sm text-white placeholder-gray-500 focus:border-[#0042FF] focus:outline-none focus:ring-1 focus:ring-[#0042FF] transition-colors"
                      placeholder="Ej. Growth Marketing Intern, Practicante de FP&A, Analista Junior..."
                      required
                    />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">
                    Ingresa tu puesto para mapear alternativas, transiciones de carrera y puestos siguientes en la industria seleccionada.
                  </p>
                  {errors.currentPosition && <p className="text-rose-400 text-xs mt-1.5">{errors.currentPosition}</p>}
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
              <p className="text-sm text-slate-400">
                Selecciona la industria en la que deseas trabajar. La especialización, proyectos de CV, herramientas y requisitos del roadmap se adaptarán según el rubro, ya que un puesto varía mucho según el sector.
              </p>

              {loadingIndustries ? (
                <div className="space-y-4 py-4 text-center">
                  <div className="flex justify-center items-center gap-3">
                    <Sparkles className="h-5 w-5 text-[#0042FF] animate-spin" />
                    <span className="text-sm text-blue-300 font-medium font-mono">IA analizando tu carrera ({formData.career})...</span>
                  </div>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                    Estructurando sectores de especialización industrial altamente específicos y funcionales para tu perfil.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
                    {[1, 2, 3, 4].map((idx) => (
                      <div key={idx} className="animate-pulse flex flex-col p-4 rounded-xl border border-[rgba(255,255,255,0.04)] bg-[#111827] space-y-2">
                        <div className="h-3.5 bg-gray-800 rounded w-2/3" />
                        <div className="h-2.5 bg-gray-800 rounded w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {industryFetchError && (
                    <div className="bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs p-3 rounded-xl">
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
                        className={`flex flex-col p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                          selectedIndustryKey === ind.id
                            ? 'border-[#0042FF] bg-[#0042FF]/10 text-white shadow-md shadow-[#0042FF]/5'
                            : 'border-[rgba(255,255,255,0.08)] bg-[#111827] text-gray-400 hover:border-gray-700 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Building2 className={`h-4 w-4 ${selectedIndustryKey === ind.id ? 'text-[#0042FF]' : 'text-gray-500'}`} />
                          <span className="text-xs sm:text-sm font-semibold">{ind.label}</span>
                        </div>
                        <span className="text-[10px] text-gray-500 mt-1 leading-normal">{ind.desc}</span>
                      </button>
                    ))}
                  </div>

                  {selectedIndustryKey === 'otra' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3"
                    >
                      <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-2">Escribe tu industria personalizada</label>
                      <input
                        type="text"
                        value={customIndustryText}
                        onChange={(e) => setCustomIndustryText(e.target.value)}
                        className="block w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-3.5 text-sm text-white placeholder-gray-500 focus:border-[#0042FF] focus:outline-none focus:ring-1 focus:ring-[#0042FF] transition-colors"
                        placeholder="Ej. Minería y Construcción, Sector Público, Energía Renovable..."
                        required
                        autoFocus
                      />
                      {errors.industry && <p className="text-rose-400 text-xs mt-1.5">{errors.industry}</p>}
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="mt-8 pt-4 border-t border-[rgba(255,255,255,0.08)] flex justify-between items-center">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Atrás
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-[#0042FF] to-[#00A3FF] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-[#0042FF]/10 hover:shadow-[#0042FF]/25 transition-all duration-200 cursor-pointer"
        >
          {step === 3 ? 'Generar mi roadmap' : 'Siguiente'}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

