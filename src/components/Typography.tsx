import { colors } from "@/constants/colors";
import React, { ReactNode } from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

const FONT_FAMILIES = {
  regular: "Manrope-Regular",
  medium: "Manrope-Medium",
  semibold: "Manrope-SemiBold",
  bold: "Manrope-Bold",
};

type TypographyProps = {
  color?: string;
  fontSize?: number;
  lineHeight?: number;
  fontWeight?: keyof typeof FONT_FAMILIES;
  textAlign?: TextStyle["textAlign"];
  flexShrink?: number;
  spacingTop?: number;
  spacingBottom?: number;
  spacingHorizontal?: number;
  style?: StyleProp<TextStyle>;
  children: ReactNode;
} & TextProps;

export default function Typography({
  color = colors.onSurfaceMuted,
  fontSize = 16,
  lineHeight = 24,
  fontWeight = "regular",
  textAlign = "left",
  flexShrink = 1,
  spacingTop = 0,
  spacingBottom = 0,
  spacingHorizontal = 0,
  style,
  children,
  ...props
}: TypographyProps) {
  return (
    <Text
      style={[
        {
          fontFamily: FONT_FAMILIES[fontWeight],
          color,
          fontSize,
          lineHeight,
          textAlign,
          flexShrink,
          marginTop: spacingTop,
          marginBottom: spacingBottom,
          marginHorizontal: spacingHorizontal,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}
