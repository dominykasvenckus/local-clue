import { IconName } from "./icon";

export type SettingCard = {
  id: string;
  variant?: "default" | "destructive";
  iconName: IconName;
  title: string;
  description: string;
};
