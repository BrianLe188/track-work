import { Mails } from "@/lib/type/communicate";
import { faker } from "@faker-js/faker";

export const MOCK_MAILS: Mails = Array.from(Array(10).keys()).map(() => ({
  _id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  subject: faker.person.jobTitle(),
  date: faker.date.past().toString(),
  teaser:
    "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
}));
