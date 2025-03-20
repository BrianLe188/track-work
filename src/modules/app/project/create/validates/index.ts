import { ICreateProject } from "@/lib/type/project";
import { z } from "zod";

export const createProjDefaultValues: ICreateProject = {
  name: "",
  description: "",
  category: "",
  startDate: new Date(),
  endDate: undefined,
  priority: "",
  teamMembers: [],
  tags: [],
  isPublic: false,
  repositoryUrl: "",
};

export const createProjFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Project name must be at least 3 characters.",
    })
    .max(50, {
      message: "Project name must not exceed 50 characters.",
    }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(500, {
      message: "Description must not exceed 500 characters.",
    }),
  category: z.string({
    required_error: "Please select a project category.",
  }),
  startDate: z.date({
    required_error: "Start date is required.",
  }),
  endDate: z
    .date({
      required_error: "End date is required.",
    })
    .optional(),
  priority: z.string({
    required_error: "Please select a priority level.",
  }),
  teamMembers: z.array(z.string()).min(1, {
    message: "Please select at least one team member.",
  }),
  tags: z.array(z.string()).optional(),
  isPublic: z.boolean().default(false),
  repositoryUrl: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional()
    .or(z.literal("")),
});

export type CreateProjFormType = z.infer<typeof createProjFormSchema>;
