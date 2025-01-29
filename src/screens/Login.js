import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [obsecureText, setObsecureText] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const minLength = 6;
    const regex = /^(?=.*\d)/; // At least one number
    return password.length >= minLength && regex.test(password);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }
  
    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
  
    if (!validatePassword(password)) {
      Alert.alert("Error", "Password must be at least 6 characters long and contain at least one number");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await fetch("http://192.168.1.31:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log("Email:", email, "Password:", password);

  
      const data = await response.json();
      console.log("Response Data:", data);  // Log the server's response for debugging
  
      if (response.ok) {
        await AsyncStorage.setItem("userToken", data.token); // Store the token
        console.log("Stored Token:", await AsyncStorage.getItem("userToken")); // Log token after storage

        Alert.alert("Success", data.message, [
          {
            text: "OK",
            onPress: () => {
              console.log("Navigating to Home...");
              navigation.navigate("Home");
            },
          },
        ]);
      } else {
        Alert.alert("Error", data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);  // Log the error to help debug
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>Login</Text>

        {/* Email Input */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputField}>
            <MaterialCommunityIcons
              name="email-outline"
              size={20}
              color={COLORS.gray}
              style={styles.iconStyle}
            />
            <TextInput
              placeholder="Enter email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
            />
          </View>
        </View>

        {/* Password Input */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputField}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={20}
              color={COLORS.gray}
              style={styles.iconStyle}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry={obsecureText}
            />
            <TouchableOpacity onPress={() => setObsecureText(!obsecureText)}>
              <MaterialCommunityIcons
                name={obsecureText ? "eye-outline" : "eye-off-outline"}
                size={18}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>

        {/* Go to SignUp */}
        <TouchableOpacity onPress={() => navigation.navigate("Sign-Up")}>
          <Text style={styles.registerText}>
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    textAlign: "center",
    fontSize: SIZES.xxLarge,
    fontFamily: "bold",
    color: COLORS.secondary,
    marginBottom: SIZES.large,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    color: COLORS.black,
    marginBottom: 5,
  },
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    color: COLORS.black,
    fontFamily: "regular",
  },
  iconStyle: {
    marginRight: 10,
  },
  loginButton: {
    height: 50,
    backgroundColor: COLORS.black,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: SIZES.large,
  },
  loginButtonText: {
    color: COLORS.white,
    fontFamily: "bold",
    fontSize: SIZES.medium,
  },
  registerText: {
    textAlign: "center",
    color: COLORS.primary,
    fontFamily: "regular",
    fontSize: SIZES.medium,
    marginTop: 10,
  },
});

export default Login;
