import { Header } from "@/components";
import { colors } from "@/constants";
import { useApplicationStore } from "@/storage/stores";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
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
          </Stack.Protected>
          <Stack.Protected guard={!isOnboarded}>
            <Stack.Screen name="onboarding" />
          </Stack.Protected>
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
