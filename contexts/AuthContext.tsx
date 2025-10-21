import { Order, ShippingAddress } from "@/data/authData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  resetPassword: (email: string) => Promise<boolean>;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<boolean>;
  // User-specific data methods
  getUserOrders: () => Order[];
  addUserOrder: (order: Order) => void;
  getUserAddresses: () => ShippingAddress[];
  addUserAddress: (address: ShippingAddress) => void;
  updateUserAddress: (
    addressId: string,
    address: Partial<ShippingAddress>
  ) => void;
  deleteUserAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // User-specific data
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [userAddresses, setUserAddresses] = useState<ShippingAddress[]>([]);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (authState.user) {
      loadUserData();
    }
  }, [authState.user]);

  const checkAuthStatus = async (): Promise<void> => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const userData = await AsyncStorage.getItem("userData");

      if (token && userData) {
        const user = JSON.parse(userData);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const loadUserData = async (): Promise<void> => {
    if (!authState.user) return;

    try {
      // Load user orders
      const storedOrders = await AsyncStorage.getItem(
        `userOrders_${authState.user.id}`
      );
      if (storedOrders) {
        setUserOrders(JSON.parse(storedOrders));
      }

      // Load user addresses
      const storedAddresses = await AsyncStorage.getItem(
        `userAddresses_${authState.user.id}`
      );
      if (storedAddresses) {
        setUserAddresses(JSON.parse(storedAddresses));
      } else {
        // Create default address for new user
        const defaultAddress: ShippingAddress = {
          id: "1",
          firstName: authState.user.firstName,
          lastName: authState.user.lastName,
          street: "",
          city: "",
          zipCode: "",
          country: "Poland",
          isDefault: true,
        };
        setUserAddresses([defaultAddress]);
        await AsyncStorage.setItem(
          `userAddresses_${authState.user.id}`,
          JSON.stringify([defaultAddress])
        );
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Check if user exists (in real app, this would be API call)
      const existingUsers = await AsyncStorage.getItem("registeredUsers");
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      const existingUser = users.find(
        (user: any) => user.email === email && user.password === password
      );

      if (!existingUser) {
        return false; // User not found or wrong password
      }

      const user: User = {
        id: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        phone: existingUser.phone,
      };

      await AsyncStorage.setItem("authToken", "dummy-token");
      await AsyncStorage.setItem("userData", JSON.stringify(user));

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      // Check if email already exists
      const existingUsers = await AsyncStorage.getItem("registeredUsers");
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      const emailExists = users.some(
        (user: any) => user.email === userData.email
      );
      if (emailExists) {
        return false; // Email already registered
      }

      const user: User = {
        id: Date.now().toString(),
        username: userData.username,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
      };

      // Save to registered users
      const newUser = { ...user, password: userData.password };
      users.push(newUser);
      await AsyncStorage.setItem("registeredUsers", JSON.stringify(users));

      await AsyncStorage.setItem("authToken", "dummy-token");
      await AsyncStorage.setItem("userData", JSON.stringify(user));

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("userData");
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    setUserOrders([]);
    setUserAddresses([]);
  };

  const updateProfile = (userData: Partial<User>): void => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...userData };
      setAuthState((prev) => ({ ...prev, user: updatedUser }));
      AsyncStorage.setItem("userData", JSON.stringify(updatedUser));
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    console.log("Password reset email sent to:", email);
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });
  };
  // const resetPassword = async (email: string): Promise<boolean> => {
  //   try {
  //     // In a real app, you'd generate a secure token and store it
  //     const resetToken = Math.random().toString(36).substring(2, 15);

  //     await resend.emails.send({
  //       from: "onboarding@resend.dev",
  //       to: email,
  //       subject: "Password Reset Request",
  //       html: `
  //     <h2>Password Reset</h2>
  //     <p>You requested a password reset. Use the code below to reset your password:</p>
  //     <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; font-size: 18px; font-weight: bold; text-align: center;">
  //       ${resetToken}
  //     </div>
  //     <p>This code will expire in 1 hour.</p>
  //     <p>If you didn't request this, please ignore this email.</p>
  //   `,
  //     });

  //     console.log("Password reset email sent to:", email);
  //     return true;
  //   } catch (error) {
  //     console.error("Password reset error:", error);
  //     return false;
  //   }
  // };

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ): Promise<boolean> => {
    console.log("Password changed successfully");
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });
  };

  // User-specific data methods
  const getUserOrders = (): Order[] => {
    return userOrders;
  };

  const addUserOrder = async (order: Order): Promise<void> => {
    if (!authState.user) return;

    const newOrders = [...userOrders, order];
    setUserOrders(newOrders);
    await AsyncStorage.setItem(
      `userOrders_${authState.user.id}`,
      JSON.stringify(newOrders)
    );
  };

  const getUserAddresses = (): ShippingAddress[] => {
    return userAddresses;
  };

  const addUserAddress = async (address: ShippingAddress): Promise<void> => {
    if (!authState.user) return;

    const newAddresses = [...userAddresses, address];
    setUserAddresses(newAddresses);
    await AsyncStorage.setItem(
      `userAddresses_${authState.user.id}`,
      JSON.stringify(newAddresses)
    );
  };

  const updateUserAddress = async (
    addressId: string,
    addressData: Partial<ShippingAddress>
  ): Promise<void> => {
    if (!authState.user) return;

    const updatedAddresses = userAddresses.map((address) =>
      address.id === addressId ? { ...address, ...addressData } : address
    );
    setUserAddresses(updatedAddresses);
    await AsyncStorage.setItem(
      `userAddresses_${authState.user.id}`,
      JSON.stringify(updatedAddresses)
    );
  };

  const deleteUserAddress = async (addressId: string): Promise<void> => {
    if (!authState.user) return;

    const filteredAddresses = userAddresses.filter(
      (address) => address.id !== addressId
    );
    setUserAddresses(filteredAddresses);
    await AsyncStorage.setItem(
      `userAddresses_${authState.user.id}`,
      JSON.stringify(filteredAddresses)
    );
  };

  const setDefaultAddress = async (addressId: string): Promise<void> => {
    if (!authState.user) return;

    const updatedAddresses = userAddresses.map((address) => ({
      ...address,
      isDefault: address.id === addressId,
    }));
    setUserAddresses(updatedAddresses);
    await AsyncStorage.setItem(
      `userAddresses_${authState.user.id}`,
      JSON.stringify(updatedAddresses)
    );
  };

  const value: AuthContextType = {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    login,
    register,
    logout,
    updateProfile,
    resetPassword,
    changePassword,
    getUserOrders,
    addUserOrder,
    getUserAddresses,
    addUserAddress,
    updateUserAddress,
    deleteUserAddress,
    setDefaultAddress,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
