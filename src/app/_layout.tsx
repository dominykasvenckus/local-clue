import { ConfirmationSheet, Header } from "@/components";
import { colors } from "@/constants";
import { initializeStorage } from "@/storage/storage";
import { useApplicationStore } from "@/storage/stores";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useRef, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";

SplashScreen.preventAutoHideAsync();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};

export default function RootLayout() {
  const isOnboarded = useApplicationStore((state) => state.isOnboarded);
  const [isReady, setIsReady] = useState(false);
  const hasError = useRef(false);
  const sheetRef = useRef<TrueSheet>(null);

  const init = useCallback(async () => {
    try {
      await initializeStorage();
      if (hasError.current) {
        await sheetRef.current?.dismiss();
      }
      hasError.current = false;
    } catch (error) {
      console.error("Error initializing storage:", error);
      hasError.current = true;
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setStyle("dark");
    }
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    (async () => {
      if (isReady) {
        if (hasError.current) {
          await sheetRef.current?.present(0, false);
        }
        SplashScreen.hide();
      }
    })();
  }, [isReady]);

  if (!isReady) {
    return null;
  }

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
                name="settings/export-clues"
                options={{ headerShown: true, title: "Export with QR" }}
              />
              <Stack.Screen
                name="settings/import-clues"
                options={{ headerShown: true, title: "Import from QR" }}
              />
              <Stack.Screen
                name="settings/clear-clues"
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
          <ConfirmationSheet
            ref={sheetRef}
            mode="component"
            dismissible={false}
            title="Something went wrong"
            description="The app couldn't load properly. Please try again"
            confirmTitle="Retry"
            onConfirmPress={init}
          />
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
