import { colors } from "@/styles/colors";
import { spacing } from "@/styles/spacing";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <View style={styles.formSection}>
      <Text style={styles.title}>Register</Text>

      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter username..."
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Enter password..."
              placeholderTextColor={colors.textSecondary}
              secureTextEntry={!showPassword}
            />
            <Pressable
              style={styles.toggleVisibility}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={20}
                color={colors.textSecondary}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Confirm password..."
              placeholderTextColor={colors.textSecondary}
              secureTextEntry={!showConfirm}
            />
            <Pressable
              style={styles.toggleVisibility}
              onPress={() => setShowConfirm(!showConfirm)}
            >
              <Ionicons
                name={showConfirm ? "eye" : "eye-off"}
                size={20}
                color={colors.textSecondary}
              />
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.primaryBtn}>
          <Ionicons name="person-add" size={16} color={colors.white} />
          <Text style={styles.btnLabel}>Register</Text>
        </Pressable>
      </View>

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
    </View>
  );
}

const styles = StyleSheet.create({
  formSection: {
    flex: 1,
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
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: spacing.lg,
    color: colors.black,
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
  toggleVisibility: {
    position: "absolute",
    right: 12,
    top: 12,
    padding: 4,
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
  btnLabel: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
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
