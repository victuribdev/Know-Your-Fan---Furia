
import React from "react";
import { cn } from "@/lib/utils";

interface FormStepIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

const FormStepIndicator = ({
  steps,
  currentStep,
  onStepClick,
}: FormStepIndicatorProps) => {
  return (
    <div className="mb-8">
      <div className="hidden sm:flex justify-center w-full">
        <div className="relative flex w-full max-w-3xl justify-between">
          {/* Progress Bar */}
          <div className="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 bg-muted">
            <div
              className="h-0.5 bg-accent transition-all duration-300"
              style={{
                width: `${
                  currentStep === 0 ? 0 : (currentStep / (steps.length - 1)) * 100
                }%`,
              }}
            ></div>
          </div>

          {steps.map((step, index) => {
            const isActive = index <= currentStep;
            const isCurrentStep = index === currentStep;

            return (
              <div
                key={index}
                className="relative z-10 flex flex-col items-center"
              >
                <div
                  onClick={() => onStepClick && onStepClick(index)}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground",
                    isCurrentStep && "ring-2 ring-accent ring-offset-2 ring-offset-background",
                    onStepClick && "cursor-pointer"
                  )}
                >
                  {index + 1}
                </div>
                <p
                  className={cn(
                    "mt-2 text-xs font-medium",
                    isActive ? "text-accent" : "text-muted-foreground"
                  )}
                >
                  {step}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden flex items-center justify-center space-x-2 mb-4">
        {steps.map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-2 rounded-full transition-all",
              index === currentStep
                ? "w-8 bg-accent"
                : index < currentStep
                ? "w-3 bg-accent/70" 
                : "w-3 bg-muted"
            )}
          />
        ))}
      </div>
      <div className="sm:hidden text-center">
        <h3 className="text-sm font-medium text-accent">
          Passo {currentStep + 1}: {steps[currentStep]}
        </h3>
      </div>
    </div>
  );
};

export default FormStepIndicator;
