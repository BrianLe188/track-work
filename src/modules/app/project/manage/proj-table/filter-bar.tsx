import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { List, Search, SlidersHorizontal } from "lucide-react";
import { ChangeEvent, memo, useCallback } from "react";
import { IFilter } from "../type";
import { useAppStore } from "@/stores/app";
import debounce from "debounce";
import { useShallow } from "zustand/react/shallow";

interface IProps {
  filter: IFilter;
  visibleColumns: string[];
  onChangeFilter: (key: keyof IFilter, value: string) => void;
  onToggleVisibleColumns: (col: string) => void;
}

const FilterBar = memo(
  ({
    filter,
    visibleColumns,
    onChangeFilter,
    onToggleVisibleColumns,
  }: IProps) => {
    const { projectCategories, projectPriorities, projectStatuses } =
      useAppStore(useShallow((state) => state));

    const handleDebounceChangeSearch = useCallback(
      debounce(
        (e: ChangeEvent<HTMLInputElement>) =>
          onChangeFilter("search", e.target.value),
        500,
      ),
      [],
    );

    return (
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1 md:max-w-sm">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="pl-8"
              defaultValue={filter.search}
              onChange={handleDebounceChangeSearch}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={filter.category}
            onValueChange={(v) => onChangeFilter("category", v)}
          >
            <SelectTrigger className="h-9 w-[180px] md:w-[140px] lg:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {projectCategories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filter.status}
            onValueChange={(v) => onChangeFilter("status", v)}
          >
            <SelectTrigger className="h-9 w-[180px] md:w-[140px] lg:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {projectStatuses.map((status) => (
                <SelectItem key={status._id} value={status._id}>
                  {status.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filter.priority}
            onValueChange={(v) => onChangeFilter("priority", v)}
          >
            <SelectTrigger className="h-9 w-[180px] md:w-[140px] lg:w-[180px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              {projectPriorities.map((priority) => (
                <SelectItem key={priority._id} value={priority._id}>
                  {priority.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="sr-only md:not-sr-only md:inline">Sort</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem onClick={() => requestSort("name")}> */}
              {/*   Name{" "} */}
              {/*   {sortConfig.key === "name" && */}
              {/*     (sortConfig.direction === "ascending" ? "↑" : "↓")} */}
              {/* </DropdownMenuItem> */}
              {/* <DropdownMenuItem onClick={() => requestSort("progress")}> */}
              {/*   Progress{" "} */}
              {/*   {sortConfig.key === "progress" && */}
              {/*     (sortConfig.direction === "ascending" ? "↑" : "↓")} */}
              {/* </DropdownMenuItem> */}
              {/* <DropdownMenuItem onClick={() => requestSort("priority")}> */}
              {/*   Priority{" "} */}
              {/*   {sortConfig.key === "priority" && */}
              {/*     (sortConfig.direction === "ascending" ? "↑" : "↓")} */}
              {/* </DropdownMenuItem> */}
              {/* <DropdownMenuItem onClick={() => requestSort("lastUpdated")}> */}
              {/*   Last Updated{" "} */}
              {/*   {sortConfig.key === "lastUpdated" && */}
              {/*     (sortConfig.direction === "ascending" ? "↑" : "↓")} */}
              {/* </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <List className="h-4 w-4" />
                <span className="sr-only md:not-sr-only md:inline">
                  Columns
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={visibleColumns.includes("status")}
                onCheckedChange={() => onToggleVisibleColumns("status")}
              >
                Status
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.includes("priority")}
                onCheckedChange={() => onToggleVisibleColumns("priority")}
              >
                Priority
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.includes("progress")}
                onCheckedChange={() => onToggleVisibleColumns("progress")}
              >
                Progress
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.includes("team")}
                onCheckedChange={() => onToggleVisibleColumns("team")}
              >
                Team
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.includes("lastUpdated")}
                onCheckedChange={() => onToggleVisibleColumns("lastUpdated")}
              >
                Last Updated
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.includes("dueDate")}
                onCheckedChange={() => onToggleVisibleColumns("dueDate")}
              >
                Due Date
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  },
);

export default FilterBar;
