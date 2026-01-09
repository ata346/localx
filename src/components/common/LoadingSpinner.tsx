import React from 'react';
import logoImage from '@/assets/logo.png';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  fullScreen = false, 
  message = "Loading..." 
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Logo with pulse animation */}
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
        <img 
          src={logoImage} 
          alt="LOCAL X" 
          className="h-16 w-auto relative z-10 animate-pulse"
        />
      </div>
      
      {/* Spinning ring */}
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-muted rounded-full" />
        <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin" />
      </div>
      
      {/* Loading text */}
      <p className="text-muted-foreground text-sm font-medium animate-pulse">
        {message}
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      {content}
    </div>
  );
};

export default LoadingSpinner;
