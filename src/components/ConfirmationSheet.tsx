import { colors } from "@/constants";
import { TrueSheet, TrueSheetProps } from "@lodev09/react-native-true-sheet";
import { ComponentProps, RefObject } from "react";
import { StyleSheet, View } from "react-native";
import ActionButton from "./ActionButton";
import Sheet from "./Sheet";
import Typography from "./Typography";

type ConfirmationSheetProps = {
  ref: RefObject<TrueSheet | null>;
  mode?: "component" | "screen";
  dismissible?: boolean;
  title: string;
  description?: string;
  confirmVariant?: ComponentProps<typeof ActionButton>["variant"];
  confirmTitle: string;
  confirmLoading?: boolean;
  onConfirmPress: () => void | Promise<void>;
} & TrueSheetProps;

export default function ConfirmationSheet({
  ref,
  mode,
  dismissible = true,
  title,
  description,
  confirmVariant = "solid",
  confirmTitle,
  confirmLoading,
  onConfirmPress,
}: ConfirmationSheetProps) {
  return (
    <Sheet ref={ref} mode={mode} dismissible={dismissible}>
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
            loading={confirmLoading}
            onPress={onConfirmPress}
          />
          {dismissible && (
            <ActionButton
              title="Cancel"
              onPress={() => {
                ref.current?.dismiss();
              }}
            />
          )}
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
