import { memo } from "react";
import { UseFormReturn } from "react-hook-form";
import { CreateProjFormType } from "../validates";
import { format } from "date-fns";
import { TEAM_MEMBERS } from "../constants";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/stores/app";

interface IProps {
  form: UseFormReturn<CreateProjFormType, any, undefined>;
}

const ReviewTab = memo(({ form }: IProps) => {
  const { projectCategories, projectTags } = useAppStore();

  const getCategoryName = (categoryId: string) => {
    return (
      projectCategories.find((cat) => cat._id === categoryId)?.name ||
      categoryId
    );
  };

  const getTagNames = (tagIds: string[]) => {
    return tagIds.map(
      (id) => projectTags.find((tag) => tag._id === id)?.name || id,
    );
  };

  const getTeamMemberNames = (memberIds: string[]) => {
    return memberIds.map(
      (id) => TEAM_MEMBERS.find((member) => member._id === id)?.name || id,
    );
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4">
        <h3 className="text-lg font-medium">Project Details</h3>
        <dl className="mt-4 space-y-4">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
            <dt className="text-sm font-medium text-muted-foreground">Name</dt>
            <dd className="text-sm">{form.getValues("name")}</dd>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
            <dt className="text-sm font-medium text-muted-foreground">
              Description
            </dt>
            <dd className="text-sm">{form.getValues("description")}</dd>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
            <dt className="text-sm font-medium text-muted-foreground">
              Category
            </dt>
            <dd className="text-sm">
              {getCategoryName(form.getValues("category"))}
            </dd>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
            <dt className="text-sm font-medium text-muted-foreground">
              Priority
            </dt>
            <dd className="text-sm capitalize">{form.getValues("priority")}</dd>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
            <dt className="text-sm font-medium text-muted-foreground">
              Timeline
            </dt>
            <dd className="text-sm">
              {form.getValues("startDate")
                ? format(form.getValues("startDate"), "PPP")
                : "Not set"}
              {form.getValues("endDate")
                ? ` to ${format(form.getValues("endDate")!, "PPP")}`
                : " (Ongoing)"}
            </dd>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
            <dt className="text-sm font-medium text-muted-foreground">
              Team Members
            </dt>
            <dd className="text-sm">
              <div className="flex flex-wrap gap-1">
                {getTeamMemberNames(form.getValues("teamMembers")).map(
                  (name, index) => (
                    <Badge key={index} variant="secondary">
                      {name}
                    </Badge>
                  ),
                )}
              </div>
            </dd>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
            <dt className="text-sm font-medium text-muted-foreground">Tags</dt>
            <dd className="text-sm">
              <div className="flex flex-wrap gap-1">
                {form.getValues("tags")?.length ? (
                  getTagNames(form.getValues("tags") || []).map(
                    (name, index) => (
                      <Badge key={index} variant="outline">
                        {name}
                      </Badge>
                    ),
                  )
                ) : (
                  <span className="text-muted-foreground">No tags</span>
                )}
              </div>
            </dd>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
            <dt className="text-sm font-medium text-muted-foreground">
              Visibility
            </dt>
            <dd className="text-sm">
              {form.getValues("isPublic") ? "Public" : "Private"}
            </dd>
          </div>
          {form.getValues("repositoryUrl") && (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
              <dt className="text-sm font-medium text-muted-foreground">
                Repository
              </dt>
              <dd className="text-sm break-all">
                {form.getValues("repositoryUrl")}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
});

export default ReviewTab;
