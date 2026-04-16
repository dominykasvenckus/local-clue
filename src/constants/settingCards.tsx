import { SettingCard } from "@/types";

export const settingCards: SettingCard[] = [
  {
    id: "export",
    iconName: "qrcode",
    title: "Export with QR",
    description: "Generate QR codes so another device can import your clues",
  },
  {
    id: "import",
    iconName: "qrcode-scan",
    title: "Import from QR",
    description: "Scan QR codes from another device to import clues",
  },
  {
    id: "clear",
    variant: "destructive",
    iconName: "delete-sweep-outline",
    title: "Clear clues",
    description: "Permanently remove all clues from this device",
  },
];
