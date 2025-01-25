import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../constants/theme';

const RestaurantCategory = ({ item }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Restaurant-Details', item);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.restaurantContainer}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.restaurantImage}
        resizeMode="cover"
      />
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.title}</Text>
        <Text style={styles.restaurantAddress}>{item.coords.address}</Text>
        <Text style={styles.restaurantRating}>Rating: {item.ratings}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  restaurantContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 10,
    width: '100%',
  },
  restaurantImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  restaurantInfo: {
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    fontFamily: 'regular',
    color: COLORS.black,
    marginBottom: 5,
  },
  restaurantAddress: {
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginBottom: 5,
  },
  restaurantRating: {
    fontSize: SIZES.small,
    color: COLORS.secondary,
  },
});

export default RestaurantCategory;
