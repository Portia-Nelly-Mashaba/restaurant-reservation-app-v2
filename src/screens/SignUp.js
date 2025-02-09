import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [obscureText, setObscureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    const trimmedEmail = email.trim();
    const trimmedFullName = fullName.trim();

    if (!trimmedEmail || !password || !trimmedFullName) {
      Alert.alert("Error", "Please provide all required fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://10.0.2.2:8080/api/user/register", // Ensure backend is reachable
        {
          name: trimmedFullName,
          surname: "NA",
          email: trimmedEmail,
          password,
          address: "NA",
          city: "NA",
          country: "NA",
          phone: "NA",
        },
        { withCredentials: true }
      );

      Alert.alert("Success", "Registration successful!", [
        { text: "OK", onPress: () => navigation.navigate("Profile") },
      ]);
    } catch (error) {
      console.error("Signup Error:", error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Please try again.";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Register</Text>

        {/* Full Name Input */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputField}>
            <MaterialCommunityIcons name="account" size={20} color={COLORS.gray} style={styles.iconStyle} />
            <TextInput
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
            />
          </View>
        </View>

        {/* Email Input */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputField}>
            <MaterialCommunityIcons name="email-outline" size={20} color={COLORS.gray} style={styles.iconStyle} />
            <TextInput
              placeholder="Enter email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Password Input */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputField}>
            <MaterialCommunityIcons name="lock-outline" size={20} color={COLORS.gray} style={styles.iconStyle} />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry={obscureText}
            />
            <TouchableOpacity onPress={() => setObscureText(!obscureText)}>
              <MaterialCommunityIcons name={obscureText ? "eye-outline" : "eye-off-outline"} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp} disabled={loading}>
          <Text style={styles.signUpButtonText}>{loading ? "Signing Up..." : "Sign Up"}</Text>
        </TouchableOpacity>

        {/* Already have an account? Login */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.registerTextContainer}>
          <Text style={styles.registerText}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", paddingHorizontal: 20, backgroundColor: COLORS.white },
  heading: { textAlign: "center", fontSize: SIZES.xxLarge, fontWeight: "bold", color: COLORS.secondary, marginBottom: SIZES.large },
  inputWrapper: { marginBottom: 20 },
  label: { fontSize: SIZES.small, color: COLORS.black, marginBottom: 5 },
  inputField: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.white, borderColor: COLORS.gray, borderWidth: 1, borderRadius: 12, height: 50, paddingHorizontal: 15 },
  input: { flex: 1, color: COLORS.black },
  iconStyle: { marginRight: 10 },
  signUpButton: { height: 50, backgroundColor: COLORS.black, borderRadius: 12, justifyContent: "center", alignItems: "center", marginVertical: SIZES.large },
  signUpButtonText: { color: COLORS.white, fontWeight: "bold", fontSize: SIZES.medium },
  registerTextContainer: { marginTop: 10, alignItems: "center" },
  registerText: { color: COLORS.primary, fontSize: SIZES.medium },
});

export default SignUp;
