import { MutableRefObject, RefCallback, useEffect, useRef } from 'react';

export default function useEnsuredForwardedRef<T>(
  forwardedRef: MutableRefObject<T | null> | RefCallback<T> | null
) {
  const initialValue =
    forwardedRef && 'current' in forwardedRef ? forwardedRef.current : null;
  const ensuredRef = useRef(initialValue);

  useEffect(() => {
    if (typeof forwardedRef === 'function') {
      forwardedRef(ensuredRef.current);
    } else if (forwardedRef) {
      forwardedRef.current = ensuredRef.current;
    }
  }, [forwardedRef]);

  return ensuredRef;
}
