import { Activities } from "@/lib/type/activity";
import { faker } from "@faker-js/faker";

export const MOCK_ACTIVITIES: Activities = Array.from(Array(10).keys()).map(
  () => ({
    _id: faker.string.uuid(),
    user: faker.person.fullName(),
    avatar: "",
    action: faker.person.bio(),
    createdAt: faker.date.past().toString(),
    updatedAt: faker.date.past().toString(),
  }),
);
