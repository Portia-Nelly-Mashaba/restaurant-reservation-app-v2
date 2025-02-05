import React, { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().matches(/\d{10,15}/, "Phone number is invalid").required("Phone is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    reservationAllowed: Yup.boolean().required("This field is required"),
    advanceReservationPeriod: Yup.number().when("reservationAllowed", {
        is: true,
        then: Yup.number().required("Advance reservation period is required"),
    }),
    advanceReservationPeriodHours: Yup.number().when("reservationAllowed", {
        is: true,
        then: Yup.number().required("Advance reservation period (in hours) is required"),
    }),
    maxPartySize: Yup.number().when("reservationAllowed", {
        is: true,
        then: Yup.number().required("Maximum party size is required"),
    }),
});

const RegisterRestaurant = ({ navigation }) => {
    const [step, setStep] = useState(1);

    const handleNext = () => {
        if (step < 5) {
            setStep(step + 1); // Increase step until 5
        }
    };

    const handlePrevious = () => {
        if (step > 1) {
            setStep(step - 1); // Decrease step until 1
        }
    };

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post("http://localhost:8080/api/restaurant/register", values);
            Alert.alert("Success", "Registration successful!");
            navigation.navigate("Home");
        } catch (error) {
            Alert.alert("Error", error.response?.data?.message || "Server error");
        }
    };

    return (
        <Formik
            initialValues={{
                email: "",
                phone: "",
                address: "",
                city: "",
                country: "",
                facebook: "",
                instagram: "",
                twitter: "",
                hoursOfOperation: "",
                holidayHours: "",
                cuisineType: "",
                averagePrice: "",
                reservationAllowed: false,
                advanceReservationPeriod: "",
                advanceReservationPeriodHours: "",
                maxPartySize: "",
                menuTitle: "",
                menuDescription: "",
                menuImage: null,
                alcoholServices: false,
                dessertService: false,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <ScrollView contentContainerStyle={styles.container}>
                    {step === 1 && (
                        <View>
                            <Text style={styles.heading}>Restaurant Details</Text>
                            <InputField
                                label="Email"
                                icon="email-outline"
                                value={values.email}
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")}
                                error={touched.email && errors.email}
                            />
                            <InputField
                                label="Phone"
                                icon="phone-outline"
                                value={values.phone}
                                onChangeText={handleChange("phone")}
                                onBlur={handleBlur("phone")}
                                error={touched.phone && errors.phone}
                            />
                            <InputField
                                label="Address"
                                icon="home-outline"
                                value={values.address}
                                onChangeText={handleChange("address")}
                                onBlur={handleBlur("address")}
                                error={touched.address && errors.address}
                            />
                            <InputField
                                label="City"
                                icon="city"
                                value={values.city}
                                onChangeText={handleChange("city")}
                                onBlur={handleBlur("city")}
                                error={touched.city && errors.city}
                            />
                            <InputField
                                label="Country"
                                icon="earth"
                                value={values.country}
                                onChangeText={handleChange("country")}
                                onBlur={handleBlur("country")}
                                error={touched.country && errors.country}
                            />
                            <NextButton onPress={handleNext} />
                        </View>
                    )}

                    {step === 2 && (
                        <View>
                            <Text style={styles.heading}>Social Media (Optional)</Text>
                            <InputField
                                label="Facebook"
                                icon="facebook"
                                value={values.facebook}
                                onChangeText={handleChange("facebook")}
                                onBlur={handleBlur("facebook")}
                                error={touched.facebook && errors.facebook}
                            />
                            <InputField
                                label="Instagram"
                                icon="instagram"
                                value={values.instagram}
                                onChangeText={handleChange("instagram")}
                                onBlur={handleBlur("instagram")}
                                error={touched.instagram && errors.instagram}
                            />
                            <InputField
                                label="Twitter"
                                icon="twitter"
                                value={values.twitter}
                                onChangeText={handleChange("twitter")}
                                onBlur={handleBlur("twitter")}
                                error={touched.twitter && errors.twitter}
                            />
                            <View style={styles.buttonContainer}>
                                <PrevButton onPress={handlePrevious} />
                                <NextButton onPress={handleNext} />
                            </View>
                        </View>
                    )}

                    {step === 3 && (
                        <View>
                            <Text style={styles.heading}>Operation Details</Text>
                            <InputField
                                label="Hours of Operation"
                                icon="clock-outline"
                                value={values.hoursOfOperation}
                                onChangeText={handleChange("hoursOfOperation")}
                                onBlur={handleBlur("hoursOfOperation")}
                                error={touched.hoursOfOperation && errors.hoursOfOperation}
                            />
                            <InputField
                                label="Holiday Hours"
                                icon="calendar-outline"
                                value={values.holidayHours}
                                onChangeText={handleChange("holidayHours")}
                                onBlur={handleBlur("holidayHours")}
                                error={touched.holidayHours && errors.holidayHours}
                            />
                            <InputField
                                label="Cuisine Type"
                                icon="silverware-fork-knife"
                                value={values.cuisineType}
                                onChangeText={handleChange("cuisineType")}
                                onBlur={handleBlur("cuisineType")}
                                error={touched.cuisineType && errors.cuisineType}
                            />
                            <InputField
                                label="Average Price"
                                icon="currency-usd"
                                value={values.averagePrice}
                                onChangeText={handleChange("averagePrice")}
                                onBlur={handleBlur("averagePrice")}
                                error={touched.averagePrice && errors.averagePrice}
                                keyboardType="numeric"
                            />
                            <View style={styles.buttonContainer}>
                                <PrevButton onPress={handlePrevious} />
                                <NextButton onPress={handleNext} />
                            </View>
                        </View>
                    )}

                    {step === 4 && (
                        <View>
                            <Text style={styles.heading}>Reservation Policy</Text>
                            <InputField
                                label="Allow Reservation"
                                icon="checkbox-marked-circle-outline"
                                value={values.reservationAllowed ? "Yes" : "No"}
                                onChangeText={handleChange("reservationAllowed")}
                                onBlur={handleBlur("reservationAllowed")}
                                error={touched.reservationAllowed && errors.reservationAllowed}
                            />
                            {values.reservationAllowed && (
                                <>
                                    <InputField
                                        label="Advance Reservation Period (Days)"
                                        icon="calendar-range"
                                        value={values.advanceReservationPeriod}
                                        onChangeText={handleChange("advanceReservationPeriod")}
                                        onBlur={handleBlur("advanceReservationPeriod")}
                                        error={touched.advanceReservationPeriod && errors.advanceReservationPeriod}
                                        keyboardType="numeric"
                                    />
                                    <InputField
                                        label="Advance Reservation Period (Hours)"
                                        icon="clock-outline"
                                        value={values.advanceReservationPeriodHours}
                                        onChangeText={handleChange("advanceReservationPeriodHours")}
                                        onBlur={handleBlur("advanceReservationPeriodHours")}
                                        error={touched.advanceReservationPeriodHours && errors.advanceReservationPeriodHours}
                                        keyboardType="numeric"
                                    />
                                    <InputField
                                        label="Maximum Party Size"
                                        icon="account-group-outline"
                                        value={values.maxPartySize}
                                        onChangeText={handleChange("maxPartySize")}
                                        onBlur={handleBlur("maxPartySize")}
                                        error={touched.maxPartySize && errors.maxPartySize}
                                        keyboardType="numeric"
                                    />
                                </>
                            )}
                            <View style={styles.buttonContainer}>
                                <PrevButton onPress={handlePrevious} />
                                <NextButton onPress={handleNext} />
                            </View>
                        </View>
                    )}

                    {step === 5 && (
                        <View>
                            <Text style={styles.heading}>Menu</Text>
                            <InputField
                                label="Menu Title"
                                value={values.menuTitle}
                                onChangeText={handleChange("menuTitle")}
                                onBlur={handleBlur("menuTitle")}
                                error={touched.menuTitle && errors.menuTitle}
                            />
                            <InputField
                                label="Menu Description"
                                value={values.menuDescription}
                                onChangeText={handleChange("menuDescription")}
                                onBlur={handleBlur("menuDescription")}
                                error={touched.menuDescription && errors.menuDescription}
                            />
                            <View style={styles.inputWrapper}>
                                <Text style={styles.label}>Upload Image</Text>
                                <TouchableOpacity style={styles.uploadButton}>
                                    <Text style={styles.uploadText}>Choose Image</Text>
                                </TouchableOpacity>
                            </View>
                            <InputField
                                label="Alcohol Services"
                                value={values.alcoholServices ? "Yes" : "No"}
                                onChangeText={handleChange("alcoholServices")}
                                onBlur={handleBlur("alcoholServices")}
                                error={touched.alcoholServices && errors.alcoholServices}
                            />
                            <InputField
                                label="Dessert Service"
                                value={values.dessertService ? "Yes" : "No"}
                                onChangeText={handleChange("dessertService")}
                                onBlur={handleBlur("dessertService")}
                                error={touched.dessertService && errors.dessertService}
                            />
                            <TouchableOpacity
                                style={styles.nextButton}
                                onPress={() => handleSubmit(values)} // Submit action on step 5
                            >
                                <Text style={styles.nextButtonText}>Submit</Text>
                            </TouchableOpacity>
                            <View style={styles.buttonContainer}>
                                <PrevButton onPress={handlePrevious} />
                            </View>
                        </View>
                    )}
                </ScrollView>
            )}
        </Formik>
    );
};


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

