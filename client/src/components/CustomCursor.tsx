import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useDevToolsDetection } from '@/hooks/use-devtools-detection';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isSelecting, setIsSelecting] = useState(false);
  
  // Hook per rilevamento DevTools e focus
  const { shouldShowCursor, isTouchDevice } = useDevToolsDetection();
  
  // Refs per ottimizzazioni performance ultra-avanzate
  const rafRef = useRef<number | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const isMouseInsideRef = useRef(true);
  const lastFrameTimeRef = useRef(0);
  const frameCountRef = useRef(0);
  const throttleTimeRef = useRef(0);
  
  // Performance budget: 60fps = 16.67ms per frame
  const FRAME_BUDGET = 16.67;
  const THROTTLE_MS = 8; // 120fps throttling for ultra-smooth movement
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
  const updateCursorPosition = useCallback((x: number, y: number) => {
    const now = performance.now();
    
    // Adaptive throttling basato su performance mode
    const adaptiveThrottle = performanceMode === 'eco' ? 16 : 
                           performanceMode === 'balanced' ? 12 : THROTTLE_MS;
    
    if (now - throttleTimeRef.current < adaptiveThrottle) {
      return;
    }
    
    // Viewport check intelligente
    if (!isInViewport(x, y)) {
      return;
    }
    
    throttleTimeRef.current = now;
    lastPositionRef.current = { x, y };
    
    if (cursorRef.current) {
      // Utilizzando compositing layer dedicato per massime performance
      const transform = `translate3d(${x - 10}px, ${y - 10}px, 0)`;
      cursorRef.current.style.transform = transform;
      
      // Adaptive will-change management
      if (performanceMode === 'high') {
        cursorRef.current.style.willChange = 'transform';
      } else {
        cursorRef.current.style.willChange = 'auto';
      }
    }
    
    // Batch state update per ridurre re-renders
    setPosition({ x, y });
  }, [performanceMode, isInViewport]);

  // Mouse move handler con throttling avanzato
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Aggiornamento diretto con throttling intelligente
    updateCursorPosition(e.clientX, e.clientY);
    
    // Batch viewport check per performance
    const isInside = 
      e.clientX >= 0 && 
      e.clientX <= window.innerWidth &&
      e.clientY >= 0 && 
      e.clientY <= window.innerHeight;
    
    isMouseInsideRef.current = isInside;
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
    return isTouchDevice || 
           window.innerWidth <= 768 ||
           'ontouchstart' in window ||
           navigator.maxTouchPoints > 0 ||
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
  }, [isTouchDevice]);

  // Memoized inline styles per performance critiche
  const cursorStyles = useMemo(() => ({
    position: 'fixed' as const,
    left: 0,
    top: 0,
    pointerEvents: 'none' as const,
    zIndex: 9999,
    transform: `translate3d(${position.x - 10}px, ${position.y - 10}px, 0)`,
    willChange: 'transform',
    contain: 'layout style paint' as any,
    isolation: 'isolate' as any
  }), [position.x, position.y]);

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