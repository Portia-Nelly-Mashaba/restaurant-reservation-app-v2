import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Import for navigation
import { data } from "../../../constants/data";
import { COLORS } from "../../../constants/theme";

const StatusControl = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data.restaurants);
  const navigation = useNavigation(); // Hook to get navigation object

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = data.restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleApprove = (restaurantId) => {
    // Handle approve logic here
    console.log("Approved restaurant with ID:", restaurantId);
  };

  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("RestaurantListViewDetail", { restaurantId: item.id })}
    >
      <View style={styles.row}>
        <Image source={{ uri: item.imageUrl }} style={styles.restaurantImage} />
        <View style={styles.details}>
          <View style={styles.header}>
            <Text style={styles.restaurantName}>{item.title}</Text>
            <View style={styles.icons}>
              <TouchableOpacity
                style={styles.approveButton}
                onPress={() => handleApprove(item.id)}
              >
                <Text style={styles.approveButtonText}>Approve</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.row}>
            <MaterialIcons name="star" size={16} color={COLORS.secondary} />
            <Text style={styles.rating}>{item.ratings}</Text>
            <Text style={styles.ratingCount}>({item.ratingsCount})</Text>
          </View>
        </View>
      </View>
      <View style={styles.infoRow}>
        <MaterialIcons name="restaurant" size={16} color={COLORS.secondary} />
        <Text style={styles.infoText}>{item.cuisine}</Text>
        <MaterialIcons name="schedule" size={16} color={COLORS.secondary} />
        <Text style={styles.infoText}>{item.openingHours}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search restaurants..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRestaurantItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  listContainer: {
    paddingTop: 10,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  restaurantImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  restaurantName: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.black,
  },
  rating: {
    fontSize: 14,
    color: COLORS.black,
    marginLeft: 5,
  },
  ratingCount: {
    fontSize: 12,
    color: COLORS.gray,
    marginLeft: 2,
  },
  icons: {
    flexDirection: "row",
    gap: 10,
  },
  approveButton: {
    backgroundColor: "#FFD700", // Lighter yellow color
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  approveButtonText: {
    color: COLORS.secondary, // Use COLORS.secondary for text
    fontSize: 14,
    fontWeight: "bold",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 5,
    marginRight: 15,
    color: COLORS.black,
  },
});

export default StatusControl;