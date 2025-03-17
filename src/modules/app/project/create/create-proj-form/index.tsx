import { Form } from "@/components/ui/form";
import {
  createProjDefaultValues,
  createProjFormSchema,
  CreateProjFormType,
} from "../validates";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BasicStep from "./basic";
import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import TimelineStep from "./timeline";
import TeamStep from "./team";
import { CREATE_STEPS } from "../constants";
import TagStep from "./tags";
import SettingStep from "./settings";
import ReviewTab from "./review";

interface IProps {
  currentStep: number;
  onSubmit: (values: CreateProjFormType) => Promise<void>;
  onNextStep: () => void;
  onPrevStep: () => void;
}

export interface ICreateProjectFormRef {
  setIsSubmitting: (v: boolean) => void;
}

const CreateProjectForm = memo(
  forwardRef<ICreateProjectFormRef, IProps>(
    ({ currentStep, onSubmit, onNextStep, onPrevStep }, ref) => {
      const steps = CREATE_STEPS;
      const lastStep = steps.length - 1;

      const [isSubmitting, setIsSubmitting] = useState(false);
      const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
      const [selectedTags, setSelectedTags] = useState<string[]>([]);

      const form = useForm<CreateProjFormType>({
        resolver: zodResolver(createProjFormSchema),
        defaultValues: createProjDefaultValues,
        mode: "onChange",
      });

      useImperativeHandle(ref, () => ({
        setIsSubmitting: (v: boolean) => setIsSubmitting(v),
      }));

      const nextStep = async () => {
        const currentStepFields = steps[currentStep].fields;

        const result = await form.trigger(currentStepFields as any);

        if (result) {
          onNextStep();
        }
      };

      const prevStep = () => {
        onPrevStep();
      };

      const handleToggleTeamMember = useCallback(
        (memberId: string) => {
          setSelectedMembers((prev) =>
            prev.includes(memberId)
              ? prev.filter((id) => id !== memberId)
              : [...prev, memberId],
          );

          const currentMembers = form.getValues("teamMembers");
          const newMembers = currentMembers.includes(memberId)
            ? currentMembers.filter((id) => id !== memberId)
            : [...currentMembers, memberId];

          form.setValue("teamMembers", newMembers, { shouldValidate: true });
        },
        [form],
      );

      const handleToggleTag = useCallback(
        (tagId: string) => {
          setSelectedTags((prev) =>
            prev.includes(tagId)
              ? prev.filter((id) => id !== tagId)
              : [...prev, tagId],
          );

          const currentTags = form.getValues("tags") || [];
          const newTags = currentTags.includes(tagId)
            ? currentTags.filter((id) => id !== tagId)
            : [...currentTags, tagId];

          form.setValue("tags", newTags, { shouldValidate: true });
        },
        [form],
      );

      const isCurrentStepValid = () => {
        const currentStepFields = steps[currentStep].fields;
        const formErrors = form.formState.errors;

        return currentStepFields.every(
          (field) => !formErrors[field as keyof typeof formErrors],
        );
      };

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>{steps[currentStep].name}</CardTitle>
                <CardDescription>
                  {steps[currentStep].description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentStep === 0 && <BasicStep form={form} />}
                {currentStep === 1 && <TimelineStep form={form} />}
                {currentStep === 2 && (
                  <TeamStep
                    form={form}
                    values={selectedMembers}
                    onToggleMember={handleToggleTeamMember}
                  />
                )}
                {currentStep === 3 && (
                  <TagStep
                    form={form}
                    values={selectedTags}
                    onToggleTag={handleToggleTag}
                  />
                )}
                {currentStep === 4 && <SettingStep form={form} />}
                {currentStep === 5 && <ReviewTab form={form} />}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  Previous
                </Button>

                {currentStep < lastStep && (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!isCurrentStepValid()}
                  >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
                {currentStep === lastStep && (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="mr-2">Creating Project</span>
                        <span className="animate-spin">
                          <svg
                            className="h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        </span>
                      </>
                    ) : (
                      "Create Project"
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </form>
        </Form>
      );
    },
  ),
);

export default CreateProjectForm;
