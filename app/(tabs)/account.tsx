import { useAuth } from "@/contexts/AuthContext";
import { ShippingAddress } from "@/data/authData";
import { colors } from "@/styles/colors";
import { spacing } from "@/styles/spacing";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountPage() {
  const {
    user,
    isAuthenticated,
    logout,
    getUserOrders,
    getUserAddresses,
    addUserAddress,
    updateUserAddress,
    deleteUserAddress,
    setDefaultAddress,
  } = useAuth();
  const [activeSection, setActiveSection] = useState<
    "profile" | "orders" | "addresses" | "settings"
  >("profile");
  const [isEditingAddress, setIsEditingAddress] = useState<string | null>(null);
  const [newAddress, setNewAddress] = useState<Partial<ShippingAddress>>({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    zipCode: "",
    country: "Poland",
    isDefault: false,
  });

  const userOrders = getUserOrders();
  const userAddresses = getUserAddresses();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: logout },
    ]);
  };

  const handleAddAddress = () => {
    if (!newAddress.street || !newAddress.city || !newAddress.zipCode) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    const address: ShippingAddress = {
      id: Date.now().toString(),
      firstName: newAddress.firstName || user?.firstName || "",
      lastName: newAddress.lastName || user?.lastName || "",
      street: newAddress.street || "",
      city: newAddress.city || "",
      zipCode: newAddress.zipCode || "",
      country: newAddress.country || "Poland",
      isDefault: userAddresses.length === 0, // First address is default
    };

    addUserAddress(address);
    setNewAddress({
      firstName: "",
      lastName: "",
      street: "",
      city: "",
      zipCode: "",
      country: "Poland",
      isDefault: false,
    });
    Alert.alert("Success", "Address added successfully");
  };

  const handleEditAddress = (address: ShippingAddress) => {
    setIsEditingAddress(address.id);
    setNewAddress({ ...address });
  };

  const handleUpdateAddress = () => {
    if (
      !isEditingAddress ||
      !newAddress.street ||
      !newAddress.city ||
      !newAddress.zipCode
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    updateUserAddress(isEditingAddress, newAddress);
    setIsEditingAddress(null);
    setNewAddress({
      firstName: "",
      lastName: "",
      street: "",
      city: "",
      zipCode: "",
      country: "Poland",
      isDefault: false,
    });
    Alert.alert("Success", "Address updated successfully");
  };

  const handleDeleteAddress = (addressId: string) => {
    if (userAddresses.length <= 1) {
      Alert.alert("Error", "You must have at least one address");
      return;
    }

    Alert.alert(
      "Delete Address",
      "Are you sure you want to delete this address?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteUserAddress(addressId);
            Alert.alert("Success", "Address deleted successfully");
          },
        },
      ]
    );
  };

  const handleSetDefaultAddress = (addressId: string) => {
    setDefaultAddress(addressId);
    Alert.alert("Success", "Default address updated");
  };

  const currentOrder = userOrders.find((order) => order.status === "pending");
  const deliveredOrders = userOrders.filter(
    (order) => order.status === "delivered"
  );
  const otherOrders = userOrders.filter(
    (order) => order.status !== "pending" && order.status !== "delivered"
  );

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.notLoggedIn}>
          <Ionicons
            name="person-circle-outline"
            size={100}
            color={colors.textSecondary}
          />
          <Text style={styles.notLoggedInTitle}>You're not logged in</Text>
          <Text style={styles.notLoggedInText}>
            Login or create an account to access your profile and orders
          </Text>
          <Pressable
            style={styles.loginButton}
            onPress={() => router.push("/auth/login" as any)}
          >
            <Text style={styles.loginButtonText}>Login / Register</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const renderProfileSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Personal Information</Text>
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Full Name</Text>
          <Text style={styles.infoValue}>
            {user?.firstName} {user?.lastName}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{user?.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Username</Text>
          <Text style={styles.infoValue}>{user?.username}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Phone</Text>
          <Text style={styles.infoValue}>{user?.phone || "Not provided"}</Text>
        </View>
      </View>
    </View>
  );

  const renderOrdersSection = () => (
    <View style={styles.section}>
      {userOrders.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons
            name="receipt-outline"
            size={60}
            color={colors.textSecondary}
          />
          <Text style={styles.emptyStateTitle}>No Orders Yet</Text>
          <Text style={styles.emptyStateText}>
            Your order history will appear here after you make purchases
          </Text>
          <Pressable
            style={styles.shopNowButton}
            onPress={() => router.push("/(tabs)" as any)}
          >
            <Text style={styles.shopNowText}>Start Shopping</Text>
          </Pressable>
        </View>
      ) : (
        <>
          {currentOrder && (
            <>
              <Text style={styles.sectionTitle}>Current Order</Text>
              <View style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <Text style={styles.orderNumber}>
                    {currentOrder.orderNumber}
                  </Text>
                  <View style={[styles.statusBadge, styles.statusPending]}>
                    <Text style={styles.statusText}>Pending</Text>
                  </View>
                </View>
                <Text style={styles.orderDate}>
                  Ordered on {currentOrder.date}
                </Text>
                <Text style={styles.orderTotal}>
                  Total: ${currentOrder.total}
                </Text>
                <View style={styles.orderItems}>
                  {currentOrder.items.map((item) => (
                    <View key={item.id} style={styles.orderItem}>
                      <Text style={styles.itemName}>{item.productName}</Text>
                      <Text style={styles.itemDetails}>
                        Qty: {item.quantity} × ${item.price}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}

          <Text style={styles.sectionTitle}>Order History</Text>
          {[...otherOrders, ...deliveredOrders].map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    order.status === "delivered"
                      ? styles.statusDelivered
                      : order.status === "shipped"
                      ? styles.statusShipped
                      : order.status === "confirmed"
                      ? styles.statusConfirmed
                      : styles.statusCancelled,
                  ]}
                >
                  <Text style={styles.statusText}>
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </Text>
                </View>
              </View>
              <Text style={styles.orderDate}>Ordered on {order.date}</Text>
              <Text style={styles.orderTotal}>Total: ${order.total}</Text>
              {order.trackingNumber && (
                <Text style={styles.tracking}>
                  Tracking: {order.trackingNumber}
                </Text>
              )}
            </View>
          ))}
        </>
      )}
    </View>
  );

  const renderAddressesSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Shipping Addresses</Text>

      {/* Add New Address Form */}
      <View style={styles.addAddressCard}>
        <Text style={styles.addAddressTitle}>
          {isEditingAddress ? "Edit Address" : "Add New Address"}
        </Text>
        <View style={styles.addressForm}>
          <View style={styles.formRow}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="First Name"
              value={newAddress.firstName || user?.firstName || ""}
              onChangeText={(text) =>
                setNewAddress((prev) => ({ ...prev, firstName: text }))
              }
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Last Name"
              value={newAddress.lastName || user?.lastName || ""}
              onChangeText={(text) =>
                setNewAddress((prev) => ({ ...prev, lastName: text }))
              }
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Street Address"
            value={newAddress.street}
            onChangeText={(text) =>
              setNewAddress((prev) => ({ ...prev, street: text }))
            }
          />
          <View style={styles.formRow}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="City"
              value={newAddress.city}
              onChangeText={(text) =>
                setNewAddress((prev) => ({ ...prev, city: text }))
              }
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="ZIP Code"
              value={newAddress.zipCode}
              onChangeText={(text) =>
                setNewAddress((prev) => ({ ...prev, zipCode: text }))
              }
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Country"
            value={newAddress.country}
            onChangeText={(text) =>
              setNewAddress((prev) => ({ ...prev, country: text }))
            }
          />
          <View style={styles.formActions}>
            {isEditingAddress ? (
              <>
                <Pressable
                  style={styles.cancelButton}
                  onPress={() => setIsEditingAddress(null)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={styles.saveButton}
                  onPress={handleUpdateAddress}
                >
                  <Text style={styles.saveButtonText}>Update Address</Text>
                </Pressable>
              </>
            ) : (
              <Pressable style={styles.saveButton} onPress={handleAddAddress}>
                <Text style={styles.saveButtonText}>Add Address</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>

      {/* Existing Addresses */}
      {userAddresses.map((address) => (
        <View key={address.id} style={styles.addressCard}>
          <View style={styles.addressHeader}>
            <Text style={styles.addressName}>
              {address.firstName} {address.lastName}
            </Text>
            {address.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultBadgeText}>Default</Text>
              </View>
            )}
          </View>
          <Text style={styles.addressText}>{address.street}</Text>
          <Text style={styles.addressText}>
            {address.city}, {address.zipCode}
          </Text>
          <Text style={styles.addressText}>{address.country}</Text>
          <View style={styles.addressActions}>
            <Pressable
              style={styles.editButton}
              onPress={() => handleEditAddress(address)}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </Pressable>
            {!address.isDefault && (
              <>
                <Pressable
                  style={styles.defaultButton}
                  onPress={() => handleSetDefaultAddress(address.id)}
                >
                  <Text style={styles.defaultButtonText}>Set Default</Text>
                </Pressable>
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => handleDeleteAddress(address.id)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      ))}
    </View>
  );

  const renderSettingsSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Account Settings</Text>
      <Pressable
        style={styles.settingsItem}
        onPress={() => router.push("/auth/change-password" as any)}
      >
        <Ionicons name="key-outline" size={24} color={colors.primary} />
        <Text style={styles.settingsItemText}>Change Password</Text>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.textSecondary}
        />
      </Pressable>

      <Pressable style={styles.settingsItem}>
        <Ionicons
          name="notifications-outline"
          size={24}
          color={colors.primary}
        />
        <Text style={styles.settingsItemText}>Notifications</Text>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.textSecondary}
        />
      </Pressable>

      <Pressable style={styles.settingsItem}>
        <Ionicons name="language-outline" size={24} color={colors.primary} />
        <Text style={styles.settingsItemText}>Language</Text>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.textSecondary}
        />
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color={colors.white} />
          </View>
          <Text style={styles.userName}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>

        <View style={styles.tabContainer}>
          <Pressable
            style={[
              styles.tab,
              activeSection === "profile" && styles.activeTab,
            ]}
            onPress={() => setActiveSection("profile")}
          >
            <Text
              style={[
                styles.tabText,
                activeSection === "profile" && styles.activeTabText,
              ]}
            >
              Profile
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeSection === "orders" && styles.activeTab]}
            onPress={() => setActiveSection("orders")}
          >
            <Text
              style={[
                styles.tabText,
                activeSection === "orders" && styles.activeTabText,
              ]}
            >
              Orders ({userOrders.length})
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.tab,
              activeSection === "addresses" && styles.activeTab,
            ]}
            onPress={() => setActiveSection("addresses")}
          >
            <Text
              style={[
                styles.tabText,
                activeSection === "addresses" && styles.activeTabText,
              ]}
            >
              Addresses ({userAddresses.length})
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.tab,
              activeSection === "settings" && styles.activeTab,
            ]}
            onPress={() => setActiveSection("settings")}
          >
            <Text
              style={[
                styles.tabText,
                activeSection === "settings" && styles.activeTabText,
              ]}
            >
              Settings
            </Text>
          </Pressable>
        </View>

        {activeSection === "profile" && renderProfileSection()}
        {activeSection === "orders" && renderOrdersSection()}
        {activeSection === "addresses" && renderAddressesSection()}
        {activeSection === "settings" && renderSettingsSection()}

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={colors.error} />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  notLoggedIn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xxl,
  },
  notLoggedInTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  notLoggedInText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  loginButton: {
    backgroundColor: colors.black,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    borderRadius: 25,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  userInfo: {
    alignItems: "center",
    padding: spacing.xxl,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  userName: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: "600",
  },
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.md,
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundSecondary,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "600",
  },
  orderCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  statusPending: {
    backgroundColor: "#FFF3CD",
  },
  statusConfirmed: {
    backgroundColor: "#D1ECF1",
  },
  statusShipped: {
    backgroundColor: "#D4EDDA",
  },
  statusDelivered: {
    backgroundColor: "#D4EDDA",
  },
  statusCancelled: {
    backgroundColor: "#F8D7DA",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  orderDate: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  tracking: {
    fontSize: 14,
    color: colors.primary,
  },
  orderItems: {
    marginTop: spacing.sm,
  },
  orderItem: {
    paddingVertical: spacing.xs,
  },
  itemName: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "500",
  },
  itemDetails: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  addressCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  addressName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  defaultBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 4,
  },
  defaultBadgeText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: "500",
  },
  addressText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 2,
  },
  addressActions: {
    flexDirection: "row",
    marginTop: spacing.md,
    gap: spacing.md,
  },
  editButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.primary,
    borderRadius: 6,
  },
  editButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "500",
  },
  deleteButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.error,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "500",
  },
  addAddressButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    gap: spacing.sm,
  },
  addAddressButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingsItemText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: spacing.md,
    fontWeight: "500",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.xl,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.error,
  },
  logoutButtonText: {
    fontSize: 16,
    color: colors.error,
    fontWeight: "600",
    marginLeft: spacing.sm,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  emptyStateText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  shopNowButton: {
    backgroundColor: colors.black,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 25,
  },
  shopNowText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  addAddressCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addAddressTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.md,
  },
  addressForm: {
    gap: spacing.md,
  },
  formRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  input: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 14,
  },
  halfInput: {
    flex: 1,
  },
  formActions: {
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "flex-end",
  },
  cancelButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: colors.black,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 8,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  defaultButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.primary,
    borderRadius: 6,
  },
  defaultButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "500",
  },
});
