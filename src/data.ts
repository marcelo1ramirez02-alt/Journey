export interface GraphNode {
  id: string;
  title: string;
  type: 'base' | 'tecnico' | 'herramienta' | 'blanda' | 'rama' | 'industria' | 'práctica' | 'junior' | 'especialización' | 'proyecto';
  priority: 'obligatorio' | 'recomendado' | 'opcional';
  status: 'no_iniciado' | 'en_progreso' | 'aprendido';
  level: 'base' | 'fundamento' | 'herramienta' | 'rama' | 'práctica' | 'junior' | 'especialización';
  description: string;
  whyItMatters: string;
  relatedJobs: string[];
  relatedTools: string[];
  suggestedProject?: string;
  route: string; // "all", "base", "area_1", "area_2", "area_3", "area_4", "area_5"
  dependencies: string[];
  practiceReq?: string;
  juniorReq?: string;
  x: number;
  y: number;
  industries?: { name: string; detail: string }[];
  howToDevelop?: string;
  requiredTechSkills?: string;
  requiredSoftSkills?: string;
  practicePrepTools?: string[];
  practicePrepWork?: string;
  transitionGap?: { name: string; type: 'técnica' | 'blanda' | 'herramienta'; desc: string }[];
}

// 1. CARREER DATABASE DEFINITIONS
export interface CareerTemplate {
  title: string;
  description: string;
  foundations: { title: string; desc: string; tool: string; why: string; project: string }[];
  tools: { title: string; desc: string; tool: string; why: string; project: string }[];
  areas: {
    id: string;
    name: string;
    description: string;
    why: string;
    subareas: { name: string; desc: string; tools: string[]; skills: string }[];
    practiceRole: { title: string; desc: string; why: string; tools: string[]; project: string; req: string };
    juniorRole: { title: string; desc: string; why: string; tools: string[]; project: string; req: string };
    specRole: { title: string; desc: string; why: string; tools: string[]; project: string; req: string };
    industries: { name: string; detail: string }[];
  }[];
  careerProgression?: {
    roleTitle: string;
    stage: string;
    description: string;
    skills: string[];
    tools: string[];
    knowledge: string[];
  }[];
}

