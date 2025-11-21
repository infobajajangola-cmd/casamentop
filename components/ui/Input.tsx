import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-stone-500 ml-1">{label}</label>}
      <input 
        className={`
          border border-stone-200 bg-stone-50/50 px-4 py-3 rounded-sm text-stone-800 font-serif
          focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all duration-300
          placeholder:text-stone-400/70 placeholder:font-sans placeholder:text-sm
          ${error ? 'border-red-400 bg-red-50' : 'hover:border-stone-300'} 
          ${className}
        `}
        {...props}
      />
      {error && <span className="text-xs text-red-500 font-serif italic">{error}</span>}
    </div>
  );
};