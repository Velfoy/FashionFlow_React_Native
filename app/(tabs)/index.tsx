import FeaturedCategories from "@/components/FeaturedCategories";
import HeaderNav from "@/components/HeaderNav";
import HeroSlider from "@/components/HeroSlider";
import HomeBottomInfo from "@/components/HomeBottomInfo";
import RecommendedProducts from "@/components/RecommendedProducts";
import { colors } from "@/styles/colors";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HomePage() {
  return (
    <View style={styles.container}>
      <HeaderNav showLogo={true} title="Shopping" showAccount={true} />
      <StatusBar style="dark" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <HeroSlider />
        <FeaturedCategories />
        <RecommendedProducts />
        <HomeBottomInfo />
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
});
