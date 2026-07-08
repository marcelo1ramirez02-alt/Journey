# 🧭 Journey — Copiloto de Carrera Profesional con IA

**Journey** es una plataforma web interactiva y dinámica diseñada para guiar a profesionales y estudiantes en el desarrollo de su carrera. Utilizando inteligencia artificial de vanguardia (**Gemini 3.5 Flash**), la aplicación genera hojas de ruta (roadmaps) hiper-personalizadas que fusionan la carrera del usuario con sectores industriales específicos, proyectando su crecimiento desde puestos de prácticas hasta roles directivos.

---

## ✨ Características Principales

*   **Configurador de Perfil Inteligente**: Un asistente interactivo de onboarding que recopila información sobre tu carrera, experiencia actual y objetivos profesionales.
*   **Generador Dinámico de Industrias**: La IA analiza tu perfil y sugiere entre 5 y 6 sectores estratégicos con alto potencial de crecimiento donde tu rol aporta el mayor valor.
*   **Mapa de Carrera Detallado (Roadmap)**:
    *   **Bases Técnicas**: Fundamentos indispensables que debes dominar para la industria seleccionada.
    *   **Herramientas Clave**: Herramientas y tecnologías modernas exigidas por el mercado laboral actual.
    *   **Áreas de Especialización**: Ramas avanzadas del sector, detallando las tareas, requisitos, herramientas del día a día y un **proyecto práctico para tu portafolio** en tres niveles de antigüedad (Prácticas, Junior y Especialista/Sénior).
*   **Pizarra de Progresión de Carrera**: Una visualización secuencial e interactiva de crecimiento laboral que muestra los siguientes pasos lógicos (ej. Junior ➔ Sénior ➔ Gerente ➔ Director) con los conocimientos y habilidades técnicas que necesitas adquirir en cada salto.
*   **Persistencia Local**: Guarda el progreso de tu perfil de usuario y clientes potenciales (leads) utilizando `localStorage`.
*   **Interfaz de Usuario Premium**: Diseñada con una estética moderna en tonos oscuros, animaciones fluidas (`motion`), iconos vectoriales dinámicos (`lucide-react`) y diseño completamente responsivo.

---

## 🛠️ Stack Tecnológico

### Frontend
*   **React 19** & **TypeScript** para una interfaz tipada y reactiva.
*   **Tailwind CSS** para un diseño moderno, flexible y responsivo.
*   **Motion** (antes Framer Motion) para micro-animaciones interactivas.
*   **Lucide React** para iconografía moderna.

### Backend
*   **Node.js** con **Express** para servir la API de generación de rutas.
*   **TSX** para ejecutar TypeScript directamente en Node sin compilación previa.
*   **esbuild** para empaquetado rápido de producción.

### Inteligencia Artificial
*   **SDK `@google/genai`**: Consultas estructuradas a `gemini-3.5-flash` forzando respuestas en formato JSON mediante esquemas estructurados para garantizar consistencia y rapidez.

---

## 🚀 Ejecución en Local

### Requisitos Previos
*   **Node.js** (versión 18 o superior recomendada)
*   Una **API Key de Gemini** (puedes obtenerla gratis en [Google AI Studio](https://aistudio.google.com/))

### Pasos para Configurar y Ejecutar

1.  **Instalar dependencias**:
    ```bash
    npm install
    ```

2.  **Configurar Variables de Entorno**:
    Crea un archivo llamado `.env` en la raíz del proyecto (puedes copiar el archivo de ejemplo):
    ```bash
    cp .env.example .env
    ```
    Edita el archivo `.env` e ingresa tu API Key:
    ```env
    GEMINI_API_KEY=tu_clave_api_aqui
    ```

3.  **Iniciar el Servidor de Desarrollo**:
    Este comando arranca el backend de Express (puerto `3000`) y monta el middleware de Vite para servir el frontend de React de forma transparente.
    ```bash
    npm run dev
    ```
    Abre tu navegador en: [http://localhost:3000](http://localhost:3000)

4.  **Compilar y Ejecutar en Producción**:
    Para generar los bundles optimizados y arrancar el servidor Express en modo producción:
    ```bash
    npm run build
    npm start
    ```

---

## 📂 Estructura del Proyecto

*   `server.ts` - Servidor backend Express que maneja la lógica de APIs, inicialización del cliente Gemini y serving de archivos estáticos de Vite.
*   `src/` - Código fuente del frontend en React:
    *   `src/App.tsx` - Componente principal y gestor de estados (onboarding, vista de roadmap, leads).
    *   `src/components/` - Componentes modulares e interactivos de la aplicación:
        *   `Navbar.tsx` - Barra de navegación con contador de registros.
        *   `Hero.tsx` - Sección de bienvenida y llamada a la acción.
        *   `OnboardingForm.tsx` - Formulario por pasos guiado para crear tu perfil profesional y seleccionar industrias generadas por IA.
        *   `RoadmapView.tsx` - El visualizador interactivo del mapa de ruta generado por la IA (bases, herramientas, ramas y progresión).
        *   `ComparisonCards.tsx` - Sección comparativa interactiva ("Antes" vs. "Con Journey").
        *   `ValueProps.tsx` - Propuestas de valor y estadísticas sobre la inserción laboral.
        *   `BetaForm.tsx` - Formulario de registro a la lista de espera beta.
        *   `Footer.tsx` - Pie de página del sitio.
    *   `src/types.ts` - Definición de interfaces TypeScript para el perfil de usuario y la estructura de datos del roadmap de Gemini.
    *   `src/index.css` - Estilos globales de Tailwind CSS y configuraciones de diseño.
    *   `src/data/` - Datos estáticos/módulos auxiliares de respaldo.

