import { categories, colors } from "@/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import PressableScale from "./PressableScale";
import Typography from "./Typography";

type ClueCardProps = {
  title: string;
  categoryId: string;
  description: string;
};

export default function ClueCard({
  title,
  categoryId,
  description,
}: ClueCardProps) {
  const category = categories.find((cat) => cat.id === categoryId);

  const handleDotsPress = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={category?.iconName || "help-circle-outline"}
            size={22}
            color={colors.primary}
          />
        </View>
        <View style={styles.flexShrink}>
          <Typography
            color={colors.onSurface}
            fontSize={16}
            lineHeight={24}
            fontWeight="bold"
          >
            {title}
          </Typography>
          <Typography
            color={colors.onSurfaceSubtle}
            fontSize={10}
            lineHeight={15}
          >
            {category?.title.toUpperCase()}
          </Typography>
        </View>
        <PressableScale
          style={styles.dotsContainer}
          onPress={handleDotsPress}
          hitSlop={20}
        >
          <MaterialCommunityIcons
            name="dots-vertical"
            size={22}
            color={colors.onSurfaceSubtle}
          />
        </PressableScale>
      </View>
      <View style={styles.textContainer}>
        <Typography color={colors.primarySoft} fontSize={14} lineHeight={20}>
          {description}
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flexShrink: {
    flexShrink: 1,
  },
  container: {
    padding: 20,
    backgroundColor: colors.surface,
    borderRadius: 8,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  iconContainer: {
    padding: 12,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 12,
  },
  dotsContainer: {
    marginLeft: "auto",
  },
  textContainer: {
    padding: 12,
    backgroundColor: colors.scrim,
    borderRadius: 4,
  },
});
