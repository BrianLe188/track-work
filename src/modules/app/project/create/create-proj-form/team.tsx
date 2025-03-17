import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { CreateProjFormType } from "../validates";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { TEAM_MEMBERS } from "../constants";
import { memo } from "react";

interface IProps {
  values: any[];
  form: UseFormReturn<CreateProjFormType, any, undefined>;
  onToggleMember: (id: string) => void;
}

const TeamStep = memo(({ form, values, onToggleMember }: IProps) => {
  const teamMembers = TEAM_MEMBERS;

  return (
    <FormField
      control={form.control}
      name="teamMembers"
      render={() => (
        <FormItem>
          <FormLabel>Team Members</FormLabel>
          <FormControl>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {values.map((memberId) => {
                  const member = teamMembers.find((m) => m._id === memberId);
                  if (!member) return null;

                  return (
                    <Badge
                      key={member._id}
                      variant="secondary"
                      className="gap-1"
                    >
                      <Avatar className="h-4 w-4">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      {member.name}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-3 w-3 rounded-full p-0"
                        onClick={() => onToggleMember(member._id)}
                      >
                        <span className="sr-only">Remove {member.name}</span>
                        <span>×</span>
                      </Button>
                    </Badge>
                  );
                })}
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    Select Team Members
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search team members..." />
                    <CommandList>
                      <CommandEmpty>No members found.</CommandEmpty>
                      <CommandGroup>
                        {teamMembers.map((member) => (
                          <CommandItem
                            key={member._id}
                            onSelect={() => onToggleMember(member._id)}
                            className="flex items-center gap-2"
                          >
                            <Checkbox
                              checked={values.includes(member._id)}
                              className="mr-1"
                            />
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={member.avatar}
                                alt={member.name}
                              />
                              <AvatarFallback>{member.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span>{member.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {member.role}
                              </span>
                            </div>
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
            Select the team members who will work on this project.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
});

export default TeamStep;

