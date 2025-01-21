import { View, Text, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AssetImage from './AssetImage';
import { UserReservedGeoCode } from '../context/UserReservedGeoCode';
import { COLORS, SIZES } from '../constants/theme';
import { UserLocationContext } from '../context/UserLocationContext';
import * as Location from "expo-location";

const HomeHeader = () => {
    const [time, setTime] = useState(null);
    const {address, setAddress} = useContext(UserReservedGeoCode);
    const {location, setLocation} = useContext(UserLocationContext);

    useEffect(() => {
        if(location !== null){
            reverseGeocode(location.coords.latitude, location.coords.longitude);
        }
    }, [location]);

    const reverseGeocode = async (latitude, longitude) => {
        const reverseGeocodeAddress = await Location.reverseGeocodeAsync({
            latitude: latitude, 
            longitude: longitude
        });
        console.log(reverseGeocodeAddress);
        
        setAddress(reverseGeocodeAddress[0]);
        const greeting = getTimeOfDay();
        setTime(greeting);
    }

    const getTimeOfDay = () => {
        const now = new Date();
        const hour = now.getHours();
      
        if (hour >= 0 && hour < 12) {
          return '🌞';
        }
        if (hour >= 12 && hour < 17) {
          return '☀️';
        }
        return '🌙';
      };
      


  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <View style={styles.outerStyle}> 
        <AssetImage 
          data={require('../assets/images/profile.jpg')}
          width={50}
          height={50}
          mode={'cover'}
          radius={99}
        />

        <View style={styles.headerStyle}>
          <Text style={styles.heading}>My location</Text>
          <Text style={styles.location}>{`${address.name} ${address.street}, ${address.city} `}</Text>
        </View>
      </View>
      <Text style={{fontSize:25}}>{time}</Text>
    </View>
  );
}

export default HomeHeader;

const styles = StyleSheet.create({
  outerStyle: {
    marginBottom: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  headerStyle: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  heading:{
    fontFamily: 'medium',
    fontSize: SIZES.medium,
    color: COLORS.secondary
  },
  location:{
    fontFamily: 'regular',
    fontSize: SIZES.small,
    color: COLORS.gray
  }
});
