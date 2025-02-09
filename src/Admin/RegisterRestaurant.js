import React, { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Picker } from '@react-native-picker/picker'; 

const categories = [
    { _id: 1, name: "Italian", value: "fine_dining" },
    { _id: 2, name: "Buffet", value: "buffet" },
    { _id: 3, name: "Cafe", value: "cafe" },
    { _id: 4, name: "Fast Food", value: "fast_food" },
    { _id: 5, name: "Live Music", value: "casual_dining" },
];

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
    menuItems: Yup.array().of(
        Yup.object().shape({
            title: Yup.string().required("Menu title is required"),
            description: Yup.string().required("Menu description is required"),
            image: Yup.string().required("Menu image is required"),
        })
    ),
});

const RegisterRestaurant = ({ navigation }) => {
    const [specialMenus, setSpecialMenus] = useState([]);
    const [alcohol, setAlcohol] = useState(null);
    const [dessert, setDessert] = useState(null);
    const [step, setStep] = useState(1);
    const [restaurantFeatures, setRestaurantFeatures] = useState({
        placeToPray: false,
        petFriendly: false,
        kidFriendly: false,
        familyStyle: false,
        romanticStyle: false,
        liveMusic: false,
        parking: false,
        karaoke: false,
        outdoorSeating: false,
        wifi: false,
        boardGames: false
    });

    const handleFeatureChange = (feature) => {
        setRestaurantFeatures({
            ...restaurantFeatures,
            [feature]: !restaurantFeatures[feature]
        });
    };

    const handleNext = () => {
        if (step < 7) {
            setStep(step + 1); // Increase step until 5
        }
    };

    const handleSubmit = async (values) => {
        try {
            // Prepare the payload to match the backend's expected structure
            const payload = {
                email: values.email,
                phone: values.phone,
                address: values.address,
                city: values.city,
                country: values.country,
                facebook: values.facebook,
                instagram: values.instagram,
                twitter: values.twitter,
                hoursOfOperation: values.hoursOfOperation,
                holidayHours: values.holidayHours,
                cuisineType: values.cuisineType,
                averagePrice: values.averagePrice,
                reservationAllowed: values.reservationAllowed,
                advanceReservationPeriod: values.advanceReservationPeriod,
                advanceReservationPeriodHours: values.advanceReservationPeriodHours,
                maxPartySize: values.maxPartySize,
                menuItems: values.menuItems,
                alcoholServices: alcohol, // Use the state value for alcohol
                dessertService: dessert, // Use the state value for dessert
                specialMenus: specialMenus, // Include special menus
                restaurantFeatures: restaurantFeatures, // Include restaurant features
            };
    
            // Send the POST request to the backend
            const response = await axios.post("http://192.168.1.162:8080/api/restaurant", payload);
    
            // Handle success
            Alert.alert("Success", "Restaurant registration successful!");
            navigation.navigate("Home"); // Navigate to the home screen or another appropriate screen
        } catch (error) {
            // Handle errors
            console.error("Error:", error);
            Alert.alert(
                "Error",
                error.response?.data?.message || "An error occurred while registering the restaurant."
            );
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
                menuItems: Array(5).fill({ title: "", description: "", image: null }),
                alcoholServices: false,
                dessertService: false,
                restaurantFeatures,
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
                            <NextButton onPress={handleNext} />
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
                            {/* Cuisine Type as a dropdown */}
                            <Text style={styles.label}>Cuisine Type</Text>
                            <Picker
                                selectedValue={values.cuisineType}
                                onValueChange={handleChange("cuisineType")}
                                onBlur={handleBlur("cuisineType")}
                            >
                                <Picker.Item label="Select Cuisine Type" value="" />
                                {categories.map((category) => (
                                    <Picker.Item
                                        key={category._id}
                                        label={category.name}
                                        value={category.value}
                                    />
                                ))}
                            </Picker>
                            {touched.cuisineType && errors.cuisineType && (
                                <Text style={styles.errorText}>{errors.cuisineType}</Text>
                            )}
                            <InputField
                                label="Average Price"
                                icon="currency-usd"
                                value={values.averagePrice}
                                onChangeText={handleChange("averagePrice")}
                                onBlur={handleBlur("averagePrice")}
                                error={touched.averagePrice && errors.averagePrice}
                                keyboardType="numeric"
                            />
                            <NextButton onPress={handleNext} />
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
                            <NextButton onPress={handleNext} />
                        </View>
                    )}

                    {step === 5 && (
                        <View>
                            <Text style={styles.heading}>Menu and Services</Text>
                            {values.menuItems.map((item, index) => (
                                <View key={index}>
                                    <Text style={styles.subHeading}>Menu Item {index + 1}</Text>
                                    <InputField
                                        label="Menu Title"
                                        value={values.menuItems[index].title}
                                        onChangeText={handleChange(`menuItems[${index}].title`)}
                                        onBlur={handleBlur(`menuItems[${index}].title`)}
                                        error={touched.menuItems?.[index]?.title && errors.menuItems?.[index]?.title}
                                    />
                                    <InputField
                                        label="Menu Description"
                                        value={values.menuItems[index].description}
                                        onChangeText={handleChange(`menuItems[${index}].description`)}
                                        onBlur={handleBlur(`menuItems[${index}].description`)}
                                        error={touched.menuItems?.[index]?.description && errors.menuItems?.[index]?.description}
                                    />
                                    <View style={styles.inputWrapper}>
                                        <Text>Upload Menu Image</Text>
                                        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                                            <AntDesign name="upload" size={24} color="black" />
                                            <Text style={{ marginLeft: 10 }}>Upload Image</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                            <Text>Alcohol Service</Text>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity onPress={() => setAlcohol(true)}>
                                    <MaterialIcons name={alcohol === true ? "radio-button-checked" : "radio-button-unchecked"} size={24} color="black" />
                                    <Text>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setAlcohol(false)}>
                                    <MaterialIcons name={alcohol === false ? "radio-button-checked" : "radio-button-unchecked"} size={24} color="black" />
                                    <Text>No</Text>
                                </TouchableOpacity>
                            </View>

                            <Text>Dessert Service</Text>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity onPress={() => setDessert(true)}>
                                    <MaterialIcons name={dessert === true ? "radio-button-checked" : "radio-button-unchecked"} size={24} color="black" />
                                    <Text>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setDessert(false)}>
                                    <MaterialIcons name={dessert === false ? "radio-button-checked" : "radio-button-unchecked"} size={24} color="black" />
                                    <Text>No</Text>
                                </TouchableOpacity>
                            </View>

                            <Text>Special Menu</Text>
                            <View>
                                {["Vegan", "Gluten-Free", "Halal"].map((menu) => (
                                    <TouchableOpacity key={menu} onPress={() => handleSpecialMenuSelection(menu)} style={{ flexDirection: "row", alignItems: "center" }}>
                                        <MaterialIcons name={specialMenus.includes(menu) ? "check-box" : "check-box-outline-blank"} size={24} color="black" />
                                        <Text style={{ marginLeft: 10 }}>{menu}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <NextButton onPress={handleNext} />
                            
                        </View>
                    )}

{step === 6 && (
                        <View>
                            <Text style={styles.heading}>Restaurant Features</Text>
                            <View>
                                {[
                                    "placeToPray",
                                    "petFriendly",
                                    "kidFriendly",
                                    "familyStyle",
                                    "romanticStyle",
                                    "liveMusic",
                                    "parking",
                                    "karaoke",
                                    "outdoorSeating",
                                    "wifi",
                                    "boardGames",
                                ].map((feature) => (
                                    <TouchableOpacity
                                        key={feature}
                                        onPress={() => handleFeatureChange(feature)}
                                        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
                                    >
                                        <MaterialIcons
                                            name={restaurantFeatures[feature] ? "check-box" : "check-box-outline-blank"}
                                            size={24}
                                            color="black"
                                        />
                                        <Text style={{ marginLeft: 10 }}>{feature.replace(/([A-Z])/g, ' $1').toUpperCase()}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <NextButton onPress={handleNext} />
                            
                        </View>
                    )}

{step === 7 && (
                        <View>
                            <Text style={styles.heading}>Media and Gallery</Text>
                            <View style={styles.inputWrapper}>
                                <Text>Upload Restaurant Photos</Text>
                                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                                    <AntDesign name="upload" size={24} color="black" />
                                    <Text style={{ marginLeft: 10 }}>Upload Image</Text>
                                </TouchableOpacity>
                            </View>

                            <TextInput
                                style={styles.textArea}
                                placeholder="Enter additional information"
                                multiline
                                numberOfLines={4}
                                value={values.additionalInformation}
                                onChangeText={handleChange("additionalInformation")}
                                onBlur={handleBlur("additionalInformation")}
                            />

                            <TouchableOpacity
                                style={styles.nextButton}
                                onPress={() => handleSubmit(values)} // Submit action on step 6
                            >
                                <Text style={styles.nextButtonText}>Submit</Text>
                            </TouchableOpacity>
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
            {icon && <MaterialCommunityIcons name={icon} size={20} color={COLORS.gray} style={styles.iconStyle} />}
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

const SubmitButton = ({ onPress }) => (
    <TouchableOpacity style={styles.nextButton} onPress={onPress}>
        <Text style={styles.nextButtonText}>Submit</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: { flexGrow: 1, backgroundColor: COLORS.white, paddingHorizontal: 20 },
    heading: { textAlign: "center", fontSize: SIZES.xLarge, color: COLORS.secondary, marginBottom: SIZES.large, marginTop: SIZES.large },
    subHeading: { textAlign: "center", fontSize: SIZES.large, color: COLORS.secondary, marginBottom: SIZES.medium, marginTop: SIZES.medium },
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
    uploadButton: { height: 50, backgroundColor: COLORS.dark, borderRadius: 12, justifyContent: "center", alignItems: "center" },
    uploadText: { color: COLORS.white },
});

export default RegisterRestaurant;