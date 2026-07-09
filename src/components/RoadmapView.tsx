import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Circle, 
  GraduationCap, 
  Briefcase, 
  Sparkles, 
  Info, 
  ArrowRight, 
  TrendingUp, 
  GitBranch, 
  ArrowUpRight, 
  RotateCcw,
  BookOpen,
  Award,
  DollarSign,
  Clock,
  ChevronRight,
  Compass,
  ArrowDown,
  Wrench,
  FileText,
  Search,
  Activity,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Move,
  Check
} from 'lucide-react';
import { OnboardingData } from '../types';
import { generateDynamicGraph, GraphNode, CareerTemplate } from '../data';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import CornerCuts from './CornerCuts';

interface RoadmapViewProps {
  onboardingData: OnboardingData;
  onReset: () => void;
}

export default function RoadmapView({ onboardingData, onReset }: RoadmapViewProps) {
  // Current career active
  const [currentCareer, setCurrentCareer] = useState<string>(onboardingData.career || 'Administración de Empresas');
  
  // Custom AI template state
  const [customTemplate, setCustomTemplate] = useState<CareerTemplate | null>(null);
  const [loadingRoadmap, setLoadingRoadmap] = useState<boolean>(true);
  const [roadmapError, setRoadmapError] = useState<string | null>(null);

  // Exporting state
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Track node status dynamically ('no_iniciado', 'en_progreso', 'aprendido')
  const [nodeStatuses, setNodeStatuses] = useState<Record<string, 'no_iniciado' | 'en_progreso' | 'aprendido'>>({});

  // Track completed transition gap skills for Practicante nodes
  const [masteredTransitionGaps, setMasteredTransitionGaps] = useState<Record<string, string[]>>({});
  
  // Selected node for details inspector
  const [selectedNodeId, setSelectedNodeId] = useState<string>('');
  
  // Active route filter for isolating pathways
  const [activeRouteFilter, setActiveRouteFilter] = useState<string>('all');
  
  // Hovered node to highlight connections
  const [hoveredNodeId, setHoveredNodeId] = useState<string>('');

  // 1. WHITEBOARD ZOOM & PAN STATES
  const [zoom, setZoom] = useState<number>(0.65);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 50, y: 120 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const whiteboardRef = useRef<HTMLDivElement>(null);

  // Fetch custom AI template on mount / change
  useEffect(() => {
    const fetchCustomRoadmap = async () => {
      setLoadingRoadmap(true);
      setRoadmapError(null);
      
      const careerKey = currentCareer.trim().replace(/\s+/g, '_').toLowerCase();
      const industryKey = (onboardingData.industry || 'general').trim().replace(/\s+/g, '_').toLowerCase();
      const positionKey = (onboardingData.currentPosition || '').trim().replace(/\s+/g, '_').toLowerCase();
      const cacheKey = `journey_template_${careerKey}_${industryKey}_${positionKey}_v4`;
      
      const saved = localStorage.getItem(cacheKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setCustomTemplate(parsed);
          setLoadingRoadmap(false);
          return;
        } catch (e) {
          console.error('Error parsing cached template', e);
        }
      }
      
      try {
        const res = await fetch('/api/roadmap', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            career: currentCareer,
            industry: onboardingData.industry,
            currentPosition: onboardingData.currentPosition || '',
            stage: onboardingData.stage || 'estudiante'
          })
        });
        if (!res.ok) {
          let errMsg = 'Fallo al generar el mapa interactivo';
          try {
            const errData = await res.json();
            if (errData && errData.error) {
              errMsg = `Fallo al generar el mapa: ${errData.error}`;
            }
          } catch (_) {}
          throw new Error(errMsg);
        }
        const data = await res.json();
        if (data.template) {
          setCustomTemplate(data.template);
          localStorage.setItem(cacheKey, JSON.stringify(data.template));
        } else {
          throw new Error('No se recibió la plantilla de IA');
        }
      } catch (err: any) {
        console.error('Error fetching custom roadmap:', err);
        setRoadmapError(err.message || 'No pudimos construir el mapa personalizado con IA debido a las limitaciones de red del entorno de previsualización. Usando plantilla de respaldo.');
      } finally {
        setLoadingRoadmap(false);
      }
    };

    fetchCustomRoadmap();
  }, [currentCareer, onboardingData.industry]);

  // Retrieve dynamic nodes
  const graphNodes = generateDynamicGraph(
    currentCareer, 
    onboardingData.stage || 'estudiante', 
    onboardingData.industry,
    customTemplate || undefined,
    onboardingData.currentPosition
  );

  // Load status from cache or initialize
  useEffect(() => {
    if (loadingRoadmap) return;
    const cacheKey = `journey_status_${currentCareer.replace(/\s+/g, '_').toLowerCase()}`;
    const saved = localStorage.getItem(cacheKey);
    if (saved) {
      try {
        setNodeStatuses(JSON.parse(saved));
      } catch (e) {
        initializeStatuses();
      }
    } else {
      initializeStatuses();
    }

    // Load transition gaps
    const gapsCacheKey = `journey_gaps_${currentCareer.replace(/\s+/g, '_').toLowerCase()}`;
    const savedGaps = localStorage.getItem(gapsCacheKey);
    if (savedGaps) {
      try {
        setMasteredTransitionGaps(JSON.parse(savedGaps));
      } catch (e) {}
    }

    // Auto select first node
    const firstNode = graphNodes.find(n => n.level === 'base') || graphNodes[0];
    if (firstNode) {
      setSelectedNodeId(firstNode.id);
    }

    // Auto center whiteboard view on base node
    centerOnNode('dynamic-base');
  }, [currentCareer, loadingRoadmap, graphNodes.length]);

  const initializeStatuses = () => {
    const initial: Record<string, 'no_iniciado' | 'en_progreso' | 'aprendido'> = {};
    graphNodes.forEach(node => {
      // Base node is 'en_progreso' or 'aprendido' depending on stage
      if (node.level === 'base') {
        initial[node.id] = 'en_progreso';
      } else {
        initial[node.id] = 'no_iniciado';
      }
    });
    setNodeStatuses(initial);
  };

  const updateNodeStatus = (nodeId: string, newStatus: 'no_iniciado' | 'en_progreso' | 'aprendido') => {
    const updated = { ...nodeStatuses, [nodeId]: newStatus };
    setNodeStatuses(updated);
    const cacheKey = `journey_status_${currentCareer.replace(/\s+/g, '_').toLowerCase()}`;
    localStorage.setItem(cacheKey, JSON.stringify(updated));
  };

  const toggleGapMastered = (nodeId: string, gapName: string) => {
    setMasteredTransitionGaps((prev) => {
      const current = prev[nodeId] || [];
      const updatedGaps = current.includes(gapName)
        ? current.filter((g) => g !== gapName)
        : [...current, gapName];
      
      const updated = { ...prev, [nodeId]: updatedGaps };
      const gapsCacheKey = `journey_gaps_${currentCareer.replace(/\s+/g, '_').toLowerCase()}`;
      localStorage.setItem(gapsCacheKey, JSON.stringify(updated));
      return updated;
    });
  };

  // Progress Calculations
  const totalNodesCount = graphNodes.length;
  const learnedNodesCount = Object.keys(nodeStatuses).filter(id => nodeStatuses[id] === 'aprendido').length;
  const inProgressNodesCount = Object.keys(nodeStatuses).filter(id => nodeStatuses[id] === 'en_progreso').length;
  
  const progressPercent = totalNodesCount > 0 
    ? Math.round(((learnedNodesCount + (inProgressNodesCount * 0.5)) / totalNodesCount) * 100) 
    : 0;

  // Selected node details
  const selectedNode = graphNodes.find(n => n.id === selectedNodeId) || graphNodes[0];

  // Whitelist/Filter helpers
  const isNodeDimmed = (node: GraphNode): boolean => {
    if (activeRouteFilter !== 'all' && node.route !== 'base' && node.route !== 'all' && node.route !== activeRouteFilter) {
      return true;
    }
    if (hoveredNodeId) {
      const hoveredNode = graphNodes.find(n => n.id === hoveredNodeId);
      if (hoveredNode) {
        if (node.id === hoveredNodeId) return false;
        // Keep parent dependency path active
        if (hoveredNode.dependencies.includes(node.id)) return false;
        // Keep child dependency path active
        if (node.dependencies.includes(hoveredNode.id)) return false;
        // Keep same route active
        if (hoveredNode.route !== 'base' && node.route !== 'base' && node.route !== hoveredNode.route) {
          return true;
        }
      }
    }
    return false;
  };

  // Compute full dependency path to light up
  const getPathToNode = (nodeId: string, visited = new Set<string>()): Set<string> => {
    if (!nodeId || visited.has(nodeId)) return visited;
    visited.add(nodeId);
    const node = graphNodes.find(n => n.id === nodeId);
    if (node && node.dependencies) {
      node.dependencies.forEach(depId => {
        getPathToNode(depId, visited);
      });
    }
    return visited;
  };

  const selectedPathIds = getPathToNode(selectedNodeId);

  // PDF Export logic
  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      const page1 = document.getElementById('pdf-page-1');
      const page2 = document.getElementById('pdf-page-2');
      
      if (!page1) {
        throw new Error('No se encontró el lienzo de exportación de PDF.');
      }

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // Render page 1
      const canvas1 = await html2canvas(page1, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#f8fafc'
      });
      const imgData1 = canvas1.toDataURL('image/jpeg', 0.95);
      pdf.addImage(imgData1, 'JPEG', 0, 0, 297, 210);

      // Render page 2 if progression template exists
      if (page2) {
        pdf.addPage();
        const canvas2 = await html2canvas(page2, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#f8fafc'
        });
        const imgData2 = canvas2.toDataURL('image/jpeg', 0.95);
        pdf.addImage(imgData2, 'JPEG', 0, 0, 297, 210);
      }

      const fileName = `Roadmap_${currentCareer.trim().replace(/\s+/g, '_')}_Journey.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error al exportar PDF:', error);
      alert('Hubo un error al generar tu PDF interactivo. Por favor, intenta nuevamente.');
    } finally {
      setIsExporting(false);
    }
  };

  // Whiteboard interaction handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.whiteboard-node-card') || (e.target as HTMLElement).closest('button')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('.whiteboard-node-card') || (e.target as HTMLElement).closest('button')) return;
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    setPan({ x: touch.clientX - dragStart.x, y: touch.clientY - dragStart.y });
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Only zoom on wheel if mouse is in canvas
    e.preventDefault();
    const zoomFactor = 1.08;
    let newZoom = zoom;
    if (e.deltaY < 0) {
      newZoom = Math.min(zoom * zoomFactor, 1.4);
    } else {
      newZoom = Math.max(zoom / zoomFactor, 0.35);
    }
    setZoom(newZoom);
  };

  // Helper views focus controls
  const centerOnNode = (nodeId: string) => {
    let node = graphNodes.find(n => n.id === nodeId);
    if (!node && nodeId === 'dynamic-base') {
      node = graphNodes.find(n => n.id === 'row-1-start') || graphNodes[0];
    }
    if (node && whiteboardRef.current) {
      const containerWidth = whiteboardRef.current.clientWidth;
      const containerHeight = whiteboardRef.current.clientHeight;
      // Center position with standard zoom
      const targetZoom = 0.75;
      setZoom(targetZoom);
      setPan({
        x: (containerWidth / 2) - (node.x * targetZoom) - 80,
        y: (containerHeight / 2) - (node.y * targetZoom) - 40
      });
    }
  };

  const resetToFitAll = () => {
    if (whiteboardRef.current) {
      setZoom(0.42);
      setPan({ x: 30, y: 150 });
    }
  };

  // Node badge/border colors
  const getNodeColorClasses = (type: GraphNode['type'], isSelected: boolean) => {
    const base = "whiteboard-node-card border-2 transition-all duration-200 cursor-pointer p-3.5 rounded-none w-[220px] h-[104px] text-left flex flex-col justify-between";
    switch (type) {
      case 'base':
        return {
          card: `${base} border-brand-blue ${isSelected ? 'bg-brand-light-blue shadow-[3px_3px_0px_rgba(51,49,51,1)]' : 'bg-white hover:bg-brand-light-blue/20 hover:shadow-[3px_3px_0px_rgba(51,49,51,1)]'}`,
          badge: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
          glow: 'rgba(0, 66, 255, 0.1)'
        };
      case 'tecnico':
        return {
          card: `${base} border-[#6366F1] ${isSelected ? 'bg-indigo-50 shadow-[3px_3px_0px_rgba(51,49,51,1)]' : 'bg-white hover:bg-indigo-50/20 hover:shadow-[3px_3px_0px_rgba(51,49,51,1)]'}`,
          badge: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
          glow: 'rgba(99, 102, 241, 0.1)'
        };
      case 'herramienta':
        return {
          card: `${base} border-[#06B6D4] ${isSelected ? 'bg-cyan-50 shadow-[3px_3px_0px_rgba(51,49,51,1)]' : 'bg-white hover:bg-cyan-50/20 hover:shadow-[3px_3px_0px_rgba(51,49,51,1)]'}`,
          badge: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
          glow: 'rgba(6, 182, 212, 0.1)'
        };
      case 'blanda':
        return {
          card: `${base} border-[#EC4899] ${isSelected ? 'bg-pink-50 shadow-[3px_3px_0px_rgba(51,49,51,1)]' : 'bg-white hover:bg-pink-50/20 hover:shadow-[3px_3px_0px_rgba(51,49,51,1)]'}`,
          badge: 'bg-pink-500/10 text-pink-600 border-pink-500/20',
          glow: 'rgba(236, 72, 153, 0.1)'
        };
      case 'rama':
        return {
          card: `${base} border-[#8B5CF6] ${isSelected ? 'bg-purple-50 shadow-[3px_3px_0px_rgba(51,49,51,1)]' : 'bg-white hover:bg-purple-50/20 hover:shadow-[3px_3px_0px_rgba(51,49,51,1)]'}`,
          badge: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
          glow: 'rgba(139, 92, 246, 0.1)'
        };
      case 'práctica':
        return {
          card: `${base} border-[#F59E0B] ${isSelected ? 'bg-amber-50 shadow-[3px_3px_0px_rgba(51,49,51,1)]' : 'bg-white hover:bg-amber-50/20 hover:shadow-[3px_3px_0px_rgba(51,49,51,1)]'}`,
          badge: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
          glow: 'rgba(245, 158, 11, 0.1)'
        };
      case 'junior':
        return {
          card: `${base} border-[#F43F5E] ${isSelected ? 'bg-rose-50 shadow-[3px_3px_0px_rgba(51,49,51,1)]' : 'bg-white hover:bg-rose-50/20 hover:shadow-[3px_3px_0px_rgba(51,49,51,1)]'}`,
          badge: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
          glow: 'rgba(244, 63, 94, 0.1)'
        };
      case 'especialización':
        return {
          card: `${base} border-[#D946EF] ${isSelected ? 'bg-fuchsia-50 shadow-[3px_3px_0px_rgba(51,49,51,1)]' : 'bg-white hover:bg-fuchsia-50/20 hover:shadow-[3px_3px_0px_rgba(51,49,51,1)]'}`,
          badge: 'bg-fuchsia-500/10 text-fuchsia-600 border-fuchsia-500/20',
          glow: 'rgba(217, 70, 239, 0.1)'
        };
      default:
        return {
          card: `${base} border-brand-charcoal bg-white`,
          badge: 'bg-brand-bg text-brand-charcoal border-brand-charcoal/20',
          glow: 'rgba(51, 49, 51, 0.05)'
        };
    }
  };

  // Determine starting flag location based on user onboarding stage
  const isStartingNodeForUser = (node: GraphNode): boolean => {
    const stage = onboardingData.stage?.toLowerCase() || '';
    if (node.level === 'base' && (stage.includes('estudiante') || stage === '')) {
      return true;
    }
    if (node.level === 'práctica' && (stage.includes('practicante') || stage.includes('egresado') || stage.includes('buscando'))) {
      return true;
    }
    if (node.level === 'junior' && stage.includes('junior')) {
      return true;
    }
    return false;
  };

  if (loadingRoadmap) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="min-h-[50vh] flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 text-center bg-white border-2 border-brand-charcoal shadow-[6px_6px_0px_rgba(51,49,51,1)] max-w-3xl mx-auto my-4 relative overflow-hidden">
          <CornerCuts size={16} color="text-brand-bg" />
          <div className="relative mb-8">
            <div className="relative bg-brand-light-blue p-5 border-2 border-brand-charcoal shadow-[3px_3px_0px_rgba(51,49,51,1)]">
              <CornerCuts size={8} color="text-white" />
              <Sparkles className="h-9 w-9 text-brand-blue animate-spin" style={{ animationDuration: '3s' }} />
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-brand-charcoal">
            Estructurando tu Roadmap con IA
          </h3>
          
          <p className="text-brand-charcoal/70 text-xs sm:text-sm max-w-md mt-2 leading-relaxed font-medium">
            Diseñando un mapa interactivo personalizado adaptado específicamente para tu carrera e industria de enfoque.
          </p>

          <div className="w-full max-w-sm mt-8 space-y-3 text-left">
            <div className="flex items-center gap-3 bg-brand-bg p-3.5 border-2 border-brand-charcoal">
              <div className="h-2 w-2 rounded-full bg-brand-blue animate-ping" />
              <span className="text-xs font-bold text-brand-charcoal font-mono uppercase">
                Industria: <span className="text-brand-blue">{onboardingData.industry}</span>
              </span>
            </div>

            <div className="flex items-center gap-3 bg-[#FFFFFF] p-3.5 border-2 border-brand-charcoal">
              <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-xs text-brand-charcoal/70 font-mono uppercase font-bold">
                Mapeando requisitos y habilidades técnicas
              </span>
            </div>
          </div>

          <div className="w-full max-w-xs bg-white border-2 border-brand-charcoal h-3 rounded-none mt-10 overflow-hidden relative">
            <div className="bg-brand-blue h-full w-2/3 animate-pulse border-r border-brand-charcoal" />
          </div>
          
          <span className="text-[9px] font-mono font-bold text-brand-charcoal/50 mt-4 uppercase tracking-wider">
            Gemini 3.5 Flash · Copiloto de Orientación Profesional
          </span>
        </div>
      </div>
    );
  }

  if (roadmapError) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="min-h-[40vh] flex flex-col items-center justify-center py-12 px-6 text-center bg-white border-2 border-brand-charcoal shadow-[6px_6px_0px_rgba(51,49,51,1)] max-w-2xl mx-auto my-4 relative overflow-hidden">
          <CornerCuts size={16} color="text-red-50" />
          <div className="relative mb-6">
            <div className="bg-red-50 p-4 border-2 border-brand-charcoal shadow-[3px_3px_0px_rgba(51,49,51,1)]">
              <CornerCuts size={8} color="text-white" />
              <span className="text-3xl">⚠️</span>
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-red-600">
            Error de Generación AI
          </h3>
          <p className="text-brand-charcoal/80 text-sm mt-3 leading-relaxed font-semibold max-w-md">
            {roadmapError}
          </p>
          <button
            onClick={onReset}
            className="brutalist-button brutalist-button-primary mt-8 py-2.5 px-6 font-bold flex items-center justify-center gap-2"
          >
            <CornerCuts size={6} color="text-brand-blue" />
            <RotateCcw className="h-4 w-4" />
            Volver a intentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
      
      {/* 1. TOP HEADER & METRIC SUMMARY */}
      <div className="mb-6 border-b-2 border-brand-charcoal/10 pb-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue bg-brand-light-blue px-3 py-1 border border-brand-blue/30 flex items-center gap-1.5 font-mono">
                <GitBranch className="h-3.5 w-3.5" />
                [ Árbol de Carrera Interactivo ]
              </span>
              <span className="text-[9px] text-emerald-600 bg-emerald-50 border border-emerald-500/20 px-2.5 py-0.5 rounded uppercase font-bold font-mono">
                Multidimensional (zoom/pan)
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-brand-charcoal tracking-tight">
              Rutas de Carrera: <span className="text-brand-blue">{currentCareer}</span>
            </h2>
            <p className="text-xs sm:text-sm text-brand-charcoal/70 mt-1 max-w-3xl font-medium">
              Un mapa interactivo diseñado tipo pizarra. Explora las bases, herramientas avanzadas y las ramas laborales reales. Haz clic en los puestos para descubrir requerimientos de contratación reales.
            </p>
            {onboardingData.stage && (
              <div className="text-xs text-brand-charcoal/80 flex flex-wrap items-center gap-2 mt-3.5 bg-white border-2 border-brand-charcoal px-3 py-1.5 w-fit">
                <span className="text-[10px] text-brand-charcoal/60 uppercase tracking-widest font-mono font-bold">Perfil:</span>
                <span className="text-brand-blue font-bold font-mono text-[11px] uppercase">
                  [{onboardingData.stage}]
                </span>
                {onboardingData.industry && (
                  <>
                    <span className="text-brand-charcoal/30">|</span>
                    <span className="text-[10px] text-brand-charcoal/60 uppercase tracking-widest font-mono font-bold">Industria:</span>
                    <span className="text-purple-600 font-bold font-mono text-[11px] uppercase">
                      [{onboardingData.industry}]
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Local state metrics */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="bg-white border-2 border-brand-charcoal rounded-none px-4 py-2.5 min-w-[210px] shadow-[2px_2px_0px_rgba(51,49,51,1)]">
              <div className="flex justify-between items-center text-[10px] text-brand-charcoal font-mono mb-1.5 font-bold">
                <span className="uppercase tracking-widest flex items-center gap-1">
                  <Activity className="h-3 w-3 text-emerald-600" /> Progreso del Mapa
                </span>
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full bg-brand-bg border border-brand-charcoal h-3 overflow-hidden mb-1 relative">
                <div className="bg-emerald-500 h-full border-r border-brand-charcoal transition-all duration-300" style={{ width: `${progressPercent}%` }} />
              </div>
              <span className="text-[9px] text-brand-charcoal/60 font-mono font-bold uppercase">
                {learnedNodesCount} aprendido · {inProgressNodesCount} en curso
              </span>
            </div>

            <button
              onClick={exportToPDF}
              disabled={isExporting}
              className="brutalist-button brutalist-button-primary text-xs py-2.5 px-4 flex items-center justify-center gap-2"
            >
              <CornerCuts size={6} color="text-brand-blue" />
              {isExporting ? (
                <>
                  <div className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generando PDF...
                </>
              ) : (
                <>
                  <FileText className="h-3.5 w-3.5" />
                  Exportar PDF
                </>
              )}
            </button>

            <button
              onClick={onReset}
              className="brutalist-button brutalist-button-secondary text-xs py-2.5 px-4 flex items-center justify-center gap-2"
            >
              <CornerCuts size={6} color="text-white" />
              <RotateCcw className="h-3.5 w-3.5" />
              Editar Filtros
            </button>
          </div>
        </div>

        {/* 2. ISOLATED PATHWAY FILTERS BAR */}
        <div className="flex flex-col gap-2 mt-4">
          <span className="text-xs font-black font-mono text-brand-charcoal uppercase tracking-wider">[ Aislar Especialidad ]</span>
          <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 select-none">
            <button
              onClick={() => setActiveRouteFilter('all')}
              className={`brutalist-button text-xs py-1.5 px-3 shadow-[1px_1px_0px_rgba(51,49,51,1)] ${
                activeRouteFilter === 'all'
                  ? 'bg-brand-blue text-white'
                  : 'bg-white text-brand-charcoal'
              }`}
            >
              <CornerCuts size={6} color={activeRouteFilter === 'all' ? "text-brand-blue" : "text-white"} />
              Todo el Árbol
            </button>

            {graphNodes.filter(n => n.level === 'rama').map((node, rIdx) => {
              const routeId = node.route;
              const isSelected = activeRouteFilter === routeId;
              const routeColors = ['bg-purple-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500'];
              const dotColor = routeColors[rIdx % routeColors.length];

              return (
                <button
                  key={node.id}
                  onClick={() => setActiveRouteFilter(routeId)}
                  className={`brutalist-button text-xs py-1.5 px-3 shadow-[1px_1px_0px_rgba(51,49,51,1)] whitespace-nowrap ${
                    isSelected
                      ? 'bg-brand-charcoal text-white'
                      : 'bg-white text-brand-charcoal'
                  }`}
                >
                  <CornerCuts size={6} color={isSelected ? "text-brand-charcoal" : "text-white"} />
                  <span className={`h-1.5 w-1.5 rounded-full ${dotColor} border border-brand-charcoal/20 shrink-0`} />
                  {node.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>



      {/* 3. WHITEBOARD CANVAS VIEWPORT CONTAINER (EXPANDED TO FULL WIDTH) */}
      <div className="w-full flex flex-col gap-6">
        
        {/* VIRTUAL WHITEBOARD CANVAS */}
        <div className="w-full flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-1 text-xs text-brand-charcoal/50 font-mono font-bold uppercase">
            <span>PIZARRA VIRTUAL INTERACTIVA (EXPLORABLE)</span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Navegación 2D Soportada
            </span>
          </div>

          <div 
            ref={whiteboardRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUpOrLeave}
            onWheel={handleWheel}
            className="relative overflow-hidden w-full h-[740px] bg-white border-2 border-brand-charcoal cursor-grab active:cursor-grabbing select-none"
          >
            {/* WHITEBOARD WATERMARK GRIDS (Light Mode charcoal dot style) */}
            <div 
              className="absolute inset-0 transition-transform duration-75 origin-top-left pointer-events-none"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                backgroundImage: 'radial-gradient(rgba(51, 49, 51, 0.1) 1.2px, transparent 1.2px)',
                backgroundSize: '32px 32px'
              }}
            />

            {/* WHITEBOARD SCALE AND TRANSLATION WRAPPER */}
            <div 
              className="absolute inset-0 transition-transform duration-75 origin-top-left"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                width: '5200px',
                height: '1600px'
              }}
            >
              
              {/* SVG CONNECTOR CURVES LAYER */}
              <svg 
                className="absolute inset-0 pointer-events-none z-0" 
                style={{ width: '100%', height: '100%' }}
              >
                <defs>
                  {/* Dynamic gradients for active neon lines */}
                  <linearGradient id="activeLine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0042FF" />
                    <stop offset="50%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#00D2FF" />
                  </linearGradient>
                  
                  <linearGradient id="normalLine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#334155" />
                  </linearGradient>

                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* DRAW ALL BEZIER CONNECTIONS */}
                {graphNodes.map(node => {
                  if (!node.dependencies || node.dependencies.length === 0) return null;

                  return node.dependencies.map(depId => {
                    const parent = graphNodes.find(n => n.id === depId);
                    if (!parent) return null;

                    // Compute node boundaries (card width is 220px, height is 104px)
                    const x1 = parent.x + 220;
                    const y1 = parent.y + 52;
                    const x2 = node.x;
                    const y2 = node.y + 52;

                    // Check if path is isolated/highlighted
                    let isPathHighlighted = false;
                    let isPathDimmed = false;

                    // Case A: Filter active
                    if (activeRouteFilter !== 'all') {
                      const isNodeInRoute = node.route === 'base' || node.route === activeRouteFilter;
                      const isParentInRoute = parent.route === 'base' || parent.route === activeRouteFilter;
                      if (isNodeInRoute && isParentInRoute) {
                        isPathHighlighted = true;
                      } else {
                        isPathDimmed = true;
                      }
                    }

                    // Case B: Glowing path tracer to selected node
                    if (selectedPathIds.has(node.id) && selectedPathIds.has(parent.id)) {
                      isPathHighlighted = true;
                      isPathDimmed = false;
                    }

                    if (parent.level === 'práctica' && node.level === 'junior') {
                      const gaps = parent.transitionGap || [];
                      const N = gaps.length;
                      
                      return (
                        <g key={`${parent.id}-${node.id}-gaps-curves`}>
                          {gaps.map((gap, idx) => {
                            const cardY = parent.y - ((N - 1) * 126) / 2 + idx * 126;
                            const cardCenterY = cardY + 55;

                            // Curve 1: parent -> Gap Card Left
                            const bx1 = parent.x + 220;
                            const by1 = parent.y + 52;
                            const bx2 = 1930;
                            const by2 = cardCenterY;

                            // Curve 2: Gap Card Right -> junior
                            const jx1 = 2260;
                            const jy1 = cardCenterY;
                            const jx2 = node.x;
                            const jy2 = node.y + 52;

                            const controlOffset1 = Math.abs(bx2 - bx1) * 0.45;
                            const pathData1 = `M ${bx1} ${by1} C ${bx1 + controlOffset1} ${by1}, ${bx2 - controlOffset1} ${by2}, ${bx2} ${by2}`;

                            const controlOffset2 = Math.abs(jx2 - jx1) * 0.45;
                            const pathData2 = `M ${jx1} ${jy1} C ${jx1 + controlOffset2} ${jy1}, ${jx2 - controlOffset2} ${jy2}, ${jx2} ${jy2}`;

                            // Determine if this specific gap is mastered
                            const masteredGaps = masteredTransitionGaps[parent.id] || [];
                            const isGapMastered = masteredGaps.includes(gap.name);

                            // Highlight the line if path is highlighted or gap is mastered
                            const isLineActive = isPathHighlighted || isGapMastered;

                            return (
                              <g key={`${parent.id}-${node.id}-gap-curve-${idx}`}>
                                {/* Segment 1 */}
                                {isLineActive && (
                                  <path 
                                    d={pathData1} 
                                    stroke={isGapMastered ? "#10b981" : "url(#activeLine)"} 
                                    strokeWidth="5" 
                                    fill="none" 
                                    strokeOpacity="0.4"
                                    filter="url(#glow)"
                                    className="transition-all duration-300"
                                  />
                                )}
                                <path 
                                  d={pathData1} 
                                  stroke={isLineActive ? (isGapMastered ? "#10b981" : "url(#activeLine)") : "rgba(51, 49, 51, 0.15)"} 
                                  strokeWidth={isLineActive ? "2.5" : "1.5"} 
                                  fill="none" 
                                  strokeDasharray={isLineActive ? "6, 4" : "none"}
                                  style={isLineActive ? {
                                    strokeDashoffset: 10,
                                    animation: 'flowLine 1.5s linear infinite'
                                  } : undefined}
                                  className={`transition-all duration-300 ${isPathDimmed ? 'opacity-10' : 'opacity-100'}`}
                                />

                                {/* Segment 2 */}
                                {isLineActive && (
                                  <path 
                                    d={pathData2} 
                                    stroke={isGapMastered ? "#10b981" : "url(#activeLine)"} 
                                    strokeWidth="5" 
                                    fill="none" 
                                    strokeOpacity="0.4"
                                    filter="url(#glow)"
                                    className="transition-all duration-300"
                                  />
                                )}
                                <path 
                                  d={pathData2} 
                                  stroke={isLineActive ? (isGapMastered ? "#10b981" : "url(#activeLine)") : "rgba(51, 49, 51, 0.15)"} 
                                  strokeWidth={isLineActive ? "2.5" : "1.5"} 
                                  fill="none" 
                                  strokeDasharray={isLineActive ? "6, 4" : "none"}
                                  style={isLineActive ? {
                                    strokeDashoffset: 10,
                                    animation: 'flowLine 1.5s linear infinite'
                                  } : undefined}
                                  className={`transition-all duration-300 ${isPathDimmed ? 'opacity-10' : 'opacity-100'}`}
                                />
                              </g>
                            );
                          })}
                        </g>
                      );
                    }

                    // Horizontal cubic bezier curve
                    const controlOffset = Math.abs(x2 - x1) * 0.45;
                    const pathData = `M ${x1} ${y1} C ${x1 + controlOffset} ${y1}, ${x2 - controlOffset} ${y2}, ${x2} ${y2}`;

                    return (
                      <g key={`${parent.id}-${node.id}`}>
                        {/* Glowing backdrop path */}
                        {isPathHighlighted && (
                          <path 
                            d={pathData} 
                            stroke="url(#activeLine)" 
                            strokeWidth="5" 
                            fill="none" 
                            strokeOpacity="0.4"
                            filter="url(#glow)"
                            className="transition-all duration-300"
                          />
                        )}

                        {/* Solid connector path */}
                        <path 
                          d={pathData} 
                          stroke={isPathHighlighted ? "url(#activeLine)" : "rgba(51, 49, 51, 0.15)"} 
                          strokeWidth={isPathHighlighted ? "2.5" : "1.5"} 
                          fill="none" 
                          strokeDasharray={isPathHighlighted ? "6, 4" : "none"}
                          style={isPathHighlighted ? {
                            strokeDashoffset: 10,
                            animation: 'flowLine 1.5s linear infinite'
                          } : undefined}
                          className={`transition-all duration-300 ${isPathDimmed ? 'opacity-10' : 'opacity-100'}`}
                        />
                      </g>
                    );
                  });
                })}
              </svg>

              {/* STAGE SEPARATOR HEADER LABELS */}
              <div className="absolute top-4 left-0 right-0 h-8 flex pointer-events-none select-none px-4 text-gray-500 text-[10px] font-mono uppercase tracking-widest font-extrabold z-10">
                {onboardingData.stage?.toLowerCase().includes('estudiante') ? (
                  <>
                    <div className="absolute" style={{ left: '120px' }}>Carrera Base</div>
                    <div className="absolute" style={{ left: '380px' }}>Fundamentos</div>
                    <div className="absolute" style={{ left: '640px' }}>Herramientas</div>
                    <div className="absolute" style={{ left: '940px' }}>1. Puestos de Prácticas</div>
                    <div className="absolute" style={{ left: '1220px' }}>2. Herramientas / Habilidades</div>
                    <div className="absolute" style={{ left: '1500px' }}>3. Puestos Alternativos</div>
                    <div className="absolute" style={{ left: '1780px' }}>4. Puestos Junior</div>
                    <div className="absolute" style={{ left: '2060px' }}>5. Competencias Senior</div>
                    <div className="absolute" style={{ left: '2340px' }}>6. Certificaciones / Postgrados</div>
                    <div className="absolute" style={{ left: '2620px' }}>7. Puestos Senior / Specialist</div>
                  </>
                ) : (
                  <>
                    <div className="absolute" style={{ left: '150px' }}>1. Puestos de Prácticas</div>
                    <div className="absolute" style={{ left: '430px' }}>2. Herramientas / Habilidades</div>
                    <div className="absolute" style={{ left: '710px' }}>3. Puestos Alternativos</div>
                    <div className="absolute" style={{ left: '990px' }}>4. Puestos Junior</div>
                    <div className="absolute" style={{ left: '1270px' }}>5. Competencias Senior</div>
                    <div className="absolute" style={{ left: '1550px' }}>6. Certificaciones / Postgrados</div>
                    <div className="absolute" style={{ left: '1830px' }}>7. Puestos Senior / Specialist</div>
                  </>
                )}
              </div>

              {/* CARD NODES GRID CONTROLLER */}
              {graphNodes.map(node => {
                const isSelected = selectedNodeId === node.id;
                const isDimmed = isNodeDimmed(node);
                const currentStatus = nodeStatuses[node.id] || 'no_iniciado';
                const styles = getNodeColorClasses(node.type, isSelected);
                const isUserStart = isStartingNodeForUser(node);

                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId('')}
                    style={{
                      position: 'absolute',
                      left: `${node.x}px`,
                      top: `${node.y}px`
                    }}
                    className={`transition-all duration-300 transform select-none ${
                      isDimmed ? 'opacity-20 scale-90' : isSelected ? 'scale-105 z-20' : 'scale-100 hover:scale-102 hover:z-10'
                    }`}
                  >
                    {/* User starting point flag */}
                    {isUserStart && (
                      <div className="absolute -top-7 left-3 z-30 bg-amber-500 text-brand-charcoal text-[9px] font-mono font-bold px-2 py-0.5 border-2 border-brand-charcoal shadow-[2px_2px_0px_rgba(51,49,51,1)] flex items-center gap-1 uppercase tracking-wide">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-charcoal" />
                        Tu punto base
                      </div>
                    )}

                    <div className={styles.card}>
                      <CornerCuts size={8} color="text-brand-bg" />
                      <div className="flex items-start justify-between">
                        <span className={`text-[8px] font-mono uppercase font-black tracking-wider border-2 px-1.5 py-0.5 ${styles.badge}`}>
                          {node.type}
                        </span>

                        {/* Status Checker Icon */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            // cycle status click
                            const nextStatus = currentStatus === 'no_iniciado' ? 'en_progreso' : currentStatus === 'en_progreso' ? 'aprendido' : 'no_iniciado';
                            updateNodeStatus(node.id, nextStatus);
                          }}
                          className="p-0.5 rounded border border-brand-charcoal/20 hover:border-brand-charcoal bg-white transition-all cursor-pointer"
                        >
                          {currentStatus === 'aprendido' ? (
                            <div className="h-3.5 w-3.5 bg-emerald-500 border border-brand-charcoal flex items-center justify-center text-white">
                              <Check className="h-2.5 w-2.5 stroke-[3]" />
                            </div>
                          ) : currentStatus === 'en_progreso' ? (
                            <span className="h-3.5 w-3.5 border border-brand-charcoal bg-brand-blue animate-pulse block" />
                          ) : (
                            <span className="h-3.5 w-3.5 border border-brand-charcoal/20 bg-white block" />
                          )}
                        </button>
                      </div>

                      <div>
                        <p className="text-[11px] font-black text-brand-charcoal leading-snug line-clamp-2 pr-1">{node.title}</p>
                      </div>

                      <div className="flex justify-between items-center border-t-2 border-brand-charcoal/10 pt-1.5 text-[8.5px] text-brand-charcoal/60 font-mono font-bold uppercase">
                        <span className="text-[7.5px]">{node.priority}</span>
                        <span className="text-brand-blue hover:text-brand-blue/80 font-black flex items-center gap-0.5">
                          Detalles <ArrowRight className="h-2.5 w-2.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* RENDER BRECHAS DE TRANSICIÓN DIRECTAMENTE EN LA PIZARRA */}
              {graphNodes.filter(node => node.level === 'práctica' && node.transitionGap && node.transitionGap.length > 0).map(node => {
                const isDimmed = isNodeDimmed(node);
                const gaps = node.transitionGap || [];
                const masteredGaps = masteredTransitionGaps[node.id] || [];
                const N = gaps.length;

                return gaps.map((gap, idx) => {
                  const isMastered = masteredGaps.includes(gap.name);
                  // Calculate exact vertical position centered around parent's Y
                  const cardY = node.y - ((N - 1) * 126) / 2 + idx * 126;

                  const typeConfig = {
                    herramienta: {
                      bg: 'bg-cyan-500/5 hover:bg-cyan-500/10 border-cyan-500/10 hover:border-cyan-500/20',
                      badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
                      label: '🛠️ Herramienta',
                    },
                    técnica: {
                      bg: 'bg-indigo-500/5 hover:bg-indigo-500/10 border-indigo-500/10 hover:border-indigo-500/20',
                      badge: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
                      label: '⚡ Técnica',
                    },
                    blanda: {
                      bg: 'bg-fuchsia-500/5 hover:bg-fuchsia-500/10 border-fuchsia-500/10 hover:border-fuchsia-500/20',
                      badge: 'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20',
                      label: '💬 Blanda',
                    }
                  }[gap.type] || {
                    bg: 'bg-slate-500/5 border-slate-500/10',
                    badge: 'bg-slate-500/10 text-slate-300 border-slate-500/20',
                    label: 'Habilidad',
                  };

                  return (
                    <div
                      key={`brecha-card-${node.id}-${gap.name}`}
                      onClick={() => setSelectedNodeId(node.id)}
                      style={{
                        position: 'absolute',
                        left: '1930px',
                        top: `${cardY}px`,
                        width: '330px',
                        height: '110px',
                      }}
                      className={`transition-all duration-300 rounded-2xl border p-3.5 select-none text-left flex flex-col justify-between whiteboard-node-card cursor-pointer ${
                        isDimmed 
                          ? 'opacity-20 scale-90 pointer-events-none' 
                          : selectedNodeId === node.id
                            ? 'border-emerald-400 bg-emerald-950/40 shadow-[0_0_20px_rgba(16,185,129,0.3)] ring-2 ring-emerald-400/20'
                            : isMastered
                              ? 'border-emerald-500/40 bg-emerald-950/10 shadow-lg shadow-emerald-950/20 hover:border-emerald-400'
                              : 'border-indigo-500/25 bg-[#090d16]/95 hover:border-indigo-400 shadow-xl shadow-slate-950/40'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[8.5px] px-1.5 py-0.5 rounded border font-mono font-bold uppercase tracking-wide leading-none ${
                          isMastered ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : typeConfig.badge
                        }`}>
                          {typeConfig.label}
                        </span>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleGapMastered(node.id, gap.name);
                          }}
                          className={`flex-shrink-0 w-6 h-6 rounded-lg border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                            isMastered
                              ? 'bg-emerald-500 border-emerald-400 text-slate-950 hover:bg-emerald-400 animate-pulse'
                              : 'bg-slate-950 border-[rgba(255,255,255,0.1)] hover:border-emerald-500 text-slate-400 hover:text-emerald-300'
                          }`}
                          title={isMastered ? "Marcar como pendiente" : "Marcar como dominado"}
                        >
                          {isMastered ? (
                            <svg className="w-3.5 h-3.5 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="text-sm font-bold leading-none">+</span>
                          )}
                        </button>
                      </div>

                      <div className="flex-1 flex flex-col justify-center my-1.5 min-w-0">
                        <span className={`text-[12px] font-black truncate leading-tight ${isMastered ? 'text-emerald-300 line-through' : 'text-slate-100'}`}>
                          {gap.name}
                        </span>
                        <p className={`text-[10px] leading-snug line-clamp-2 mt-0.5 ${isMastered ? 'text-emerald-400/60' : 'text-slate-400'}`}>
                          {gap.desc}
                        </p>
                      </div>
                    </div>
                  );
                });
              })}

            </div>

            {/* WHITEBOARD CONTROLS FLOATING PANEL (HUD) */}
            <div className="absolute bottom-4 left-4 z-30 bg-white border-2 border-brand-charcoal rounded-none p-2 flex items-center gap-1 shadow-[3px_3px_0px_rgba(51,49,51,1)]">
              <button
                onClick={() => setZoom(z => Math.min(z + 0.1, 1.4))}
                title="Acercar"
                className="p-2 text-brand-charcoal hover:text-brand-blue transition-colors cursor-pointer"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button
                onClick={() => setZoom(z => Math.max(z - 0.1, 0.35))}
                title="Alejar"
                className="p-2 text-brand-charcoal hover:text-brand-blue transition-colors cursor-pointer"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <button
                onClick={() => centerOnNode('dynamic-base')}
                title="Centrar en Base"
                className="p-2 text-brand-charcoal hover:text-brand-blue transition-colors cursor-pointer flex items-center gap-1 text-[10px] font-mono uppercase font-bold"
              >
                <Maximize2 className="h-4 w-4" />
                <span>Enfocar</span>
              </button>
              <button
                onClick={resetToFitAll}
                title="Ver Mapa Completo"
                className="p-2 text-brand-charcoal hover:text-brand-blue transition-colors cursor-pointer text-[10px] font-mono uppercase font-bold"
              >
                Ajustar
              </button>

              <div className="h-4 w-px bg-brand-charcoal/20 mx-1" />
              
              <span className="text-[9px] text-brand-charcoal font-mono px-1 font-bold">
                Zoom: {Math.round(zoom * 100)}%
              </span>
            </div>

            {/* NAVIGATION HELPER INSTRUCTIONS */}
            <div className="absolute bottom-4 right-4 z-30 pointer-events-none bg-white border-2 border-brand-charcoal px-3 py-1.5 text-[9px] text-brand-charcoal/70 font-mono font-bold flex items-center gap-1.5">
              <Move className="h-3 w-3 text-brand-blue" />
              <span>Arrastra fondo para moverte · Scroll para zoom</span>
            </div>
          </div>
        </div>

        {/* DETAILS INSPECTOR PANEL (PLACED BELOW WHITEBOARD IN FULL WIDTH) */}
        <div className="w-full bg-white border-2 border-brand-charcoal rounded-none p-6 sm:p-8 shadow-[6px_6px_0px_rgba(51,49,51,1)] mt-4 flex flex-col justify-between relative overflow-hidden">
          <CornerCuts size={16} color="text-brand-bg" />
          <div>
            
            {/* Header of Inspector */}
            <div className="border-b-2 border-brand-charcoal/10 pb-5 mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-blue block mb-1 flex items-center gap-1.5">
                  <Info className="h-3.5 w-3.5 text-brand-blue" /> [ INSPECTOR DE PUESTO / SKILL ]
                </span>
                <h3 className="text-base sm:text-2xl font-black text-brand-charcoal uppercase leading-tight">
                  {selectedNode.title}
                </h3>
              </div>
              <span className={`text-[9px] uppercase tracking-wide font-mono font-black px-3 py-1 border-2 shrink-0 w-fit ${getNodeColorClasses(selectedNode.type, false).badge}`}>
                {selectedNode.type}
              </span>
            </div>

            {/* Quick Learning Status Control */}
            <div className="bg-brand-bg border-2 border-brand-charcoal rounded-none p-3.5 mb-5">
              <span className="text-[10px] text-brand-charcoal/60 font-mono font-bold block mb-2 uppercase tracking-wide">// ACTUALIZAR TU PROGRESO:</span>
              
              <div className="grid grid-cols-3 gap-1.5 select-none">
                {(['no_iniciado', 'en_progreso', 'aprendido'] as const).map((st) => {
                  const isActive = (nodeStatuses[selectedNode.id] || 'no_iniciado') === st;
                  let stLabel = 'Pendiente';
                  let activeClass = 'bg-[#FFFFFF] text-brand-charcoal border-brand-charcoal';

                  if (st === 'en_progreso') {
                    stLabel = 'En curso';
                    activeClass = 'bg-brand-light-blue text-brand-blue border-brand-blue';
                  } else if (st === 'aprendido') {
                    stLabel = 'Aprendido';
                    activeClass = 'bg-emerald-100 text-emerald-700 border-emerald-500';
                  }

                  return (
                    <button
                      key={st}
                      onClick={() => updateNodeStatus(selectedNode.id, st)}
                      className={`px-1.5 py-2 text-[10px] font-mono font-black uppercase border-2 transition-all text-center cursor-pointer ${
                        isActive 
                          ? activeClass + ' shadow-[1px_1px_0px_rgba(51,49,51,1)]'
                          : 'bg-white text-brand-charcoal/50 border-brand-charcoal/30 hover:text-brand-charcoal hover:border-brand-charcoal'
                      }`}
                    >
                      {st === 'aprendido' && isActive ? '✓ ' : ''}
                      {stLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* General Descriptions & Multi-Industry Contexts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start mt-6 pt-6 border-t-2 border-brand-charcoal/10">
              
              {/* COL 1: VISIÓN GENERAL E IMPORTANCIA */}
              <div className="space-y-5">
                <div>
                  <span className="text-[10px] text-brand-charcoal/50 font-mono uppercase font-bold tracking-wide block mb-1.5">[ ¿Qué es esta habilidad / puesto? ]</span>
                  <p className="text-xs text-brand-charcoal/80 leading-relaxed bg-brand-bg p-3 border border-brand-charcoal/10 font-medium">
                    {selectedNode.description}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] text-brand-blue font-mono uppercase tracking-wide block mb-1.5 font-black">[ ¿Por qué es fundamental? ]</span>
                  <p className="text-xs text-brand-charcoal/80 leading-relaxed bg-brand-light-blue/20 p-3 border border-brand-blue/20 font-medium">
                    {selectedNode.whyItMatters}
                  </p>
                </div>

                {/* ¿Cómo desarrollar esta habilidad / prepararse? */}
                {selectedNode.howToDevelop && (
                  <div className="pt-2 border-t-2 border-brand-charcoal/10">
                    <span className="text-[10px] text-emerald-600 font-mono uppercase tracking-wide block mb-1.5 font-black flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-emerald-600" /> [ ¿Cómo desarrollar la habilidad? ]
                    </span>
                    <div className="bg-emerald-50/30 border border-emerald-500/20 rounded-none p-3 text-xs text-brand-charcoal/80 leading-relaxed whitespace-pre-line font-medium">
                      {selectedNode.howToDevelop}
                    </div>
                  </div>
                )}
              </div>

              {/* COL 2: COMPETENCIAS Y TRANSICIÓN */}
              <div className="space-y-5">
                {/* HABILIDADES REQUERIDAS (TÉCNICO & BLANDO) */}
                {(selectedNode.requiredTechSkills || selectedNode.requiredSoftSkills) && (
                  <div className="pt-2 border-t-2 border-brand-charcoal/10 space-y-2.5">
                    <span className="text-[10px] text-brand-charcoal font-mono uppercase tracking-wide block mb-1.5 font-black flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5 text-brand-blue" /> [ Perfil Competencial Requerido ]
                    </span>
                    
                    {selectedNode.requiredTechSkills && (
                      <div className="bg-brand-bg border border-brand-charcoal/10 p-3">
                        <span className="text-[9px] text-brand-blue font-mono uppercase font-black block mb-1">// Habilidades Técnicas:</span>
                        <p className="text-[11px] text-brand-charcoal/80 leading-relaxed font-medium">
                          {selectedNode.requiredTechSkills}
                        </p>
                      </div>
                    )}

                    {selectedNode.requiredSoftSkills && (
                      <div className="bg-brand-bg border border-brand-charcoal/10 p-3">
                        <span className="text-[9px] text-pink-600 font-mono uppercase font-black block mb-1">// Habilidades Blandas:</span>
                        <p className="text-[11px] text-brand-charcoal/80 leading-relaxed font-medium">
                          {selectedNode.requiredSoftSkills}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* REQUISITOS Y PREPARACIÓN ESPECÍFICA PARA PRÁCTICAS */}
                {selectedNode.level === 'práctica' && (
                  <div className="pt-2 border-t-2 border-brand-charcoal/10 space-y-2.5">
                    <span className="text-[10px] text-amber-600 font-mono uppercase tracking-wide block mb-1.5 font-black flex items-center gap-1.5">
                      <GraduationCap className="h-3.5 w-3.5 text-amber-500" /> [ Preparación para Prácticas ]
                    </span>

                    {selectedNode.practicePrepWork && (
                      <div className="bg-amber-5/30 border border-amber-500/20 p-3">
                        <span className="text-[9px] text-amber-600 font-mono uppercase font-black block mb-1">// Qué desarrollar para calificar:</span>
                        <p className="text-[11px] text-brand-charcoal/80 leading-relaxed font-medium">
                          {selectedNode.practicePrepWork}
                        </p>
                      </div>
                    )}

                    {selectedNode.practicePrepTools && selectedNode.practicePrepTools.length > 0 && (
                      <div className="bg-brand-bg border border-brand-charcoal/10 p-3">
                        <span className="text-[9px] text-cyan-600 font-mono uppercase font-black block mb-2">// Herramientas Digitales:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedNode.practicePrepTools.map((tool) => (
                            <span key={tool} className="text-[10px] text-cyan-600 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 font-mono font-bold">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* BRECHA DE APRENDIZAJE: DE PRACTICANTE A JUNIOR */}
                {selectedNode.level === 'práctica' && selectedNode.transitionGap && selectedNode.transitionGap.length > 0 && (
                  <div className="pt-3 border-t-2 border-brand-charcoal/10 space-y-3">
                    <span className="text-[10px] text-emerald-600 font-mono uppercase tracking-wide font-black flex items-center gap-1.5 mb-1">
                      <Sparkles className="h-3.5 w-3.5 text-emerald-500 animate-pulse" /> [ Brecha para Ascender a Junior ]
                    </span>

                    <p className="text-[11px] text-brand-charcoal/70 leading-normal mb-1 font-medium">
                      Para dar el salto al puesto Junior, debes adquirir estas {selectedNode.transitionGap.length} habilidades críticas durante tus prácticas:
                    </p>

                    {/* Gauge metrics */}
                    <div className="flex items-center gap-4 bg-emerald-50/20 border border-emerald-500/20 p-3.5">
                      {/* Radial SVG Gauge */}
                      <div className="relative flex-shrink-0 flex items-center justify-center w-20 h-20 bg-white border border-brand-charcoal/10 rounded-full">
                        <svg className="w-full h-full transform -rotate-90">
                          {/* Track */}
                          <circle
                            cx="40"
                            cy="40"
                            r="32"
                            className="stroke-brand-charcoal/10"
                            strokeWidth="6"
                            fill="transparent"
                          />
                          {/* Fill */}
                          <circle
                            cx="40"
                            cy="40"
                            r="32"
                            className="stroke-emerald-500 transition-all duration-700 ease-out"
                            strokeWidth="6"
                            strokeDasharray={201.1}
                            strokeDashoffset={201.1 - (201.1 * Math.round(((masteredTransitionGaps[selectedNode.id] || []).length / selectedNode.transitionGap.length) * 100)) / 100}
                            strokeLinecap="round"
                            fill="transparent"
                          />
                        </svg>
                        {/* Inner Text */}
                        <div className="absolute flex flex-col items-center justify-center select-none">
                          <span className="text-sm sm:text-base font-black text-brand-charcoal font-mono leading-none">
                            {Math.round(((masteredTransitionGaps[selectedNode.id] || []).length / selectedNode.transitionGap.length) * 100)}%
                          </span>
                          <span className="text-[8px] text-emerald-600 font-mono font-bold mt-0.5 uppercase tracking-tight">
                            Listo
                          </span>
                        </div>
                      </div>

                      {/* Metric labels & text */}
                      <div className="flex-1 space-y-1">
                        <span className="text-[9px] text-emerald-600 font-mono uppercase tracking-wider font-bold">
                          PROGRESO DE BRECHA
                        </span>
                        <h4 className="text-[12px] font-black text-brand-charcoal leading-tight">
                          {(masteredTransitionGaps[selectedNode.id] || []).length} de {selectedNode.transitionGap.length} Dominados
                        </h4>
                        <p className="text-[10px] text-brand-charcoal/60 leading-snug font-medium">
                          {Math.round(((masteredTransitionGaps[selectedNode.id] || []).length / selectedNode.transitionGap.length) * 100) === 100
                            ? "¡Excelente! Has cerrado toda la brecha."
                            : "Domina las habilidades para calificar."}
                        </p>
                      </div>
                    </div>

                    {/* Interactive Cards for each Gap */}
                    <div className="space-y-2 pt-1">
                      {selectedNode.transitionGap.map((gap) => {
                        const isMastered = (masteredTransitionGaps[selectedNode.id] || []).includes(gap.name);
                        
                        // Type config
                        const typeConfig = {
                          herramienta: {
                            bg: 'bg-white border-cyan-500/20 hover:border-cyan-500/40',
                            badge: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
                            label: '🛠️ Herramienta',
                          },
                          técnica: {
                            bg: 'bg-white border-indigo-500/20 hover:border-indigo-500/40',
                            badge: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
                            label: '⚡ Técnica',
                          },
                          blanda: {
                            bg: 'bg-white border-pink-500/20 hover:border-pink-500/40',
                            badge: 'bg-pink-500/10 text-pink-600 border-pink-500/20',
                            label: '💬 Blanda',
                          }
                        }[gap.type] || {
                          bg: 'bg-white border-brand-charcoal/20',
                          badge: 'bg-brand-bg text-brand-charcoal border-brand-charcoal/20',
                          label: 'Habilidad',
                        };

                        return (
                          <div
                            key={gap.name}
                            className={`transition-all duration-300 rounded-none p-3 border-2 ${
                              isMastered 
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-800' 
                                : typeConfig.bg + ' border-brand-charcoal/30'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="space-y-1 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className={`text-[9px] px-1.5 py-0.5 rounded border font-mono font-bold uppercase ${
                                    isMastered ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : typeConfig.badge
                                  }`}>
                                    {typeConfig.label}
                                  </span>
                                  <span className={`text-[12px] font-black uppercase ${isMastered ? 'text-emerald-700 line-through' : 'text-brand-charcoal'}`}>
                                    {gap.name}
                                  </span>
                                </div>
                                <p className={`text-[11px] leading-relaxed font-medium ${isMastered ? 'text-emerald-600/80' : 'text-brand-charcoal/70'}`}>
                                  {gap.desc}
                                </p>
                              </div>
                              <button
                                onClick={() => toggleGapMastered(selectedNode.id, gap.name)}
                                className={`flex-shrink-0 w-5.5 h-5.5 rounded border-2 border-brand-charcoal flex items-center justify-center transition-all duration-300 cursor-pointer ${
                                  isMastered
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-white text-brand-charcoal/30 hover:text-brand-blue hover:border-brand-blue'
                                }`}
                                title={isMastered ? "Marcar como pendiente" : "Marcar como dominado"}
                              >
                                {isMastered ? (
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                  </svg>
                                ) : (
                                  <span className="text-xs font-bold font-mono">+</span>
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* COL 3: ENTORNO LABORAL, PROYECTOS Y REQUISITOS */}
              <div className="space-y-5">
                {/* DYNAMIC INDUSTRIAL VARIATION CONTEXTS */}
                {selectedNode.industries && selectedNode.industries.length > 0 && (
                  <div className="pt-2 border-t-2 border-brand-charcoal/10">
                    <span className="text-[10px] text-brand-charcoal/50 font-mono uppercase tracking-wide block mb-2 font-black">
                      // Variación según la industria:
                    </span>
                    <div className="space-y-2">
                      {selectedNode.industries.map((ind) => (
                        <div key={ind.name} className="bg-brand-bg border border-brand-charcoal/10 p-2.5">
                          <span className="text-[10px] font-black text-brand-blue block mb-0.5 font-mono">🏢 EN {ind.name.toUpperCase()}:</span>
                          <p className="text-[10.5px] text-brand-charcoal/80 leading-normal font-medium">{ind.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contextualized skills & tools */}
                {selectedNode.relatedTools && selectedNode.relatedTools.length > 0 && (
                  <div className="pt-2 border-t-2 border-brand-charcoal/10">
                    <span className="text-[10px] text-brand-charcoal/50 font-mono uppercase tracking-wide block mb-1.5 font-bold">Herramientas asociadas:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedNode.relatedTools.map((tool) => (
                        <span key={tool} className="text-[10px] text-cyan-600 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 font-mono font-bold flex items-center gap-1">
                          <Wrench className="h-2.5 w-2.5" /> {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Portafolio Project */}
                {selectedNode.suggestedProject && (
                  <div className="pt-2 border-t-2 border-brand-charcoal/10">
                    <div className="flex items-center gap-1 mb-1.5 text-emerald-600">
                      <FileText className="h-3.5 w-3.5" />
                      <span className="text-[10px] font-mono uppercase tracking-wide font-black">[ PROYECTO DE CV RECOMENDADO ]</span>
                    </div>
                    <div className="bg-emerald-50/10 border border-emerald-500/20 p-3">
                      <p className="text-xs text-brand-charcoal/80 leading-relaxed font-medium">
                        {selectedNode.suggestedProject}
                      </p>
                      <p className="text-[9px] text-brand-charcoal/50 mt-2 italic leading-relaxed font-medium font-mono">
                        💡 Consejo: Agrega este entregable a tu portafolio o Git para certificar tu dominio técnico.
                      </p>
                    </div>
                  </div>
                )}

                {/* Requirements & Milestones */}
                {(selectedNode.practiceReq || selectedNode.juniorReq) && (
                  <div className="pt-3 border-t-2 border-brand-charcoal/10 space-y-2">
                    <span className="text-[10px] text-brand-charcoal/50 font-mono uppercase tracking-wide block mb-1 font-bold">Requisitos de Contratación:</span>
                    
                    {selectedNode.practiceReq && (
                      <div className="text-[10.5px] text-brand-charcoal/80 flex items-start gap-1.5 font-medium">
                        <span className="text-amber-500 mt-0.5">▪</span>
                        <span><strong className="text-amber-600 font-black">Prácticas:</strong> {selectedNode.practiceReq}</span>
                      </div>
                    )}

                    {selectedNode.juniorReq && (
                      <div className="text-[10.5px] text-brand-charcoal/80 flex items-start gap-1.5 font-medium">
                        <span className="text-rose-500 mt-0.5">▪</span>
                        <span><strong className="text-rose-500 font-black">Puesto Junior:</strong> {selectedNode.juniorReq}</span>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>

          </div>

          <div className="mt-6 pt-4 border-t-2 border-brand-charcoal/10 bg-brand-light-blue/20 p-3.5 border border-brand-blue/10 flex flex-col gap-1.5">
            <span className="text-[10px] text-brand-blue font-mono font-black uppercase tracking-wider block">🏆 TIP DE INSERCIÓN PROFESIONAL:</span>
            <span className="text-[10.5px] text-brand-charcoal/70 leading-normal font-medium">
              Domina las herramientas principales y valida tu aprendizaje resolviendo los <strong>Proyectos de CV</strong>. Los reclutadores priorizan perfiles que demuestran destreza autónoma resolviendo casos reales.
            </span>
          </div>

        </div>

      </div>

      {/* 2.5 CAREER PROGRESSION ANALYSIS PANEL - REPOSICIONADO ABAJO DE LA PIZARRA */}
      {customTemplate && customTemplate.careerProgression && customTemplate.careerProgression.length > 0 && (
        <div className="mt-8 bg-white border-2 border-brand-charcoal rounded-none p-5 sm:p-6 shadow-[6px_6px_0px_rgba(51,49,51,1)] relative overflow-hidden">
          <CornerCuts size={16} color="text-brand-bg" />
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 border-b-2 border-brand-charcoal/10 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="h-4.5 w-4.5 text-brand-blue animate-pulse" />
                <h3 className="text-sm font-black uppercase tracking-wider text-brand-charcoal font-mono">
                  [ LÍNEA DE CARRERA Y PROGRESIÓN ESTRATÉGICA CON IA ]
                </h3>
              </div>
              <p className="text-xs text-brand-charcoal/70 font-medium">
                Punto de partida analizado: <span className="text-brand-charcoal font-black">{onboardingData.currentPosition || 'Puesto de Interés'}</span> ({onboardingData.career}) en <span className="text-brand-blue font-black">{onboardingData.industry}</span>.
              </p>
            </div>
            {onboardingData.currentPosition && (
              <span className="text-[9px] font-mono font-black text-brand-blue bg-brand-light-blue border border-brand-blue/30 rounded-none px-3 py-1 uppercase tracking-wider w-fit">
                Análisis Activo
              </span>
            )}
          </div>

          {/* Timeline Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
            {customTemplate.careerProgression.map((item, idx) => {
              const borderColors = ['border-purple-500', 'border-indigo-500', 'border-emerald-500'];
              const textColors = ['text-purple-600', 'text-indigo-600', 'text-emerald-600'];
              const bgGradients = [
                'bg-purple-50/10',
                'bg-indigo-50/10',
                'bg-emerald-50/10'
              ];
              const borderColor = borderColors[idx % borderColors.length];
              const textColor = textColors[idx % textColors.length];
              const bgGradient = bgGradients[idx % bgGradients.length];

              return (
                <div 
                  key={idx} 
                  className={`relative flex flex-col justify-between p-5 border-2 ${borderColor} ${bgGradient} bg-white shadow-[3px_3px_0px_rgba(51,49,51,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all group overflow-hidden`}
                >
                  <CornerCuts size={8} color="text-brand-bg" />
                  {/* Step bubble */}
                  <div className="absolute -top-3 left-4 bg-white border-2 border-brand-charcoal h-6 w-6 rounded-none flex items-center justify-center text-[10px] font-black text-brand-charcoal font-mono">
                    {idx + 1}
                  </div>

                  <div className="pt-2">
                    {/* Stage Tag */}
                    <span className="text-[9px] font-black uppercase tracking-widest text-brand-charcoal/50 font-mono block">
                      {item.stage || 'Nivel'}
                    </span>
                    
                    {/* Job Title */}
                    <h4 className="text-sm sm:text-base font-black uppercase text-brand-charcoal mt-1 group-hover:text-brand-blue transition-colors">
                      {item.roleTitle}
                    </h4>

                    {/* Description */}
                    <p className="text-xs text-brand-charcoal/70 mt-2 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>

                  {/* Requirements Sub-sections */}
                  <div className="mt-5 pt-4 border-t-2 border-brand-charcoal/10 space-y-3.5">
                    {/* Skills required */}
                    <div>
                      <span className="text-[10px] font-black font-mono text-brand-charcoal uppercase tracking-wider block mb-1 flex items-center gap-1">
                        <span>🛠️</span> Habilidades
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {item.skills.map((skill, sIdx) => (
                          <span 
                            key={sIdx} 
                            className="text-[9px] font-mono font-bold bg-brand-bg border border-brand-charcoal/20 px-1.5 py-0.5 text-brand-charcoal"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tools required */}
                    <div>
                      <span className="text-[10px] font-black font-mono text-brand-charcoal uppercase tracking-wider block mb-1 flex items-center gap-1">
                        <span>💻</span> Herramientas
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {item.tools.map((tool, tIdx) => (
                          <span 
                            key={tIdx} 
                            className="text-[9px] font-mono font-bold bg-brand-light-blue border border-brand-blue/20 px-1.5 py-0.5 text-brand-blue"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Knowledge required */}
                    <div>
                      <span className="text-[10px] font-black font-mono text-brand-charcoal uppercase tracking-wider block mb-1 flex items-center gap-1">
                        <span>📚</span> Enfoques
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {item.knowledge.map((know, kIdx) => (
                          <span 
                            key={kIdx} 
                            className="text-[9px] font-mono font-bold bg-purple-50 border border-purple-200 px-1.5 py-0.5 text-purple-700"
                          >
                            {know}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* HIDDEN PRINT-OPTIMIZED CONTAINERS FOR PDF EXPORT */}
      <div 
        style={{ 
          position: 'absolute', 
          top: '-9999px', 
          left: '-9999px', 
          width: '1188px', 
          pointerEvents: 'none', 
          zIndex: -100,
          opacity: 0
        }}
      >
        {/* PAGE 1: Horizontal Roadmap Overview */}
        <div 
          id="pdf-page-1"
          style={{ width: '1188px', height: '840px' }}
          className="bg-slate-50 p-8 flex flex-col justify-between text-slate-800 font-sans"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-indigo-100 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-white bg-indigo-600 px-3 py-1 rounded-full">
                  Journey AI
                </span>
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100 uppercase font-mono">
                  HOJA DE RUTA PROFESIONAL
                </span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 leading-none">
                {currentCareer}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Mapa interactivo adaptado y optimizado para el sector de la industria.
              </p>
            </div>
            
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-widest font-mono">Generado el</span>
              <span className="text-sm font-bold text-slate-700 block font-mono">
                {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="text-[11px] font-medium text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100 mt-1.5 inline-block">
                {onboardingData.fullName || onboardingData.email}
              </span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm my-4">
            <div className="border-r border-slate-100">
              <span className="text-[9px] font-extrabold text-slate-400 block uppercase tracking-wider font-mono">Perfil de Usuario</span>
              <span className="text-xs font-bold text-slate-700 capitalize block mt-0.5">{onboardingData.stage?.replace('_', ' ')}</span>
            </div>
            <div className="border-r border-slate-100">
              <span className="text-[9px] font-extrabold text-slate-400 block uppercase tracking-wider font-mono">Industria de Enfoque</span>
              <span className="text-xs font-bold text-slate-700 block mt-0.5">{onboardingData.industry || 'Tecnología'}</span>
            </div>
            <div className="border-r border-slate-100">
              <span className="text-[9px] font-extrabold text-slate-400 block uppercase tracking-wider font-mono">Objetivo</span>
              <span className="text-xs font-bold text-slate-700 block mt-0.5 max-w-[200px] truncate">{onboardingData.objective || 'Progreso'}</span>
            </div>
            <div>
              <span className="text-[9px] font-extrabold text-slate-400 block uppercase tracking-wider font-mono flex items-center justify-between">
                <span>Progreso General</span>
                <span className="font-bold text-indigo-600">{progressPercent}%</span>
              </span>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1.5">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-5 gap-3.5 flex-1 overflow-hidden my-1">
            {/* Phase 1 */}
            <div className="bg-slate-100/50 rounded-2xl p-3 border border-slate-200/60 flex flex-col justify-between">
              <div>
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono border-b border-slate-200 pb-1.5 mb-2.5 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-indigo-500" /> 1. Académico / Base
                </h3>
                <div className="space-y-2 max-h-[460px] overflow-hidden">
                  {graphNodes.filter(n => n.level === 'base').slice(0, 4).map(node => (
                    <div key={node.id} className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-black text-slate-900 truncate max-w-[120px]">{node.title}</span>
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded font-mono ${
                          (nodeStatuses[node.id] || 'no_iniciado') === 'aprendido' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                          (nodeStatuses[node.id] || 'no_iniciado') === 'en_progreso' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                          'bg-slate-50 text-slate-400 border border-slate-100'
                        }`}>
                          {(nodeStatuses[node.id] || 'no_iniciado') === 'aprendido' ? 'Completado' :
                           (nodeStatuses[node.id] || 'no_iniciado') === 'en_progreso' ? 'En Curso' : 'Pendiente'}
                        </span>
                      </div>
                      <p className="text-[9px] text-slate-500 line-clamp-2 leading-tight">{node.description}</p>
                      {node.relatedTools && node.relatedTools.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-0.5">
                          {node.relatedTools.slice(0, 2).map((t, i) => (
                            <span key={i} className="text-[8px] bg-slate-100 text-slate-600 px-1 rounded">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <span className="text-[8px] text-slate-400 font-mono text-center font-bold">Bases de competencia</span>
            </div>

            {/* Phase 2 */}
            <div className="bg-slate-100/50 rounded-2xl p-3 border border-slate-200/60 flex flex-col justify-between">
              <div>
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono border-b border-slate-200 pb-1.5 mb-2.5 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-cyan-500" /> 2. Herramientas
                </h3>
                <div className="space-y-2 max-h-[460px] overflow-hidden">
                  {graphNodes.filter(n => n.type === 'tecnico' || n.type === 'herramienta' || n.type === 'blanda').slice(0, 4).map(node => (
                    <div key={node.id} className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-black text-slate-900 truncate max-w-[120px]">{node.title}</span>
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded font-mono ${
                          (nodeStatuses[node.id] || 'no_iniciado') === 'aprendido' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                          (nodeStatuses[node.id] || 'no_iniciado') === 'en_progreso' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                          'bg-slate-50 text-slate-400 border border-slate-100'
                        }`}>
                          {(nodeStatuses[node.id] || 'no_iniciado') === 'aprendido' ? 'Completado' :
                           (nodeStatuses[node.id] || 'no_iniciado') === 'en_progreso' ? 'En Curso' : 'Pendiente'}
                        </span>
                      </div>
                      <p className="text-[9px] text-slate-500 line-clamp-2 leading-tight">{node.description}</p>
                      {node.relatedTools && node.relatedTools.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-0.5">
                          {node.relatedTools.slice(0, 2).map((t, i) => (
                            <span key={i} className="text-[8px] bg-slate-100 text-slate-600 px-1 rounded">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <span className="text-[8px] text-slate-400 font-mono text-center font-bold">Especialización requerida</span>
            </div>

            {/* Phase 3 */}
            <div className="bg-slate-100/50 rounded-2xl p-3 border border-slate-200/60 flex flex-col justify-between">
              <div>
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono border-b border-slate-200 pb-1.5 mb-2.5 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-500" /> 3. Prácticas / Intern
                </h3>
                <div className="space-y-2 max-h-[460px] overflow-hidden">
                  {graphNodes.filter(n => n.type === 'práctica').slice(0, 4).map(node => (
                    <div key={node.id} className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-black text-slate-900 truncate max-w-[120px]">{node.title}</span>
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded font-mono ${
                          (nodeStatuses[node.id] || 'no_iniciado') === 'aprendido' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                          (nodeStatuses[node.id] || 'no_iniciado') === 'en_progreso' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                          'bg-slate-50 text-slate-400 border border-slate-100'
                        }`}>
                          {(nodeStatuses[node.id] || 'no_iniciado') === 'aprendido' ? 'Completado' :
                           (nodeStatuses[node.id] || 'no_iniciado') === 'en_progreso' ? 'En Curso' : 'Pendiente'}
                        </span>
                      </div>
                      <p className="text-[9px] text-slate-500 line-clamp-2 leading-tight">{node.description}</p>
                      {node.relatedTools && node.relatedTools.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-0.5">
                          {node.relatedTools.slice(0, 2).map((t, i) => (
                            <span key={i} className="text-[8px] bg-slate-100 text-slate-600 px-1 rounded">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <span className="text-[8px] text-slate-400 font-mono text-center font-bold">Inserción temprana</span>
            </div>

            {/* Phase 4 */}
            <div className="bg-slate-100/50 rounded-2xl p-3 border border-slate-200/60 flex flex-col justify-between">
              <div>
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono border-b border-slate-200 pb-1.5 mb-2.5 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-500" /> 4. Junior / Analista
                </h3>
                <div className="space-y-2 max-h-[460px] overflow-hidden">
                  {graphNodes.filter(n => n.type === 'junior').slice(0, 4).map(node => (
                    <div key={node.id} className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-black text-slate-900 truncate max-w-[120px]">{node.title}</span>
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded font-mono ${
                          (nodeStatuses[node.id] || 'no_iniciado') === 'aprendido' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                          (nodeStatuses[node.id] || 'no_iniciado') === 'en_progreso' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                          'bg-slate-50 text-slate-400 border border-slate-100'
                        }`}>
                          {(nodeStatuses[node.id] || 'no_iniciado') === 'aprendido' ? 'Completado' :
                           (nodeStatuses[node.id] || 'no_iniciado') === 'en_progreso' ? 'En Curso' : 'Pendiente'}
                        </span>
                      </div>
                      <p className="text-[9px] text-slate-500 line-clamp-2 leading-tight">{node.description}</p>
                      {node.relatedTools && node.relatedTools.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-0.5">
                          {node.relatedTools.slice(0, 2).map((t, i) => (
                            <span key={i} className="text-[8px] bg-slate-100 text-slate-600 px-1 rounded">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <span className="text-[8px] text-slate-400 font-mono text-center font-bold">Consolidación</span>
            </div>

            {/* Phase 5 */}
            <div className="bg-slate-100/50 rounded-2xl p-3 border border-slate-200/60 flex flex-col justify-between">
              <div>
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono border-b border-slate-200 pb-1.5 mb-2.5 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-purple-500" /> 5. Especialista / Senior
                </h3>
                <div className="space-y-2 max-h-[460px] overflow-hidden">
                  {graphNodes.filter(n => n.type === 'especialización' || n.level === 'especialización').slice(0, 4).map(node => (
                    <div key={node.id} className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-black text-slate-900 truncate max-w-[120px]">{node.title}</span>
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded font-mono ${
                          (nodeStatuses[node.id] || 'no_iniciado') === 'aprendido' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                          (nodeStatuses[node.id] || 'no_iniciado') === 'en_progreso' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                          'bg-slate-50 text-slate-400 border border-slate-100'
                        }`}>
                          {(nodeStatuses[node.id] || 'no_iniciado') === 'aprendido' ? 'Completado' :
                           (nodeStatuses[node.id] || 'no_iniciado') === 'en_progreso' ? 'En Curso' : 'Pendiente'}
                        </span>
                      </div>
                      <p className="text-[9px] text-slate-500 line-clamp-2 leading-tight">{node.description}</p>
                      {node.relatedTools && node.relatedTools.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-0.5">
                          {node.relatedTools.slice(0, 2).map((t, i) => (
                            <span key={i} className="text-[8px] bg-slate-100 text-slate-600 px-1 rounded">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <span className="text-[8px] text-slate-400 font-mono text-center font-bold">Alta Dirección / Seniority</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-[10px] text-slate-400 font-mono">
            <span>© {new Date().getFullYear()} Journey AI - Copiloto de Desarrollo Profesional</span>
            <span>https://ai.studio/build · Página 1 de 2</span>
          </div>
        </div>

        {/* PAGE 2: Timeline Progression Plan */}
        {customTemplate && customTemplate.careerProgression && (
          <div 
            id="pdf-page-2"
            style={{ width: '1188px', height: '840px' }}
            className="bg-slate-50 p-8 flex flex-col justify-between text-slate-800 font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-indigo-100 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-white bg-indigo-600 px-3 py-1 rounded-full">
                    Journey AI
                  </span>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100 uppercase font-mono">
                    PLAN DE ACCIÓN Y PROGRESIÓN DE CARRERA (IA)
                  </span>
                </div>
                <h1 className="text-2xl font-black text-slate-900 leading-none">
                  Línea de Progresión Estratégica
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Pasos sugeridos para evolucionar desde tu cargo actual al siguiente nivel directivo.
                </p>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-medium text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                  {onboardingData.fullName || onboardingData.email}
                </span>
              </div>
            </div>

            {/* Career Timeline Blocks */}
            <div className="grid grid-cols-3 gap-6 my-5 flex-1 overflow-hidden">
              {customTemplate.careerProgression.slice(0, 3).map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="h-7 w-7 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xs font-black text-indigo-600 font-mono">
                        {idx + 1}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded">
                        {item.stage}
                      </span>
                    </div>

                    <h3 className="text-sm font-extrabold text-slate-900 mb-2 leading-snug">{item.roleTitle}</h3>
                    <p className="text-[10.5px] text-slate-500 leading-relaxed mb-4">{item.description}</p>
                  </div>

                  <div className="space-y-3.5 border-t border-slate-100 pt-3.5">
                    <div>
                      <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest font-mono block mb-1">🛠️ Habilidades</span>
                      <div className="flex flex-wrap gap-1">
                        {item.skills.slice(0, 4).map((skill, sIdx) => (
                          <span key={sIdx} className="text-[8.5px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">{skill}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest font-mono block mb-1">💻 Herramientas</span>
                      <div className="flex flex-wrap gap-1">
                        {item.tools.slice(0, 4).map((tool, tIdx) => (
                          <span key={tIdx} className="text-[8.5px] bg-indigo-50 text-indigo-600 border border-indigo-100/40 px-1.5 py-0.5 rounded font-medium">{tool}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest font-mono block mb-1">📚 Enfoques</span>
                      <div className="flex flex-wrap gap-1">
                        {item.knowledge.slice(0, 3).map((know, kIdx) => (
                          <span key={kIdx} className="text-[8.5px] bg-purple-50 text-purple-600 border border-purple-100/40 px-1.5 py-0.5 rounded font-medium">{know}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Recommendation Panel */}
            <div className="bg-indigo-900 text-white rounded-2xl p-4 flex items-center justify-between gap-6 shadow-md border border-indigo-850">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-xl">
                  <span>🏆</span>
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-wider font-mono text-indigo-200">Recomendación Clave del Evaluador de Talento AI</h4>
                  <p className="text-[11px] text-indigo-50 mt-0.5">
                    "Focaliza tu portafolio de CV en los Proyectos Recomendados. Resolver retos de negocio reales con las herramientas clave de este PDF te dará la mayor ventaja en tus futuras entrevistas."
                  </p>
                </div>
              </div>
              <div className="text-[9px] font-mono text-indigo-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl uppercase shrink-0">
                LÍNEA VALIDADA POR GEMINI AI
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-[10px] text-slate-400 font-mono">
              <span>© {new Date().getFullYear()} Journey AI - Copiloto de Desarrollo Profesional</span>
              <span>https://ai.studio/build · Página 2 de 2</span>
            </div>
          </div>
        )}
      </div>

      {/* SVG CSS FLOW ANIMATION HOOKS */}
      <style>{`
        @keyframes flowLine {
          to {
            stroke-dashoffset: -20;
          }
        }
      `}</style>

    </div>
  );
}
