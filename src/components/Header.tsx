import { colors } from "@/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getHeaderTitle } from "@react-navigation/elements";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PressableScale from "./PressableScale";
import Typography from "./Typography";

export default function CustomHeader({
  navigation,
  route,
  options,
  back,
}: NativeStackHeaderProps) {
  const insets = useSafeAreaInsets();
  const title = getHeaderTitle(options, route.name);

  const getPaddingHorizontal = () => {
    const leftPadding = insets.left + (back ? 88 : 24);
    const rightPadding = insets.right + 24;
    return {
      paddingHorizontal:
        leftPadding > rightPadding ? leftPadding : rightPadding,
    };
  };

  return (
    <View>
      <View style={[styles.spacer, { height: insets.top }]}></View>
      <View style={[styles.container, { ...getPaddingHorizontal() }]}>
        {back && (
          <PressableScale
            style={[styles.iconContainer, { left: insets.left + 24 }]}
            onPress={navigation.goBack}
          >
            <MaterialCommunityIcons
              name={options.presentation !== "card" ? "close" : "arrow-left"}
              size={22}
              color={colors.onSurface}
            />
          </PressableScale>
        )}
        <Typography
          color={colors.onSurface}
          fontSize={18}
          lineHeight={24}
          fontWeight="bold"
          textAlign="center"
          style={styles.flex}
        >
          {title}
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  spacer: {
    backgroundColor: colors.tabBarBackground,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 64,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceHigh,
    backgroundColor: colors.tabBarBackground,
  },
  iconContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    padding: 9,
    borderRadius: 8,
    backgroundColor: colors.surfaceElevated,
  },
});
