import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { data } from '../constants/data'
import StoreComponent from './StoreComponent'

const NearByRestaurants = () => {
  return (
    <View style={{marginLeft: 12}}>
      <FlatList data={data.restaurants}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{marginTop: 5, rowGap: 20}}
        scrollEnabled
        renderItem={({item}) => (
            <StoreComponent item={item} onPress={() =>{}} />
        )}
      />
    </View>

  )
}

export default NearByRestaurants