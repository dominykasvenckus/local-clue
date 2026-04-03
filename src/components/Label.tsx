import { colors } from "@/constants";
import { ReactNode } from "react";
import Typography from "./Typography";

type LabelProps = {
  color?: string;
  spacingTop?: number;
  spacingBottom?: number;
  spacingHorizontal?: number;
  children: ReactNode;
};

export default function Label({
  color = colors.onSurface,
  children,
  ...props
}: LabelProps) {
  return (
    <Typography
      color={color}
      fontSize={15}
      lineHeight={22}
      fontWeight="semibold"
      {...props}
    >
      {children?.toString().toUpperCase()}
    </Typography>
  );
}
