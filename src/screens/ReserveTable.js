import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { COLORS } from "../constants/theme";
import { data } from "../constants/data"; // Access reservations data

const ReserveTable = ({ route, navigation }) => {
  const { restaurant } = route.params;
  // Reservation state
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [adultGuests, setAdultGuests] = useState(0);
  const [kidsGuests, setKidsGuests] = useState(0);
  const handleReserve = () => {
    if (!date || !time || adultGuests <= 0) {
      Alert.alert("Error", "Please fill out all fields and add at least one adult.");
      return;
    }
    // Mock table_id for reservation
    const tableId = Math.floor(Math.random() * 100) + 1;
    // Add new reservation
    const newReservation = {
      reservation_id: data.reservations.length + 1,
      restaurant_id: restaurant.id,
      date,
      time,
      guests: { adult_no: adultGuests, kids_no: kidsGuests },
      table_id: tableId,
      table_no: `T${tableId}`,
    };
    // Save reservation (mock implementation)
    data.reservations.push(newReservation);
    Alert.alert(
      "Success",
      `Reservation made successfully at ${restaurant.title}!`,
      [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reserve a Table at {restaurant.title}</Text>
      {/* Date */}
      <Text style={styles.label}>Date (YYYY-MM-DD):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter date"
        value={date}
        onChangeText={setDate}
      />
      {/* Time */}
      <Text style={styles.label}>Time (e.g., Lunch/Dinner):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter time"
        value={time}
        onChangeText={setTime}
      />
      {/* Adults */}
      <Text style={styles.label}>Number of Adults:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter number of adults"
        keyboardType="numeric"
        value={adultGuests.toString()}
        onChangeText={(value) => setAdultGuests(Number(value))}
      />
      {/* Kids */}
      <Text style={styles.label}>Number of Kids:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter number of kids"
        keyboardType="numeric"
        value={kidsGuests.toString()}
        onChangeText={(value) => setKidsGuests(Number(value))}
      />
      {/* Reserve Button */}
      <TouchableOpacity style={styles.reserveButton} onPress={handleReserve}>
        <Text style={styles.reserveButtonText}>Confirm Reservation</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ReserveTable;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.lightGray,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: COLORS.dark,
  },
  label: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
    color: COLORS.dark,
  },
  input: {
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 8,
    borderColor: COLORS.gray,
    borderWidth: 1,
  },
  reserveButton: {
    marginTop: 24,
    backgroundColor: COLORS.dark,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  reserveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});