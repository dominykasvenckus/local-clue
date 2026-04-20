import { colors } from "@/constants";
import { IconName } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
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
  solid: {
    borderColor: colors.primaryAccent,
    backgroundColor: colors.primaryContainer,
    iconBackgroundColor: undefined,
    iconColor: undefined,
    textColor: colors.onPrimary,
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
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void | Promise<void>;
};

type StandardActionButtonProps = {
  variant?: "default" | "destructive";
  iconName?: IconName;
} & BaseActionButtonProps;

type SolidActionButtonProps = {
  variant: "solid" | "destructiveSolid";
} & BaseActionButtonProps;

type ActionButtonProps = StandardActionButtonProps | SolidActionButtonProps;

export default function ActionButton(props: ActionButtonProps) {
  const [loadingState, setLoadingState] = useState(false);

  const {
    variant = "default",
    title,
    disabled = false,
    loading,
    onPress,
  } = props;
  const iconName = "iconName" in props ? props.iconName : undefined;
  const {
    borderColor,
    backgroundColor,
    iconBackgroundColor,
    iconColor,
    textColor,
  } = variantStyles[variant];
  const isLoading = loading === undefined ? loadingState : loading;

  const handlePress = async () => {
    const result = onPress();
    if (props.loading === undefined && result instanceof Promise) {
      setLoadingState(true);
      await result.finally(() => {
        setLoadingState(false);
      });
    }
  };

  return (
    <PressableScale
      style={[
        styles.actionButton,
        { borderWidth: borderColor ? 1 : 0, borderColor, backgroundColor },
        disabled && styles.disabledButton,
      ]}
      disabled={disabled || isLoading}
      onPress={handlePress}
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
        style={[styles.flex, isLoading && styles.hiddenContent]}
      >
        {title}
      </Typography>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color={textColor}
          style={styles.activityIndicator}
        />
      )}
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
    gap: 14,
    overflow: "hidden",
  },
  disabledButton: {
    opacity: 0.5,
  },
  actionIcon: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 10,
  },
  hiddenContent: {
    opacity: 0,
  },
  activityIndicator: {
    position: "absolute",
    left: 0,
    right: 0,
  },
});
