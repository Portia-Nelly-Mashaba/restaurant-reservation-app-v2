import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { useRoute } from '@react-navigation/native'; // To get the parameters passed
import { data } from "../../../constants/data";  // Use data.js for restaurant details

const RestaurantListViewDetail = () => {
  const route = useRoute();
  const { restaurantId } = route.params;

  const restaurant = data.restaurants.find((rest) => rest.id === restaurantId);

  const [editedRestaurant, setEditedRestaurant] = useState({
    ...restaurant,
    isEditable: false,
  });

  // Handle input changes
  const handleChange = (field, value) => {
    setEditedRestaurant((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Toggle editable state
  const toggleEdit = () => {
    setEditedRestaurant((prevState) => ({
      ...prevState,
      isEditable: !prevState.isEditable,
    }));
  };

  // Handle button actions
  const handleUpdate = () => {
    console.log("Updating restaurant:", editedRestaurant);
    // Add logic for updating the restaurant details (e.g., API call or state update)
  };

  const handleApprove = () => {
    console.log("Approving restaurant:", editedRestaurant);
    // Add logic for approving the restaurant (e.g., change its status)
  };

  const handleDeActivate = () => {
    console.log("De-activating restaurant:", editedRestaurant);
    // Add logic for deactivating the restaurant (e.g., change its status)
  };

  const handleCancel = () => {
    setEditedRestaurant({ ...restaurant, isEditable: false });
    console.log("Cancelling changes.");
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: editedRestaurant.imageUrl }} style={styles.image} />
      <TextInput
        style={styles.inputField}
        value={editedRestaurant.title}
        onChangeText={(text) => handleChange("title", text)}
        editable={editedRestaurant.isEditable}
        placeholder="Restaurant Name"
      />
      <TextInput
        style={styles.inputField}
        value={editedRestaurant.cuisine}
        onChangeText={(text) => handleChange("cuisine", text)}
        editable={editedRestaurant.isEditable}
        placeholder="Cuisine"
      />
      <TextInput
        style={styles.inputField}
        value={editedRestaurant.hours_of_operation}
        onChangeText={(text) => handleChange("hours_of_operation", text)}
        editable={editedRestaurant.isEditable}
        placeholder="Opening Hours"
      />
      <TextInput
        style={styles.inputField}
        value={editedRestaurant.coords.address}
        onChangeText={(text) => handleChange("coords", { ...editedRestaurant.coords, address: text })}
        editable={editedRestaurant.isEditable}
        placeholder="Address"
      />
      <TextInput
        style={styles.inputField}
        value={editedRestaurant.description}
        onChangeText={(text) => handleChange("description", text)}
        editable={editedRestaurant.isEditable}
        placeholder="Description"
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleEdit}>
          <Text style={styles.buttonText}>{editedRestaurant.isEditable ? "Save" : "Edit"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleApprove}>
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDeActivate}>
          <Text style={styles.buttonText}>De-activate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  inputField: {
    fontSize: 16,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 16,
    padding: 12,
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default RestaurantListViewDetail;
