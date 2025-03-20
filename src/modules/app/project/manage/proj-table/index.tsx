import { useCallback, useState } from "react";
import FilterBar from "./filter-bar";
import { IFilter } from "../type";
import Records from "./records";
import { useManageProjectStore } from "../store";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import CustomPagination from "@/components/custom-pagination";

export default function ProjectTable() {
  const {
    selectedProjects,
    visibleColumns,
    projects,
    onSelectVisibleColumns,
    onSelectAllProjects,
    onResetSelectedProjects,
  } = useManageProjectStore();
  const [filter, setFilter] = useState<IFilter>({
    search: "",
    category: "",
    status: "",
    priority: "",
  });

  const handleChangeFilter = useCallback(
    (key: keyof IFilter, value: string) => {
      setFilter((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [],
  );

  const handleToggleVisibleColumns = useCallback((col: string) => {
    onSelectVisibleColumns(col);
  }, []);

  const handleSelectAllProjects = useCallback(() => {
    if (selectedProjects.length === projects.length) {
      onResetSelectedProjects();
    } else {
      onSelectAllProjects();
    }
  }, [selectedProjects]);

  return (
    <div className="flex flex-col gap-4">
      <FilterBar
        filter={filter}
        onChangeFilter={handleChangeFilter}
        visibleColumns={visibleColumns}
        onToggleVisibleColumns={handleToggleVisibleColumns}
      />
      {selectedProjects.length > 0 && (
        <div className="flex items-center gap-2 rounded-md border bg-muted p-2">
          <Checkbox
            checked={selectedProjects.length === projects.length}
            onCheckedChange={handleSelectAllProjects}
          />
          <span className="text-sm font-medium">
            {selectedProjects.length} project
            {selectedProjects.length !== 1 ? "s" : ""} selected
          </span>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm">
              Archive
            </Button>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </div>
        </div>
      )}
      <div>
        <Records />
        <CustomPagination className="mt-5" />
      </div>
    </div>
  );
}
