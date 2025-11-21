interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="h-1.5 w-full bg-gray-200">
        <div
          className="h-full bg-gradient-to-r from-royal-blue to-sky-blue transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-3 text-center text-sm text-gray-600">
        Pergunta {currentStep} de {totalSteps}
      </p>
    </div>
  );
}
