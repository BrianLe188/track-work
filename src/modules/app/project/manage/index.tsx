import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProjectTable from "./proj-table";
import { useNavigate } from "react-router";
import ROUTE_PATH from "@/constants/routes";

export default function ManageProject() {
  const navigate = useNavigate();

  const handleNavigateToCreateProj = () =>
    navigate(ROUTE_PATH.ROOT.PROJECTS.CREATE_PROJECT);

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage and organize all your projects in one place.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleNavigateToCreateProj}>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>
      <ProjectTable />
    </div>
  );
}
