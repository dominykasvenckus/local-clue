import { CategoryList, ClueCard, IconButton, SearchInput } from "@/components";
import { clues } from "@/constants";
import { Clue } from "@/types";
import { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets();
  const [searchValue, setSearchValue] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState("1");
  const flatListRef = useRef<FlatList<Clue>>(null);

  const normalizedSearchValue = searchValue.trim().toLowerCase();

  const filteredClues = clues.filter((item) => {
    const matchesCategory =
      activeCategoryId === "1" ? true : item.categoryId === activeCategoryId;

    if (!matchesCategory) {
      return false;
    }

    if (!normalizedSearchValue) {
      return true;
    }

    const searchableText = `${item.title} ${item.description}`.toLowerCase();
    return searchableText.includes(normalizedSearchValue);
  });

  useEffect(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [activeCategoryId]);

  return (
    <View style={styles.flex}>
      <View
        style={[
          styles.headerContainer,
          {
            paddingTop: insets.top + 24,
            paddingLeft: insets.left + 24,
            paddingRight: insets.right + 24,
          },
        ]}
      >
        <SearchInput
          placeholder="Search clues"
          value={searchValue}
          onChangeText={setSearchValue}
        />
        <CategoryList
          activeCategoryId={activeCategoryId}
          setActiveCategoryId={setActiveCategoryId}
        />
      </View>
      <FlatList
        ref={flatListRef}
        data={filteredClues}
        renderItem={({ item }) => <ClueCard {...item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingBottom: 120,
            paddingLeft: insets.left + 24,
            paddingRight: insets.right + 24,
          },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      />
      <View style={styles.iconContainer}>
        <IconButton iconName="plus" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  headerContainer: {
    marginBottom: 12,
    gap: 16,
  },
  separator: {
    height: 16,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 12,
  },
  emptyContainer: {
    flex: 1,
    minHeight: 240,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 4,
  },
  iconContainer: {
    position: "absolute",
    right: 24,
    bottom: 32,
    gap: 8,
  },
});
