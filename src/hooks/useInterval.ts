import {useRef, useEffect} from 'react';

export function useInterval(
  callback: () => any,
  delay: number,
  initialFetch = false,
) {
  const savedCallback = useRef();

  useEffect(() => {
    // @ts-ignore
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      // @ts-ignore
      savedCallback.current();
    }
    if (delay !== null) {
      initialFetch && tick();
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
