import { ActionButton, Sheet } from "@/components";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";

export default function Actions() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const sheetRef = useRef<TrueSheet>(null);
  const nextRouteRef = useRef<"edit" | "delete" | null>(null);

  const handleDidDismiss = () => {
    if (nextRouteRef.current) {
      router.replace({
        pathname: `/clues/[id]/${nextRouteRef.current}`,
        params: { id: params.id },
      });
      return;
    }
    router.back();
  };

  const handleActionPress = (action: "edit" | "delete" | "cancel") => {
    if (action !== "cancel") {
      nextRouteRef.current = action;
    }
    sheetRef.current?.dismiss();
  };

  return (
    <Sheet ref={sheetRef} onDidDismiss={handleDidDismiss}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <ActionButton
            iconName="pencil-outline"
            title="Edit clue"
            onPress={() => handleActionPress("edit")}
          />
          <ActionButton
            variant="destructive"
            iconName="trash-can-outline"
            title="Delete clue"
            onPress={() => handleActionPress("delete")}
          />
        </View>
        <ActionButton
          title="Cancel"
          onPress={() => handleActionPress("cancel")}
        />
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  innerContainer: {
    gap: 12,
  },
});
