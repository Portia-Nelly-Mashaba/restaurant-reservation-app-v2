import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../constants/theme"; // Replace with your theme file
import { data } from "../constants/data"; // Replace with your dataset
import { useNavigation } from "@react-navigation/native";

const Favorites = () => {
  const [favorites, setFavorites] = useState(
    data.restaurants.filter((restaurant) => restaurant.isFavorite) // Filter favorite restaurants
  );

  const navigation = useNavigation();

  // Helper function to get category name by ID
  const getCategoryName = (categoryId) => {
    const category = data.categories.find((cat) => cat._id === categoryId);
    return category ? category.name : "Unknown";
  };

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.restaurantName}>{item.title}</Text>
        <Text style={styles.cuisine}>{getCategoryName(item.category_id)}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Restaurant-Details", { item })}
        >
          <Text style={styles.buttonText}>Reserve Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noFavorites}>No favorites added yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  infoContainer: {
    flex: 1,
    padding: 12,
  },
  restaurantName: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.black,
  },
  cuisine: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
  },
  button: {
    marginTop: 8,
    backgroundColor: COLORS.dark,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    color: COLORS.lightWhite,
    fontWeight: "bold",
  },
  noFavorites: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: 32,
  },
});

export default Favorites;
