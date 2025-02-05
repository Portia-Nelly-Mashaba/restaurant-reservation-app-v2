import { SafeAreaView } from "react-native";
import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Home from "../screens/Home";
import Reservations from "../screens/Reservations";
import Favorites from "../screens/Favorites";
import Profile from "../screens/Profile";
import Login from "../screens/Login";
import { COLORS } from "../constants/theme";
import { LoginContext } from "../context/LoginContext";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const { login, setLogin } = useContext(LoginContext);
  console.log("Login Context:", login);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem('token');
        if (userToken) {
          setLogin(true);
        } else {
          setLogin(false);
        }
      } catch (error) {
        console.error("Failed to retrieve login status:", error);
      }
    };

    checkLoginStatus();
  }, [setLogin]);

  const tabBarStyle = {
    backgroundColor: COLORS.dark,
    borderTopWidth: 0,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,
  };

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
          component={login ? Profile : Login}
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
