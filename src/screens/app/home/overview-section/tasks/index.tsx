import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreHorizontal } from "lucide-react";
import { useHomeStore } from "../../store";
import CustomPagination from "@/components/custom-pagination";

export default function Tasks() {
  const { tasks } = useHomeStore();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Tasks</CardTitle>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center gap-4">
                {task.status === "completed" ? (
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                ) : task.status === "in-progress" ? (
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                ) : (
                  <div className="h-2 w-2 rounded-full bg-slate-300" />
                )}
                <div>
                  <p className="text-sm font-medium">{task.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Due {task.dueDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="px-2">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Mark as completed</DropdownMenuItem>
                    <DropdownMenuItem>Assign to</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      Delete task
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
        <CustomPagination className="mt-5" />
      </CardContent>
    </Card>
  );
}
