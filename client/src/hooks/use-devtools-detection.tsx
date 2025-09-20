import { useEffect, useState, useCallback, useRef } from 'react';

export const useDevToolsDetection = () => {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);
  const [isWindowFocused, setIsWindowFocused] = useState(true);
  const [isMouseInside, setIsMouseInside] = useState(true);
  const [isMouseActive, setIsMouseActive] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  const mouseActivityTimeoutRef = useRef<NodeJS.Timeout>();
  const lastMouseMoveRef = useRef<number>(Date.now());

  const detectDevTools = useCallback(() => {
    const threshold = 160; // soglia per rilevare DevTools
    const heightDiff = window.outerHeight - window.innerHeight;
    const widthDiff = window.outerWidth - window.innerWidth;
    
    // Rileva se DevTools è aperto (differenza significativa nelle dimensioni)
    const devToolsOpen = heightDiff > threshold || widthDiff > threshold;
    
    if (devToolsOpen !== isDevToolsOpen) {
      setIsDevToolsOpen(devToolsOpen);
    }
  }, [isDevToolsOpen]);

  const handleWindowFocus = useCallback(() => {
    setIsWindowFocused(true);
  }, []);

  const handleWindowBlur = useCallback(() => {
    setIsWindowFocused(false);
  }, []);

  const handleVisibilityChange = useCallback(() => {
    // Controlla sia visibilityState che focus
    const isVisible = document.visibilityState === 'visible';
    if (!isVisible) {
      setIsWindowFocused(false);
    }
  }, []);

  // Traccia movimento del mouse per attivazione automatica
  const handleMouseActivity = useCallback(() => {
    const now = Date.now();
    lastMouseMoveRef.current = now;
    setIsMouseActive(true);
    
    // Reset timer per inattività
    if (mouseActivityTimeoutRef.current) {
      clearTimeout(mouseActivityTimeoutRef.current);
    }
    
    // Dopo 150ms senza movimento, considera mouse inattivo
    mouseActivityTimeoutRef.current = setTimeout(() => {
      setIsMouseActive(false);
    }, 150);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsMouseInside(true);
    handleMouseActivity();
  }, [handleMouseActivity]);

  const handleMouseLeave = useCallback(() => {
    setIsMouseInside(false);
    setIsMouseActive(false);
  }, []);

  useEffect(() => {
    // Rileva dispositivi touch
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    
    checkTouchDevice();
    
    // Controlla periodicamente per DevTools
    const interval = setInterval(detectDevTools, 500);
    
    // Event listeners per focus/blur
    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', detectDevTools);
    
    // Event listeners per mouse
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousemove', handleMouseActivity, { passive: true });
    document.addEventListener('mouseover', handleMouseActivity, { passive: true });

    // Controlla immediatamente
    detectDevTools();
    checkTouchDevice();

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', detectDevTools);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleMouseActivity);
      document.removeEventListener('mouseover', handleMouseActivity);
      
      if (mouseActivityTimeoutRef.current) {
        clearTimeout(mouseActivityTimeoutRef.current);
      }
    };
  }, [detectDevTools, handleWindowFocus, handleWindowBlur, handleVisibilityChange, handleMouseEnter, handleMouseLeave, handleMouseActivity]);

  return {
    isDevToolsOpen,
    isWindowFocused,
    isMouseInside,
    isMouseActive,
    isTouchDevice,
    // Cursore dovrebbe essere visibile se:
    // - Non è touch device
    // - Documento è visibile
    // - Mouse dentro l'area
    // - (Finestra ha focus O mouse è attivo O DevTools non aperti)
    shouldShowCursor: !isTouchDevice && 
                     document.visibilityState === 'visible' && 
                     isMouseInside && 
                     (isWindowFocused || isMouseActive || !isDevToolsOpen)
  };
};