import { memo } from "react";
import { UseFormReturn } from "react-hook-form";
import { CreateProjFormType } from "../validates";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Github } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface IProps {
  form: UseFormReturn<CreateProjFormType, any, undefined>;
}

const SettingStep = memo(({ form }: IProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="isPublic"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Public Project</FormLabel>
              <FormDescription>
                Make this project visible to all team members, not just those
                assigned to it.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="repositoryUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Repository URL (Optional)</FormLabel>
            <FormControl>
              <div className="flex items-center">
                <Github className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="https://github.com/username/repo"
                  {...field}
                />
              </div>
            </FormControl>
            <FormDescription>
              Link to the project's code repository.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
});

export default SettingStep;
