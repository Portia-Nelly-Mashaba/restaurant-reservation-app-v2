import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Location from "expo-location";
import BottomTab from "./src/navigation/Bottomtab";
import { COLORS } from "./src/constants/theme";
import { UserLocationContext } from "./src/context/UserLocationContext";
import { UserReservedGeoCode } from "./src/context/UserReservedGeoCode";
import RestaurantNavigator from "./src/navigation/RestaurantNavigator";

const { height, width } = Dimensions.get("window"); // Get screen dimensions
const Stack = createNativeStackNavigator();

export default function App() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const defaultAddress = {
    city: "Shanghai",
    country: "China",
    district: "Pudong",
    isoCountryCode: "CN",
    name: "33 East Nanjing Rd",
    postalCode: "94108",
    region: "SH",
    street: "Stockton St",
    streetNumber: "1",
    subregion: "San Francisco County",
    timezone: "America/Los_Angeles",
  };

  const [fontsLoaded] = useFonts({
    regular: require("./src/assets/fonts/Poppins-Regular.ttf"),
    light: require("./src/assets/fonts/Poppins-Light.ttf"),
    bold: require("./src/assets/fonts/Poppins-Bold.ttf"),
    medium: require("./src/assets/fonts/Poppins-Medium.ttf"),
    extrabold: require("./src/assets/fonts/Poppins-ExtraBold.ttf"),
    semibold: require("./src/assets/fonts/Poppins-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    (async () => {
      setAddress(defaultAddress);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (!fontsLoaded) {
    return null; // Show splash or loading screen
  }

  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <UserReservedGeoCode.Provider value={{ address, setAddress }}>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Reservation"
                component={BottomTab}
                options={{
                  headerStyle: { backgroundColor: COLORS.offwhite },
                  headerTitleStyle: { fontWeight: "bold", color: COLORS.dark },
                }}
              />
              <Stack.Screen
                name="Restaurant-Details"
                component={RestaurantNavigator}
                options={{
                  headerStyle: { backgroundColor: COLORS.offwhite },
                  headerTitleStyle: { fontWeight: "bold", color: COLORS.dark },
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </UserReservedGeoCode.Provider>
    </UserLocationContext.Provider>
  );
}
