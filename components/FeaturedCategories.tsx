import { useResponsive } from "@/hooks/useResponsive"; // Adjust the import path as needed
import { colors } from "@/styles/colors";
import { spacing } from "@/styles/spacing";
import { Image } from "expo-image";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const categories = [
  {
    name: "Jeans",
    items: 26,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop&auto=format",
  },
  {
    name: "Shorts",
    items: 23,
    image:
      "https://images.unsplash.com/photo-1506629905607-e48b0e67d879?w=200&h=200&fit=crop&auto=format",
  },
  {
    name: "T-shirts",
    items: 54,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop&auto=format",
  },
  {
    name: "Suits",
    items: 51,
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=200&fit=crop&auto=format",
  },
  {
    name: "Leggings",
    items: 56,
    image:
      "https://images.unsplash.com/photo-1506629905607-e48b0e67d879?w=200&h=200&fit=crop&auto=format",
  },
  {
    name: "Cardigans",
    items: 72,
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&h=200&fit=crop&auto=format",
  },
  {
    name: "Sneakers",
    items: 36,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop&auto=format",
  },
  {
    name: "Sandals",
    items: 123,
    image:
      "https://images.unsplash.com/photo-1542280756-74b2f55e73ab?w=200&h=200&fit=crop&auto=format",
  },
  {
    name: "Jackets",
    items: 34,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop&auto=format",
  },
  {
    name: "Accessories",
    items: 89,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=200&fit=crop&auto=format",
  },
];

export default function FeaturedCategories() {
  const { width, isSmallDevice, isTablet, isLargeDevice } = useResponsive();

  // Responsive card size calculation
  const getCardSize = () => {
    if (isLargeDevice) return { width: 120, imageSize: 50 };
    if (isTablet) return { width: 110, imageSize: 45 };
    if (isSmallDevice) return { width: 85, imageSize: 35 };
    return { width: 100, imageSize: 40 }; // default for medium devices
  };

  const cardSize = getCardSize();

  return (
    <View style={styles.featuredContainer}>
      <View
        style={[
          styles.featuredHeader,
          isSmallDevice && styles.featuredHeaderSmall,
        ]}
      >
        <Text
          style={[styles.headerTitle, isSmallDevice && styles.headerTitleSmall]}
        >
          Featured Categories
        </Text>

        {/* Responsive tabs - hide on small devices */}
        {!isSmallDevice && (
          <View style={styles.featuredTabs}>
            <Pressable style={styles.activeTab}>
              <Text style={styles.activeTabText}>Hats</Text>
            </Pressable>
            <Pressable style={styles.tab}>
              <Text style={styles.tabText}>Shoes</Text>
            </Pressable>
            <Pressable style={styles.tab}>
              <Text style={styles.tabText}>T-shirts</Text>
            </Pressable>
            <Pressable style={styles.tab}>
              <Text style={styles.tabText}>Pants</Text>
            </Pressable>
          </View>
        )}
      </View>

      {/* Show tabs below header on small devices */}
      {isSmallDevice && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScroll}
          style={styles.tabsScrollContainer}
        >
          <Pressable style={styles.activeTab}>
            <Text style={styles.activeTabText}>Hats</Text>
          </Pressable>
          <Pressable style={styles.tab}>
            <Text style={styles.tabText}>Shoes</Text>
          </Pressable>
          <Pressable style={styles.tab}>
            <Text style={styles.tabText}>T-shirts</Text>
          </Pressable>
          <Pressable style={styles.tab}>
            <Text style={styles.tabText}>Pants</Text>
          </Pressable>
        </ScrollView>
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.featuredScroll,
          isLargeDevice && styles.featuredScrollLarge,
        ]}
      >
        {categories.map((cat, index) => (
          <View
            key={index}
            style={[
              styles.featuredCard,
              {
                minWidth: cardSize.width,
                padding: isSmallDevice ? spacing.md : spacing.lg,
              },
            ]}
          >
            <Image
              source={{ uri: cat.image }}
              style={[
                styles.categoryImage,
                {
                  width: cardSize.imageSize,
                  height: cardSize.imageSize,
                },
              ]}
              contentFit="cover"
            />
            <Text
              style={[
                styles.categoryName,
                isSmallDevice && styles.categoryNameSmall,
              ]}
            >
              {cat.name}
            </Text>
            <Text
              style={[
                styles.categoryItems,
                isSmallDevice && styles.categoryItemsSmall,
              ]}
            >
              {cat.items} Items
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  featuredContainer: {
    width: "91%",
    alignSelf: "center",
    marginBottom: spacing.lg,
  },
  featuredHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  featuredHeaderSmall: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  headerTitleSmall: {
    fontSize: 20,
  },
  featuredTabs: {
    flexDirection: "row",
    gap: spacing.md,
  },
  tabsScrollContainer: {
    marginBottom: spacing.md,
  },
  tabsScroll: {
    gap: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  activeTab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.secondary,
    borderRadius: 20,
  },
  activeTabText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.white,
  },
  tab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  featuredScroll: {
    paddingVertical: spacing.sm,
    gap: spacing.lg,
  },
  featuredScrollLarge: {
    gap: spacing.xl,
  },
  featuredCard: {
    backgroundColor: colors.white,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F4F6FA",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryImage: {
    marginBottom: spacing.sm,
    borderRadius: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: spacing.xs,
    textAlign: "center",
  },
  categoryNameSmall: {
    fontSize: 14,
  },
  categoryItems: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
  },
  categoryItemsSmall: {
    fontSize: 12,
  },
});
