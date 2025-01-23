import { View, FlatList } from "react-native";
import React from "react";
import { data } from "../constants/data";
import MenuComponent from "./MenuComponent";
import { useNavigation } from "@react-navigation/native";

const MenuList = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <MenuComponent
      item={item}
      onPress={() => navigation.navigate("Restaurant-Details", item)}
    />
  );

  return (
    <View style={{ marginLeft: 12 }}>
      <FlatList
        data={data.menu}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 5 }}
        scrollEnabled
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
      />
    </View>
  );
};

export default MenuList;
