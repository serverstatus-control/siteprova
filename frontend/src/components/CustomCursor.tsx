import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useDevToolsDetection } from '@/hooks/use-devtools-detection';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isSelecting, setIsSelecting] = useState(false);
  
  // Hook per rilevamento DevTools e focus
  const { shouldShowCursor, isTouchDevice, hasMouseLike } = useDevToolsDetection();
  
  // Refs per ottimizzazioni performance ultra-avanzate
  const rafRef = useRef<number | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const isMouseInsideRef = useRef(true);
  const lastFrameTimeRef = useRef(0);
  const frameCountRef = useRef(0);
  const throttleTimeRef = useRef(0);
  
  // Performance budget: 144fps per fluidità massima come Windows
  const FRAME_BUDGET = 6.94; // 144fps
  const THROTTLE_MS = 2; // Ridotto per massima reattività (500fps throttling)
  const VIEWPORT_BUFFER = 50; // Buffer per viewport detection

  // Viewport detection intelligente
  const isInViewport = useCallback((x: number, y: number) => {
    return x >= -VIEWPORT_BUFFER && 
           x <= window.innerWidth + VIEWPORT_BUFFER &&
           y >= -VIEWPORT_BUFFER && 
           y <= window.innerHeight + VIEWPORT_BUFFER;
  }, []);

  // Smart visibility basata su performance budget
  const [performanceMode, setPerformanceMode] = useState<'high' | 'balanced' | 'eco'>('high');
  
  useEffect(() => {
    let frameCount = 0;
    let lastCheck = performance.now();
    
    const checkPerformance = () => {
      frameCount++;
      const now = performance.now();
      
      if (now - lastCheck >= 1000) { // Check every second
        const fps = frameCount;
        frameCount = 0;
        lastCheck = now;
        
        // Adaptive performance mode
        if (fps < 30) {
          setPerformanceMode('eco');
        } else if (fps < 50) {
          setPerformanceMode('balanced');
        } else {
          setPerformanceMode('high');
        }
      }
      
      requestAnimationFrame(checkPerformance);
    };
    
    const rafId = requestAnimationFrame(checkPerformance);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Funzione ultra-ottimizzata per aggiornare la posizione del cursore
  // Aggiornamento ultra-fluido come Windows - no throttling, update diretto
  const updateCursorPosition = useCallback((x: number, y: number) => {
    // No throttling per massima reattività come Windows
    if (cursorRef.current) {
      // Update diretto DOM per fluidità immediata
      cursorRef.current.style.transform = `translate3d(${x - 10}px, ${y - 10}px, 0)`;
    }
    
    // State update senza controlli per velocità massima
    setPosition({ x, y });
  }, []);

  // Mouse move handler ultra-semplificato per massima fluidità
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Update immediato senza controlli per fluidità Windows-like
    updateCursorPosition(e.clientX, e.clientY);
  }, [updateCursorPosition]);

  // Ottimizzato hover detection con caching
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Cache per evitare re-computazione
    if (target.dataset.isClickableChecked) {
      const isClickable = target.dataset.isClickable === 'true';
      setIsHovering(isClickable);
      return;
    }
    
    const isClickable = 
      target.matches('button, a, [role="button"], input[type="submit"], select') ||
      !!target.closest('button, a, [role="button"]') ||
      window.getComputedStyle(target).cursor === 'pointer';
    
    // Cache del risultato
    target.dataset.isClickableChecked = 'true';
    target.dataset.isClickable = String(isClickable);
    
    setIsHovering(isClickable);
  }, []);

  // Gestione mouse enter/leave ottimizzata
  const handleMouseEnter = useCallback(() => {
    isMouseInsideRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isMouseInsideRef.current = false;
  }, []);

  // Effetto per aggiornare la visibilità quando cambia shouldShowCursor
  useEffect(() => {
    // La visibilità ora dipende SOLO da shouldShowCursor
    setIsVisible(shouldShowCursor);
  }, [shouldShowCursor]);

  useEffect(() => {
    // Non aggiungere listeners se è un dispositivo touch
    if (isTouchDevice) {
      return;
    }

    // Event listeners ottimizzati
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        setIsClicking(true);
        setIsSelecting(true);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0) {
        setIsClicking(false);
        // Delay per permettere al browser di completare la selezione
        setTimeout(() => setIsSelecting(false), 100);
      }
    };

    // Rileva quando l'utente sta selezionando testo
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      const hasSelection = selection && selection.toString().length > 0;
      setIsSelecting(!!hasSelection);
    };

    // Setup event listeners con ultra-ottimizzazioni passive
    const addListeners = () => {
      // Passive listeners per massime performance
      document.addEventListener('mousemove', handleMouseMove, { 
        passive: true, 
        capture: false 
      });
      document.addEventListener('mouseover', handleMouseOver, { 
        passive: true, 
        capture: false 
      });
      document.addEventListener('mousedown', handleMouseDown, { 
        passive: true, 
        capture: false 
      });
      document.addEventListener('mouseup', handleMouseUp, { 
        passive: true, 
        capture: false 
      });
      document.addEventListener('mouseenter', handleMouseEnter, { 
        passive: true, 
        capture: false 
      });
      document.addEventListener('mouseleave', handleMouseLeave, { 
        passive: true, 
        capture: false 
      });
      document.addEventListener('selectionchange', handleSelectionChange, { 
        passive: true, 
        capture: false 
      });
    };

    const removeListeners = () => {
      // Cleanup completo per prevenire memory leaks
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('selectionchange', handleSelectionChange);
      
      // Clear dei dataset cache per prevenire memory leaks
      document.querySelectorAll('[data-is-clickable-checked]').forEach(el => {
        delete (el as HTMLElement).dataset.isClickableChecked;
        delete (el as HTMLElement).dataset.isClickable;
      });
    };

    addListeners();

    // Cleanup completo per prevenire memory leaks
    return () => {
      removeListeners();
      
      // Cancel pending RAF
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      
      // Reset refs per garbage collection
      lastPositionRef.current = { x: 0, y: 0 };
      frameCountRef.current = 0;
      lastFrameTimeRef.current = 0;
      throttleTimeRef.current = 0;
      
      // Clear cursor element will-change per performance
      if (cursorRef.current) {
        cursorRef.current.style.willChange = 'auto';
      }
    };
  }, [
    handleMouseMove,
    handleMouseOver,
    handleMouseEnter,
    handleMouseLeave,
    isTouchDevice
  ]);

  // Memoized device detection per ridurre re-computazioni
  const shouldHideCursor = useMemo(() => {
    // Nascondi solo se non ha capacità mouse-like
    return !hasMouseLike;
  }, [hasMouseLike]);

  // Stili ottimizzati per fluidità massima come Windows
  const cursorStyles = useMemo(() => ({
    position: 'fixed' as const,
    left: 0,
    top: 0,
    pointerEvents: 'none' as const,
    zIndex: 9999,
    transform: `translate3d(${position.x - 10}px, ${position.y - 10}px, 0)`,
    willChange: 'transform' as const,
    contain: 'layout style paint' as const,
    isolation: 'isolate' as const,
    backfaceVisibility: 'hidden' as const,
    perspective: 1000,
    transformStyle: 'preserve-3d' as const
  } as React.CSSProperties), [position.x, position.y]);

  // Memoized class composition per ridurre string concatenation
  const cursorClasses = useMemo(() => {
    const classes = [];
    if (isHovering) classes.push('hover');
    if (isClicking) classes.push('clicking');
    if (isSelecting) classes.push('selecting');
    if (!isVisible) classes.push('hidden');
    return classes.join(' ');
  }, [isHovering, isClicking, isSelecting, isVisible]);

  // Early return ottimizzato
  if (shouldHideCursor) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      id="cursor"
      className={cursorClasses}
      style={cursorStyles}
    />
  );
};

export default CustomCursor;