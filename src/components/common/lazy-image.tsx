import { useEffect, useRef } from 'react';

const LazyLoadedImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = new window.Image();
            img.src = src;
            img.onload = () => {
              if (imageRef.current) {
                imageRef.current.src = src;
              }
            };
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 } // Adjust the threshold as needed
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [src]);

  return <img ref={imageRef} alt={alt} />;
};

export default LazyLoadedImage;
