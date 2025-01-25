import { View, FlatList, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { data } from '../constants/data';
import RestaurantCategory from './RestaurantCategory';
import { COLORS, SIZES } from '../constants/theme';

const { width } = Dimensions.get('window');

const HomeCategories = ({ selectedCategory }) => {
  // Filter restaurants based on selected category
  const filteredRestaurants = data.restaurants.filter(
    (restaurant) => restaurant.category_id === selectedCategory
  );

  return (
    <View style={styles.container}>
      {filteredRestaurants.length > 0 ? (
        <FlatList
          data={filteredRestaurants}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <RestaurantCategory item={item} />}
        />
      ) : (
        <Text style={styles.fallbackText}>No restaurants available in this category.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%', // Make it take full width
    height: 160, // Adjust the height as needed
    padding: 10,
    backgroundColor: COLORS.lightWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    textAlign: 'center',
  },
});

export default HomeCategories;
