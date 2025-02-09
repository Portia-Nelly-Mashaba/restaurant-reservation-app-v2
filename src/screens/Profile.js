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
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";
import RegistrationTile from "../components/RegistrationTile";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const navigation = useNavigation();
  const [addressVisible, setAddressVisible] = useState(false);
  const [user, setUser] = useState(null); // State to hold the logged-in user data

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("loggedInUser");
        if (userData) {
          setUser(JSON.parse(userData)); // Parse and set user data
        }
      } catch (error) {
        console.error("Error retrieving user data from AsyncStorage", error);
      }
    };
    getUserData();
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.username}>Loading...</Text> {/* or show a loading spinner */}
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: user.profile_img }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>{user.name} {user.surname}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.email}>{user.phone}</Text>
      </View>

      {/* Buttons Section */}
      <View style={styles.optionsContainer}>
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
          <AntDesign name="heart" size={24} color={COLORS.primary} />
          <Text style={styles.optionText}>Favorites</Text>
        </TouchableOpacity>

        {/* AdminPanel */}
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => {
            if (user.user_id === '67a2114906cd0f19b5f6a825') {
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
            <Text style={styles.modalText}>{user.address}, {user.city}</Text>
            <Text style={styles.modalText}>{user.country}</Text>
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
