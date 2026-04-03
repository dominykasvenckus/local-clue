import { Button, OnboardingCard, Typography } from "@/components";
import { colors } from "@/constants";
import { onboardingCards } from "@/constants/onboardingCards";
import { useApplicationStore } from "@/storage/stores";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Onboarding() {
  const insets = useSafeAreaInsets();
  const setIsOnboarded = useApplicationStore((state) => state.setIsOnboarded);

  const handleGetStartedPress = () => {
    setIsOnboarded(true);
  };

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
          showsVerticalScrollIndicator={false}
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
            Save, organize, and manage your password clues in one simple place.
          </Typography>
          <View style={styles.cardsContainer}>
            {onboardingCards.map((card, index) => (
              <OnboardingCard key={index} {...card} />
            ))}
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          paddingBottom: insets.bottom + 24,
          paddingLeft: insets.left + 24,
          paddingRight: insets.right + 24,
        }}
      >
        <LinearGradient
          colors={[colors.background, colors.backgroundTransparent]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.gradient}
          pointerEvents="none"
        />
        <Button
          text="Get started"
          iconName="arrow-right"
          onPress={handleGetStartedPress}
        />
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
    top: -40,
    left: 0,
    right: 0,
  },
});
