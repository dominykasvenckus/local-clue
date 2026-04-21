import {
  CategoryList,
  ClueCard,
  IconButton,
  SearchInput,
  Typography,
} from "@/components";
import { colors } from "@/constants";
import { useClueStore } from "@/storage/stores";
import { Clue } from "@/types";
import { useRouter } from "expo-router";
import { useLayoutEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Clues() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const clues = useClueStore((state) => state.clues);
  const [searchValue, setSearchValue] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState("all");
  const flatListRef = useRef<FlatList<Clue>>(null);

  const normalizedSearchValue = searchValue.trim().toLowerCase();

  const filteredClues = clues.filter((item) => {
    const matchesCategory =
      activeCategoryId === "all" ||
      (activeCategoryId === "favorites"
        ? item.isFavorite
        : item.categoryId === activeCategoryId);

    if (!matchesCategory) {
      return false;
    }

    if (!normalizedSearchValue) {
      return true;
    }

    const searchableText = `${item.title} ${item.text}`.toLowerCase();
    return searchableText.includes(normalizedSearchValue);
  });

  const emptyText = (() => {
    if (!clues.length) {
      return "You haven't created any clues yet.\nTap '+' to start!";
    }
    if (normalizedSearchValue) {
      return "No matches found";
    }
    if (activeCategoryId !== "all") {
      return "No clues here";
    }
    return "Nothing to show";
  })();

  useLayoutEffect(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [activeCategoryId]);

  const handleAddPress = () => {
    router.navigate("/clues/add");
  };

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Typography
        color={colors.onSurface}
        fontWeight="semibold"
        fontSize={16}
        lineHeight={24}
        textAlign="center"
      >
        {emptyText}
      </Typography>
    </View>
  );

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
        ListEmptyComponent={ListEmptyComponent}
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
      <View style={[styles.iconContainer, { right: insets.right + 24 }]}>
        <IconButton iconName="plus" onPress={handleAddPress} />
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
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    position: "absolute",
    bottom: 32,
    gap: 8,
  },
});
