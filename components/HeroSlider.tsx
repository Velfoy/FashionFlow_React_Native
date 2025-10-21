import { useResponsive } from "@/hooks/useResponsive";
import { colors } from "@/styles/colors";
import { spacing } from "@/styles/spacing";
import { Image } from "expo-image";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const slides = [
  {
    title: "Explore the New Collection",
    subtitle: "Trendy styles just arrived for you",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop&auto=format",
    placeholder: "Enter your email",
    buttonText: "Join Now",
  },
  {
    title: "Fast Fashion Big discount",
    subtitle: "Save up to 50% off on your first order",
    image:
      "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=800&h=400&fit=crop&auto=format",
    placeholder: "Get offers in your inbox",
    buttonText: "Get Offers",
  },
  {
    title: "Stay Ahead of Fashion",
    subtitle: "Be the first to know about new drops",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=400&fit=crop&auto=format",
    placeholder: "Subscribe to updates",
    buttonText: "Subscribe",
  },
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const { width, isSmallDevice, isTablet, isLargeDevice } = useResponsive();
  const screenHeight = Dimensions.get("window").height;

  // Slider dimensions responsive to screen height
  const sliderHeight = isLargeDevice
    ? screenHeight * 0.55
    : isTablet
    ? screenHeight * 0.5
    : isSmallDevice
    ? screenHeight * 0.45
    : screenHeight * 0.5;

  const slideWidth = width * 0.91;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / slideWidth);
    setActiveIndex(index);
  };

  // Typography - independent font sizes for different devices
  const getTitleSize = () => {
    if (isSmallDevice) return 22; // phone
    if (isTablet) return 28; // tablet
    return 32; // large devices / desktop
  };

  const getSubtitleSize = () => {
    if (isSmallDevice) return 14;
    if (isTablet) return 16;
    return 18;
  };

  // Button font sizes
  const getButtonFontSize = () => {
    if (isSmallDevice) return 12;
    if (isTablet) return 14;
    return 16;
  };

  // Input font sizes
  const getInputFontSize = () => {
    if (isSmallDevice) return 12;
    if (isTablet) return 14;
    return 16;
  };

  // Layout
  const contentPadding = isSmallDevice ? spacing.lg : spacing.xl;
  const maxContentWidth = isSmallDevice ? width * 0.7 : 350;

  // Fixed input width
  const getInputWidth = () => {
    if (isSmallDevice) return maxContentWidth - 20; // Account for padding
    return 280; // Fixed width for tablets and larger
  };

  // Button & input responsive padding
  const getButtonPadding = () => ({
    paddingHorizontal: isSmallDevice ? spacing.md : spacing.lg,
    paddingVertical: isSmallDevice ? spacing.sm : spacing.md,
  });

  const getInputPadding = () => ({
    paddingHorizontal: isSmallDevice ? spacing.md : spacing.lg,
    paddingVertical: isSmallDevice ? spacing.sm : spacing.md,
  });

  return (
    <View style={[styles.heroSlider, { height: sliderHeight }]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {slides.map((slide, index) => (
          <View key={index} style={[styles.slide, { width: slideWidth }]}>
            <Image
              source={{ uri: slide.image }}
              style={styles.slideBackground}
              contentFit="cover"
            />
            <View style={styles.overlay} />
            <View
              style={[
                styles.slideContent,
                { left: contentPadding, maxWidth: maxContentWidth },
              ]}
            >
              <Text
                style={[styles.slideTitle, { fontSize: getTitleSize() }]}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {slide.title}
              </Text>
              <Text
                style={[styles.slideSubtitle, { fontSize: getSubtitleSize() }]}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {slide.subtitle}
              </Text>
              <View
                style={[
                  styles.emailInput,
                  {
                    flexDirection: isSmallDevice ? "column" : "row",
                    borderRadius: isSmallDevice ? 15 : 25,
                    width: getInputWidth(),
                  },
                ]}
              >
                <TextInput
                  style={[
                    styles.input,
                    getInputPadding(),
                    {
                      fontSize: getInputFontSize(),
                      width: isSmallDevice ? "100%" : "auto",
                    },
                  ]}
                  placeholder={slide.placeholder}
                  placeholderTextColor={colors.textSecondary}
                  numberOfLines={1}
                />
                <Pressable
                  style={[
                    styles.button,
                    getButtonPadding(),
                    isSmallDevice && { width: "100%" },
                  ]}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      { fontSize: getButtonFontSize() },
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {slide.buttonText}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <Pressable
            key={index}
            onPress={() => {
              scrollViewRef.current?.scrollTo({
                x: index * slideWidth,
                animated: true,
              });
              setActiveIndex(index);
            }}
          >
            <View
              style={[styles.dot, activeIndex === index && styles.activeDot]}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroSlider: {
    width: "91%",
    alignSelf: "center",
    borderRadius: 20,
    overflow: "hidden",
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  slide: {
    height: "100%",
    position: "relative",
  },
  slideBackground: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  slideContent: {
    position: "absolute",
    justifyContent: "center",
    height: "100%",
    zIndex: 1,
  },
  slideTitle: {
    fontWeight: "700",
    color: colors.white,
    marginBottom: spacing.sm,
  },
  slideSubtitle: {
    color: colors.white,
    marginBottom: spacing.lg,
    opacity: 0.9,
  },
  emailInput: {
    backgroundColor: colors.white,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  input: {
    flex: 1,
    // color: colors.textPrimary,
  },
  button: {
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontWeight: "600",
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: spacing.lg,
    alignSelf: "center",
    gap: spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
    opacity: 0.6,
  },
  activeDot: {
    opacity: 1,
    transform: [{ scale: 1.3 }],
    backgroundColor: colors.white,
  },
});
