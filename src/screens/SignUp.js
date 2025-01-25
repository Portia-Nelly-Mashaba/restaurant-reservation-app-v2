import React, { useState, useRef, useContext } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";
import { UserLocationContext } from "../context/UserLocationContext";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button } from "../components/Button"; // Assuming this is your reusable button component
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  email: Yup.string()
    .email("Provide a valid email address")
    .required("Required"),
  username: Yup.string()
    .min(3, "Provide a valid username")
    .required("Required"),
});
const SignUp = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [obsecureText, setObsecureText] = useState(false);
  const inValidForm = () => {
    Alert.alert("Invalid Form", "Please provide all required fields", [
      { text: "Cancel" },
      { text: "Continue" },
    ]);
  };
  const registerUser = async (values) => {
    setLoader(true);
    try {
      // Replace this with your actual registration API call
      const response = await axios.post("http://localhost:6002/register", values);
      if (response.status === 201) {
        setLoader(false);
        navigation.navigate("Login");
      } else {
        setLoader(false);
        Alert.alert("Error", "Please provide valid credentials");
      }
    } catch (error) {
      setLoader(false);
      Alert.alert("Error", "Something went wrong, please try again");
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
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={styles.heading}>Sign Up</Text>
        <Formik
          initialValues={{
            email: "",
            password: "",
            username: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => registerUser(values)}
        >
          {({
            handleChange,
            handleBlur,
            touched,
            handleSubmit,
            values,
            errors,
            isValid,
            setFieldTouched,
          }) => (
            <View>
              {/* Username Input */}
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Username</Text>
                <View style={styles.inputField}>
                  <MaterialCommunityIcons
                    name="face-man-profile"
                    size={20}
                    color={COLORS.gray}
                    style={styles.iconStyle}
                  />
                  <TextInput
                    placeholder="Username"
                    value={values.username}
                    onChangeText={handleChange("username")}
                    onFocus={() => setFieldTouched("username")}
                    onBlur={() => setFieldTouched("username", false)}
                    style={styles.input}
                  />
                </View>
                {touched.username && errors.username && (
                  <Text style={styles.errorMessage}>{errors.username}</Text>
                )}
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
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onFocus={() => setFieldTouched("email")}
                    onBlur={() => setFieldTouched("email", false)}
                    style={styles.input}
                    keyboardType="email-address"
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorMessage}>{errors.email}</Text>
                )}
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
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onFocus={() => setFieldTouched("password")}
                    onBlur={() => setFieldTouched("password", false)}
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
                {touched.password && errors.password && (
                  <Text style={styles.errorMessage}>{errors.password}</Text>
                )}
              </View>
              {/* Sign-Up Button */}
              <Button
                title="SIGN UP"
                onPress={isValid ? handleSubmit : inValidForm}
                loader={loader}
                isValid={isValid}
              />
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
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};
const styles = {
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
  errorMessage: {
    color: COLORS.danger,
    fontSize: SIZES.small,
    marginTop: 5,
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
};
export default SignUp;