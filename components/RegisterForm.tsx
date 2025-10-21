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

interface RegisterFormProps {
  onToggleForm: () => void;
}

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export default function RegisterForm({ onToggleForm }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { isSmallDevice, width } = useResponsive();
  const { register } = useAuth();

  const getFormWidth = (): DimensionValue => {
    if (width < 400) return "95%";
    if (width < 768) return "100%";
    if (width < 1024) return "70%";
    return "50%";
  };

  const formWidth = getFormWidth();

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = async (): Promise<void> => {
    const { username, email, password, confirmPassword, firstName, lastName } =
      formData;

    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !firstName ||
      !lastName
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    const success = await register({
      username,
      email,
      password,
      firstName,
      lastName,
      phone: formData.phone,
    });
    setIsLoading(false);

    if (success) {
      router.replace("/(tabs)/account" as any);
    } else {
      Alert.alert("Error", "Registration failed. Please try again.");
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
        Register
      </Text>

      <View style={styles.form}>
        <View style={styles.row}>
          <View style={[styles.inputWrapper, styles.halfInput]}>
            <Text style={[styles.label, isSmallDevice && styles.labelSmall]}>
              First Name *
            </Text>
            <TextInput
              style={[
                styles.inputField,
                isSmallDevice && styles.inputFieldSmall,
              ]}
              placeholder="First name"
              placeholderTextColor={colors.textSecondary}
              value={formData.firstName}
              onChangeText={(value) => handleInputChange("firstName", value)}
            />
          </View>
          <View style={[styles.inputWrapper, styles.halfInput]}>
            <Text style={[styles.label, isSmallDevice && styles.labelSmall]}>
              Last Name *
            </Text>
            <TextInput
              style={[
                styles.inputField,
                isSmallDevice && styles.inputFieldSmall,
              ]}
              placeholder="Last name"
              placeholderTextColor={colors.textSecondary}
              value={formData.lastName}
              onChangeText={(value) => handleInputChange("lastName", value)}
            />
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={[styles.label, isSmallDevice && styles.labelSmall]}>
            Username *
          </Text>
          <TextInput
            style={[styles.inputField, isSmallDevice && styles.inputFieldSmall]}
            placeholder="Choose username"
            placeholderTextColor={colors.textSecondary}
            value={formData.username}
            onChangeText={(value) => handleInputChange("username", value)}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={[styles.label, isSmallDevice && styles.labelSmall]}>
            Email *
          </Text>
          <TextInput
            style={[styles.inputField, isSmallDevice && styles.inputFieldSmall]}
            placeholder="Enter your email"
            placeholderTextColor={colors.textSecondary}
            value={formData.email}
            onChangeText={(value) => handleInputChange("email", value)}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={[styles.label, isSmallDevice && styles.labelSmall]}>
            Phone
          </Text>
          <TextInput
            style={[styles.inputField, isSmallDevice && styles.inputFieldSmall]}
            placeholder="Phone number (optional)"
            placeholderTextColor={colors.textSecondary}
            value={formData.phone}
            onChangeText={(value) => handleInputChange("phone", value)}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={[styles.label, isSmallDevice && styles.labelSmall]}>
            Password *
          </Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[
                styles.inputField,
                isSmallDevice && styles.inputFieldSmall,
              ]}
              placeholder="Enter password"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry={!showPassword}
              value={formData.password}
              onChangeText={(value) => handleInputChange("password", value)}
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
            Confirm Password *
          </Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[
                styles.inputField,
                isSmallDevice && styles.inputFieldSmall,
              ]}
              placeholder="Confirm password"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry={!showConfirm}
              value={formData.confirmPassword}
              onChangeText={(value) =>
                handleInputChange("confirmPassword", value)
              }
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
          style={[
            styles.primaryBtn,
            isSmallDevice && styles.primaryBtnSmall,
            isLoading && styles.disabledBtn,
          ]}
          onPress={handleRegister}
          disabled={isLoading}
        >
          <Ionicons
            name="person-add"
            size={isSmallDevice ? 14 : 16}
            color={colors.white}
          />
          <Text
            style={[styles.btnLabel, isSmallDevice && styles.btnLabelSmall]}
          >
            {isLoading ? "Creating Account..." : "Register"}
          </Text>
        </Pressable>
      </View>

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
  row: {
    flexDirection: "row" as const,
    gap: spacing.md,
  },
  halfInput: {
    flex: 1,
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
  loginSection: {
    flexDirection: "row" as const,
    justifyContent: "center" as const,
    alignItems: "center" as const,
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
