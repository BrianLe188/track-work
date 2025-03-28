import {
  BookOpen,
  Bot,
  MessageCircleReply,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import { MOCK_PROJECTS } from "./projects";
import { ISidebar } from "@/lib/type/sidebar";

const MOCK_SIDEBAR_DATA: ISidebar = {
  navMain: [
    {
      title: "Work Management",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "My Tasks",
          url: "#",
        },
        {
          title: "Work Schedule",
          url: "#",
        },
        {
          title: "Work Reports",
          url: "#",
        },
      ],
    },
    {
      title: "Time Tracking",
      url: "/tracking",
      icon: Bot,
      items: [
        {
          title: "Check-in/Check-out",
          url: "/tracking",
        },
        {
          title: "Work History",
          url: "#",
        },
      ],
    },
    {
      title: "Communication",
      url: "/communication",
      icon: MessageCircleReply,
      items: [
        {
          title: "Team Chat",
          url: "/communication",
        },
        {
          title: "Notifications",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "/",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "/",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: MOCK_PROJECTS,
};

export default MOCK_SIDEBAR_DATA;
