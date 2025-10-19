import { useResponsive } from "@/hooks/useResponsive";
import { colors } from "@/styles/colors";
import { spacing } from "@/styles/spacing";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface HeaderNavProps {
  showLogo?: boolean;
  showCart?: boolean;
  showAccount?: boolean;
  showBack?: boolean;
  title?: string;
}

export default function HeaderNav({
  showLogo = true,
  showCart = true,
  showAccount = true,
  showBack = false,
  title = "",
}: HeaderNavProps) {
  const { isTablet, isSmallDevice } = useResponsive();

  return (
    <SafeAreaView edges={["top"]} style={styles.headerClass}>
      {/* Main Header */}
      <View
        style={[styles.mainHeader, isSmallDevice && styles.mainHeaderSmall]}
      >
        {/* Left side - Back button or Logo */}
        <View style={styles.leftSection}>
          {showBack ? (
            <Pressable style={styles.backButton} onPress={() => router.back()}>
              <Ionicons
                name="arrow-back"
                size={isSmallDevice ? 20 : 24}
                color={colors.primary}
              />
              {title && (
                <Text
                  style={[
                    styles.headerTitle,
                    isSmallDevice && styles.headerTitleSmall,
                  ]}
                >
                  {title}
                </Text>
              )}
            </Pressable>
          ) : (
            showLogo && (
              <Pressable onPress={() => router.push("/")}>
                <Image
                  source={{
                    uri: "https://img.icons8.com/ios-glyphs/120/3B82F6/dove.png",
                  }}
                  style={[
                    styles.imageLogo,
                    isSmallDevice && styles.imageLogoSmall,
                    isTablet && styles.imageLogoTablet,
                  ]}
                  contentFit="contain"
                />
              </Pressable>
            )
          )}
        </View>

        {/* Center - Title (if no logo and no back button) */}
        {!showLogo && !showBack && title && (
          <View style={styles.centerSection}>
            <Text
              style={[
                styles.centerTitle,
                isSmallDevice && styles.centerTitleSmall,
              ]}
            >
              {title}
            </Text>
          </View>
        )}

        {/* Right side - Actions */}
        <View style={styles.rightActions}>
          {showCart && (
            <Pressable
              style={styles.iconButton}
              onPress={() => router.push("/cart")}
            >
              <Ionicons
                name="cart-outline"
                size={isSmallDevice ? 20 : 24}
                color={colors.primary}
              />
              <View style={[styles.badge, isSmallDevice && styles.badgeSmall]}>
                <Text
                  style={[
                    styles.badgeText,
                    isSmallDevice && styles.badgeTextSmall,
                  ]}
                >
                  2
                </Text>
              </View>
            </Pressable>
          )}

          {showAccount && (
            <Pressable
              style={styles.iconButton}
              onPress={() => router.push("/account")}
            >
              <Ionicons
                name="person-outline"
                size={isSmallDevice ? 20 : 24}
                color={colors.primary}
              />
            </Pressable>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerClass: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 2,
  },
  mainHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    minHeight: 50,
  },
  mainHeaderSmall: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    minHeight: 44,
  },
  leftSection: {
    flex: 1,
    justifyContent: "flex-start",
  },
  centerSection: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  rightActions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: spacing.sm,
  },
  imageLogo: {
    height: 32,
    width: 32,
  },
  imageLogoSmall: {
    height: 28,
    width: 28,
  },
  imageLogoTablet: {
    height: 36,
    width: 36,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },
  headerTitleSmall: {
    fontSize: 14,
  },
  centerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
    textAlign: "center",
  },
  centerTitleSmall: {
    fontSize: 14,
  },
  iconButton: {
    position: "relative",
    padding: 4,
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: colors.secondary,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  badgeSmall: {
    minWidth: 14,
    height: 14,
    borderWidth: 1,
  },
  badgeText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: "700",
  },
  badgeTextSmall: {
    fontSize: 7,
  },
});
