import { useEffect, useRef } from 'react';

/**
 * Custom hook to trap keyboard focus within a modal dialog (WCAG 2.1 AA/AAA compliance).
 * Prevents tabbing outside the dialog and restores focus to triggering element upon close.
 * 
 * @param {boolean} isOpen - Whether the modal dialog is currently open
 * @param {Function} [onClose] - Optional close callback for Escape key
 * @returns {React.RefObject} - Ref to attach to the modal container element
 */
export function useFocusTrap(isOpen, onClose) {
  const containerRef = useRef(null);
  const previousActiveElementRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Save previously focused element to restore when modal closes
    previousActiveElementRef.current = document.activeElement;

    const container = containerRef.current;
    if (!container) return;

    const focusableSelectors = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');

    const getFocusableElements = () => {
      if (!container) return [];
      return Array.from(container.querySelectorAll(focusableSelectors));
    };

    // Focus first element
    const focusables = getFocusableElements();
    if (focusables.length > 0) {
      focusables[0].focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        if (onClose) onClose();
        return;
      }

      if (e.key !== 'Tab') return;

      const elements = getFocusableElements();
      if (elements.length === 0) {
        e.preventDefault();
        return;
      }

      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      if (previousActiveElementRef.current && typeof previousActiveElementRef.current.focus === 'function') {
        previousActiveElementRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  return containerRef;
}