const CAREER_TEMPLATES: Record<string, CareerTemplate> = {
  administracion: {
    title: 'Administración de Empresas',
    description: 'Orientada a la gestión estratégica, optimización de recursos y liderazgo organizativo en corporaciones de todo tamaño.',
    foundations: [
      { title: 'Contabilidad y Estados Financieros', desc: 'Lectura y análisis de balances, flujos de caja y estados de pérdidas y ganancias.', tool: 'Excel Financiero', why: 'Sustenta la viabilidad económica de cualquier decisión o proyecto en el área.', project: 'Auditoría y análisis vertical de un estado financiero anual real.' },
      { title: 'Planificación Estratégica', desc: 'Definición de KPIs, alineación de metas corporativas y control de gestión táctico.', tool: 'Balanced Scorecard', why: 'Evita la improvisación operativa alineando los esfuerzos diarios con los objetivos anuales.', project: 'Diseñar un cuadro de mando estratégico (OKRs) para una startup.' },
      { title: 'Comportamiento Organizacional', desc: 'Dinámica de equipos, motivación laboral y estructuración del talento humano.', tool: 'Framework de Clima', why: 'Garantiza la productividad física y retención del personal operativo.', project: 'Diseño de un programa de onboarding y cultura interna corporativa.' }
    ],
    tools: [
      { title: 'Excel y Gestión de Datos', desc: 'Dominio avanzado de tablas dinámicas, Power Query y macros básicas de productividad.', tool: 'Excel Pro', why: 'La herramienta más demandada para automatizar reportes diarios de control del negocio.', project: 'Construir un dashboard automatizado de control de ventas mensuales.' },
      { title: 'Power BI para Negocios', desc: 'Construcción de dashboards interactivos de control financiero y operativo.', tool: 'Power BI / Tableau', why: 'Facilita la visualización ejecutiva de indicadores para la rápida toma de decisiones.', project: 'Modelar un tablero de indicadores de rotación y costos en Power BI.' },
      { title: 'Negociación y Oratoria Asertiva', desc: 'Habilidades de persuasión comercial y presentación ejecutiva de alto impacto.', tool: 'Elevator Pitch / PPT', why: 'Permite vender ideas comerciales y justificar presupuestos ante el directorio.', project: 'Preparación de un pitch de 3 minutos sustentando un ahorro presupuestal.' }
    ],
    areas: [
      {
        id: 'finanzas',
        name: 'Finanzas Corporativas',
        description: 'Gestión y asignación eficiente de capital, presupuestación (CapEx/OpEx) y análisis de riesgos financieros.',
        why: 'Salvaguarda la liquidez corporativa y evalúa el retorno real de cada inversión comercial.',
        subareas: [
          { name: 'FP&A (Planeamiento Financiero)', desc: 'Pronósticos y análisis presupuestal.', tools: ['Excel', 'Anaplan'], skills: 'Proyección de ingresos, control presupuestario y varianzas.' },
          { name: 'Tesorería y Liquidez', desc: 'Administración de caja diaria y divisas.', tools: ['SAP Treasury', 'Portales Bancarios'], skills: 'Flujo de caja, coberturas cambiarias y conciliaciones.' }
        ],
        practiceRole: {
          title: 'Practicante de Finanzas (FP&A)',
          desc: 'Soporte en la consolidación del presupuesto mensual, carga de datos contables y reporte de variaciones.',
          why: 'Aprenderás a interpretar el flujo de efectivo real y cómo se gestionan los presupuestos corporativos.',
          tools: ['Excel Avanzado', 'ERP SAP'],
          project: 'Estructurar una plantilla de control diario de saldos de caja automatizando 5 bancos.',
          req: 'Carta de presentación de universidad, manejo avanzado de buscarv/tablas dinámicas.'
        },
        juniorRole: {
          title: 'Analista Junior de Planeamiento Financiero',
          desc: 'Responsable autónomo del control presupuestal de 2 áreas de negocio y formulación del forecast trimestral.',
          why: 'Tu primer puesto formal de planilla con responsabilidad directa de asesorar gerentes en sus gastos.',
          tools: ['SAP ERP', 'Power BI Pro'],
          project: 'Diseño de un modelo de costeo de servicios internos que redujo el desvío presupuestal en 8%.',
          req: 'Grado de Bachiller en Administración o Economía, 1 año de experiencia comprobada en finanzas.'
        },
        specRole: {
          title: 'Supervisor de Finanzas / FP&A Lead',
          desc: 'Supervisión del planeamiento financiero consolidado, control de deuda corporativa y valuación de proyectos de inversión.',
          why: 'Liderarás la asignación macro de capital de la compañía reportando los resultados financieros directamente al CFO.',
          tools: ['Enterprise ERP', 'Financial Modeling Toolkits'],
          project: 'Valuación financiera completa y plan de sinergias para la adquisición de un competidor local.',
          req: 'Título profesional, Certificación CFA nivel I o maestría especializada en Finanzas Corporativas.'
        },
        industries: [
          { name: 'Consumo Masivo', detail: 'Gestión con márgenes muy ajustados, alta rotación de inventarios y control estricto de costos de distribución de grandes flotas.' },
          { name: 'Banca y Seguros', detail: 'Modelamiento de riesgos de crédito de clientes, tasas de interés activas/pasivas y análisis de rentabilidad de portafolios de inversión.' }
        ]
      },
      {
        id: 'rrhh',
        name: 'Recursos Humanos y Talento',
        description: 'Atracción, desarrollo, compensaciones y retención del capital humano de la organización bajo un clima óptimo.',
        why: 'El talento humano es el activo más complejo y crítico de administrar en cualquier empresa de servicios.',
        subareas: [
          { name: 'Talent Acquisition (Atracción)', desc: 'Hunting especializado y selección de personal.', tools: ['LinkedIn Recruiter', 'ATS Workday'], skills: 'Entrevistas por competencias, filtros de talento y employer branding.' },
          { name: 'Clima, Cultura y Compensaciones', desc: 'Gestión de encuestas GPTW y bandas de beneficios.', tools: ['Excel', 'Glint'], skills: 'Análisis de rotación, diseño de bandas salariales e integración cultural.' }
        ],
        practiceRole: {
          title: 'Practicante de Talent Acquisition',
          desc: 'Filtro curricular primario, agendamiento de candidatos, aplicación de pruebas psicométricas y feedback de procesos.',
          why: 'Te da el criterio para evaluar el perfil blando y técnico que requiere el mercado corporativo.',
          tools: ['LinkedIn Recruiter', 'ATS (BambooHR)'],
          project: 'Optimizar el embudo de reclutamiento de perfiles de TI reduciendo el tiempo de cobertura de vacantes en 20%.',
          req: 'Estudiante de últimos ciclos de Administración o Psicología, excelente comunicación interpersonal.'
        },
        juniorRole: {
          title: 'Analista Junior de Gestión Humana',
          desc: 'Liderazgo en procesos completos de contratación operativa y media, administración de clima interno y onboarding.',
          why: 'Asumes el control directo de cuentas internas de gerentes, atendiendo sus requerimientos de personal.',
          tools: ['Workday', 'Power BI metrics'],
          project: 'Diseñar e implementar el nuevo programa de onboarding corporativo digital para 150 empleados anuales.',
          req: 'Bachiller, con 1.5 años en selección o generalista de recursos humanos.'
        },
        specRole: {
          title: 'HR Business Partner (HRBP)',
          desc: 'Alineación de la estrategia de talento con las metas comerciales de un área de negocio estratégica de la corporación.',
          why: 'Actúas como consultor estratégico y socio de los directores para potenciar el rendimiento del personal y mitigar conflictos laborales.',
          tools: ['Strategic HR Frameworks', 'People Analytics Dashboards'],
          project: 'Rediseño del plan de compensaciones variable para la fuerza de ventas nacional, elevando la retención en 15%.',
          req: 'Título profesional, diplomado en Recursos Humanos o Desarrollo Organizacional.'
        },
        industries: [
          { name: 'Tecnología', detail: 'Foco extremo en atracción y retención de talento altamente escaso (developers) con cultura flexible y beneficios no monetarios.' },
          { name: 'Retail y Operaciones', detail: 'Gestión de reclutamiento masivo de personal de tienda, alta rotación, control estricto de planillas de sueldos y legislación laboral.' }
        ]
      },
      {
        id: 'operaciones',
        name: 'Operaciones y Logística',
        description: 'Supervisión de procesos de abastecimiento, control de almacenes, compras y distribución física de productos.',
        why: 'Garantiza que el cliente reciba el producto en el momento exacto al menor costo operativo posible.',
        subareas: [
          { name: 'Compras y Sourcing', desc: 'Búsqueda, homologación y negociación de proveedores.', tools: ['ERP SAP', 'Ariba'], skills: 'Negociación comercial, matrices de costeo e importaciones.' },
          { name: 'Supply Chain (Abastecimiento)', desc: 'Control de inventarios y logística interna.', tools: ['Excel', 'WMS Software'], skills: 'Rotación de stock, ruteo y optimización de espacio de almacén.' }
        ],
        practiceRole: {
          title: 'Practicante de Compras y Sourcing',
          desc: 'Recepción de solicitudes de compra de áreas internas, solicitud de cotizaciones de proveedores y seguimiento de entregas.',
          why: 'Entenderás cómo funciona la negociación B2B básica y el ciclo de vida del gasto empresarial.',
          tools: ['SAP MM', 'Excel de Costeo'],
          project: 'Homologación de 15 proveedores de servicios de transporte unificando tarifas corporativas.',
          req: 'Estudiante de ciclos 8-10, dominio de Excel intermedio-avanzado y habilidades de negociación.'
        },
        juniorRole: {
          title: 'Analista de Compras e Inventarios',
          desc: 'Gestión de órdenes de compra nacionales por hasta $500K anuales, monitoreo del nivel de servicio (OTIF) y stock de seguridad.',
          why: 'Controlarás compras críticas y definirás el ritmo de reposición de insumos de la compañía.',
          tools: ['SAP MM / SD', 'Tableau Dashboards'],
          project: 'Implementación del reorden automático de empaques que redujo el quiebre de stock a cero en 6 meses.',
          req: 'Bachiller, con 1.5 años de experiencia previa en logística o planeamiento de compras.'
        },
        specRole: {
          title: 'Jefe de Logística / Supply Chain Lead',
          desc: 'Dirección integrada del almacén central, flota de transporte nacional y el plan de distribución comercial de la empresa.',
          why: 'Sostendrás el margen del negocio optimizando millones en fletes, almacenamiento y compras globales.',
          tools: ['Advanced ERP (Oracle/SAP)', 'WMS / TMS Software'],
          project: 'Rediseño del layout del centro de distribución nacional y ruteo de flotas, reduciendo costos logísticos en 12%.',
          req: 'Título profesional, especialización en Supply Chain Management o MBA.'
        },
        industries: [
          { name: 'Consumo Masivo', detail: 'Foco en distribución masiva diaria hiper-rápida, mantenimiento de la cadena de frío y reducción de mermas por vencimiento.' },
          { name: 'E-commerce y Retail', detail: 'Logística de última milla súper ágil, control de micro-almacenes urbanos y alta complejidad en devoluciones de productos.' }
        ]
      }
    ]
  },

  psicologia: {
    title: 'Psicología Organizacional',
    description: 'Ciencia del comportamiento humano aplicada al bienestar, desempeño, atracción del talento y transformación cultural en el ámbito del trabajo.',
    foundations: [
      { title: 'Comportamiento Organizacional', desc: 'Dinámica de grupos, liderazgo de equipos y cultura en corporaciones.', tool: 'Kits de Clima Laboral', why: 'Permite comprender cómo influye el entorno corporativo en la salud mental y productividad laboral.', project: 'Análisis cualitativo y propuesta de cultura interna para un equipo remoto.' },
      { title: 'Entrevista y Evaluación Psicométrica', desc: 'Técnicas de entrevistas por competencias, filtros de hunting y baterías de pruebas.', tool: 'Pruebas Psicométricas', why: 'Evita la mala contratación asegurando el alineamiento de capacidades y personalidad del perfil.', project: 'Diseño de un kit de evaluación y testeo rápido de competencias blandas.' },
      { title: 'Diseño de Dinámicas de Grupo', desc: 'Dinámicas interactivas para fomentar el aprendizaje, evaluación de personal y onboarding.', tool: 'Talleres Rompehielo', why: 'Facilita la asimilación del aprendizaje y evalúa comportamientos espontáneos en postulantes.', project: 'Estructurar un taller interactivo de liderazgo y resolución de conflictos.' }
    ],
    tools: [
      { title: 'Técnicas de Feedback Asertivo', desc: 'Metodologías para guiar la retroalimentación constructiva de desempeño en la empresa.', tool: 'Feedback 360', why: 'Es clave para reducir la rotación y promover la mejora continua del personal sin generar roces.', project: 'Simulación de entrevistas de feedback difícil para un plan de mejora.' },
      { title: 'Excel para Gestión de Clima (Métricas)', desc: 'Tabulación de datos de clima, cálculo de índices de rotación y gráficos de ausentismo.', tool: 'Excel Tablas Dinámicas', why: 'Permite sustentar las estrategias de talento ante la gerencia con datos cuantificables.', project: 'Diseño de una encuesta de satisfacción interna automatizada en Excel.' },
      { title: 'Employee Experience & UX Research', desc: 'Metodologías ágiles aplicadas al diseño del viaje del colaborador y comportamiento del consumidor.', tool: 'Journey Maps', why: 'Permite comprender con profundidad empática las necesidades del usuario o empleado.', project: 'Mapeo del viaje completo (onboarding a salida) de un colaborador.' }
    ],
    areas: [
      {
        id: 'seleccion',
        name: 'Gestión del Talento y Selección',
        description: 'Búsqueda activa (hunting), atracción de perfiles idóneos, reclutamiento por competencias y onboarding.',
        why: 'Asegura que la empresa incorpore talento con alta afinidad cultural y capacidad técnica calificada.',
        subareas: [
          { name: 'Talent Sourcing', desc: 'Búsqueda activa y filtros digitales de candidatos.', tools: ['LinkedIn Recruiter', 'Krowdy'], skills: 'Boolean searches, mapeo de mercado y contacto en frío.' },
          { name: 'Assessment & Selection', desc: 'Evaluaciones en vivo y entrevistas por competencias.', tools: ['Competence Frameworks', 'Test On-line'], skills: 'Metodología STAR, dinámicas de evaluación colectiva.' }
        ],
        practiceRole: {
          title: 'Practicante de Selección y Reclutamiento',
          desc: 'Soporte curricular, llamadas de filtro telefónico inicial, agendamiento de candidatos y redacción de informes básicos de perfil.',
          why: 'Aprenderás el ritmo de contratación real del mercado y cómo evaluar la idoneidad inicial de un candidato.',
          tools: ['LinkedIn Recruiter', 'ATS (BambooHR)'],
          project: 'Estructurar una guía de entrevistas rápidas bajo metodología STAR para puestos operativos de la empresa.',
          req: 'Estudiante de Psicología o Administración de últimos ciclos, gran empatía.'
        },
        juniorRole: {
          title: 'Asistente de Atracción de Talento',
          desc: 'Responsable de procesos completos de puestos profesionales medios, hunting especializado y contacto directo con jefes de área.',
          why: 'Te conviertes en la cara de la marca empleadora frente a candidatos de alto perfil del sector.',
          tools: ['Workday ATS', 'Assessment Centers'],
          project: 'Liderar y cerrar el programa de reclutamiento anual de 20 "Trainees" corporativos en 45 días.',
          req: 'Bachiller en Psicología, 1 año de experiencia liderando dinámicas colectivas.'
        },
        specRole: {
          title: 'Coordinador / Lead de Atracción de Talento',
          desc: 'Diseño de la estrategia de employer branding nacional, negociación con headhunters y optimización de costos de reclutamiento.',
          why: 'Sostendrás el crecimiento de la empresa cubriendo los puestos clave y reduciendo el costo de contratación global.',
          tools: ['Employer Branding Frameworks', 'People Analytics dashboards'],
          project: 'Diseño del programa de marca empleadora universitario, incrementando en 40% los postulantes calificados.',
          req: 'Psicólogo Colegiado, con especialización en Gestión Humana o MBA en curso.'
        },
        industries: [
          { name: 'Consultoría y Headhunting', detail: 'Foco exclusivo en reclutamiento súper acelerado de múltiples rubros, cobro por comisión de vacante cerrada y búsqueda de altos ejecutivos.' },
          { name: 'Tecnología', detail: 'Selección de perfiles digitales muy cotizados (Software Engineers), procesos ágiles y competitividad internacional de beneficios.' }
        ]
      },
      {
        id: 'clima',
        name: 'Clima, Cultura y Experiencia',
        description: 'Medición de la satisfacción interna (GPTW), planes de fidelización, retención de talento y comunicación interna.',
        why: 'Evita la fuga de talento valioso estructurando un ambiente laboral seguro, inclusivo y motivador.',
        subareas: [
          { name: 'Cultura & Clima Laboral', desc: 'Análisis de encuestas de clima y planes de acción.', tools: ['Glint', 'GPTW survey metrics'], skills: 'Análisis de datos cualitativos, dinámicas participativas.' },
          { name: 'Comunicación Interna', desc: 'Boletines, eventos corporativos y campañas de valores.', tools: ['Canva', 'Slack/Teams'], skills: 'Estrategia editorial de comunicación y diseño de experiencias.' }
        ],
        practiceRole: {
          title: 'Practicante de Clima y Cultura',
          desc: 'Soporte en la organización de eventos corporativos, elaboración de boletines de comunicación interna y tabulación de encuestas de satisfacción.',
          why: 'Aprenderás cómo influye la comunicación interna y el clima en el engagement de los colaboradores de planta.',
          tools: ['Excel', 'Mailchimp / Slack'],
          project: 'Diseño y lanzamiento de un boletín interactivo semanal de clima con tasa de apertura del 75%.',
          req: 'Estudiante de Psicología, Administración o Comunicaciones, alta creatividad y habilidades de diseño.'
        },
        juniorRole: {
          title: 'Analista de Clima y Cultura',
          desc: 'Administración de la encuesta de clima anual de la empresa, formulación de planes de acción locales con gerencias.',
          why: 'Asumes el liderazgo de proyectos de alta visibilidad para mantener la certificación GPTW de la compañía.',
          tools: ['Survey platforms', 'Excel Pro analytics'],
          project: 'Reducir la rotación en el área de Operaciones en 12% mediante la aplicación de talleres de liderazgo táctico.',
          req: 'Bachiller en Psicología, 1.5 años liderando planes de acción de satisfacción de personal.'
        },
        specRole: {
          title: 'Jefe / Especialista de Cultura y Clima',
          desc: 'Dirección del diseño cultural ante fusiones, planes maestros de bienestar, liderazgo de la transformación ágil corporativa.',
          why: 'Serás el principal guardián del propósito de la empresa, moldeando la forma de trabajar del negocio.',
          tools: ['Culture Design Canvas', 'Change Management models (Kotter)'],
          project: 'Liderar la fusión cultural de dos compañías locales, alineando valores, sueldos y procesos de onboarding bajo un único estándar.',
          req: 'Título profesional en Psicología, Especialización en Cambio Organizacional o Desarrollo de Talento.'
        },
        industries: [
          { name: 'Consumo Masivo / Manufactura', detail: 'Foco en operarios de planta, bienestar físico, control estricto de accidentes y eventos de integración familiar para fidelizar.' },
          { name: 'Banca y Seguros', detail: 'Gestión con miles de empleados de oficina, foco en resiliencia mental ante el estrés comercial y balance vida-trabajo.' }
        ]
      }
    ]
  },

  ingenieria_industrial: {
    title: 'Ingeniería Industrial',
    description: 'Disciplina enfocada en optimizar sistemas de producción, cadena de suministro, calidad y recursos administrativos para elevar la eficiencia operativa.',
    foundations: [
      { title: 'Gestión de Procesos (BPM)', desc: 'Mapeo de flujos de trabajo, cuellos de botella y diseño de diagramas AS-IS / TO-BE.', tool: 'Bizagi Modeler', why: 'Permite identificar ineficiencias de tiempo y recursos de un área antes de implementar sistemas.', project: 'Mapear el proceso actual de despacho de mercadería en una tienda de retail.' },
      { title: 'Planeamiento y Operaciones', desc: 'Métodos cuantitativos de pronóstico de demanda, planeamiento de capacidad de planta y distribución de planta (Layout).', tool: 'Excel / Autocad', why: 'Evita quiebres de stock o sobreproducción calibrando la capacidad productiva con la demanda real.', project: 'Diseñar el layout de un almacén para optimizar el picking de productos.' },
      { title: 'Herramientas de Calidad y SPC', desc: 'Estadística descriptiva aplicada al control de procesos, diagramas de Ishikawa, cartas de control.', tool: 'Minitab / Excel', why: 'Garantiza la consistencia en el cumplimiento del estándar operativo reduciendo mermas o productos defectuosos.', project: 'Análisis estadístico de desviación de pesos de envasado en una línea de producción.' }
    ],
    tools: [
      { title: 'Excel Avanzado y Power Query', desc: 'Modelación de bases de datos operativas, limpieza de datos masivos y automatización de reportes de control.', tool: 'Excel Solver', why: 'Sustenta la productividad de oficina automatizando flujos de datos complejos y paradas de producción.', project: 'Estructurar un consolidador de producción diaria de planta en Excel.' },
      { title: 'Metodologías de Mejora Continua', desc: 'Introducción a herramientas Lean Manufacturing, 5S, desperdicios, y Kaizen.', tool: 'Lean Six Sigma Green Belt', why: 'Es el estándar industrial global para reducir desperdicios de material e incrementar la productividad física.', project: 'Aplicar metodología 5S en una microempresa o taller mecánico.' },
      { title: 'Power BI Industrial', desc: 'Desarrollo de cuadros de control para el monitoreo en tiempo real de eficiencias operativas (OEE, paradas, mermas).', tool: 'Power BI Dashboards', why: 'Permite que la jefatura visualice de inmediato las desviaciones operativas para accionar correcciones.', project: 'Diseño de un dashboard de eficiencia de producción en Power BI.' }
    ],
    areas: [
      {
        id: 'operaciones',
        name: 'Operaciones y SCM',
        description: 'Planificación de la producción (PCP), gestión integrada de la cadena de suministro, logística y compras.',
        why: 'Coordina de punta a punta el flujo físico de bienes asegurando el cumplimiento de la entrega comercial al menor costo.',
        subareas: [
          { name: 'Planificación de Producción (PCP)', desc: 'Programación semanal de corridas de máquinas y abastecimiento.', tools: ['SAP PP', 'Excel Solver'], skills: 'Programación de capacidad, MRP y balanceo de carga de trabajo.' },
          { name: 'Logística e Inventarios', desc: 'Gestión de almacenes centrales y ruteo de distribución.', tools: ['WMS Software', 'Power BI'], skills: 'Rotación de stock, picking y costos de almacenamiento.' }
        ],
        practiceRole: {
          title: 'Practicante de PCP / Operaciones',
          desc: 'Seguimiento de órdenes de fabricación, actualización semanal de indicadores de eficiencia y control de mermas físicas.',
          why: 'Aprenderás a entender el ritmo de producción en vivo y cómo influye la programación en la entrega.',
          tools: ['Excel Avanzado', 'SAP ERP'],
          project: 'Elaborar un consolidador diario de OEE automatizando planillas de 4 líneas de envasado.',
          req: 'Ciclo 8 de Ingeniería Industrial aprobado, manejo avanzado de macros básicas en Excel.'
        },
        juniorRole: {
          title: 'Analista de Planeamiento de Producción (PCP)',
          desc: 'Responsable autónomo de la programación de una línea de planta, balanceo de mano de obra y requerimientos de materia prima.',
          why: 'Tus decisiones determinan la carga diaria de máquinas de toda una planta industrial.',
          tools: ['SAP PP', 'Excel macros avanzados'],
          project: 'Optimización de setups de máquina mediante modelo matricial, incrementando disponibilidad de línea en 10%.',
          req: 'Bachiller en Ingeniería Industrial, 1 año en PCP o planta.'
        },
        specRole: {
          title: 'Supply Chain Manager / Superintendente de Planta',
          desc: 'Planificación maestra operativa (S&OP), dirección de planta de producción consolidada y negociaciones de fletes marítimos corporativos.',
          why: 'Sostendrás el margen corporativo negociando y optimizando de punta a punta la cadena física global de la compañía.',
          tools: ['Advanced ERP', 'S&OP Frameworks'],
          project: 'Implementación corporativa del plan S&OP unificando Comercial y Operaciones, reduciendo inventario ocioso en $1M.',
          req: 'Título profesional, Especialización o Maestría en Supply Chain Management.'
        },
        industries: [
          { name: 'Manufactura de Alimentos', detail: 'Foco crítico en inocuidad (HACCP), perecibilidad, velocidad de despacho diario y mermas térmicas en planta.' },
          { name: 'Minería y Energía', detail: 'Logística de gran envergadura (heavy cargo), control estricto de seguridad SST, campamentos operativos y compras de alto valor de importación.' }
        ]
      },
      {
        id: 'excelencia',
        name: 'Excelencia Operativa y Mejora Continua',
        description: 'Rediseño de procesos AS-IS/TO-BE, reducción de desperdicios mediante metodologías Lean y estandarización ISO.',
        why: 'Busca el incremento continuo del margen neto de la empresa eliminando actividades que no agregan valor.',
        subareas: [
          { name: 'Lean Six Sigma', desc: 'Metodologías DMAIC para reducción de variabilidad y mermas.', tools: ['Minitab', 'Lean templates'], skills: 'Análisis de causa raíz, matriz AMFE, diagramación de valor (VSM).' },
          { name: 'Gestión y Arquitectura de Procesos', desc: 'Modelación de manuales, normas de calidad ISO 9001.', tools: ['Bizagi', 'Sistemas SIG'], skills: 'Auditorías de procesos, diseño de checklists y flujogramas.' }
        ],
        practiceRole: {
          title: 'Practicante de Procesos / Mejora Continua',
          desc: 'Toma de tiempos en planta, elaboración de diagramas de proceso (VSM) y digitalización de manuales de calidad de área.',
          why: 'Desarrollas gran destreza analítica para identificar mermas de tiempo e ineficiencias de movimiento en campo.',
          tools: ['Bizagi Modeler', 'Excel SPC'],
          project: 'Mapear el flujo actual de valor de una línea de ensamble, proponiendo mejoras que eliminaron 2 cuellos de botella.',
          req: 'Estudiante de Ingeniería Industrial de últimos ciclos, dominio de Bizagi y cursos de Lean aprobados.'
        },
        juniorRole: {
          title: 'Analista de Procesos y Calidad',
          desc: 'Liderazgo en auditorías de procesos internos, implementación de la norma ISO 9001 y sustentación de proyectos Kaizen de ahorro.',
          why: 'Asumes el control directo de certificar que el estándar del negocio funcione de manera continua y eficiente.',
          tools: ['Minitab', 'Sistemas de Gestión Documental SIG'],
          project: 'Rediseño del proceso de picking del almacén central bajo estándar Kaizen, reduciendo errores en 22%.',
          req: 'Bachiller, con 1.5 años de experiencia comprobada en mapeo de procesos u oficina de proyectos (PMO).'
        },
        specRole: {
          title: 'Auditor Líder / Gerente de Excelencia Operativa',
          desc: 'Diseño integral del programa de mejora continua de la corporación y representación en auditorías internacionales de certificación.',
          why: 'Liderarás la transformación de la cultura operativa del negocio eliminando ineficiencias a escala global.',
          tools: ['Lean Enterprise Frameworks', 'Balanced Scorecard dashboards'],
          project: 'Diseñar y certificar con éxito el Sistema Integrado de Gestión (ISO 9001, 14001, 45001) para 3 plantas industriales operativas.',
          req: 'Título profesional, Certificación Six Sigma Black Belt de institución de prestigio.'
        },
        industries: [
          { name: 'Consumo Masivo / Retail', detail: 'Foco en la velocidad y estandarización de procesos de atención, diseño ágil de tiendas y control del desperdicio de mermas comerciales.' },
          { name: 'Consultoría y PMO', detail: 'Consultorías externas para rediseño estructural de procesos en empresas públicas y corporaciones con foco en eficiencia de headcount.' }
        ]
      }
    ]
  },

  marketing: {
    title: 'Marketing',
    description: 'Orientado a conectar necesidades del mercado con productos de alto valor, diseñando campañas creativas y performance medible.',
    foundations: [
      { title: 'Fundamentos del Consumidor', desc: 'Estudio de segmentación, sesgos cognitivos e investigación cualitativa de mercados.', tool: 'User Personas', why: 'Evita el fracaso de campañas al alinear la propuesta de valor con los dolores reales del usuario.', project: 'Mapear 3 perfiles de clientes ideales con dolores y motivaciones.' },
      { title: 'Redacción Creativa (Copywriting)', desc: 'Técnicas de escritura persuasiva para canales de publicidad, redes sociales y campañas.', tool: 'AIDA Framework', why: 'Sostiene la conversión comercial atrayendo la atención inmediata del público objetivo.', project: 'Redacción de una secuencia de 4 emails comerciales persuasivos.' },
      { title: 'Marketing Analytics', desc: 'Conceptos de embudos de conversión, ROI, coste de adquisición (CPA) y valor de vida del cliente (LTV).', tool: 'Google Analytics 4', why: 'Permite sustentar las decisiones de gasto publicitario con resultados medibles de rentabilidad.', project: 'Construir un embudo de conversión en Excel analizando fugas de clientes.' }
    ],
    tools: [
      { title: 'SEO Básico y Contenidos', desc: 'Optimización de contenido para motores de búsqueda, investigación de palabras clave.', tool: 'Semrush / Google Search Console', why: 'Permite conseguir visitas orgánicas de alta intención de compra sin costo de pauta digital.', project: 'Escribir un artículo de blog optimizado con SEO on-page.' },
      { title: 'Pauta Digital y Ads', desc: 'Configuración básica de campañas pagas en Meta Ads y Google Ads, presupuestación de campaña.', tool: 'Meta Ads Manager / Google Ads', why: 'Es la habilidad más solicitada para generar ventas y prospectos calificados de forma acelerada.', project: 'Estructurar una simulación de campaña en Meta Ads con segmentación.' },
      { title: 'Excel de Marketing y Reportes', desc: 'Tabulación de reportes de leads, cálculo de CTR, ROAS y automatización de UTMs de seguimiento.', tool: 'Excel UTM Builder', why: 'Es vital para ordenar el caos de datos procedentes de múltiples campañas de marketing digital.', project: 'Estructurar una plantilla consolidadora de costo y clics de 3 plataformas.' }
    ],
    areas: [
      {
        id: 'growth',
        name: 'Growth & Performance Marketing',
        description: 'Crecimiento de ventas enfocado en todo el embudo (AARRR) mediante experimentación rápida, compra de tráfico pago y analítica avanzada.',
        why: 'Combina el análisis estadístico con pauta digital para conseguir clientes de forma predecible y acelerada.',
        subareas: [
          { name: 'Performance (Paid Media)', desc: 'Optimización fina de presupuestos pagados de anuncios.', tools: ['Meta Ads Manager', 'Google Search Ads', 'TikTok Ads'], skills: 'Estrategias de puja, A/B Testing, retargeting dinámico.' },
          { name: 'CRO & Analytics', desc: 'Mejora de conversión de landing pages y embudos.', tools: ['Hotjar', 'Google Analytics 4', 'VWO'], skills: 'Mapas de calor, diseño de landings persuasivas, auditoría de eventos.' }
        ],
        practiceRole: {
          title: 'Practicante de Growth Marketing',
          desc: 'Carga de campañas operativas de pauta, monitoreo diario de CTR y ROAS, elaboración de copias alternativos y control de UTMs.',
          why: 'Aprenderás a perder el miedo a operar presupuestos de publicidad reales interpretando datos de conversión.',
          tools: ['Meta Ads', 'Google Analytics', 'Excel Pro'],
          project: 'Lanzar y medir un experimento de 3 copias y 3 piezas gráficas, determinando la mejor con 95% de confianza estadística.',
          req: 'Estudiante de Marketing, Ingeniería o Administración de últimos ciclos, alta afinidad con números.'
        },
        juniorRole: {
          title: 'Analista de Performance / Paid Media',
          desc: 'Responsable directo del presupuesto de pauta nacional de $200K anuales, optimización del costo por lead (CPL) y ROI de campañas.',
          why: 'Asumes el control táctico del flujo de ventas digitales directas de la compañía con planilla formal.',
          tools: ['Google Ads Specialist', 'Meta Ads Avanzado', 'Looker Studio'],
          project: 'Rediseño de la campaña de captación de leads que redujo el CPA en 18% manteniendo la tasa de conversión.',
          req: 'Bachiller en Marketing o afines, 1.5 años de experiencia comprobada operando plataformas de anuncios.'
        },
        specRole: {
          title: 'Growth Marketing Manager',
          desc: 'Estrategia general de adquisición, retención y monetización digital, dirección del equipo de analistas y diseñadores de landings.',
          why: 'Liderarás el crecimiento exponencial de la facturación digital del negocio reportando métricas directas al directorio.',
          tools: ['Growth Frameworks', 'Advanced Attribution modeling'],
          project: 'Diseño e implementación de una estrategia integral de Growth Hacking que elevó el LTV del cliente en 30% en un año.',
          req: 'Título profesional, Certificación Growth de ref renombre o especialización en marketing analítico.'
        },
        industries: [
          { name: 'SaaS / Startups', detail: 'Foco extremo en métricas de suscripción, retención mensual (Churn), conversión de pruebas gratuitas a planes de pago.' },
          { name: 'E-commerce y Retail', detail: 'Logística de pauta para eventos masivos (CyberDays), pauta dinámica con catálogo de miles de productos y conversión directa en web.' }
        ]
      },
      {
        id: 'brand',
        name: 'Brand & Product Management',
        description: 'Estrategia de posicionamiento de marca, reputación corporativa, investigación de mercados y trade marketing.',
        why: 'La marca es el principal diferenciador competitivo de largo plazo frente al ingreso de competidores de bajo precio.',
        subareas: [
          { name: 'Brand Management', desc: 'Lanzamientos de producto y campañas masivas de branding.', tools: ['Brand Canvas', 'Focus groups'], skills: 'Storytelling corporativo, relaciones públicas, negociación de agencias.' },
          { name: 'Trade Marketing', desc: 'Estrategia comercial de colocación en el canal de venta.', tools: ['Excel de márgenes', 'Kantar datasets'], skills: 'Diseño de material POP, surtido de categorías y promociones.' }
        ],
        practiceRole: {
          title: 'Practicante de Trade Marketing / Marca',
          desc: 'Coordinación con agencias de diseño, supervisión física de material POP en tiendas y soporte en la organización de lanzamientos.',
          why: 'Aprenderás cómo funciona la comunicación visual y el punto de venta de una gran marca en el mercado real.',
          tools: ['Canva / PPT', 'Excel de Inventarios de POP'],
          project: 'Supervisar y reportar la implementación del nuevo exhibidor de marca en 25 supermercados metropolitanos.',
          req: 'Estudiante de Marketing o Comunicaciones de últimos ciclos, alta creatividad y habilidades organizativas.'
        },
        juniorRole: {
          title: 'Asistente de Brand Management',
          desc: 'Soporte al Brand Manager en el control presupuestal de la marca, coordinación con agencias creativas y análisis de Kantar Worldpanel.',
          why: 'Participas de manera directa en las decisiones de diseño del empaque, precio y comercialización del producto de la empresa.',
          tools: ['Excel avanzado', 'Kantar / Nielsen databases'],
          project: 'Lanzamiento de una extensión de línea de producto en empaque familiar, logrando 8% de cuota de mercado en 4 meses.',
          req: 'Bachiller, con 1.5 años en Trade o Marca en consumo masivo.'
        },
        specRole: {
          title: 'Brand Manager (Gerente de Marca)',
          desc: 'Dirección absoluta del P&L de la categoría de productos, planificación del presupuesto de publicidad anual y estrategia estratégica nacional.',
          why: 'Serás el principal responsable del éxito comercial de la marca en el país coordinando agencias y directores.',
          tools: ['P&L Management formulas', 'Brand Equity tracking systems'],
          project: 'Estrategia de reposicionamiento de una marca madura, logrando rejuvenecer el target y elevando ventas en 25%.',
          req: 'Título profesional, MBA o Especialización en Marketing Directivo.'
        },
        industries: [
          { name: 'Consumo Masivo', detail: 'Gestión compleja de empaques, distribución masiva a bodegas, pauta masiva en TV/Redes y alta competencia en supermercados.' },
          { name: 'Banca y Servicios', detail: 'Foco en la reputación intangible de marca, campañas de fidelización de tarjetas y marketing relacional de fidelización.' }
        ]
      }
    ]
  },

  negocios_internacionales: {
    title: 'Negocios Internacionales',
    description: 'Enfocada en comercio exterior, regulaciones de aduanas, fletes internacionales y desarrollo de negocios de importación/exportación.',
    foundations: [
      { title: 'Incoterms 2020 y Fletes', desc: 'Definición de costos, riesgos y transferencia de propiedad en fletes internacionales (FOB, CIF, etc.).', tool: 'Incoterms Cheat Sheet', why: 'Evita sobrecostos multimillonarios por mal cálculo de seguros navieros o demoras en puertos.', project: 'Diseño de una matriz comparativa de costos de flete marítimo bajo 4 Incoterms.' },
      { title: 'Legislación y Regímenes Aduaneros', desc: 'Estudio de leyes que regulan el ingreso y salida de bienes, clasificación arancelaria básica.', tool: 'Arancel SUNAT', why: 'Evita la retención aduanera de contenedores y multas del estado clasificando correctamente la partida.', project: 'Clasificar arancelariamente 5 maquinarias e identificar sus TLCs aplicables.' },
      { title: 'Excel de Costeo Comex', desc: 'Plantillas automatizadas para cálculo de derechos arancelarios, fletes y costos totales de importación en destino.', tool: 'Excel Comex Matrix', why: 'Es vital para evaluar de antemano la viabilidad financiera de importar un insumo o producto terminado.', project: 'Crear una plantilla de costeo de importación aérea de reactivos de Alemania.' }
    ],
    tools: [
      { title: 'Uso de Base de Datos Veritrade', desc: 'Búsqueda, extracción y análisis de registros de importadores/exportadores y precios de competidores locales.', tool: 'Veritrade / Trademap', why: 'Permite hacer inteligencia competitiva descubriendo proveedores de la competencia y precios reales FOB.', project: 'Análisis de mercado de importación de paneles solares en el país utilizando Veritrade.' },
      { title: 'Documentación Aduanera (DAM)', desc: 'Lectura e interpretación de DAM, Bill of Lading (B/L), Air Waybill (AWB), Packing List y Certificados de Origen.', tool: 'DAM Viewer', why: 'Es el pan de cada día operativo para validar que la aduana y navieras liberen las cargas sin penalidades.', project: 'Auditar un expediente real de importación y validar coincidencias documentales.' },
      { title: 'Negociación y Oratoria Comercial', desc: 'Técnicas de negociación y diplomacia comercial respetando diferencias culturales de negocios (Asia, Europa).', tool: 'Business English comex', why: 'Permite cerrar tarifas de flete y precios de insumos más competitivos con proveedores del extranjero.', project: 'Simulación escrita de negociación de descuento del 5% con un proveedor chino.' }
    ],
    areas: [
      {
        id: 'comex',
        name: 'Comercio Exterior y Aduanas',
        description: 'Gestión diaria de operaciones de importación/exportación, compliance aduanero y aduana.',
        why: 'Mantiene operativo el abastecimiento de materia prima extranjera y la entrega física a clientes internacionales.',
        subareas: [
          { name: 'Operaciones de Importación', desc: 'Coordinación aduanera y nacionalización.', tools: ['VUCE portal', 'Excel dashboards'], skills: 'Seguimiento aduanero, coordinación de aduanas.' },
          { name: 'Estrategias de Exportación', desc: 'Colocación de productos locales en mercados de fuera.', tools: ['Trademap', 'Veritrade'], skills: 'Reglas de origen, certificados sanitarios, embarques marítimos.' }
        ],
        practiceRole: {
          title: 'Practicante de Importaciones / Comex',
          desc: 'Revisión preliminar de facturas comerciales, archivo documental de DAMs, y seguimiento diario con el agente aduanero.',
          why: 'Aprenderás a interactuar con aduanas y navieras entendiendo el flujo burocrático de una nacionalización.',
          tools: ['Excel', 'SAP MM basic'],
          project: 'Estructurar el archivo digital de 40 importaciones históricas reduciendo tiempos de auditoría tributaria.',
          req: 'Estudiante de Negocios Internacionales de últimos ciclos, inglés intermedio comprobado.'
        },
        juniorRole: {
          title: 'Asistente de Comercio Exterior / Comex',
          desc: 'Coordinación autónoma de booking de contenedores, revisión técnica de cartas de crédito y liquidación final de tributos.',
          why: 'Asumes el control directo de la nacionalización ágil de embarques marítimos semanales.',
          tools: ['VUCE', 'SAP MM / SD modules'],
          project: 'Rediseño del flujo de homologación de documentos de embarque, recortando 2 días de sobrestadía en puerto.',
          req: 'Bachiller, con 1 año de experiencia previa operativa en agencias de aduana o departamentos Comex.'
        },
        specRole: {
          title: 'Jefe de Operaciones Comex / Comex Lead',
          desc: 'Garantía del compliance tributario de aduanas, representación de la empresa ante aduanas y planeamiento de ahorros por TLC.',
          why: 'Sostendrás la rentabilidad global de compras optimizando millones en aranceles y fletes marítimos consolidados.',
          tools: ['Advanced ERP (SAP/Oracle)', 'Customs Compliance toolkits'],
          project: 'Implementación del estatuto OEA (Operador Económico Autorizado), logrando despacho preferencial y reduciendo costos de inspección en 30%.',
          req: 'Título profesional en Negocios Internacionales, Diplomado de Especialización Aduanera SUNAT.'
        },
        industries: [
          { name: 'Agroexportación', detail: 'Foco en logística fría hiper-rápida, cumplimiento estricto de normas sanitarias (SENASA, FDA) y fletes de contenedores refrigerados.' },
          { name: 'Agencias de Aduana / Logísticas', detail: 'Operación súper dinámica brindando servicios Comex a decenas de clientes importadores con multas aduaneras críticas.' }
        ]
      }
    ]
  },

  derecho: {
    title: 'Derecho Corporativo y Compliance',
    description: 'Enfocado en la asesoría de contratos civiles, cumplimiento de leyes estatales, compliance anticorrupción, derecho tributario y laboral.',
    foundations: [
      { title: 'Teoría General de las Obligaciones', desc: 'Conceptos jurídicos fundamentales, contratos civiles, acuerdos comerciales.', tool: 'Código Civil', why: 'Permite comprender el sustento del acuerdo mutuo que rige todas las transacciones comerciales de la empresa.', project: 'Análisis detallado de responsabilidades de daños en un contrato típico.' },
      { title: 'Legislación Societaria y de Empresas', desc: 'Estructuración de sociedades anónimas, actas de directorio, fusiones y poderes notariales.', tool: 'Ley General de Sociedades', why: 'Evita vacíos de poder legal y estructuraciones accionarias incorrectas de la corporación.', project: 'Redacción de un acta modelo de aumento de capital societario.' },
      { title: 'Introducción al Compliance', desc: 'Prevención del lavado de activos, anticorrupción y compliance ético corporativo.', tool: 'Modelos de Prevención de Delitos', why: 'Salvaguarda la reputación penal y legal de la empresa y directivos ante investigaciones.', project: 'Diseñar el canal ético de denuncias y checklist anticorrupción para un área.' }
    ],
    tools: [
      { title: 'Redacción de Contratos B2B', desc: 'Técnicas de redacción asertiva, cláusulas de penalidad, arbitraje y confidencialidad.', tool: 'Plantillas Contractuales', why: 'Es la habilidad más demandada para blindar comercialmente transacciones de compra, venta o servicios de la empresa.', project: 'Redactar un acuerdo de confidencialidad (NDA) blindado legalmente.' },
      { title: 'Revisión y Análisis Normativo', desc: 'Búsqueda sistemática y lectura ágil de normas emitidas por el diario oficial, interpretación legal.', tool: 'El Peruano / Buscador SPIJ', why: 'Garantiza que la empresa no opere de forma ilegal ante nuevas regulaciones que emita el estado.', project: 'Elaboración de un informe sobre el impacto de una nueva norma laboral del sector.' },
      { title: 'Excel de Control Legal y Plazos', desc: 'Cuadros de control de vencimiento de contratos, licencias de funcionamiento y marcas registradas.', tool: 'Excel Alert System', why: 'Evita multas críticas por expiración de contratos con proveedores o licencias estatales de operación.', project: 'Construir una matriz de alertas automatizada de vencimiento de licencias.' }
    ],
    areas: [
      {
        id: 'corporativo',
        name: 'Derecho Corporativo y Contratos',
        description: 'Asesoría jurídica de transacciones comerciales, estructuración contractual, compliance y M&A.',
        why: 'Sostiene y blinda legalmente cada acuerdo que el área comercial o logística firma con terceros.',
        subareas: [
          { name: 'Asesoría Legal Interna (In-house)', desc: 'Revisión y redacción de contratos generales.', tools: ['Contract Managers', 'MS Word Advanced'], skills: 'Redacción de adendas, contratos de arrendamiento, licitaciones.' },
          { name: 'Cumplimiento y Compliance', desc: 'Supervisión de prevención de lavado y canal ético.', tools: ['Sistemas de Debida Diligencia', 'Excel'], skills: 'Manual de prevención de delitos, debida diligencia de socios.' }
        ],
        practiceRole: {
          title: 'Practicante de Derecho Corporativo (In-house)',
          desc: 'Revisión preliminar de adendas estándar, control de firmas notariales de poderes y archivo del libro de actas corporativo.',
          why: 'Aprenderás la velocidad que exige la empresa privada para cerrar acuerdos comerciales seguros.',
          tools: ['Word avanzado', 'Software de firmas (Docusign)'],
          project: 'Escanear, auditar y categorizar digitalmente 150 contratos históricos alertando contingencias de vencimiento.',
          req: 'Estudiante de Derecho de ciclos 7-10, excelente redacción y ortografía jurídica.'
        },
        juniorRole: {
          title: 'Asistente Legal Corporativo',
          desc: 'Redacción autónoma de contratos complejos de proveedores, absolución de consultas de áreas internas y trámites registrales.',
          why: 'Te conviertes en el primer filtro legal de decisiones comerciales operativas de la compañía.',
          tools: ['MS Word', 'Buscadores Registrales (SUNARP)'],
          project: 'Estructurar e inscribir el nuevo cuadro integral de poderes generales de los representantes de la corporación.',
          req: 'Egresado de Derecho, con 1.5 años de experiencia previa en estudios o áreas legales de empresas.'
        },
        specRole: {
          title: 'Abogado Corporativo Senior / Oficial de Cumplimiento',
          desc: 'Liderazgo en negociaciones corporativas complejas, litigios macro de la empresa, y oficialía de prevención penal regulada.',
          why: 'Serás el principal guardián legal y ético del negocio reportando contingencias de riesgo directamente al directorio.',
          tools: ['Enterprise Compliance Frameworks', 'Corporate Law toolkits'],
          project: 'Diseñar, implementar e inscribir el Modelo de Prevención de Delitos de la empresa bajo el estándar de la norma ISO 37001.',
          req: 'Abogado Colegiado, con especialización en Compliance Corporativo o Derecho Penal Económico.'
        },
        industries: [
          { name: 'Estudios de Abogados Boutique', detail: 'Foco exclusivo en brindar asesoría externa rápida y cobro por horas de consultoría corporativa o litigios complejos.' },
          { name: 'Banca e Inmobiliario', detail: 'Alta complejidad contractual, saneamiento registral masivo, hipotecas, fideicomisos y regulaciones estrictas de la SBS.' }
        ]
      }
    ]
  },

  comunicaciones: {
    title: 'Comunicaciones',
    description: 'Orientado a gestionar la reputación de marca, comunicaciones corporativas internas, relaciones públicas y creación de contenido estratégico.',
    foundations: [
      { title: 'Teoría de la Comunicación y Opinión', desc: 'Estudio de canales, audiencias, framing y construcción de reputación corporativa.', tool: 'PR Toolkit', why: 'Permite diseñar mensajes que sintonicen con la psicología de la audiencia previniendo desvíos de marca.', project: 'Análisis de un caso real de crisis de reputación de marca y propuesta.' },
      { title: 'Redacción Periodística y Corporativa', desc: 'Estructura de notas de prensa, redacción de comunicados internos y técnicas de síntesis informativa.', tool: 'Notas de Prensa', why: 'Es vital para redactar de forma clara, ágil y atractiva sin cometer errores que dañen la marca.', project: 'Redacción de una nota de prensa de lanzamiento y comunicado interno.' },
      { title: 'Creación de Contenido Digital', desc: 'Fundamentos de copywriting creativo para redes, adaptación de tonos de voz según plataformas.', tool: 'Content Planner', why: 'Permite generar cercanía digital e interacción orgánica sostenida con las comunidades de usuarios.', project: 'Diseñar el plan de contenidos mensuales de 3 redes para un sector.' }
    ],
    tools: [
      { title: 'Gestión de Relaciones Públicas (PR)', desc: 'Construcción de base de datos de periodistas clave, redacción de gacetillas, coordinación de entrevistas.', tool: 'Media Database', why: 'Consigue exposición mediática gratuita de gran valor para la reputación de la empresa (Earned Media).', project: 'Diseñar un kit de prensa digital de lanzamiento para un nuevo startup.' },
      { title: 'Herramientas de Comunicación Interna', desc: 'Plataformas de comunicación colaborativa, boletines integrados, diseño de periódicos murales.', tool: 'Mailchimp / Canva', why: 'Evita desinformación y fomenta la integración de los empleados de planta con los valores corporativos.', project: 'Crear una campaña completa interna de comunicación sobre sostenibilidad.' },
      { title: 'Excel de Medios y Campañas', desc: 'Reportes de clipping de prensa, cálculo del Valor Publicitario Equivalente (AVE) y KPIs de contenidos.', tool: 'Excel Clipping Tracker', why: 'Permite cuantificar y reportar en dólares el retorno de las gestiones gratuitas ante prensa de relaciones públicas.', project: 'Estructurar una plantilla de valorización AVE de 15 notas de prensa publicadas.' }
    ],
    areas: [
      {
        id: 'corporativas',
        name: 'Asuntos Corporativos y RRPP',
        description: 'Dirección de relaciones públicas, relaciones institucionales con el estado, gestión de crisis de reputación.',
        why: 'Blindar el principal activo de la compañía: su reputación de marca ante la sociedad y fiscalizadores.',
        subareas: [
          { name: 'Relaciones Públicas (PR)', desc: 'Contacto de prensa y posicionamiento de voceros.', tools: ['Cision', 'Media databases'], skills: 'Media training, redacción de gacetillas, clipping.' },
          { name: 'Comunicación Interna', desc: 'Fomento del clima, identidad corporativa y newsletters.', tools: ['Workspace', 'Slack/Teams'], skills: 'Redacción institucional, organización de town halls.' }
        ],
        practiceRole: {
          title: 'Practicante de Comunicación Interna',
          desc: 'Redacción de boletines diarios, actualización de pizarras de planta, soporte en eventos de integración y recopilación de noticias.',
          why: 'Aprenderás la importancia de mantener al colaborador motivado y alineado al propósito de la corporación.',
          tools: ['Canva', 'Slack corporativo'],
          project: 'Diseño de un newsletter interactivo mensual de seguridad industrial logrando 80% de lectura.',
          req: 'Estudiante de Comunicaciones de últimos ciclos, gran iniciativa comercial.'
        },
        juniorRole: {
          title: 'Asistente de Asuntos Corporativos y PR',
          desc: 'Coordinación directa de notas de prensa, clipping diario de competidores de mercado, y soporte técnico en crisis reputacionales.',
          why: 'Serás el principal contacto operativo de periodistas y agencias de relaciones públicas del sector.',
          tools: ['Excel de Medios', 'Software de Monitoreo de Medios'],
          project: 'Lograr la publicación orgánica de 4 entrevistas a directores en los principales diarios de negocios.',
          req: 'Egresado de Comunicaciones, con 1 año de experiencia comprobada en agencias de relaciones públicas.'
        },
        specRole: {
          title: 'Gerente / Director de Asuntos Corporativos',
          desc: 'Dirección de la reputación institucional consolidada, relacionamiento gubernamental táctico y comités de manejo de crisis.',
          why: 'Protegerás la licencia social para operar de la corporación coordinando directamente con el Gerente General.',
          tools: ['Crisis Protocol Frameworks', 'Strategic Media networks'],
          project: 'Diseñar el Plan Maestro de Gestión de Crisis Reputacionales de la compañía entrenando al directorio ejecutivo.',
          req: 'Título profesional, Maestría en Reputación o Dirección de Comunicación Corporativa.'
        },
        industries: [
          { name: 'Agencias de RRPP y Medios', detail: 'Gestión hiperdinámica de cuentas de múltiples clientes, reportes continuos por resultados de publicaciones orgánicas.' },
          { name: 'Grandes Corporaciones', detail: 'Foco en la cultura corporativa de miles de empleados de planta y oficinas, relaciones públicas nacionales e impacto social (RSE).' }
        ]
      }
    ]
  }
};

