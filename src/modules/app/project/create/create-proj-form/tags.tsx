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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Tag, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command } from "@/components/ui/command";
import { PROJECT_TAGS } from "../constants";

interface IProps {
  values: any[];
  form: UseFormReturn<CreateProjFormType, any, undefined>;
  onToggleTag: (id: string) => void;
}

const TagStep = memo(({ values, form, onToggleTag }: IProps) => {
  const projectTags = PROJECT_TAGS;

  return (
    <FormField
      control={form.control}
      name="tags"
      render={() => (
        <FormItem>
          <FormLabel>Tags</FormLabel>
          <FormControl>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {values.map((tagId) => {
                  const tag = projectTags.find((t) => t._id === tagId);
                  if (!tag) return null;

                  return (
                    <Badge key={tag._id} variant="outline" className="gap-1">
                      <Tag className="h-3 w-3" />
                      {tag.name}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-3 w-3 rounded-full p-0"
                        onClick={() => onToggleTag(tag._id)}
                      >
                        <span className="sr-only">Remove {tag.name}</span>
                        <span>×</span>
                      </Button>
                    </Badge>
                  );
                })}
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    Select Tags
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search tags..." />
                    <CommandList>
                      <CommandEmpty>No tags found.</CommandEmpty>
                      <CommandGroup>
                        {projectTags.map((tag) => (
                          <CommandItem
                            key={tag._id}
                            onSelect={() => onToggleTag(tag._id)}
                            className="flex items-center gap-2"
                          >
                            <Checkbox
                              checked={values.includes(tag._id)}
                              className="mr-1"
                            />
                            <Tag className="h-3 w-3 mr-1" />
                            <span>{tag.name}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </FormControl>
          <FormDescription>
            Add tags to categorize your project.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
});

export default TagStep;
