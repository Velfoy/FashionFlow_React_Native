// data/mockData.ts
export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  brand?: string;
  company?: string; // Added company/seller field
}

// Cart store (simple in-memory store for demo)
let cartItems: CartItem[] = [];

export const getCartItems = (): CartItem[] => {
  return cartItems;
};

export const getCartItemsCount = (): number => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

export const addToCart = (product: any, quantity: number, size: string) => {
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
      image: product.images ? product.images[0] : product.image,
      quantity,
      size,
      brand: product.brand,
      company: product.owner || product.brand, // Use owner as company
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

export const clearCart = () => {
  cartItems = [];
};
