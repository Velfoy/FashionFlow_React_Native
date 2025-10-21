// app/product/[id].tsx - UPDATED VERSION WITH WORKING CART
import HeaderNav from "@/components/HeaderNav";
import { addToCart } from "@/data/mockData";
import { useResponsive } from "@/hooks/useResponsive";
import { colors } from "@/styles/colors";
import { spacing } from "@/styles/spacing";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// Mock data - using the same data structure from your recommended products
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
    description:
      "Experience unparalleled comfort and style with the Nike Air Max 270. Featuring the largest Air Max unit yet, these shoes provide maximum cushioning for all-day wear. The lightweight, breathable upper and innovative outsole design make them perfect for both athletic activities and casual wear.",
    color: "black/white",
    material: "synthetic mesh",
    condition: "new",
    views: 149,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1512852939750-1305098529bf?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1546587348-d12660c30c50?w=500&h=500&fit=crop",
    ],
    tags: [
      "👟 running shoes",
      "⭐ premium",
      "💨 air max technology",
      "🏃 athletic",
    ],
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
    description:
      "The Adidas Ultraboost combines responsive cushioning with a sleek, modern design. Featuring Boost midsole technology for exceptional energy return and a Primeknit upper for adaptive fit and comfort. Perfect for runners and style enthusiasts alike.",
    color: "core black",
    material: "primeknit",
    condition: "new",
    views: 203,
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1499364786053-c25f0d1e039f?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
    ],
    tags: [
      "👟 boost technology",
      "🎯 performance",
      "💫 energy return",
      "🏃 running",
    ],
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
    description:
      "Bold and futuristic, the Puma RS-X brings retro-inspired design with modern comfort. The chunky silhouette and mixed-material upper create a unique street-style look, while the comfortable cushioning ensures all-day wearability.",
    color: "multi-color",
    material: "synthetic leather",
    condition: "new",
    views: 87,
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    ],
    tags: ["👟 retro style", "🎨 colorful", "🛸 futuristic", "🚶 casual wear"],
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
    description:
      "A timeless classic reimagined for modern comfort. The New Balance 574 features ENCAP midsole technology for superior support and durability. The versatile design transitions seamlessly from casual outings to light athletic activities.",
    color: "grey",
    material: "suede/mesh",
    condition: "new",
    views: 124,
    images: [
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1512852939750-1305098529bf?w=500&h=500&fit=crop",
    ],
    tags: ["👟 classic", "💎 durable", "🎯 versatile", "🚶 everyday wear"],
  },
];

