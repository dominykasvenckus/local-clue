import { TabBar } from "@/components";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="clues" options={{ title: "Clues" }} />
      <Tabs.Screen name="more" options={{ title: "More" }} />
      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
  );
}
