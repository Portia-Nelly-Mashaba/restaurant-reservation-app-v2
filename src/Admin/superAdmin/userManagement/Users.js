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
import { COLORS } from "../../../constants/theme"; // Replace with your theme file

// Example user data
const profiles = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    userType: "Client",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    userType: "Admin",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    userType: "SuperAdmin",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bob@example.com",
    userType: "Client",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    name: "Charlie Davis",
    email: "charlie@example.com",
    userType: "Admin",
    imageUrl: "https://via.placeholder.com/150",
  },
];

const Users = () => {
  const [activeTab, setActiveTab] = useState("Customers");

  // Filter users based on userType
  const customers = profiles.filter((user) => user.userType === "Client");
  const restaurantOwners = profiles.filter((user) => user.userType === "Admin");
  const superAdmins = profiles.filter((user) => user.userType === "SuperAdmin");

  // Get data for the active tab
  const getActiveData = () => {
    switch (activeTab) {
      case "Customers":
        return customers;
      case "Restaurant Owners":
        return restaurantOwners;
      case "Super Admins":
        return superAdmins;
      default:
        return [];
    }
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image source={{ uri: item.imageUrl }} style={styles.userImage} />
        <View style={styles.details}>
          <View style={styles.header}>
            <Text style={styles.userName}>{item.name}</Text>
            <View style={styles.icons}>
              <TouchableOpacity>
                <AntDesign name="edit" size={18} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons name="cancel" size={18} color="red" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.userEmail}>{item.email}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Customers" && styles.activeTab]}
          onPress={() => setActiveTab("Customers")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Customers" && styles.activeTabText,
            ]}
          >
            Customers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "Restaurant Owners" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("Restaurant Owners")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Restaurant Owners" && styles.activeTabText,
            ]}
          >
            Restaurant Owners
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Super Admins" && styles.activeTab]}
          onPress={() => setActiveTab("Super Admins")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Super Admins" && styles.activeTabText,
            ]}
          >
            Super Admins
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={getActiveData()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUserItem}
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
  userImage: {
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
  userName: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.black,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 5,
  },
  icons: {
    flexDirection: "row",
    gap: 10,
  },
});

export default Users;