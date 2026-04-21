import { categories, colors } from "@/constants";
import { useClueStore } from "@/storage/stores";
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
  isFavorite,
}: ClueCardProps) {
  const router = useRouter();
  const updateClue = useClueStore((state) => state.updateClue);
  const category = categories.find((cat) => cat.id === categoryId);

  const handleFavoritePress = () => {
    updateClue(id, { isFavorite: !isFavorite });
  };

  const handleMenuPress = () => {
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
        <View style={styles.titleContainer}>
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
        <View style={styles.actionsContainer}>
          <PressableScale
            onPress={handleFavoritePress}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 4 }}
          >
            <MaterialCommunityIcons
              name={isFavorite ? "star" : "star-outline"}
              size={24}
              color={isFavorite ? colors.primaryAccent : colors.onSurfaceSubtle}
            />
          </PressableScale>
          <PressableScale
            onPress={handleMenuPress}
            hitSlop={{ top: 20, bottom: 20, left: 4, right: 20 }}
          >
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color={colors.onSurfaceSubtle}
            />
          </PressableScale>
        </View>
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
  titleContainer: {
    flexShrink: 1,
    gap: 4,
  },
  actionsContainer: {
    flexDirection: "row",
    marginLeft: "auto",
    gap: 8,
  },
  textContainer: {
    padding: 12,
    backgroundColor: colors.background,
    borderRadius: 4,
  },
});
