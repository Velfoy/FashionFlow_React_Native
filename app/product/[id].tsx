// app/product/[id].tsx - FULLY RESPONSIVE VERSION
import HeaderNav from "@/components/HeaderNav";
import { useResponsive } from "@/hooks/useResponsive";
import { colors } from "@/styles/colors";
import { spacing } from "@/styles/spacing";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const images = [
  "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=500&h=500&fit=crop",
  "https://images.unsplash.com/photo-1512852939750-1305098529bf?w=500&h=500&fit=crop",
  "https://images.unsplash.com/photo-1546587348-d12660c30c50?w=500&h=500&fit=crop",
  "https://images.unsplash.com/photo-1499364786053-c25f0d1e039f?w=500&h=500&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
];

const reviews = Array(11).fill({
  name: "Valeriia Zlydar",
  rating: 5,
  text: "Lorem ipsum lorem ipsum lorem ipsum...Lorem ipsum lorem ipsum lorem ipsum.",
  date: "24 marca 2025",
});

export default function ProductDetailPage() {
  const { id } = useLocalSearchParams();
  const { isTablet, isLandscape, width: screenWidth } = useResponsive();

  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(1);
  const [popupOpen, setPopupOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comment, setComment] = useState("");
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const openPopup = (index: number) => {
    setCurrentImageIndex(index);
    setPopupOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
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

  return (
    <View style={styles.container}>
      <HeaderNav showLogo={false} showBack={true} title="Product Details" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          isLandscape && !isTablet && { paddingBottom: spacing.xl }
        } // ADD THIS
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
              isLandscape && !isTablet && styles.detailsImagesLandscapePhone, // NEW
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
                isLandscape && !isTablet && styles.leftImagesLandscapePhone, // NEW
              ]}
              contentContainerStyle={
                useVerticalLayout && styles.leftImagesContent
              }
            >
              {images.slice(1).map((img, index) => (
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
                        styles.imageStandardLandscapePhone, // NEW
                    ]}
                  />
                </Pressable>
              ))}
            </ScrollView>

            {/* Big Image */}
            <Pressable onPress={() => openPopup(0)}>
              <Image
                source={images[0]}
                style={[
                  styles.rightBigImage,
                  {
                    width: bigImageWidth,
                    height: bigImageHeight,
                  },
                  isLandscape &&
                    !isTablet &&
                    styles.rightBigImageLandscapePhone, // NEW
                ]}
              />
            </Pressable>
          </View>

          {/* Cart Details - UPDATED for better landscape phone visibility */}
          <View
            style={[
              styles.cartDetails,
              isLandscape && !isTablet && styles.cartDetailsLandscapePhone,
              isLandscape && isTablet && styles.cartDetailsLandscapeTablet,
            ]}
          >
            <View style={styles.cartInfo}>
              <View style={styles.cartRating}>
                <Text style={styles.ratingStar}>⭐ 4.9 - </Text>
                <Text style={styles.amountOfViews}>149 views</Text>
              </View>
              <View style={styles.cartPricing}>
                <Text style={styles.currentPrice}>$2499.00</Text>
                <Text style={styles.firstPrice}>$4999.00</Text>
              </View>
            </View>

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
              >
                <Ionicons name="cart-outline" size={16} color={colors.white} />
                <Text style={styles.addToCartButtonText}>Add to cart</Text>
              </Pressable>
            </View>

            {/* Price Summary */}
            <View style={styles.priceAll}>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>$2499.00</Text>
                <Text style={styles.priceValue}>
                  ${(2499 * quantity).toFixed(2)}
                </Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Tax estimate</Text>
                <Text style={styles.priceValue}>$0.00</Text>
              </View>
              <View style={[styles.priceRow, styles.priceTotal]}>
                <Text style={styles.priceTotalLabel}>Total</Text>
                <Text style={styles.priceTotalValue}>
                  ${(2499 * quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Second Details - Responsive padding */}
        <View
          style={[styles.secondDetails, isTablet && styles.secondDetailsTablet]}
        >
          <Text
            style={[styles.productTitle, isTablet && styles.productTitleTablet]}
          >
            Black watch Omega yg87JF
          </Text>
          <Text style={styles.productDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            imperdiet finibus...Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Ut imperdiet finibus...Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </Text>

          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.productMeta}>
            <Text style={styles.metaText}>
              <Text style={styles.metaBold}>Color:</Text> black
            </Text>
            <Text style={styles.metaText}>
              <Text style={styles.metaBold}>Material:</Text> leather
            </Text>
            <Text style={styles.metaText}>
              <Text style={styles.metaBold}>Condition:</Text> max
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Keywords</Text>
          <View style={styles.productTags}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>🧢 men's fashion</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>❄ winter hat</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>🎨 colorful accessory</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>🔥 warm headwear</Text>
            </View>
          </View>
        </View>

        {/* Comments Section - Responsive */}
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
                ★★★★★{" "}
                <Text style={styles.reviewCount}>
                  ({reviews.length} reviews)
                </Text>
              </Text>
            </View>
            <Pressable style={styles.addCommentButton}>
              <Text style={styles.addCommentButtonText}>Add comment</Text>
            </Pressable>
          </View>

          <TextInput
            style={styles.commentInput}
            placeholder="Comment"
            value={comment}
            onChangeText={setComment}
            multiline
          />

          <Text style={styles.reviewsTitle}>{reviews.length} reviews</Text>
          {reviews.slice(0, isTablet ? 11 : 5).map((review, i) => (
            <View key={i} style={styles.commentItem}>
              <Image
                source="https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=500&h=500&fit=crop"
                style={styles.commentAvatar}
              />
              <View style={styles.commentContent}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentName}>{review.name}</Text>
                  <Text style={styles.commentStars}>★★★★★</Text>
                  <Pressable
                    onPress={() =>
                      setOpenDropdown(openDropdown === i ? null : i)
                    }
                  >
                    <Ionicons
                      name="ellipsis-vertical"
                      size={18}
                      color={colors.textSecondary}
                    />
                  </Pressable>
                </View>
                <Text style={styles.commentText}>{review.text}</Text>
                <Text style={styles.commentDate}>{review.date}</Text>

                {openDropdown === i && (
                  <View style={styles.dropdownMenu}>
                    <Pressable style={styles.dropdownItem}>
                      <Text>Edit</Text>
                    </Pressable>
                    <Pressable style={styles.dropdownItem}>
                      <Text>Delete</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            </View>
          ))}

          <Pressable style={styles.loadMoreButton}>
            <Text style={styles.loadMoreButtonText}>
              {isTablet ? "Load More Reviews" : "Więcej"}
            </Text>
          </Pressable>
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
            source={images[currentImageIndex]}
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
            {currentImageIndex + 1} / {images.length}
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
  // TOP DETAILS - RESPONSIVE
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
  // IMAGES SECTION - RESPONSIVE
  detailsImages: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "center",
  },
  detailsImagesVertical: {
    flexDirection: "column-reverse", // Big image on top, small images below
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
  // CART DETAILS - RESPONSIVE
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
    marginBottom: spacing.lg,
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
  // SECOND DETAILS - RESPONSIVE
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
  // COMMENTS SECTION - RESPONSIVE
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
    marginBottom: spacing.lg,
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
  // IMAGE POPUP - RESPONSIVE
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
    maxHeight: 250, // Limit height to ensure cart is visible
    marginBottom: spacing.sm,
  },
  leftImagesLandscapePhone: {
    maxHeight: 200,
  },
  imageStandardLandscapePhone: {
    width: 60, // Smaller thumbnails in landscape phone
    height: 60,
  },
  rightBigImageLandscapePhone: {
    maxHeight: 200, // Limit big image height
  },

  // // ENHANCE EXISTING LANDSCAPE PHONE STYLES
  // cartDetailsLandscapePhone: {
  //   flex: 1,
  //   padding: spacing.md,
  //   maxHeight: 380, // Ensure it doesn't overflow
  //   marginTop: spacing.sm,
  // },

  // // IMPROVE TOP CONTAINER FOR LANDSCAPE
  // topDetailsLandscape: {
  //   flexDirection: "row",
  //   paddingHorizontal: spacing.xl,
  //   alignItems: "flex-start", // Align items to top
  // },

  // // ENSURE SCROLLVIEW WORKS PROPERLY
  // container: {
  //   flex: 1,
  //   backgroundColor: colors.background,
  // },
});
