import { colors } from "@/constants";
import { IconName } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import PressableScale from "./PressableScale";
import Typography from "./Typography";

const variantStyles = {
  default: {
    cardBackgroundColor: colors.surface,
    iconBackgroundColor: colors.surfaceHigh,
    iconColor: colors.primaryAccent,
    titleColor: colors.onSurface,
    subtitleColor: colors.onSurfaceSubtle,
    chevronColor: colors.onSurfaceMuted,
  },
  destructive: {
    cardBackgroundColor: colors.surface,
    iconBackgroundColor: colors.dangerContainer,
    iconColor: colors.danger,
    titleColor: colors.onSurface,
    subtitleColor: colors.onSurfaceSubtle,
    chevronColor: colors.onSurfaceMuted,
  },
};

type SettingCardProps = {
  variant?: "default" | "destructive";
  iconName: IconName;
  title: string;
  description: string;
  onPress: () => void;
};

export default function SettingCard({
  variant = "default",
  iconName,
  title,
  description,
  onPress,
}: SettingCardProps) {
  const {
    cardBackgroundColor,
    iconBackgroundColor,
    iconColor,
    titleColor,
    subtitleColor,
    chevronColor,
  } = variantStyles[variant];

  return (
    <PressableScale
      style={[styles.container, { backgroundColor: cardBackgroundColor }]}
      onPress={onPress}
    >
      <View
        style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}
      >
        <MaterialCommunityIcons name={iconName} size={24} color={iconColor} />
      </View>
      <View style={styles.textContainer}>
        <Typography
          color={titleColor}
          fontSize={16}
          lineHeight={23}
          fontWeight="bold"
        >
          {title}
        </Typography>
        <Typography color={subtitleColor} fontSize={13} lineHeight={18}>
          {description}
        </Typography>
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        size={24}
        color={chevronColor}
      />
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    gap: 16,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
});
