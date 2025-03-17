import CustomSteps from "@/components/custom-steps";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { CREATE_STEPS } from "./constants";
import CreateProjectForm, { ICreateProjectFormRef } from "./create-proj-form";
import { CreateProjFormType } from "./validates";

export default function CreateProject() {
  const [currentStep, setCurrentStep] = useState(0);
  const formRef = useRef<ICreateProjectFormRef>(null);

  const handleSubmit = useCallback(async (values: CreateProjFormType) => {
    try {
      console.log(values);
      formRef.current?.setIsSubmitting(true);
    } catch (error) {}
  }, []);

  const handleNextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, CREATE_STEPS.length - 1));
  }, []);

  const handlePrevStep = useCallback(() => {
    setCurrentStep((prev: number) => Math.max(prev - 1, 0));
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <a href="#">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </a>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">
          Create New Project
        </h1>
      </div>
      <CustomSteps currentStep={currentStep} steps={CREATE_STEPS} />
      <CreateProjectForm
        ref={formRef}
        currentStep={currentStep}
        onSubmit={handleSubmit}
        onNextStep={handleNextStep}
        onPrevStep={handlePrevStep}
      />
    </div>
  );
}
