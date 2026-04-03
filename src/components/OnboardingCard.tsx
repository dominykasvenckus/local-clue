import { colors } from "@/constants";
import { IconName } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import Typography from "./Typography";

type OnboardingCardProps = {
  iconName: IconName;
  title: string;
  description: string;
};

export default function OnboardingCard({
  iconName,
  title,
  description,
}: OnboardingCardProps) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={iconName}
        size={36}
        color={colors.primary}
      />
      <View style={styles.innerContainer}>
        <Typography
          color={colors.primary}
          fontSize={15}
          lineHeight={22}
          fontWeight="medium"
        >
          {title.toUpperCase()}
        </Typography>
        <Typography color={colors.onSurfaceMuted} fontSize={15} lineHeight={23}>
          {description}
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    gap: 16,
    padding: 24,
    borderRadius: 8,
  },
  innerContainer: {
    flexShrink: 1,
    gap: 6,
  },
});
