export default function Loader({ label = 'Loading…' }) {
  return (
    <div className="flex items-center justify-center gap-2 py-10 text-sm text-ink-500">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink-300 border-t-brand-500" />
      <span>{label}</span>
    </div>
  );
}