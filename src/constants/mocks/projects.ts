import { Projects } from "@/lib/type/project";
import { faker } from "@faker-js/faker";

export const MOCK_PROJECTS: Projects = Array.from(Array(5).keys()).map(() => ({
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
