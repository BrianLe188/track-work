import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Calendar, MoreHorizontal, Star } from "lucide-react";
import { memo } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { useManageProjectStore } from "../store";
import { Badge } from "@/components/ui/badge";

interface IProps {}

const Records = memo(({}: IProps) => {
  const {
    projects,
    visibleColumns,
    selectedProjects,
    onSelectedProjects,
    onSelectAllProjects,
    onResetSelectedProjects,
  } = useManageProjectStore();

  const handleToggleSelectAll = () => {
    if (selectedProjects.length === projects.length) {
      onResetSelectedProjects();
    } else {
      onSelectAllProjects();
    }
  };

  const handleToggleProjectSelection = (projectId: string) => {
    onSelectedProjects(projectId);
  };

  const handleToggleStar = (_projectId: string) => {};

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "completed":
        return "bg-blue-500";
      case "on-hold":
        return "bg-amber-500";
      case "archived":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
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

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedProjects.length === projects.length}
                onCheckedChange={handleToggleSelectAll}
              />
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                className="-ml-3 h-8 hover:bg-transparent"
                // onClick={() => requestSort("name")}
              >
                <span>Project</span>
                {/* {sortConfig.key === "name" && ( */}
                {/*   <ArrowUpDown className="ml-1 h-4 w-4" /> */}
                {/* )} */}
              </Button>
            </TableHead>
            {visibleColumns.includes("status") && <TableHead>Status</TableHead>}
            {visibleColumns.includes("priority") && (
              <TableHead>Priority</TableHead>
            )}
            {visibleColumns.includes("progress") && (
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-3 h-8 hover:bg-transparent"
                  // onClick={() => requestSort("progress")}
                >
                  <span>Progress</span>
                  {/* {sortConfig.key === "progress" && ( */}
                  {/*   <ArrowUpDown className="ml-1 h-4 w-4" /> */}
                  {/* )} */}
                </Button>
              </TableHead>
            )}
            {visibleColumns.includes("team") && <TableHead>Team</TableHead>}
            {visibleColumns.includes("dueDate") && (
              <TableHead>Due Date</TableHead>
            )}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project._id}>
              <TableCell>
                <Checkbox
                  checked={selectedProjects.includes(project._id)}
                  onCheckedChange={() =>
                    handleToggleProjectSelection(project._id)
                  }
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleToggleStar(project._id)}
                  >
                    <Star
                      className={cn(
                        "h-4 w-4",
                        project.starred
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground",
                      )}
                    />
                    <span className="sr-only">
                      {project.starred ? "Unstar" : "Star"} project
                    </span>
                  </Button>
                  <div>
                    <div className="font-medium">
                      <Link
                        to={`/projects/${project._id}`}
                        className="block hover:underline text-wrap"
                      >
                        {project.name}
                      </Link>
                    </div>
                    <p className="text-wrap text-xs text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>
              </TableCell>
              {visibleColumns.includes("status") && (
                <TableCell>
                  <div className="flex items-center gap-1">
                    <div
                      className={`h-2 w-2 rounded-full ${getStatusColor(project.status)}`}
                    />
                    <span className="capitalize">{project.status}</span>
                  </div>
                </TableCell>
              )}
              {visibleColumns.includes("priority") && (
                <TableCell>{getPriorityBadge(project.priority)}</TableCell>
              )}
              {visibleColumns.includes("progress") && (
                <TableCell>
                  <div className="w-32">
                    <div className="flex justify-between text-xs">
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-1.5 mt-1" />
                  </div>
                </TableCell>
              )}
              {visibleColumns.includes("team") && (
                <TableCell>
                  <div className="flex -space-x-2">
                    {project.teamMembers.slice(0, 3).map((member: any) => (
                      <Avatar
                        key={member.id}
                        className="h-6 w-6 border-2 border-background"
                      >
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                    {project.teamMembers.length > 3 && (
                      <Avatar className="h-6 w-6 border-2 border-background">
                        <AvatarFallback>
                          +{project.teamMembers.length - 3}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </TableCell>
              )}
              {visibleColumns.includes("dueDate") && (
                <TableCell>
                  {project.dueDate ? (
                    <span className="flex items-center text-xs">
                      <Calendar className="mr-1 h-3 w-3" />
                      {project.dueDate}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </TableCell>
              )}
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to={`/projects/${project._id}`}>View details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Edit project</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        // setProjects((prev) =>
                        //   prev.map((p) =>
                        //     p.id === project.id
                        //       ? {
                        //           ...p,
                        //           status:
                        //             p.status === "archived"
                        //               ? "active"
                        //               : "archived",
                        //         }
                        //       : p,
                        //   ),
                        // );
                      }}
                    >
                      {project.status === "archived" ? "Unarchive" : "Archive"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => {
                        // setProjects((prev) =>
                        //   prev.filter((p) => p.id !== project._id),
                        // );
                        toast.success("Project deleted");
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
});

export default Records;
