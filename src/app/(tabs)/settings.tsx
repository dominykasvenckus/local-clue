import { ConfirmationSheet, SettingCard, Typography } from "@/components";
import { colors, settingCards } from "@/constants";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import Constants from "expo-constants";
import { openSettings } from "expo-linking";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCameraPermission } from "react-native-vision-camera";

export default function Settings() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { hasPermission, requestPermission } = useCameraPermission();
  const sheetRef = useRef<TrueSheet>(null);
  const version = Constants.expoConfig?.version;

  const actions: Record<string, () => void> = {
    export: () => router.navigate("/settings/export-clues"),
    import: async () => {
      if (hasPermission) {
        router.navigate("/settings/import-clues");
        return;
      }

      const isGranted = await requestPermission();
      if (!isGranted) {
        sheetRef.current?.present();
      } else {
        router.navigate("/settings/import-clues");
      }
    },
    clear: () => router.navigate("/settings/clear-clues"),
  };

  const handleConfirmPress = async () => {
    await sheetRef.current?.dismiss();
    openSettings();
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
      <ConfirmationSheet
        ref={sheetRef}
        mode="component"
        title="Camera access required"
        description="Please allow camera access in your device settings to import clues from QR"
        confirmTitle="Open settings"
        confirmLoading={false}
        onConfirmPress={handleConfirmPress}
      />
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
