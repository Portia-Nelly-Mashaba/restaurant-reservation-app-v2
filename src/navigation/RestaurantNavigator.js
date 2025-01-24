import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRoute } from "@react-navigation/native";
import React from "react";
import RestaurantDetails from "../screens/RestaurantDetails";
import ReserveTable from "../screens/ReserveTable";
import ReservationPage from "../screens/ReservetionPage";

const Stack = createNativeStackNavigator();

const RestaurantNavigator = () => {
  const route = useRoute();
  const item = route.params;

  return (
    <Stack.Navigator initialRouteName="restaurant-details">
      <Stack.Screen
        name="restaurant-details"
        component={RestaurantDetails}
        options={{ headerShown: false }}
        initialParams={{ item }}
      />
      <Stack.Screen
        name="reserve-table"
        component={ReserveTable}
        options={{ headerShown: false }}
        initialParams={{ item }}
      />
      <Stack.Screen
        name="reservation-page"
        component={ReservationPage}
        options={{ headerShown: false }}
        initialParams={{ item }}
      />
    </Stack.Navigator>
  );
};

export default RestaurantNavigator;
