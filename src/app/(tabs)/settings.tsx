import { SettingCard, Typography } from "@/components";
import { colors, settingCards } from "@/constants";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Settings() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const version = Constants.expoConfig?.version;

  const actions: Record<string, () => void> = {
    export: () => router.navigate("/settings/export-clues"),
    import: () => router.navigate("/settings/import-clues"),
    clear: () => router.navigate("/settings/clear-clues"),
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.contentContainer,
        {
          paddingTop: insets.top + 24,
          paddingBottom: 24,
          paddingLeft: insets.left + 24,
          paddingRight: insets.right + 24,
        },
      ]}
    >
      <View style={styles.cardContainer}>
        {settingCards.map((card) => (
          <SettingCard key={card.id} {...card} onPress={actions[card.id]} />
        ))}
      </View>
      {version && (
        <Typography
          color={colors.onSurfaceMuted}
          fontSize={12}
          lineHeight={16}
          textAlign="center"
          spacingTop={24}
        >
          v{version}
        </Typography>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  cardContainer: {
    gap: 12,
  },
});
