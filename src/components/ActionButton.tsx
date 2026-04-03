import { colors } from "@/constants";
import { IconName } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import PressableScale from "./PressableScale";
import Typography from "./Typography";

const variantStyles = {
  default: {
    borderColor: colors.borderSubtle,
    backgroundColor: colors.surface,
    iconBackgroundColor: colors.surfaceHigh,
    iconColor: colors.primaryAccent,
    textColor: colors.onSurface,
  },
  destructive: {
    borderColor: colors.dangerContainer,
    backgroundColor: colors.surface,
    iconBackgroundColor: colors.dangerContainer,
    iconColor: colors.danger,
    textColor: colors.danger,
  },
  destructiveSolid: {
    borderColor: colors.danger,
    backgroundColor: colors.dangerContainer,
    iconBackgroundColor: undefined,
    iconColor: undefined,
    textColor: colors.onSurface,
  },
};

type BaseActionButtonProps = {
  title: string;
  onPress: () => void;
};

type StandardActionButtonProps = {
  variant?: "default" | "destructive";
  iconName?: IconName;
} & BaseActionButtonProps;

type DestructiveSolidActionButtonProps = {
  variant: "destructiveSolid";
} & BaseActionButtonProps;

type ActionButtonProps =
  | StandardActionButtonProps
  | DestructiveSolidActionButtonProps;

export default function ActionButton(props: ActionButtonProps) {
  const { variant = "default", title, onPress } = props;
  const iconName = "iconName" in props ? props.iconName : undefined;
  const {
    borderColor,
    backgroundColor,
    iconBackgroundColor,
    iconColor,
    textColor,
  } = variantStyles[variant];

  return (
    <PressableScale
      style={[styles.actionButton, { borderColor, backgroundColor }]}
      onPress={onPress}
    >
      {iconName && (
        <View
          style={[styles.actionIcon, { backgroundColor: iconBackgroundColor }]}
        >
          <MaterialCommunityIcons name={iconName} size={22} color={iconColor} />
        </View>
      )}
      <Typography
        color={textColor}
        fontSize={16}
        lineHeight={22}
        fontWeight="semibold"
        textAlign={iconName ? "left" : "center"}
        style={styles.flex}
      >
        {title}
      </Typography>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 66,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    gap: 14,
  },
  actionIcon: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 10,
  },
});
