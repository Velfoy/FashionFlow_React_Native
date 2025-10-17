import { colors } from "@/styles/colors";
import { spacing } from "@/styles/spacing";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const images = [
  "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=500&h=500&fit=crop", // Clock 1
  "https://images.unsplash.com/photo-1512852939750-1305098529bf?w=500&h=500&fit=crop", // Clock 2
  "https://images.unsplash.com/photo-1546587348-d12660c30c50?w=500&h=500&fit=crop", // Clock 3
  "https://images.unsplash.com/photo-1499364786053-c25f0d1e039f?w=500&h=500&fit=crop", // Clock 4
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop", // Clock 5
];

const reviews = Array(11).fill({
  name: "Valeriia Zlydar",
  rating: 5,
  text: "Lorem ipsum lorem ipsum lorem ipsum...Lorem ipsum lorem ipsum lorem ipsum.",
  date: "24 marca 2025",
});

export default function ProductDetailPage() {
  const { id } = useLocalSearchParams();
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

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Details */}
        <View style={styles.topDetails}>
          {/* Images */}
          <View style={styles.detailsImages}>
            <View style={styles.leftImages}>
              {images.slice(1).map((img, index) => (
                <Pressable key={index} onPress={() => openPopup(index + 1)}>
                  <Image source={img} style={styles.imageStandard} />
                </Pressable>
              ))}
            </View>
            <Pressable onPress={() => openPopup(0)}>
              <Image source={images[0]} style={styles.rightBigImage} />
            </Pressable>
          </View>

          {/* Cart Details */}
          <View style={styles.cartDetails}>
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

            <View style={styles.sizeDivChoose}>
              {["S", "M", "L", "XL", "2XL"].map((size) => (
                <Pressable
                  key={size}
                  style={[
                    styles.size,
                    selectedSize === size && styles.sizeActive,
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

            <View style={styles.addToCart}>
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
              <Pressable style={styles.addToCartButton}>
                <Ionicons name="cart-outline" size={16} color={colors.white} />
                <Text style={styles.addToCartButtonText}>Add to cart</Text>
              </Pressable>
            </View>

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

        {/* Second Details */}
        <View style={styles.secondDetails}>
          <Text style={styles.productTitle}>Black watch Omega yg87JF</Text>
          <Text style={styles.productDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            imperdiet finibus...
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

        {/* Comments Section */}
        <View style={styles.commentsSection}>
          <View style={styles.commentsHeader}>
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
          {reviews.map((review, i) => (
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
            <Text style={styles.loadMoreButtonText}>Więcej</Text>
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

          <Image source={images[currentImageIndex]} style={styles.popupImage} />

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
  topDetails: {
    flexDirection: "row",
    padding: spacing.md,
    gap: spacing.lg,
  },
  detailsImages: {
    flexDirection: "row",
    gap: spacing.lg,
  },
  leftImages: {
    flexDirection: "column",
    gap: spacing.md,
  },
  imageStandard: {
    width: 115,
    height: 115,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },
  rightBigImage: {
    width: 400,
    height: 500,
    borderRadius: 15,
  },
  cartDetails: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 6,
  },
  cartInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xl,
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
  productTitle: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: spacing.md,
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
  commentsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
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
    paddingHorizontal: spacing.xl,
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
  imagePopupOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.92)",
    justifyContent: "center",
    alignItems: "center",
  },
  popupImage: {
    width: width * 0.9,
    height: width * 0.9,
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
});
