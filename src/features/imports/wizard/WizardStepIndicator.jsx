import { Check } from 'lucide-react';

const STEPS = ['Upload', 'Preview', 'Map Fields', 'Validate', 'Review'];

export default function WizardStepIndicator({ currentStep }) {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol role="list" className="flex items-center justify-between">
        {STEPS.map((step, index) => {
          const stepNumber = index + 1;
          const isComplete = currentStep > stepNumber;
          const isCurrent = currentStep === stepNumber;

          return (
            <li key={step} className="relative flex-1 flex flex-col items-center">
              <div className="flex w-full items-center">
                <div className={`h-0.5 w-full ${index === 0 ? 'bg-transparent' : isComplete || isCurrent ? 'bg-brand-600' : 'bg-ink-200'}`} />
                <div 
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
                    isComplete ? 'border-brand-600 bg-brand-600' :
                    isCurrent ? 'border-brand-600 bg-white' : 'border-ink-300 bg-white'
                  }`}
                >
                  {isComplete ? (
                    <Check size={16} className="text-white" />
                  ) : (
                    <span className={`text-xs font-semibold ${isCurrent ? 'text-brand-600' : 'text-ink-400'}`}>
                      {stepNumber}
                    </span>
                  )}
                </div>
                <div className={`h-0.5 w-full ${index === STEPS.length - 1 ? 'bg-transparent' : isComplete ? 'bg-brand-600' : 'bg-ink-200'}`} />
              </div>
              <span className={`mt-2 text-xs font-medium ${isCurrent ? 'text-brand-600' : 'text-ink-500'}`}>
                {step}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}