const NextButton = ({ onPress }) => (
    <TouchableOpacity style={styles.nextButton} onPress={onPress}>
        <Text style={styles.nextButtonText}>Next</Text>
    </TouchableOpacity>
);

const PrevButton = ({ onPress }) => (
    <TouchableOpacity style={styles.prevButton} onPress={onPress}>
        <Text style={styles.nextButtonText}>Previous</Text>
    </TouchableOpacity>
);

const SubmitButton = ({ onPress }) => (
    <TouchableOpacity style={styles.nextButton} onPress={onPress}>
        <Text style={styles.nextButtonText}>Submit</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: { flexGrow: 1, backgroundColor: COLORS.white, paddingHorizontal: 20 },
    heading: { textAlign: "center", fontSize: SIZES.xLarge, color: COLORS.secondary, marginBottom: SIZES.large, marginTop: SIZES.large },
    inputWrapper: { marginBottom: 20 },
    label: { fontSize: SIZES.small, color: COLORS.black, marginBottom: 5 },
    inputField: { flexDirection: "row", alignItems: "center", borderColor: COLORS.gray, borderWidth: 1, borderRadius: 12, height: 50, paddingHorizontal: 15 },
    input: { flex: 1, color: COLORS.black },
    iconStyle: { marginRight: 10 },
    nextButton: { height: 50, backgroundColor: COLORS.black, borderRadius: 12, justifyContent: "center", alignItems: "center", marginTop: SIZES.large },
    nextButtonText: { color: COLORS.white, fontSize: SIZES.medium },
    errorText: { color: "red", fontSize: SIZES.small, marginTop: 5 },
    buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: SIZES.large },
    prevButton: { height: 50, backgroundColor: COLORS.gray, borderRadius: 12, justifyContent: "center", alignItems: "center", flex: 1, marginRight: 10 },
    uploadButton: { height: 50, backgroundColor: COLORS.primary, borderRadius: 12, justifyContent: "center", alignItems: "center" },
    uploadText: { color: COLORS.white },
});

export default RegisterRestaurant;
