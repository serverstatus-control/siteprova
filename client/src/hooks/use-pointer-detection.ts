import { useEffect, useState } from 'react';

/**
 * Hook per rilevare se il dispositivo ha un puntatore preciso (mouse/trackpad)
 * anche su dispositivi mobili collegati a mouse esterni
 */
export const usePointerDetection = () => {
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [hasMouseLike, setHasMouseLike] = useState(false);

  useEffect(() => {
    const checkPointerCapabilities = () => {
      // Controlla se il dispositivo ha un puntatore fine (mouse/trackpad)
      const finePointer = window.matchMedia('(any-pointer: fine)').matches;
      
      // Controlla se il dispositivo può fare hover
      const hoverCapable = window.matchMedia('(any-hover: hover)').matches;
      
      // Ha capacità mouse-like se ha puntatore fine O può fare hover
      const mouseCapabilities = finePointer || hoverCapable;
      
      setHasFinePointer(finePointer);
      setCanHover(hoverCapable);
      setHasMouseLike(mouseCapabilities);
    };

    // Controlla immediatamente
    checkPointerCapabilities();

    // Media query listeners per rilevare cambiamenti
    const finePointerQuery = window.matchMedia('(any-pointer: fine)');
    const hoverQuery = window.matchMedia('(any-hover: hover)');

    // Event listeners per cambiamenti nelle media queries
    const handleFinePointerChange = (e: MediaQueryListEvent) => {
      setHasFinePointer(e.matches);
      checkPointerCapabilities();
    };

    const handleHoverChange = (e: MediaQueryListEvent) => {
      setCanHover(e.matches);
      checkPointerCapabilities();
    };

    // Aggiungi listeners (compatibile con Safari vecchio)
    if (finePointerQuery.addEventListener) {
      finePointerQuery.addEventListener('change', handleFinePointerChange);
      hoverQuery.addEventListener('change', handleHoverChange);
    } else {
      // Fallback per Safari vecchio
      finePointerQuery.addListener(handleFinePointerChange);
      hoverQuery.addListener(handleHoverChange);
    }

    // Cleanup
    return () => {
      if (finePointerQuery.removeEventListener) {
        finePointerQuery.removeEventListener('change', handleFinePointerChange);
        hoverQuery.removeEventListener('change', handleHoverChange);
      } else {
        // Fallback per Safari vecchio
        finePointerQuery.removeListener(handleFinePointerChange);
        hoverQuery.removeListener(handleHoverChange);
      }
    };
  }, []);

  return {
    hasFinePointer,
    canHover,
    hasMouseLike,
    // Utility per debug
    debugInfo: {
      userAgent: navigator.userAgent,
      maxTouchPoints: navigator.maxTouchPoints,
      finePointerQuery: window.matchMedia('(any-pointer: fine)').matches,
      hoverQuery: window.matchMedia('(any-hover: hover)').matches,
      coarsePointerQuery: window.matchMedia('(pointer: coarse)').matches,
    }
  };
};