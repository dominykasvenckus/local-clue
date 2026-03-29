import { IconName } from "@/types";

type OnboardingCard = {
  iconName: IconName;
  title: string;
  description: string;
};

export const onboardingCards: OnboardingCard[] = [
  {
    iconName: "lightbulb-on-outline",
    title: "Store clues, not passwords",
    description:
      "Save only memory clues, never the actual password. Your secrets stay in your head, where they belong.",
  },
  {
    iconName: "cellphone-lock",
    title: "Local-only storage",
    description:
      "Everything is stored on this device and never leaves it. No sync, no servers, no cloud transfer.",
  },
  {
    iconName: "magnify",
    title: "Find clues quickly",
    description:
      "Use search and category filters to find the right clue in seconds, even with many saved clues.",
  },
];
