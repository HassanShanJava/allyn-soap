import { useEffect, useRef } from 'react';

export default function SplashScreen() {
  const splashRef: any = useRef();
  useEffect(() => {
    setTimeout(() => {
      splashRef.current.style.display = 'none';
    }, 2000);
  }, []);
  return (
    <div className="example-class" ref={splashRef}>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4" />
        <h2 className="text-text text-xl font-semibold">Loading...</h2>
      </div>
    </div>
  );
}
