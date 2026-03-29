import { categories } from "@/constants";
import { Category } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Chip from "./Chip";

type CategoryListProps = {
  activeCategoryId: string;
  setActiveCategoryId: Dispatch<SetStateAction<string>>;
};

export default function CategoryList({
  activeCategoryId,
  setActiveCategoryId,
}: CategoryListProps) {
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: { item: Category }) => {
    return (
      <Chip
        iconName={item.iconName}
        title={item.title}
        active={activeCategoryId === item.id}
        onPress={() => setActiveCategoryId(item.id)}
      />
    );
  };

  return (
    <FlatList
      horizontal
      data={categories}
      renderItem={renderItem}
      style={{ marginLeft: -insets.left - 24, marginRight: -insets.right - 24 }}
      contentContainerStyle={[
        styles.contentContainer,
        {
          paddingLeft: insets.left + 24,
          paddingRight: insets.right + 24,
        },
      ]}
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    gap: 8,
    paddingVertical: 2,
  },
});
