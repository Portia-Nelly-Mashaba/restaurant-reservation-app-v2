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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginContext } from "./src/context/LoginContext";
import SignUp from "./src/screens/SignUp";

const { height, width } = Dimensions.get("window"); // Get screen dimensions
const Stack = createNativeStackNavigator();

export default function App() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [login, setLogin] = useState(false);
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
      loginStatus();
    })();
  }, []);

  if (!fontsLoaded) {
    return null; // Show splash or loading screen
  }

  const loginStatus = async () => {
    const userToken = await AsyncStorage.getItem('token')

    if(userToken !==null){
      setLogin(true)
    }else{
      setLogin(false)
    }
    console.log(login);
    
  };

  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <UserReservedGeoCode.Provider value={{ address, setAddress }}>
      <LoginContext.Provider value={{ login, setLogin }}>
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
              <Stack.Screen
                name="Sign-Up"
                component={SignUp}
                options={{
                  headerStyle: { backgroundColor: COLORS.offwhite },
                  headerTitleStyle: { fontWeight: "bold", color: COLORS.dark },
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
        </LoginContext.Provider>
      </UserReservedGeoCode.Provider>
    </UserLocationContext.Provider>
  );
}
