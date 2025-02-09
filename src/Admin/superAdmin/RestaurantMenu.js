import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from "react-native";
import { COLORS } from "../../constants/theme";  // Import COLORS theme
import { data } from "../../constants/data";  // Use data.js for menu details

const RestaurantMenu = ({ route, navigation }) => {
  const { restaurantId } = route.params; // Use the restaurantId passed through navigation

  // Find the restaurant by id
  const restaurant = data.restaurants.find((rest) => rest.id === restaurantId);

  // Initialize state with the restaurant's menu items
  const [editedMenu, setEditedMenu] = useState({
    ...restaurant,
    isEditable: false,
  });

  // Handle changes to menu item fields (name and price)
  const handleChange = (field, value, index) => {
    const updatedMenuItems = [...editedMenu.menuItems];
    updatedMenuItems[index][field] = value;
    setEditedMenu((prevState) => ({
      ...prevState,
      menuItems: updatedMenuItems,
    }));
  };

  // Toggle between edit and view modes
  const toggleEdit = () => {
    setEditedMenu((prevState) => ({
      ...prevState,
      isEditable: !prevState.isEditable,
    }));
  };

  // Handle saving the changes (You can implement saving logic here)
  const handleSave = () => {
    console.log("Saving menu items:", editedMenu.menuItems);
    // Add logic for saving the menu items (e.g., API call or state update)
  };

  // Handle canceling the changes
  const handleCancel = () => {
    setEditedMenu({ ...restaurant, isEditable: false });
    console.log("Cancelling changes.");
  };

  // Render a single menu item with editable fields
  const renderMenuItem = ({ item, index }) => (
    <View style={styles.menuItem}>
      <TextInput
        style={styles.inputField}
        value={item.title}
        onChangeText={(text) => handleChange("title", text, index)}  // Update title
        editable={editedMenu.isEditable}
        placeholder="Menu Item Name"
      />
      <TextInput
        style={styles.inputField}
        value={item.price.toString()}
        onChangeText={(text) => handleChange("price", text, index)}  // Update price
        editable={editedMenu.isEditable}
        placeholder="Price"
        keyboardType="numeric"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurant Menu</Text>
      <FlatList
        data={editedMenu.menuItems}  // Display menu items
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleEdit}>
          <Text style={styles.buttonText}>{editedMenu.isEditable ? "Save" : "Edit"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
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
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: COLORS.dark,
  },
  menuItem: {
    marginBottom: 16,
  },
  inputField: {
    fontSize: 16,
    borderColor: COLORS.dark,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 8,
    padding: 12,
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: COLORS.dark,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: COLORS.primary,
    fontSize: 16,
    textAlign: "center",
  },
});

export default RestaurantMenu;
