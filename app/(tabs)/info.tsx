import { useResponsive } from "@/hooks/useResponsive";
import { colors } from "@/styles/colors";
import { spacing } from "@/styles/spacing";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Content for expandable sections
const importantLinksContent = {
  "About Us": `FashionFlow is your premier destination for the latest trends in fashion. Founded in 2020, we've been committed to providing high-quality clothing and accessories that combine style, comfort, and affordability.

Our mission is to make fashion accessible to everyone while maintaining the highest standards of quality and customer service. We work with trusted suppliers and designers to bring you the best products at competitive prices.`,

  "Delivery Information": `We offer fast and reliable delivery services across multiple countries. Here's what you need to know:

• Standard Delivery: 3-5 business days - $4.99
• Express Delivery: 1-2 business days - $9.99
• Free delivery on orders over $50

Delivery Areas:
- Poland: All major cities
- Ukraine: Kherson and surrounding areas
- International: Selected countries

Track your order in real-time through our mobile app or website.`,

  "Privacy Policy": `Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.

Information We Collect:
• Personal details (name, email, phone)
• Shipping and billing addresses
• Payment information (securely processed)
• Shopping preferences and history

We use your information to:
• Process your orders efficiently
• Provide personalized recommendations
• Improve our services
• Send important updates (you can opt-out anytime)`,

  "Terms & Conditions": `By using our services, you agree to these terms:

1. Order Acceptance: All orders are subject to product availability and confirmation of payment
2. Pricing: Prices are subject to change without notice
3. Returns: 30-day return policy for unused items with tags
4. Intellectual Property: All content on our platform is protected by copyright
5. Account Security: You are responsible for maintaining your account security`,

  "Support Center": `Need help? We're here for you 24/7!

Contact Options:
• Live Chat: Available 24/7 on our website
• Email Support: response within 2 hours
• Phone Support: 10:00-18:00 Mon-Sat
• FAQ Section: Comprehensive help articles

Common Issues:
- Order tracking problems
- Size and fit guidance
- Return and exchange process
- Payment issues resolution`,

  Careers: `Join our growing team! We're always looking for talented individuals who are passionate about fashion and technology.

Current Openings:
• Frontend Developer (React Native)
• UX/UI Designer
• Customer Support Specialist
• Marketing Manager
• Logistics Coordinator

Benefits:
- Competitive salary
- Flexible working hours
- Employee discount
- Professional development
- Friendly work environment`,
};

