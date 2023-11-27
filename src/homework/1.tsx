import React, { ReactNode, useEffect, useRef, ReactElement } from "react";

interface Props {
  children: ReactNode;
  onContentEndVisible: () => void;
}

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export function Observer({
  children,
  onContentEndVisible,
}: Props): ReactElement {
  const endContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options: IntersectionObserverOptions = {
      rootMargin: "0px",
      threshold: 1.0,
      root: null,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}
