import { ConfirmationSheet } from "@/components";
import { useClueStore } from "@/storage/stores";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { useLocalSearchParams } from "expo-router";
import { useRef } from "react";

export default function Delete() {
  const params = useLocalSearchParams<{ id: string }>();
  const deleteClue = useClueStore((state) => state.deleteClue);
  const sheetRef = useRef<TrueSheet>(null);

  const handleConfirmPress = () => {
    deleteClue(params.id);
    sheetRef.current?.dismiss();
  };

  return (
    <ConfirmationSheet
      ref={sheetRef}
      title="Delete this clue?"
      description="This action cannot be undone"
      confirmVariant="destructiveSolid"
      confirmTitle="Delete"
      onConfirmPress={handleConfirmPress}
    />
  );
}
