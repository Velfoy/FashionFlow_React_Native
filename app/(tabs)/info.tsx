import { colors } from "@/styles/colors";
import { spacing } from "@/styles/spacing";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InfoPage() {
  const openPhone = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const openEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const openSocial = (url: string) => {
    Linking.openURL(url);
  };

  const openMap = () => {
    // Open Google Maps with one of the addresses
    const address = encodeURIComponent("Aleje Politechniki 7, Łódź, Poland");
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${address}`
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo & Description */}
        <View style={styles.section}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1563089145-599997674d42?w=400&h=200&fit=crop&auto=format",
            }}
            style={styles.logo}
            contentFit="cover"
          />
          <Text style={styles.description}>
            Awesome online shop for your style update
          </Text>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>

          <Pressable style={styles.contactItem} onPress={openMap}>
            <Ionicons name="location" size={24} color={colors.primary} />
            <View style={styles.contactText}>
              <Text style={styles.contactLabel}>Address:</Text>
              <Text style={styles.contactValue}>ul.Stritenska 74, Kherson</Text>
              <Text style={styles.contactValue}>
                or ul.Aleje Politechniki 7, Łódź
              </Text>
            </View>
          </Pressable>

          <Pressable
            style={styles.contactItem}
            onPress={() => openPhone("+380953246066")}
          >
            <Ionicons name="call" size={24} color={colors.primary} />
            <View style={styles.contactText}>
              <Text style={styles.contactLabel}>Call Us:</Text>
              <Text style={styles.contactValue}>+(380)95 324 6066</Text>
            </View>
          </Pressable>

          <Pressable
            style={styles.contactItem}
            onPress={() => openPhone("+48883589324")}
          >
            <Ionicons name="call" size={24} color={colors.primary} />
            <View style={styles.contactText}>
              <Text style={styles.contactLabel}>Help Line:</Text>
              <Text style={styles.contactValue}>+48 883 589 324</Text>
            </View>
          </Pressable>

          <Pressable
            style={styles.contactItem}
            onPress={() => openEmail("marsonyteam@gmail.com")}
          >
            <Ionicons name="mail" size={24} color={colors.primary} />
            <View style={styles.contactText}>
              <Text style={styles.contactLabel}>Email:</Text>
              <Text style={styles.contactValue}>marsonyteam@gmail.com</Text>
            </View>
          </Pressable>

          <View style={styles.contactItem}>
            <Ionicons name="time" size={24} color={colors.primary} />
            <View style={styles.contactText}>
              <Text style={styles.contactLabel}>Hours:</Text>
              <Text style={styles.contactValue}>10:00 - 18:00, Mon - Sat</Text>
            </View>
          </View>
        </View>

        {/* Important Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Important</Text>
          <Pressable style={styles.linkItem}>
            <Text style={styles.linkText}>About Us</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textSecondary}
            />
          </Pressable>
          <Pressable style={styles.linkItem}>
            <Text style={styles.linkText}>Delivery Information</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textSecondary}
            />
          </Pressable>
          <Pressable style={styles.linkItem}>
            <Text style={styles.linkText}>Privacy Policy</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textSecondary}
            />
          </Pressable>
          <Pressable style={styles.linkItem}>
            <Text style={styles.linkText}>Terms & Conditions</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textSecondary}
            />
          </Pressable>
          <Pressable style={styles.linkItem}>
            <Text style={styles.linkText}>Support Center</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textSecondary}
            />
          </Pressable>
          <Pressable style={styles.linkItem}>
            <Text style={styles.linkText}>Careers</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textSecondary}
            />
          </Pressable>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          <Text style={styles.paymentSubtitle}>Secured Payment Gateways</Text>
          <View style={styles.paymentLogos}>
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png",
              }}
              style={styles.paymentLogo}
              contentFit="contain"
            />
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/2560px-Mastercard-logo.svg.png",
              }}
              style={styles.paymentLogo}
              contentFit="contain"
            />
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/BLIK_logo.svg/2560px-BLIK_logo.svg.png",
              }}
              style={styles.paymentLogo}
              contentFit="contain"
            />
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/mBank_logo_2015.svg/2560px-mBank_logo_2015.svg.png",
              }}
              style={styles.paymentLogo}
              contentFit="contain"
            />
          </View>
        </View>

        {/* Social Media */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Follow Us</Text>
          <View style={styles.socialIcons}>
            <Pressable
              style={[styles.socialIcon, { backgroundColor: "#1877F2" }]}
              onPress={() => openSocial("https://facebook.com")}
            >
              <Ionicons name="logo-facebook" size={24} color={colors.white} />
            </Pressable>
            <Pressable
              style={[styles.socialIcon, { backgroundColor: "#1DA1F2" }]}
              onPress={() => openSocial("https://twitter.com")}
            >
              <Ionicons name="logo-twitter" size={24} color={colors.white} />
            </Pressable>
            <Pressable
              style={[styles.socialIcon, { backgroundColor: "#E4405F" }]}
              onPress={() => openSocial("https://instagram.com")}
            >
              <Ionicons name="logo-instagram" size={24} color={colors.white} />
            </Pressable>
            <Pressable
              style={[styles.socialIcon, { backgroundColor: "#BD081C" }]}
              onPress={() => openSocial("https://pinterest.com")}
            >
              <Ionicons name="logo-pinterest" size={24} color={colors.white} />
            </Pressable>
          </View>
          <Text style={styles.discountText}>
            Up to 15% discount on your first subscribe
          </Text>
        </View>

        {/* Map */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Location</Text>
          <Pressable onPress={openMap}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=300&fit=crop&auto=format",
              }}
              style={styles.map}
              contentFit="cover"
            />
          </Pressable>
        </View>

        {/* Copyright */}
        <View style={styles.copyright}>
          <Text style={styles.copyrightText}>© 2025, FashionFlow</Text>
          <Text style={styles.copyrightText}>All rights reserved</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  section: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
  },
  logo: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: spacing.lg,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.lg,
    paddingVertical: spacing.sm,
  },
  contactText: {
    flex: 1,
    marginLeft: spacing.md,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  contactValue: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  linkItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  linkText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: "500",
  },
  paymentSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  paymentLogos: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
    justifyContent: "center",
  },
  paymentLogo: {
    width: 70,
    height: 45,
    borderRadius: 8,
  },
  socialIcons: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.md,
    justifyContent: "center",
  },
  socialIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  discountText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  copyright: {
    padding: spacing.xl,
    alignItems: "center",
    backgroundColor: colors.white,
  },
  copyrightText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
