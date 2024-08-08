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
