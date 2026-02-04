import { addUser } from "@/app/store/AuthSlice";
import { useAppDispatch } from "@/app/store/hook";
import Entypo from "@expo/vector-icons/Entypo";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { authService } from "@/app/service/authService";
import { authPayload } from "@/app/types/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { usePushNotifications } from "@/hooks/usePushNotifications";

const PRIMARY = "#0a7ea4";
const GRAY_300 = "#D1D5DB";
const RED_500 = "#EF4444";
const GRAY_600 = "#4B5563";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("Lubna@gmail.com");
  const [password, setPassword] = useState("1234");
  const [errors, setErrors] = useState<authPayload>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (name: "email" | "password", value: string) => {
    if (name === "email") setEmail(value);
    else setPassword(value);
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = (): boolean => {
    const next: { email?: string; password?: string } = {};
    if (!email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Invalid email";
    if (!password) next.password = "Password is required";
    else if (password.length < 4)
      next.password = "Password must be at least 4 characters";
    setErrors(next as authPayload);

    return Object.keys(next).length === 0;
  };

  const loginMutation = useMutation({
    mutationFn: (payload: authPayload) =>
      authService.login(payload.email, payload.password),
    onSuccess: async (data) => {
      dispatch(addUser(data));
      const token = (data as any)?.token || (data as any)?.data?.token;
      if (token) {
        await AsyncStorage.setItem("token", token);
      }
      Toast.show({
        type: "success",
        text1: "Login Successfully",
      });
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        return Toast.show({
          type: "error",
          text1: error?.response?.data.message,
        });
      }

      Toast.show({
        type: "error",
        text1: "Something went wrong",
      });
    },
  });

  const handleLogin = () => {
    if (!validate()) return;

    loginMutation.mutate({ email, password });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.container}>
            <View style={styles.card}>
              {/* LOGO */}
              <View style={styles.logoWrap}>
                <Image
                  source={require("../../../assets/images/logo.png")}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>

              {/* EMAIL */}
              <TextInput
                placeholder="Email"
                placeholderTextColor={GRAY_600}
                style={styles.input}
                value={email}
                onChangeText={(text) => handleChange("email", text)}
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
              />
              {errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}

              {/* PASSWORD */}
              <View style={styles.passwordWrap}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={GRAY_600}
                  style={styles.input}
                  value={password}
                  onChangeText={(text) => handleChange("password", text)}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Entypo
                    name={showPassword ? "eye-with-line" : "eye"}
                    size={20}
                    color={GRAY_600}
                  />
                </TouchableOpacity>
              </View>
              {errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}

              <TouchableOpacity
                onPress={handleLogin}
                style={styles.loginButton}
                activeOpacity={0.8}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  card: {
    width: "100%",
    borderWidth: 2,
    borderColor: PRIMARY,
    paddingVertical: 32,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  logoWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 200,
    width: 200,
  },
  input: {
    width: "100%",
    height: 56,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: GRAY_300,
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 4,
    fontSize: 16,
  },
  errorText: {
    color: RED_500,
    fontSize: 14,
    marginBottom: 4,
  },
  passwordWrap: {
    position: "relative",
    marginVertical: 10,
  },
  eyeButton: {
    position: "absolute",
    right: 12,
    top: 27,
  },
  forgotWrap: {
    alignItems: "flex-end",
    marginVertical: 16,
  },
  forgotText: {
    color: PRIMARY,
    fontSize: 14,
  },
  loginButton: {
    width: "100%",
    height: 48,
    backgroundColor: PRIMARY,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  signupWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 24,
    marginBottom: 24,
  },
  signupLabel: {
    color: GRAY_600,
    fontSize: 14,
  },
  signupLink: {
    color: PRIMARY,
    fontSize: 14,
  },
});