// 2. MAIN DYNAMIC GRAPH GENERATION FUNCTION
export const generateDynamicGraph = (careerName: string, userStage: string, industryName?: string, customTemplate?: CareerTemplate, userPosition?: string): GraphNode[] => {
  const normCareer = careerName.trim();
  const lowerCareer = normCareer.toLowerCase();
  const normIndustry = industryName ? industryName.trim() : 'Tecnología';

  // Find exact match or keyword match in templates
  let key: string | null = null;
  if (lowerCareer.includes('admin') || lowerCareer.includes('negoc') || lowerCareer.includes('empres') || lowerCareer.includes('gestion') || lowerCareer.includes('gestión')) {
    key = 'administracion';
  } else if (lowerCareer.includes('psicol') || lowerCareer.includes('recurs') || lowerCareer.includes('rrhh') || lowerCareer.includes('talent')) {
    key = 'psicologia';
  } else if (lowerCareer.includes('indus')) {
    key = 'ingenieria_industrial';
  } else if (lowerCareer.includes('market') || lowerCareer.includes('mkt') || lowerCareer.includes('merca')) {
    key = 'marketing';
  } else if (lowerCareer.includes('inter') || lowerCareer.includes('exterior') || lowerCareer.includes('aduan')) {
    key = 'negocios_internacionales';
  } else if (lowerCareer.includes('derech') || lowerCareer.includes('ley') || lowerCareer.includes('abog') || lowerCareer.includes('complian')) {
    key = 'derecho';
  } else if (lowerCareer.includes('comunic') || lowerCareer.includes('period') || lowerCareer.includes('reputac') || lowerCareer.includes('publi')) {
    key = 'comunicaciones';
  }

  let template: CareerTemplate;

  if (customTemplate) {
    template = customTemplate;
  } else if (key && CAREER_TEMPLATES[key]) {
    template = CAREER_TEMPLATES[key];
  } else {
    // 3. SMART SEMANTIC FALLBACK GENERATOR (FOR ANY CAREER UNLIMITED Rubros!)
    template = {
      title: normCareer,
      description: `Ruta interactiva de crecimiento, habilidades técnicas y líneas de carrera especializada diseñada dinámicamente para ${normCareer}.`,
      foundations: [
        {
          title: `Metodología de Trabajo en ${normCareer}`,
          desc: `Fundamentos del ejercicio profesional, marcos normativos, ética y principios conceptuales clave que rigen tu sector laboral.`,
          tool: `Marcos Teóricos Especializados`,
          why: `Establece la rigurosidad analítica inicial requerida por las principales corporaciones del sector para el desarrollo de proyectos.`,
          project: `Elaboración de una matriz técnica comparativa de 3 metodologías aplicadas a un caso real del sector.`
        },
        {
          title: `Métodos de Análisis Cuantitativo`,
          desc: `Técnicas de análisis aplicadas, levantamiento de datos empíricos, métricas críticas y fórmulas del sector profesional.`,
          tool: `Excel Profesional`,
          why: `Evita decisiones intuitivas permitiendo que calibres e interpretes resultados mediante datos tangibles y medibles.`,
          project: `Desarrollo de un modelo de tabulación estadística para evaluar mermas o efectividad de un proceso.`
        },
        {
          title: `Habilidades de Gestión e Integridad`,
          desc: `Trabajo colaborativo, gestión documental del área profesional, cumplimiento normativo estatal de tu carrera profesional.`,
          tool: `Reglamento del Sector`,
          why: `Evita multas críticas u omisiones asegurando la salud regulatoria y administrativa de cada entregable diario.`,
          project: `Construir un checklist integral de cumplimiento legal y licencias aplicable a la empresa.`
        }
      ],
      tools: [
        {
          title: 'Excel Profesional e Indicadores',
          desc: 'Dominio de tablas dinámicas avanzadas, filtros cruzados, Power Query y dashboards visuales aplicados de gestión.',
          tool: 'Excel Avanzado',
          why: 'La habilidad más solicitada y transversal en oficinas corporativas para automatizar reportes de control del área.',
          project: 'Construir un cuadro de mando ejecutivo consolidado mensual de KPIs clave.'
        },
        {
          title: `Power BI de ${normCareer}`,
          desc: `Uso de paneles interactivos para la visualización integral de indicadores para directores de la organización corporativa.`,
          tool: `Power BI / Tableau`,
          why: `Permite visibilizar desviaciones operativas críticas del área en minutos facilitando la rápida acción correctiva gerencial.`,
          project: `Modelamiento y estructuración del dashboard interactivo mensual de resultados en Power BI.`
        },
        {
          title: 'Storytelling y Negociación de Ideas',
          desc: 'Comunicación asertiva corporativa y oratoria orientada a vender ideas comerciales o técnicas a gerentes y clientes externos.',
          tool: 'Elevator Pitch / PPT',
          why: 'Un excelente técnico que no sabe comunicar verá frecuentemente sus mejoras y solicitudes de presupuesto rechazadas.',
          project: 'Ensayo y armado de un pitch ejecutivo de 3 minutos sustentando una optimización presupuestal de área.'
        }
      ],
      areas: [
        {
          id: 'area_1',
          name: `Ruta de Planeamiento y Gestión Estratégica`,
          description: `Ramas orientadas a la optimización, dirección general, control estratégico táctico y formulación de presupuestos.`,
          why: `Permite asumir cargos directivos asumiendo la rentabilidad de las principales iniciativas organizacionales de la empresa.`,
          subareas: [
            { name: 'Control de Gestión', desc: 'Definición de KPIs generales e indicadores de desempeño de área.', tools: ['Excel', 'Power BI'], skills: 'Balanced Scorecard, OKRs.' },
            { name: 'Planeamiento Operativo', desc: 'Asignación táctica de recursos y presupuestación anual OpEx.', tools: ['Excel Pro'], skills: 'Gestión presupuestal, proyección de gastos.' }
          ],
          practiceRole: {
            title: `Practicante de Gestión Estratégica en ${normCareer}`,
            desc: `Soporte administrativo en el control presupuestario de las jefaturas, recopilación de reportes del área y archivo documental.`,
            why: `Asimilarás el lenguaje de dirección corporativo y cómo se estructuran las metas e indicadores anuales.`,
            tools: ['Excel Avanzado', 'Software de Presentación'],
            project: `Estructuración de una guía interactiva consolidada de indicadores automatizando datos de 4 meses anteriores.`,
            req: 'Estudiante de últimos ciclos de carrera, inglés intermedio-avanzado y habilidades organizativas.'
          },
          juniorRole: {
            title: `Analista Junior de Gestión de ${normCareer}`,
            desc: `Control autónomo de KPIs, elaboración de comités del área y asesoramiento directo a jefes sobre la eficiencia de costos OpEx.`,
            why: `Tu primer puesto de planilla en blanco formal con contacto directo con la gerencia para liderar el cambio diario.`,
            tools: ['Power BI dashboards', 'Enterprise ERP'],
            project: `Rediseño del modelo de reportabilidad interna del área, recortando en 15% las horas hombre de preparación de PPTs.`,
            req: 'Bachiller de la carrera profesional, 1 año en roles similares de soporte de planeamiento.'
          },
          specRole: {
            title: `Key Account Manager (KAM) / Supervisor en ${normCareer}`,
            desc: `Dirección de grandes cuentas comerciales corporativas, gestión del plan trienal consolidado e inversión CapEx estratégico.`,
            why: `Máxima valla operativa donde liderarás la inversión táctica y coordinarás directamente con los directores de la empresa.`,
            tools: ['Advanced ERP', 'Project Management Plan'],
            project: `Liderar con éxito la auditoría de procesos de recertificación general del área cerrando el contrato anual estratégico.`,
            req: 'Título profesional de la carrera, diplomado o maestría en Dirección de Negocios Corporativa.'
          },
          industries: [
            { name: 'Consumo Masivo / Comercio', detail: 'Foco en la optimización extrema del flujo de inventarios físicos y distribución ágil diaria de grandes portafolios.' },
            { name: 'Banca y Servicios Corporativos', detail: 'Modelamiento estratégico de la experiencia del cliente intangible, normatividad de seguros y rentabilidad de cartera.' }
          ]
        },
        {
          id: 'area_2',
          name: `Ruta de Operaciones, Aseguramiento y Control`,
          description: `Ramas orientadas al monitoreo diario, aseguramiento de la consistencia operativa y calidad bajo estándares regulatorios.`,
          why: `Garantiza la licencia para operar en el país de forma continua sin infracciones tributarias, operativas o ambientales.`,
          subareas: [
            { name: 'Aseguramiento de Calidad', desc: 'Auditorías internas, diseño de checklists y flujos operativos estables.', tools: ['Excel SPC'], skills: 'Normas internacionales, AMFE de procesos.' },
            { name: 'Cumplimiento Normativo (Compliance)', desc: 'Verificación legal de las directrices normativas aplicables de la industria.', tools: ['Normativa estatal'], skills: 'Auditoría de cumplimiento, manual de contingencias.' }
          ],
          practiceRole: {
            title: `Practicante de Control de Calidad / Procesos en ${normCareer}`,
            desc: `Mapeo operativo de campo, tomas de tiempos, auditorías primarias de formatos obligatorios y digitalización de checklists de control.`,
            why: `Permite comprender la realidad física operativa en campo y la vital importancia del estándar para el cliente final.`,
            tools: ['Excel', 'Mapeadores visuales'],
            project: `Mapear de punta a punta el proceso AS-IS de 3 áreas críticas detectando 2 cuellos de botella importantes.`,
            req: 'Estudiante de últimos ciclos de la carrera profesional, conocimiento teórico básico de normas de calidad.'
          },
          juniorRole: {
            title: `Analista de Aseguramiento de Calidad / Procesos en ${normCareer}`,
            desc: `Lanzamiento de planes correctivos, investigación de reclamos formales, liderazgo en implementación de normas regulatorias.`,
            why: `Asumes la firma autorizada técnica y la responsabilidad de liberar auditorías operativas diarias con autonomía.`,
            tools: ['Excel de control SPC', 'SIG Documental'],
            project: `Implementación y certificación con éxito del nuevo formato estándar de auditorías internas del área.`,
            req: 'Bachiller, con 1.5 años liderando auditorías operativas o procesos de campo.'
          },
          specRole: {
            title: `Auditor Líder / Coordinador de SIG en ${normCareer}`,
            desc: `Representación absoluta del plan nacional de certificaciones ante auditores estatales y consultores internacionales.`,
            why: `Sostendrás el estándar de marca de la empresa a gran escala garantizando la resiliencia operativa permanente.`,
            tools: ['Enterprise SIG Systems', 'Auditoría Software'],
            project: `Liderar con éxito la recertificación trienal nacional de la compañía obteniendo cero no conformidades mayores en campo.`,
            req: 'Título profesional con colegiatura activa, Diplomado Internacional de Auditor Líder Certificado.'
          },
          industries: [
            { name: 'Manufactura e Industrial', detail: 'Foco en operarios, control estadístico del peso, normas de inocuidad en planta e IPERC de prevención.' },
            { name: 'Consultoría y PMO', detail: 'Asesoramiento externo multidisciplinario para reestructuración de manuales de procesos en entidades estatales u oficinas.' }
          ]
        }
      ]
    };
  }

  // 4. ASSEMBLE GRAPH NODES BASED ON SELECTED TEMPLATE (COORDINATES INCLUDED!)
  // Ensure template has exactly 3 areas to build exactly 3 parallel swimlanes!
  // If template has 2 areas, we'll dynamically duplicate and adapt to make a 3rd area
  let areas = [...template.areas];
  const normInd = normIndustry || 'General';
  if (areas.length < 3) {
    areas.push({
      id: 'area_3',
      name: 'Ruta de Innovación y Optimización de Procesos',
      description: 'Liderazgo en proyectos de mejora continua (Lean, Six Sigma), automatización y digitalización de flujos.',
      why: 'Impulsa la rentabilidad eliminando desperdicios y agilizando la entrega de valor al cliente.',
      subareas: [
        { name: 'Optimización de Procesos', desc: 'Identificación y eliminación de desperdicios en la cadena de valor.', tools: ['Mapeo VSM', 'Kaizen'], skills: 'Metodología Lean, análisis de cuellos de botella.' },
        { name: 'Automatización Operativa', desc: 'Digitalización de controles, flujos automáticos y herramientas colaborativas.', tools: ['Power Automate', 'Sistemas Low-Code'], skills: 'Modelamiento de flujos, integraciones digitales.' }
      ],
      practiceRole: {
        title: `Practicante de Optimización y Excelencia Operativa`,
        desc: 'Mapeo de flujos de valor, soporte en talleres de mejora continua, recolección de métricas de tiempos y desperdicios.',
        why: 'Desarrollarás un ojo analítico agudo para identificar ineficiencias invisibles para otros.',
        tools: ['Excel', 'Visio / Miro'],
        project: 'Crear un tablero de control visual (Kanban digital) para el seguimiento de entregables del equipo.',
        req: 'Estudiante de últimos ciclos con alta capacidad de análisis y síntesis.'
      },
      juniorRole: {
        title: `Analista Junior de Procesos y Mejora Continua`,
        desc: 'Facilitador de proyectos Kaizen medianos, diseño e implementación de flujos optimizados TO-BE y automatización de controles.',
        why: 'Asumes el liderazgo de proyectos de eficiencia con metas cuantificables de ahorro y calidad.',
        tools: ['Power Platform', 'Minitab para Six Sigma'],
        project: 'Rediseño del flujo de aprovisionamiento, logrando una reducción del 25% en el tiempo de ciclo operativo.',
        req: 'Bachiller con certificación Yellow Belt de Six Sigma o equivalente.'
      },
      specRole: {
        title: `Supervisor de Excelencia Operativa / Black Belt`,
        desc: 'Dirección del portafolio nacional de proyectos de transformación operativa, capacitación de personal y gobernanza Lean corporativa.',
        why: 'Socio estratégico de las gerencias para liderar la reingeniería y maximizar la rentabilidad del negocio.',
        tools: ['Enterprise PMO Tools', 'Statistical Process Control'],
        project: 'Implementación del plan de transformación digital and Lean que generó un ahorro anual comprobado de $120K.',
        req: 'Título profesional, certificación Six Sigma Green o Black Belt, 3+ años en excelencia de operaciones.'
      },
      industries: [
        { name: normInd, detail: 'Aplicación de filosofías ágiles y Lean adaptadas a los estándares específicos del sector.' }
      ]
    });
  }

  // Double-check we have exactly 3 areas to draw 3 lanes
  areas = areas.slice(0, 3);

  const nodes: GraphNode[] = [];

  // CENTER Y FOR THE 3 SWIMLANES (Row 1, Row 2, Row 3)
  const rowY = [240, 780, 1320];

  const isEstudiante = userStage.toLowerCase().includes('estudiante');
  const startX = isEstudiante ? 940 : 150;
  const spacingX = 280;

  const hasPosition = typeof userPosition === 'string' && userPosition.trim().length > 0;
  const shouldActivateAlternatives = hasPosition || (userStage !== 'estudiante' && userStage !== 'egresado');

  // Identify stage type dynamically
  const isPractices = 
    userStage.toLowerCase().includes('practicante') || 
    userStage.toLowerCase().includes('estudiante') || 
    (hasPosition && (
      userPosition.toLowerCase().includes('practic') || 
      userPosition.toLowerCase().includes('intern') || 
      userPosition.toLowerCase().includes('becari') || 
      userPosition.toLowerCase().includes('trainee') || 
      userPosition.toLowerCase().includes('auxiliar')
    ));

  const isJuniorOrHigher = 
    userStage.toLowerCase().includes('junior') || 
    userStage.toLowerCase().includes('analyst') || 
    userStage.toLowerCase().includes('specialist') || 
    (hasPosition && (
      userPosition.toLowerCase().includes('junior') || 
      userPosition.toLowerCase().includes('analista') || 
      userPosition.toLowerCase().includes('analyst') || 
      userPosition.toLowerCase().includes('specialist') || 
      userPosition.toLowerCase().includes('especialista') || 
      userPosition.toLowerCase().includes('asistente') || 
      userPosition.toLowerCase().includes('coordinador') || 
      userPosition.toLowerCase().includes('supervisor') || 
      userPosition.toLowerCase().includes('jefe') || 
      userPosition.toLowerCase().includes('gerente')
    ));

  // Add Student/University Nodes if the stage is 'estudiante'
  if (isEstudiante) {
    // 1. Carrera Base (Academic Center Node)
    nodes.push({
      id: 'dynamic-base',
      title: template.title || careerName,
      type: 'base',
      priority: 'obligatorio',
      status: 'en_progreso',
      level: 'base',
      description: template.description,
      whyItMatters: `Es la base formativa universitaria o técnica de pregrado sobre la cual estructurarás tus especializaciones y áreas de práctica.`,
      relatedJobs: areas.map(a => a.practiceRole.title),
      relatedTools: [],
      route: 'base',
      dependencies: [],
      x: 120,
      y: rowY[1],
      howToDevelop: `La base académica de tu carrera profesional de pregrado. Mantén un promedio ponderado alto para facilitar accesos a convenios corporativos.`
    });

    // 2. Fundamentos and 3. Herramientas de Universidad
    for (let fIdx = 0; fIdx < 3; fIdx++) {
      const found = template.foundations[fIdx];
      const foundId = `foundation-${fIdx + 1}`;
      if (found) {
        nodes.push({
          id: foundId,
          title: found.title,
          type: 'tecnico',
          priority: 'obligatorio',
          status: 'no_iniciado',
          level: 'fundamento',
          description: found.desc,
          whyItMatters: found.why,
          relatedJobs: [areas[fIdx].practiceRole.title],
          relatedTools: [found.tool],
          suggestedProject: found.project,
          route: `area_${fIdx + 1}`,
          dependencies: ['dynamic-base'],
          x: 380,
          y: rowY[fIdx],
          howToDevelop: `Asimila la base conceptual en tus asignaturas universitarias y profundiza de forma autónoma redactando el proyecto académico sugerido.`
        });
      }

      const tTool = template.tools[fIdx];
      const toolId = `university-tool-${fIdx + 1}`;
      if (tTool) {
        nodes.push({
          id: toolId,
          title: tTool.title,
          type: 'herramienta',
          priority: 'obligatorio',
          status: 'no_iniciado',
          level: 'herramienta',
          description: tTool.desc,
          whyItMatters: tTool.why,
          relatedJobs: [areas[fIdx].practiceRole.title],
          relatedTools: [tTool.tool],
          suggestedProject: tTool.project,
          route: `area_${fIdx + 1}`,
          dependencies: [foundId],
          x: 640,
          y: rowY[fIdx],
          howToDevelop: `Domina el software clave con proyectos de aplicación práctica. El mercado laboral de hoy valora el saber-hacer sobre el saber-teórico.`
        });
      }
    }
  }

  areas.forEach((area, aIdx) => {
    const yCenter = rowY[aIdx];
    const areaIdPrefix = `row-${aIdx + 1}`;

    const col1_X = startX;
    const col2_X = startX + spacingX;
    const col3_X = startX + spacingX * 2;
    const col4_X = startX + spacingX * 3;
    const col5_X = startX + spacingX * 4;
    const col6_X = startX + spacingX * 5;
    const col7_X = startX + spacingX * 6;

    // COLUMN 1: Starting point (Prácticas)
    const startTitle = area.practiceRole.title;
    const startId = `${areaIdPrefix}-start`;
    nodes.push({
      id: startId,
      title: startTitle,
      type: 'práctica',
      priority: 'obligatorio',
      status: aIdx === 0 ? 'en_progreso' : 'no_iniciado',
      level: 'práctica',
      description: area.practiceRole.desc,
      whyItMatters: area.practiceRole.why,
      relatedJobs: [area.juniorRole.title],
      relatedTools: area.practiceRole.tools,
      suggestedProject: area.practiceRole.project,
      route: `area_${aIdx + 1}`,
      dependencies: isEstudiante ? [`university-tool-${aIdx + 1}`] : [],
      x: col1_X,
      y: yCenter,
      practicePrepTools: area.practiceRole.tools,
      requiredTechSkills: area.practiceRole.tools.join(', ') + ' y asimilación de los estándares operativos.',
      requiredSoftSkills: 'Iniciativa proactiva, comunicación asertiva y alta capacidad de aprendizaje rápido.',
      howToDevelop: `Para destacar en este rol:\n1. Certifícate en las herramientas digitales del área: **${area.practiceRole.tools.join(', ')}**.\n2. Completa de manera autónoma el Proyecto de CV: **${area.practiceRole.project}**.`
    });

    // COLUMN 2: 4 parallel Skill/Tool nodes (or 3 nodes for Row 2)
    const numSkills = aIdx === 1 ? 3 : 4; 
    const skillNodeIds = [];
    const baseTools = [...area.practiceRole.tools, ...area.subareas.flatMap(s => s.tools)];
    const uniqueTools = Array.from(new Set(baseTools)).slice(0, numSkills);

    const skillTitles = [
      `Dominio en ${uniqueTools[0] || 'Herramientas Base'}`,
      `Gestión de ${area.subareas[0]?.name || 'Procesos'}`,
      `Habilidades de Integración`,
      `Estándares de Compliance`
    ];

    const skillTypes = ['herramienta', 'tecnico', 'blanda', 'tecnico'] as const;

    for (let sIdx = 0; sIdx < numSkills; sIdx++) {
      const skillId = `${areaIdPrefix}-skill-${sIdx + 1}`;
      skillNodeIds.push(skillId);

      const offsetFactor = (numSkills - 1) / 2;
      const skillY = yCenter + (sIdx - offsetFactor) * 130;

      nodes.push({
        id: skillId,
        title: skillTitles[sIdx] || `Habilidad Técnica Clave ${sIdx + 1}`,
        type: skillTypes[sIdx] || 'tecnico',
        priority: 'obligatorio',
        status: 'no_iniciado',
        level: 'fundamento',
        description: `Dominio práctico fundamental requerido para habilitar el ascenso y la consistencia en el rol de ${startTitle}.`,
        whyItMatters: `Esta competencia reduce el tiempo de adaptación en el área y es altamente valorada en las evaluaciones de desempeño de la industria de ${normInd}.`,
        relatedJobs: [area.juniorRole.title],
        relatedTools: [uniqueTools[sIdx] || 'Software'],
        route: `area_${aIdx + 1}`,
        dependencies: [startId],
        x: col2_X,
        y: skillY,
        howToDevelop: `1. Revisa guías operacionales del sector para **${skillTitles[sIdx]}**.\n2. Diseña soluciones simuladas utilizando las herramientas sugeridas: **${uniqueTools[sIdx] || 'Excel'}**.`
      });
    }

    // COLUMN 3: Intermediate parallel roles (Fully dynamic, only for Practices stage)
    const interNodeIds = [];
    if (shouldActivateAlternatives && isPractices) {
      // Vary number of roles: Row 1 has 3, Row 2 has 2, Row 3 has 3
      const numInter = aIdx === 1 ? 2 : 3;
      
      const sub1 = area.subareas[0]?.name || 'Especialidad Principal';
      const sub2 = area.subareas[1]?.name || 'Control Táctico';
      
      const interTitles: string[] = [];
      const interTypes: ('junior' | 'práctica')[] = [];
      
      if (userStage === 'practicante_pro') {
        // Graduate: Early junior or professional internships
        if (aIdx === 0) {
          interTitles.push(`Junior de ${sub1}`);
          interTypes.push('junior');
          interTitles.push(`Practicante Profesional de ${area.name}`);
          interTypes.push('práctica');
          interTitles.push(`Asistente de ${sub2}`);
          interTypes.push('junior');
        } else if (aIdx === 1) {
          interTitles.push(`Asistente Junior de ${sub1}`);
          interTypes.push('junior');
          interTitles.push(`Practicante Profesional de ${sub2}`);
          interTypes.push('práctica');
        } else {
          interTitles.push(`Junior de Optimización de ${sub1}`);
          interTypes.push('junior');
          interTitles.push(`Trainee Profesional de ${area.name}`);
          interTypes.push('práctica');
          interTitles.push(`Asistente Técnico de ${sub2}`);
          interTypes.push('junior');
        }
      } else {
        // Undergraduate Student / Practicante Pre: mostly pre-professional internships
        if (aIdx === 0) {
          interTitles.push(`Practicante de ${sub1}`);
          interTypes.push('práctica');
          interTitles.push(`Auxiliar de Gestión de ${sub2}`);
          interTypes.push('práctica');
          interTitles.push(`Junior de Operaciones en ${area.name}`);
          interTypes.push('junior');
        } else if (aIdx === 1) {
          interTitles.push(`Practicante de ${sub1}`);
          interTypes.push('práctica');
          interTitles.push(`Auxiliar de Calidad de ${sub2}`);
          interTypes.push('práctica');
        } else {
          interTitles.push(`Practicante de Optimización de ${sub1}`);
          interTypes.push('práctica');
          interTitles.push(`Trainee de Procesos en ${area.name}`);
          interTypes.push('práctica');
          interTitles.push(`Asistente de Soporte de ${sub2}`);
          interTypes.push('junior');
        }
      }
      
      for (let iIdx = 0; iIdx < numInter; iIdx++) {
        const interIdStr = `${areaIdPrefix}-inter-${iIdx + 1}`;
        interNodeIds.push(interIdStr);
        
        const offsetFactor = (numInter - 1) / 2;
        const interY = yCenter + (iIdx - offsetFactor) * 130;
        
        nodes.push({
          id: interIdStr,
          title: interTitles[iIdx] || `Puesto Alternativo ${iIdx + 1}`,
          type: interTypes[iIdx] || 'práctica',
          priority: 'recomendado',
          status: 'no_iniciado',
          level: interTypes[iIdx] === 'junior' ? 'junior' : 'práctica',
          description: `Una excelente alternativa de inserción inicial en la ruta de ${area.name}, brindando flexibilidad de postulación.`,
          whyItMatters: `Amplía tu espectro de búsqueda laboral en la industria de ${normInd}, permitiéndote postular de forma diversificada.`,
          relatedJobs: [area.juniorRole.title],
          relatedTools: area.juniorRole.tools,
          route: `area_${aIdx + 1}`,
          dependencies: skillNodeIds, 
          x: col3_X,
          y: interY,
          howToDevelop: `Domina el set de competencias clave del área y mantén abiertas postulaciones tanto para vacantes de practicante profesional como para analista junior.`
        });
      }
    }

    // COLUMN 4: Converged Junior Role (Junior)
    const juniorId = `${areaIdPrefix}-junior`;
    const juniorDeps = interNodeIds.length > 0 ? interNodeIds : skillNodeIds;

    nodes.push({
      id: juniorId,
      title: area.juniorRole.title,
      type: 'junior',
      priority: 'obligatorio',
      status: 'no_iniciado',
      level: 'junior',
      description: area.juniorRole.desc,
      whyItMatters: area.juniorRole.why,
      relatedJobs: [area.specRole.title],
      relatedTools: area.juniorRole.tools,
      suggestedProject: area.juniorRole.project,
      route: `area_${aIdx + 1}`,
      dependencies: juniorDeps,
      x: col4_X,
      y: yCenter,
      requiredTechSkills: area.juniorRole.tools.join(', ') + ' y control autónomo de reportes operacionales del área.',
      requiredSoftSkills: 'Solución ágil de problemas, adaptabilidad al cambio, comunicación ejecutiva y asimilación de feedback correctivo.',
      howToDevelop: `Completa satisfactoriamente el ciclo inicial de prácticas, asume la responsabilidad directa de la auditoría de métricas de desempeño y domina: **${area.juniorRole.tools.join(', ')}**.`
    });

    // COLUMN 5: 4 parallel Skill/Tool nodes for Senior
    const numSeniorSkills = 4;
    const seniorSkillIds = [];
    const seniorTools = area.specRole.tools || [];

    const seniorSkillTitles = [
      `Liderazgo y Gobernanza de Equipos`,
      `Control Presupuestario CapEx/OpEx`,
      `Modelamiento Complejo en ${seniorTools[0] || 'Software Enterprise'}`,
      `Gestión Estratégica de Riesgos`
    ];

    for (let ssIdx = 0; ssIdx < numSeniorSkills; ssIdx++) {
      const ssId = `${areaIdPrefix}-senior-skill-${ssIdx + 1}`;
      seniorSkillIds.push(ssId);

      const ssY = yCenter + (ssIdx - 1.5) * 130;

      nodes.push({
        id: ssId,
        title: seniorSkillTitles[ssIdx],
        type: ssIdx === 1 ? 'tecnico' : ssIdx === 0 ? 'blanda' : 'herramienta',
        priority: 'obligatorio',
        status: 'no_iniciado',
        level: 'especialización',
        description: `Competencia directiva o técnica compleja indispensable para ejercer influencia estratégica en mandos medios y superiores.`,
        whyItMatters: `Los directores de las grandes corporaciones priorizan perfiles que no solo sean fuertes técnicamente, sino que lideren proyectos de alto impacto financiero.`,
        relatedJobs: [area.specRole.title],
        relatedTools: [seniorTools[ssIdx % seniorTools.length] || 'Metodología'],
        route: `area_${aIdx + 1}`,
        dependencies: [juniorId],
        x: col5_X,
        y: ssY,
        howToDevelop: `1. Asume la dirección de comités internos o iniciativas piloto.\n2. Capacítate formalmente en gestión presupuestaria y negociación comercial.`
      });
    }

    // COLUMN 6: Study or additional certificate (Estudio o certificado adicional)
    const studyId = `${areaIdPrefix}-study`;
    nodes.push({
      id: studyId,
      title: `Especialización o Certificación Adicional`,
      type: 'rama',
      priority: 'recomendado',
      status: 'no_iniciado',
      level: 'especialización',
      description: `Especialización de postgrado, credenciales profesionales o maestrías recomendadas para convalidar experiencia y acelerar el ascenso a roles de confianza.`,
      whyItMatters: `Brinda el respaldo académico indispensable para justificar tu nombramiento en roles directivos y licitaciones internacionales del negocio.`,
      relatedJobs: [area.specRole.title],
      relatedTools: ['Postgrados', 'PMBOK / Agile'],
      route: `area_${aIdx + 1}`,
      dependencies: seniorSkillIds,
      x: col6_X,
      y: yCenter,
      howToDevelop: `Investiga y planifica tu postulación a diplomados en Dirección de Negocios, Maestrías de Operaciones o certificaciones internacionales afines (PMP, Six Sigma Black Belt).`
    });

    // COLUMN 6 ALTERNATIVES: Advanced parallel roles (Only for Junior/Analyst/Specialist stage)
    const interSeniorNodeIds: string[] = [];
    if (shouldActivateAlternatives && isJuniorOrHigher) {
      const sub1 = area.subareas[0]?.name || 'Especialidad Avanzada';
      const sub2 = area.subareas[1]?.name || 'Control Directivo';
      
      const seniorTitles: string[] = [];
      if (aIdx === 0) {
        seniorTitles.push(`Coordinador de ${sub1}`);
        seniorTitles.push(`Analista Senior de ${sub2}`);
      } else if (aIdx === 1) {
        seniorTitles.push(`Especialista en ${sub1}`);
        seniorTitles.push(`Consultor Senior de ${area.name}`);
      } else {
        seniorTitles.push(`Líder de Proyecto de ${sub1}`);
        seniorTitles.push(`Supervisor Regional de ${area.name}`);
      }
      
      for (let sIdx = 0; sIdx < 2; sIdx++) {
        const ssIdStr = `${areaIdPrefix}-inter-senior-${sIdx + 1}`;
        interSeniorNodeIds.push(ssIdStr);
        
        // Offset Y: Alternative 1 at -130, Alternative 2 at +130
        const ssY = yCenter + (sIdx === 0 ? -130 : 130);
        
        nodes.push({
          id: ssIdStr,
          title: seniorTitles[sIdx] || `Puesto Avanzado Alternativo ${sIdx + 1}`,
          type: 'especialización',
          priority: 'recomendado',
          status: 'no_iniciado',
          level: 'especialización',
          description: `Una excelente alternativa de desarrollo avanzado en la línea de ${area.name}, liderando proyectos clave y aportando valor estratégico.`,
          whyItMatters: `Amplía tu techo profesional y te capacita para asumir responsabilidades de liderazgo dentro de la industria de ${normInd}.`,
          relatedJobs: [area.specRole.title],
          relatedTools: area.specRole.tools,
          route: `area_${aIdx + 1}`,
          dependencies: seniorSkillIds,
          x: col6_X,
          y: ssY,
          howToDevelop: `Consolida tu experiencia en el rol previo y prepárate en habilidades de liderazgo y toma de decisiones de alto impacto corporativo.`
        });
      }
    }

    // COLUMN 7: Senior Role
    const seniorId = `${areaIdPrefix}-senior`;
    const seniorDeps = [studyId, ...interSeniorNodeIds];
    nodes.push({
      id: seniorId,
      title: area.specRole.title,
      type: 'especialización',
      priority: 'obligatorio',
      status: 'no_iniciado',
      level: 'especialización',
      description: area.specRole.desc,
      whyItMatters: area.specRole.why,
      relatedJobs: [`Gerente de Área de ${area.name}`, `Consultor Senior Independiente`],
      relatedTools: area.specRole.tools,
      suggestedProject: area.specRole.project,
      route: `area_${aIdx + 1}`,
      dependencies: seniorDeps,
      x: col7_X,
      y: yCenter,
      requiredTechSkills: area.specRole.tools.join(', ') + ' y liderazgo absoluto de licitaciones o recertificaciones corporativas de gran escala.',
      requiredSoftSkills: 'Liderazgo asertivo e inspirador, negociación corporativa de alto impacto, resiliencia ejecutiva y adaptabilidad ante escenarios inciertos.',
      howToDevelop: `Acumula de 3 a 5 años de experiencia sénior en el sector, lidera con éxito la reestructuración de procesos de área y consolida tu postgrado o maestría especializada.`
    });
  });

  return nodes;
};


// PRESERVE Chemical Engineering prototype static database matching initial schema
export const INGENIERIA_QUIMICA_GRAPH: GraphNode[] = generateDynamicGraph('Ingeniería Química', 'estudiante');
