import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../../constants/theme";
import { useNavigation } from "@react-navigation/native";

// Dummy data for admin restaurant reservations
const reservationsData = [
  {
    id: 1,
    customer_name: "John Doe",
    profile_img: "https://via.placeholder.com/150",
    title: "The Gourmet Kitchen",
    imageUrl: "https://via.placeholder.com/150",
    date: "2025-02-14",
    time: "19:00",
    table_no: "Table 5",
    guests: { adult_no: 2, kids_no: 1 },
    status: "Upcoming",
    ratings: 4.5,
    ratingsCount: 120,
  },
  {
    id: 2,
    customer_name: "Jane Smith",
    profile_img: "https://via.placeholder.com/150",
    title: "Ocean View Bistro",
    imageUrl: "https://via.placeholder.com/150",
    date: "2025-02-10",
    time: "20:00",
    table_no: "Table 3",
    guests: { adult_no: 4, kids_no: 0 },
    status: "Cancelled",
    ratings: 4.2,
    ratingsCount: 95,
  },
  {
    id: 3,
    customer_name: "Alice Johnson",
    profile_img: "https://via.placeholder.com/150",
    title: "Urban Grill House",
    imageUrl: "https://via.placeholder.com/150",
    date: "2025-02-05",
    time: "18:30",
    table_no: "Table 2",
    guests: { adult_no: 3, kids_no: 2 },
    status: "Completed",
    ratings: 4.7,
    ratingsCount: 150,
  },
];

const RestaurantReservation = () => {
  const [activeTab, setActiveTab] = useState("Reservations");
  const navigation = useNavigation();

  // Filter reservations based on status
  const upcomingReservations = reservationsData.filter(
    (reservation) => reservation.status === "Upcoming"
  );
  const cancelledReservations = reservationsData.filter(
    (reservation) => reservation.status === "Cancelled"
  );
  const completedReservations = reservationsData.filter(
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

  // Handle user click to view reservation details
  const handleReservationClick = (reservation) => {
    navigation.navigate("CustomerReservationDetails", { reservation });
  };

  // Render each reservation item
  const renderReservationItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleReservationClick(item)}>
      <View style={styles.card}>
        <View style={styles.row}>
          <Image source={{ uri: item.profile_img }} style={styles.profileImage} />
          <View style={styles.details}>
            <View style={styles.header}>
              <Text style={styles.customerName}>{item.customer_name}</Text>
              {activeTab !== "History" && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={[styles.button, styles.greenBorder]}>
                    <AntDesign name="check" size={18} color="green" />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, styles.redBorder]}>
                    <MaterialIcons name="cancel" size={18} color="red" />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, styles.blueBorder]}>
                    <AntDesign name="edit" size={18} color="blue" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View style={styles.row}>
              <AntDesign name="star" size={16} color={COLORS.secondary} />
              <Text style={styles.rating}>{item.ratings}</Text>
              <Text style={styles.ratingCount}>({item.ratingsCount})</Text>
            </View>
          </View>
        </View>
        <View style={styles.infoRow}>
          <AntDesign name="calendar" size={16} color={COLORS.secondary} />
          <Text style={styles.infoText}>{item.date}</Text>
          <MaterialIcons name="access-time" size={16} color={COLORS.secondary} />
          <Text style={styles.infoText}>{item.time}</Text>
          <MaterialIcons name="event-seat" size={16} color={COLORS.secondary} />
          <Text style={styles.infoText}>{item.table_no}</Text>
          <MaterialIcons name="people" size={16} color={COLORS.secondary} />
          <Text style={styles.infoText}>
            {item.guests.adult_no + item.guests.kids_no} Guests
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <Text
            style={[
              styles.statusText,
              item.status === "Upcoming" && styles.upcomingStatus,
              item.status === "Cancelled" && styles.cancelledStatus,
              item.status === "Completed" && styles.completedStatus,
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TextInput style={styles.searchBar} placeholder="Search" />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddReservation")}>
        <Text style={styles.addButtonText}>Add Reservation</Text>
      </TouchableOpacity>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Reservations" && styles.activeTab]}
          onPress={() => setActiveTab("Reservations")}
        >
          <Text
            style={[styles.tabText, activeTab === "Reservations" && styles.activeTabText]}
          >
            Reservations
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Cancelled" && styles.activeTab]}
          onPress={() => setActiveTab("Cancelled")}
        >
          <Text
            style={[styles.tabText, activeTab === "Cancelled" && styles.activeTabText]}
          >
            Cancelled
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "History" && styles.activeTab]}
          onPress={() => setActiveTab("History")}
        >
          <Text
            style={[styles.tabText, activeTab === "History" && styles.activeTabText]}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={getActiveData()}
        keyExtractor={(item) => item.id.toString()}
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
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  searchBar: {
    width: "100%",
    height: 40,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
  },
  addButton: {
    marginTop: 10,
    marginLeft: 16,
    backgroundColor: COLORS.dark,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 16,
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
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
  customerName: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.black,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
  },
  greenBorder: {
    borderColor: "green",
  },
  redBorder: {
    borderColor: "red",
  },
  blueBorder: {
    borderColor: "blue",
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
  statusContainer: {
    marginTop: 10,
    alignItems: "flex-end",
  },
  statusText: {
    fontSize: 14,
  },
  upcomingStatus: {
    color: COLORS.secondary,
  },
  cancelledStatus: {
    color: "red",
  },
  completedStatus: {
    color: "green",
  },
});

export default RestaurantReservation;