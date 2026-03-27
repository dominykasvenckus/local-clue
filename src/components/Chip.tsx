import { colors } from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PressableScale } from "pressto";
import { ComponentProps } from "react";
import { StyleSheet, View } from "react-native";
import Typography from "./Typography";

type ChipProps = {
  iconName: ComponentProps<typeof MaterialCommunityIcons>["name"];
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
      onPress={onPress}
      enabled={!!onPress}
    >
      <View style={styles.innerContainer}>
        <MaterialCommunityIcons
          name={iconName}
          size={16}
          color={active ? colors.onPrimary : colors.onSurfaceMuted}
        />
        <Typography
          color={active ? colors.onPrimary : colors.onSurfaceMuted}
          fontSize={13}
          lineHeight={16}
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
