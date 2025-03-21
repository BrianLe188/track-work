import { memo, useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Pause, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTrackingStore } from "../store";
import { toast } from "sonner";
import { ITimeEntry } from "../type";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { formatTime } from "@/lib/utils";
import SelectTask from "./select-task";
import { useShallow } from "zustand/react/shallow";

const Timer = memo(() => {
  const {
    isTracking,
    todayTotal,
    elapsedTime,
    notes,
    tasks,
    currentEntry,
    timeEntries,
    onSetIsTracking,
    onSetTodayTotal,
    onSetNotes,
    onSetElapsedTime,
    onIncreaseElapsedTime,
    onSetCurrentEntry,
    onAddTimeEntries,
  } = useTrackingStore(useShallow((state) => state));
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isTracking) {
      interval = setInterval(() => {
        onIncreaseElapsedTime();
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTracking]);

  useEffect(() => {
    const today = new Date().setHours(0, 0, 0, 0);

    const total = timeEntries.reduce((acc, entry) => {
      const entryDate = new Date(entry.startTime).setHours(0, 0, 0, 0);
      if (entryDate === today) {
        return acc + entry.duration;
      }
      return acc;
    }, 0);

    if (isTracking) {
      onSetTodayTotal(total + elapsedTime);
    } else {
      onSetTodayTotal(total);
    }
  }, [timeEntries, elapsedTime, isTracking]);

  const handleStartTracking = () => {
    if (selectedTaskIds.length === 0) {
      toast.warning(
        "No task selected: Please select a task before starting the timer",
      );
      return;
    }

    const selectedTaskTitles = tasks
      .filter((task) => selectedTaskIds.includes(task._id))
      .map((task) => task.title);
    if (selectedTaskTitles.length === 0) return;

    const newEntry: ITimeEntry = {
      id: `entry-${Date.now()}`,
      taskIds: [...selectedTaskIds],
      taskTitles: selectedTaskTitles,
      startTime: new Date(),
      duration: 0,
    };

    onSetCurrentEntry(newEntry);
    onSetIsTracking(true);
    onSetElapsedTime(0);

    toast(
      `Time tracking started: Started tracking ${selectedTaskIds.length} task(s) at ${format(new Date(), "h:mm a")}`,
    );
  };

  const handleStopTracking = () => {
    if (!currentEntry) return;

    const endTime = new Date();
    const duration = elapsedTime;

    const completedEntry: ITimeEntry = {
      ...currentEntry,
      endTime,
      duration,
      notes: notes.trim() || undefined,
    };

    onAddTimeEntries(completedEntry);
    onSetCurrentEntry(null);
    onSetIsTracking(false);
    onSetNotes("");

    toast.success(
      `Time tracking stopped: You tracked ${formatTime(duration)} on ${currentEntry.taskIds.length} task(s)"`,
    );
  };

  const handleToggleTask = useCallback((taskId: string) => {
    setSelectedTaskIds((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId],
    );
  }, []);

  const handleRemoveTask = (taskId: string) => {
    setSelectedTaskIds((prev) => prev.filter((id) => id !== taskId));
  };

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Work Timer</CardTitle>
        <CardDescription>
          Track your work time with a simple click
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SelectTask
          selectedTaskIds={selectedTaskIds}
          onToggleTask={handleToggleTask}
        />
        {selectedTaskIds.length > 0 && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-2">
              {selectedTaskIds.map((taskId) => {
                const task = tasks.find((t) => t._id === taskId);
                if (!task) return null;

                return (
                  <Badge
                    key={task._id}
                    variant="secondary"
                    className="flex items-center gap-1 py-1.5 pl-2 pr-1"
                  >
                    <span>{task.title}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 rounded-full p-0 ml-1"
                      onClick={() => handleRemoveTask(task._id)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {task.title}</span>
                    </Button>
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
        <div className="flex flex-col items-center justify-center rounded-lg border bg-muted/50 p-8">
          <div className="text-5xl font-bold tabular-nums">
            {formatTime(elapsedTime)}
          </div>

          <div className="mt-4 flex items-center gap-2">
            {isTracking ? (
              <Button
                size="lg"
                variant="destructive"
                className="gap-2"
                onClick={handleStopTracking}
              >
                <Pause className="h-5 w-5" />
                Stop
              </Button>
            ) : (
              <Button
                size="lg"
                className="gap-2"
                onClick={handleStartTracking}
                disabled={selectedTaskIds.length === 0}
              >
                <Play className="h-5 w-5" />
                Start
              </Button>
            )}
          </div>

          <div className="mt-6 w-full">
            <div className="flex items-center justify-between text-sm">
              <span>Today's total</span>
              <span className="font-medium">{formatTime(todayTotal)}</span>
            </div>
            <Progress
              value={Math.min((todayTotal / (8 * 3600)) * 100, 100)}
              className="h-2 mt-2"
            />
            <div className="mt-1 text-xs text-muted-foreground text-right">
              {Math.floor(todayTotal / 3600)} hours{" "}
              {Math.floor((todayTotal % 3600) / 60)} minutes of 8 hours
            </div>
          </div>
        </div>

        {isTracking && (
          <div className="mt-4">
            <Textarea
              placeholder="What are you working on? (optional)"
              className="min-h-[80px]"
              value={notes}
              onChange={(e) => onSetNotes(e.target.value)}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
});

export default Timer;
