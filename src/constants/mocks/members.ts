import { Members } from "@/lib/type/member";
import { faker } from "@faker-js/faker";

export const MOCK_MEMBERS: Members = Array.from(Array(10).keys()).map(() => ({
  _id: faker.string.uuid(),
  name: faker.person.fullName(),
  role: faker.person.jobTitle(),
  avatar: "",
}));
