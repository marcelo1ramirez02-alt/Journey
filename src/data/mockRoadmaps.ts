import { RoadmapData, ComparisonCardData } from '../types';

export const mockRoadmaps: Record<string, RoadmapData> = {
  administracion: {
    careerId: 'administracion',
    careerName: 'Administración de Empresas',
    description: 'Orientada a la gestión, planificación estratégica y optimización de recursos en organizaciones de todo tamaño y sector.',
    commonBases: [
      {
        title: 'Excel Profesional',
        description: 'Fórmulas avanzadas, tablas dinámicas y macros básicas para el análisis de presupuestos y reportes.',
        skills: ['Tablas Dinámicas', 'BuscarV / XLookup', 'Gráficos Financieros', 'Formatos Condicionales']
      },
      {
        title: 'Comunicación Profesional',
        description: 'Habilidades de negociación, presentaciones de alto impacto y comunicación escrita asertiva.',
        skills: ['Presentaciones Ejecutivas', 'Oratoria', 'Redacción de Reportes', 'Negociación']
      },
      {
        title: 'Gestión de Proyectos',
        description: 'Fundamentos para planificar, ejecutar y monitorear proyectos organizacionales bajo metodologías ágiles.',
        skills: ['Metodología Scrum', 'Gantt / Trello', 'Presupuestación', 'Mitigación de Riesgos']
      },
      {
        title: 'Análisis de Datos',
        description: 'Transformación de datos crudos en insights accionables para la toma de decisiones empresariales.',
        skills: ['Power BI básico', 'Limpieza de Datos', 'KPIs de Negocio', 'Storytelling con Datos']
      },
      {
        title: 'Inglés Profesional',
        description: 'Capacidad de entablar negociaciones, responder correos y participar en reuniones internacionales.',
        skills: ['Business English', 'Vocabulario Corporativo', 'Redacción de Emails', 'Presentaciones en Inglés']
      }
    ],
    areas: [
      {
        name: 'Finanzas',
        description: 'Gestión del capital, inversiones, presupuestos y control de costos para maximizar el valor de la empresa.',
        subareas: ['Tesorería', 'Control de Gestión', 'Evaluación de Proyectos', 'Contabilidad Corporativa', 'Banca de Inversión'],
        skills: ['Estados Financieros', 'Power BI', 'Valorización de Empresas', 'Flujo de Caja'],
        demand: 'Alta',
        salary: 'S/ 1,800 - S/ 3,500'
      },
      {
        name: 'Marketing',
        description: 'Estudio de mercados, posicionamiento de marca y generación de estrategias comerciales digitales y offline.',
        subareas: ['Social Media', 'Trade Marketing', 'Brand Marketing', 'Growth Marketing', 'Marketing Analytics'],
        skills: ['SEO/SEM', 'Google Analytics', 'Estrategia de Contenidos', 'Investigación de Mercados'],
        demand: 'Alta',
        salary: 'S/ 1,500 - S/ 3,000'
      },
      {
        name: 'Recursos Humanos',
        description: 'Atracción, desarrollo y retención del talento humano, asegurando un clima y cultura organizacional óptimos.',
        subareas: ['Atracción de Talento', 'Clima y Cultura', 'Capacitación', 'Compensaciones y Beneficios', 'Legislación Laboral'],
        skills: ['Diseño de Perfiles', 'Evaluaciones de Desempeño', 'Soft Skills', 'Dinámicas de Grupo'],
        demand: 'Media',
        salary: 'S/ 1,600 - S/ 2,800'
      },
      {
        name: 'Operaciones',
        description: 'Planificación de la producción, supervisión de procesos de entrega de servicios y control de inventarios.',
        subareas: ['Gestión de Compras', 'Administración de Tiendas / Sedes', 'Control de Calidad', 'Mejora Continua'],
        skills: ['Mapeo de Procesos', 'KPIs de Eficiencia', 'Gestión de Inventario', 'Soporte al Cliente'],
        demand: 'Alta',
        salary: 'S/ 1,700 - S/ 3,200'
      },
      {
        name: 'Estrategia',
        description: 'Dirección a largo plazo, fusiones y adquisiciones, planeamiento estratégico y desarrollo de nuevos negocios.',
        subareas: ['Consultoría de Negocios', 'Planeamiento Estratégico', 'Nuevos Negocios', 'Transformación Digital'],
        skills: ['Matriz FODA / PESTEL', 'Modelos de Negocio (Canvas)', 'OKR Framework', 'Análisis de Competencia'],
        demand: 'Media',
        salary: 'S/ 2,000 - S/ 4,000'
      }
    ],
    careerLine: [
      {
        title: 'Practicante de Administración',
        salary: 'S/ 1,025 - S/ 1,500',
        experienceNeeded: 'Ninguna (Ciclos intermedios-avanzados)',
        description: 'Soporte operativo, ingreso de datos, control documental básico y apoyo en la elaboración de reportes en Excel.'
      },
      {
        title: 'Asistente de Área',
        salary: 'S/ 1,600 - S/ 2,500',
        experienceNeeded: '6 meses - 1 año',
        description: 'Coordinación diaria con proveedores u otras áreas, gestión de agendas, control presupuestal primario y análisis inicial de KPIs.'
      },
      {
        title: 'Analista de Negocio / Especialista',
        salary: 'S/ 2,800 - S/ 4,500',
        experienceNeeded: '2 - 4 años',
        description: 'Responsable de la toma de decisiones basada en datos, diseño de procesos eficientes y manejo directo de tableros de control (Power BI).'
      },
      {
        title: 'Coordinador / Supervisor',
        salary: 'S/ 4,800 - S/ 7,000',
        experienceNeeded: '4 - 6 años',
        description: 'Liderazgo de equipos pequeños de analistas, rendición de cuentas sobre objetivos de área, negociación de alto nivel y diseño estratégico táctico.'
      },
      {
        title: 'Gerente / Manager de Área',
        salary: 'S/ 8,000 - S/ 15,000+',
        experienceNeeded: '7+ años',
        description: 'Planificación estratégica integral, gestión directa del P&L (pérdidas y ganancias) del área, reporte al directorio y desarrollo de talento clave.'
      }
    ]
  },
  ingenieria_industrial: {
    careerId: 'ingenieria_industrial',
    careerName: 'Ingeniería Industrial',
    description: 'Enfocada en el diseño, mejora e integración de sistemas productivos, logísticos y administrativos para elevar la eficiencia operativa.',
    commonBases: [
      {
        title: 'Gestión de Procesos (BPM)',
        description: 'Mapeo, documentación, modelado y optimización de procesos de negocio utilizando diagramas de flujo y estándares.',
        skills: ['Bizagi Modeler', 'Diagramas de Flujo', 'Cuellos de Botella', 'Tiempos y Movimientos']
      },
      {
        title: 'Metodologías Ágiles (Scrum)',
        description: 'Gestión de proyectos dinámicos reduciendo desperdicios y agilizando la entrega de valor.',
        skills: ['Scrum Master', 'Sprints', 'Historias de Usuario', 'Kanban Board']
      },
      {
        title: 'Excel Avanzado',
        description: 'Dominio de fórmulas complejas, macros programables en VBA y automatizaciones de reportes de planta.',
        skills: ['VBA Macros', 'Power Query', 'Modelado de Datos', 'Solver para Optimización']
      },
      {
        title: 'Power BI & SQL',
        description: 'Creación de dashboards de control industrial y consultas de bases de datos de producción.',
        skills: ['Consultas SQL', 'DAX Avanzado', 'Modelos Estrella', 'Métricas de Productividad']
      },
      {
        title: 'Inglés Técnico',
        description: 'Comprensión de patentes, manuales de maquinaria, metodologías globales de mejora continua y normas ISO.',
        skills: ['Lean Six Sigma Terms', 'Normas ISO en Inglés', 'Terminología Logística', 'Presentación de Resultados']
      }
    ],
    areas: [
      {
        name: 'Operaciones',
        description: 'Planificación de la capacidad de planta, programación de la producción y optimización de recursos físicos.',
        subareas: ['Planificación de la Producción (PCP)', 'Gestión de Planta', 'Mantenimiento de Activos', 'Ergonomía Industrial'],
        skills: ['OEE Metric', 'Programación Lineal', 'Balance de Línea', 'SAP PP / ERP'],
        demand: 'Alta',
        salary: 'S/ 1,800 - S/ 3,600'
      },
      {
        name: 'Logística & SCM',
        description: 'Flujo de materias primas y productos terminados desde proveedores hasta el cliente final.',
        subareas: ['Gestión de Almacenes', 'Compras y Abastecimiento', 'Distribución y Transporte', 'Planeamiento de Demanda', 'Comercio Exterior'],
        skills: ['Rotación de Inventarios', 'Kardex electrónico', 'Incoterms', 'Ruteo y Flotas'],
        demand: 'Alta',
        salary: 'S/ 1,900 - S/ 3,800'
      },
      {
        name: 'Gestión de Calidad',
        description: 'Asegurar que los productos y servicios cumplan con los estándares requeridos y regulaciones internacionales.',
        subareas: ['Mejora Continua (Lean)', 'Control de Calidad (SPC)', 'Certificaciones ISO', 'Auditoría de Procesos'],
        skills: ['Metodología 5S', 'Diagramas Ishikawa', 'Six Sigma (DMAIC)', 'Norma ISO 9001'],
        demand: 'Alta',
        salary: 'S/ 1,700 - S/ 3,200'
      },
      {
        name: 'Seguridad y Salud (SST)',
        description: 'Prevención de accidentes, cumplimiento de normativas de seguridad ocupacional y cuidado del medio ambiente.',
        subareas: ['Matriz IPERC', 'Planes de Contingencia', 'Auditoría de Seguridad', 'Gestión Ambiental (ISO 14001)'],
        skills: ['Primeros Auxilios', 'Normas de Seguridad', 'EPPs', 'Investigación de Incidentes'],
        demand: 'Media',
        salary: 'S/ 1,600 - S/ 3,000'
      },
      {
        name: 'Consultoría de Negocios',
        description: 'Asesoría externa para el rediseño de estructuras organizacionales y optimización de procesos operativos generales.',
        subareas: ['Reingeniería de Procesos', 'Finanzas Operativas', 'Gestión del Cambio', 'PMO (Project Management)'],
        skills: ['Design Thinking', 'Business Case Creation', 'Arquitectura de Procesos', 'Mapeo AS-IS / TO-BE'],
        demand: 'Media',
        salary: 'S/ 2,200 - S/ 4,500'
      }
    ],
    careerLine: [
      {
        title: 'Practicante de Procesos / Logística',
        salary: 'S/ 1,025 - S/ 1,500',
        experienceNeeded: 'Ninguna',
        description: 'Toma de tiempos, actualización de kpis en Excel, soporte en inventarios físicos y documentación de manuales de procesos.'
      },
      {
        title: 'Asistente de Operaciones / Planta',
        salary: 'S/ 1,800 - S/ 2,600',
        experienceNeeded: '6 meses - 1 año',
        description: 'Control diario de producción, seguimiento a órdenes de compra, control presupuestal de mantenimiento y reporte de desperdicios.'
      },
      {
        title: 'Analista de Procesos / Supply Chain',
        salary: 'S/ 3,000 - S/ 4,800',
        experienceNeeded: '2 - 3 años',
        description: 'Diseño de tableros BI, modelado de procesos en Bizagi, identificación de cuellos de botella y propuesta de mejoras Lean Six Sigma.'
      },
      {
        title: 'Especialista / Coordinador de Operaciones',
        salary: 'S/ 5,000 - S/ 7,500',
        experienceNeeded: '4 - 6 años',
        description: 'Liderazgo de proyectos de mejora de procesos a nivel de planta, auditor de calidad, contacto estratégico con operadores logísticos y manejo de equipos.'
      },
      {
        title: 'Gerente de Planta / Supply Chain Manager',
        salary: 'S/ 9,000 - S/ 18,000+',
        experienceNeeded: '7+ años',
        description: 'Alineamiento operativo al plan financiero estratégico global, negociaciones corporativas internacionales de compra, y optimización integral de la rentabilidad física.'
      }
    ]
  },
  marketing: {
    careerId: 'marketing',
    careerName: 'Marketing',
    description: 'Orientado a entender al consumidor, posicionar marcas de manera única y generar demanda sostenible a través de canales tradicionales y digitales.',
    commonBases: [
      {
        title: 'Redacción Creativa',
        description: 'Dominio de técnicas de storytelling y persuasión escrita adaptadas a diferentes audiencias.',
        skills: ['Copywriting', 'Estructuras de Persuasión', 'Tono de Voz', 'Adaptabilidad de Canales']
      },
      {
        title: 'SEO Básico & Estructura Web',
        description: 'Optimización de contenido para motores de búsqueda, logrando posicionamiento orgánico inicial.',
        skills: ['Keyword Research', 'On-Page SEO', 'Meta Tags', 'Google Search Console']
      },
      {
        title: 'Marketing Analytics',
        description: 'Uso de métricas para evaluar la conversión, retorno de inversión (ROI) y embudos de marketing.',
        skills: ['Google Analytics 4', 'Embudos de Conversión', 'UTM Tracking', 'Fórmulas Básicas en Excel']
      },
      {
        title: 'Gestión de Campañas',
        description: 'Fundamentos de pauta digital en las principales plataformas de anuncios pagos.',
        skills: ['Meta Ads Manager', 'Google Ads', 'Presupuestos de Campaña', 'Diseño de Audiencias']
      },
      {
        title: 'Inglés Creativo',
        description: 'Acceso a las últimas tendencias en publicidad global, copias para mercados internacionales y workshops.',
        skills: ['Creative Copy en Inglés', 'Análisis de Tendencias', 'Presentación de Pitching', 'Global Case Studies']
      }
    ],
    areas: [
      {
        name: 'Growth Marketing',
        description: 'Crecimiento acelerado enfocado en todo el embudo de ventas mediante experimentación rápida de producto y marketing.',
        subareas: ['Adquisición', 'Retención', 'Optimización de Conversión (CRO)', 'Email Marketing', 'A/B Testing'],
        skills: ['Embudo AARRR', 'Herramientas CRO', 'Growth Hacking', 'Psicología de Conversión'],
        demand: 'Alta',
        salary: 'S/ 1,800 - S/ 3,500'
      },
      {
        name: 'Brand Management',
        description: 'Estrategia de posicionamiento de marca, reputación corporativa y alineamiento del portafolio de productos.',
        subareas: ['Trade Marketing', 'Investigación de Mercados', 'Lanzamiento de Productos', 'Relaciones Públicas'],
        skills: ['Storytelling de Marca', 'Focus Groups', 'Presupuesto de Campañas Masivas', 'Identidad de Marca'],
        demand: 'Alta',
        salary: 'S/ 1,600 - S/ 3,200'
      },
      {
        name: 'Product Marketing (PMM)',
        description: 'Alineación de las necesidades del mercado con el desarrollo de productos digitales o físicos.',
        subareas: ['Market Fit Analysis', 'Sales Enablement', 'Estrategia de Pricing', 'Customer Journey Mapping'],
        skills: ['User Persona Mapping', 'Competitor Intelligence', 'Product Roadmap alignment', 'Mensajes Clave'],
        demand: 'Alta',
        salary: 'S/ 2,000 - S/ 4,000'
      },
      {
        name: 'Performance & Paid Media',
        description: 'Especialización en compra de tráfico pago con objetivos estrictos de conversión y rentabilidad.',
        subareas: ['Search Engine Marketing (SEM)', 'Social Ads', 'Programmatic Advertising', 'Performance Analytics'],
        skills: ['Meta Ads Avanzado', 'Google Search & Display Ads', 'Retargeting', 'Atribución de Canales'],
        demand: 'Alta',
        salary: 'S/ 1,700 - S/ 3,400'
      },
      {
        name: 'Content & Social Media',
        description: 'Construcción y fidelización de comunidades digitales mediante contenido de alto valor y engagement.',
        subareas: ['Community Management', 'Marketing de Influencers', 'Video Production (TikTok/Reels)', 'Estrategia SEO de Contenido'],
        skills: ['Planificación Editorial', 'Edición de Video', 'Monitoreo de Menciones', 'Estrategia de Engagement'],
        demand: 'Alta',
        salary: 'S/ 1,400 - S/ 2,600'
      }
    ],
    careerLine: [
      {
        title: 'Practicante de Marketing / Redes Sociales',
        salary: 'S/ 1,025 - S/ 1,400',
        experienceNeeded: 'Ninguna',
        description: 'Creación de grillas de contenidos, redacción de copias sencillos, monitoreo de redes y soporte en reportes semanales de interacción.'
      },
      {
        title: 'Asistente de Marketing / Growth',
        salary: 'S/ 1,500 - S/ 2,300',
        experienceNeeded: '6 meses - 1 año',
        description: 'Carga de campañas en Meta Ads, redacción de artículos SEO, coordinación con diseñadores gráficos y análisis de KPIs de conversión diarios.'
      },
      {
        title: 'Analista de Marca / Growth / Performance',
        salary: 'S/ 2,500 - S/ 4,200',
        experienceNeeded: '2 - 3 años',
        description: 'Gestión directa de presupuestos de pauta digital, optimización del costo por adquisición (CPA), diseño de experimentos A/B y reportes en Google Analytics.'
      },
      {
        title: 'Coordinador de Marketing / Brand Lead',
        salary: 'S/ 4,500 - S/ 6,800',
        experienceNeeded: '4 - 6 años',
        description: 'Liderazgo de equipos creativos y técnicos, planificación del calendario anual de campañas, relacionamiento con agencias de publicidad externas.'
      },
      {
        title: 'Brand Manager / Chief Marketing Officer (CMO)',
        salary: 'S/ 8,000 - S/ 16,000+',
        experienceNeeded: '7+ años',
        description: 'Definición de la estrategia general de marca del negocio, toma de decisiones sobre presupuestos corporativos millonarios, y análisis estratégico del ROI global.'
      }
    ]
  },
  psicologia: {
    careerId: 'psicologia',
    careerName: 'Psicología',
    description: 'Ciencia del comportamiento humano y los procesos mentales, con aplicaciones cruciales en el bienestar clínico, el talento organizacional y el entendimiento del consumidor.',
    commonBases: [
      {
        title: 'Escucha Activa y Empatía',
        description: 'Técnicas de contención, formulación de preguntas abiertas y decodificación de lenguaje no verbal.',
        skills: ['Técnicas de Entrevista', 'Parafraseo', 'Regulación de Voz', 'Postura Profesional']
      },
      {
        title: 'Evaluación y Psicometría',
        description: 'Manejo de tests psicológicos estandarizados para evaluar personalidad, aptitud y salud mental.',
        skills: ['Test de Personalidad', 'Baterías de Aptitud', 'Interpretación Cuantitativa', 'Redacción de Informes']
      },
      {
        title: 'Diseño de Dinámicas de Grupo',
        description: 'Capacidad de estructurar talleres y actividades interactivas para fomentar el aprendizaje y evaluación.',
        skills: ['Dinámicas Rompehielo', 'Roleplay', 'Talleres Psicoeducativos', 'Manejo de Grupos Difíciles']
      },
      {
        title: 'Comunicación Asertiva',
        description: 'Transmisión clara, firme y respetuosa de diagnósticos, recomendaciones de contratación o retroalimentación.',
        skills: ['Técnicas de Feedback', 'Comunicación No Violenta', 'Resolución de Conflictos', 'Oratoria en Talleres']
      },
      {
        title: 'Inglés Clínico / Organizacional',
        description: 'Lectura de investigaciones actualizadas, manuales DSM-5/CIE-11 y herramientas corporativas internacionales.',
        skills: ['Terminology of DSM-5', 'HR Terms in English', 'Research Paper Analysis', 'Global Certifications Reading']
      }
    ],
    areas: [
      {
        name: 'Psicología Organizacional (RRHH)',
        description: 'Aplicación de la psicología para optimizar el comportamiento humano en el ámbito laboral, abarcando atracción de talento y clima.',
        subareas: ['Reclutamiento y Selección', 'Desarrollo Organizacional', 'Clima y Cultura', 'Capacitación y Aprendizaje', 'Seguridad y Salud Ocupacional'],
        skills: ['Entrevistas por Competencias', 'Assessment Center', 'Tableros de Clima', 'Gestión de Desempeño'],
        demand: 'Alta',
        salary: 'S/ 1,600 - S/ 3,000'
      },
      {
        name: 'Psicología Clínica',
        description: 'Evaluación, diagnóstico y tratamiento psicoterapéutico de trastornos emocionales y de salud mental.',
        subareas: ['Psicoterapia de Adultos', 'Psicoterapia Infantil/Adolescentes', 'Terapia de Pareja', 'Intervención en Crisis', 'Neuropsicología'],
        skills: ['Terapia Cognitivo-Conductual', 'Historiales Clínicos', 'Manual DSM-5', 'Primeros Auxilios Psicológicos'],
        demand: 'Media',
        salary: 'S/ 1,500 - S/ 2,800 (Inmediato + consulta privada variable)'
      },
      {
        name: 'Psicología del Consumidor',
        description: 'Entendimiento de los sesgos, emociones y motivaciones del cliente final frente a marcas y decisiones de compra.',
        subareas: ['Neuromarketing', 'User Research (UX)', 'Investigación Cualitativa de Mercado', 'Diseño de Experiencias'],
        skills: ['Sesgos Cognitivos', 'Pruebas de Usabilidad', 'Focus Groups', 'Customer Journeys'],
        demand: 'Alta',
        salary: 'S/ 1,800 - S/ 3,500'
      },
      {
        name: 'Psicología Educativa',
        description: 'Orientación vocacional, atención a dificultades de aprendizaje y soporte emocional en colegios o universidades.',
        subareas: ['Orientación Vocacional', 'Problemas de Aprendizaje', 'Escuela para Padres', 'Diseño Curricular Inclusivo'],
        skills: ['Pruebas Psicopedagógicas', 'Modificación de Conducta', 'Tutoría Escolar', 'Atención a la Diversidad'],
        demand: 'Media',
        salary: 'S/ 1,400 - S/ 2,500'
      },
      {
        name: 'Consultoría en Desarrollo Humano',
        description: 'Asesoría externa independiente para acompañamiento directivo o transformación cultural profunda en corporaciones.',
        subareas: ['Executive Coaching', 'Outplacement', 'Talleres de Liderazgo', 'Diagnóstico de Clima'],
        skills: ['Mentoring', 'Técnicas de Coaching', 'Feedback 360', 'Evaluación de Liderazgo'],
        demand: 'Media',
        salary: 'S/ 2,000 - S/ 4,000'
      }
    ],
    careerLine: [
      {
        title: 'Practicante de Selección / Clima / Psicología',
        salary: 'S/ 1,025 - S/ 1,300',
        experienceNeeded: 'Ninguna',
        description: 'Filtro curricular inicial, agendamiento de postulantes, aplicación colectiva de pruebas psicométricas y digitación de historias clínicas de apoyo.'
      },
      {
        title: 'Asistente de Recursos Humanos / Terapeuta de Apoyo',
        salary: 'S/ 1,500 - S/ 2,200',
        experienceNeeded: '6 meses - 1 año',
        description: 'Realización de entrevistas iniciales para puestos operativos, tabulación de encuestas de clima interno, y co-facilitación de talleres psicoeducativos.'
      },
      {
        title: 'Analista de Talento / Psicólogo Clínico Colegiado',
        salary: 'S/ 2,400 - S/ 4,000',
        experienceNeeded: '2 - 3 años',
        description: 'Responsable de procesos completos de selección especializada, diseño e interpretación de planes de clima interno, y consulta de terapia independiente con colegiatura activa.'
      },
      {
        title: 'Coordinador de Selección y Capacitación / Consultor Senior',
        salary: 'S/ 4,500 - S/ 6,500',
        experienceNeeded: '4 - 6 años',
        description: 'Diseño del plan de aprendizaje anual de la empresa, supervisión del cumplimiento normativo laboral y manejo directo de clientes corporativos complejos.'
      },
      {
        title: 'Gerente de Recursos Humanos / Director de Centro Clínico',
        salary: 'S/ 8,000 - S/ 15,000+',
        experienceNeeded: '7+ años',
        description: 'Definición de la estrategia de capital humano y cultura empresarial conectada a metas de negocio, o dirección de políticas de salud mental institucionales.'
      }
    ]
  },
  negocios_internacionales: {
    careerId: 'negocios_internacionales',
    careerName: 'Negocios Internacionales',
    description: 'Enfocada en el comercio internacional, regulaciones aduaneras, finanzas de importación/exportación y el desarrollo de estrategias de expansión global.',
    commonBases: [
      {
        title: 'Legislación Aduanera y Normativas',
        description: 'Estudio de leyes y reglamentos de aduanas que rigen el ingreso y salida de mercancías.',
        skills: ['Ley General de Aduanas', 'Regímenes Aduaneros', 'Aranceles', 'Ventanilla Única de Comercio']
      },
      {
        title: 'Incoterms 2020',
        description: 'Dominio absoluto de los términos internacionales de comercio para definir responsabilidades de costo y riesgo en fletes.',
        skills: ['FOB / CIF / EXW', 'Transferencia de Riesgos', 'Estructura de Costos de Transporte', 'Seguros de Carga']
      },
      {
        title: 'Excel de Negocios y Costeo',
        description: 'Hojas de cálculo complejas para el cálculo de costos de importación y presupuestos de exportación.',
        skills: ['Matrices de Costeo', 'Tasas de Cambio dinámicas', 'Fórmulas de Margen', 'Power Query básico']
      },
      {
        title: 'Inglés Comercial y de Aduanas',
        description: 'Idioma indispensable para la negociación directa con navieras, exportadores de Asia y Europa, y aduanas.',
        skills: ['Commercial Invoice English', 'Shipping Terms', 'Cross-Cultural Negotiation', 'Freight Forwarding terms']
      },
      {
        title: 'Técnicas de Negociación Internacional',
        description: 'Capacidad de cerrar tratos comerciales respetando diferencias culturales y optimizando los márgenes de compra-venta.',
        skills: ['Negociación Ganar-Ganar', 'Diferencias Culturales', 'Contratos Internacionales', 'Resolución de Disputas']
      }
    ],
    areas: [
      {
        name: 'Comercio Exterior (Import/Export)',
        description: 'Operación táctica diaria de compras internacionales o colocación de productos locales en mercados del exterior.',
        subareas: ['Operaciones de Importación', 'Estrategias de Exportación', 'Búsqueda de Proveedores Globales', 'Tratados de Libre Comercio (TLC)'],
        skills: ['Emisión de Bl/AWB', 'Sourcing en Alibaba / Ferias', 'Documentación de Embarque', 'Cálculo de Derechos Arancelarios'],
        demand: 'Alta',
        salary: 'S/ 1,700 - S/ 3,300'
      },
      {
        name: 'Logística Internacional',
        description: 'Coordinación con aerolíneas, navieras y agentes de carga para asegurar la cadena de suministro física global.',
        subareas: ['Agenciamiento de Carga (Freight Forwarding)', 'Chartering y Fletes', 'Consolidación de Carga', 'Seguimiento de Contenedores (Tracking)'],
        skills: ['Optimización de Espacio', 'Tarifarios Navieros', 'KPIs de Tránsito', 'Gestión de Almacenes Aduaneros'],
        demand: 'Alta',
        salary: 'S/ 1,800 - S/ 3,500'
      },
      {
        name: 'Inteligencia de Mercados Globales',
        description: 'Investigación estadística y análisis de tendencias de consumo internacionales para la diversificación y apertura de mercados.',
        subareas: ['Apertura de Nuevos Canales', 'Análisis Arancelario Global', 'Estudio de Barreras No Arancelarias', 'Estadísticas Trademap'],
        skills: ['Uso de Trademap / Veritrade', 'Estudios de Viabilidad', 'Análisis de Competencia Internacional', 'Segmentación de Mercados Externos'],
        demand: 'Media',
        salary: 'S/ 1,900 - S/ 3,600'
      },
      {
        name: 'Finanzas Internacionales',
        description: 'Mitigación de riesgos cambiarios, medios de pago internacionales y financiamiento de operaciones aduaneras.',
        subareas: ['Cartas de Crédito', 'Coberturas Cambiarias (Hedging)', 'Financiamiento de Importaciones', 'Cobranza Documentaria'],
        skills: ['Análisis del Tipo de Cambio', 'Cartas de Crédito de Importación', 'Riesgo País', 'Factoring Internacional'],
        demand: 'Media',
        salary: 'S/ 2,000 - S/ 4,000'
      },
      {
        name: 'Gestión de Aduanas y Compliance',
        description: 'Verificación del estricto cumplimiento normativo aduanero para evitar multas, retenciones de mercancía o sanciones.',
        subareas: ['Clasificación Arancelaria', 'Valoración de Mercancías', 'Auditoría Aduanera interna', 'Certificación OEA (Operador Económico)'],
        skills: ['Sistema Armonizado de Códigos', 'Reglas de Origen', 'Procedimientos Aduaneros', 'Liquidación de Tributos'],
        demand: 'Alta',
        salary: 'S/ 1,800 - S/ 3,400'
      }
    ],
    careerLine: [
      {
        title: 'Practicante de Importaciones / Comex',
        salary: 'S/ 1,025 - S/ 1,400',
        experienceNeeded: 'Ninguna',
        description: 'Revisión preliminar de facturas comerciales, seguimiento con el agente de aduanas sobre el estado del canal de control y archivo documental.'
      },
      {
        title: 'Asistente de Comercio Exterior / Logística',
        salary: 'S/ 1,600 - S/ 2,400',
        experienceNeeded: '6 meses - 1 año',
        description: 'Coordinación directa de booking de contenedores con navieras, validación de certificados de origen y cálculo preliminar de liquidaciones de impuestos.'
      },
      {
        title: 'Analista de Importación-Exportación / Comex',
        salary: 'S/ 2,800 - S/ 4,500',
        experienceNeeded: '2 - 3 años',
        description: 'Liderazgo en negociaciones tarifarias con freight forwarders, desarrollo de proyectos de abastecimiento global con proveedores en Asia/Europa, y análisis de ahorros arancelarios.'
      },
      {
        title: 'Especialista / Coordinador de Operaciones Internacionales',
        salary: 'S/ 4,800 - S/ 7,200',
        experienceNeeded: '4 - 6 años',
        description: 'Supervisión del cumplimiento de compliance aduanero, auditoría de agencias aduaneras externas, apertura táctica de nuevos distribuidores globales.'
      },
      {
        title: 'Gerente de Operaciones Comex / Supply Chain Manager Internacional',
        salary: 'S/ 8,500 - S/ 16,000+',
        experienceNeeded: '7+ años',
        description: 'Planificación global de la red de suministro internacional de la empresa, negociación estratégica de contratos de fletes navieros corporativos, y reporte directo del margen bruto de importación.'
      }
    ]
  }
};

