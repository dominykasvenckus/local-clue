import { ClueEditor } from "@/components";
import { useLocalSearchParams } from "expo-router";

export default function Edit() {
  const params = useLocalSearchParams<{ id: string }>();

  return <ClueEditor clueId={params.id} />;
}
