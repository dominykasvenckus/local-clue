import { colors } from "@/constants";
import { IconName } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import PressableScale from "./PressableScale";
import Typography from "./Typography";

type ChipProps = {
  iconName: IconName;
  title: string;
  active?: boolean;
  onPress?: () => void;
};

export default function Chip({
  title,
  iconName,
  active = false,
  onPress,
}: ChipProps) {
  return (
    <PressableScale
      style={[
        styles.container,
        active ? styles.containerActive : styles.containerInactive,
      ]}
      disabled={!onPress}
      onPress={onPress}
    >
      <View style={styles.innerContainer}>
        <MaterialCommunityIcons
          name={iconName}
          size={18}
          color={active ? colors.onPrimary : colors.onSurfaceMuted}
        />
        <Typography
          color={active ? colors.onPrimary : colors.onSurfaceMuted}
          fontSize={14}
          lineHeight={18}
          fontWeight="semibold"
        >
          {title}
        </Typography>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  containerActive: {
    backgroundColor: colors.primaryContainer,
    borderColor: colors.primaryAccent,
  },
  containerInactive: {
    backgroundColor: colors.surface,
    borderColor: colors.borderSubtle,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
