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

const { width } = Dimensions.get("window");

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

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (width * 0.91));
    setActiveIndex(index);
  };

  return (
    <View style={styles.heroSlider}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <Image
              source={{ uri: slide.image }}
              style={styles.slideBackground}
              contentFit="cover"
            />
            <View style={styles.overlay} />
            <View style={styles.slideContent}>
              <Text style={styles.slideTitle}>{slide.title}</Text>
              <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
              <View style={styles.emailInput}>
                <TextInput
                  style={styles.input}
                  placeholder={slide.placeholder}
                  placeholderTextColor={colors.textSecondary}
                />
                <Pressable style={styles.button}>
                  <Text style={styles.buttonText}>{slide.buttonText}</Text>
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
                x: index * (width * 0.91),
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
    height: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  slide: {
    width: width * 0.91,
    height: 400,
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
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  slideContent: {
    position: "absolute",
    left: spacing.xl,
    justifyContent: "center",
    height: "100%",
    maxWidth: 350,
    zIndex: 1,
  },
  slideTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.white,
    marginBottom: spacing.sm,
    lineHeight: 38,
  },
  slideSubtitle: {
    fontSize: 16,
    color: colors.white,
    marginBottom: spacing.lg,
    opacity: 0.9,
    lineHeight: 22,
  },
  emailInput: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 25,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  input: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: 14,
    fontWeight: "500",
  },
  button: {
    backgroundColor: colors.black,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    justifyContent: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
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
