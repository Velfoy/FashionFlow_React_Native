// app/(tabs)/cart.tsx - UPDATED VERSION
import HeaderNav from "@/components/HeaderNav";
import {
  CartItem,
  getCartItems,
  removeFromCart,
  updateCartItemQuantity,
} from "@/data/mockData";
import { useResponsive } from "@/hooks/useResponsive";
import { colors } from "@/styles/colors";
import { spacing } from "@/styles/spacing";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// Types (keep your existing types, just update interfaces as needed)
interface Seller {
  id: number;
  name: string;
  products: CartItem[];
}

interface CheckedProduct {
  productId: number;
  checked: boolean;
}

interface CheckedSeller {
  sellerId: number;
  checked: boolean;
  products: CheckedProduct[];
}

interface Address {
  name: string;
  phone: string;
  email: string;
  deliveryPoint: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  description: string;
  deliveryDays: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
}

// Mock data (keep your existing mock data, just update sellers to use cart items)
const sellersFromCart = (cartItems: CartItem[]): Seller[] => {
  // Group cart items by seller (in a real app, you'd have seller info)
  const sellerMap: { [key: string]: CartItem[] } = {};

  cartItems.forEach((item) => {
    // For demo, we'll create sellers based on product categories
    const sellerName = item.name.includes("watch")
      ? "Seny"
      : item.name.includes("pants")
      ? "Selle"
      : item.name.includes("jacket")
      ? "Premium Store"
      : "General Store";

    if (!sellerMap[sellerName]) {
      sellerMap[sellerName] = [];
    }
    sellerMap[sellerName].push(item);
  });

  return Object.entries(sellerMap).map(([name, products], index) => ({
    id: index + 1,
    name,
    products,
  }));
};

const shippingMethods: ShippingMethod[] = [
  {
    id: "method-0",
    name: "InPost Paczkomat 24/7",
    price: 9.9,
    description: "Fast delivery to parcel locker",
    deliveryDays: "Poniedziałek, Kwi 7 – Środa, Kwi 9",
  },
  {
    id: "method-1",
    name: "DPD Courier",
    price: 14.9,
    description: "Door delivery",
    deliveryDays: "Wtorek, Kwi 8 – Czwartek, Kwi 10",
  },
  {
    id: "method-2",
    name: "Poczta Polska",
    price: 7.9,
    description: "Post office delivery",
    deliveryDays: "Środa, Kwi 9 – Piątek, Kwi 11",
  },
];

const paymentMethods: PaymentMethod[] = [
  {
    id: "payment-0",
    name: "Credit Card",
    description: "Pay with Visa, MasterCard",
    icon: "card-outline",
  },
  {
    id: "payment-1",
    name: "Bank Transfer",
    description: "Traditional bank transfer",
    icon: "business-outline",
  },
  {
    id: "payment-2",
    name: "PayPal",
    description: "Fast and secure payment",
    icon: "logo-paypal",
  },
];

// Breadcrumb steps
const BREADCRUMB_STEPS = [
  { key: "cart", label: "Cart" },
  { key: "place-order", label: "Place Order" },
  { key: "pay", label: "Pay" },
  { key: "completed", label: "Order Completed" },
];

type Step = "cart" | "place-order" | "pay" | "completed";

