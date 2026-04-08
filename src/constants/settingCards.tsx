import { SettingCard } from "@/types";

export const settingCards: SettingCard[] = [
  {
    id: "export",
    iconName: "database-export-outline",
    title: "Export data",
    description: "Create a backup of all clues stored on this device",
  },
  {
    id: "import",
    iconName: "database-import-outline",
    title: "Import data",
    description: "Restore clues from a backup file you exported earlier",
  },
  {
    id: "clear",
    variant: "destructive",
    iconName: "database-remove-outline",
    title: "Clear data",
    description: "Permanently remove all clues from this device",
  },
];
