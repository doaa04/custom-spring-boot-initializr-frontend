interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export default function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="step-indicator">
      {steps.map((title, index) => (
        <div key={index} className="step-wrapper">
          <div
            className={`step ${currentStep === index ? "active" : ""} ${
              currentStep > index ? "completed" : ""
            }`}
            onClick={() => onStepClick(index)}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-label">{title}</div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`step-connector ${
                currentStep > index ? "completed" : ""
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
}
