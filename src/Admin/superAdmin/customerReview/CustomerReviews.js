import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { data } from '../../../constants/data';

const CustomerReviews = () => {
  const { reviews, restaurants, profiles } = data;

  const handleDelete = (id) => {
    console.log(`Delete review with ID: ${id}`);
  };

  const getRestaurantName = (restaurant_id) => {
    const restaurant = restaurants.find((res) => res.id === restaurant_id);
    return restaurant ? restaurant.title : 'Unknown Restaurant';
  };

  const getUserEmail = (userId) => {
    const user = profiles.find((profile) => profile.user_id === userId);
    return user ? user.email : 'Unknown Email';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Reviews</Text>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.rating_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <View>
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.email}>{getUserEmail(item.userId)}</Text>
              <Text style={styles.restaurant}>{getRestaurantName(item.restaurant_id)}</Text>
              <Text style={styles.comment}>{item.comments}</Text>
              <Text style={styles.rating}>Rating: {item.ratings} ⭐ ({item.ratingCount} reviews)</Text>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item.rating_id)}>
              <Feather name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  reviewCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#777',
  },
  restaurant: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
  },
  comment: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  rating: {
    fontSize: 14,
    color: '#000',
  },
});

export default CustomerReviews;