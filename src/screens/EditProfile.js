import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { COLORS } from "../constants/theme"; // Assuming you have this file
import { useNavigation } from "@react-navigation/native";
import { data } from "../constants/data"; // Import dataset
import * as ImagePicker from "react-native-image-picker";

const EditProfile = () => {
  const navigation = useNavigation();
  const user = data.profiles[0]; // Mock data for the first user

  const [profile, setProfile] = useState({
    fullName: user.fullName,
    email: user.email,
    address: user.address[0],
    profile_img: user.profile_img,
  });

  // Handle input changes
  const handleInputChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  // Handle Save Changes
  const handleSave = () => {
    Alert.alert("Success", "Your profile has been updated!");
    navigation.goBack();
  };

  // Open Image Picker
  const handleImagePicker = () => {
    Alert.alert(
      "Upload Profile Picture",
      "Choose an option",
      [
        {
          text: "Take Photo",
          onPress: () => {
            ImagePicker.launchCamera({ mediaType: "photo" }, (response) => {
              if (response.didCancel) {
                console.log("User cancelled camera");
              } else if (response.errorMessage) {
                console.error("Camera Error: ", response.errorMessage);
              } else if (response.assets && response.assets.length > 0) {
                setProfile({ ...profile, profile_img: response.assets[0].uri });
              }
            });
          },
        },
        {
          text: "Choose from Gallery",
          onPress: () => {
            ImagePicker.launchImageLibrary({ mediaType: "photo" }, (response) => {
              if (response.didCancel) {
                console.log("User cancelled gallery picker");
              } else if (response.errorMessage) {
                console.error("Image Picker Error: ", response.errorMessage);
              } else if (response.assets && response.assets.length > 0) {
                setProfile({ ...profile, profile_img: response.assets[0].uri });
              }
            });
          },
        },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Edit Profile</Text>
      </View>
      <View style={styles.profileContainer}>
      <TouchableOpacity onPress={handleImagePicker} style={styles.imagePickerContainer}>
  <Image source={{ uri: profile.profile_img }} style={styles.profileImage} />
  <Text style={styles.editImageText}>Tap to Change Profile Image</Text>
</TouchableOpacity>


        {/* Input Fields */}
        <TextInput
          style={styles.input}
          value={profile.fullName}
          onChangeText={(text) => handleInputChange("fullName", text)}
          placeholder="Full Name"
        />
        <TextInput
          style={styles.input}
          value={profile.email}
          onChangeText={(text) => handleInputChange("email", text)}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          value={profile.address}
          onChangeText={(text) => handleInputChange("address", text)}
          placeholder="Address"
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>

      {/* Cancel Button */}
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
    alignItems: "center",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  profileContainer: {
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  imagePickerContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  editImageText: {
    fontSize: 14,
    color: COLORS.primary,
    textAlign: "center",
    marginTop: 8,
  },
  input: {
    width: "90%",
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.gray,
    fontSize: 16,
    color: COLORS.text,
  },
  saveButton: {
    backgroundColor: COLORS.dark,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 10,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: COLORS.gray,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditProfile;
