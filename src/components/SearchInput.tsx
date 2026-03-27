import { colors } from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PressableScale } from "pressto";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from "react-native";

type SearchInputProps = {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholderTextColor?: string;
  style?: StyleProp<TextStyle>;
} & Omit<TextInputProps, "placeholderTextColor" | "style">;

export default function SearchInput({
  value,
  onChangeText,
  placeholderTextColor = colors.onSurfaceMuted,
  style,
  ...props
}: SearchInputProps) {
  const handleClearPress = () => {
    console.log("Clear button pressed");
    onChangeText?.("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={placeholderTextColor}
        selectionColor={colors.primary}
        style={[styles.input, style]}
        autoCorrect={false}
        autoComplete="off"
        {...props}
      />
      <View style={styles.leftIconContainer}>
        <MaterialCommunityIcons
          name="magnify"
          size={20}
          color={placeholderTextColor}
        />
      </View>
      {value && (
        <Pressable style={styles.rightIconContainer}>
          <PressableScale
            onPress={handleClearPress}
            style={styles.rightIconInnerContainer}
          >
            <MaterialCommunityIcons
              name="close-circle"
              size={20}
              color={placeholderTextColor}
            />
          </PressableScale>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.surface,
    overflow: "hidden",
  },
  input: {
    color: colors.onSurface,
    fontFamily: "Manrope-Medium",
    fontSize: 15,
    paddingLeft: 44,
    paddingRight: 48,
    paddingVertical: 14,
    backgroundColor: colors.surface,
  },
  leftIconContainer: {
    position: "absolute",
    left: 14,
    pointerEvents: "none",
  },
  rightIconContainer: {
    position: "absolute",
    right: 8,
  },
  rightIconInnerContainer: {
    padding: 6,
  },
});
