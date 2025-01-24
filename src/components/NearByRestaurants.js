import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { data } from '../constants/data'
import StoreComponent from './StoreComponent'
import { useNavigation } from '@react-navigation/native'

const NearByRestaurants = () => {
  const navigation = useNavigation();
  return (
    <View style={{marginLeft: 12}}>
      <FlatList data={data.restaurants}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{marginTop: 5, rowGap: 20}}
        scrollEnabled
        renderItem={({item}) => (
            <StoreComponent item={item} onPress={() => navigation.navigate("Restaurant-Details", item)} />
        )}
      />
    </View>

  )
}

export default NearByRestaurants