export default function CartPage() {
  const { isTablet, isLandscape, width } = useResponsive();
  const [currentStep, setCurrentStep] = useState<Step>("cart");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [sellers, setSellers] = useState<Seller[]>([]);

  const [checkedState, setCheckedState] = useState<CheckedSeller[]>([]);
  const [allCompaniesChecked, setAllCompaniesChecked] = useState(true);
  const [selectedShipping, setSelectedShipping] = useState("method-0");
  const [selectedPayment, setSelectedPayment] = useState("payment-0");
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState<Address>({
    name: "Valeriia Zlydar",
    phone: "883589324",
    email: "marsonyteam@gmail.com",
    deliveryPoint: "LOD51N al. Politechniki 1",
    address: "al. Politechniki",
    city: "Łódź",
    postalCode: "93-590",
    country: "Poland",
  });

  // Load cart items and initialize sellers
  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    const items = getCartItems();
    setCartItems(items);
    const sellersData = sellersFromCart(items);
    setSellers(sellersData);

    // Initialize checked state
    const initialCheckedState: CheckedSeller[] = sellersData.map((seller) => ({
      sellerId: seller.id,
      checked: true,
      products: seller.products.map((p) => ({
        productId: p.id,
        checked: true,
      })),
    }));

    setCheckedState(initialCheckedState);
  };

  // Calculate selected items and totals
  const { selectedProducts, subtotal, discount, shipping, total } =
    React.useMemo(() => {
      const selectedProducts: CartItem[] = [];
      let subtotal = 0;
      let discount = 0;

      checkedState.forEach((sellerState) => {
        const seller = sellers.find((s) => s.id === sellerState.sellerId);
        if (seller) {
          sellerState.products.forEach((productState) => {
            if (productState.checked) {
              const product = seller.products.find(
                (p) => p.id === productState.productId
              );
              if (product) {
                selectedProducts.push(product);
                subtotal += product.price * product.quantity;
                // For demo, we'll calculate a simple discount
                discount += product.price * product.quantity * 0.1; // 10% discount
              }
            }
          });
        }
      });

      const selectedShippingMethod = shippingMethods.find(
        (method) => method.id === selectedShipping
      );
      const shippingCost = selectedShippingMethod?.price || 0;

      return {
        selectedProducts,
        subtotal,
        discount,
        shipping: shippingCost,
        total: subtotal - discount + shippingCost,
      };
    }, [checkedState, selectedShipping, sellers]);

  // Update all companies checked state
  useEffect(() => {
    const allChecked = checkedState.every((seller) => seller.checked);
    setAllCompaniesChecked(allChecked);
  }, [checkedState]);

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

  const handleDeleteProduct = (sellerId: number, productId: number) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from your cart?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            removeFromCart(productId);
            loadCartItems(); // Reload cart items
          },
        },
      ]
    );
  };

  const handleQuantityChange = (productId: number, change: number) => {
    const item = cartItems.find((item) => item.id === productId);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      updateCartItemQuantity(productId, newQuantity);
      loadCartItems(); // Reload cart items to reflect changes
    }
  };

  const handleCheckout = () => {
    if (selectedProducts.length === 0) {
      Alert.alert(
        "Empty Cart",
        "Please select at least one item to proceed with checkout."
      );
      return;
    }
    setCurrentStep("place-order");
  };

  const handlePlaceOrder = () => {
    setCurrentStep("pay");
  };

  const handlePayment = () => {
    setCurrentStep("completed");
  };

  const handleBackToCart = () => {
    setCurrentStep("cart");
  };

  const handleBackToShipping = () => {
    setCurrentStep("place-order");
  };

  const handleContinueShopping = () => {
    router.push("/(tabs)");
  };

  const handleViewOrder = () => {
    Alert.alert(
      "Order Placed",
      `Your order #${Math.random()
        .toString(36)
        .substr(2, 9)
        .toUpperCase()} has been placed successfully!`
    );
  };

  const handleSaveAddress = () => {
    setIsEditing(false);
    Alert.alert("Address Saved", "Your address has been updated successfully.");
  };

  const isStepActive = (stepKey: Step) => {
    const stepIndex = BREADCRUMB_STEPS.findIndex(
      (step) => step.key === stepKey
    );
    const currentIndex = BREADCRUMB_STEPS.findIndex(
      (step) => step.key === currentStep
    );
    return stepIndex <= currentIndex;
  };

  const isStepCompleted = (stepKey: Step) => {
    const stepIndex = BREADCRUMB_STEPS.findIndex(
      (step) => step.key === stepKey
    );
    const currentIndex = BREADCRUMB_STEPS.findIndex(
      (step) => step.key === currentStep
    );
    return stepIndex < currentIndex;
  };

  // Determine layout based on device
  const useSideBySideLayout = false;
  const cartMainFlex = 1;
  const orderSummaryFlex = 1;

  if (cartItems.length === 0 && currentStep === "cart") {
    return (
      <View style={styles.container}>
        <HeaderNav showLogo={false} title="Shopping Cart" showAccount={false} />
        <View style={styles.emptyCartContainer}>
          <Ionicons name="cart-outline" size={80} color={colors.gray} />
          <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
          <Text style={styles.emptyCartText}>
            Browse our products and add items to your cart
          </Text>
          <Pressable
            style={styles.continueShoppingButton}
            onPress={handleContinueShopping}
          >
            <Text style={styles.continueShoppingText}>Continue Shopping</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderNav showLogo={false} title="Shopping Cart" showAccount={false} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          isTablet && styles.scrollContentTablet,
        ]}
      >
        {/* Breadcrumb */}
        <View style={styles.breadcrumbContainer}>
          {BREADCRUMB_STEPS.map((step, index) => (
            <React.Fragment key={step.key}>
              <Pressable
                onPress={() => {
                  if (
                    isStepCompleted(step.key as Step) ||
                    isStepActive(step.key as Step)
                  ) {
                    setCurrentStep(step.key as Step);
                  }
                }}
                style={[
                  styles.breadcrumbStep,
                  isStepActive(step.key as Step) && styles.breadcrumbStepActive,
                  isStepCompleted(step.key as Step) &&
                    styles.breadcrumbStepCompleted,
                ]}
              >
                <Text
                  style={[
                    styles.breadcrumbText,
                    isStepActive(step.key as Step) &&
                      styles.breadcrumbTextActive,
                  ]}
                >
                  {step.label}
                </Text>
              </Pressable>
              {index < BREADCRUMB_STEPS.length - 1 && (
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={colors.gray}
                />
              )}
            </React.Fragment>
          ))}
        </View>

        {currentStep === "completed" ? (
          /* Order Completed View */
          <View style={styles.completedContainer}>
            <View style={styles.successIcon}>
              <Ionicons
                name="checkmark-circle"
                size={80}
                color={colors.success}
              />
            </View>
            <Text style={styles.completedTitle}>Order Completed!</Text>
            <Text style={styles.completedMessage}>
              Thank you for your purchase. Your order has been confirmed and
              will be shipped soon.
            </Text>
            <View style={styles.completedActions}>
              <Pressable
                style={styles.continueShoppingButton}
                onPress={handleContinueShopping}
              >
                <Text style={styles.continueShoppingText}>
                  Continue Shopping
                </Text>
              </Pressable>
              <Pressable
                style={styles.viewOrderButton}
                onPress={handleViewOrder}
              >
                <Text style={styles.viewOrderText}>View Order Details</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View
            style={[
              styles.cartAll,
              useSideBySideLayout && styles.cartAllSideBySide,
              !useSideBySideLayout && styles.cartAllStacked,
            ]}
          >
            <View
              style={[
                styles.cartMain,
                useSideBySideLayout && { flex: cartMainFlex },
              ]}
            >
              {currentStep === "cart" && (
                <>
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
                          if (!productState) return null;

                          return (
                            <View
                              key={product.id}
                              style={[
                                styles.cartCard,
                                isTablet && styles.cartCardTablet,
                              ]}
                            >
                              <Pressable
                                onPress={() =>
                                  handleProductToggle(seller.id, product.id)
                                }
                                style={styles.checkboxContainer}
                              >
                                <View
                                  style={[
                                    styles.checkbox,
                                    productState.checked &&
                                      styles.checkboxChecked,
                                  ]}
                                >
                                  {productState.checked && (
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
                                style={[
                                  styles.productImage,
                                  isTablet && styles.productImageTablet,
                                ]}
                                contentFit="cover"
                              />
                              <Pressable
                                style={styles.productInfo}
                                onPress={() =>
                                  router.push({
                                    pathname: "/product/[id]",
                                    params: { id: product.productId },
                                  })
                                }
                              >
                                <Text
                                  style={[
                                    styles.productTitle,
                                    isTablet && styles.productTitleTablet,
                                  ]}
                                >
                                  {product.name}
                                </Text>
                                <Text style={styles.productDesc}>
                                  Size: {product.size}
                                </Text>
                                <View style={styles.priceContainer}>
                                  <Text
                                    style={[
                                      styles.productPrice,
                                      isTablet && styles.productPriceTablet,
                                    ]}
                                  >
                                    ${product.price.toFixed(2)}
                                  </Text>
                                </View>
                                <View style={styles.quantityContainer}>
                                  <Pressable
                                    style={styles.quantityButton}
                                    onPress={() =>
                                      handleQuantityChange(product.id, -1)
                                    }
                                  >
                                    <Ionicons
                                      name="remove"
                                      size={16}
                                      color={colors.text}
                                    />
                                  </Pressable>
                                  <Text style={styles.quantityText}>
                                    {product.quantity}
                                  </Text>
                                  <Pressable
                                    style={styles.quantityButton}
                                    onPress={() =>
                                      handleQuantityChange(product.id, 1)
                                    }
                                  >
                                    <Ionicons
                                      name="add"
                                      size={16}
                                      color={colors.text}
                                    />
                                  </Pressable>
                                </View>
                              </Pressable>
                              <Pressable
                                style={styles.deleteButton}
                                onPress={() =>
                                  handleDeleteProduct(seller.id, product.id)
                                }
                              >
                                <Ionicons
                                  name="trash-outline"
                                  size={isTablet ? 22 : 18}
                                  color={colors.error}
                                />
                              </Pressable>
                            </View>
                          );
                        })}
                      </View>
                    );
                  })}
                </>
              )}

              {(currentStep === "place-order" || currentStep === "pay") && (
                <>
                  {/* Back button */}
                  <Pressable
                    style={styles.backButton}
                    onPress={
                      currentStep === "place-order"
                        ? handleBackToCart
                        : handleBackToShipping
                    }
                  >
                    <Ionicons name="arrow-back" size={20} color={colors.text} />
                    <Text style={styles.backButtonText}>Back</Text>
                  </Pressable>

                  {/* Address Section */}
                  <View style={[styles.sellerSection, styles.paddingCart]}>
                    <Text style={styles.sectionTitle}>Delivery Address</Text>
                    <View
                      style={[
                        styles.pickupAddress,
                        !useSideBySideLayout && styles.pickupAddressStacked,
                      ]}
                    >
                      <View style={styles.addressInfo}>
                        {isEditing ? (
                          <>
                            <TextInput
                              style={styles.input}
                              value={address.name}
                              onChangeText={(text) =>
                                setAddress({ ...address, name: text })
                              }
                              placeholder="Full Name"
                            />
                            <TextInput
                              style={styles.input}
                              value={address.phone}
                              onChangeText={(text) =>
                                setAddress({ ...address, phone: text })
                              }
                              placeholder="Phone Number"
                              keyboardType="phone-pad"
                            />
                            <TextInput
                              style={styles.input}
                              value={address.email}
                              onChangeText={(text) =>
                                setAddress({ ...address, email: text })
                              }
                              placeholder="Email"
                              keyboardType="email-address"
                            />
                            <TextInput
                              style={styles.input}
                              value={address.deliveryPoint}
                              onChangeText={(text) =>
                                setAddress({ ...address, deliveryPoint: text })
                              }
                              placeholder="Delivery Point"
                            />
                            <TextInput
                              style={styles.input}
                              value={address.address}
                              onChangeText={(text) =>
                                setAddress({ ...address, address: text })
                              }
                              placeholder="Street Address"
                            />
                            <View style={styles.addressRow}>
                              <TextInput
                                style={[styles.input, styles.halfInput]}
                                value={address.city}
                                onChangeText={(text) =>
                                  setAddress({ ...address, city: text })
                                }
                                placeholder="City"
                              />
                              <TextInput
                                style={[styles.input, styles.halfInput]}
                                value={address.postalCode}
                                onChangeText={(text) =>
                                  setAddress({ ...address, postalCode: text })
                                }
                                placeholder="Postal Code"
                              />
                            </View>
                            <TextInput
                              style={styles.input}
                              value={address.country}
                              onChangeText={(text) =>
                                setAddress({ ...address, country: text })
                              }
                              placeholder="Country"
                            />
                          </>
                        ) : (
                          <>
                            <Text style={styles.addressText}>
                              {address.name}
                            </Text>
                            <Text style={styles.addressText}>
                              {address.phone}
                            </Text>
                            <Text style={styles.addressText}>
                              {address.email}
                            </Text>
                            <Text style={styles.addressLabel}>
                              Delivery Point:
                            </Text>
                            <Text style={styles.addressText}>
                              {address.deliveryPoint}
                            </Text>
                            <Text style={styles.addressLabel}>Address:</Text>
                            <Text style={styles.addressText}>
                              {address.address}
                            </Text>
                            <Text style={styles.addressText}>
                              {address.city}, {address.postalCode}
                            </Text>
                            <Text style={styles.addressText}>
                              {address.country}
                            </Text>
                          </>
                        )}
                      </View>
                      <Pressable
                        style={styles.editAddress}
                        onPress={
                          isEditing
                            ? handleSaveAddress
                            : () => setIsEditing(true)
                        }
                      >
                        <Text style={styles.editAddressText}>
                          {isEditing ? "Save" : "Edit"}
                        </Text>
                      </Pressable>
                    </View>
                  </View>

                  {/* Shipping Methods */}
                  {currentStep === "place-order" && (
                    <View style={[styles.sellerSection, styles.paddingCart]}>
                      <Text style={styles.sectionTitle}>Shipping Method</Text>
                      {shippingMethods.map((method) => (
                        <Pressable
                          key={method.id}
                          style={[
                            styles.shippingMethod,
                            selectedShipping === method.id && styles.selected,
                          ]}
                          onPress={() => setSelectedShipping(method.id)}
                        >
                          <View style={styles.radioOuter}>
                            {selectedShipping === method.id && (
                              <View style={styles.radioInner} />
                            )}
                          </View>
                          <View style={styles.shippingInfo}>
                            <Text style={styles.shippingName}>
                              {method.name}
                            </Text>
                            <Text style={styles.shippingDetails}>
                              {method.price.toFixed(2)}zł - {method.description}
                            </Text>
                            <Text style={styles.shippingDelivery}>
                              {method.deliveryDays}
                            </Text>
                          </View>
                        </Pressable>
                      ))}
                    </View>
                  )}

                  {/* Payment Methods */}
                  {currentStep === "pay" && (
                    <View style={[styles.sellerSection, styles.paddingCart]}>
                      <Text style={styles.sectionTitle}>Payment Method</Text>
                      {paymentMethods.map((method) => (
                        <Pressable
                          key={method.id}
                          style={[
                            styles.shippingMethod,
                            selectedPayment === method.id && styles.selected,
                          ]}
                          onPress={() => setSelectedPayment(method.id)}
                        >
                          <View style={styles.radioOuter}>
                            {selectedPayment === method.id && (
                              <View style={styles.radioInner} />
                            )}
                          </View>
                          <Ionicons
                            name={method.icon as any}
                            size={24}
                            color={colors.text}
                            style={styles.paymentIcon}
                          />
                          <View style={styles.shippingInfo}>
                            <Text style={styles.shippingName}>
                              {method.name}
                            </Text>
                            <Text style={styles.shippingDetails}>
                              {method.description}
                            </Text>
                          </View>
                        </Pressable>
                      ))}
                    </View>
                  )}
                </>
              )}
            </View>

            {/* Order Summary */}
            <View
              style={[
                styles.orderSummary,
                useSideBySideLayout && { flex: orderSummaryFlex },
                !useSideBySideLayout && styles.orderSummaryStacked,
              ]}
            >
              <Text style={styles.summaryTitle}>Order Summary</Text>

              {/* Selected Products Preview */}
              <View style={styles.previewImages}>
                {selectedProducts.slice(0, 4).map((product, i) => (
                  <View key={i} style={styles.previewWrapper}>
                    <Image
                      source={{ uri: product.image }}
                      style={styles.previewImage}
                      contentFit="cover"
                    />
                    {product.quantity > 1 && (
                      <View style={styles.quantityBadge}>
                        <Text style={styles.quantityBadgeText}>
                          ×{product.quantity}
                        </Text>
                      </View>
                    )}
                  </View>
                ))}
                {selectedProducts.length > 4 && (
                  <View style={styles.previewWrapper}>
                    <View style={styles.moreItemsOverlay}>
                      <Text style={styles.moreItemsText}>
                        +{selectedProducts.length - 4}
                      </Text>
                      <Text style={styles.moreItemsSubText}>more items</Text>
                    </View>
                  </View>
                )}
              </View>

              <View style={styles.summaryDetails}>
                <View style={styles.summaryRow}>
                  <Text style={styles.label}>
                    Subtotal ({selectedProducts.length} items):
                  </Text>
                  <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.label}>Discount:</Text>
                  <Text style={[styles.value, styles.discountValue]}>
                    -${discount.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.label}>Shipping:</Text>
                  <Text style={styles.value}>${shipping.toFixed(2)}</Text>
                </View>
                <View style={[styles.summaryRow, styles.totalRow]}>
                  <Text style={styles.totalLabel}>Total:</Text>
                  <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                </View>
              </View>

              {currentStep === "cart" && (
                <Pressable
                  style={[
                    styles.checkoutButton,
                    selectedProducts.length === 0 &&
                      styles.checkoutButtonDisabled,
                  ]}
                  onPress={handleCheckout}
                  disabled={selectedProducts.length === 0}
                >
                  <Ionicons
                    name="cart-outline"
                    size={18}
                    color={colors.white}
                  />
                  <Text style={styles.checkoutButtonText}>
                    Checkout ({selectedProducts.length})
                  </Text>
                </Pressable>
              )}

              {currentStep === "place-order" && (
                <Pressable
                  style={styles.checkoutButton}
                  onPress={handlePlaceOrder}
                >
                  <Ionicons
                    name="arrow-forward"
                    size={18}
                    color={colors.white}
                  />
                  <Text style={styles.checkoutButtonText}>
                    Continue to Payment
                  </Text>
                </Pressable>
              )}

              {currentStep === "pay" && (
                <Pressable
                  style={styles.checkoutButton}
                  onPress={handlePayment}
                >
                  <Ionicons name="lock-closed" size={18} color={colors.white} />
                  <Text style={styles.checkoutButtonText}>
                    Pay ${total.toFixed(2)}
                  </Text>
                </Pressable>
              )}

              <Text style={styles.acceptingText}>We Accept</Text>
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
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  emptyCartTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptyCartText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  scrollContentTablet: {
    paddingHorizontal: spacing.xl,
  },
  breadcrumbContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: spacing.md,
    paddingHorizontal: spacing.md,
    flexWrap: "wrap",
  },
  breadcrumbStep: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: spacing.xs,
  },
  breadcrumbStepActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  breadcrumbStepCompleted: {
    backgroundColor: colors.successLight,
    borderColor: colors.success,
  },
  breadcrumbText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  breadcrumbTextActive: {
    color: colors.white,
  },
  cartAll: {
    paddingHorizontal: spacing.md,
  },
  cartAllSideBySide: {
    flexDirection: "row",
    gap: spacing.xl,
  },
  cartAllStacked: {
    flexDirection: "column",
    gap: spacing.lg,
  },
  cartMain: {
    flex: 1,
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
  cartCardTablet: {
    padding: spacing.md,
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
  productImageTablet: {
    width: 100,
    height: 100,
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
  productTitleTablet: {
    fontSize: 16,
  },
  productDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.black,
  },
  productPriceTablet: {
    fontSize: 18,
  },
  oldPrice: {
    fontSize: 12,
    textDecorationLine: "line-through",
    color: colors.textLight,
    marginLeft: spacing.sm,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xs,
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  quantityText: {
    marginHorizontal: spacing.md,
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  deleteButton: {
    padding: spacing.sm,
  },
  orderSummary: {
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
  },
  orderSummaryStacked: {
    marginTop: spacing.lg,
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
    flexWrap: "wrap",
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
  quantityBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "700",
  },
  moreItemsOverlay: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  moreItemsText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  moreItemsSubText: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  summaryDetails: {
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    marginTop: spacing.sm,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
  },
  discountValue: {
    color: colors.success,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.black,
  },
  totalValue: {
    fontSize: 16,
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
  checkoutButtonDisabled: {
    backgroundColor: colors.gray,
    opacity: 0.6,
  },
  checkoutButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "700",
  },
  acceptingText: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
    color: colors.textSecondary,
    textAlign: "center",
  },
  paymentMethods: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  payIcon: {
    height: 24,
    width: 40,
  },
  paddingCart: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: spacing.md,
    color: colors.text,
  },
  pickupAddress: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f7f5f5c7",
    padding: spacing.md,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "flex-start",
  },
  pickupAddressStacked: {
    flexDirection: "column",
    gap: spacing.md,
  },
  addressInfo: {
    flex: 1,
  },
  addressRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  addressLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textSecondary,
    marginTop: spacing.sm,
    marginBottom: 2,
  },
  addressText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.white,
    padding: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    fontSize: 14,
  },
  halfInput: {
    flex: 1,
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
    borderColor: colors.primary,
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
    marginTop: 2,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.black,
  },
  shippingInfo: {
    flex: 1,
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
  shippingDelivery: {
    fontSize: 11,
    color: colors.textLight,
    marginTop: 2,
  },
  paymentIcon: {
    marginRight: spacing.sm,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
    padding: spacing.sm,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginLeft: spacing.xs,
  },
  completedContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
    backgroundColor: colors.white,
    margin: spacing.md,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  successIcon: {
    marginBottom: spacing.lg,
  },
  completedTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: "center",
  },
  completedMessage: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: spacing.xl,
    lineHeight: 22,
  },
  completedActions: {
    flexDirection: "row",
    gap: spacing.md,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  continueShoppingButton: {
    backgroundColor: colors.black,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 6,
  },
  continueShoppingText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "700",
  },
  viewOrderButton: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  viewOrderText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700",
  },
});
