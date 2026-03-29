import { colors } from "@/constants";
import { IconName } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import PressableScale from "./PressableScale";
import Typography from "./Typography";

type ButtonProps = {
  text: string;
  iconName?: IconName;
  iconSide?: "left" | "right";
  disabled?: boolean;
  loading?: boolean;
  onPress: () => Promise<void> | void;
};

export default function Button({
  text,
  iconName,
  iconSide = "right",
  disabled = false,
  loading,
  onPress,
}: ButtonProps) {
  const [loadingState, setLoadingState] = useState(false);

  const isLoading = loading === undefined ? loadingState : loading;

  const handlePress = async () => {
    const result = onPress();
    if (loading === undefined && result instanceof Promise) {
      setLoadingState(true);
      await result.finally(() => {
        setLoadingState(false);
      });
    }
  };

  const icon = iconName ? (
    <MaterialCommunityIcons
      name={iconName}
      size={20}
      color={colors.onPrimary}
    />
  ) : null;

  return (
    <PressableScale
      style={[styles.container, disabled && styles.disabledContainer]}
      disabled={disabled || isLoading}
      onPress={handlePress}
    >
      <LinearGradient
        colors={[colors.primaryAccent, colors.primaryContainer]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <View
          style={[styles.contentContainer, isLoading && styles.hiddenContent]}
        >
          {iconSide === "left" ? icon : null}
          <Typography
            color={colors.onPrimary}
            fontSize={18}
            lineHeight={28}
            fontWeight="bold"
            textAlign="center"
          >
            {text}
          </Typography>
          {iconSide === "right" ? icon : null}
        </View>
        {isLoading && (
          <ActivityIndicator
            size="large"
            color={colors.onPrimary}
            style={styles.activityIndicator}
          />
        )}
      </LinearGradient>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: "hidden",
  },
  disabledContainer: {
    opacity: 0.5,
  },
  gradient: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  hiddenContent: {
    opacity: 0,
  },
  activityIndicator: {
    position: "absolute",
  },
});
