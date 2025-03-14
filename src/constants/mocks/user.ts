import { faker } from "@faker-js/faker";

export const MOCK_USER = {
  _id: faker.string.uuid(),
  email: faker.internet.email(),
  avatar: "",
  name: faker.person.fullName(),
};
