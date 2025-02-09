import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import { COLORS } from "../../../constants/theme";

const ReservationByAdmin = ({ route, navigation }) => {
  const { reservation } = route.params;

  const [selectedDate, setSelectedDate] = useState(reservation.date);
  const [selectedTime, setSelectedTime] = useState(reservation.time);
  const [adultGuests, setAdultGuests] = useState(reservation.guests.adult_no);
  const [kidsGuests, setKidsGuests] = useState(reservation.guests.kids_no);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);

  // Date Picker
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowDateModal(false);
  };

  // Time Picker
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setShowTimeModal(false);
  };

  // Mock date and time options
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split("T")[0];
  });

  const times = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: reservation.imageUrl }}
          style={styles.restaurantImage}
        />
        <Text style={styles.restaurantName}>{reservation.title}</Text>
      </View>

      {/* Date Input */}
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setShowDateModal(true)}
      >
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          value={selectedDate}
          editable={false}
          placeholder="Select Date"
        />
      </TouchableOpacity>

      {/* Time Input */}
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setShowTimeModal(true)}
      >
        <Text style={styles.label}>Time</Text>
        <TextInput
          style={styles.input}
          value={selectedTime}
          editable={false}
          placeholder="Select Time"
        />
      </TouchableOpacity>

      {/* Guests Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Number of Adults</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={adultGuests.toString()}
          onChangeText={(value) => setAdultGuests(Number(value))}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Number of Kids</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={kidsGuests.toString()}
          onChangeText={(value) => setKidsGuests(Number(value))}
        />
      </View>

      {/* Date Picker Modal */}
      <Modal visible={showDateModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Date</Text>
            <ScrollView>
              {dates.map((date, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalOption}
                  onPress={() => handleDateSelect(date)}
                >
                  <Text style={styles.modalOptionText}>{date}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowDateModal(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Time Picker Modal */}
      <Modal visible={showTimeModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Time</Text>
            <ScrollView>
              {times.map((time, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalOption}
                  onPress={() => handleTimeSelect(time)}
                >
                  <Text style={styles.modalOptionText}>{time}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowTimeModal(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
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
    alignItems: "center",
    marginBottom: 20,
  },
  restaurantImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: COLORS.dark,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: COLORS.dark,
    marginBottom: 5,
  },
  input: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 8,
    borderColor: COLORS.gray,
    borderWidth: 1,
  },
  saveButton: {
    backgroundColor: COLORS.dark,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  modalOptionText: {
    fontSize: 16,
    color: COLORS.dark,
  },
  modalCloseButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignItems: "center",
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: "bold",
  },
});

export default ReservationByAdmin;