import React, { useEffect, useState } from 'react';

/**
 * CountUp (React Bits 2.0 pattern)
 * Smoothly interpolates numeric values from 0 to target on load.
 */
export default function CountUp({ to, duration = 1200, decimals = 0, suffix = '', prefix = '' }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(ease * to);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [to, duration]);

  return (
    <span>
      {prefix}
      {value.toLocaleString('es-CO', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
