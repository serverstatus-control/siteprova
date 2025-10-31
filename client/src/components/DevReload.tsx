import React, { useEffect } from 'react';

/**
 * Dev-only floating reload button + hotkey to recover quickly from HMR hiccups.
 */
export default function DevReload() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Ctrl + Alt + R
      if (e.ctrlKey && e.altKey && (e.key === 'r' || e.key === 'R')) {
        e.preventDefault();
        hardReload();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const hardReload = () => {
    // Prefer Vite full invalidation when available
    // @ts-ignore - vite HMR API in dev
    if (import.meta && import.meta.hot && typeof import.meta.hot.invalidate === 'function') {
      // @ts-ignore
      import.meta.hot.invalidate();
      return;
    }
    // Fallback: bust cache with a query param
    const u = new URL(window.location.href);
    u.searchParams.set('_r', String(Date.now()));
    window.location.replace(u.toString());
  };

  if (import.meta.env.PROD) return null;

  return (
    <button
      onClick={hardReload}
      title="Reload (Ctrl+Alt+R)"
      style={{
        position: 'fixed',
        right: 12,
        bottom: 12,
        zIndex: 99999,
        background: 'rgba(30, 41, 59, 0.85)',
        color: '#fff',
        border: '1px solid rgba(148,163,184,0.4)',
        borderRadius: 8,
        padding: '8px 10px',
        fontSize: 12,
        cursor: 'pointer',
        userSelect: 'none',
        boxShadow: '0 2px 10px rgba(0,0,0,0.25)'
      }}
    >
      Reload
    </button>
  );
}
