import { cn } from "@/lib/utils";
import { Check, LucideIcon } from "lucide-react";

interface Step {
  key: string;
  name: string;
  icon: LucideIcon;
  fields: string[];
  description?: string;
}

interface IProps {
  steps: Step[];
  currentStep: number;
}

export default function CustomSteps({ steps, currentStep = 0 }: IProps) {
  return (
    <nav aria-label="Progress" className="mb-4">
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step, index) => (
          <li key={step.key} className="md:flex-1">
            <div
              className={cn(
                "group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4",
                index < currentStep
                  ? "border-primary"
                  : index === currentStep
                    ? "border-primary"
                    : "border-muted-foreground/20",
              )}
            >
              <span
                className={cn(
                  "text-sm font-medium",
                  index < currentStep
                    ? "text-primary"
                    : index === currentStep
                      ? "text-primary"
                      : "text-muted-foreground",
                )}
              >
                <span className="flex items-center gap-2">
                  <step.icon className="h-4 w-4" />
                  {step.name}
                </span>
              </span>
              <span className="text-sm">
                {index < currentStep && (
                  <span className="text-primary">
                    <Check className="inline h-4 w-4" />
                    <span className="sr-only">Completed</span>
                  </span>
                )}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
