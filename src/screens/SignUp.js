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
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setfullName] = useState("");
  const [obsecureText, setObsecureText] = useState(true);

  const handleSignUp = ({navigation}) => {
    if (!email || !password || !fullName) {
      Alert.alert("Error", "Please provide all required fields");
    } else {
      // Replace this with your actual registration API call
      Alert.alert("Success", "Registration successful!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Login"),
        },
      ]);
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
        {/* Username Input */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>FullName</Text>
          <View style={styles.inputField}>
            <MaterialCommunityIcons
              name="face-man-profile"
              size={20}
              color={COLORS.gray}
              style={styles.iconStyle}
            />
            <TextInput
              placeholder="Full Name"
              value={fullName}
              onChangeText={setfullName}
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
