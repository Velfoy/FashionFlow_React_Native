// import { useAuth } from "@/contexts/AuthContext";
// import { router } from "expo-router";
// import React, { useEffect } from "react";
// import { ActivityIndicator, View } from "react-native";

// interface AuthGuardProps {
//   children: React.ReactNode;
// }

// export default function AuthGuard({ children }: AuthGuardProps) {
//   const { isAuthenticated, isLoading } = useAuth();

//   useEffect(() => {
//     if (!isLoading && !isAuthenticated) {
//       router.replace("/auth/login");
//     }
//   }, [isAuthenticated, isLoading]);

//   if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   if (!isAuthenticated) {
//     return null; // Will redirect in useEffect
//   }

//   return <>{children}</>;
// }