export const comparisonCards: ComparisonCardData[] = [
  {
    areaName: 'Finanzas',
    careerName: 'Administración / Ingeniería / Negocios',
    demand: 'Alta',
    dataUsage: 5,
    creativity: 2,
    socialContact: 3,
    salaryRange: 'S/ 1,800 - S/ 3,500 (Junior) | S/ 8,000 - S/ 15,000+ (Gerente)',
    keySkills: ['Excel avanzado', 'Análisis de estados financieros', 'Power BI / Valorizaciones', 'Flujo de caja'],
    recommendedRoles: ['Analista de Tesorería', 'Especialista en Evaluación de Proyectos', 'Auditor de Costos'],
    description: 'Enfocado en asegurar la salud financiera de la empresa, gestionar inversiones, y controlar la liquidez y riesgos.'
  },
  {
    areaName: 'Marketing',
    careerName: 'Marketing / Administración / Comunicaciones',
    demand: 'Alta',
    dataUsage: 3,
    creativity: 5,
    socialContact: 5,
    salaryRange: 'S/ 1,500 - S/ 3,000 (Junior) | S/ 8,000 - S/ 16,000+ (Gerente)',
    keySkills: ['Branding & Copywriting', 'SEO/SEM & Meta Ads', 'Investigación de mercados', 'Google Analytics'],
    recommendedRoles: ['Product Marketer', 'Growth Lead', 'Especialista SEO / Redes Sociales'],
    description: 'Conecta las necesidades del consumidor con el producto o servicio ideal, diseñando campañas altamente creativas y medibles.'
  },
  {
    areaName: 'Recursos Humanos / Talento',
    careerName: 'Psicología / Administración / Ingeniería Industrial',
    demand: 'Media',
    dataUsage: 3,
    creativity: 4,
    socialContact: 5,
    salaryRange: 'S/ 1,600 - S/ 2,800 (Junior) | S/ 7,500 - S/ 14,000+ (Gerente)',
    keySkills: ['Entrevista por competencias', 'Evaluación psicométrica', 'Diseño de dinámicas', 'Legislación laboral'],
    recommendedRoles: ['Analista de Atracción de Talento', 'Especialista de Clima y Cultura', 'Coordinador de Capacitación'],
    description: 'Desarrolla e implementa estrategias para atraer, retener y potenciar el talento de la organización, promoviendo un gran ambiente de trabajo.'
  },
  {
    areaName: 'Operaciones & Procesos',
    careerName: 'Ingeniería Industrial / Administración',
    demand: 'Alta',
    dataUsage: 4,
    creativity: 3,
    socialContact: 4,
    salaryRange: 'S/ 1,800 - S/ 3,600 (Junior) | S/ 9,000 - S/ 18,000+ (Gerente)',
    keySkills: ['Mapeo de procesos (Bizagi)', 'Metodologías Lean & Ágiles', 'Gestión de la producción', 'KPIs operativos'],
    recommendedRoles: ['Supervisor de Producción', 'Analista de Procesos / Mapeo', 'Ingeniero de Calidad'],
    description: 'Busca maximizar la eficiencia en la fabricación de productos o en la entrega de servicios operativos reduciendo tiempos y desperdicios.'
  },
  {
    areaName: 'Logística & Supply Chain',
    careerName: 'Ingeniería Industrial / Negocios Internacionales',
    demand: 'Alta',
    dataUsage: 4,
    creativity: 2,
    socialContact: 4,
    salaryRange: 'S/ 1,900 - S/ 3,800 (Junior) | S/ 8,500 - S/ 17,000+ (Gerente)',
    keySkills: ['Incoterms 2020', 'Control de inventario físico/digital', 'Planificación de demanda', 'Negociación de transportes'],
    recommendedRoles: ['Analista de Almacén', 'Comprador Junior', 'Especialista en Distribución'],
    description: 'Supervisa la cadena de suministro física, garantizando que el insumo o producto llegue al lugar y momento correcto de forma óptima.'
  },
  {
    areaName: 'Estrategia & Consultoría',
    careerName: 'Administración / Ingeniería / Finanzas',
    demand: 'Media',
    dataUsage: 4,
    creativity: 4,
    socialContact: 4,
    salaryRange: 'S/ 2,000 - S/ 4,000 (Junior) | S/ 9,000 - S/ 15,000+ (Consultor Senior)',
    keySkills: ['Matriz FODA/PESTEL', 'Modelo Canvas', 'Diseño organizacional', 'Estrategias de internacionalización'],
    recommendedRoles: ['Consultor de Negocios Asociado', 'Analista de Planeamiento Estratégico', 'Project Manager Junior'],
    description: 'Asiste a las empresas a nivel corporativo para definir planes de crecimiento futuro, transformaciones organizacionales y alianzas.'
  }
];
