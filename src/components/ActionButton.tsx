import { colors } from "@/constants";
import { IconName } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import PressableScale from "./PressableScale";
import Typography from "./Typography";

type ActionButtonProps = {
  iconName: IconName;
  iconColor?: string;
  title: string;
  onPress: () => void;
};

export default function ActionButton({
  iconName,
  iconColor = colors.primary,
  title,
  onPress,
}: ActionButtonProps) {
  return (
    <PressableScale style={styles.actionButton} onPress={onPress}>
      <View style={styles.actionIcon}>
        <MaterialCommunityIcons name={iconName} size={20} color={iconColor} />
      </View>
      <View style={styles.actionContent}>
        <Typography
          color={colors.onSurface}
          fontSize={15}
          lineHeight={20}
          fontWeight="bold"
        >
          {title}
        </Typography>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: "#262525",
    borderColor: colors.borderSubtle,
    minHeight: 60,
    padding: 12,
    gap: 12,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#373636",
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: "center",
    justifyContent: "center",
  },
  actionContent: {
    flex: 1,
  },
});
