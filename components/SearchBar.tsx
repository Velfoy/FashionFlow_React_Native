import { useCategory } from "@/contexts/CategoryContext";
import { useResponsive } from "@/hooks/useResponsive";
import { colors } from "@/styles/colors";
import { spacing } from "@/styles/spacing";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// Mock data for products - matching the product detail page structure
const mockProducts = [
  {
    id: 1,
    title: "Nike Air Max 270",
    category: "Shoes",
    price: 2499,
    originalPrice: 4999,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    rating: 5.0,
    owner: "Nike",
    hasDiscount: true,
    description:
      "Experience unparalleled comfort and style with the Nike Air Max 270. Featuring the largest Air Max unit yet, these shoes provide maximum cushioning for all-day wear.",
    color: "black/white",
    material: "synthetic mesh",
    condition: "new",
    views: 149,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1512852939750-1305098529bf?w=500&h=500&fit=crop",
    ],
    tags: [
      "👟 running shoes",
      "⭐ premium",
      "💨 air max technology",
      "🏃 athletic",
    ],
  },
  {
    id: 2,
    title: "Adidas Ultraboost",
    category: "Shoes",
    price: 2199,
    originalPrice: 4599,
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop",
    rating: 4.8,
    owner: "Adidas",
    hasDiscount: true,
    description:
      "The Adidas Ultraboost combines responsive cushioning with a sleek, modern design. Featuring Boost midsole technology for exceptional energy return.",
    color: "core black",
    material: "primeknit",
    condition: "new",
    views: 203,
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1499364786053-c25f0d1e039f?w=500&h=500&fit=crop",
    ],
    tags: [
      "👟 boost technology",
      "🎯 performance",
      "💫 energy return",
      "🏃 running",
    ],
  },
  {
    id: 3,
    title: "Puma RS-X",
    category: "Shoes",
    price: 1899,
    originalPrice: 3999,
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&h=500&fit=crop",
    rating: 4.5,
    owner: "Puma",
    hasDiscount: true,
    description:
      "Bold and futuristic, the Puma RS-X brings retro-inspired design with modern comfort. The chunky silhouette and mixed-material upper create a unique street-style look.",
    color: "multi-color",
    material: "synthetic leather",
    condition: "new",
    views: 87,
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    ],
    tags: ["👟 retro style", "🎨 colorful", "🛸 futuristic", "🚶 casual wear"],
  },
  {
    id: 4,
    title: "New Balance 574",
    category: "Shoes",
    price: 1999,
    originalPrice: 4299,
    image:
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500&h=500&fit=crop",
    rating: 4.7,
    owner: "New Balance",
    hasDiscount: true,
    description:
      "A timeless classic reimagined for modern comfort. The New Balance 574 features ENCAP midsole technology for superior support and durability.",
    color: "grey",
    material: "suede/mesh",
    condition: "new",
    views: 124,
    images: [
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1512852939750-1305098529bf?w=500&h=500&fit=crop",
    ],
    tags: ["👟 classic", "💎 durable", "🎯 versatile", "🚶 everyday wear"],
  },
  {
    id: 5,
    title: "Classic Blue Jeans",
    category: "Jeans",
    price: 59,
    originalPrice: 79,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop",
    rating: 4.3,
    owner: "Denim Co.",
    hasDiscount: true,
    description:
      "Classic blue jeans made from premium denim. Perfect fit and comfortable for everyday wear with excellent durability.",
    color: "blue",
    material: "denim",
    condition: "new",
    views: 89,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1506629905607-e48b0e67d879?w=500&h=500&fit=crop",
    ],
    tags: ["👖 denim", "💙 classic", "🎯 everyday", "🚶 casual"],
  },
  {
    id: 6,
    title: "Cotton T-Shirt",
    category: "T-shirts",
    price: 25,
    originalPrice: 35,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    rating: 4.6,
    owner: "Cotton Brand",
    hasDiscount: true,
    description:
      "Soft and comfortable cotton t-shirt. Perfect for casual wear with a modern fit and excellent breathability.",
    color: "white",
    material: "cotton",
    condition: "new",
    views: 156,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1506629905607-e48b0e67d879?w=500&h=500&fit=crop",
    ],
    tags: ["👕 cotton", "⚪ basic", "💫 comfortable", "🚶 casual"],
  },
  {
    id: 7,
    title: "Summer Shorts",
    category: "Shorts",
    price: 35,
    originalPrice: 45,
    image:
      "https://images.unsplash.com/photo-1506629905607-e48b0e67d879?w=500&h=500&fit=crop",
    rating: 4.2,
    owner: "Casual Wear",
    hasDiscount: true,
    description:
      "Lightweight and comfortable summer shorts. Perfect for warm weather with excellent ventilation and modern style.",
    color: "khaki",
    material: "cotton blend",
    condition: "new",
    views: 78,
    images: [
      "https://images.unsplash.com/photo-1506629905607-e48b0e67d879?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    ],
    tags: ["🩳 summer", "☀️ lightweight", "💨 breathable", "🚶 casual"],
  },
  {
    id: 8,
    title: "Business Suit",
    category: "Suits",
    price: 299,
    originalPrice: 399,
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop",
    rating: 4.8,
    owner: "Formal Attire",
    hasDiscount: true,
    description:
      "Premium business suit with excellent tailoring and premium fabric. Perfect for professional settings and formal occasions.",
    color: "navy blue",
    material: "wool blend",
    condition: "new",
    views: 203,
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop",
    ],
    tags: ["👔 formal", "💼 business", "⭐ premium", "🎯 professional"],
  },
  {
    id: 9,
    title: "Running Leggings",
    category: "Leggings",
    price: 45,
    originalPrice: 65,
    image:
      "https://images.unsplash.com/photo-1588580000645-4562a6d2d839?w=500&h=500&fit=crop",
    rating: 4.7,
    owner: "Active Wear",
    hasDiscount: true,
    description:
      "High-performance running leggings with moisture-wicking technology. Perfect for workouts and athletic activities.",
    color: "black",
    material: "spandex blend",
    condition: "new",
    views: 134,
    images: [
      "https://images.unsplash.com/photo-1588580000645-4562a6d2d839?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1506629905607-e48b0e67d879?w=500&h=500&fit=crop",
    ],
    tags: ["🧦 athletic", "🏃 running", "💪 workout", "🎯 performance"],
  },
  {
    id: 10,
    title: "Winter Cardigan",
    category: "Cardigans",
    price: 75,
    originalPrice: 95,
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=500&fit=crop",
    rating: 4.4,
    owner: "Cozy Wear",
    hasDiscount: true,
    description:
      "Warm and comfortable winter cardigan. Perfect for cold weather with soft fabric and modern design.",
    color: "cream",
    material: "wool blend",
    condition: "new",
    views: 98,
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    ],
    tags: ["🧥 warm", "❄️ winter", "💫 cozy", "🚶 casual"],
  },
  {
    id: 11,
    title: "Leather Sneakers",
    category: "Sneakers",
    price: 129,
    originalPrice: 179,
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&h=500&fit=crop",
    rating: 4.6,
    owner: "Urban Style",
    hasDiscount: true,
    description:
      "Premium leather sneakers with modern design and comfortable fit. Perfect for urban style and everyday wear.",
    color: "brown",
    material: "genuine leather",
    condition: "new",
    views: 167,
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    ],
    tags: ["👟 leather", "🏙️ urban", "⭐ premium", "🚶 everyday"],
  },
  {
    id: 12,
    title: "Summer Sandals",
    category: "Sandals",
    price: 42,
    originalPrice: 58,
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=500&fit=crop",
    rating: 4.3,
    owner: "Beach Wear",
    hasDiscount: true,
    description:
      "Comfortable summer sandals perfect for beach and casual wear. Lightweight design with excellent grip.",
    color: "beige",
    material: "synthetic",
    condition: "new",
    views: 112,
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1506629905607-e48b0e67d879?w=500&h=500&fit=crop",
    ],
    tags: ["👡 summer", "🏖️ beach", "💫 comfortable", "☀️ lightweight"],
  },
];

