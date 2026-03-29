import { colors } from "@/constants";
import { IconName } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import PressableScale from "./PressableScale";

type IconButtonProps = {
  iconName: IconName;
  onPress: () => void;
};

export default function IconButton({ iconName, onPress }: IconButtonProps) {
  return (
    <PressableScale style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={[colors.primaryAccent, colors.primaryContainer]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <MaterialCommunityIcons
          name={iconName}
          size={32}
          color={colors.onPrimary}
        />
      </LinearGradient>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
  },
  gradient: {
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
  },
});
