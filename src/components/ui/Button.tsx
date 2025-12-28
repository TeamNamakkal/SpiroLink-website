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
    'font-semibold rounded-lg transition-all inline-flex items-center justify-center gap-2';

  const variantStyles = {
    primary:
      'bg-green-600 text-white hover:bg-green-700 active:scale-95 shadow-md hover:shadow-lg',
    secondary:
      'bg-slate-600 text-white hover:bg-slate-700 active:scale-95 shadow-md hover:shadow-lg',
    outline: 'border-2 border-green-600 text-green-600 hover:bg-green-50',
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
