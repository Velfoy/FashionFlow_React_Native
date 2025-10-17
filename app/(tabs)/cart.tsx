// import HeaderNav from "@/components/HeaderNav";
import { colors } from "@/styles/colors";
import { spacing } from "@/styles/spacing";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const sellers = [
  {
    id: 1,
    name: "Seny",
    products: [
      {
        id: 1,
        name: "Dziewczęce, dzianinowe, kontrastowe, luźne, sportowe, swobodne spodnie",
        price: 2499.0,
        oldPrice: 4999.0,
        image: "https://via.placeholder.com/300x300/007bff/ffffff?text=Shoes",
      },
    ],
  },
  {
    id: 2,
    name: "Selle",
    products: [
      {
        id: 2,
        name: "Dziewczęce, dzianinowe, kontrastowe, luźne, sportowe, swobodne spodnie",
        price: 2499.0,
        oldPrice: 4999.0,
        image: "https://via.placeholder.com/300x300/28a745/ffffff?text=Shoes",
      },
      {
        id: 3,
        name: "Dziewczęce, dzianinowe, kontrastowe, luźne, sportowe, swobodne spodnie",
        price: 2499.0,
        oldPrice: 4999.0,
        image: "https://via.placeholder.com/300x300/dc3545/ffffff?text=Shoes",
      },
    ],
  },
];

