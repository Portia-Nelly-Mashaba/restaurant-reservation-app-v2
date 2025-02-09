import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme"; // Assuming these constants are defined in your project
import RegistrationTile from "../components/RegistrationTile";
import { useNavigation } from "@react-navigation/native";

// Mock user data
const profiles = [
  {
    user_id: 1001,
    username: "Foodie123",
    email: "foodie123@example.com",
    uid: "UID001",
    address: ["123 Main Street, NY"],
    userType: "Admin",
    profile_img:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    updatedAt: "2025-01-20",
  },
  {
    user_id: 1002,
    username: "SuperAdmin",
    email: "superadmin@example.com",
    uid: "UID002",
    address: ["456 Another St, CA"],
    userType: "SuperAdmin",
    profile_img:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    updatedAt: "2025-01-20",
  },
];

const Profile = () => {
  const navigation = useNavigation();
  const [addressVisible, setAddressVisible] = useState(false);

  // User data (mock for now)
  const user = profiles[0];

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: user.profile_img }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {/* Buttons Section */}
      <View style={styles.optionsContainer}>
        {/* Address Button */}
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => setAddressVisible(true)}
        >
          <MaterialIcons name="location-on" size={24} color={COLORS.primary} />
          <Text style={styles.optionText}>Address</Text>
        </TouchableOpacity>

        {/* Reservations */}
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate("Reservations")}>
          <AntDesign name="calendar" size={24} color={COLORS.primary} />
          <Text style={styles.optionText}>Reservations</Text>
        </TouchableOpacity>

        {/* Favorites */}
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate("Favorites")}>
          <AntDesign name="heart" size={24} color={COLORS.primary}  />
          <Text style={styles.optionText} >Favorites</Text>
        </TouchableOpacity>

        {/* AdminPanel */}
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => {
            if (user.user_id === 1002) {
              navigation.navigate("SuperAdminDashboard");
            } else {
              navigation.navigate("AdminDashboard");
            }
          }}
        >
          <MaterialIcons name="admin-panel-settings" size={24} color={COLORS.primary} />
          <Text style={styles.optionText}>Admin Panel</Text>
        </TouchableOpacity>

        {/* Registration Tile */}
        <TouchableOpacity onPress={() => navigation.navigate("RegisterRestaurant")}>
          <RegistrationTile
            heading={"Register a restaurant"}
            desc={
              "Join our community and showcase your culinary delights to a wider audience."
            }
          />
        </TouchableOpacity>

        {/* Settings */}
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate("EditProfile")}>
          <AntDesign name="setting" size={24} color={COLORS.primary} />
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity style={[styles.optionButton, styles.logoutButton]}>
          <AntDesign name="logout" size={24} color="red" />
          <Text style={[styles.optionText, { color: "red" }]}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Address Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addressVisible}
        onRequestClose={() => setAddressVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>User Address</Text>
            <Text style={styles.modalText}>{user.address[0]}</Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setAddressVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: COLORS.background,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
  },
  email: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  optionsContainer: {
    marginVertical: 20,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    color: COLORS.text,
  },
  logoutButton: {
    borderColor: "red",
    borderWidth: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    alignItems: "center",
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
  },
  closeButtonText: {
    color: COLORS.white,
    fontSize: 16,
  },
});

export default Profile;