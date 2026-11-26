import { motion } from 'framer-motion';
import { Card, CardBody } from '@/components/ui/Card.jsx';
import { formatNumber } from '@/utils/formatters.js';

const TONE_RING = {
  brand:   'text-brand-600 bg-brand-50 dark:text-brand-400 dark:bg-brand-900/30',
  info:    'text-info-600 bg-info-50 dark:text-info-400 dark:bg-info-900/30',
  success: 'text-success-600 bg-success-50 dark:text-success-400 dark:bg-success-900/30',
  warning: 'text-warning-600 bg-warning-50 dark:text-warning-400 dark:bg-warning-900/30',
  danger:  'text-danger-600 bg-danger-50 dark:text-danger-400 dark:bg-danger-900/30',
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 350, damping: 30 } }
};

export default function MetricCard({ title, value, icon: Icon, tone = 'brand', hint }) {
  return (
    <motion.div variants={item}>
      <Card hoverEffect>
        <CardBody className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">
              {title}
            </p>
            <p className="mt-2 text-3xl font-medium text-ink-900 dark:text-white tabular-nums">
              {typeof value === 'number' ? formatNumber(value) : value}
            </p>
            {hint && <p className="mt-1 text-xs text-ink-400 dark:text-ink-500">{hint}</p>}
          </div>
          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded ${TONE_RING[tone]}`}>
            <Icon size={15} />
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}

export const metricContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};