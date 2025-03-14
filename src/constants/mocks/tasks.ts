import { Tasks } from "@/lib/type/task";
import { faker } from "@faker-js/faker";

export const MOCK_TASKS: Tasks = Array.from(Array(10).keys()).map(() => ({
  _id: faker.string.uuid(),
  title: faker.lorem.words(),
  status: faker.string.fromCharacters(["completed", "in-progress", "todo"]),
  dueDate: faker.date.past().toString(),
}));
