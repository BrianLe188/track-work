import { memo, useMemo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { useTrackingStore } from "../store";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ITask } from "@/lib/type/task";
import { useShallow } from "zustand/react/shallow";

interface IProps {
  selectedTaskIds: string[];
  onToggleTask: (id: string) => void;
}

const SelectTask = memo(({ selectedTaskIds, onToggleTask }: IProps) => {
  const { isTracking, tasks } = useTrackingStore(useShallow((state) => state));

  const [isTaskPopoverOpen, setIsTaskPopoverOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery, tasks],
  );

  const handleToggleTaskPopover = () => {
    setIsTaskPopoverOpen((prev) => !prev);
  };

  const getTaskPriorityBadge = (priority: ITask["priority"]) => {
    switch (priority) {
      case "low":
        return (
          <Badge
            variant="outline"
            className="bg-slate-50 text-slate-700 border-slate-200"
          >
            Low
          </Badge>
        );
      case "medium":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Medium
          </Badge>
        );
      case "high":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200"
          >
            High
          </Badge>
        );
      case "urgent":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            Urgent
          </Badge>
        );
      default:
        return null;
    }
  };

  const getTaskStatusBadge = (status: ITask["status"]) => {
    switch (status) {
      case "todo":
        return (
          <Badge
            variant="outline"
            className="bg-slate-100 text-slate-700 border-slate-200"
          >
            To Do
          </Badge>
        );
      case "in-progress":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Completed
          </Badge>
        );
      case "blocked":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            Blocked
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    !isTracking && (
      <div className="mb-4">
        <div className="text-sm font-medium mb-2">Select tasks to track</div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Popover
              open={isTaskPopoverOpen}
              onOpenChange={handleToggleTaskPopover}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between"
                >
                  {selectedTaskIds.length > 0
                    ? `${selectedTaskIds.length} task${selectedTaskIds.length > 1 ? "s" : ""} selected`
                    : "Select tasks..."}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                  />
                  <CommandList>
                    <CommandEmpty>No tasks found.</CommandEmpty>
                    <CommandGroup>
                      {filteredTasks.map((task) => (
                        <CommandItem
                          key={task._id}
                          value={task._id}
                          onSelect={() => {
                            onToggleTask(task._id);
                          }}
                          className="flex items-start py-3"
                        >
                          <div className="flex items-start space-x-3 w-full">
                            <Checkbox
                              checked={selectedTaskIds.includes(task._id)}
                              onCheckedChange={() => onToggleTask(task._id)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex w-full items-center justify-between">
                                <span className="font-medium">
                                  {task.title}
                                </span>
                                <div className="flex gap-1">
                                  {getTaskStatusBadge(task.status)}
                                  {getTaskPriorityBadge(task.priority)}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {task.description}
                              </p>
                            </div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                  <div className="border-t p-2 flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      {selectedTaskIds.length} task
                      {selectedTaskIds.length !== 1 ? "s" : ""} selected
                    </div>
                    <Button
                      size="sm"
                      onClick={() => setIsTaskPopoverOpen(false)}
                    >
                      Done
                    </Button>
                  </div>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    )
  );
});

export default SelectTask;
