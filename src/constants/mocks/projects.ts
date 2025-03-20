import {
  IProjectTarget,
  ProjectCategories,
  ProjectPriorities,
  ProjectStatuses,
  ProjectTags,
} from "@/lib/type/project";
import { faker } from "@faker-js/faker";

export const MOCK_PROJECTS: IProjectTarget[] = Array.from(Array(5).keys()).map(() => ({
  _id: faker.string.uuid(),
  name: faker.person.jobTitle(),
  description: faker.person.bio(),
  thumbnail:
    "https://vzonedev.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10407?size=medium",
  progress: 68,
  updatedAt: faker.date.anytime().toString(), // "2 hours ago",
  createdAt: faker.date.anytime().toString(),
  activeMembers: 5,
  completedTasks: 24,
  totalTasks: 36,
  starred: true,
}));

export const MOCK_PROJECT_CATEGORIES: ProjectCategories = [
  { _id: "web", key: "web", name: "Web Development" },
  { _id: "mobile", key: "mobile", name: "Mobile App" },
  { _id: "design", key: "design", name: "Design" },
  { _id: "marketing", key: "marketing", name: "Marketing" },
  { _id: "internal", key: "internal", name: "Internal Tool" },
  { _id: "research", key: "research", name: "Research" },
];

export const MOCK_PROJECT_PRIORITIES: ProjectPriorities = [
  { _id: "all", name: "All Priorities" },
  { _id: "low", name: "Low" },
  { _id: "medium", name: "Medium" },
  { _id: "high", name: "High" },
  { _id: "urgent", name: "Urgent" },
];

export const MOCK_PROJECT_STATUSES: ProjectStatuses = [
  { _id: "all", name: "All Statuses" },
  { _id: "active", name: "Active" },
  { _id: "completed", name: "Completed" },
  { _id: "on-hold", name: "On Hold" },
  { _id: "archived", name: "Archived" },
];

export const MOCK_PROJECT_TAGS: ProjectTags = [
  { _id: "frontend", name: "Frontend" },
  { _id: "backend", name: "Backend" },
  { _id: "ui", name: "UI/UX" },
  { _id: "api", name: "API" },
  { _id: "database", name: "Database" },
  { _id: "devops", name: "DevOps" },
  { _id: "content", name: "Content" },
  { _id: "seo", name: "SEO" },
  { _id: "analytics", name: "Analytics" },
];
