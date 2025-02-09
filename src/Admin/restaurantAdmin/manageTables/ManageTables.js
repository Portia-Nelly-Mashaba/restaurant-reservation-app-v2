import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { COLORS, SIZES, SHADOWS } from "../../../constants/theme"; // Importing styles

const ManageTables = () => {
  const navigation = useNavigation();
  const [tables, setTables] = useState([
    { id: "1", name: "Table 1", activeBookings: 2 },
    { id: "2", name: "Table 2", activeBookings: 1 },
  ]);
  const [tableNumber, setTableNumber] = useState("");
  const [numberOfSeats, setNumberOfSeats] = useState("");

  const addTable = () => {
    if (!tableNumber || !numberOfSeats) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    const newTable = {
      id: Date.now().toString(),
      name: `Table ${tableNumber}`,
      seats: numberOfSeats,
      activeBookings: 0,
    };
    setTables([...tables, newTable]);
    setTableNumber("");
    setNumberOfSeats("");
  };

  const deleteTable = (id) => {
    setTables(tables.filter((table) => table.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Header Title */}
      <Text style={styles.headerTitle}>Tables</Text>

      {/* Form to Add New Table */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Table Number"
          value={tableNumber}
          onChangeText={setTableNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Number of Seats"
          value={numberOfSeats}
          onChangeText={setNumberOfSeats}
          keyboardType="numeric"
        />
      </View>

      {/* Add Table Button */}
      <TouchableOpacity style={styles.addButton} onPress={addTable}>
        <Text style={styles.addButtonText}>Add Table</Text>
      </TouchableOpacity>

      {/* Tables List */}
      <FlatList
        data={tables}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tableItem}
            onPress={() => navigation.navigate("Table Details", { table: item })}
          >
            <Text style={styles.tableName}>{item.name}</Text>
            <Text style={styles.bookingText}>{item.activeBookings} Active Bookings</Text>
            <Text style={styles.bookingText}>{item.seats} Seats</Text>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={() => Alert.alert("Edit Table", "Edit feature coming soon!")}>
                <Feather name="edit" size={20} color={COLORS.primary} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTable(item.id)}>
                <Feather name="trash" size={20} color={COLORS.red} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: COLORS.offwhite },
  headerTitle: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 16,
    marginTop: 10,
  },
  formContainer: { marginBottom: 16 },
  input: {
    width: "100%",
    height: 40,
    borderColor: COLORS.gray2,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: COLORS.white,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.dark,
    marginBottom: 10, // Adjusted marginTop
    alignSelf: "flex-start",
  },
  addButtonText: { color: COLORS.dark, fontWeight: "bold", fontSize: SIZES.medium },
  tableItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SIZES.medium,
    marginBottom: SIZES.xSmall,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    ...SHADOWS.medium,
  },
  tableName: { fontSize: SIZES.large, fontWeight: "bold", color: COLORS.black },
  bookingText: { fontSize: SIZES.medium, color: COLORS.gray },
  actionButtons: { flexDirection: "row" },
  icon: { marginHorizontal: 10 },
});

export default ManageTables;