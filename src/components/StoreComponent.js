import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../constants/theme';
import NetworkImage from './NetworkImage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RatingInput} from 'react-native-stock-star-rating';


const StoreComponent = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <NetworkImage
        data={item.imageUrl}
        width={SIZES.width / 1.5} // Reduce width
        height={SIZES.height / 5} // Adjust height proportionally
        radius={12} // Slightly smaller radius
        mode={'cover'}
      />

      <View style={{flexDirection: 'row', justifyContent: "space-between", marginTop: 8}}>
        <Text style={styles.title}>{item.title}</Text>
        <RatingInput
            rating = {item.ratings}
            size={14}
            maxStars={5}
            setRating={item.rating}
            bordered={false}
            color={COLORS.secondary}
        />
      </View>

      <View style={styles.addressContainer}>
        <Ionicons name="location-outline" size={16} color="black" />
        <Text style={styles.addressText}>{item.coords.address}</Text>
      </View>
        
    </TouchableOpacity>
  );
};

export default StoreComponent;

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 10, 
    backgroundColor: COLORS.lightWhite,
    padding: 8,
    borderRadius: 16,
    // alignItems: 'center', /
  },
  title: {
    fontSize: 14,
    fontFamily: 'regular',
    color: COLORS.gray, 
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5, // Add margin for spacing
  },
  addressText: {
    marginLeft: 5, // Add space between icon and text
    color: 'black', // Ensure the text is black
    fontSize: 13,
  },
});