import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");  // Changed to 'name'
  const [obsecureText, setObsecureText] = useState(true);

  const handleSignUp = async () => {
    if (!email || !password || !name) {
      Alert.alert("Error", "Please provide all required fields");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.31:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),  // Send 'name'
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("userToken", data.token); // Store the token
        Alert.alert("Success", "Registration successful!", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"), // Ensure Login is correctly named in the navigator
          },
        ]);
      } else {
        Alert.alert("Error", data.message || "Registration failed");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: COLORS.white,
        justifyContent: "center",
        paddingHorizontal: 20,
      }}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Register</Text>
        {/* Full Name Input */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputField}>
            <MaterialCommunityIcons
              name="face-man-profile"
              size={20}
              color={COLORS.gray}
              style={styles.iconStyle}
            />
            <TextInput
              placeholder="Full Name"
              value={name}  // Changed to 'name'
              onChangeText={setName}  // Updates 'name'
              style={styles.input}
            />
          </View>
        </View>
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
            <TouchableOpacity
              onPress={() => setObsecureText(!obsecureText)}
            >
              <MaterialCommunityIcons
                name={obsecureText ? "eye-outline" : "eye-off-outline"}
                size={18}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* Sign-Up Button */}
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={handleSignUp}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
        {/* Already have an account? Login */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.registerTextContainer}
        >
          <Text style={styles.registerText}>
            Already have an account? Log In
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  signUpButton: {
    height: 50,
    backgroundColor: COLORS.black,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: SIZES.large,
  },
  signUpButtonText: {
    color: COLORS.white,
    fontFamily: "bold",
    fontSize: SIZES.medium,
  },
  registerTextContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  registerText: {
    color: COLORS.primary,
    fontFamily: "regular",
    fontSize: SIZES.medium,
  },
});

export default SignUp;
