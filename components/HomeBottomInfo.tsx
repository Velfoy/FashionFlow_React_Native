import { useResponsive } from "@/hooks/useResponsive";
import { colors } from "@/styles/colors";
import { spacing } from "@/styles/spacing";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const features = [
  {
    icon: "💰",
    title: "Best prices & offers",
    subtitle: "Orders $50 or more",
  },
  {
    icon: "🚚",
    title: "Free delivery",
    subtitle: "24/7 services",
  },
  {
    icon: "🎁",
    title: "Great daily deal",
    subtitle: "When you sign up",
  },
  {
    icon: "🛍️",
    title: "Wide assortment",
    subtitle: "Mega Discounts",
  },
  {
    icon: "↩️",
    title: "Easy returns",
    subtitle: "Within 30 days",
  },
];

export default function HomeBottomInfo() {
  const { width } = useResponsive();

  // Use width-based logic for reliable responsive behavior
  const isMobile = width < 768;

  return (
    <View style={styles.heroContainer}>
      <View style={[styles.heroBanner, { height: isMobile ? 250 : 300 }]}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop&auto=format",
          }}
          style={styles.bannerBackground}
          contentFit="cover"
        />
        <View style={styles.overlay} />
        <View style={[styles.heroContent, isMobile && styles.heroContentSmall]}>
          <Text style={[styles.heroTitle, { fontSize: isMobile ? 22 : 28 }]}>
            Stay home & update your style from our shop
          </Text>
          <Text style={[styles.heroSubtitle, { fontSize: isMobile ? 14 : 16 }]}>
            Start Your Daily Shopping with{" "}
            <Text style={styles.highlight}>FashionFlow</Text>
          </Text>
          <View
            style={[
              styles.heroInputGroup,
              isMobile && styles.heroInputGroupSmall,
            ]}
          >
            <TextInput
              style={[styles.heroInput, isMobile && styles.heroInputSmall]}
              placeholder="✉ Your email address"
              placeholderTextColor={colors.textSecondary}
            />
            <Pressable
              style={[
                styles.subscribeButton,
                isMobile && styles.subscribeButtonSmall,
              ]}
            >
              <Text
                style={[
                  styles.subscribeButtonText,
                  isMobile && styles.subscribeButtonTextSmall,
                ]}
              >
                Subscribe
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Features Section - Simple mobile/desktop toggle */}
      <View style={isMobile ? styles.featuresColumn : styles.featuresRow}>
        {features.map((item, idx) => (
          <View
            key={idx}
            style={[
              styles.featureCard,
              isMobile ? styles.featureCardColumn : styles.featureCardRow,
            ]}
          >
            <Text style={styles.featureIcon}>{item.icon}</Text>
            <View style={styles.featureTexts}>
              <Text style={styles.featureTitle}>{item.title}</Text>
              <Text style={styles.featureSubtitle}>{item.subtitle}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    width: "90%",
    alignSelf: "center",
    marginBottom: spacing.lg,
  },
  heroBanner: {
    borderRadius: 25,
    overflow: "hidden",
    position: "relative",
    marginBottom: spacing.xl,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  bannerBackground: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  heroContent: {
    position: "absolute",
    left: spacing.xl,
    justifyContent: "center",
    height: "100%",
    maxWidth: 400,
    zIndex: 1,
  },
  heroContentSmall: {
    left: spacing.lg,
    right: spacing.lg,
    maxWidth: "100%",
  },
  heroTitle: {
    fontWeight: "700",
    color: colors.white,
    marginBottom: spacing.sm,
    lineHeight: 34,
  },
  heroSubtitle: {
    color: colors.white,
    marginBottom: spacing.lg,
    opacity: 0.9,
  },
  highlight: {
    color: "#FFD700",
    fontWeight: "700",
  },
  heroInputGroup: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 25,
    overflow: "hidden",
    maxWidth: 350,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  heroInputGroupSmall: {
    flexDirection: "column",
    borderRadius: 15,
    maxWidth: "100%",
  },
  heroInput: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: 14,
    fontWeight: "500",
  },
  heroInputSmall: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 14,
  },
  subscribeButton: {
    backgroundColor: colors.black,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    justifyContent: "center",
  },
  subscribeButtonSmall: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  subscribeButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  subscribeButtonTextSmall: {
    fontSize: 14,
  },
  // Features Layout - Make the difference very clear
  featuresRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  featuresColumn: {
    flexDirection: "column",
    gap: spacing.md,
  },
  featureCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureCardRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  featureCardColumn: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    width: "100%", // This ensures full width on mobile
  },
  featureIcon: {
    fontSize: 24,
    width: 40,
    height: 40,
    textAlign: "center",
    lineHeight: 40,
  },
  featureTexts: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
    color: colors.black,
  },
  featureSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: "500",
  },
});
