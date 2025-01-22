import { View, Text } from "react-native";
import React from "react";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from "../constants/theme";

const getIcon = (value) => {
  switch (value) {
    case "fine_dining":
      return <MaterialCommunityIcons name="silverware-fork-knife" size={24} color={COLORS.gray} />;
    case "casual_dining":
      return <Ionicons name="restaurant" size={24} color={COLORS.gray} />;
    case "fast_food":
      return <FontAwesome5 name="hamburger" size={24} color={COLORS.gray} />;
    case "cafe":
      return <Ionicons name="cafe" size={24} color={COLORS.gray} />;
    case "buffet":
      return <MaterialCommunityIcons name="food" size={24} color={COLORS.gray} />;
    default:
      return null;
  }
};

const CategoryItem = ({ category, selected }) => {
  return (
    <View
      style={{
        marginLeft: 12,
        padding: 5,
        alignItems: "center",
        width: 80,
        height: 55,
        justifyContent: "center",
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor:
          category.value === selected ? COLORS.secondary : "transparent",
        shadowColor: SHADOWS.small,
      }}
    >
      {getIcon(category.value)}
      <Text style={{ fontSize: 13, fontFamily: "regular" }}>
        {category.name}
      </Text>
    </View>
  );
};

export default CategoryItem;
