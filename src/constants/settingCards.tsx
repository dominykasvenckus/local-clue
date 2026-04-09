import { SettingCard } from "@/types";

export const settingCards: SettingCard[] = [
  {
    id: "export",
    iconName: "database-export-outline",
    title: "Export clues",
    description: "Create a backup of all clues stored on this device",
  },
  {
    id: "import",
    iconName: "database-import-outline",
    title: "Import clues",
    description: "Restore clues from a backup file you exported earlier",
  },
  {
    id: "clear",
    variant: "destructive",
    iconName: "database-remove-outline",
    title: "Clear clues",
    description: "Permanently remove all clues from this device",
  },
];
