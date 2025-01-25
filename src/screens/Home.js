import { View, Text, SafeAreaView, ScrollView, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import pages from "./pages.style";
import HomeHeader from "../components/HomeHeader";
import CategoryList from "../components/CategoryList";
import ChoicesList from "../components/ChoicesList";
import Heading from "../components/Heading";
import NearByRestaurants from "../components/NearByRestaurants";
import Divider from "../components/Divider";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../constants/theme";
import MenuList from "../components/MenuList";
import HomeCategories from "../components/HomeCategories";
import { Dimensions } from 'react-native';



const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  console.log("Selected Category in Home:", selectedCategory);

  return (
    <SafeAreaView>
      <View style={pages.viewOne}>
        <View style={pages.viewTwo}>
          <HomeHeader />
          <ScrollView showsVerticalScrollIndicator={false} style={{ borderBottomEndRadius: 30, borderBottomStartRadius: 30 }}>
            {/* Search */}
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color={COLORS.gray} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
              />
            </View>
            <CategoryList 
              setSelectedCategory={setSelectedCategory} 
              setSelectedSection={setSelectedSection} 
              setSelectedValue={setSelectedValue} 
            />
            {selectedCategory !== null ? (
              <>
                <ChoicesList setSelectedChoice={setSelectedChoice} setSelectedSection={setSelectedSection} />
                <View >
                  <Heading heading={`Browse ${selectedValue}`} onPress={() => {}} />
                  <HomeCategories selectedCategory={selectedCategory} />
                </View>
              </>
            ) : (
              <View>
                <Heading heading={"Nearby Restaurants"} onPress={() => {}} />
                <NearByRestaurants />
                <Divider />
                <Heading heading={"Try Something New"} onPress={() => {}} />
                <MenuList />
                <Divider />
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightWhite,
    borderRadius: 15,
    padding: 10,
    margin: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.gray
  },
 
});
