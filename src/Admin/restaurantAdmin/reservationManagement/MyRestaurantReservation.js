import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../../constants/theme";
import { useNavigation } from "@react-navigation/native";

const MyRestaurantReservation = ({ loggedInAdmin }) => {
  const [activeTab, setActiveTab] = useState("Reservations");
  const navigation = useNavigation();
  const adminRestaurantId = loggedInAdmin.restaurant_id; // Get admin's restaurant ID

  // Static data for reservations
  const data = {
    reservations: [
      {
        reservation_id: 1,
        restaurant_id: 1,
        title: "Table for 2",
        status: "Upcoming",
        imageUrl: "https://example.com/restaurant1.jpg",
      },
      {
        reservation_id: 2,
        restaurant_id: 1,
        title: "Table for 4",
        status: "Cancelled",
        imageUrl: "https://example.com/restaurant2.jpg",
      },
      {
        reservation_id: 3,
        restaurant_id: 2,
        title: "Table for 6",
        status: "Completed",
        imageUrl: "https://example.com/restaurant3.jpg",
      },
    ],
  };

  // Filter reservations based on restaurant ID
  const filteredReservations = data.reservations.filter(
    (reservation) => reservation.restaurant_id === adminRestaurantId
  );

  // Categorize reservations by status
  const upcomingReservations = filteredReservations.filter(
    (reservation) => reservation.status === "Upcoming"
  );
  const cancelledReservations = filteredReservations.filter(
    (reservation) => reservation.status === "Cancelled"
  );
  const completedReservations = filteredReservations.filter(
    (reservation) => reservation.status === "Completed"
  );

  // Get data for the active tab
  const getActiveData = () => {
    switch (activeTab) {
      case "Reservations":
        return upcomingReservations;
      case "Cancelled":
        return cancelledReservations;
      case "History":
        return completedReservations;
      default:
        return [];
    }
  };

  // Handle reservation click
  const handleReservationClick = (reservation) => {
    navigation.navigate("ReservationByAdmin", { reservation });
  };

  // Render each reservation item
  const renderReservationItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleReservationClick(item)}>
      <View style={styles.card}>
        <View style={styles.row}>
          <Image source={{ uri: item.imageUrl }} style={styles.restaurantImage} />
          <View style={styles.details}>
            <View style={styles.header}>
              <Text style={styles.restaurantName}>{item.title}</Text>
              {activeTab !== "History" && (
                <View style={styles.icons}>
                  <TouchableOpacity>
                    <AntDesign name="edit" size={18} color="blue" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <MaterialIcons name="cancel" size={18} color="red" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  



  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Reservations" && styles.activeTab]}
          onPress={() => setActiveTab("Reservations")}
        >
          <Text style={[styles.tabText, activeTab === "Reservations" && styles.activeTabText]}>Reservations</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Cancelled" && styles.activeTab]}
          onPress={() => setActiveTab("Cancelled")}
        >
          <Text style={[styles.tabText, activeTab === "Cancelled" && styles.activeTabText]}>Cancelled</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "History" && styles.activeTab]}
          onPress={() => setActiveTab("History")}
        >
          <Text style={[styles.tabText, activeTab === "History" && styles.activeTabText]}>History</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={getActiveData()}
        keyExtractor={(item) => item.reservation_id.toString()}
        renderItem={renderReservationItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderBottomWidth: 0.1,
    borderColor: COLORS.lightWhite,
  },
  tab: {
    padding: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: COLORS.primary,
  },
  tabText: {
    color: COLORS.gray,
    fontSize: 16,
  },
  activeTabText: {
    color: COLORS.primary,
  },
  listContainer: {
    paddingHorizontal: 16,
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
  },
  restaurantName: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.black,
  },
  icons: {
    flexDirection: "row",
    gap: 10,
  },
});

export default MyRestaurantReservation;
