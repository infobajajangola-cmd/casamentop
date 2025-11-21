import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading,
  className = '',
  disabled,
  ...props 
}) => {
  
  const baseStyles = "font-display uppercase tracking-wider transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group";
  
  const variants = {
    primary: "bg-gradient-to-r from-gold-500 to-gold-600 text-white hover:from-gold-400 hover:to-gold-500 shadow-lg hover:shadow-gold-500/30 border border-transparent",
    secondary: "bg-stone-900 text-white hover:bg-stone-800 shadow-lg",
    outline: "border border-gold-500 text-gold-600 hover:bg-gold-50",
    danger: "bg-red-900/90 hover:bg-red-800 text-white border border-red-800"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-8 py-3 text-xs font-bold",
    lg: "px-10 py-4 text-sm font-bold"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <span className="animate-pulse">Processing...</span>
      ) : (
         <>
            <span className="relative z-10">{children}</span>
            {/* Shine Effect on Hover for Primary */}
            {variant === 'primary' && (
                <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-shimmer" style={{ animationDuration: '1s' }}></div>
            )}
         </>
      )}
    </button>
  );
};