import { colors } from "@/constants";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from "react-native";
import Label from "./Label";

type InputProps = {
  label?: string;
  labelColor?: string;
  multiline?: boolean;
  minHeight?: number;
  height?: number;
  style?: StyleProp<TextStyle>;
} & TextInputProps;

export default function Input({
  label,
  labelColor,
  multiline = false,
  minHeight,
  height,
  style,
  ...props
}: InputProps) {
  return (
    <View style={styles.container}>
      {label && <Label color={labelColor}>{label}</Label>}
      <TextInput
        placeholderTextColor={colors.onSurfaceMuted}
        selectionColor={colors.primary}
        multiline={multiline}
        numberOfLines={multiline ? undefined : 1}
        style={[
          styles.input,
          {
            textAlignVertical: multiline ? "top" : "center",
            minHeight,
            height,
          },
          style,
        ]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  input: {
    color: colors.onSurface,
    fontFamily: "Manrope-Medium",
    fontSize: 15,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.surface,
  },
});
