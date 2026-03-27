import {
  CategoryList,
  HintCard,
  IconButton,
  SearchInput,
  Typography,
} from "@/components";
import { colors } from "@/constants/colors";
import { HINTS } from "@/constants/mock";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets();
  const [searchValue, setSearchValue] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState("all");

  const normalizedSearchValue = searchValue.trim().toLowerCase();

  const filteredHints = HINTS.filter((item) => {
    const matchesCategory =
      activeCategoryId === "all" ? true : item.categoryId === activeCategoryId;

    if (!matchesCategory) {
      return false;
    }

    if (!normalizedSearchValue) {
      return true;
    }

    const searchableText = `${item.title} ${item.hint}`.toLowerCase();
    return searchableText.includes(normalizedSearchValue);
  });

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
        <Typography
          color={colors.onSurface}
          fontSize={36}
          lineHeight={40}
          fontWeight="bold"
        >
          Hints
        </Typography>
        <SearchInput
          placeholder="Search hints"
          value={searchValue}
          onChangeText={setSearchValue}
        />
        <CategoryList
          activeCategoryId={activeCategoryId}
          setActiveCategoryId={setActiveCategoryId}
        />
      </View>
      <FlatList
        data={filteredHints}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingBottom: 120,
            paddingLeft: insets.left + 24,
            paddingRight: insets.right + 24,
          },
        ]}
        renderItem={({ item }) => <HintCard {...item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
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
  contentContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    marginBottom: 24,
    gap: 16,
  },
  iconContainer: {
    position: "absolute",
    right: 24,
    bottom: 32,
    gap: 8,
  },
  separator: {
    height: 16,
  },
});