// Mock reviews data
const reviews = [
  {
    id: 1,
    productId: 1,
    name: "Valeriia Zlydar",
    rating: 5,
    text: "Absolutely love these shoes! The comfort is unbelievable and they look even better in person. Perfect for both workouts and casual wear.",
    date: "24 marca 2025",
    avatar:
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=500&h=500&fit=crop",
  },
  {
    id: 2,
    productId: 1,
    name: "John Smith",
    rating: 4,
    text: "Great shoes overall. Very comfortable and good looking. The sizing was perfect for me. Would recommend!",
    date: "20 marca 2025",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop",
  },
  {
    id: 3,
    productId: 1,
    name: "Sarah Johnson",
    rating: 5,
    text: "Best purchase I've made this year! The quality exceeds expectations and they're so comfortable for all-day wear.",
    date: "18 marca 2025",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=500&h=500&fit=crop",
  },
  ...Array.from({ length: 8 }, (_, i) => ({
    id: i + 4,
    productId: 1,
    name: `Customer ${i + 1}`,
    rating: Math.floor(Math.random() * 2) + 4,
    text: `Excellent quality and comfort. The shoes are exactly as described and very comfortable for daily use. Highly recommended! Review ${
      i + 4
    }.`,
    date: `${i + 15} marca 2025`,
    avatar: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&${i}`,
  })),
];

export default function ProductDetailPage() {
  const { id } = useLocalSearchParams();
  const { isTablet, isLandscape, width: screenWidth } = useResponsive();

  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(1);
  const [popupOpen, setPopupOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comment, setComment] = useState("");
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [product, setProduct] = useState<any>(null);
  const [productReviews, setProductReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayedReviewsCount, setDisplayedReviewsCount] = useState(5);

  // Load product data based on ID
  useEffect(() => {
    const productId = parseInt(Array.isArray(id) ? id[0] : id || "1");
    const foundProduct = products.find((p) => p.id === productId);

    if (foundProduct) {
      setProduct(foundProduct);
      const productReviews = reviews.filter(
        (review) => review.productId === productId
      );
      setProductReviews(productReviews);
    }

    setLoading(false);
  }, [id]);

  const openPopup = (index: number) => {
    setCurrentImageIndex(index);
    setPopupOpen(true);
  };

  const nextImage = () => {
    if (!product) return;
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    if (!product) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleAddComment = () => {
    if (!comment.trim() || !product) return;

    const newReview = {
      id: Date.now(),
      productId: product.id,
      name: "You",
      rating: 5,
      text: comment,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop",
    };

    setProductReviews((prev) => [newReview, ...prev]);
    setComment("");
    Alert.alert("Success", "Your review has been added!");
  };

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product, quantity, selectedSize);
    Alert.alert(
      "Added to Cart",
      `${quantity} x ${product.name} (${selectedSize}) has been added to your cart!`,
      [
        { text: "Continue Shopping", style: "cancel" },
        { text: "View Cart", onPress: () => router.push("/(tabs)/cart") },
      ]
    );
  };

  const loadMoreReviews = () => {
    const newCount = displayedReviewsCount + 5;
    setDisplayedReviewsCount(newCount);
  };

  // Responsive image sizes
  const smallImageSize = isTablet ? 100 : 80;
  const bigImageWidth = isLandscape
    ? isTablet
      ? screenWidth * 0.35
      : screenWidth * 0.45
    : isTablet
    ? screenWidth * 0.5
    : screenWidth * 0.9;
  const bigImageHeight = isLandscape
    ? isTablet
      ? 400
      : 300
    : isTablet
    ? 500
    : 400;

  // Layout direction based on orientation
  const useVerticalLayout = !isLandscape || !isTablet;

  if (loading) {
    return (
      <View style={styles.container}>
        <HeaderNav showLogo={false} showBack={true} title="Product Details" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.black} />
          <Text style={styles.loadingText}>Loading product...</Text>
        </View>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <HeaderNav showLogo={false} showBack={true} title="Product Details" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Product not found</Text>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const displayedReviews = productReviews.slice(0, displayedReviewsCount);

  return (
    <View style={styles.container}>
      <HeaderNav showLogo={false} showBack={true} title="Product Details" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          isLandscape && !isTablet && { paddingBottom: spacing.xl }
        }
      >
        {/* Top Details - Responsive Layout */}
        <View
          style={[
            styles.topDetails,
            useVerticalLayout && styles.topDetailsVertical,
            isLandscape && styles.topDetailsLandscape,
            isTablet && styles.topDetailsTablet,
          ]}
        >
          {/* Images Section */}
          <View
            style={[
              styles.detailsImages,
              useVerticalLayout && styles.detailsImagesVertical,
              isLandscape && !isTablet && styles.detailsImagesLandscapePhone,
            ]}
          >
            {/* Small Images */}
            <ScrollView
              horizontal={useVerticalLayout}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={[
                styles.leftImages,
                useVerticalLayout && styles.leftImagesHorizontal,
                isLandscape && !isTablet && styles.leftImagesLandscapePhone,
              ]}
              contentContainerStyle={
                useVerticalLayout && styles.leftImagesContent
              }
            >
              {product.images.slice(1).map((img: string, index: number) => (
                <Pressable key={index} onPress={() => openPopup(index + 1)}>
                  <Image
                    source={img}
                    style={[
                      styles.imageStandard,
                      {
                        width: smallImageSize,
                        height: smallImageSize,
                      },
                      isLandscape &&
                        !isTablet &&
                        styles.imageStandardLandscapePhone,
                    ]}
                  />
                </Pressable>
              ))}
            </ScrollView>

            {/* Big Image */}
            <Pressable onPress={() => openPopup(0)}>
              <Image
                source={product.images[0]}
                style={[
                  styles.rightBigImage,
                  {
                    width: bigImageWidth,
                    height: bigImageHeight,
                  },
                  isLandscape &&
                    !isTablet &&
                    styles.rightBigImageLandscapePhone,
                ]}
              />
            </Pressable>
          </View>

          {/* Cart Details */}
          <View
            style={[
              styles.cartDetails,
              isLandscape && !isTablet && styles.cartDetailsLandscapePhone,
              isLandscape && isTablet && styles.cartDetailsLandscapeTablet,
            ]}
          >
            <View style={styles.cartInfo}>
              <View style={styles.cartRating}>
                <Text style={styles.ratingStar}>⭐ {product.rating} - </Text>
                <Text style={styles.amountOfViews}>{product.views} views</Text>
              </View>
              <View style={styles.cartPricing}>
                <Text style={styles.currentPrice}>
                  ${product.price.toFixed(2)}
                </Text>
                <Text style={styles.firstPrice}>
                  ${product.oldPrice.toFixed(2)}
                </Text>
              </View>
            </View>

            <Text style={styles.brandText}>By {product.brand}</Text>

            <Text style={styles.sizeChosen}>Size: {selectedSize}</Text>

            {/* Size Selection - Responsive */}
            <View style={styles.sizeDivChoose}>
              {["S", "M", "L", "XL", "2XL"].map((size) => (
                <Pressable
                  key={size}
                  style={[
                    styles.size,
                    selectedSize === size && styles.sizeActive,
                    isTablet && styles.sizeTablet,
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      selectedSize === size && styles.sizeTextActive,
                    ]}
                  >
                    {size}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Add to Cart - Responsive */}
            <View
              style={[
                styles.addToCart,
                isLandscape && !isTablet && styles.addToCartLandscape,
              ]}
            >
              <View style={styles.amountToAdd}>
                <Pressable
                  style={styles.amountButton}
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Text style={styles.amountButtonText}>-</Text>
                </Pressable>
                <Text style={styles.amountNumber}>{quantity}</Text>
                <Pressable
                  style={styles.amountButton}
                  onPress={() => setQuantity(quantity + 1)}
                >
                  <Text style={styles.amountButtonText}>+</Text>
                </Pressable>
              </View>
              <Pressable
                style={[
                  styles.addToCartButton,
                  isLandscape && !isTablet && styles.addToCartButtonCompact,
                ]}
                onPress={handleAddToCart}
              >
                <Ionicons name="cart-outline" size={16} color={colors.white} />
                <Text style={styles.addToCartButtonText}>Add to cart</Text>
              </Pressable>
            </View>

            {/* Price Summary */}
            <View style={styles.priceAll}>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>
                  ${product.price.toFixed(2)}
                </Text>
                <Text style={styles.priceValue}>
                  ${(product.price * quantity).toFixed(2)}
                </Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Tax estimate</Text>
                <Text style={styles.priceValue}>$0.00</Text>
              </View>
              <View style={[styles.priceRow, styles.priceTotal]}>
                <Text style={styles.priceTotalLabel}>Total</Text>
                <Text style={styles.priceTotalValue}>
                  ${(product.price * quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Second Details */}
        <View
          style={[styles.secondDetails, isTablet && styles.secondDetailsTablet]}
        >
          <Text
            style={[styles.productTitle, isTablet && styles.productTitleTablet]}
          >
            {product.name}
          </Text>
          <Text style={styles.productDescription}>{product.description}</Text>

          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.productMeta}>
            <Text style={styles.metaText}>
              <Text style={styles.metaBold}>Color:</Text> {product.color}
            </Text>
            <Text style={styles.metaText}>
              <Text style={styles.metaBold}>Material:</Text> {product.material}
            </Text>
            <Text style={styles.metaText}>
              <Text style={styles.metaBold}>Condition:</Text>{" "}
              {product.condition}
            </Text>
            <Text style={styles.metaText}>
              <Text style={styles.metaBold}>Brand:</Text> {product.brand}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Keywords</Text>
          <View style={styles.productTags}>
            {product.tags.map((tag: string, index: number) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Comments Section */}
        <View
          style={[
            styles.commentsSection,
            isTablet && styles.commentsSectionTablet,
          ]}
        >
          <View
            style={[
              styles.commentsHeader,
              isLandscape && !isTablet && styles.commentsHeaderCompact,
            ]}
          >
            <View>
              <Text style={styles.commentsTitle}>Customer reviews</Text>
              <Text style={styles.commentsRating}>
                {"★".repeat(5)}{" "}
                <Text style={styles.reviewCount}>
                  ({productReviews.length} reviews)
                </Text>
              </Text>
            </View>
            <Pressable style={styles.addCommentButton}>
              <Text style={styles.addCommentButtonText}>Add comment</Text>
            </Pressable>
          </View>

          <TextInput
            style={styles.commentInput}
            placeholder="Add your review..."
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
          />

          <Pressable
            style={[
              styles.submitCommentButton,
              !comment.trim() && styles.submitCommentButtonDisabled,
            ]}
            onPress={handleAddComment}
            disabled={!comment.trim()}
          >
            <Text style={styles.submitCommentButtonText}>Submit Review</Text>
          </Pressable>

          <Text style={styles.reviewsTitle}>
            {displayedReviews.length} reviews
          </Text>

          {displayedReviews.map((review, i) => (
            <View key={review.id} style={styles.commentItem}>
              <Image source={review.avatar} style={styles.commentAvatar} />
              <View style={styles.commentContent}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentName}>{review.name}</Text>
                  <Text style={styles.commentStars}>
                    {"★".repeat(review.rating)}
                  </Text>
                  {review.name === "You" && (
                    <Pressable
                      onPress={() =>
                        setOpenDropdown(
                          openDropdown === review.id ? null : review.id
                        )
                      }
                    >
                      <Ionicons
                        name="ellipsis-vertical"
                        size={18}
                        color={colors.textSecondary}
                      />
                    </Pressable>
                  )}
                </View>
                <Text style={styles.commentText}>{review.text}</Text>
                <Text style={styles.commentDate}>{review.date}</Text>

                {openDropdown === review.id && (
                  <View style={styles.dropdownMenu}>
                    <Pressable
                      style={styles.dropdownItem}
                      onPress={() => {
                        setComment(review.text);
                        setOpenDropdown(null);
                      }}
                    >
                      <Text>Edit</Text>
                    </Pressable>
                    <Pressable
                      style={styles.dropdownItem}
                      onPress={() => {
                        setProductReviews((prev) =>
                          prev.filter((r) => r.id !== review.id)
                        );
                        setOpenDropdown(null);
                      }}
                    >
                      <Text style={styles.deleteText}>Delete</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            </View>
          ))}

          {productReviews.length > displayedReviewsCount && (
            <Pressable style={styles.loadMoreButton} onPress={loadMoreReviews}>
              <Text style={styles.loadMoreButtonText}>
                {isTablet ? "Load More Reviews" : "Load More"}
              </Text>
            </Pressable>
          )}
        </View>
      </ScrollView>

      {/* Image Popup Modal */}
      <Modal visible={popupOpen} transparent animationType="fade">
        <View style={styles.imagePopupOverlay}>
          <Pressable
            style={styles.popupClose}
            onPress={() => setPopupOpen(false)}
          >
            <Text style={styles.popupCloseText}>×</Text>
          </Pressable>

          <Pressable
            style={[styles.popupArrow, styles.popupArrowLeft]}
            onPress={prevImage}
          >
            <Text style={styles.popupArrowText}>❮</Text>
          </Pressable>

          <Image
            source={product.images[currentImageIndex]}
            style={[
              styles.popupImage,
              {
                width: screenWidth * 0.9,
                height: screenWidth * 0.9,
              },
            ]}
          />

          <Pressable
            style={[styles.popupArrow, styles.popupArrowRight]}
            onPress={nextImage}
          >
            <Text style={styles.popupArrowText}>❯</Text>
          </Pressable>

          <Text style={styles.popupCounter}>
            {currentImageIndex + 1} / {product.images.length}
          </Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: 16,
    color: colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  errorText: {
    fontSize: 18,
    color: colors.error,
    marginBottom: spacing.lg,
  },
  backButton: {
    backgroundColor: colors.black,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 8,
  },
  backButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  // ... (keep all the existing styles from your original file)
  topDetails: {
    flexDirection: "column",
    padding: spacing.md,
    gap: spacing.lg,
  },
  topDetailsVertical: {
    flexDirection: "column",
  },
  topDetailsLandscape: {
    flexDirection: "row",
    paddingHorizontal: spacing.xl,
  },
  topDetailsTablet: {
    paddingHorizontal: spacing.xxl,
  },
  detailsImages: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "center",
  },
  detailsImagesVertical: {
    flexDirection: "column-reverse",
  },
  leftImages: {
    flexDirection: "column",
    gap: spacing.md,
  },
  leftImagesHorizontal: {
    flexDirection: "row",
  },
  leftImagesContent: {
    gap: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  imageStandard: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },
  rightBigImage: {
    borderRadius: 15,
  },
  cartDetails: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 6,
  },
  cartDetailsLandscapePhone: {
    flex: 1,
    padding: spacing.md,
  },
  cartDetailsLandscapeTablet: {
    flex: 1,
    padding: spacing.xl,
  },
  cartInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
    flexWrap: "wrap",
  },
  cartRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingStar: {
    color: "#f59e0b",
    fontSize: 14,
    fontWeight: "500",
  },
  amountOfViews: {
    fontSize: 14,
    textDecorationLine: "underline",
    color: colors.text,
  },
  cartPricing: {
    alignItems: "flex-end",
  },
  currentPrice: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.black,
  },
  firstPrice: {
    fontSize: 13,
    textDecorationLine: "line-through",
    color: colors.textSecondary,
  },
  brandText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    fontStyle: "italic",
  },
  sizeChosen: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: spacing.sm,
    color: colors.text,
  },
  sizeDivChoose: {
    flexDirection: "row",
    gap: spacing.sm,
    flexWrap: "wrap",
    marginBottom: spacing.md,
  },
  size: {
    width: 45,
    height: 45,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.lightGray,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  sizeTablet: {
    width: 55,
    height: 55,
  },
  sizeActive: {
    backgroundColor: colors.black,
    borderColor: colors.black,
  },
  sizeText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.black,
  },
  sizeTextActive: {
    color: colors.white,
  },
  addToCart: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  addToCartLandscape: {
    flexDirection: "column",
    gap: spacing.sm,
  },
  amountToAdd: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 50,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.xs,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  amountButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  amountButtonText: {
    fontSize: 18,
    fontWeight: "700",
  },
  amountNumber: {
    paddingHorizontal: spacing.lg,
    fontSize: 16,
    fontWeight: "500",
  },
  addToCartButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.black,
    paddingVertical: spacing.md,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
  },
  addToCartButtonCompact: {
    flex: 0,
    paddingHorizontal: spacing.lg,
  },
  addToCartButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  priceAll: {
    marginTop: spacing.md,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  priceLabel: {
    fontSize: 14,
    color: colors.text,
  },
  priceValue: {
    fontSize: 14,
    color: colors.text,
  },
  priceTotal: {
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.sm,
  },
  priceTotalLabel: {
    fontSize: 16,
    fontWeight: "700",
  },
  priceTotalValue: {
    fontSize: 16,
    fontWeight: "700",
  },
  secondDetails: {
    padding: spacing.lg,
  },
  secondDetailsTablet: {
    paddingHorizontal: spacing.xxl,
  },
  productTitle: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: spacing.md,
  },
  productTitleTablet: {
    fontSize: 36,
  },
  productDescription: {
    fontSize: 16,
    color: colors.gray,
    lineHeight: 24,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  productMeta: {
    marginBottom: spacing.lg,
  },
  metaText: {
    fontSize: 14,
    marginBottom: spacing.xs,
  },
  metaBold: {
    fontWeight: "700",
  },
  productTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  tag: {
    backgroundColor: colors.lightGray,
    borderRadius: 20,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  tagText: {
    fontSize: 14,
    color: colors.text,
  },
  commentsSection: {
    padding: spacing.lg,
  },
  commentsSectionTablet: {
    paddingHorizontal: spacing.xxl,
  },
  commentsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  commentsHeaderCompact: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  commentsTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  commentsRating: {
    fontSize: 14,
    color: colors.black,
  },
  reviewCount: {
    color: colors.textSecondary,
  },
  addCommentButton: {
    backgroundColor: colors.black,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 24,
  },
  addCommentButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  commentInput: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    minHeight: 100,
    fontSize: 15,
    marginBottom: spacing.md,
  },
  submitCommentButton: {
    backgroundColor: colors.black,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  submitCommentButtonDisabled: {
    backgroundColor: colors.gray,
    opacity: 0.6,
  },
  submitCommentButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: spacing.md,
  },
  commentItem: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  commentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  commentName: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  commentStars: {
    fontSize: 15,
    color: colors.black,
  },
  commentText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  commentDate: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  dropdownMenu: {
    position: "absolute",
    right: 0,
    top: 30,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 10,
  },
  dropdownItem: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  deleteText: {
    color: colors.error,
  },
  loadMoreButton: {
    alignSelf: "center",
    backgroundColor: colors.white,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.lightGray,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  loadMoreButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  imagePopupOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.92)",
    justifyContent: "center",
    alignItems: "center",
  },
  popupImage: {
    borderRadius: 12,
  },
  popupClose: {
    position: "absolute",
    top: 40,
    right: 40,
    zIndex: 1002,
  },
  popupCloseText: {
    color: colors.white,
    fontSize: 40,
  },
  popupArrow: {
    position: "absolute",
    top: "50%",
    zIndex: 1001,
  },
  popupArrowLeft: {
    left: 40,
  },
  popupArrowRight: {
    right: 40,
  },
  popupArrowText: {
    color: colors.white,
    fontSize: 60,
  },
  popupCounter: {
    position: "absolute",
    top: 40,
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  detailsImagesLandscapePhone: {
    maxHeight: 250,
    marginBottom: spacing.sm,
  },
  leftImagesLandscapePhone: {
    maxHeight: 200,
  },
  imageStandardLandscapePhone: {
    width: 60,
    height: 60,
  },
  rightBigImageLandscapePhone: {
    maxHeight: 200,
  },
});
