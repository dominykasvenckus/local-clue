import { colors } from "@/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from "react-native";
import PressableScale from "./PressableScale";

type SearchInputProps = {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholderTextColor?: string;
  style?: StyleProp<TextStyle>;
} & TextInputProps;

export default function SearchInput({
  value,
  onChangeText,
  placeholderTextColor = colors.onSurfaceMuted,
  style,
  ...props
}: SearchInputProps) {
  const handleClearPress = () => {
    onChangeText?.("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={placeholderTextColor}
        selectionColor={colors.primaryContainer}
        cursorColor={colors.primaryAccent}
        style={[styles.input, style]}
        autoCorrect={false}
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="none"
        returnKeyType="search"
        {...props}
      />
      <View style={styles.leftIconContainer}>
        <MaterialCommunityIcons
          name="magnify"
          size={22}
          color={placeholderTextColor}
        />
      </View>
      {value && (
        <PressableScale
          style={styles.rightIconContainer}
          onPress={handleClearPress}
        >
          <MaterialCommunityIcons
            name="close-circle"
            size={22}
            color={placeholderTextColor}
          />
        </PressableScale>
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
    fontSize: 16,
    paddingLeft: 46,
    paddingRight: 54,
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
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 14,
  },
});
