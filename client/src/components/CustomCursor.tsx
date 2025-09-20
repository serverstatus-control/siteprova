import { useEffect, useState, useCallback, useRef } from 'react';
import { useDevToolsDetection } from '@/hooks/use-devtools-detection';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  // Hook per rilevamento DevTools e focus
  const { shouldShowCursor, isTouchDevice } = useDevToolsDetection();
  
  // Refs per ottimizzazioni performance
  const rafRef = useRef<number | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const isMouseInsideRef = useRef(true);

  // Funzione ottimizzata per aggiornare la posizione del cursore
  const updateCursorPosition = useCallback((x: number, y: number) => {
    // Evita aggiornamenti inutili se la posizione non è cambiata
    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) return;
    
    lastPositionRef.current = { x, y };
    
    if (cursorRef.current) {
      // Usa transform3d per attivare l'accelerazione hardware
      cursorRef.current.style.transform = `translate3d(${x - 10}px, ${y - 10}px, 0)`;
    }
    setPosition({ x, y });
  }, []);

  // Throttled mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      updateCursorPosition(e.clientX, e.clientY);
      
      // Aggiorna solo la ref per tracciare la posizione del mouse
      const isInside = 
        e.clientX >= 0 && 
        e.clientX <= window.innerWidth &&
        e.clientY >= 0 && 
        e.clientY <= window.innerHeight;
      
      isMouseInsideRef.current = isInside;
    });
  }, [updateCursorPosition]);

  // Ottimizzato hover detection
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isClickable = 
      target.matches('button, a, [role="button"], input[type="submit"], select') ||
      target.closest('button, a, [role="button"]') ||
      window.getComputedStyle(target).cursor === 'pointer';
    
    setIsHovering(!!isClickable);
  }, []);

  // Gestione mouse enter/leave per DevTools
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
      if (e.button === 0) setIsClicking(true);
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0) setIsClicking(false);
    };

    // Setup event listeners con opzioni passive per performance
    const addListeners = () => {
      document.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseover', handleMouseOver, { passive: true });
      document.addEventListener('mousedown', handleMouseDown, { passive: true });
      document.addEventListener('mouseup', handleMouseUp, { passive: true });
      document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
      document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    };

    const removeListeners = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };

    addListeners();

    // Cleanup
    return () => {
      removeListeners();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [
    handleMouseMove,
    handleMouseOver,
    handleMouseEnter,
    handleMouseLeave,
    isTouchDevice
  ]);

  // Non renderizzare su dispositivi touch
  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      id="cursor"
      className={`
        ${isHovering ? 'hover' : ''} 
        ${isClicking ? 'clicking' : ''} 
        ${!isVisible ? 'hidden' : ''}
      `}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        transform: `translate3d(${position.x - 10}px, ${position.y - 10}px, 0)`,
        willChange: 'transform'
      }}
    />
  );
};

export default CustomCursor;