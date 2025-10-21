import { colors } from "@/styles/colors";
import React, { useEffect } from "react";

import HeaderNav from "@/components/HeaderNav";
import SearchBar from "@/components/SearchBar";
import { useCategory } from "@/contexts/CategoryContext";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View } from "react-native";

export default function ProductsPage() {
  const { selectedCategory, setSelectedCategory } = useCategory();

  useEffect(() => {
    if (selectedCategory) {
      console.log("Navigated to Products with category:", selectedCategory);
      // You can optionally clear the category after handling it
      // setSelectedCategory(null);
    }
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      <HeaderNav showLogo={true} showAccount={true} showCart={true} />
      <StatusBar style="dark" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <SearchBar
          showResults={true}
          initialCategory={selectedCategory} // Pass the selected category to SearchBar
        />
        {/* 
        <BestSellingProducts></BestSellingProducts> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: colors.text,
  },
  scrollView: {
    flex: 1,
  },
});
