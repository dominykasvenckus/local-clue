import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

export type Category = {
  id: string;
  title: string;
  iconName: ComponentProps<typeof MaterialCommunityIcons>["name"];
};
