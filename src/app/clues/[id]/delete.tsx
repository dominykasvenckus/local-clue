import { ActionButton, Sheet, Typography } from "@/components";
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

  const handleActionPress = (action: "delete" | "cancel") => {
    if (action === "delete") {
      deleteClue(params.id);
    }
    sheetRef.current?.dismiss();
  };

  return (
    <Sheet ref={sheetRef}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
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
            fontSize={14}
            lineHeight={20}
            textAlign="center"
          >
            This action cannot be undone
          </Typography>
        </View>
        <View style={styles.buttonsContainer}>
          <ActionButton
            variant="destructiveSolid"
            title="Delete"
            onPress={() => handleActionPress("delete")}
          />
          <ActionButton
            title="Cancel"
            onPress={() => handleActionPress("cancel")}
          />
        </View>
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  textContainer: {
    gap: 2,
  },
  buttonsContainer: {
    gap: 16,
  },
});
