import { useLayoutEffect, useRef, useState } from "react";

const withDimensions = WrappedComponent => {
  const ComponentWithDimensions = ({...props}) => {
    const targetRef = useRef();
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
    }, []);
  
    return <WrappedComponent ref={targetRef} dimensions={dimensions} {...props} />;
  };

  ComponentWithDimensions.displayName = `withDimensions(${WrappedComponent.displayName || WrappedComponent.name})`;

  return ComponentWithDimensions;
}

export default withDimensions;