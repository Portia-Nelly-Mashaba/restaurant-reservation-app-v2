import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../../constants/theme"; // Replace with your theme file

const User = ({ route, navigation }) => {
  // Get the user data passed from the Users component
  const { user } = route.params;

  // State for editable fields
  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);

  // Handle updating the user
  const handleUpdateUser = () => {
    // Replace this with your actual update logic (e.g., API call)
    const updatedUser = {
      ...user,
      name: editedName,
      email: editedEmail,
    };
    console.log("Updated User:", updatedUser);

    // Navigate back to the Users screen after updating
    navigation.goBack();
  };

  return (
    <View style={styles.container}>

      {/* User Image */}
      <Image source={{ uri: user.imageUrl }} style={styles.userImage} />

      {/* Editable Fields */}
      <TextInput
        style={styles.input}
        value={editedName}
        onChangeText={setEditedName}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={editedEmail}
        onChangeText={setEditedEmail}
        placeholder="Email"
        keyboardType="email-address"
      />

      {/* Update Button */}
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateUser}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    padding: 20,
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  userImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: COLORS.white,
  },
  updateButton: {
    width: "100%",
    backgroundColor: COLORS.dark,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  updateButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default User;