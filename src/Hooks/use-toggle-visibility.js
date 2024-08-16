import { useRef } from 'react';

export const useToggleVisibility = (initialVisibility = true) => {
  const elementRef = useRef(null);

  const toggleVisibility = () => {
    if (elementRef.current) {
      elementRef.current.style.display = elementRef.current.style.display === 'none' ? 'block' : 'none';
    }
  };

  const setVisibility = (visible) => {
    if (elementRef.current) {
      elementRef.current.style.display = visible ? 'block' : 'none';
    }
  };

  // Initialize visibility
  setVisibility(initialVisibility);

  return [elementRef, toggleVisibility];
};
