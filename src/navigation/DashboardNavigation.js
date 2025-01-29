import React, { useContext } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import { LoginContext } from "../context/LoginContext";


const Tab = createBottomTabNavigator();

const tabBarStyle = {
  backgroundColor: COLORS.dark,
  borderTopWidth: 0,
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  height: 70,
  paddingBottom: 10,
  paddingTop: 10,
};

const DashboardNavigation = ({ navigation }) => {
  const { login, setLogin } = useContext(LoginContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.dark }}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate("AdminDashboard", { id: data.user_id })}
        >
          <MaterialIcons name="admin-panel-settings" size={24} color={COLORS.primary} />
          <Text style={styles.optionText}>Admin Panel</Text>
        </TouchableOpacity>
      </View>
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: COLORS.secondary,
          tabBarInactiveTintColor: COLORS.secondary1,
        }}
      >
       
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.dark,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    marginLeft: 8,
    fontSize: 16,
    color: COLORS.primary,
  },
});

export default DashboardNavigation;
