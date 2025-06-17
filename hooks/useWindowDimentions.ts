import { useState, useEffect } from 'react';

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    s_width: 0,
    s_height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        s_width: window.innerWidth,
        s_height: window.innerHeight,
      });
    };

    if (typeof window !== 'undefined') {
      // Set initial values
      handleResize();
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
