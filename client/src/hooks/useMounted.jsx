import { useEffect, useRef } from 'react';

const useMounted = () => {
  const isMounted = useRef(true);

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );

  return isMounted;
};

export default useMounted;
