import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook managing the 15-minute solar ventilation countdown timer.
 * Provides audio chime notification, countdown state, and active phase guidance.
 */
export function useVentilationTimer(initialMinutes = 15) {
  const [secondsRemaining, setSecondsRemaining] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = useCallback(() => {
    setIsActive(true);
    setIsCompleted(false);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setIsCompleted(false);
    setSecondsRemaining(initialMinutes * 60);
  }, [initialMinutes]);

  // Audio chime trigger on timer completion using Web Audio API
  const playChime = useCallback(() => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(880, now + 0.2); // A5

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.2);
    } catch (e) {
      /* ignore audio error if disabled */
    }
  }, []);

  useEffect(() => {
    if (isActive && secondsRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsActive(false);
            setIsCompleted(true);
            playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, secondsRemaining, playChime]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const progressPercent = Math.round(((initialMinutes * 60 - secondsRemaining) / (initialMinutes * 60)) * 100);

  return {
    formattedTime,
    secondsRemaining,
    progressPercent,
    isActive,
    isCompleted,
    startTimer,
    pauseTimer,
    resetTimer,
  };
}
