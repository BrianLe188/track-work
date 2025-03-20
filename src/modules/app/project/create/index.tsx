import CustomSteps from "@/components/custom-steps";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { CREATE_STEPS } from "./constants";
import CreateProjectForm, { ICreateProjectFormRef } from "./create-proj-form";
import { CreateProjFormType } from "./validates";
import ProjectEvent from "@/events/project";
import { toast } from "sonner";
import NOTIFY_MESSAGE from "@/constants/notify";
import { useNavigate } from "react-router";

export default function CreateProject() {
  const [currentStep, setCurrentStep] = useState(0);
  const formRef = useRef<ICreateProjectFormRef>(null);
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (values: CreateProjFormType) => {
    try {
      formRef.current?.setIsSubmitting(true);

      const res = await ProjectEvent.createProject(values);

      if (res) {
        toast.success(NOTIFY_MESSAGE.CREATE_PROJECT_SUCCESS);
      }
    } catch (error) {
      toast.error(NOTIFY_MESSAGE.FAILED_TO_SUBMIT);
    } finally {
      formRef.current?.setIsSubmitting(false);
    }
  }, []);

  const handleNextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, CREATE_STEPS.length - 1));
  }, []);

  const handlePrevStep = useCallback(() => {
    setCurrentStep((prev: number) => Math.max(prev - 1, 0));
  }, []);

  const handleBack = () => navigate(-1);

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
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
