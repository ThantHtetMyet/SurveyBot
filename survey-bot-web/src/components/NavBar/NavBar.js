import React, { useState, useEffect, useRef, useMemo } from 'react';
import './NavBar.css';

const NavBar = ({ activeMenu, onMenuChange }) => {
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const menuRef = useRef(null);

  const menus = useMemo(() => [
    { id: 'form', label: 'Survey-Form' },
    { id: 'list', label: 'Survey-List' },
  ], []);

  useEffect(() => {
    const getActiveIndex = () => {
      // When viewing details, show 'list' as active
      const menuToShow = activeMenu === 'details' ? 'list' : activeMenu;
      const index = menus.findIndex(item => item.id === menuToShow);
      return index >= 0 ? index : 0;
    };

    const updateIndicator = () => {
      // Use requestAnimationFrame to ensure DOM has fully updated
      requestAnimationFrame(() => {
        if (menuRef.current) {
          const activeIndex = getActiveIndex();
          // Get all children, filter out the indicator and get only buttons
          const buttons = Array.from(menuRef.current.children).filter(
            child => child.classList.contains('navbar-item')
          );
          const activeButton = buttons[activeIndex];
          
          if (activeButton) {
            // Force a reflow to ensure accurate measurements
            void activeButton.offsetWidth;
            
            // Calculate position relative to the menu container
            const left = activeButton.offsetLeft;
            const width = activeButton.offsetWidth;
            
            setIndicatorStyle({
              width: `${width}px`,
              left: `${left}px`
            });
          } else {
            // Reset if no active button found
            setIndicatorStyle({ width: '0px', left: '0px' });
          }
        }
      });
    };

    // Debounce function for resize events
    let resizeTimeout = null;
    const debouncedUpdate = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      resizeTimeout = setTimeout(updateIndicator, 150);
    };

    // Initial update - try multiple times to ensure it works after layout changes
    const timer1 = setTimeout(updateIndicator, 50);
    const timer2 = setTimeout(updateIndicator, 150);
    const timer3 = setTimeout(updateIndicator, 300);
    
    // Update on window resize (debounced)
    window.addEventListener('resize', debouncedUpdate);
    
    // Use ResizeObserver to watch for changes in the menu container and buttons
    let resizeObserver = null;
    if (menuRef.current && window.ResizeObserver) {
      resizeObserver = new ResizeObserver((entries) => {
        // Debounce ResizeObserver callbacks
        if (resizeTimeout) {
          clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(updateIndicator, 50);
      });
      resizeObserver.observe(menuRef.current);
      
      // Also observe each button for size changes
      const buttons = Array.from(menuRef.current.children).filter(
        child => child.classList.contains('navbar-item')
      );
      buttons.forEach(button => {
        resizeObserver.observe(button);
      });
    }
    
    // Also listen for media query changes (when layout switches between mobile/desktop)
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleMediaChange = () => {
      // Small delay to let CSS transitions complete
      setTimeout(updateIndicator, 200);
    };
    mediaQuery.addEventListener('change', handleMediaChange);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      window.removeEventListener('resize', debouncedUpdate);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, [activeMenu, menus]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="animated-survey-icon">
            <svg viewBox="0 0 100 100" className="survey-icon-svg">
              <circle cx="50" cy="50" r="40" className="icon-circle" />
              <path d="M30 35 L50 50 L70 35" className="icon-path icon-path-1" />
              <path d="M30 50 L50 65 L70 50" className="icon-path icon-path-2" />
              <path d="M30 65 L50 80 L70 65" className="icon-path icon-path-3" />
            </svg>
            <span className="icon-hover-text">Survey-Bot</span>
          </div>
        </div>
        <div className="navbar-menu" ref={menuRef}>
          <div className="active-indicator" style={indicatorStyle}></div>
          {menus.map((menu) => {
            // When viewing details, show 'list' as active
            const menuToShow = activeMenu === 'details' ? 'list' : activeMenu;
            const isActive = menuToShow === menu.id;
            return (
              <button
                key={menu.id}
                className={`navbar-item ${isActive ? 'active' : ''}`}
                onClick={() => onMenuChange(menu.id)}
              >
                {menu.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

