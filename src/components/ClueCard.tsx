import { categories, colors } from "@/constants";
import { Clue } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import PressableScale from "./PressableScale";
import Typography from "./Typography";

type ClueCardProps = Clue;

export default function ClueCard({
  id,
  title,
  text,
  categoryId,
}: ClueCardProps) {
  const router = useRouter();
  const category = categories.find((cat) => cat.id === categoryId);

  const handleDotsPress = () => {
    router.navigate({ pathname: "/clues/[id]/actions", params: { id } });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={category?.iconName || "help-circle-outline"}
            size={24}
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
            fontSize={12}
            lineHeight={16}
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
            size={24}
            color={colors.onSurfaceSubtle}
          />
        </PressableScale>
      </View>
      <View style={styles.textContainer}>
        <Typography color={colors.primarySoft} fontSize={15} lineHeight={22}>
          {text}
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
    backgroundColor: colors.background,
    borderRadius: 4,
  },
});
