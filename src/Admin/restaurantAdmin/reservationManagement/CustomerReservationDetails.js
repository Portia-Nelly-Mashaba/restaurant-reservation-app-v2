import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { COLORS } from "../../../constants/theme";
import { useNavigation, useRoute } from "@react-navigation/native";

const CustomerReservationDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { reservation } = route.params;

  const [restaurant, setRestaurant] = useState(reservation.title);
  const [time, setTime] = useState(reservation.time);
  const [tableNo, setTableNo] = useState(reservation.table_no);
  const [guests, setGuests] = useState(
    (reservation.guests.adult_no + reservation.guests.kids_no).toString()
  );

  const handleSave = () => {
    // Save logic (e.g., API call)
    alert("Reservation details saved!");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Reservation Details</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Image source={{ uri: reservation.profile_img }} style={styles.profileImage} />
          <Text style={styles.customerName}>{reservation.customer_name}</Text>
        </View>

        <View style={styles.details}>
          <Text style={styles.label}>Restaurant:</Text>
          <TextInput
            style={styles.input}
            value={restaurant}
            onChangeText={setRestaurant}
          />

          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{reservation.date}</Text> {/* Read-only */}

          <Text style={styles.label}>Time:</Text>
          <TextInput
            style={styles.input}
            value={time}
            onChangeText={setTime}
          />

          <Text style={styles.label}>Table No:</Text>
          <TextInput
            style={styles.input}
            value={tableNo}
            onChangeText={setTableNo}
          />

          <Text style={styles.label}>Guests:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={guests}
            onChangeText={setGuests}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.dark,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  customerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
  },
  details: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: COLORS.dark,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomerReservationDetails;
