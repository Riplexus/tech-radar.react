import { useLayoutEffect, useState } from "react";

const useDimensions = ({ targetRef }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const applyDimensions = () => {
      if (targetRef.current) {
        setDimensions({
          width: targetRef.current.offsetWidth,
          height: targetRef.current.offsetHeight,
        });
      }
    }

    window.addEventListener('resize', applyDimensions);
    applyDimensions();
    return () => window.removeEventListener('resize', applyDimensions);
  }, [targetRef]);

  return dimensions;
};

export default useDimensions;