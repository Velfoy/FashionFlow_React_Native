import { useResponsive } from "@/hooks/useResponsive";
import { colors } from "@/styles/colors";
import { spacing } from "@/styles/spacing";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

interface RegisterFormProps {
  onToggleForm?: () => void;
}

export default function RegisterForm({ onToggleForm }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { isSmallDevice, width } = useResponsive();

  // Calculate form width based on screen size
  const getFormWidth = () => {
    if (width < 400) return "95%"; // Very small phones
    if (width < 768) return "100%"; // Phones and small tablets
    if (width < 1024) return "70%"; // Tablets
    return "50%"; // Large screens and desktop
  };

  const formWidth = getFormWidth();

  return (
    <View
      style={[
        styles.formSection,
        isSmallDevice && styles.formSectionSmall,
        { width: formWidth },
      ]}
    >
      <Text style={[styles.title, isSmallDevice && styles.titleSmall]}>
        Register
      </Text>

      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <Text style={[styles.label, isSmallDevice && styles.labelSmall]}>
            Username
          </Text>
          <TextInput
            style={[styles.inputField, isSmallDevice && styles.inputFieldSmall]}
            placeholder="Enter username..."
            placeholderTextColor={colors.textSecondary}
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

        <View style={styles.inputWrapper}>
          <Text style={[styles.label, isSmallDevice && styles.labelSmall]}>
            Confirm Password
          </Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[
                styles.inputField,
                isSmallDevice && styles.inputFieldSmall,
              ]}
              placeholder="Confirm password..."
              placeholderTextColor={colors.textSecondary}
              secureTextEntry={!showConfirm}
            />
            <Pressable
              style={[
                styles.toggleVisibility,
                isSmallDevice && styles.toggleVisibilitySmall,
              ]}
              onPress={() => setShowConfirm(!showConfirm)}
            >
              <Ionicons
                name={showConfirm ? "eye" : "eye-off"}
                size={isSmallDevice ? 18 : 20}
                color={colors.textSecondary}
              />
            </Pressable>
          </View>
        </View>

        <Pressable
          style={[styles.primaryBtn, isSmallDevice && styles.primaryBtnSmall]}
        >
          <Ionicons
            name="person-add"
            size={isSmallDevice ? 14 : 16}
            color={colors.white}
          />
          <Text
            style={[styles.btnLabel, isSmallDevice && styles.btnLabelSmall]}
          >
            Register
          </Text>
        </Pressable>
      </View>

      {/* Login Link - Use the parent's toggle function */}
      <View style={styles.loginSection}>
        <Text
          style={[styles.loginText, isSmallDevice && styles.loginTextSmall]}
        >
          Already have an account?
        </Text>
        <Pressable onPress={onToggleForm}>
          <Text
            style={[styles.loginLink, isSmallDevice && styles.loginLinkSmall]}
          >
            Login
          </Text>
        </Pressable>
      </View>

      {/* Social Login - Only show on larger screens */}
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
            <Text style={styles.btnLabelGoogle}>Sign up with Google</Text>
          </Pressable>

          <Pressable style={styles.facebookBtn}>
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png",
              }}
              style={styles.socialIcon}
              contentFit="contain"
            />
            <Text style={styles.btnLabelFacebook}>Sign up with Facebook</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  formSection: {
    alignSelf: "center",
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
    maxWidth: 500, // Maximum width to prevent it from getting too wide
    minWidth: 300, // Minimum width to maintain usability
  },
  formSectionSmall: {
    padding: spacing.lg,
    maxWidth: "100%", // On small devices, allow full available width
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
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
    position: "relative",
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
    position: "absolute",
    right: 12,
    top: 12,
    padding: 4,
  },
  toggleVisibilitySmall: {
    right: 10,
    top: 10,
  },
  primaryBtn: {
    backgroundColor: colors.black,
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.sm,
    gap: spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
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
  loginSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  loginText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  loginTextSmall: {
    fontSize: 13,
  },
  loginLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
  },
  loginLinkSmall: {
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
