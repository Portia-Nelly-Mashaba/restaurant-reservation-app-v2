import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES, SHADOWS } from "../../../constants/theme"; // Importing styles

const TableDetails = ({ route }) => {
  const { table } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{table.name}</Text>
      <Text style={styles.details}>Active Bookings: {table.activeBookings}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.offwhite,
    padding: SIZES.large,
  },
  title: {
    fontSize: SIZES.xLarge,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  details: {
    fontSize: SIZES.large,
    marginTop: SIZES.small,
    color: COLORS.dark,
  },
});

export default TableDetails;
