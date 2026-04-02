import { PressableScale, Sheet, Typography } from "@/components";
import { colors } from "@/constants";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import ActionButton from "../../../components/ActionButton";

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

  const handleActionPress = (nextRoute: "edit" | "delete") => {
    nextRouteRef.current = nextRoute;
    sheetRef.current?.dismiss();
  };

  return (
    <Sheet ref={sheetRef} onDidDismiss={handleDidDismiss}>
      <View style={styles.container}>
        <View style={styles.actionsContainer}>
          <ActionButton
            iconName="pencil-outline"
            title="Edit clue"
            onPress={() => handleActionPress("edit")}
          />
          <ActionButton
            iconName="trash-can-outline"
            title="Delete clue"
            iconColor="#E05D5D"
            onPress={() => handleActionPress("delete")}
          />
        </View>
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
  container: {
    gap: 16,
  },
  actionsContainer: {
    gap: 10,
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
