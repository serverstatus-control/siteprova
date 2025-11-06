import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Hook per il prefetching intelligente delle route
 * Precarica le pagine in base al comportamento dell'utente
 */
export function usePrefetchRoutes() {
  const [location] = useLocation();

  useEffect(() => {
    // Prefetch delle route comuni dopo il caricamento iniziale
    const prefetchTimer = setTimeout(() => {
      // Prefetch auth page per utenti non autenticati
      if (location === '/') {
        import('@/pages/auth-page').catch(() => {});
        
        // Prefetch info page dopo un po'
        setTimeout(() => {
          import('@/pages/info-page').catch(() => {});
        }, 2000);
      }
      
      // Prefetch service detail se siamo sulla home
      if (location === '/') {
        setTimeout(() => {
          import('@/pages/service-detail').catch(() => {});
        }, 3000);
      }
    }, 1000);

    return () => clearTimeout(prefetchTimer);
  }, [location]);
}

/**
 * Hook per il precaricamento delle immagini critiche
 */
export function usePreloadImages(imageUrls: string[]) {
  useEffect(() => {
    imageUrls.forEach((url) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
    });
  }, [imageUrls]);
}

/**
 * Hook per il prefetch on hover dei link
 */
export function usePrefetchOnHover(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="/"]');
      
      if (link) {
        const href = link.getAttribute('href');
        if (href?.startsWith('/services/')) {
          import('@/pages/service-detail').catch(() => {});
        } else if (href === '/auth') {
          import('@/pages/auth-page').catch(() => {});
        } else if (href === '/admin') {
          import('@/pages/admin-page').catch(() => {});
        } else if (href === '/info') {
          import('@/pages/info-page').catch(() => {});
        }
      }
    };

    element.addEventListener('mouseenter', handleMouseEnter, true);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter, true);
    };
  }, [ref]);
}
