import {
  IConversation,
  IMessage,
  IUserConversation,
  Mails,
} from "@/lib/type/communicate";
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

export const MOCK_MESSAGES: IMessage[] = Array.from(Array(10).keys()).map(
  () => ({
    _id: faker.string.uuid(),
    senderId: "1",
    content: faker.lorem.sentences(),
    createdAt: faker.date.anytime().toString(),
    updatedAt: faker.date.anytime().toString(),
    read: false,
    attachments: [
      {
        type: faker.helpers.arrayElement(["file", "image"]),
        url: "#",
        name: "brand_guidelines_v2.pdf",
      },
    ],
  }),
);

export const MOCK_USER_CONVERSATION: IUserConversation[] = [
  {
    _id: "1",
    name: "Sarah Kim",
    email: faker.internet.email(),
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
  },
  {
    _id: "2",
    name: "Miguel Garcia",
    email: faker.internet.email(),
    avatar: "/placeholder.svg?height=40&width=40",
    status: "away",
    lastSeen: "5m ago",
  },
  {
    _id: "3",
    name: "Lisa Chen",
    email: faker.internet.email(),
    avatar: "/placeholder.svg?height=40&width=40",
    status: "busy",
  },
  {
    _id: "4",
    name: "David Johnson",
    email: faker.internet.email(),
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    lastSeen: "2h ago",
  },
  {
    _id: "5",
    name: "Emma Wilson",
    email: faker.internet.email(),
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
  },
];

export const MOCK_CONVERSATION: IConversation = {
  _id: faker.string.uuid(),
  type: "direct",
  participants: MOCK_USER_CONVERSATION,
  lastMessage: {
    _id: faker.string.uuid(),
    senderId: faker.number.int({ min: 1, max: 5 }).toString(),
    content: faker.lorem.sentences(),
    createdAt: faker.date.anytime().toString(),
    updatedAt: faker.date.anytime().toString(),
    read: false,
  },
  unreadCount: faker.number.int(),
  isActive: true,
};
