import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { COLORS, SIZES, SHADOWS } from "../../../constants/theme"; // Import theme
import { data } from "../../../constants/data"; // Import data from data.js

const { height, width } = Dimensions.get("window");

const ManageCategories = () => {
  const [categories, setCategories] = useState(data.categories); // Initialize with data from data.js
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryValue, setNewCategoryValue] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null); // Track category being edited
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const [editedCategoryValue, setEditedCategoryValue] = useState("");

  // Add a new category
  const addCategory = () => {
    if (!newCategoryName || !newCategoryValue) {
      Alert.alert("Error", "Please fill in both fields.");
      return;
    }

    const newCategory = {
      _id: categories.length + 1, // Generate a new ID
      name: newCategoryName,
      value: newCategoryValue,
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName("");
    setNewCategoryValue("");
  };

  // Delete a category
  const deleteCategory = (id) => {
    const updatedCategories = categories.filter((category) => category._id !== id);
    setCategories(updatedCategories);
  };

  // Start editing a category
  const startEditing = (id, name, value) => {
    setEditingCategoryId(id);
    setEditedCategoryName(name);
    setEditedCategoryValue(value);
  };

  // Save edited category
  const saveEditedCategory = () => {
    if (!editedCategoryName || !editedCategoryValue) {
      Alert.alert("Error", "Please fill in both fields.");
      return;
    }

    const updatedCategories = categories.map((category) =>
      category._id === editingCategoryId
        ? { ...category, name: editedCategoryName, value: editedCategoryValue }
        : category
    );

    setCategories(updatedCategories);
    setEditingCategoryId(null);
    setEditedCategoryName("");
    setEditedCategoryValue("");
  };

  // Render each category item
  const renderCategoryItem = ({ item }) => (
    <View style={styles.categoryItem}>
      {editingCategoryId === item._id ? (
        // Edit mode
        <View style={styles.editContainer}>
          <TextInput
            style={styles.editInput}
            value={editedCategoryName}
            onChangeText={setEditedCategoryName}
            placeholder="Category Name"
          />
          <TextInput
            style={styles.editInput}
            value={editedCategoryValue}
            onChangeText={setEditedCategoryValue}
            placeholder="Category Value"
          />
          <TouchableOpacity onPress={saveEditedCategory} style={styles.saveButton}>
            <AntDesign name="check" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      ) : (
        // View mode
        <>
          <View style={styles.categoryTextContainer}>
            <Text style={styles.categoryName}>{item.name}</Text>
            <Text style={styles.categoryValue}>{item.value}</Text>
          </View>
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              onPress={() => startEditing(item._id, item.name, item.value)}
              style={styles.editButton}
            >
              <AntDesign name="edit" size={20} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteCategory(item._id)}
              style={styles.deleteButton}
            >
              <MaterialIcons name="delete" size={20} color={COLORS.red} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Categories</Text>

      {/* Input fields for adding a new category */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Category Name"
          value={newCategoryName}
          onChangeText={setNewCategoryName}
        />
        <TextInput
          style={styles.input}
          placeholder="Category Value"
          value={newCategoryValue}
          onChangeText={setNewCategoryValue}
        />
        <TouchableOpacity onPress={addCategory} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Category</Text>
        </TouchableOpacity>
      </View>

      {/* List of categories */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderCategoryItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.medium,
    backgroundColor: COLORS.offwhite,
  },
  title: {
    fontSize: SIZES.xLarge,
    fontWeight: "bold",
    marginBottom: SIZES.medium,
    textAlign: "center",
    color: COLORS.dark,
  },
  inputContainer: {
    marginBottom: SIZES.large,
  },
  input: {
    backgroundColor: COLORS.white,
    padding: SIZES.small,
    borderRadius: SIZES.xSmall,
    borderColor: COLORS.gray,
    borderWidth: 1,
    marginBottom: SIZES.small,
  },
  addButton: {
    backgroundColor: COLORS.dark,
    padding: SIZES.medium,
    borderRadius: SIZES.xSmall,
    alignItems: "center",
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
  listContainer: {
    paddingBottom: SIZES.large,
  },
  categoryItem: {
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    borderRadius: SIZES.xSmall,
    borderColor: COLORS.gray,
    borderWidth: 1,
    marginBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...SHADOWS.small,
  },
  categoryTextContainer: {
    flex: 1,
  },
  categoryName: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
    color: COLORS.dark,
  },
  categoryValue: {
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  actionsContainer: {
    flexDirection: "row",
    gap: SIZES.small,
  },
  editButton: {
    padding: SIZES.xSmall,
  },
  deleteButton: {
    padding: SIZES.xSmall,
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.small,
    flex: 1,
  },
  editInput: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    padding: SIZES.xSmall,
    borderRadius: SIZES.xSmall,
    borderColor: COLORS.gray,
    borderWidth: 1,
  },
  saveButton: {
    backgroundColor: COLORS.green,
    padding: SIZES.xSmall,
    borderRadius: SIZES.xSmall,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ManageCategories;