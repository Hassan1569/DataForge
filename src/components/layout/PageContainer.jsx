export default function PageContainer({ title, description, actions, children }) {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-6 lg:px-6 lg:py-8">
      {(title || actions) && (
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            {title && (
              <h1 className="text-lg font-semibold tracking-tight text-ink-900">
                {title}
              </h1>
            )}
            {description && (
              <p className="mt-0.5 text-sm text-ink-500">{description}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}