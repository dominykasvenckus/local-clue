import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const springConfig = { stiffness: 260, damping: 30, mass: 0.7 };

type PressableScaleProps = {
  onPressIn?: PressableProps["onPressIn"];
  onPressOut?: PressableProps["onPressOut"];
  style?: StyleProp<ViewStyle>;
  children?: PressableProps["children"];
} & Omit<PressableProps, "style" | "children">;

export default function PressableScale({
  onPressIn,
  onPressOut,
  style,
  children,
  ...props
}: PressableScaleProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return { transform: [{ scale: scale.get() }] };
  });

  const handlePressIn = (event: GestureResponderEvent) => {
    scale.set(withSpring(0.96, springConfig));
    onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    scale.set(withSpring(1, springConfig));
    onPressOut?.(event);
  };

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[style, animatedStyle]}
      {...props}
    >
      {children}
    </AnimatedPressable>
  );
}
