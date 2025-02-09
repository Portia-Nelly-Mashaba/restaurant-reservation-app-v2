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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginContext } from "./src/context/LoginContext";
import SignUp from "./src/screens/SignUp";
import Login from "./src/screens/Login";
import EditProfile from "./src/screens/EditProfile";
import Dashboard from "./src/Admin/Dashboard";
import SuperAdmin from "./src/Admin/SuperAdmin";
import RestaurantNavigator from "./src/navigation/RestaurantNavigator";
import RegisterRestaurant from "./src/Admin/RegisterRestaurant";
import RestaurantManagement from "./src/Admin/superAdmin/restaurantManagement/RestaurantManagement";
import RestaurantListView from "./src/Admin/superAdmin/restaurantManagement/RestaurantListView";
import RestaurantListViewDetail from "./src/Admin/superAdmin/restaurantManagement/RestaurantListViewDetail";
import RestaurantMenuListView from "./src/Admin/superAdmin/restaurantManagement/RestaurantMenuListView";
import RestaurantMenu from "./src/Admin/superAdmin/RestaurantMenu";
import StatusControl from "./src/Admin/superAdmin/restaurantManagement/StatusControl";
import Users from "./src/Admin/superAdmin/userManagement/Users";
import User from "./src/Admin/superAdmin/userManagement/User";
import ManageReservation from "./src/Admin/superAdmin/manageReservations/ManageReservation";
import ReservationByAdmin from "./src/Admin/superAdmin/manageReservations/ReservationByAdmin";
import ManageCategories from "./src/Admin/superAdmin/categories/ManageCategories";
import CustomerReviews from "./src/Admin/superAdmin/customerReview/CustomerReviews";
import RestaurantReservation from "./src/Admin/restaurantAdmin/reservationManagement/RestaurantReservation";
import CustomerReservationDetails from "./src/Admin/restaurantAdmin/reservationManagement/CustomerReservationDetails";
import AddReservation from "./src/Admin/restaurantAdmin/reservationManagement/AddReservation";
import ManageTables from "./src/Admin/restaurantAdmin/manageTables/ManageTables";
import TableDetails from "./src/Admin/restaurantAdmin/manageTables/TableDetails";


const { height, width } = Dimensions.get("window"); // Get screen dimensions
const Stack = createNativeStackNavigator();

