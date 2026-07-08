import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization of Gemini
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// 1. API route: Generate dynamic industries for a career
app.post('/api/industries', async (req, res) => {
  try {
    const { career, currentPosition, stage } = req.body;
    if (!career || typeof career !== 'string') {
      return res.status(400).json({ error: 'career is required and must be a string' });
    }

    const ai = getGeminiClient();
    
    let prompt = `Eres un experto en orientación profesional y empleabilidad. Dado el nombre de la carrera profesional "${career}", genera una lista de 5 a 6 industrias o sectores de interés ALTAMENTE RELEVANTES para los egresados o profesionales de esta carrera.`;
    
    if (currentPosition) {
      prompt += ` El usuario se encuentra en la etapa de "${stage}" y tiene el puesto actual/previo o desea apuntar a: "${currentPosition}". Adapta de manera inteligente las industrias recomendadas para que sean sectores ideales donde el rol de "${currentPosition}" fusionado con la carrera de "${career}" tenga un alto valor y crecimiento estratégico, o permita transiciones laborales atractivas.`;
    }
    
    prompt += `
    Cada industria debe tener:
    - un "id" único breve en minúsculas (snake_case, sin acentos ni caracteres especiales, ej. "aeroespacial_defensa")
    - un nombre claro (label, ej. "Aeroespacial y Defensa")
    - una descripción atractiva, corta y descriptiva (desc, ej. "Empresas fabricantes de aeronaves, satélites, sistemas de navegación espacial y defensa.") en español de máximo 15 palabras.
    
    Asegúrate de que las opciones estén adaptadas de forma muy lógica y real al perfil profesional del usuario. No uses opciones genéricas que no tengan que ver con la carrera, a menos que sea aplicable de forma justificada.
    SIEMPRE incluye al final de la lista de retorno un elemento fijo para la opción personalizada con:
    id: "otra"
    label: "Otra industria..."
    desc: "Ingresa un sector o rubro específico personalizado"`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              label: { type: Type.STRING },
              desc: { type: Type.STRING }
            },
            required: ['id', 'label', 'desc']
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error('La respuesta del modelo de IA está vacía');
    }

    const parsedData = JSON.parse(text);
    res.json({ industries: parsedData });
  } catch (err: any) {
    console.error('Error in /api/industries:', err);
    res.status(500).json({ error: err.message || 'Error interno del servidor' });
  }
});

