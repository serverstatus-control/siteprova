import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isContextMenu, setIsContextMenu] = useState(false);
  const [isOutside, setIsOutside] = useState(false);
  const [windowHasFocus, setWindowHasFocus] = useState(true);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);

  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    };

    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);

    if (isTouchDevice) {
      return () => window.removeEventListener('resize', checkTouchDevice);
    }

    const updateCursor = (e: MouseEvent) => {
      if (!isContextMenu && windowHasFocus && isDocumentVisible) {
        requestAnimationFrame(() => {
          setPosition({ x: e.clientX, y: e.clientY });
          const isInViewport = 
            e.clientX >= 0 && 
            e.clientX <= window.innerWidth &&
            e.clientY >= 0 && 
            e.clientY <= window.innerHeight;
          setIsOutside(!isInViewport);
          if (!isVisible && isInViewport && windowHasFocus && isDocumentVisible) setIsVisible(true);
        });
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (isContextMenu || !windowHasFocus || !isDocumentVisible) return;
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        !!target.closest('button') ||
        !!target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        window.getComputedStyle(target).cursor === 'pointer';
      setIsHovering(!!isClickable);
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) setIsClicking(true);
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0) setIsClicking(false);
    };

    const handleContextMenu = () => {
      setIsContextMenu(true);
      setIsVisible(false);
    };

    // Il menu contestuale si chiude con click, esc, o perdita focus
    const handleContextMenuClose = () => {
      if (isContextMenu && windowHasFocus && isDocumentVisible) {
        setIsContextMenu(false);
        setIsVisible(true);
      }
    };

    const handlePointerLeave = () => {
      setIsOutside(true);
      setIsVisible(false);
    };

    const handlePointerEnter = () => {
      if (!isContextMenu && windowHasFocus && isDocumentVisible) {
        setIsOutside(false);
        setIsVisible(true);
      }
    };

    // Focus/blur finestra
    const handleWindowFocus = () => {
      setWindowHasFocus(true);
      if (!isContextMenu && !isOutside && isDocumentVisible) {
        setIsVisible(true);
      }
    };
    const handleWindowBlur = () => {
      setWindowHasFocus(false);
      setIsVisible(false);
    };

    // Visibilitychange (es. barra applicazioni, alt+tab, browser in background)
    const handleVisibilityChange = () => {
      setIsDocumentVisible(document.visibilityState === 'visible');
      if (document.visibilityState !== 'visible') {
        setIsVisible(false);
      } else if (!isContextMenu && !isOutside && windowHasFocus) {
        setIsVisible(true);
      }
    };

    // Nuovo: nascondi cursore quando il mouse esce dalla finestra (es. sopra la barra delle applicazioni)
    const handleWindowMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget && !(e.target instanceof HTMLElement)) {
        setIsVisible(false);
        setIsOutside(true);
      }
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('click', handleContextMenuClose);
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') handleContextMenuClose();
    });
    document.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('pointerenter', handlePointerEnter);
    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('mouseout', handleWindowMouseOut);

    return () => {
      window.removeEventListener('resize', checkTouchDevice);
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('click', handleContextMenuClose);
      document.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('pointerenter', handlePointerEnter);
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('mouseout', handleWindowMouseOut);
    };
  }, [isVisible, isTouchDevice, isContextMenu, windowHasFocus, isDocumentVisible]);

  // Non renderizzare nulla su dispositivi touch o quando nascosto
  if (isTouchDevice || (!isVisible && !isOutside) || !windowHasFocus || !isDocumentVisible) return null;

  return (
    <div
      id="cursor"
      className={`
        ${isHovering ? 'hover' : ''} 
        ${isClicking ? 'clicking' : ''} 
        ${isOutside ? 'outside' : ''} 
        ${!isVisible || !windowHasFocus || !isDocumentVisible ? 'hidden' : ''}
      `}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    />
  );
};

export default CustomCursor;