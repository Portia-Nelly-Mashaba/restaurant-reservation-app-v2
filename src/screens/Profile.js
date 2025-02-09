import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";
import RegistrationTile from "../components/RegistrationTile";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation();
  const [addressVisible, setAddressVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          Alert.alert("Session Expired", "Please log in again.");
          navigation.navigate("Login");
          return;
        }

        const response = await axios.get(
          "http://10.0.2.2:8080/api/user/profile", // Ensure correct local IP for emulator
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(response.data.user);
      } catch (error) {
        Alert.alert("Error", error.response?.data?.message || "Failed to fetch profile");
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("authToken");
    Alert.alert("Logged Out", "You have been logged out.");
    navigation.navigate("Login");
  };

  if (!user) {
    return (
      <View style={styles.centeredView}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: user.profile_img?.url || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>{user.name} {user.surname}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {/* Buttons Section */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton} onPress={() => setAddressVisible(true)}>
          <MaterialIcons name="location-on" size={24} color={COLORS.primary} />
          <Text style={styles.optionText}>Address</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate("Reservations")}>
          <AntDesign name="calendar" size={24} color={COLORS.primary} />
          <Text style={styles.optionText}>Reservations</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate("Favorites")}>
          <AntDesign name="heart" size={24} color={COLORS.primary} />
          <Text style={styles.optionText}>Favorites</Text>
        </TouchableOpacity>

        {/* Admin Panel */}
        {user.usertype && (
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() =>
              navigation.navigate(user.usertype.toLowerCase() === "superadmin" ? "SuperAdminDashboard" : "AdminDashboard")
            }
          >
            <MaterialIcons name="admin-panel-settings" size={24} color={COLORS.primary} />
            <Text style={styles.optionText}>Admin Panel</Text>
          </TouchableOpacity>
        )}

        {/* Registration Tile */}
        <TouchableOpacity onPress={() => navigation.navigate("RegisterRestaurant")}>
          <RegistrationTile heading="Register a restaurant" desc="Join our community and showcase your culinary delights." />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate("EditProfile")}>
          <AntDesign name="setting" size={24} color={COLORS.primary} />
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.optionButton, styles.logoutButton]} onPress={handleLogout}>
          <AntDesign name="logout" size={24} color="red" />
          <Text style={[styles.optionText, { color: "red" }]}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Address Modal */}
      <Modal animationType="slide" transparent visible={addressVisible} onRequestClose={() => setAddressVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>User Address</Text>
            <Text style={styles.modalText}>{user.address || "No address provided"}</Text>
            <Pressable style={styles.closeButton} onPress={() => setAddressVisible(false)}>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
