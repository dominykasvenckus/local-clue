import { categories, colors } from "@/constants";
import { useClueStore } from "@/storage/stores";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "./Button";
import Chip from "./Chip";
import Input from "./Input";
import Label from "./Label";

type ClueEditorScreenProps = {
  clueId?: string;
};

export default function ClueEditor({ clueId }: ClueEditorScreenProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const clue = useClueStore((state) =>
    clueId ? state.getClue(clueId) : undefined,
  );
  const addClue = useClueStore((state) => state.addClue);
  const updateClue = useClueStore((state) => state.updateClue);
  const [formValues, setFormValues] = useState({
    title: clue?.title || "",
    text: clue?.text || "",
    categoryId: clue?.categoryId || "2",
  });

  const handleChange = (field: keyof typeof formValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (clueId) {
      updateClue(clueId, formValues);
    } else {
      addClue(formValues);
    }
    router.back();
  };

  return (
    <View style={styles.flex}>
      <KeyboardAwareScrollView
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingTop: 24,
            paddingBottom: 48,
            paddingLeft: insets.left + 24,
            paddingRight: insets.right + 24,
          },
        ]}
        bottomOffset={146}
        extraKeyboardSpace={-insets.bottom}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <Input
            label="Title"
            placeholder="e.g. Netflix"
            value={formValues.title}
            onChangeText={(value) => handleChange("title", value)}
            autoCorrect={false}
            spellCheck={false}
            autoComplete="off"
          />
          <Input
            multiline
            height={168}
            label="Clue"
            placeholder="e.g. The street where I grew up"
            value={formValues.text}
            onChangeText={(value) => handleChange("text", value)}
            autoComplete="off"
          />
          <View style={styles.categoriesContainer}>
            <Label>Category</Label>
            <View style={styles.chipsContainer}>
              {categories
                .filter((category) => category.id !== "1")
                .map((category) => (
                  <Chip
                    key={category.id}
                    title={category.title}
                    iconName={category.iconName}
                    active={formValues.categoryId === category.id}
                    onPress={() => handleChange("categoryId", category.id)}
                  />
                ))}
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <KeyboardStickyView
        offset={{ closed: 0, opened: insets.bottom }}
        style={[
          styles.stickyContainer,
          {
            paddingBottom: insets.bottom + 24,
            paddingLeft: insets.left + 24,
            paddingRight: insets.right + 24,
          },
        ]}
      >
        <LinearGradient
          colors={[colors.background, colors.backgroundTransparent]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.gradient}
          pointerEvents="none"
        />
        <Button
          title="Save"
          iconName="check"
          onPress={handleSave}
          disabled={!formValues.title.trim() || !formValues.text.trim()}
        />
      </KeyboardStickyView>
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
  formContainer: {
    gap: 32,
  },
  categoriesContainer: {
    gap: 12,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  stickyContainer: {
    backgroundColor: colors.background,
  },
  gradient: {
    height: 40,
    position: "absolute",
    top: -40,
    left: 0,
    right: 0,
  },
});
