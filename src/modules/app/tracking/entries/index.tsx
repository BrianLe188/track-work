import { memo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock } from "lucide-react";
import { format } from "date-fns";
import { useTrackingStore } from "../store";
import { formatTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useShallow } from "zustand/react/shallow";

const Entries = memo(() => {
  const {
    isTracking,
    timeEntries,
    currentEntry,
    elapsedTime,
    notes,
    todayTotal,
  } = useTrackingStore(useShallow((state) => state));

  return (
    <Card className="md:row-span-2 pb-0">
      <CardHeader>
        <CardTitle>Today's Activity</CardTitle>
        <CardDescription>
          {format(new Date(), "EEEE, MMMM d, yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {timeEntries.length === 0 && !isTracking ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Clock className="h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium">No time entries yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Start the timer to begin tracking your work time
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Current session */}
              {isTracking && (
                <div className="relative border-l-2 border-green-500 pl-4 pb-6">
                  <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-green-500" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="font-medium">Current session</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatTime(elapsedTime)}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Started at{" "}
                    {format(currentEntry?.startTime || new Date(), "h:mm a")}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {currentEntry?.taskTitles.map((title, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {title}
                      </Badge>
                    ))}
                  </div>
                  {notes && <div className="mt-2 text-sm">{notes}</div>}
                </div>
              )}

              {/* Past entries */}
              {timeEntries
                .filter((entry) => {
                  const entryDate = new Date(entry.startTime).setHours(
                    0,
                    0,
                    0,
                    0,
                  );
                  const today = new Date().setHours(0, 0, 0, 0);
                  return entryDate === today;
                })
                .map((entry) => (
                  <div
                    key={entry.id}
                    className="relative border-l-2 border-gray-200 pl-4 pb-6"
                  >
                    <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-gray-300" />
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Work session</span>
                      <span className="text-sm text-muted-foreground">
                        {formatTime(entry.duration)}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {format(entry.startTime, "h:mm a")} -{" "}
                      {format(entry.endTime || new Date(), "h:mm a")}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {entry.taskTitles.map((title, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {title}
                        </Badge>
                      ))}
                    </div>
                    {entry.notes && (
                      <div className="mt-2 text-sm">{entry.notes}</div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 px-6 py-4">
        <div className="flex w-full items-center justify-between">
          <span className="font-medium">Total</span>
          <span className="font-bold">{formatTime(todayTotal)}</span>
        </div>
      </CardFooter>
    </Card>
  );
});

export default Entries;
