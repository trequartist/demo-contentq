import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface ProgressStep {
  name: string;
  status: "completed" | "in-progress" | "pending";
}

export interface ProgressBarProps {
  steps: ProgressStep[];
  showLabels?: boolean;
  animated?: boolean;
  className?: string;
}

export function ProgressBar({ steps, showLabels = true, animated = true, className }: ProgressBarProps) {
  const completedSteps = steps.filter((s) => s.status === "completed").length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <div className={cn("w-full", className)}>
      {/* Progress Bar */}
      <div className="relative h-1 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full bg-primary transition-all duration-500 ease-out",
            animated && "relative"
          )}
          style={{ width: `${progressPercentage}%` }}
        >
          {animated && (
            <div
              className="absolute inset-0 animate-progress-stripes"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent)",
                backgroundSize: "20px 20px",
                animation: "progress-stripes 1s linear infinite",
              }}
            />
          )}
        </div>
      </div>

      {/* Step Indicators */}
      {showLabels && (
        <div className="mt-3 flex justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              {/* Dot Indicator */}
              <div
                className={cn(
                  "flex h-3 w-3 items-center justify-center rounded-full border-2 transition-all duration-200",
                  step.status === "completed" &&
                    "border-primary bg-primary",
                  step.status === "in-progress" &&
                    "animate-pulse border-primary bg-background",
                  step.status === "pending" && "border-border bg-background"
                )}
              >
                {step.status === "completed" && (
                  <Check className="h-2 w-2 animate-check-pop text-primary-foreground" />
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  "text-xs transition-colors duration-200",
                  step.status === "in-progress" && "font-medium text-foreground",
                  step.status === "completed" && "text-muted-foreground",
                  step.status === "pending" && "text-muted-foreground"
                )}
              >
                {step.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Add to tailwind.config.ts animations if not present
const animationStyles = `
@keyframes progress-stripes {
  0% { background-position: 0 0; }
  100% { background-position: 20px 0; }
}

@keyframes check-pop {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
`;
