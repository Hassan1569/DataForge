import { forwardRef } from 'react';

const VARIANTS = {
  primary:   'bg-brand-600 text-white hover:bg-brand-700 focus-visible:bg-brand-700 disabled:bg-brand-300',
  secondary: 'bg-white text-ink-800 border border-ink-200 hover:bg-ink-50 disabled:text-ink-400',
  ghost:     'bg-transparent text-ink-700 hover:bg-ink-100 disabled:text-ink-400',
  danger:    'bg-danger-600 text-white hover:bg-danger-700 disabled:bg-danger-300',
};

const SIZES = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-9 px-4 text-sm gap-2',
  lg: 'h-10 px-5 text-sm gap-2',
};

const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', className = '', type = 'button', children, ...rest },
  ref
) {
  const classes = [
    'inline-flex items-center justify-center rounded-md font-medium',
    'transition-colors duration-150 select-none whitespace-nowrap',
    'disabled:cursor-not-allowed',
    VARIANTS[variant] ?? VARIANTS.primary,
    SIZES[size] ?? SIZES.md,
    className,
  ].join(' ');

  return (
    <button ref={ref} type={type} className={classes} {...rest}>
      {children}
    </button>
  );
});

export default Button;