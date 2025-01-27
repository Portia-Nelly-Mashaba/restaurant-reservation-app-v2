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
import { COLORS } from "../constants/theme"; // Replace with your theme file
import { data } from "../constants/data"

const Reservations = () => {
  const [activeTab, setActiveTab] = useState("Reservations");
  

  const reservationsData = data.reservations.map((reservation) => {
    const restaurant = data.restaurants.find(
      (rest) => rest.id === reservation.restaurant_id
    );
    return { ...reservation, ...restaurant };
  });

  const renderReservationItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image source={{ uri: item.imageUrl }} style={styles.restaurantImage} />
        <View style={styles.details}>
          <View style={styles.header}>
            <Text style={styles.restaurantName}>{item.title}</Text>
            <View style={styles.icons}>
              <TouchableOpacity>
                <AntDesign name="edit" size={18} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons name="cancel" size={18} color="red" />
              </TouchableOpacity>
            </View>
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
        <MaterialIcons name="event-seat" size={16} color={COLORS.secondary} />
        <Text style={styles.infoText}>{item.table_no}</Text>
        <MaterialIcons name="people" size={16} color={COLORS.secondary} />
        <Text style={styles.infoText}>
          {item.guests.adult_no + item.guests.kids_no} Guests
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "Reservations" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("Reservations")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Reservations" && styles.activeTabText,
            ]}
          >
            Reservations
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "History" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("History")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "History" && styles.activeTabText,
            ]}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={reservationsData}
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

export default Reservations;
