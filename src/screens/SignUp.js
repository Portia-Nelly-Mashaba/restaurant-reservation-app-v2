import React from "react";
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
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";  // ✅ Import Axios for API Calls

// Validation Schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required("First Name is required"),
  surname: Yup.string().required("Surname is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
  phone: Yup.string()
    .matches(/^\d{10,15}$/, "Phone number is invalid")
    .required("Phone is required"),
});

const SignUp = ({ navigation }) => {
  const handleSignUp = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("http://192.168.147.93:8080/api/user/register", values);

      if (response.data.success) {
        Alert.alert("Success", "Registration successful! Please login.");
        navigation.navigate("Login");  // ✅ Navigate after successful registration
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.error("SignUp Error:", error);
      Alert.alert("Error", error.response?.data?.message || "Server error");
    } finally {
      setSubmitting(false); // ✅ Stops the loading state
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        city: "",
        country: "",
        phone: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSignUp}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.heading}>Register</Text>

          {/* First Name Input */}
          <InputField
            label="First Name"
            icon="account-outline"
            placeholder="Enter first name"
            value={values.name}
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            error={touched.name && errors.name}
          />

          {/* Surname Input */}
          <InputField
            label="Surname"
            icon="account-outline"
            placeholder="Enter surname"
            value={values.surname}
            onChangeText={handleChange("surname")}
            onBlur={handleBlur("surname")}
            error={touched.surname && errors.surname}
          />

          {/* Email Input */}
          <InputField
            label="Email"
            icon="email-outline"
            placeholder="Enter email"
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            keyboardType="email-address"
            error={touched.email && errors.email}
          />

          {/* Password Input */}
          <InputField
            label="Password"
            icon="lock-outline"
            placeholder="Enter password"
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            secureTextEntry
            error={touched.password && errors.password}
          />

          {/* Confirm Password Input */}
          <InputField
            label="Confirm Password"
            icon="lock-outline"
            placeholder="Re-enter password"
            value={values.confirmPassword}
            onChangeText={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            secureTextEntry
            error={touched.confirmPassword && errors.confirmPassword}
          />

          {/* Address Input */}
          <InputField
            label="Address"
            icon="home-outline"
            placeholder="Enter address"
            value={values.address}
            onChangeText={handleChange("address")}
            onBlur={handleBlur("address")}
            error={touched.address && errors.address}
          />

          {/* City Input */}
          <InputField
            label="City"
            icon="city"
            placeholder="Enter city"
            value={values.city}
            onChangeText={handleChange("city")}
            onBlur={handleBlur("city")}
            error={touched.city && errors.city}
          />

          {/* Country Input */}
          <InputField
            label="Country"
            icon="earth"
            placeholder="Enter country"
            value={values.country}
            onChangeText={handleChange("country")}
            onBlur={handleBlur("country")}
            error={touched.country && errors.country}
          />

          {/* Phone Input */}
          <InputField
            label="Phone"
            icon="phone-outline"
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            value={values.phone}
            onChangeText={handleChange("phone")}
            onBlur={handleBlur("phone")}
            error={touched.phone && errors.phone}
          />

          {/* Sign-Up Button */}
          <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit} disabled={isSubmitting}>
            <Text style={styles.signUpButtonText}>{isSubmitting ? "Registering..." : "Sign Up"}</Text>
          </TouchableOpacity>

          {/* Already have an account? Login */}
          <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.registerTextContainer}>
            <Text style={styles.registerText}>Already have an account? Log In</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Formik>
  );
};

// Custom InputField Component
const InputField = ({ label, icon, error, ...props }) => (
  <View style={styles.inputWrapper}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputField}>
      <MaterialCommunityIcons name={icon} size={20} color={COLORS.gray} style={styles.iconStyle} />
      <TextInput style={styles.input} {...props} />
    </View>
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  heading: {
    textAlign: "center",
    fontSize: SIZES.xxLarge,
    fontFamily: "bold",
    color: COLORS.secondary,
    marginBottom: SIZES.large,
  },
  inputWrapper: { marginBottom: 20 },
  label: { fontFamily: "regular", fontSize: SIZES.small, color: COLORS.black, marginBottom: 5 },
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
  signUpButton: {
    height: 50,
    backgroundColor: COLORS.black,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: SIZES.large,
  },
  signUpButtonText: { color: COLORS.white, fontFamily: "bold", fontSize: SIZES.medium },
  registerTextContainer: { marginTop: 10, alignItems: "center" },
  registerText: { color: COLORS.primary, fontFamily: "regular", fontSize: SIZES.medium },
  errorText: { color: "red", fontSize: SIZES.small, marginTop: 5 },
});

export default SignUp;
