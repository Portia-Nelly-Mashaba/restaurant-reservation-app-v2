import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
  } from "react-native";
  import React, { useState } from "react";
  import { AntDesign } from "@expo/vector-icons";
  import { COLORS, SIZES } from "../constants/theme"; // Ensure these are defined in your project
  const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
          {/* Heading */}
          <Text style={styles.heading}>Let's Explore</Text>
          {/* Email Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputField}>
              <AntDesign name="mail" size={20} color={COLORS.gray} style={styles.iconStyle} />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={COLORS.gray}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>
          {/* Password Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputField}>
              <AntDesign name="lock" size={20} color={COLORS.gray} style={styles.iconStyle} />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={COLORS.gray}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>
          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              // Handle Login Logic
              console.log("Email:", email, "Password:", password);
            }}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          {/* Register Link */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Sign-Up")} // Navigate to SignUp.js
          >
            <Text style={styles.registerText}>Don't have an account? Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };
  export default Login;
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
      fontSize: SIZES.medium,
      fontFamily: "regular",
      color: COLORS.primary,
      marginTop: 10,
    },
  });