import { ConfirmationSheet } from "@/components";
import { useCluesStore } from "@/storage/stores";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { useRef } from "react";

export default function ClearData() {
  const clearClues = useCluesStore((state) => state.clearClues);
  const sheetRef = useRef<TrueSheet>(null);

  const handleConfirmPress = () => {
    clearClues();
    sheetRef.current?.dismiss();
  };

  return (
    <ConfirmationSheet
      ref={sheetRef}
      title="Clear all clues?"
      description="This action cannot be undone"
      confirmVariant="destructiveSolid"
      confirmTitle="Clear clues"
      onConfirmPress={handleConfirmPress}
    />
  );
}
