import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { colors } from "@/styles/colors";
import { spacing } from "@/styles/spacing";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainContainer}>
          <View style={styles.formSection}>
            {isLogin ? <LoginForm /> : <RegisterForm />}
          </View>

          <Pressable
            style={styles.toggleButton}
            onPress={() => setIsLogin(!isLogin)}
          >
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
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

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
  mainContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.xl,
    paddingHorizontal: spacing.lg,
    width: "100%",
    maxWidth: 1200,
    alignSelf: "center",
  },
  formSection: {
    flex: 1,
    maxWidth: 400,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.xl,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 30,
    elevation: 5,
  },
  toggleButton: {
    flex: 1,
    maxWidth: 400,
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
  },
  divInsideButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonImage: {
    width: "100%",
    height: 400,
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