const categories = [
  "All Categories",
  "Shoes",
  "Jeans",
  "T-shirts",
  "Shorts",
  "Suits",
  "Leggings",
  "Cardigans",
  "Sneakers",
  "Sandals",
  "Jackets",
  "Pants",
];

const owners = [
  "Nike",
  "Adidas",
  "Puma",
  "New Balance",
  "Denim Co.",
  "Cotton Brand",
  "Casual Wear",
  "Formal Attire",
  "Active Wear",
  "Cozy Wear",
  "Urban Style",
  "Beach Wear",
];

const ratings = [5, 4, 3, 2, 1];

export interface SearchResult {
  id: number;
  title: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  owner: string;
  hasDiscount: boolean;
  description?: string;
  color?: string;
  material?: string;
  condition?: string;
  views?: number;
  images?: string[];
  tags?: string[];
}

interface SearchBarProps {
  onSearchResults?: (results: SearchResult[]) => void;
  onSearchQueryChange?: (query: string, category: string) => void;
  showResults?: boolean;
  initialCategory?: string | null;
}

interface FilterState {
  minPrice: string;
  maxPrice: string;
  selectedRatings: number[];
  selectedOwners: string[];
  showOnlyDiscounted: boolean;
  sortBy: "relevance" | "price-low" | "price-high" | "rating" | "newest";
}

