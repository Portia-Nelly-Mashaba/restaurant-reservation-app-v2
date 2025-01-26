import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/theme";

const ReservationSummary = ({ route, navigation }) => {
  const { reservationData, restaurant } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reservation Summary</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Restaurant Name:</Text>
        <Text style={styles.value}>{restaurant.title}</Text>

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{restaurant.coords.address}</Text>

        <Text style={styles.label}>Reservation Date:</Text>
        <Text style={styles.value}>{reservationData.date}</Text>

        <Text style={styles.label}>Reservation Time:</Text>
        <Text style={styles.value}>{reservationData.time}</Text>

        <Text style={styles.label}>Number of Guests:</Text>
        <Text style={styles.value}>
          {reservationData.guests.adult_no} Adults, {reservationData.guests.kids_no} Kids
        </Text>

        <Text style={styles.label}>Total Amount:</Text>
        <Text style={styles.value}>R {reservationData.totalAmount.toFixed(2)}</Text>
      </View>

      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => Alert.alert("Checkout", "Proceed to payment.")}
      >
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReservationSummary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: COLORS.dark,
  },
  detailsContainer: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    color: COLORS.dark,
  },
  value: {
    fontSize: 16,
    marginTop: 4,
    color: COLORS.gray,
  },
  checkoutButton: {
    backgroundColor: COLORS.dark,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    margin: 16,
  },
  checkoutButtonText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: "bold",
  },
});
