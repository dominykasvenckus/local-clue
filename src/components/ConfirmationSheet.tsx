import { colors } from "@/constants";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { ComponentProps, RefObject, useRef } from "react";
import { StyleSheet, View } from "react-native";
import ActionButton from "./ActionButton";
import Sheet from "./Sheet";
import Typography from "./Typography";

type ConfirmationSheetProps = {
  ref: RefObject<TrueSheet | null>;
  title: string;
  description?: string;
  confirmVariant?: ComponentProps<typeof ActionButton>["variant"];
  confirmTitle: string;
  onConfirmPress: () => void;
};

export default function ConfirmationSheet({
  ref,
  title,
  description,
  confirmVariant = "solid",
  confirmTitle,
  onConfirmPress,
}: ConfirmationSheetProps) {
  const sheetRef = useRef<TrueSheet>(null);

  const handleActionPress = (action: "confirm" | "cancel") => {
    if (action === "confirm") {
      onConfirmPress();
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
            {title}
          </Typography>
          {description && (
            <Typography
              color={colors.onSurfaceMuted}
              fontSize={14}
              lineHeight={20}
              textAlign="center"
            >
              {description}
            </Typography>
          )}
        </View>
        <View style={styles.buttonsContainer}>
          <ActionButton
            variant={confirmVariant}
            title={confirmTitle}
            onPress={() => handleActionPress("confirm")}
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
