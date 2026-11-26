export function Card({ className = '', children, ...rest }) {
  return (
    <div
      className={`rounded-lg border border-ink-200 bg-white shadow-sm dark:bg-ink-900 dark:border-ink-800 transition-colors ${className}`}
      {...rest}
    >
      {children}
    </div>
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