export default function CartPage() {
  const [checkedState, setCheckedState] = useState(() =>
    sellers.map((seller) => ({
      sellerId: seller.id,
      checked: true,
      products: seller.products.map((p) => ({
        productId: p.id,
        checked: true,
      })),
    }))
  );
  const [allCompaniesChecked, setAllCompaniesChecked] = useState(true);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState("method-0");
  const [selectedPayment, setSelectedPayment] = useState("payment-0");
  const [quantities, setQuantities] = useState<Record<number, number>>(() => {
    const initial: Record<number, number> = {};
    sellers.forEach((seller) => {
      seller.products.forEach((product) => {
        initial[product.id] = 1;
      });
    });
    return initial;
  });
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState({
    name: "Valeriia Zlydar",
    phone: "883589324",
    email: "marsonyteam@gmail.com",
    deliveryPoint: "LOD51N al. Politechniki 1",
    address: "al. Politechniki Łódź łódzkie Poland 93-590",
  });

  const handleAllCompaniesToggle = () => {
    const newCheckedState = allCompaniesChecked
      ? sellers.map((seller) => ({
          sellerId: seller.id,
          checked: false,
          products: seller.products.map((p) => ({
            productId: p.id,
            checked: false,
          })),
        }))
      : sellers.map((seller) => ({
          sellerId: seller.id,
          checked: true,
          products: seller.products.map((p) => ({
            productId: p.id,
            checked: true,
          })),
        }));

    setCheckedState(newCheckedState);
    setAllCompaniesChecked(!allCompaniesChecked);
  };

  const handleSellerToggle = (sellerId: number) => {
    setCheckedState((prev) =>
      prev.map((s) => {
        if (s.sellerId === sellerId) {
          const updatedProducts = s.products.map((p) => ({
            ...p,
            checked: !s.checked,
          }));
          return { ...s, checked: !s.checked, products: updatedProducts };
        }
        return s;
      })
    );
  };

  const handleProductToggle = (sellerId: number, productId: number) => {
    setCheckedState((prev) =>
      prev.map((s) => {
        if (s.sellerId === sellerId) {
          const updatedProducts = s.products.map((p) =>
            p.productId === productId ? { ...p, checked: !p.checked } : p
          );
          const allChecked = updatedProducts.every((p) => p.checked);
          return { ...s, products: updatedProducts, checked: allChecked };
        }
        return s;
      })
    );
  };

  return (
    <View style={styles.container}>
      {/* <HeaderNav /> */}
      <ScrollView style={styles.scrollView}>
        <Text style={styles.breadcrumb}>
          Cart &gt; Place order &gt; Pay &gt; Order Completed
        </Text>

        {!checkoutComplete ? (
          <View style={styles.cartAll}>
            <View style={styles.cartMain}>
              {/* All items header */}
              <View style={styles.allItemsHeader}>
                <Pressable
                  onPress={handleAllCompaniesToggle}
                  style={styles.checkboxContainer}
                >
                  <View
                    style={[
                      styles.checkbox,
                      allCompaniesChecked && styles.checkboxChecked,
                    ]}
                  >
                    {allCompaniesChecked && (
                      <Ionicons
                        name="checkmark"
                        size={14}
                        color={colors.white}
                      />
                    )}
                  </View>
                </Pressable>
                <Text style={styles.allItemsText}>
                  ALL COMPANIES ({sellers.length})
                </Text>
              </View>

              {/* Sellers */}
              {checkedState.map((sellerState) => {
                const seller = sellers.find(
                  (s) => s.id === sellerState.sellerId
                );

                // Add null check for seller
                if (!seller) return null;

                return (
                  <View key={seller.id} style={styles.sellerSection}>
                    <View style={styles.sellerHeader}>
                      <Pressable
                        onPress={() => handleSellerToggle(seller.id)}
                        style={styles.checkboxContainer}
                      >
                        <View
                          style={[
                            styles.checkbox,
                            sellerState.checked && styles.checkboxChecked,
                          ]}
                        >
                          {sellerState.checked && (
                            <Ionicons
                              name="checkmark"
                              size={14}
                              color={colors.white}
                            />
                          )}
                        </View>
                      </Pressable>
                      <Text style={styles.sellerName}>{seller.name}</Text>
                    </View>

                    {seller.products.map((product) => {
                      const productState = sellerState.products.find(
                        (p) => p.productId === product.id
                      );
                      return (
                        <View key={product.id} style={styles.cartCard}>
                          <Pressable
                            onPress={() =>
                              handleProductToggle(seller.id, product.id)
                            }
                            style={styles.checkboxContainer}
                          >
                            <View
                              style={[
                                styles.checkbox,
                                productState?.checked && styles.checkboxChecked,
                              ]}
                            >
                              {productState?.checked && (
                                <Ionicons
                                  name="checkmark"
                                  size={14}
                                  color={colors.white}
                                />
                              )}
                            </View>
                          </Pressable>
                          <Image
                            source={{ uri: product.image }}
                            style={styles.productImage}
                            contentFit="cover"
                          />
                          <Pressable
                            style={styles.productInfo}
                            onPress={() =>
                              router.push({
                                pathname: "/product/[id]",
                                params: { id: product.id },
                              })
                            }
                          >
                            <Text style={styles.productTitle}>
                              {product.name}
                            </Text>
                            <Text style={styles.productDesc}>
                              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                            </Text>
                            <View style={styles.priceContainer}>
                              <Text style={styles.productPrice}>
                                ${product.price.toFixed(2)}
                              </Text>
                              <Text style={styles.oldPrice}>
                                ${product.oldPrice.toFixed(2)}
                              </Text>
                            </View>
                          </Pressable>
                          <Pressable style={styles.deleteButton}>
                            <Ionicons
                              name="trash-outline"
                              size={18}
                              color={colors.gray}
                            />
                          </Pressable>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
            </View>

            {/* Order Summary */}
            <View style={styles.orderSummary}>
              <Text style={styles.summaryTitle}>Order Summary</Text>
              <View style={styles.previewImages}>
                {sellers
                  .flatMap((s) => s.products)
                  .slice(0, 4)
                  .map((product, i) => (
                    <View key={i} style={styles.previewWrapper}>
                      <Image
                        source={{ uri: product.image }}
                        style={styles.previewImage}
                        contentFit="cover"
                      />
                      {i === 3 &&
                        sellers.flatMap((s) => s.products).length > 4 && (
                          <View style={styles.overlay}>
                            <Text style={styles.overlayText}>
                              +{sellers.flatMap((s) => s.products).length - 4}
                            </Text>
                          </View>
                        )}
                    </View>
                  ))}
              </View>

              <View style={styles.summaryDetails}>
                <View style={styles.summaryRow}>
                  <Text style={styles.labelLowest}>Lowest price:</Text>
                  <Text style={styles.valueLowest}>$2345.00</Text>
                </View>
                <View style={[styles.summaryRow, styles.discountBorder]}>
                  <Text style={styles.labelDiscount}>Discount amount:</Text>
                  <Text style={styles.valueDiscount}>$99.00</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.labelTotal}>Total:</Text>
                  <Text style={styles.valueTotal}>$2246.00</Text>
                </View>
              </View>

              <Pressable
                style={styles.checkoutButton}
                onPress={() => setCheckoutComplete(true)}
              >
                <Ionicons name="cart-outline" size={18} color={colors.white} />
                <Text style={styles.checkoutButtonText}>Checkout</Text>
              </Pressable>

              <Text style={styles.acceptingText}>Accepting</Text>
              <View style={styles.paymentMethods}>
                <Image
                  source={{
                    uri: "https://via.placeholder.com/40x24/007bff/ffffff?text=mbank",
                  }}
                  style={styles.payIcon}
                  contentFit="contain"
                />
                <Image
                  source={{
                    uri: "https://via.placeholder.com/40x24/ff6b6b/ffffff?text=MC",
                  }}
                  style={styles.payIcon}
                  contentFit="contain"
                />
                <Image
                  source={{
                    uri: "https://via.placeholder.com/40x24/1a73e8/ffffff?text=VISA",
                  }}
                  style={styles.payIcon}
                  contentFit="contain"
                />
              </View>
            </View>
          </View>
        ) : (
          /* Checkout Complete View */
          <View style={styles.cartAll}>
            <View style={styles.cartMain}>
              {/* Address Section */}
              <View style={[styles.sellerSection, styles.paddingCart]}>
                <Text style={styles.acceptingText}>Pickup Address</Text>
                <View style={styles.pickupAddress}>
                  <View style={styles.addressInfo}>
                    {isEditing ? (
                      <>
                        <TextInput
                          style={styles.input}
                          value={address.name}
                          onChangeText={(text) =>
                            setAddress({ ...address, name: text })
                          }
                          placeholder="Name"
                        />
                        <TextInput
                          style={styles.input}
                          value={address.phone}
                          onChangeText={(text) =>
                            setAddress({ ...address, phone: text })
                          }
                          placeholder="Phone"
                        />
                        <TextInput
                          style={styles.input}
                          value={address.email}
                          onChangeText={(text) =>
                            setAddress({ ...address, email: text })
                          }
                          placeholder="Email"
                        />
                      </>
                    ) : (
                      <>
                        <Text style={styles.addressText}>{address.name}</Text>
                        <Text style={styles.addressText}>{address.phone}</Text>
                        <Text style={styles.addressText}>{address.email}</Text>
                        <Text style={styles.addressText}>
                          {address.deliveryPoint}
                        </Text>
                        <Text style={styles.addressText}>
                          {address.address}
                        </Text>
                      </>
                    )}
                  </View>
                  <Pressable
                    style={styles.editAddress}
                    onPress={() => setIsEditing(!isEditing)}
                  >
                    <Text style={styles.editAddressText}>
                      {isEditing ? "Save Address" : "Edit Address"}
                    </Text>
                  </Pressable>
                </View>
              </View>

              {/* Shipping Methods */}
              <View style={[styles.sellerSection, styles.paddingCart]}>
                <Text style={styles.acceptingText}>Shipping Method</Text>
                {[0, 1, 2].map((index) => (
                  <Pressable
                    key={index}
                    style={[
                      styles.shippingMethod,
                      selectedShipping === `method-${index}` && styles.selected,
                    ]}
                    onPress={() => setSelectedShipping(`method-${index}`)}
                  >
                    <View style={styles.radioOuter}>
                      {selectedShipping === `method-${index}` && (
                        <View style={styles.radioInner} />
                      )}
                    </View>
                    <View>
                      <Text style={styles.shippingName}>
                        InPost Paczkomat 24/7
                      </Text>
                      <Text style={styles.shippingDetails}>
                        9,90zł (Dostarczenie między Poniedziałek, Kwi 7 – Środa,
                        Kwi 9.)
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Same Order Summary */}
            <View style={styles.orderSummary}>
              <Text style={styles.summaryTitle}>Order Summary</Text>
              <View style={styles.summaryDetails}>
                <View style={styles.summaryRow}>
                  <Text style={styles.labelLowest}>Lowest price:</Text>
                  <Text style={styles.valueLowest}>$2345.00</Text>
                </View>
                <View style={[styles.summaryRow, styles.discountBorder]}>
                  <Text style={styles.labelDiscount}>Discount amount:</Text>
                  <Text style={styles.valueDiscount}>$99.00</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.labelTotal}>Total:</Text>
                  <Text style={styles.valueTotal}>$2246.00</Text>
                </View>
              </View>

              <Pressable style={styles.checkoutButton}>
                <Ionicons name="cart-outline" size={18} color={colors.white} />
                <Text style={styles.checkoutButtonText}>Pay</Text>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  breadcrumb: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: spacing.md,
    color: colors.text,
  },
  cartAll: {
    flexDirection: "row",
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },
  cartMain: {
    flex: 2,
  },
  allItemsHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 10,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  allItemsText: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: spacing.sm,
    color: colors.text,
  },
  sellerSection: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sellerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: spacing.sm,
    color: colors.text,
  },
  cartCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: spacing.sm,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: spacing.sm,
  },
  checkboxContainer: {
    marginRight: spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.black,
    borderColor: colors.black,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: spacing.md,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: spacing.xs,
    color: colors.text,
  },
  productDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.black,
  },
  oldPrice: {
    fontSize: 12,
    textDecorationLine: "line-through",
    color: colors.textLight,
    marginLeft: spacing.sm,
  },
  deleteButton: {
    padding: spacing.sm,
  },
  orderSummary: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    height: "50%",
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: spacing.md,
    color: colors.text,
  },
  previewImages: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  previewWrapper: {
    width: 75,
    height: 75,
    position: "relative",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  overlayText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "700",
  },
  summaryDetails: {
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  labelLowest: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.black,
  },
  valueLowest: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.black,
  },
  labelDiscount: {
    fontSize: 10,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  valueDiscount: {
    fontSize: 10,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  discountBorder: {
    paddingBottom: spacing.sm,
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
  },
  labelTotal: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.black,
  },
  valueTotal: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.black,
  },
  checkoutButton: {
    flexDirection: "row",
    backgroundColor: colors.black,
    paddingVertical: spacing.md,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.xs,
  },
  checkoutButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "700",
  },
  acceptingText: {
    fontSize: 16,
    fontWeight: "800",
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
    color: colors.text,
  },
  paymentMethods: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  payIcon: {
    height: 24,
    width: 40,
  },
  paddingCart: {
    padding: spacing.lg,
  },
  pickupAddress: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f7f5f5c7",
    padding: spacing.md,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },
  addressInfo: {
    flex: 1,
  },
  addressText: {
    fontSize: 13,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.white,
    padding: spacing.sm,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    fontSize: 14,
  },
  editAddress: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colors.border,
    height: 40,
    justifyContent: "center",
  },
  editAddressText: {
    fontWeight: "700",
    fontSize: 12,
    color: colors.black,
  },
  shippingMethod: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f8f8f8",
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  selected: {
    borderColor: "#007bff",
    backgroundColor: "#f0f8ff",
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.sm,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.black,
  },
  shippingName: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  shippingDetails: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
