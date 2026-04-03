import { colors } from "@/constants";
import { IconName } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Typography from "./Typography";

const getIconName = (routeName: string): IconName => {
  switch (routeName) {
    case "clues":
      return "lightbulb-outline";
    case "more":
      return "dots-horizontal";
    default:
      return "help";
  }
};

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      {state.routes
        .filter((route) => route.name !== "index")
        .map((route) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined &&
            typeof options.tabBarLabel === "string"
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.routes[state.index].key === route.key;

          const handlePress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const handleLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <Pressable
              key={route.key}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={handlePress}
              onLongPress={handleLongPress}
              style={styles.tabItem}
            >
              <View
                style={[
                  styles.tabItemContainer,
                  isFocused && styles.activeTabItemContainer,
                ]}
              >
                <MaterialCommunityIcons
                  name={getIconName(route.name)}
                  size={24}
                  color={
                    isFocused
                      ? colors.tabBarItemActive
                      : colors.tabBarItemInactive
                  }
                />
                <Typography
                  color={
                    isFocused
                      ? colors.tabBarItemActive
                      : colors.tabBarItemInactive
                  }
                  fontSize={12}
                  lineHeight={16}
                  textAlign="center"
                >
                  {label.toUpperCase()}
                </Typography>
              </View>
            </Pressable>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: colors.tabBarBackground,
    overflow: "hidden",
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  tabItemContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 2,
    overflow: "hidden",
  },
  activeTabItemContainer: {
    backgroundColor: colors.surfaceHigh,
  },
});
