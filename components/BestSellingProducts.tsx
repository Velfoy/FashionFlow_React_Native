import { useResponsive } from "@/hooks/useResponsive"; // Adjust the import path as needed
import { colors } from "@/styles/colors";
import { spacing } from "@/styles/spacing";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

// Define the Product type
type Product = {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  owner: string;
};

const getProducts = (): Product[] => {
  const images = [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop", // Shoes 1
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop", // Shoes 2
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&h=500&fit=crop", // Shoes 3
    "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500&h=500&fit=crop", // Shoes 4
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop", // Shoes 5
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop", // Shoes 6
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&h=500&fit=crop", // Shoes 7
    "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500&h=500&fit=crop", // Shoes 8
  ];

  return Array(8)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      title: "Angie's Boomchickapop Sweet & Salty Kettle Corn",
      price: 2499.0,
      originalPrice: 4999.0,
      image: images[index % images.length], // Cycle through available images
      rating: 5,
      owner: "StarKist",
    }));
};

const tabs = [
  "All",
  "Shoes",
  "Accessories",
  "T-shirts",
  "Pants",
  "Skirts",
  "Hats",
];

export default function BestSellingProducts() {
  const products = getProducts();
  const { width, isSmallDevice, isMediumDevice, isLargeDevice, isTablet } =
    useResponsive();

  // Calculate number of columns based on screen size using responsive hook
  const getColumnsCount = () => {
    if (width >= 1200) return 4; // Large screens (tablets, desktop)
    if (isTablet || width >= 768) return 3; // Medium screens (tablets)
    if (width >= 480) return 2; // Small tablets
    return 1; // Mobile phones
  };

  const columns = getColumnsCount();

  // Calculate card width based on columns (now within 90% container)
  const getCardWidth = () => {
    const containerWidth = width * 0.9; // 90% of screen width
    const containerPadding = spacing.lg * 2;
    const gap = spacing.md;
    const availableWidth =
      containerWidth - containerPadding - gap * (columns - 1);
    return availableWidth / columns;
  };

  const cardWidth = getCardWidth();

  // Define renderItem with proper typing
  const renderProduct = ({ item }: { item: Product }) => (
    <View style={[styles.bestCard, { width: cardWidth }]}>
      <View style={styles.bestBadge}>
        <Text style={styles.badgeText}>New</Text>
      </View>

      <Pressable style={styles.cartAdd} onPress={() => router.push("/cart")}>
        <Ionicons name="cart" size={18} color={colors.black} />
      </Pressable>

      <Image
        source={{ uri: item.image }}
        style={[styles.bestImage, { height: cardWidth * 0.75 }]} // Maintain aspect ratio
        contentFit="cover"
      />

      <View style={styles.bestCardContent}>
        <View style={styles.bestCardNameDiv}>
          <Text style={styles.bestCardTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Pressable
            style={styles.bestCardLink}
            onPress={() =>
              router.push({
                pathname: "/product/[id]",
                params: { id: item.id },
              })
            }
          >
            <Ionicons name="arrow-forward" size={15} color={colors.white} />
          </Pressable>
        </View>

        <View style={styles.bestRatingD}>
          <Text style={styles.bestRating}>{"★".repeat(item.rating)}</Text>
          <Text style={styles.bestRatingNum}>({item.rating}.0)</Text>
        </View>

        <Text style={styles.bestOwner}>
          By <Text style={styles.ownerName}>{item.owner}</Text>
        </Text>

        <View style={styles.bestPriceRow}>
          <Text style={styles.bestPrice}>${item.price.toFixed(2)}</Text>
          <Text style={styles.bestOriginalPrice}>
            ${item.originalPrice.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.bestContainer}>
      {/* Header - full width */}
      <View style={styles.bestHeader}>
        <Text style={styles.bestTitle}>Best selling products</Text>
        <ScrollableTabs />
      </View>

      {/* Cards container - 90% width */}
      <View style={styles.cardsContainer}>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item: Product) => item.id.toString()}
          numColumns={columns}
          contentContainerStyle={styles.bestGrid}
          columnWrapperStyle={columns > 1 ? styles.columnWrapper : undefined}
          scrollEnabled={false}
          key={columns} // Re-render when columns change
        />
      </View>
    </View>
  );
}

// Separate component for scrollable tabs on small screens
const ScrollableTabs = () => {
  const { isTablet } = useResponsive();

  // Use isTablet instead of checking width directly
  if (!isTablet) {
    return (
      <FlatList
        horizontal
        data={tabs}
        renderItem={({ item }) => (
          <Pressable style={styles.bestTabButton}>
            <Text style={styles.tabText}>{item}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollableTabs}
      />
    );
  }

  return (
    <View style={styles.bestTabs}>
      {tabs.map((tab) => (
        <Pressable key={tab} style={styles.bestTabButton}>
          <Text style={styles.tabText}>{tab}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bestContainer: {
    width: "100%",
    alignSelf: "center",
  },
  bestHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
    flexWrap: "wrap",
    gap: spacing.md,
    alignSelf: "center",
  },
  cardsContainer: {
    width: "95%",
    alignSelf: "center",
    padding: spacing.lg,
  },
  bestTitle: {
    fontSize: 24,
    fontWeight: "700",
    flexShrink: 1,
  },
  bestTabs: {
    flexDirection: "row",
    gap: spacing.md,
    flexWrap: "wrap",
    justifyContent: "flex-end",
    flex: 1,
  },
  scrollableTabs: {
    gap: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  bestTabButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
  },
  bestGrid: {
    gap: spacing.md,
  },
  columnWrapper: {
    justifyContent: "space-between",
    gap: spacing.md,
  },
  bestCard: {
    backgroundColor: colors.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.lg,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    minWidth: 100, // Minimum card width
  },
  bestBadge: {
    position: "absolute",
    top: 12,
    left: -2,
    backgroundColor: colors.black,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 1,
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "600",
  },
  cartAdd: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 1,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.xs,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bestImage: {
    width: "100%",
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  bestCardContent: {
    width: "100%",
  },
  bestCardNameDiv: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.xs,
  },
  bestCardTitle: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
    marginRight: spacing.sm,
    lineHeight: 18,
  },
  bestCardLink: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  bestRatingD: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  bestRating: {
    fontSize: 14,
    color: "#FFD700", // Gold color for stars
    letterSpacing: 1,
  },
  bestRatingNum: {
    fontSize: 12,
    color: "#B6B6B6",
    marginLeft: spacing.xs,
  },
  bestOwner: {
    fontSize: 12,
    color: "#B6B6B6",
    marginBottom: spacing.xs,
  },
  ownerName: {
    color: colors.black,
    fontWeight: "600",
  },
  bestPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  bestPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.black,
  },
  bestOriginalPrice: {
    fontSize: 14,
    textDecorationLine: "line-through",
    color: colors.textSecondary,
  },
});
