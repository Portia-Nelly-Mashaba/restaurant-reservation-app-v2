import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { data } from "../constants/data"; // Import your datasets
import Buttons from "../components/Button";
import { COLORS } from "../constants/theme";


const RestaurantDetails = ({ route }) => {
  const { item } = route.params;
  const [activeTab, setActiveTab] = useState('About');

  // Find the restaurant details using the restaurant ID from the menu item
  const restaurant = data.restaurants.find(
    (restaurant) => restaurant.id.toString() === item.restaurant
  );

  const handleToggle = (tab) => {
    setActiveTab(tab);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {restaurant && (
        <>
          <Text style={styles.title}>{restaurant.title}</Text>
          <Image
            source={{ uri: restaurant.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          <Buttons onToggle={handleToggle} />
          {activeTab === 'About' && (
            <Text style={styles.description}>{restaurant.description}</Text>
          )}
          {activeTab === 'Menu' && (
            data.menu
              .filter(menuItem => menuItem.restaurant === restaurant.id.toString())
              .map(menuItem => (
                <View key={menuItem._id} style={styles.menuItem}>
                  <Text style={styles.menuTitle}>{menuItem.title}</Text>
                  <Text style={styles.menuDescription}>{menuItem.description}</Text>
                </View>
              ))
          )}
          {activeTab === 'Review' && (
            data.reviews
              .filter(review => review.restaurant_id === restaurant.id)
              .map(review => (
                <View key={review.rating_id} style={styles.reviewItem}>
                  <Text style={styles.reviewText}>{review.username}: {review.comments}</Text>
                  <Text style={styles.reviewRating}>Rating: {review.ratings}</Text>
                </View>
              ))
          )}
        </>
      )}
    </ScrollView>
  );
};

export default RestaurantDetails;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 2,
    marginBottom: 8,
    fontFamily: 'regular',
  },
  description: {
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'regular',
    color: COLORS.gray,
  },
  menuItem: {
    marginTop: 16,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: 'regular',
  },
  menuDescription: {
    fontSize: 14,
    color: COLORS.gray,
    fontFamily: 'regular',
  },
  reviewItem: {
    marginTop: 16,
  },
  reviewText: {
    fontSize: 14,
    color: COLORS.gray,
    fontFamily: 'regular',
  },
  reviewRating: {
    fontSize: 14,
    color: COLORS.secondary,
    fontFamily: 'regular',
  },
});
