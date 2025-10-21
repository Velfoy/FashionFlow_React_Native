// data/mockData.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  description: string;
  color: string;
  material: string;
  condition: string;
  rating: number;
  views: number;
  images: string[];
  tags: string[];
}

export interface Review {
  id: number;
  productId: number;
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
}

// Mock products data
export const products: Product[] = [
  {
    id: 1,
    name: "Black watch Omega yg87JF",
    price: 2499.0,
    oldPrice: 4999.0,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut imperdiet finibus...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut imperdiet finibus...Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    color: "black",
    material: "leather",
    condition: "max",
    rating: 4.9,
    views: 149,
    images: [
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1512852939750-1305098529bf?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1546587348-d12660c30c50?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1499364786053-c25f0d1e039f?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
    ],
    tags: [
      "🧢 men's fashion",
      "❄ winter hat",
      "🎨 colorful accessory",
      "🔥 warm headwear",
    ],
  },
  {
    id: 2,
    name: "Dziewczęce, dzianinowe, kontrastowe, luźne, sportowe, swobodne spodnie",
    price: 2499.0,
    oldPrice: 4999.0,
    description:
      "High-quality sport pants for girls with comfortable fit and modern design.",
    color: "blue",
    material: "cotton",
    condition: "new",
    rating: 4.7,
    views: 89,
    images: [
      "https://via.placeholder.com/500x500/007bff/ffffff?text=Sport+Pants+1",
      "https://via.placeholder.com/500x500/007bff/ffffff?text=Sport+Pants+2",
    ],
    tags: ["👖 sport pants", "🎽 active wear", "💙 blue collection"],
  },
  {
    id: 3,
    name: "Premium Leather Jacket",
    price: 3499.0,
    oldPrice: 5999.0,
    description:
      "Premium quality leather jacket with excellent craftsmanship and durability.",
    color: "brown",
    material: "leather",
    condition: "premium",
    rating: 4.8,
    views: 203,
    images: [
      "https://via.placeholder.com/500x500/8B4513/ffffff?text=Leather+Jacket",
    ],
    tags: ["🧥 leather", "⭐ premium", "🎯 classic"],
  },
];

// Mock reviews data
export const reviews: Review[] = [
  {
    id: 1,
    productId: 1,
    name: "Valeriia Zlydar",
    rating: 5,
    text: "Lorem ipsum lorem ipsum lorem ipsum...Lorem ipsum lorem ipsum lorem ipsum.",
    date: "24 marca 2025",
    avatar:
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=500&h=500&fit=crop",
  },
  {
    id: 2,
    productId: 1,
    name: "John Smith",
    rating: 4,
    text: "Great product quality and fast delivery. Would recommend!",
    date: "20 marca 2025",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop",
  },
  {
    id: 3,
    productId: 1,
    name: "Sarah Johnson",
    rating: 5,
    text: "Absolutely love this watch! The quality exceeds expectations.",
    date: "18 marca 2025",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=500&h=500&fit=crop",
  },
  // Add more reviews for product 1
  ...Array.from({ length: 15 }, (_, i) => ({
    id: i + 4,
    productId: 1,
    name: `Customer ${i + 1}`,
    rating: Math.floor(Math.random() * 2) + 4, // 4 or 5
    text: `This is review number ${
      i + 4
    } for the product. Excellent quality and service.`,
    date: `${i + 1} marca 2025`,
    avatar: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&${i}`,
  })),
];

// Cart store (simple in-memory store for demo)
export let cartItems: CartItem[] = [];

export const addToCart = (product: Product, quantity: number, size: string) => {
  const existingItem = cartItems.find(
    (item) => item.productId === product.id && item.size === size
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({
      id: Date.now(),
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      size,
    });
  }
};

export const removeFromCart = (itemId: number) => {
  cartItems = cartItems.filter((item) => item.id !== itemId);
};

export const updateCartItemQuantity = (itemId: number, quantity: number) => {
  const item = cartItems.find((item) => item.id === itemId);
  if (item) {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      item.quantity = quantity;
    }
  }
};

export const getCartItems = () => cartItems;

export const clearCart = () => {
  cartItems = [];
};
