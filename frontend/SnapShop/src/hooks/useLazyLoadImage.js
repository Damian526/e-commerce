import { useState, useRef, useCallback } from "react";

const useLazyLoadImage = (src) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const imgRef = useRef(null);

  const observerCallback = useCallback((entries, observer) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      setIsIntersecting(true);
      observer.disconnect();
    }
  }, []);

  const setRef = useCallback(
    (node) => {
      if (node) {
        const observer = new IntersectionObserver(observerCallback, {
          rootMargin: "100px",
          threshold: 0.1,
        });
        observer.observe(node);
        imgRef.current = node;
      }
    },
    [observerCallback],
  );

  return [setRef, isIntersecting ? src : null];
};

export default useLazyLoadImage;
