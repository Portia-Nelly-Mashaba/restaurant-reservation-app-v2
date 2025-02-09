import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import { COLORS } from "../../../constants/theme";

const AddReservation = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [adultGuests, setAdultGuests] = useState(0);
  const [kidsGuests, setKidsGuests] = useState(0);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowDateModal(false);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setShowTimeModal(false);
  };

  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split("T")[0];
  });

  const times = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
    "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Reservation</Text>
      
      <TouchableOpacity style={styles.inputContainer} onPress={() => setShowDateModal(true)}>
        <Text style={styles.label}>Date</Text>
        <TextInput style={styles.input} value={selectedDate} editable={false} placeholder="Select Date" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.inputContainer} onPress={() => setShowTimeModal(true)}>
        <Text style={styles.label}>Time</Text>
        <TextInput style={styles.input} value={selectedTime} editable={false} placeholder="Select Time" />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Number of Adults</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={adultGuests.toString()} onChangeText={(value) => setAdultGuests(Number(value))} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Number of Kids</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={kidsGuests.toString()} onChangeText={(value) => setKidsGuests(Number(value))} />
      </View>

      <Modal visible={showDateModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Date</Text>
            <ScrollView>
              {dates.map((date, index) => (
                <TouchableOpacity key={index} style={styles.modalOption} onPress={() => handleDateSelect(date)}>
                  <Text style={styles.modalOptionText}>{date}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setShowDateModal(false)}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showTimeModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Time</Text>
            <ScrollView>
              {times.map((time, index) => (
                <TouchableOpacity key={index} style={styles.modalOption} onPress={() => handleTimeSelect(time)}>
                  <Text style={styles.modalOptionText}>{time}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setShowTimeModal(false)}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Reservation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGray, padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: COLORS.dark },
  inputContainer: { marginBottom: 15 },
  label: { fontSize: 14, color: COLORS.dark, marginBottom: 5 },
  input: { backgroundColor: COLORS.white, padding: 10, borderRadius: 8, borderColor: COLORS.gray, borderWidth: 1 },
  addButton: { backgroundColor: COLORS.dark, padding: 15, borderRadius: 8, alignItems: "center", marginTop: 20 },
  addButtonText: { fontSize: 16, color: COLORS.white, fontWeight: "bold" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
  modalContent: { width: "80%", backgroundColor: COLORS.white, borderRadius: 10, padding: 20, maxHeight: "70%" },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  modalOption: { padding: 10, borderBottomWidth: 1, borderBottomColor: COLORS.lightGray },
  modalOptionText: { fontSize: 16, color: COLORS.dark },
  modalCloseButton: { marginTop: 10, padding: 10, backgroundColor: COLORS.primary, borderRadius: 8, alignItems: "center" },
  modalCloseButtonText: { fontSize: 16, color: COLORS.white, fontWeight: "bold" },
});

export default AddReservation;
