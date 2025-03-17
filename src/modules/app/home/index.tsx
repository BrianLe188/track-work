import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Star, MoreHorizontal, Users, CheckCircle } from "lucide-react";
import OverviewSection from "./overview-section";
import { useProjectStore } from "@/stores/projects";

export default function Home() {
  const { targetProject: project } = useProjectStore();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">
              {project?.name}
            </h1>
            <Button size="icon" variant="ghost">
              <Star
                className={`h-4 w-4 ${project?.starred ? "fill-yellow-400 text-yellow-400" : ""}`}
              />
              <span className="sr-only">
                {project?.starred ? "Unstar" : "Star"} project
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="px-2">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit details</DropdownMenuItem>
                <DropdownMenuItem>Invite members</DropdownMenuItem>
                <DropdownMenuItem>Notifications</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Archive project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="text-muted-foreground">{project?.description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Card className="w-full md:w-auto">
            <CardContent className="p-3 flex items-center gap-3">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-xl font-bold">
                  {project?.activeMembers}
                </div>
                <div className="text-xs text-muted-foreground">
                  Active Members
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full md:w-auto">
            <CardContent className="p-3 flex items-center gap-3">
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-xl font-bold">
                  {project?.completedTasks}/{project?.totalTasks}
                </div>
                <div className="text-xs text-muted-foreground">
                  Tasks Completed
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Progress</CardTitle>
            <CardDescription>Last updated {project?.updatedAt}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">
                  {project?.progress}% complete
                </span>
                <span className="text-sm text-muted-foreground">
                  {project?.completedTasks}/{project?.totalTasks} tasks
                </span>
              </div>
              <Progress value={project?.progress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
      <OverviewSection />
    </div>
  );
}