export default function SearchBar({
  onSearchResults,
  onSearchQueryChange,
  showResults = true,
  initialCategory,
}: SearchBarProps) {
  const { isTablet, isLandscape, isSmallDevice, width, height } =
    useResponsive();
  const { selectedCategory: contextCategory, setSelectedCategory } =
    useCategory();

  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategoryLocal] =
    useState("All Categories");
  const [searchResults, setSearchResults] =
    useState<SearchResult[]>(mockProducts);

  // Set category from context when component mounts or when contextCategory changes
  useEffect(() => {
    if (contextCategory) {
      setSelectedCategoryLocal(contextCategory);
      // Clear the context category after using it
      setSelectedCategory(null);
    }
  }, [contextCategory, setSelectedCategory]);

  // Also handle initialCategory prop if provided
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategoryLocal(initialCategory);
    }
  }, [initialCategory]);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    minPrice: "",
    maxPrice: "",
    selectedRatings: [],
    selectedOwners: [],
    showOnlyDiscounted: false,
    sortBy: "relevance",
  });

  // Calculate number of columns based on screen size
  const getColumnsCount = () => {
    if (width >= 1200) return 4;
    if (isTablet || width >= 768) return 3;
    if (width >= 480) return 2;
    return 1;
  };

  const columns = getColumnsCount();

  // Calculate card width based on columns
  const getCardWidth = () => {
    const containerWidth = width * 0.95;
    const containerPadding = spacing.lg * 2;
    const gap = spacing.md;
    const availableWidth =
      containerWidth - containerPadding - gap * (columns - 1);
    return availableWidth / columns;
  };

  const cardWidth = getCardWidth();

  // Filter products based on all criteria
  const filteredProducts = useMemo(() => {
    let results = mockProducts;

    // Filter by category
    if (selectedCategory !== "All Categories") {
      results = results.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.owner.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          product.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by price range
    if (filters.minPrice) {
      const minPrice = parseFloat(filters.minPrice);
      if (!isNaN(minPrice)) {
        results = results.filter((product) => product.price >= minPrice);
      }
    }
    if (filters.maxPrice) {
      const maxPrice = parseFloat(filters.maxPrice);
      if (!isNaN(maxPrice)) {
        results = results.filter((product) => product.price <= maxPrice);
      }
    }

    // Filter by rating
    if (filters.selectedRatings.length > 0) {
      results = results.filter((product) =>
        filters.selectedRatings.includes(Math.floor(product.rating))
      );
    }

    // Filter by owner
    if (filters.selectedOwners.length > 0) {
      results = results.filter((product) =>
        filters.selectedOwners.includes(product.owner)
      );
    }

    // Filter by discount
    if (filters.showOnlyDiscounted) {
      results = results.filter((product) => product.hasDiscount);
    }

    // Sort results
    switch (filters.sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        results.sort((a, b) => b.id - a.id);
        break;
      default:
        // relevance - keep original order for now
        break;
    }

    return results;
  }, [searchQuery, selectedCategory, filters]);

  const selectCategory = (category: string) => {
    setSelectedCategoryLocal(category);
    setDropdownOpen(false);
    handleSearch(searchQuery, category);
  };

  const handleSearch = (query?: string, category?: string) => {
    const currentQuery = query ?? searchQuery;
    const currentCategory = category ?? selectedCategory;

    setSearchQuery(currentQuery);
    onSearchQueryChange?.(currentQuery, currentCategory);
    onSearchResults?.(filteredProducts);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSelectedCategoryLocal("All Categories");
    setFilters({
      minPrice: "",
      maxPrice: "",
      selectedRatings: [],
      selectedOwners: [],
      showOnlyDiscounted: false,
      sortBy: "relevance",
    });
    onSearchQueryChange?.("", "All Categories");
    onSearchResults?.(mockProducts);
  };

  const clearFilters = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      selectedRatings: [],
      selectedOwners: [],
      showOnlyDiscounted: false,
      sortBy: "relevance",
    });
  };

  // Update results when filters change
  React.useEffect(() => {
    onSearchResults?.(filteredProducts);
    setSearchResults(filteredProducts);
  }, [filteredProducts, onSearchResults]);

  // Toggle rating selection
  const toggleRating = (rating: number) => {
    setFilters((prev) => ({
      ...prev,
      selectedRatings: prev.selectedRatings.includes(rating)
        ? prev.selectedRatings.filter((r) => r !== rating)
        : [...prev.selectedRatings, rating],
    }));
  };

  // Toggle owner selection
  const toggleOwner = (owner: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedOwners: prev.selectedOwners.includes(owner)
        ? prev.selectedOwners.filter((o) => o !== owner)
        : [...prev.selectedOwners, owner],
    }));
  };

  // Render product item
  const renderProductItem = ({ item }: { item: SearchResult }) => (
    <View style={[styles.bestCard, { width: cardWidth }]}>
      <View style={styles.bestBadge}>
        <Text style={styles.badgeText}>New</Text>
      </View>

      {item.hasDiscount && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountBadgeText}>
            -{Math.round((1 - item.price / item.originalPrice) * 100)}%
          </Text>
        </View>
      )}

      <Pressable
        style={styles.cartAdd}
        onPress={() =>
          router.push({
            pathname: "/product/[id]",
            params: { id: item.id },
          })
        }
      >
        <Ionicons name="cart" size={18} color={colors.black} />
      </Pressable>

      <Image
        source={{ uri: item.image }}
        style={[styles.bestImage, { height: cardWidth * 0.75 }]}
        contentFit="cover"
      />

      <View style={styles.bestCardContent}>
        <View style={styles.bestCardNameDiv}>
          <Text style={styles.bestCardTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Pressable
            style={styles.bestCardLink}
            onPress={() =>
              router.push({
                pathname: "/product/[id]",
                params: { id: item.id },
              })
            }
          >
            <Ionicons name="arrow-forward" size={15} color={colors.white} />
          </Pressable>
        </View>

        <View style={styles.bestRatingD}>
          <Text style={styles.bestRating}>
            {"★".repeat(Math.floor(item.rating))}
          </Text>
          <Text style={styles.bestRatingNum}>({item.rating})</Text>
        </View>

        <Text style={styles.bestOwner}>
          By <Text style={styles.ownerName}>{item.owner}</Text>
        </Text>

        <View style={styles.bestPriceRow}>
          <Text style={styles.bestPrice}>${item.price.toFixed(2)}</Text>
          {item.hasDiscount && (
            <Text style={styles.bestOriginalPrice}>
              ${item.originalPrice.toFixed(2)}
            </Text>
          )}
        </View>
      </View>
    </View>
  );

  // Filter modal content
  const renderFilterModal = () => (
    <Modal
      visible={filterModalOpen}
      transparent
      animationType="slide"
      onRequestClose={() => setFilterModalOpen(false)}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[styles.filterModal, isTablet && styles.filterModalTablet]}
        >
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text
              style={[styles.modalTitle, isTablet && styles.modalTitleTablet]}
            >
              Filters & Sorting
            </Text>
            <View style={styles.modalHeaderActions}>
              <Pressable
                onPress={clearFilters}
                style={styles.clearFiltersButton}
              >
                <Text style={styles.clearFiltersText}>Clear All</Text>
              </Pressable>
              <Pressable onPress={() => setFilterModalOpen(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </Pressable>
            </View>
          </View>

          {/* Content */}
          <ScrollView
            style={styles.filterContent}
            contentContainerStyle={styles.filterContentContainer}
            showsVerticalScrollIndicator={true}
            alwaysBounceVertical={true}
          >
            {/* Price Range */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Price Range</Text>
              <View style={styles.priceInputs}>
                <View style={styles.priceInput}>
                  <Text style={styles.priceLabel}>Min Price</Text>
                  <TextInput
                    style={styles.priceInputField}
                    value={filters.minPrice}
                    onChangeText={(text) =>
                      setFilters((prev) => ({ ...prev, minPrice: text }))
                    }
                    placeholder="0"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.priceInput}>
                  <Text style={styles.priceLabel}>Max Price</Text>
                  <TextInput
                    style={styles.priceInputField}
                    value={filters.maxPrice}
                    onChangeText={(text) =>
                      setFilters((prev) => ({ ...prev, maxPrice: text }))
                    }
                    placeholder="5000"
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>

            {/* Rating Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Rating</Text>
              <View style={styles.ratingFilters}>
                {ratings.map((rating) => (
                  <Pressable
                    key={rating}
                    style={[
                      styles.ratingFilter,
                      filters.selectedRatings.includes(rating) &&
                        styles.ratingFilterSelected,
                    ]}
                    onPress={() => toggleRating(rating)}
                  >
                    <Text
                      style={[
                        styles.ratingFilterText,
                        filters.selectedRatings.includes(rating) &&
                          styles.ratingFilterTextSelected,
                      ]}
                    >
                      {"★".repeat(rating)} {rating}+
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Owner Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Brand/Owner</Text>
              <View style={styles.ownerFilters}>
                {owners.map((owner) => (
                  <Pressable
                    key={owner}
                    style={[
                      styles.ownerFilter,
                      filters.selectedOwners.includes(owner) &&
                        styles.ownerFilterSelected,
                    ]}
                    onPress={() => toggleOwner(owner)}
                  >
                    <Text
                      style={[
                        styles.ownerFilterText,
                        filters.selectedOwners.includes(owner) &&
                          styles.ownerFilterTextSelected,
                      ]}
                    >
                      {owner}
                    </Text>
                    {filters.selectedOwners.includes(owner) && (
                      <Ionicons
                        name="checkmark"
                        size={16}
                        color={colors.primary}
                      />
                    )}
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Discount Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Discounts</Text>
              <Pressable
                style={styles.checkboxFilter}
                onPress={() =>
                  setFilters((prev) => ({
                    ...prev,
                    showOnlyDiscounted: !prev.showOnlyDiscounted,
                  }))
                }
              >
                <View
                  style={[
                    styles.checkbox,
                    filters.showOnlyDiscounted && styles.checkboxSelected,
                  ]}
                >
                  {filters.showOnlyDiscounted && (
                    <Ionicons name="checkmark" size={16} color={colors.white} />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>
                  Show only discounted items
                </Text>
              </Pressable>
            </View>

            {/* Sort Options */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Sort By</Text>
              <View style={styles.sortOptions}>
                {[
                  { value: "relevance", label: "Relevance" },
                  { value: "price-low", label: "Price: Low to High" },
                  { value: "price-high", label: "Price: High to Low" },
                  { value: "rating", label: "Highest Rated" },
                  { value: "newest", label: "Newest" },
                ].map((option) => (
                  <Pressable
                    key={option.value}
                    style={[
                      styles.sortOption,
                      filters.sortBy === option.value &&
                        styles.sortOptionSelected,
                    ]}
                    onPress={() =>
                      setFilters((prev) => ({
                        ...prev,
                        sortBy: option.value as any,
                      }))
                    }
                  >
                    <View
                      style={[
                        styles.radio,
                        filters.sortBy === option.value && styles.radioSelected,
                      ]}
                    >
                      {filters.sortBy === option.value && (
                        <View style={styles.radioInner} />
                      )}
                    </View>
                    <Text
                      style={[
                        styles.sortOptionText,
                        filters.sortBy === option.value &&
                          styles.sortOptionTextSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.filterFooter}>
            <Pressable
              style={styles.applyFiltersButton}
              onPress={() => setFilterModalOpen(false)}
            >
              <Text style={styles.applyFiltersText}>Apply Filters</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View
      style={[
        styles.searchMain,
        isTablet && styles.searchMainTablet,
        isLandscape && styles.searchMainLandscape,
      ]}
    >
      {/* Search Input Section */}
      <View
        style={[
          styles.searchContainer,
          isTablet && styles.searchContainerTablet,
          isSmallDevice && styles.searchContainerSmall,
        ]}
      >
        {/* Category Dropdown */}
        <Pressable
          style={[
            styles.dropdown,
            isTablet && styles.dropdownTablet,
            isSmallDevice && styles.dropdownSmall,
          ]}
          onPress={() => setDropdownOpen(true)}
        >
          <Text
            style={[
              styles.dropdownText,
              isTablet && styles.dropdownTextTablet,
              isSmallDevice && styles.dropdownTextSmall,
            ]}
            numberOfLines={1}
          >
            {selectedCategory}
          </Text>
          <Ionicons
            name="chevron-down"
            size={isTablet ? 18 : 16}
            color={colors.primary}
          />
        </Pressable>

        {/* Search Input */}
        <TextInput
          style={[
            styles.searchInput,
            isTablet && styles.searchInputTablet,
            isSmallDevice && styles.searchInputSmall,
          ]}
          placeholder="Search for items..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            handleSearch(text, selectedCategory);
          }}
          onSubmitEditing={() => handleSearch()}
          returnKeyType="search"
        />

        {/* Filter Button */}
        <Pressable
          style={[styles.filterButton, isTablet && styles.filterButtonTablet]}
          onPress={() => setFilterModalOpen(true)}
        >
          <Ionicons
            name="options-outline"
            size={isTablet ? 22 : 18}
            color={colors.primary}
          />
        </Pressable>

        {/* Search or Clear Button */}
        <Pressable
          style={[styles.searchIcon, isTablet && styles.searchIconTablet]}
          onPress={searchQuery ? clearSearch : () => handleSearch()}
        >
          <Ionicons
            name={searchQuery ? "close-circle" : "search"}
            size={isTablet ? 22 : 18}
            color={colors.primary}
          />
        </Pressable>
      </View>

      {/* Active Filters Summary */}
      {(searchQuery ||
        selectedCategory !== "All Categories" ||
        filters.minPrice ||
        filters.maxPrice ||
        filters.selectedRatings.length > 0 ||
        filters.selectedOwners.length > 0 ||
        filters.showOnlyDiscounted) && (
        <View style={styles.activeFilters}>
          <Text style={styles.activeFiltersText}>
            Found {filteredProducts.length} results
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== "All Categories" && ` in ${selectedCategory}`}
          </Text>
          <Pressable onPress={clearFilters}>
            <Text style={styles.clearFiltersSmallText}>Clear filters</Text>
          </Pressable>
        </View>
      )}

      {/* Search Results Grid */}
      {showResults && (
        <View style={styles.resultsContainer}>
          <FlatList
            data={filteredProducts}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={columns}
            contentContainerStyle={styles.bestGrid}
            columnWrapperStyle={columns > 1 ? styles.columnWrapper : undefined}
            scrollEnabled={false}
            key={columns}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  No products found matching your criteria
                </Text>
                <Pressable
                  style={styles.emptyStateButton}
                  onPress={clearFilters}
                >
                  <Text style={styles.emptyStateButtonText}>
                    Clear all filters
                  </Text>
                </Pressable>
              </View>
            }
          />
        </View>
      )}

      {/* Category Dropdown Modal */}
      <Modal
        visible={dropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownOpen(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setDropdownOpen(false)}
        >
          <View
            style={[
              styles.dropdownModal,
              isTablet && styles.dropdownModalTablet,
              isLandscape && styles.dropdownModalLandscape,
            ]}
          >
            <View style={styles.modalHeader}>
              <Text
                style={[styles.modalTitle, isTablet && styles.modalTitleTablet]}
              >
                Select Category
              </Text>
              <Pressable onPress={() => setDropdownOpen(false)}>
                <Ionicons
                  name="close"
                  size={isTablet ? 28 : 24}
                  color={colors.text}
                />
              </Pressable>
            </View>
            <FlatList
              data={categories}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={[
                    styles.dropdownItem,
                    isTablet && styles.dropdownItemTablet,
                    selectedCategory === item && styles.dropdownItemSelected,
                  ]}
                  onPress={() => selectCategory(item)}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      isTablet && styles.dropdownItemTextTablet,
                      selectedCategory === item &&
                        styles.dropdownItemTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                  {selectedCategory === item && (
                    <Ionicons
                      name="checkmark"
                      size={isTablet ? 22 : 20}
                      color={colors.primary}
                    />
                  )}
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>

      {/* Filter Modal */}
      {renderFilterModal()}
    </View>
  );
}

// Styles remain exactly the same as your original SearchBar component
const styles = StyleSheet.create({
  searchMain: {
    width: "100%",
    paddingHorizontal: spacing.md,
    marginVertical: spacing.md,
  },
  searchMainTablet: {
    paddingHorizontal: spacing.xl,
    marginVertical: spacing.lg,
  },
  searchMainLandscape: {
    paddingHorizontal: spacing.lg,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#485780",
    borderRadius: 8,
    backgroundColor: colors.white,
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchContainerTablet: {
    height: 60,
    borderRadius: 12,
    borderWidth: 3,
  },
  searchContainerSmall: {
    height: 45,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    minWidth: 100,
    maxWidth: 140,
  },
  dropdownTablet: {
    minWidth: 140,
    maxWidth: 180,
    paddingHorizontal: spacing.lg,
  },
  dropdownSmall: {
    minWidth: 80,
    maxWidth: 120,
    paddingHorizontal: spacing.sm,
  },
  dropdownText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: "500",
    marginRight: spacing.xs,
    flex: 1,
  },
  dropdownTextTablet: {
    fontSize: 15,
  },
  dropdownTextSmall: {
    fontSize: 12,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: spacing.md,
    fontSize: 14,
    color: colors.text,
  },
  searchInputTablet: {
    fontSize: 16,
    paddingHorizontal: spacing.lg,
  },
  searchInputSmall: {
    fontSize: 13,
    paddingHorizontal: spacing.sm,
  },
  filterButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  filterButtonTablet: {
    paddingHorizontal: spacing.lg,
  },
  searchIcon: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  searchIconTablet: {
    paddingHorizontal: spacing.lg,
  },
  activeFilters: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  activeFiltersText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: "italic",
    flex: 1,
  },
  clearFiltersSmallText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "500",
  },
  resultsContainer: {
    width: "95%",
    alignSelf: "center",
    marginTop: spacing.sm,
  },
  bestGrid: {
    gap: spacing.md,
  },
  columnWrapper: {
    justifyContent: "space-between",
    gap: spacing.md,
  },
  bestCard: {
    backgroundColor: colors.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.lg,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    minWidth: 100,
  },
  bestBadge: {
    position: "absolute",
    top: 12,
    left: -2,
    backgroundColor: colors.black,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 1,
  },
  discountBadge: {
    position: "absolute",
    top: 12,
    right: 50,
    backgroundColor: "#FF4444",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
    zIndex: 1,
  },
  discountBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "600",
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "600",
  },
  cartAdd: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 1,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.xs,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bestImage: {
    width: "100%",
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  bestCardContent: {
    width: "100%",
  },
  bestCardNameDiv: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  bestCardTitle: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
    marginRight: spacing.sm,
    lineHeight: 18,
  },
  bestCardLink: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  bestRatingD: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  bestRating: {
    fontSize: 14,
    color: "#FFD700",
    letterSpacing: 1,
  },
  bestRatingNum: {
    fontSize: 12,
    color: "#B6B6B6",
    marginLeft: spacing.xs,
  },
  bestOwner: {
    fontSize: 12,
    color: "#B6B6B6",
    marginBottom: spacing.xs,
  },
  ownerName: {
    color: colors.black,
    fontWeight: "600",
  },
  bestPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  bestPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.black,
  },
  bestOriginalPrice: {
    fontSize: 14,
    textDecorationLine: "line-through",
    color: colors.textSecondary,
  },
  emptyState: {
    alignItems: "center",
    padding: spacing.xl,
    gap: spacing.md,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
  },
  emptyStateButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: colors.white,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  dropdownModal: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
  },
  dropdownModalTablet: {
    maxHeight: "60%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  dropdownModalLandscape: {
    maxHeight: "80%",
  },
  filterModal: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  filterModalTablet: {
    maxHeight: "80%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalHeaderActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  modalTitleTablet: {
    fontSize: 22,
    fontWeight: "700",
  },
  clearFiltersButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: 6,
  },
  clearFiltersText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "500",
  },
  filterContent: {
    flex: 1,
  },
  filterContentContainer: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  filterSection: {
    marginBottom: spacing.xl,
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: spacing.md,
    color: colors.text,
  },
  priceInputs: {
    flexDirection: "row",
    gap: spacing.md,
  },
  priceInput: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  priceInputField: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    fontSize: 14,
    backgroundColor: colors.white,
    minHeight: 50,
  },
  ratingFilters: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  ratingFilter: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ratingFilterSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  ratingFilterText: {
    fontSize: 12,
    color: colors.text,
  },
  ratingFilterTextSelected: {
    color: colors.white,
    fontWeight: "600",
  },
  ownerFilters: {
    gap: spacing.sm,
  },
  ownerFilter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ownerFilterSelected: {
    backgroundColor: colors.backgroundSecondary,
    borderColor: colors.primary,
  },
  ownerFilterText: {
    fontSize: 14,
    color: colors.text,
  },
  ownerFilterTextSelected: {
    color: colors.primary,
    fontWeight: "600",
  },
  checkboxFilter: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.sm,
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
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxLabel: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  sortOptions: {
    gap: spacing.sm,
  },
  sortOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sortOptionSelected: {
    backgroundColor: colors.backgroundSecondary,
    borderColor: colors.primary,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  sortOptionText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  sortOptionTextSelected: {
    color: colors.primary,
    fontWeight: "600",
  },
  filterFooter: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  applyFiltersButton: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: 12,
    alignItems: "center",
  },
  applyFiltersText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundSecondary,
  },
  dropdownItemTablet: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  dropdownItemSelected: {
    backgroundColor: colors.backgroundSecondary,
  },
  dropdownItemText: {
    fontSize: 16,
    color: colors.text,
  },
  dropdownItemTextTablet: {
    fontSize: 18,
  },
  dropdownItemTextSelected: {
    fontWeight: "600",
    color: colors.primary,
  },
});