export default function InfoPage() {
  const { isTablet, isLandscape } = useResponsive();
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});

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
    const address = encodeURIComponent("Aleje Politechniki 7, Łódź, Poland");
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${address}`
    );
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          isTablet && styles.scrollContentTablet,
        ]}
      >
        {/* Logo & Description */}
        <View
          style={[
            styles.section,
            isTablet && styles.sectionTablet,
            isLandscape && styles.sectionLandscape,
          ]}
        >
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1563089145-599997674d42?w=400&h=200&fit=crop&auto=format",
            }}
            style={[styles.logo, isTablet && styles.logoTablet]}
            contentFit="cover"
          />
          <Text
            style={[styles.description, isTablet && styles.descriptionTablet]}
          >
            Awesome online shop for your style update. Discover the latest
            trends in fashion with our carefully curated collection of clothing
            and accessories.
          </Text>
        </View>

        {/* Contact Information */}
        <View style={[styles.section, isTablet && styles.sectionTablet]}>
          <Text
            style={[styles.sectionTitle, isTablet && styles.sectionTitleTablet]}
          >
            Contact Us
          </Text>

          <View
            style={[styles.contactGrid, isTablet && styles.contactGridTablet]}
          >
            <Pressable
              style={[styles.contactItem, isTablet && styles.contactItemTablet]}
              onPress={openMap}
            >
              <Ionicons
                name="location"
                size={isTablet ? 28 : 24}
                color={colors.primary}
              />
              <View style={styles.contactText}>
                <Text
                  style={[
                    styles.contactLabel,
                    isTablet && styles.contactLabelTablet,
                  ]}
                >
                  Address:
                </Text>
                <Text
                  style={[
                    styles.contactValue,
                    isTablet && styles.contactValueTablet,
                  ]}
                >
                  ul.Stritenska 74, Kherson
                </Text>
                <Text
                  style={[
                    styles.contactValue,
                    isTablet && styles.contactValueTablet,
                  ]}
                >
                  or ul.Aleje Politechniki 7, Łódź
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={[styles.contactItem, isTablet && styles.contactItemTablet]}
              onPress={() => openPhone("+380953246066")}
            >
              <Ionicons
                name="call"
                size={isTablet ? 28 : 24}
                color={colors.primary}
              />
              <View style={styles.contactText}>
                <Text
                  style={[
                    styles.contactLabel,
                    isTablet && styles.contactLabelTablet,
                  ]}
                >
                  Call Us:
                </Text>
                <Text
                  style={[
                    styles.contactValue,
                    isTablet && styles.contactValueTablet,
                  ]}
                >
                  +(380)95 324 6066
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={[styles.contactItem, isTablet && styles.contactItemTablet]}
              onPress={() => openPhone("+48883589324")}
            >
              <Ionicons
                name="call"
                size={isTablet ? 28 : 24}
                color={colors.primary}
              />
              <View style={styles.contactText}>
                <Text
                  style={[
                    styles.contactLabel,
                    isTablet && styles.contactLabelTablet,
                  ]}
                >
                  Help Line:
                </Text>
                <Text
                  style={[
                    styles.contactValue,
                    isTablet && styles.contactValueTablet,
                  ]}
                >
                  +48 883 589 324
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={[styles.contactItem, isTablet && styles.contactItemTablet]}
              onPress={() => openEmail("marsonyteam@gmail.com")}
            >
              <Ionicons
                name="mail"
                size={isTablet ? 28 : 24}
                color={colors.primary}
              />
              <View style={styles.contactText}>
                <Text
                  style={[
                    styles.contactLabel,
                    isTablet && styles.contactLabelTablet,
                  ]}
                >
                  Email:
                </Text>
                <Text
                  style={[
                    styles.contactValue,
                    isTablet && styles.contactValueTablet,
                  ]}
                >
                  marsonyteam@gmail.com
                </Text>
              </View>
            </Pressable>

            <View
              style={[styles.contactItem, isTablet && styles.contactItemTablet]}
            >
              <Ionicons
                name="time"
                size={isTablet ? 28 : 24}
                color={colors.primary}
              />
              <View style={styles.contactText}>
                <Text
                  style={[
                    styles.contactLabel,
                    isTablet && styles.contactLabelTablet,
                  ]}
                >
                  Hours:
                </Text>
                <Text
                  style={[
                    styles.contactValue,
                    isTablet && styles.contactValueTablet,
                  ]}
                >
                  10:00 - 18:00, Mon - Sat
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Important Links - Expandable */}
        <View style={[styles.section, isTablet && styles.sectionTablet]}>
          <Text
            style={[styles.sectionTitle, isTablet && styles.sectionTitleTablet]}
          >
            Important Information
          </Text>

          {Object.entries(importantLinksContent).map(([title, content]) => (
            <View key={title} style={styles.expandableSection}>
              <Pressable
                style={[styles.linkItem, isTablet && styles.linkItemTablet]}
                onPress={() => toggleSection(title)}
              >
                <Text
                  style={[styles.linkText, isTablet && styles.linkTextTablet]}
                >
                  {title}
                </Text>
                <Ionicons
                  name={
                    expandedSections[title] ? "chevron-down" : "chevron-forward"
                  }
                  size={isTablet ? 24 : 20}
                  color={colors.primary}
                />
              </Pressable>

              {expandedSections[title] && (
                <View
                  style={[
                    styles.expandedContent,
                    isTablet && styles.expandedContentTablet,
                  ]}
                >
                  <Text
                    style={[
                      styles.expandedText,
                      isTablet && styles.expandedTextTablet,
                    ]}
                  >
                    {content}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Payment Methods */}
        <View style={[styles.section, isTablet && styles.sectionTablet]}>
          <Text
            style={[styles.sectionTitle, isTablet && styles.sectionTitleTablet]}
          >
            Payment Methods
          </Text>

          <View
            style={[styles.paymentLogos, isTablet && styles.paymentLogosTablet]}
          >
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png",
              }}
              style={[styles.paymentLogo, isTablet && styles.paymentLogoTablet]}
              contentFit="contain"
            />
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/2560px-Mastercard-logo.svg.png",
              }}
              style={[styles.paymentLogo, isTablet && styles.paymentLogoTablet]}
              contentFit="contain"
            />
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/BLIK_logo.svg/2560px-BLIK_logo.svg.png",
              }}
              style={[styles.paymentLogo, isTablet && styles.paymentLogoTablet]}
              contentFit="contain"
            />
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/mBank_logo_2015.svg/2560px-mBank_logo_2015.svg.png",
              }}
              style={[styles.paymentLogo, isTablet && styles.paymentLogoTablet]}
              contentFit="contain"
            />
          </View>
        </View>

        {/* Social Media */}
        <View style={[styles.section, isTablet && styles.sectionTablet]}>
          <Text
            style={[styles.sectionTitle, isTablet && styles.sectionTitleTablet]}
          >
            Follow Us
          </Text>
          <View
            style={[styles.socialIcons, isTablet && styles.socialIconsTablet]}
          >
            <Pressable
              style={[styles.socialIcon, { backgroundColor: "#1877F2" }]}
              onPress={() => openSocial("https://facebook.com")}
            >
              <Ionicons
                name="logo-facebook"
                size={isTablet ? 28 : 24}
                color={colors.white}
              />
            </Pressable>
            <Pressable
              style={[styles.socialIcon, { backgroundColor: "#1DA1F2" }]}
              onPress={() => openSocial("https://twitter.com")}
            >
              <Ionicons
                name="logo-twitter"
                size={isTablet ? 28 : 24}
                color={colors.white}
              />
            </Pressable>
            <Pressable
              style={[styles.socialIcon, { backgroundColor: "#E4405F" }]}
              onPress={() => openSocial("https://instagram.com")}
            >
              <Ionicons
                name="logo-instagram"
                size={isTablet ? 28 : 24}
                color={colors.white}
              />
            </Pressable>
            <Pressable
              style={[styles.socialIcon, { backgroundColor: "#BD081C" }]}
              onPress={() => openSocial("https://pinterest.com")}
            >
              <Ionicons
                name="logo-pinterest"
                size={isTablet ? 28 : 24}
                color={colors.white}
              />
            </Pressable>
          </View>
          <Text
            style={[styles.discountText, isTablet && styles.discountTextTablet]}
          >
            Up to 15% discount on your first subscribe to our newsletter
          </Text>
        </View>

        {/* Map */}
        <View style={[styles.section, isTablet && styles.sectionTablet]}>
          <Text
            style={[styles.sectionTitle, isTablet && styles.sectionTitleTablet]}
          >
            Our Location
          </Text>
          <Pressable onPress={openMap}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=300&fit=crop&auto=format",
              }}
              style={[styles.map, isTablet && styles.mapTablet]}
              contentFit="cover"
            />
          </Pressable>
        </View>

        {/* Copyright */}
        <View style={[styles.copyright, isTablet && styles.copyrightTablet]}>
          <Text
            style={[
              styles.copyrightText,
              isTablet && styles.copyrightTextTablet,
            ]}
          >
            © 2025, FashionFlow
          </Text>
          <Text
            style={[
              styles.copyrightText,
              isTablet && styles.copyrightTextTablet,
            ]}
          >
            All rights reserved
          </Text>
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
  scrollContent: {
    flexGrow: 1,
  },
  scrollContentTablet: {
    paddingHorizontal: spacing.xl,
  },
  section: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
    marginBottom: spacing.md,
    borderRadius: 12,
  },
  sectionTablet: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  sectionLandscape: {
    paddingHorizontal: spacing.xl,
  },
  logo: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  logoTablet: {
    height: 200,
    borderRadius: 16,
    marginBottom: spacing.lg,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    textAlign: "center",
  },
  descriptionTablet: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: "center",
    paddingHorizontal: spacing.xl,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: spacing.lg,
  },
  sectionTitleTablet: {
    fontSize: 28,
    marginBottom: spacing.xl,
    textAlign: "center",
  },
  contactGrid: {
    // Default mobile layout (vertical)
  },
  contactGridTablet: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: spacing.lg,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.lg,
    paddingVertical: spacing.sm,
  },
  contactItemTablet: {
    width: "48%", // 2 columns on tablet
    marginBottom: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderLight,
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
  contactLabelTablet: {
    fontSize: 16,
    marginBottom: spacing.sm,
  },
  contactValue: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  contactValueTablet: {
    fontSize: 15,
    lineHeight: 22,
  },
  // Expandable Sections
  expandableSection: {
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 8,
    overflow: "hidden",
  },
  linkItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
  },
  linkItemTablet: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  linkText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: "500",
  },
  linkTextTablet: {
    fontSize: 18,
    fontWeight: "600",
  },
  expandedContent: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  expandedContentTablet: {
    padding: spacing.xl,
  },
  expandedText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  expandedTextTablet: {
    fontSize: 16,
    lineHeight: 26,
  },
  // Payment Methods
  paymentSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    textAlign: "left",
  },
  paymentSubtitleTablet: {
    fontSize: 16,
    marginBottom: spacing.lg,
  },
  paymentLogos: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
    justifyContent: "flex-start",
  },
  paymentLogosTablet: {
    gap: spacing.xl,
    justifyContent: "space-around",
  },
  paymentLogo: {
    width: 70,
    height: 45,
    borderRadius: 8,
  },
  paymentLogoTablet: {
    width: 100,
    height: 60,
    borderRadius: 12,
  },
  // Social Media
  socialIcons: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.md,
    justifyContent: "flex-start",
  },
  socialIconsTablet: {
    gap: spacing.xl,
    marginBottom: spacing.lg,
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
    textAlign: "left",
  },
  discountTextTablet: {
    fontSize: 16,
  },
  // Map
  map: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  mapTablet: {
    height: 300,
    borderRadius: 16,
  },
  // Copyright
  copyright: {
    padding: spacing.xl,
    alignItems: "center",
    backgroundColor: colors.white,
    marginTop: spacing.md,
  },
  copyrightTablet: {
    padding: spacing.xxl,
    marginHorizontal: spacing.xl,
    borderRadius: 12,
  },
  copyrightText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
  },
  copyrightTextTablet: {
    fontSize: 16,
  },
});
