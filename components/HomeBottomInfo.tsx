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
  return (
    <View style={styles.heroContainer}>
      <View style={styles.heroBanner}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop&auto=format",
          }}
          style={styles.bannerBackground}
          contentFit="cover"
        />
        <View style={styles.overlay} />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>
            Stay home & update your style from our shop
          </Text>
          <Text style={styles.heroSubtitle}>
            Start Your Daily Shopping with{" "}
            <Text style={styles.highlight}>FashionFlow</Text>
          </Text>
          <View style={styles.heroInputGroup}>
            <TextInput
              style={styles.heroInput}
              placeholder="✉ Your email address"
              placeholderTextColor={colors.textSecondary}
            />
            <Pressable style={styles.subscribeButton}>
              <Text style={styles.subscribeButtonText}>Subscribe</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.featuresRow}>
        {features.map((item, idx) => (
          <View key={idx} style={styles.featureCard}>
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
    height: 300,
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
  heroTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.white,
    marginBottom: spacing.sm,
    lineHeight: 34,
  },
  heroSubtitle: {
    fontSize: 16,
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
  heroInput: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: 14,
    fontWeight: "500",
  },
  subscribeButton: {
    backgroundColor: colors.black,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    justifyContent: "center",
  },
  subscribeButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  featuresRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  featureCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
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
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 2,
    color: colors.black,
  },
  featureSubtitle: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: "500",
  },
});
