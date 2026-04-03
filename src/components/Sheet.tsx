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

type SheetProps = {
  ref?: RefObject<TrueSheet | null>;
  onDidPresent?: ComponentProps<typeof TrueSheet>["onDidPresent"];
  onDidDismiss?: ComponentProps<typeof TrueSheet>["onDidDismiss"];
  children?: ComponentProps<typeof TrueSheet>["children"];
} & TrueSheetProps;

export default function Sheet({
  ref,
  onDidPresent,
  onDidDismiss,
  children,
  ...props
}: SheetProps) {
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
    router.back();
  };

  return (
    <TrueSheet
      ref={ref}
      detents={["auto"]}
      initialDetentIndex={0}
      scrollable={isScrollable}
      cornerRadius={24}
      backgroundColor={colors.surface}
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
        contentContainerStyle={styles.contentContainer}
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
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
});
