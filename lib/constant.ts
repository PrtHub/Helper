import {
  BriefcaseBusiness,
  CircleHelp,
  Home,
  Laptop,
  Moon,
  Star,
  Sun,
  Tag,
  User2,
  Users,
} from "lucide-react";

export const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Laptop },
];

export const sidebarLinks = [
  {
    imgURL: Home,
    route: "/",
    label: "Home",
  },
  {
    imgURL: Users,
    route: "/community",
    label: "Community",
  },
  {
    imgURL: Star,
    route: "/collection",
    label: "Collections",
  },
  {
    imgURL: BriefcaseBusiness,
    route: "/jobs",
    label: "Find Jobs",
  },
  {
    imgURL: Tag,
    route: "/tags",
    label: "Tags",
  },
  {
    imgURL: User2,
    route: "/profile",
    label: "Profile",
  },
  {
    imgURL: CircleHelp,
    route: "/ask-question",
    label: "Ask a question",
  },
];

export const topQuestions = [
  { _id: 1, title: 'How do I use express as a custom server in NextJS?' },
  { _id: 2, title: 'Cascading Deletes in SQLAlchemy?' },
  { _id: 3, title: 'How to Perfectly Center a Div with Tailwind CSS?' },
  { _id: 4, title: 'Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?' },
  { _id: 5, title: 'Redux Toolkit Not Updating State as Expected' },
];

export const popularTags = [
  { _id: 1, name: 'javascript', totalQuestions: 5 },
  { _id: 2, name: 'react', totalQuestions: 5 },
  { _id: 3, name: 'next', totalQuestions: 5 },
  { _id: 4, name: 'vue', totalQuestions: 2 },
  { _id: 5, name: 'redux', totalQuestions: 10 },
]

export const HomePageFilters = [
  { name: "Newest", value: "newest" },
  { name: "Recommended", value: "recommended" },
  { name: "Frequent", value: "frequent" },
  { name: "Unanswered", value: "unanswered" },
]