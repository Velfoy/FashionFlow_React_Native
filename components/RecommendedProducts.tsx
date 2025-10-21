import { colors } from "@/styles/colors";
import { spacing } from "@/styles/spacing";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const products = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format",
    name: "Nike Air Max 270",
    brand: "Nike",
    price: 2499,
    oldPrice: 4999,
    rating: 5.0,
    isNew: true,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&auto=format",
    name: "Adidas Ultraboost",
    brand: "Adidas",
    price: 2199,
    oldPrice: 4599,
    rating: 4.8,
    isNew: true,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop&auto=format",
    name: "Puma RS-X",
    brand: "Puma",
    price: 1899,
    oldPrice: 3999,
    rating: 4.5,
    isNew: false,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&h=400&fit=crop&auto=format",
    name: "New Balance 574",
    brand: "New Balance",
    price: 1999,
    oldPrice: 4299,
    rating: 4.7,
    isNew: true,
  },
];

export default function RecommendedProducts() {
  return (
    <View style={styles.recommendedContainer}>
      <View style={styles.recommendedHeader}>
        <Text style={styles.headerTitle}>Recommended products</Text>
        <Pressable>
          <Text style={styles.allDeals}>All Products →</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.recommendedGrid}
      >
        {products.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <View style={styles.imageSection}>
              {product.isNew && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>New</Text>
                </View>
              )}
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
                contentFit="cover"
              />
              <Pressable
                style={styles.cartBtn}
                onPress={() =>
                  router.push({
                    pathname: "/product/[id]",
                    params: { id: product.id },
                  })
                }
              >
                <Ionicons name="cart" size={16} color={colors.black} />
              </Pressable>
            </View>

            <View style={styles.productInfo}>
              <View style={styles.bestNaming}>
                <Text style={styles.productName} numberOfLines={2}>
                  {product.name}
                </Text>
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/product/[id]",
                      params: { id: product.id },
                    })
                  }
                >
                  <Ionicons
                    name="arrow-forward"
                    size={16}
                    color={colors.black}
                  />
                </Pressable>
              </View>
              <Text style={styles.brand}>By {product.brand}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>
                  {"★".repeat(Math.floor(product.rating))}
                </Text>
                <Text style={styles.ratingNum}>({product.rating})</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                <Text style={styles.oldPrice}>
                  ${product.oldPrice.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  recommendedContainer: {
    width: "90%",
    alignSelf: "center",
    marginBottom: spacing.lg,
  },
  recommendedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  allDeals: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: "600",
  },
  recommendedGrid: {
    paddingVertical: spacing.sm,
    gap: spacing.lg,
  },
  productCard: {
    width: 200,
    backgroundColor: colors.white,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 6,
    overflow: "hidden",
  },
  imageSection: {
    position: "relative",
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 180,
  },
  badge: {
    position: "absolute",
    top: 12,
    left: 0,
    backgroundColor: colors.black,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
    zIndex: 1,
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "600",
  },
  cartBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productInfo: {
    padding: spacing.md,
    backgroundColor: colors.white,
  },
  bestNaming: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.xs,
    gap: spacing.xs,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
    lineHeight: 18,
  },
  brand: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  rating: {
    fontSize: 14,
    color: "#FFD700",
    letterSpacing: 1,
  },
  ratingNum: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xs,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.black,
  },
  oldPrice: {
    fontSize: 14,
    textDecorationLine: "line-through",
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
});
