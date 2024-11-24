
import {useEffect, useState, useRef} from 'react'

export function useInterval(callback, delay, tickAtStart) {
    const savedCallback = useRef();
    const [hasTickedAtStart, setHasTickedAtStart] = useState(false);
  
    // Remember the latest callback
    useEffect(() => {
      savedCallback.current = callback;
    });
  
    // Set up the interval
    useEffect(() => {
      function tick() {
        if (typeof savedCallback.current === 'function') {
          savedCallback.current();
        }
      }
      // Passing null as delay = pause
      if (delay !== null) {
        const id = setInterval(tick, delay);
        if (tickAtStart && !hasTickedAtStart) {
          setHasTickedAtStart(true);
          tick();
        }
        return () => clearInterval(id);
      }
    }, [delay, hasTickedAtStart, tickAtStart]);
  }