import React, { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

// Counts up from 0 to `value` once it scrolls into view.
const AnimatedCounter = ({ value, suffix = '', duration = 1.6, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(Math.floor(latest)),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
