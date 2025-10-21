export interface ShippingAddress {
  id: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  trackingNumber?: string;
}

export const mockShippingAddresses: ShippingAddress[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    street: "123 Main St",
    city: "New York",
    zipCode: "10001",
    country: "USA",
    isDefault: true,
  },
  {
    id: "2",
    firstName: "John",
    lastName: "Doe",
    street: "456 Park Ave",
    city: "New York",
    zipCode: "10002",
    country: "USA",
    isDefault: false,
  },
];

export const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    total: 149.99,
    trackingNumber: "TRK123456789",
    shippingAddress: mockShippingAddresses[0],
    items: [
      {
        id: "1",
        productName: "Wireless Headphones",
        quantity: 1,
        price: 149.99,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop",
      },
    ],
  },
  {
    id: "2",
    orderNumber: "ORD-002",
    date: "2024-01-10",
    status: "shipped",
    total: 89.99,
    trackingNumber: "TRK987654321",
    shippingAddress: mockShippingAddresses[0],
    items: [
      {
        id: "2",
        productName: "Smart Watch",
        quantity: 1,
        price: 89.99,
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop",
      },
    ],
  },
  {
    id: "3",
    orderNumber: "ORD-003",
    date: "2024-01-20",
    status: "pending",
    total: 199.99,
    shippingAddress: mockShippingAddresses[0],
    items: [
      {
        id: "3",
        productName: "Laptop Backpack",
        quantity: 1,
        price: 79.99,
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&h=150&fit=crop",
      },
      {
        id: "4",
        productName: "Water Bottle",
        quantity: 1,
        price: 29.99,
        image:
          "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=150&h=150&fit=crop",
      },
    ],
  },
];
