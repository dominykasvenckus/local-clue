import { PressableScale, Sheet, Typography } from "@/components";
import { colors } from "@/constants";
import { useCluesStore } from "@/storage/stores";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";

export default function Delete() {
  const params = useLocalSearchParams<{ id: string }>();
  const deleteClue = useCluesStore((state) => state.deleteClue);
  const sheetRef = useRef<TrueSheet>(null);

  const handleDeletePress = () => {
    deleteClue(params.id);
    sheetRef.current?.dismiss();
  };

  return (
    <Sheet ref={sheetRef}>
      <View style={styles.contentContainer}>
        <View style={{ gap: 2 }}>
          <Typography
            color={colors.onSurface}
            fontSize={18}
            lineHeight={24}
            fontWeight="bold"
            textAlign="center"
          >
            Delete this clue?
          </Typography>
          <Typography
            color={colors.onSurfaceMuted}
            fontSize={13}
            lineHeight={18}
            textAlign="center"
          >
            This action cannot be undone.
          </Typography>
        </View>

        <PressableScale style={styles.deleteButton} onPress={handleDeletePress}>
          <Typography
            color="#F4CCCC"
            fontSize={15}
            lineHeight={20}
            fontWeight="bold"
            textAlign="center"
          >
            Delete
          </Typography>
        </PressableScale>
        <PressableScale
          style={styles.cancelButton}
          onPress={() => sheetRef.current?.dismiss()}
        >
          <Typography
            color={colors.onSurface}
            fontSize={15}
            lineHeight={20}
            fontWeight="semibold"
            textAlign="center"
          >
            Cancel
          </Typography>
        </PressableScale>
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    gap: 16,
  },
  deleteButton: {
    minHeight: 60,
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#5D3131",
    backgroundColor: "#2A1D1D",
  },
  cancelButton: {
    minHeight: 60,
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.surface,
  },
});
