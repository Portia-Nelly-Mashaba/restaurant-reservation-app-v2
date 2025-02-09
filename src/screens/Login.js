import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert 
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";  
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { CommonActions } from "@react-navigation/native"; 

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

const Login = ({ navigation }) => {
  const handleLogin = async (values) => {
    try {
      const response = await axios.post("http://192.168.1.162:8080/api/user/login", values);
      console.log("Response:", response.data);
  
      if (response.data.success) {
        await AsyncStorage.setItem("loggedInUser", JSON.stringify(response.data.user));
        Alert.alert("Success", "Login Successfully");
  
        // Use navigation.replace instead of CommonActions.reset
        navigation.replace("Reservation");
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Error", error.response?.data?.message || "Server issue");
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
        <Text style={styles.heading}>Let's Explore</Text>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              {/* Email Input */}
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputField}>
                  <AntDesign
                    name="mail"
                    size={20}
                    color={COLORS.gray}
                    style={styles.iconStyle}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor={COLORS.gray}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect={false}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              {/* Password Input */}
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputField}>
                  <AntDesign
                    name="lock"
                    size={20}
                    color={COLORS.gray}
                    style={styles.iconStyle}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor={COLORS.gray}
                    secureTextEntry={true}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                  />
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              {/* Login Button */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleSubmit}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>

        {/* Register Link */}
        <TouchableOpacity onPress={() => navigation.navigate("Sign-Up")}>
          <Text style={styles.registerText}>
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  heading: {
    textAlign: "center",
    fontSize: SIZES.xxLarge,
    fontFamily: "bold",
    color: COLORS.secondary,
    marginBottom: SIZES.large,
  },
  inputWrapper: { marginBottom: 20 },
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
  input: { flex: 1, color: COLORS.black, fontFamily: "regular" },
  iconStyle: { marginRight: 10 },
  errorText: { color: "red", fontSize: SIZES.small, marginTop: 2 },
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
