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
    certification: {
      title: string;
      description: string;
      howToDevelop: string;
      relatedTools: string[];
    };
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

// Especializaciones y certificaciones se leen ahora directamente de la propiedad certification de cada área generada por IA.

// 2. MAIN DYNAMIC GRAPH GENERATION FUNCTION
export const generateDynamicGraph = (careerName: string, userStage: string, industryName?: string, customTemplate?: CareerTemplate, userPosition?: string): GraphNode[] => {
  if (!customTemplate) {
    return [];
  }

  const normCareer = careerName.trim();
  const lowerCareer = normCareer.toLowerCase();
  const normIndustry = industryName ? industryName.trim() : 'Tecnología';
  const normInd = normIndustry;
  const template = customTemplate;

  // 4. ASSEMBLE GRAPH NODES BASED ON SELECTED TEMPLATE (COORDINATES INCLUDED!)
  let areas = template.areas.slice(0, 3);

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
    const cert = area.certification || {
      title: `Especialización en ${area.name}`,
      description: `Especialización de postgrado que consolida tus habilidades previas en ${area.subareas.map(s => s.name).join(' y ')} para acelerar tu transición al puesto de ${area.specRole.title}.`,
      howToDevelop: `Planifica tu postulación a diplomados o certificaciones del sector enfocados en ${area.name} para certificar tu experiencia.`,
      relatedTools: area.specRole.tools.slice(0, 2)
    };
    nodes.push({
      id: studyId,
      title: cert.title,
      type: 'rama',
      priority: 'recomendado',
      status: 'no_iniciado',
      level: 'especialización',
      description: cert.description,
      whyItMatters: `Brinda el respaldo académico indispensable para justificar tu nombramiento en roles directivos y licitaciones internacionales del negocio.`,
      relatedJobs: [area.specRole.title],
      relatedTools: cert.relatedTools,
      route: `area_${aIdx + 1}`,
      dependencies: seniorSkillIds,
      x: col6_X,
      y: yCenter,
      howToDevelop: cert.howToDevelop
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



