import {
  Calendar,
  CheckCircle,
  Info,
  Settings,
  Tag,
  Users,
} from "lucide-react";

export const CREATE_STEPS = [
  {
    key: "basic-details",
    name: "Basic Details",
    icon: Info,
    fields: ["name", "description", "category", "priority"],
    description: "Enter the basic information about your project.",
  },
  {
    key: "timeline",
    name: "Timeline",
    icon: Calendar,
    fields: ["startDate", "endDate"],
    description: "Set the timeline for your project.",
  },
  {
    key: "team",
    name: "Team Members",
    icon: Users,
    fields: ["teamMembers"],
    description: "Assign team members to your project.",
  },
  {
    key: "tags",
    name: "Tags",
    icon: Tag,
    fields: ["tags"],
    description: "Add tags to categorize your project.",
  },
  {
    key: "settings",
    name: "Settings",
    icon: Settings,
    fields: ["isPublic", "repositoryUrl"],
    description: "Configure additional project settings.",
  },
  {
    key: "review",
    name: "Review",
    icon: CheckCircle,
    fields: [],
    description: "Review your project details before creating.",
  },
];

export const PROJECT_CATEGORIES = [
  { _id: "web", name: "Web Development" },
  { _id: "mobile", name: "Mobile App" },
  { _id: "design", name: "Design" },
  { _id: "marketing", name: "Marketing" },
  { _id: "internal", name: "Internal Tool" },
  { _id: "research", name: "Research" },
];

export const TEAM_MEMBERS = [
  {
    _id: "1",
    name: "Alex Nguyen",
    role: "Lead Designer",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Design",
  },
  {
    _id: "2",
    name: "Sarah Kim",
    role: "Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Engineering",
  },
  {
    _id: "3",
    name: "Miguel Garcia",
    role: "Content Writer",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Marketing",
  },
  {
    _id: "4",
    name: "Lisa Chen",
    role: "Project Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Management",
  },
  {
    _id: "5",
    name: "David Johnson",
    role: "SEO Specialist",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Marketing",
  },
  {
    _id: "6",
    name: "Emma Wilson",
    role: "UI Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Engineering",
  },
  {
    _id: "7",
    name: "James Taylor",
    role: "Backend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Engineering",
  },
];

export const PROJECT_TAGS = [
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
