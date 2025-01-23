import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import NetworkImage from "./NetworkImage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RatingInput } from "react-native-stock-star-rating";
import { COLORS, SIZES } from "../constants/theme";

const MenuComponent = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <NetworkImage
        data={item.imageUrl[0]}
        width={SIZES.width / 1.5} // Reduce width
        height={SIZES.height / 5} // Adjust height proportionally
        radius={12} // Slightly smaller radius
        mode={"cover"}
      />

      <View style={styles.titleContainer}>
        {" "}
        <Text style={styles.title}>{item.title}</Text>{" "}
        <RatingInput
          rating={item.ratings}
          size={14}
          maxStars={5}
          setRating={item.rating}
          bordered={false}
          color={COLORS.secondary}
        />{" "}
      </View>
    </TouchableOpacity>
  );
};

export default MenuComponent;

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 10,
    backgroundColor: COLORS.lightWhite,
    padding: 8,
    borderRadius: 16,
  },
  title: {
    fontSize: 14,
    fontFamily: "regular",
    color: COLORS.gray,
  },
  titleContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginTop: 8, 
},
});
