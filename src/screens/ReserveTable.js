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

const ReserveTable = ({ route, navigation }) => {
  const { restaurant } = route.params;

  const [activeTab, setActiveTab] = useState("Date");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [adultGuests, setAdultGuests] = useState(0);
  const [kidsGuests, setKidsGuests] = useState(0);
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleNext = () => {
    if (!selectedDate || !selectedTime || adultGuests <= 0) {
      Alert.alert("Error", "Please complete the reservation details.");
      return;
    }

    const totalGuests = adultGuests + kidsGuests;
    const totalAmount = restaurant.average_price * totalGuests;

    const reservationData = {
      reservation_id: Math.random().toString(36).substring(2, 10),
      restaurant_id: restaurant.id,
      date: selectedDate,
      time: selectedTime,
      guests: { adult_no: adultGuests, kids_no: kidsGuests },
      additionalInfo,
      totalAmount,
    };

    navigation.navigate("reservation-summary", {
      reservationData,
      restaurant,
    });
  };
  const renderDatePicker = () => (
    <View style={styles.dateContainer}>
      <Text style={styles.sectionHeading}>Select a Date</Text>
      {/* Mock Calendar Implementation */}
      <View style={styles.calendar}>
        {Array.from({ length: 7 }, (_, index) => {
          const day = `2025-01-${23 + index}`;
          const isActive = selectedDate === day;
          const isBooked = index === 3; // Example: The 4th date is booked
          return (
            <TouchableOpacity
              key={day}
              onPress={() => !isBooked && setSelectedDate(day)}
              style={[
                styles.dateBox,
                isActive && styles.activeDateBox,
                isBooked && styles.bookedDateBox,
              ]}
            >
              <View
                style={[
                  styles.dateDot,
                  isActive
                    ? { backgroundColor: COLORS.black }
                    : isBooked
                    ? { backgroundColor: COLORS.gray }
                    : { backgroundColor: COLORS.secondary },
                ]}
              />
              <Text style={styles.dateText}>{day}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
  const renderTimePicker = () => (
    <View style={styles.timeContainer}>
      <Text style={styles.sectionHeading}>Select a Time</Text>
      {["Breakfast", "Lunch", "Dinner"].map((meal, index) => {
        const times =
          meal === "Breakfast"
            ? ["09:00", "09:30", "10:00", "10:30", "11:00"]
            : meal === "Lunch"
            ? ["12:30", "13:00", "13:30", "14:00", "14:30"]
            : ["17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "21:00"];
        return (
          <View key={index}>
            <Text style={styles.timeHeading}>{meal}</Text>
            <View style={styles.timeButtonsContainer}>
              {times.map((time) => (
                <TouchableOpacity
                  key={time}
                  onPress={() => setSelectedTime(time)}
                  style={[
                    styles.timeButton,
                    selectedTime === time && styles.activeTimeButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.timeButtonText,
                      selectedTime === time && styles.activeTimeButtonText,
                    ]}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
  const renderGuestForm = () => (
    <View style={styles.guestContainer}>
      <Text style={styles.sectionHeading}>Guest Details</Text>
      <Text style={styles.label}>Number of Adults:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter number of adults"
        value={adultGuests.toString()}
        onChangeText={(value) => setAdultGuests(Number(value))}
      />
      <Text style={styles.label}>Number of Kids:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter number of kids"
        value={kidsGuests.toString()}
        onChangeText={(value) => setKidsGuests(Number(value))}
      />
      <Text style={styles.label}>Additional Information:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter any additional info"
        value={additionalInfo}
        onChangeText={setAdditionalInfo}
      />
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {["Date", "Time", "Guest"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton,
            ]}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === tab && styles.activeTabButtonText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.contentContainer}>
        {activeTab === "Date" && renderDatePicker()}
        {activeTab === "Time" && renderTimePicker()}
        {activeTab === "Guest" && renderGuestForm()}
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ReserveTable;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: COLORS.white,
    paddingVertical: 10,
  },
  tabButton: {
    paddingVertical: 10,
  },
  activeTabButton: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.primary,
  },
  tabButtonText: {
    fontSize: 16,
    color: COLORS.gray,
  },
  activeTabButtonText: {
    color: COLORS.primary,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.dark,
  },
  dateContainer: {
    marginTop: 10,
  },
  calendar: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dateBox: {
    width: "30%",
    padding: 10,
    alignItems: "center",
    margin: "1.5%",
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  activeDateBox: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  bookedDateBox: {
    backgroundColor: COLORS.gray,
  },
  dateDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    color: COLORS.dark,
  },
  timeContainer: {
    marginTop: 10,
  },
  timeHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    color: COLORS.dark,
  },
  timeButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  timeButton: {
    padding: 10,
    margin: 5,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  activeTimeButton: {
    backgroundColor: COLORS.primary,
  },
  timeButtonText: {
    fontSize: 14,
    color: COLORS.dark,
  },
  activeTimeButtonText: {
    color: COLORS.white,
  },
  guestContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    marginTop: 10,
    color: COLORS.dark,
  },
  input: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    borderColor: COLORS.gray,
    borderWidth: 1,
  },
  nextButton: {
    backgroundColor: COLORS.dark,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    margin: 16,
  },
  nextButtonText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: "bold",
  },
});





