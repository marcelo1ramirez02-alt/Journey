import React from 'react';

interface CornerCutsProps {
  color?: string; // Tailwind color class, e.g., 'text-brand-bg'
  size?: number; // width and height, e.g., 16
  topLeft?: boolean;
  topRight?: boolean;
  bottomRight?: boolean;
  bottomLeft?: boolean;
}

export default function CornerCuts({
  color = "text-brand-bg",
  size = 16,
  topLeft = true,
  topRight = true,
  bottomRight = true,
  bottomLeft = true
}: CornerCutsProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none z-20 ${color}`}>
      {topLeft && (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 72 72" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="absolute top-0 left-0"
        >
          <path d="M0 0H72L0 72V0Z" fill="currentColor"/>
        </svg>
      )}
      {topRight && (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 72 72" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="absolute top-0 right-0"
        >
          <path d="M72 0V72L0 0H72Z" fill="currentColor"/>
        </svg>
      )}
      {bottomRight && (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 72 72" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="absolute bottom-0 right-0"
        >
          <path d="M72 72V0L0 72H72Z" fill="currentColor"/>
        </svg>
      )}
      {bottomLeft && (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 72 72" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="absolute bottom-0 left-0"
        >
          <path d="M0 72H72L0 0V72Z" fill="currentColor"/>
        </svg>
      )}
    </div>
  );
}
