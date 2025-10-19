import HeaderNav from "@/components/HeaderNav";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { useResponsive } from "@/hooks/useResponsive";
import { colors } from "@/styles/colors";
import { spacing } from "@/styles/spacing";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { isSmallDevice, isLargeDevice } = useResponsive();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  // Show image button only on larger screens
  const showImageButton = isLargeDevice;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <HeaderNav
        showLogo={false}
        showBack={true}
        title=""
        showCart={false}
        showAccount={false}
      />
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          !showImageButton && styles.scrollContentCentered,
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.mainContainer,
            !showImageButton && styles.mainContainerCentered,
          ]}
        >
          {isLogin ? (
            <LoginForm onToggleForm={toggleForm} />
          ) : (
            <RegisterForm onToggleForm={toggleForm} />
          )}

          {/* Image Button - Only show on larger screens */}
          {showImageButton && (
            <Pressable style={styles.toggleButton} onPress={toggleForm}>
              <View style={styles.divInsideButton}>
                <Image
                  source={{
                    uri: isLogin
                      ? "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=600&fit=crop&auto=format"
                      : "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=600&fit=crop&auto=format",
                  }}
                  style={styles.buttonImage}
                  contentFit="cover"
                />
                <Text style={styles.textRegister}>
                  {isLogin
                    ? "Need an account? Register"
                    : "Have an account? Login"}
                </Text>
              </View>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
// ✅ Only adjusted styles for matching height with the form
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: spacing.xl,
  },
  scrollContentCentered: {
    justifyContent: "flex-start",
    paddingTop: spacing.xl,
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch", // ✅ ensures both panels stretch equally in height
    gap: spacing.xl,
    paddingHorizontal: spacing.lg,
    width: "100%",
    maxWidth: 1200,
    alignSelf: "center",
  },
  mainContainerCentered: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: spacing.lg,
  },
  formSection: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.xl,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 30,
    elevation: 5,
    flex: 1,
  },
  formSectionWithImage: {
    flex: 1,
    maxWidth: 400,
  },
  formSectionAlone: {
    width: "100%",
    maxWidth: 450,
    marginTop: spacing.xl,
  },

  // 🔽 updated to match form height automatically
  toggleButton: {
    flex: 1,
    maxWidth: 500,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 20,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    overflow: "hidden",
    alignSelf: "stretch", // ✅ ensures same height as form
  },

  divInsideButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between", // image + text spacing
  },

  buttonImage: {
    width: "100%",
    flex: 1, // ✅ image fills remaining vertical space dynamically
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  textRegister: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: spacing.lg,
    color: colors.text,
    textAlign: "center",
    paddingHorizontal: spacing.md,
  },
});
