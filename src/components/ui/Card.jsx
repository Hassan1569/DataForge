import { motion } from 'framer-motion';

export function Card({ className = '', children, hoverEffect = false, ...rest }) {
  const baseClasses = "rounded-lg border border-ink-200 bg-white shadow-sm dark:bg-ink-900 dark:border-ink-800 transition-colors";
  const Component = hoverEffect ? motion.div : 'div';

  const hoverProps = hoverEffect ? {
    whileHover: { y: -4, scale: 1.01, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" },
    transition: { type: "spring", stiffness: 400, damping: 25 }
  } : {};

  return (
    <Component
      className={`${baseClasses} ${className}`}
      {...hoverProps}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function CardHeader({ title, description, actions, className = '' }) {
  return (
    <div className={`flex items-start justify-between gap-4 border-b border-ink-200 px-5 py-4 dark:border-ink-800 ${className}`}>
      <div className="min-w-0">
        {title && <h3 className="text-sm font-semibold text-ink-900 dark:text-white">{title}</h3>}
        {description && <p className="mt-0.5 text-xs text-ink-500 dark:text-ink-400">{description}</p>}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}

export function CardBody({ className = '', children }) {
  return <div className={`px-5 py-4 ${className}`}>{children}</div>;
}