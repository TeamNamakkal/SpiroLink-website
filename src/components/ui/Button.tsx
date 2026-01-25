import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  [key: string]: unknown;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'font-semibold rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2 hover:shadow-lg active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 tracking-tight';

  const variantStyles = {
    primary:
      'bg-sky-500 text-white hover:bg-sky-600 hover:shadow-lg focus-visible:outline-sky-500 shadow-md active:shadow-sm',
    secondary:
      'bg-slate-600 text-white hover:bg-slate-700 hover:shadow-md focus-visible:outline-slate-600 shadow-sm active:shadow-none',
    outline: 'border-2 border-sky-500 text-sky-600 hover:bg-sky-50 hover:border-sky-600 focus-visible:outline-sky-500 transition-all',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
