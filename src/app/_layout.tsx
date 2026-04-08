import { Header } from "@/components";
import { colors } from "@/constants";
import { useApplicationStore } from "@/storage/stores";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};

export default function RootLayout() {
  const isOnboarded = useApplicationStore((state) => state.isOnboarded);

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setStyle("dark");
    }
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardProvider>
        <ThemeProvider value={theme}>
          <Stack
            screenOptions={{
              header: (props) => <Header {...props} />,
              headerShown: false,
            }}
          >
            <Stack.Protected guard={isOnboarded}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen
                name="clues/add"
                options={{
                  headerShown: true,
                  title: "Add clue",
                  presentation: "modal",
                  animation: "slide_from_bottom",
                }}
              />
              <Stack.Screen
                name="clues/[id]/edit"
                options={{
                  headerShown: true,
                  title: "Edit clue",
                  presentation: "modal",
                  animation: "slide_from_bottom",
                }}
              />
              <Stack.Screen
                name="clues/[id]/actions"
                options={{
                  presentation: "transparentModal",
                  animation: "none",
                }}
              />
              <Stack.Screen
                name="clues/[id]/delete"
                options={{
                  presentation: "transparentModal",
                  animation: "none",
                }}
              />
              <Stack.Screen
                name="settings/clear-data"
                options={{
                  presentation: "transparentModal",
                  animation: "none",
                }}
              />
            </Stack.Protected>
            <Stack.Protected guard={!isOnboarded}>
              <Stack.Screen name="onboarding" />
            </Stack.Protected>
          </Stack>
        </ThemeProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