// 2. API route: Generate dynamic structured CareerTemplate for custom careers/industries
app.post('/api/roadmap', async (req, res) => {
  try {
    const { career, industry, currentPosition, stage } = req.body;
    if (!career || typeof career !== 'string') {
      return res.status(400).json({ error: 'career is required and must be a string' });
    }

    const targetIndustry = industry || 'General';
    const ai = getGeminiClient();

    const numProgressionNodes = currentPosition ? 6 : 3;
    const isPracticeOrJunior = currentPosition && (currentPosition.toLowerCase().includes('practica') || currentPosition.toLowerCase().includes('puesto junior') || currentPosition.toLowerCase().includes('junior') || currentPosition.toLowerCase().includes('auxiliar'));

    let prompt = `Eres el mejor orientador profesional y experto en reclutamiento corporativo. Tu objetivo es diseñar un mapa de carrera interactivo, realista y de altísimo valor para un profesional de la carrera de "${career}", especializado/adaptado para trabajar en la industria de "${targetIndustry}".`;

    if (currentPosition) {
      prompt += ` El usuario se encuentra en la etapa de "${stage || ''}" con el puesto actual, anterior o de interés: "${currentPosition}". Analiza este puesto detalladamente junto con la carrera para proyectar su crecimiento personalizado, sugerir alternativas inteligentes de carrera o puestos continuos idóneos dentro de la industria de "${targetIndustry}".`;
    }

    prompt += `

    Por favor, genera un objeto JSON que represente una plantilla de carrera profesional estructurada en español. Toda la terminología debe ser real, profesional y altamente relevante para esta carrera e industria. Evita generalidades genéricas. Sé sumamente riguroso y detallado con los nombres de herramientas de software de vanguardia, proyectos prácticos retadores y requisitos realistas.

    El objeto JSON debe cumplir exactamente con esta estructura:
    1. "title": El título oficial y pulido de la carrera.
    2. "description": Una descripción breve y motivadora de 25-35 palabras sobre cómo esta carrera e industria se fusionan y qué rol cumplen.
    3. "foundations": Un arreglo de EXACTAMENTE 3 elementos que representen las bases indispensables. Cada elemento tiene:
       - "title": Nombre de la materia/base técnica clave (ej. "Dinámica de Fluidos y Propulsión" para Aeroespacial).
       - "desc": Descripción de qué trata y por qué se aplica (máx 20 palabras).
       - "tool": El marco conceptual o herramienta de base (ej. "ANSYS Fluent", "Normas ASTM").
       - "why": Por qué esta base es crítica para las empresas del sector (máx 15 palabras).
       - "project": Un proyecto práctico e individual retador que un practicante puede presentar en su portafolio (ej. "Modelado 3D y análisis térmico de una boquilla de cohete amateur").
    4. "tools": Un arreglo de EXACTAMENTE 3 elements con las herramientas y habilidades clave del perfil intermedio. Cada elemento tiene:
       - "title": Nombre del software, habilidad o lenguaje de especialización (ej. "Modelado CAD de Estructuras", "Programación en C++ para Sistemas Embebidos").
       - "desc": Qué aprenderá y para qué (máx 20 palabras).
       - "tool": Herramienta de software o metodología exacta (ej. "SolidWorks", "MATLAB / Simulink").
       - "why": Por qué lo exige el mercado hoy en día (máx 15 palabras).
       - "project": Un proyecto de simulación o automatización real (ej. "Simulación de cargas estructurales en un ala NACA 0012 en SolidWorks").
    5. "areas": Un arreglo de EXACTAMENTE 3 o 4 especializaciones o "Ramas" avanzadas donde este profesional puede trabajar dentro de la industria de "${targetIndustry}". Cada área tiene:
       - "id": Un ID único en formato snake_case (ej. "sistemas_de_vuelo", "diseño_aerodinamico").
       - "name": Nombre de la Rama / Especialidad (ej. "Sistemas de Propulsión y Combustión", "Diseño de Aviónica e Instrumentación").
       - "description": De qué se encarga esta área y su importancia de cara al negocio (máx 25 palabras).
       - "why": Por qué es fundamental para la continuidad operativa de la industria.
       - "subareas": Un arreglo de EXACTAMENTE 2 subtemas o disciplinas específicas dentro de la rama. Cada una con:
         - "name": Nombre de la subárea (ej. "Sistemas de Inyección", "Termodinámica de Turbinas").
         - "desc": Explicación corta (máx 15 palabras).
         - "tools": Un arreglo de 1 o 2 software/herramientas específicos de esta subárea.
         - "skills": 2-3 competencias técnicas clave separadas por comas (ej. "Ciclo Brayton, Combustibles alternativos").
       - "practiceRole": Perfil del puesto inicial de prácticas. Objeto con:
         - "title": Título real del puesto de prácticas (ej. "Practicante de Pruebas de Propulsión").
         - "desc": Tareas operativas detalladas que realizará en su día a día (máx 25 palabras).
         - "why": Por qué es la mejor inducción para entender el negocio.
         - "tools": Arreglo de 2 herramientas del día a día (ej. ["Python", "MATLAB"]).
         - "project": Proyecto retador de prácticas que agregue valor a la empresa (ej. "Automatización de recolección de telemetría de banco de pruebas en Python").
         - "req": Perfil y ciclo de estudio o conocimientos requeridos para postular (ej. "Estudiante de 8vo ciclo, inglés avanzado, conocimiento de control PID").
       - "juniorRole": Perfil del analista o ingeniero Junior. Objeto con:
         - "title": Título real del puesto (ej. "Ingeniero Junior de Ensayos Aeroespaciales").
         - "desc": Responsabilidades de análisis autónomo en planta, laboratorio u oficina (máx 25 palabras).
         - "why": Por qué es una posición clave y qué decisiones toma de forma autónoma.
         - "tools": Arreglo de 2 herramientas avanzadas (ej. ["LabVIEW", "C++"]).
         - "project": Proyecto de optimización de procesos (ej. "Reducción de 12% en tiempo de calibración de sensores de presión de tobera mediante scripts de automatización").
         - "req": Años de experiencia o certificaciones para contratarlo (ej. "Bachiller, 1 año en ensayos de instrumentación, manejo de protocolos CAN bus").
       - "specRole": Perfil del Supervisor, Key Account Manager o Especialista Senior. Objeto con:
         - "title": Título real del puesto senior (ej. "Especialista Senior de Aviónica / Líder de Proyecto").
         - "desc": Funciones directivas de diseño de sistemas complejos, firma autorizada técnica y liderazgo de equipos (máx 25 palabras).
         - "why": Cuál es su rol estratégico en la empresa de cara a clientes corporativos u organismos reguladores.
         - "tools": Arreglo de 2 herramientas estratégicas o de gestión (ej. ["ANSYS", "Sistemas PLM (Windchill)"]).
         - "project": Proyecto estratégico de gran escala (ej. "Diseño y homologación internacional de un nuevo sistema de control de actitud de nanosatélites de órbita baja").
         - "req": Títulos de posgrado, licencias o experiencia robusta necesaria (ej. "Título profesional, 5+ años en desarrollo de sistemas espaciales, certificación INCOSE ASEP/CSEP").
       - "industries": Un arreglo de 2 elementos indicando sectores donde se aplica (ej. [{ "name": "Manufactura Satelital", "detail": "Desarrollo de hardware espacial" }, { "name": "Mantenimiento Aeronáutico MRO", "detail": "Auditorías de aeronavegabilidad" }])
    6. "careerProgression": Un arreglo de EXACTAMENTE ${numProgressionNodes} puestos/roles de progresión secuenciales que representen la línea de carrera y alternativas de crecimiento en esa industria de "${targetIndustry}".
        ${currentPosition ? `Dado que especificaste tu puesto actual como "${currentPosition}", genera un abanico completo de EXACTAMENTE 6 puestos secuenciales para la pizarra interactiva. El primero debe ser tu puesto de inicio (ej. "${currentPosition}"), el segundo el nivel Junior, el tercero Especialista Senior / Coordinador, el cuarto Jefe / Supervisor, el quinto Gerente / Manager, y el sexto Director o Ejecutivo C-level, mostrando opciones de prácticas, puestos junior, senior, y gerentes/managers/coordinadores.` : `Genera exactamente 3 puestos secuenciales de crecimiento a partir del nivel Junior (ej. Especialista Senior, Coordinador, Gerente).`}
        Cada uno de los puestos debe tener:
       - "roleTitle": Nombre del puesto siguiente o alternativo de crecimiento (ej. "Practicante Pro de Trade Marketing" o "Analista Junior de Producto").
       - "stage": El nivel del rol (ej. "Practicante Pro", "Junior", "Specialist", "Senior").
       - "description": Explicación de por qué este rol es el siguiente paso lógico o una excelente alternativa de crecimiento a partir de su perfil y cómo encaja en la industria (máx 25 palabras).
       - "skills": Un arreglo de EXACTAMENTE 3 habilidades técnicas, metodológicas o de gestión indispensables para avanzar hacia este rol.
       - "tools": Un arreglo de EXACTAMENTE 2 herramientas digitales o softwares avanzados que se deben dominar para el puesto.
       - "knowledge": Un arreglo de EXACTAMENTE 2 conocimientos teóricos o prácticos clave recomendables para el rol.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            foundations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  desc: { type: Type.STRING },
                  tool: { type: Type.STRING },
                  why: { type: Type.STRING },
                  project: { type: Type.STRING }
                },
                required: ['title', 'desc', 'tool', 'why', 'project']
              }
            },
            tools: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  desc: { type: Type.STRING },
                  tool: { type: Type.STRING },
                  why: { type: Type.STRING },
                  project: { type: Type.STRING }
                },
                required: ['title', 'desc', 'tool', 'why', 'project']
              }
            },
            areas: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  why: { type: Type.STRING },
                  subareas: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        desc: { type: Type.STRING },
                        tools: { type: Type.ARRAY, items: { type: Type.STRING } },
                        skills: { type: Type.STRING }
                      },
                      required: ['name', 'desc', 'tools', 'skills']
                    }
                  },
                  practiceRole: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      desc: { type: Type.STRING },
                      why: { type: Type.STRING },
                      tools: { type: Type.ARRAY, items: { type: Type.STRING } },
                      project: { type: Type.STRING },
                      req: { type: Type.STRING }
                    },
                    required: ['title', 'desc', 'why', 'tools', 'project', 'req']
                  },
                  juniorRole: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      desc: { type: Type.STRING },
                      why: { type: Type.STRING },
                      tools: { type: Type.ARRAY, items: { type: Type.STRING } },
                      project: { type: Type.STRING },
                      req: { type: Type.STRING }
                    },
                    required: ['title', 'desc', 'why', 'tools', 'project', 'req']
                  },
                  specRole: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      desc: { type: Type.STRING },
                      why: { type: Type.STRING },
                      tools: { type: Type.ARRAY, items: { type: Type.STRING } },
                      project: { type: Type.STRING },
                      req: { type: Type.STRING }
                    },
                    required: ['title', 'desc', 'why', 'tools', 'project', 'req']
                  },
                  industries: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        detail: { type: Type.STRING }
                      },
                      required: ['name', 'detail']
                    }
                  }
                },
                required: ['id', 'name', 'description', 'why', 'subareas', 'practiceRole', 'juniorRole', 'specRole', 'industries']
              }
            },
            careerProgression: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  roleTitle: { type: Type.STRING },
                  stage: { type: Type.STRING },
                  description: { type: Type.STRING },
                  skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                  tools: { type: Type.ARRAY, items: { type: Type.STRING } },
                  knowledge: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ['roleTitle', 'stage', 'description', 'skills', 'tools', 'knowledge']
              }
            }
          },
          required: ['title', 'description', 'foundations', 'tools', 'areas', 'careerProgression']
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error('La respuesta del modelo de IA está vacía');
    }

    const parsedTemplate = JSON.parse(text);
    res.json({ template: parsedTemplate });
  } catch (err: any) {
    console.error('Error in /api/roadmap:', err);
    res.status(500).json({ error: err.message || 'Error interno del servidor al estructurar roadmap' });
  }
});

// Vite middleware configuration for serving the React application
async function setupVite() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }
}

setupVite().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to start server:', err);
});
