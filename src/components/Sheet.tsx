import { colors } from "@/constants";
import {
  DidDismissEvent,
  DidPresentEvent,
  TrueSheet,
  TrueSheetProps,
} from "@lodev09/react-native-true-sheet";
import { useRouter } from "expo-router";
import { ComponentProps, RefObject, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SheetProps = {
  ref?: RefObject<TrueSheet | null>;
  mode?: "component" | "screen";
  dismissible?: boolean;
  onDidPresent?: ComponentProps<typeof TrueSheet>["onDidPresent"];
  onDidDismiss?: ComponentProps<typeof TrueSheet>["onDidDismiss"];
  children?: ComponentProps<typeof TrueSheet>["children"];
} & TrueSheetProps;

export default function Sheet({
  ref,
  mode = "screen",
  dismissible = true,
  onDidPresent,
  onDidDismiss,
  children,
  ...props
}: SheetProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isScrollable, setIsScrollable] = useState(false);

  const handleDidPresent = (e: DidPresentEvent) => {
    if (e.nativeEvent.detent === 1) {
      setIsScrollable(true);
    }
    onDidPresent?.(e);
  };

  const handleDidDismiss = (e: DidDismissEvent) => {
    if (onDidDismiss) {
      onDidDismiss(e);
      return;
    }
    if (mode === "screen") {
      router.back();
    }
  };

  return (
    <TrueSheet
      ref={ref}
      detents={["auto"]}
      initialDetentIndex={mode === "screen" ? 0 : undefined}
      scrollable={isScrollable}
      dismissible={dismissible}
      insetAdjustment="never"
      backgroundColor={colors.surface}
      cornerRadius={24}
      grabber={dismissible}
      grabberOptions={{
        color: colors.onSurface,
        topMargin: 16,
        height: 4,
      }}
      onDidPresent={handleDidPresent}
      onDidDismiss={handleDidDismiss}
      {...props}
    >
      <ScrollView
        nestedScrollEnabled={isScrollable}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingBottom:
              (isScrollable ? insets.bottom + insets.top : insets.bottom) + 24,
          },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </TrueSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 44,
    paddingHorizontal: 24,
  },
});
