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
        <PressableScale
          style={styles.rightIconContainer}
          onPress={handleClearPress}
          hitSlop={6}
        >
          <MaterialCommunityIcons
            name="close-circle"
            size={20}
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
    right: 14,
  },
});