export default function App() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  //const [login, setLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
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

      // Check login status when the app loads
      const userToken = await AsyncStorage.getItem('token');
      if (userToken !== null) {
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false); // User is not logged in
      }
    })();
  }, []);

  

  // const loginStatus = async () => {
  //   try {
  //     const userToken = await AsyncStorage.getItem('token');
  //     if (userToken !== null) {
  //       setLogin(true);
  //     } else {
  //       setLogin(false);
  //     }
  //     console.log("Login Status:", login);
  //   } catch (error) {
  //     console.error("Failed to retrieve login status:", error);
  //   }
  // };

  if (!fontsLoaded) {
    return null; // Show splash or loading screen
  }

  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <UserReservedGeoCode.Provider value={{ address, setAddress }}>
        {/* <LoginContext.Provider value={{ login, setLogin }}> */}
          <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
              <Stack.Navigator>

              {isLoggedIn ? (
                  // If the user is logged in, show the BottomTab navigation
                  <Stack.Screen
                    name="Reservation"
                    component={BottomTab}
                    options={{
                      headerStyle: { backgroundColor: COLORS.offwhite },
                      headerTitleStyle: { fontWeight: "bold", color: COLORS.dark },
                    }}
                  />
                ) : (
                  // If the user is not logged in, show the Login screen first
                  <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                      headerStyle: { backgroundColor: COLORS.offwhite },
                      headerTitleStyle: { fontWeight: "bold", color: COLORS.dark },
                    }}
                  />
                )}

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
                <Stack.Screen
                  name="EditProfile"
                  component={EditProfile}
                  options={{
                    headerStyle: { backgroundColor: COLORS.offwhite },
                    headerTitleStyle: { fontWeight: "bold", color: COLORS.dark },
                  }}
                />
                <Stack.Screen
                  name="AdminDashboard"
                  component={Dashboard}
                  options={{
                    headerStyle: { backgroundColor: COLORS.offwhite },
                    headerTitleStyle: { fontWeight: "bold", color: COLORS.dark },
                  }}
                />
                <Stack.Screen
                  name="SuperAdminDashboard"
                  component={SuperAdmin}
                  options={{
                    headerStyle: { backgroundColor: COLORS.offwhite },
                    headerTitleStyle: { fontWeight: "bold", color: COLORS.dark },
                  }}
                />
                <Stack.Screen
                  name="RegisterRestaurant"
                  component={RegisterRestaurant}
                  options={{
                    headerStyle: { backgroundColor: COLORS.offwhite },
                    headerTitleStyle: { fontWeight: "bold", color: COLORS.dark },
                  }}
                />
                <Stack.Screen
                  name="RestaurantManagement"
                  component={RestaurantManagement}
                  options={{
                    headerStyle: { backgroundColor: COLORS.offwhite },
                    headerTitleStyle: { fontWeight: "bold", color: COLORS.dark },
                  }}
                />
                <Stack.Screen
                  name="Restaurant List View"
                  component={RestaurantListView}
                  options={{
                    headerStyle: { backgroundColor: COLORS.offwhite },
                    headerTitleStyle: { fontWeight: "bold", color: COLORS.dark },
                  }}
                />
                <Stack.Screen
                  name="RestaurantListViewDetail"
                  component={RestaurantListViewDetail}
                  options={{
                    headerStyle: { backgroundColor: COLORS.offwhite },
                    headerTitleStyle: { fontWeight: "bold", color: COLORS.dark },
                  }}
                />
                <Stack.Screen
                  name="Restaurant Menu List View"
                  component={RestaurantMenuListView}
                  options={{
                    headerStyle: { backgroundColor: COLORS.offwhite },
                    headerTitleStyle: { fontWeight: "bold", color: COLORS.dark },
                  }}
                />

                <Stack.Screen
                  name="Restaurant Menu"
                  component={RestaurantMenu}
                  options={{
                    headerStyle: { backgroundColor: COLORS.offwhite },
                    headerTitleStyle: { fontWeight: "bold", color: COLORS.dark },
                  }}
                />
                <Stack.Screen
                  name="Restaurant Status"
                  component={StatusControl}
                  options={{
                    headerStyle: { backgroundColor: COLORS.offwhite },
                    headerTitleStyle: { fontWeight: "bold", color: COLORS.dark },
                  }}
                />
                <Stack.Screen
                  name="App Users"
                  component={Users}
                  options={{
                    headerStyle: { backgroundColor: COLORS.offwhite },
                    headerTitleStyle: { fontWeight: "bold", color: COLORS.dark },
                  }}
                />
                <Stack.Screen
                  name="User Profile"
                  component={User}
                  options={{
                    headerStyle: { backgroundColor: COLORS.offwhite },
                    headerTitleStyle: { fontWeight: "bold", color: COLORS.dark },
                  }}
                />
                <Stack.Screen
                  name="Manage Reservations"
                  component={ManageReservation}
                  options={{
                    headerStyle: { backgroundColor: COLORS.offwhite },
                    headerTitleStyle: { fontWeight: "bold", color: COLORS.dark },
                  }}
                />
                <Stack.Screen
                  name="ReservationByAdmin"
                  component={ReservationByAdmin}
                  options={{
                    headerStyle: { backgroundColor: COLORS.offwhite },
                    headerTitleStyle: { fontWeight: "bold", color: COLORS.dark },
                  }}
                />
                <Stack.Screen
                  name="Manage Categories"
                  component={ManageCategories}
                  options={{
                    headerStyle: { backgroundColor: COLORS.offwhite },
                    headerTitleStyle: { fontWeight: "bold", color: COLORS.dark },
                  }}
                />
                <Stack.Screen
                  name="Customer Reviews"
                  component={CustomerReviews}
                  options={{
                    headerStyle: { backgroundColor: COLORS.offwhite },
                    headerTitleStyle: { fontWeight: "bold", color: COLORS.dark },
                  }}
                />
                <Stack.Screen
                  name="RestaurantReservation"
                  component={RestaurantReservation}
                  options={{
                    headerStyle: { backgroundColor: COLORS.offwhite },
                    headerTitleStyle: { fontWeight: "bold", color: COLORS.dark },
                  }}
                />
                <Stack.Screen
                  name="CustomerReservationDetails"
                  component={CustomerReservationDetails}
                  options={{
                    headerStyle: { backgroundColor: COLORS.offwhite },
                    headerTitleStyle: { fontWeight: "bold", color: COLORS.dark },
                  }}
                />
                <Stack.Screen
                  name="AddReservation"
                  component={AddReservation}
                  options={{
                    headerStyle: { backgroundColor: COLORS.offwhite },
                    headerTitleStyle: { fontWeight: "bold", color: COLORS.dark },
                  }}
                />
                <Stack.Screen
                  name="Manage Tables"
                  component={ManageTables}
                  options={{
                    headerStyle: { backgroundColor: COLORS.offwhite },
                    headerTitleStyle: { fontWeight: "bold", color: COLORS.dark },
                  }}
                />
                <Stack.Screen
                  name="Table Details"
                  component={TableDetails}
                  options={{
                    headerStyle: { backgroundColor: COLORS.offwhite },
                    headerTitleStyle: { fontWeight: "bold", color: COLORS.dark },
                  }}
                />

              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        {/* </LoginContext.Provider> */}
      </UserReservedGeoCode.Provider>
    </UserLocationContext.Provider>
  );
}
