'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiProps {
  trigger: boolean;
}

// Move this function outside of useEffect
function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function Confetti({ trigger }: ConfettiProps) {
  useEffect(() => {
    if (trigger) {
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      for (let i = 0; i < 5; i++) {
        confetti({
          ...defaults,
          particleCount: 50,
          origin: {
            x: randomInRange(0.1, 0.9),
            y: randomInRange(0.1, 0.3)
          }
        });
      }
    }
  }, [trigger]);

  return null; // This component doesn't render anything visible
} 