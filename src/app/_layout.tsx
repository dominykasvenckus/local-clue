import { colors } from "@/constants/colors";
import { useApplicationStore } from "@/storage/stores";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { PressablesConfig } from "pressto";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};

export default function RootLayout() {
  const isOnboarded = useApplicationStore((state) => state.isOnboarded);

  return (
    <GestureHandlerRootView style={styles.container}>
      <PressablesConfig defaultProps={{ rippleColor: "transparent" }}>
        <ThemeProvider value={theme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={isOnboarded}>
              <Stack.Screen name="(tabs)" />
            </Stack.Protected>
            <Stack.Protected guard={!isOnboarded}>
              <Stack.Screen name="onboarding" />
            </Stack.Protected>
          </Stack>
        </ThemeProvider>
      </PressablesConfig>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
