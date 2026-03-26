import { Button, IntroductionCard, Typography } from "@/components";
import { colors } from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function GetStarted() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.flex}>
      <View style={styles.flex}>
        <ScrollView
          contentContainerStyle={[
            styles.contentContainer,
            {
              paddingTop: insets.top + 24,
              paddingBottom: 48,
              paddingLeft: insets.left + 24,
              paddingRight: insets.right + 24,
            },
          ]}
        >
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="head-lightbulb-outline"
              size={32}
              color={colors.primary}
            />
          </View>
          <Typography
            color={colors.onSurface}
            fontSize={36}
            lineHeight={40}
            fontWeight="bold"
            textAlign="center"
            spacingBottom={16}
          >
            Welcome to Local Clue
          </Typography>
          <Typography
            fontSize={16}
            lineHeight={26}
            fontWeight="regular"
            textAlign="center"
            spacingBottom={48}
          >
            Save, organize, and manage your password hints in one simple place.
          </Typography>
          <View style={styles.cardsContainer}>
            <IntroductionCard
              iconName="lightbulb-on-outline"
              title="STORE HINTS, NOT PASSWORDS"
              description="Save only memory clues, never the actual password. Your secrets stay in your head, where they belong."
            />
            <IntroductionCard
              iconName="cellphone-lock"
              title="LOCAL-ONLY STORAGE"
              description="Everything is stored on this device and never leaves it. No sync, no servers, no cloud transfer."
            />
            <IntroductionCard
              iconName="magnify"
              title="FIND HINTS QUICKLY"
              description="Use search to find the hint you need in seconds, even when you have many saved hints."
            />
          </View>
        </ScrollView>
        <LinearGradient
          colors={[colors.background, colors.backgroundTransparent]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.gradient}
        />
      </View>
      <View
        style={{
          paddingBottom: insets.bottom + 24,
          paddingLeft: insets.left + 24,
          paddingRight: insets.right + 24,
        }}
      >
        <Button text="Get started" iconName="arrow-right" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },
  iconContainer: {
    alignSelf: "center",
    backgroundColor: colors.surfaceHigh,
    paddingHorizontal: 22,
    paddingVertical: 14,
    marginBottom: 34,
    borderRadius: 12,
  },
  cardsContainer: {
    gap: 16,
  },
  gradient: {
    height: 40,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
