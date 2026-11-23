const TONES = {
  neutral: 'bg-ink-100 text-ink-700 border-ink-200',
  success: 'bg-success-50 text-success-700 border-success-600/20',
  warning: 'bg-warning-50 text-warning-700 border-warning-600/20',
  danger:  'bg-danger-50 text-danger-700 border-danger-600/20',
  info:    'bg-info-50 text-info-700 border-info-600/20',
  brand:   'bg-brand-50 text-brand-700 border-brand-600/20',
};

export default function Badge({ tone = 'neutral', children, className = '' }) {
  const classes = [
    'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium leading-5',
    TONES[tone] ?? TONES.neutral,
    className,
  ].join(' ');
  return <span className={classes}>{children}</span>;
}