import { SafeAreaView } from "react-native";
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Reservations from "../screens/Reservations";
import Favorites from "../screens/Favorites";
import Profile from "../screens/Profile";
import { COLORS } from "../constants/theme";
import { LoginContext } from "../context/LoginContext";
import Login from "../screens/Login";

const Tab = createBottomTabNavigator();

const tabBarStyle = {
  backgroundColor: COLORS.dark, // Use a dark color for the background
  borderTopWidth: 0,
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  height: 70, // Adjust height as needed
  paddingBottom: 10, // Add padding to the bottom
  paddingTop: 10, // Add padding to the top
};

const BottomTab = () => {
  const {login, setLogin} = useContext(LoginContext)
  console.log(login);
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.dark }}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: COLORS.secondary,
          tabBarInactiveTintColor: COLORS.secondary1,
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                color={focused ? COLORS.secondary : COLORS.secondary1}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Reservations"
          component={Reservations}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "calendar" : "calendar-outline"}
                color={focused ? COLORS.secondary : COLORS.secondary1}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "heart" : "heart-outline"}
                color={focused ? COLORS.secondary : COLORS.secondary1}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={login ? Profile: Login}
          // component={Profile}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                color={focused ? COLORS.secondary : COLORS.secondary1}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default BottomTab;