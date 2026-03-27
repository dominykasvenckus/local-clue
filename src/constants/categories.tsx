import type { Category } from "@/types/category";

export const CATEGORIES: Category[] = [
  { id: "all", title: "All", iconName: "view-grid-outline" },
  { id: "general", title: "General", iconName: "shape-outline" },
  { id: "social", title: "Social", iconName: "account-group-outline" },
  { id: "finance", title: "Finance", iconName: "wallet-outline" },
  {
    id: "entertainment",
    title: "Entertainment",
    iconName: "play-circle-outline",
  },
  { id: "shopping", title: "Shopping", iconName: "cart-outline" },
  { id: "work", title: "Work", iconName: "briefcase-outline" },
];
