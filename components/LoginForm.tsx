import { useAuth } from "@/contexts/AuthContext";
import { useResponsive } from "@/hooks/useResponsive";
import { colors } from "@/styles/colors";
import { spacing } from "@/styles/spacing";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  DimensionValue,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface LoginFormProps {
  onToggleForm: () => void;
}

export default function LoginForm({ onToggleForm }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isSmallDevice, width } = useResponsive();
  const { login, resetPassword } = useAuth();

  const getFormWidth = (): DimensionValue => {
    if (width < 400) return "95%";
    if (width < 768) return "100%";
    if (width < 1024) return "70%";
    return "50%";
  };

  const formWidth = getFormWidth();

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    const success = await login(email, password);
    setIsLoading(false);

    if (success) {
      router.replace("/(tabs)/account" as any);
    } else {
      Alert.alert(
        "Login Failed",
        "No account found with this email and password. Please register first.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Register", onPress: onToggleForm },
        ]
      );
    }
  };

  const handleForgotPassword = async (): Promise<void> => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address first");
      return;
    }

    setIsLoading(true);
    const success = await resetPassword(email);
    setIsLoading(false);

    if (success) {
      Alert.alert(
        "Password Reset",
        "If an account exists with this email, you will receive password reset instructions."
      );
    } else {
      Alert.alert("Error", "Failed to send reset email. Please try again.");
    }
  };

  return (
    <View
      style={[
        styles.formSection,
        isSmallDevice && styles.formSectionSmall,
        { width: formWidth },
      ]}
    >
      <Text style={[styles.title, isSmallDevice && styles.titleSmall]}>
        Login
      </Text>

      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <Text style={[styles.label, isSmallDevice && styles.labelSmall]}>
            Email
          </Text>
          <TextInput
            style={[styles.inputField, isSmallDevice && styles.inputFieldSmall]}
            placeholder="Enter your email..."
            placeholderTextColor={colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={[styles.label, isSmallDevice && styles.labelSmall]}>
            Password
          </Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[
                styles.inputField,
                isSmallDevice && styles.inputFieldSmall,
              ]}
              placeholder="Enter password..."
              placeholderTextColor={colors.textSecondary}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable
              style={[
                styles.toggleVisibility,
                isSmallDevice && styles.toggleVisibilitySmall,
              ]}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={isSmallDevice ? 18 : 20}
                color={colors.textSecondary}
              />
            </Pressable>
          </View>
        </View>

        <Pressable onPress={handleForgotPassword} style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </Pressable>

        <Pressable
          style={[
            styles.primaryBtn,
            isSmallDevice && styles.primaryBtnSmall,
            isLoading && styles.disabledBtn,
          ]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Ionicons
            name="lock-closed"
            size={isSmallDevice ? 14 : 16}
            color={colors.white}
          />
          <Text
            style={[styles.btnLabel, isSmallDevice && styles.btnLabelSmall]}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Text>
        </Pressable>
      </View>

      <View style={styles.registerSection}>
        <Text
          style={[
            styles.registerText,
            isSmallDevice && styles.registerTextSmall,
          ]}
        >
          Don't have an account?
        </Text>
        <Pressable onPress={onToggleForm}>
          <Text
            style={[
              styles.registerLink,
              isSmallDevice && styles.registerLinkSmall,
            ]}
          >
            Register Now
          </Text>
        </Pressable>
      </View>

      {!isSmallDevice && (
        <View style={styles.socialLogin}>
          <Pressable style={styles.googleBtn}>
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png",
              }}
              style={styles.socialIcon}
              contentFit="contain"
            />
            <Text style={styles.btnLabelGoogle}>Continue with Google</Text>
          </Pressable>

          <Pressable style={styles.facebookBtn}>
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png",
              }}
              style={styles.socialIcon}
              contentFit="contain"
            />
            <Text style={styles.btnLabelFacebook}>Continue with Facebook</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

// ... keep the same styles ...
const styles = StyleSheet.create({
  formSection: {
    alignSelf: "center" as const,
    padding: spacing.xl,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 20,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    maxWidth: 500,
    minWidth: 300,
  },
  formSectionSmall: {
    padding: spacing.lg,
    maxWidth: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center" as const,
    marginBottom: spacing.lg,
    color: colors.black,
  },
  titleSmall: {
    fontSize: 24,
    marginBottom: spacing.md,
  },
  form: {
    gap: spacing.md,
  },
  inputWrapper: {
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  labelSmall: {
    fontSize: 13,
  },
  passwordContainer: {
    position: "relative" as const,
  },
  inputField: {
    width: "100%",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    fontSize: 14,
    fontWeight: "400",
    backgroundColor: colors.background,
  },
  inputFieldSmall: {
    paddingVertical: spacing.sm,
    fontSize: 13,
  },
  toggleVisibility: {
    position: "absolute" as const,
    right: 12,
    top: 12,
    padding: 4,
  },
  toggleVisibilitySmall: {
    right: 10,
    top: 10,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: -spacing.xs,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "500",
  },
  primaryBtn: {
    backgroundColor: colors.black,
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    marginTop: spacing.sm,
    gap: spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledBtn: {
    opacity: 0.6,
  },
  primaryBtnSmall: {
    paddingVertical: spacing.sm,
  },
  btnLabel: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  btnLabelSmall: {
    fontSize: 14,
  },
  registerSection: {
    flexDirection: "row" as const,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  registerText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  registerTextSmall: {
    fontSize: 13,
  },
  registerLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
  },
  registerLinkSmall: {
    fontSize: 13,
  },
  socialLogin: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  googleBtn: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    gap: spacing.md,
    borderWidth: 2,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  facebookBtn: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    gap: spacing.md,
    borderWidth: 2,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  socialIcon: {
    width: 20,
    height: 20,
  },
  btnLabelGoogle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "600",
  },
  btnLabelFacebook: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "600",
  },
});
