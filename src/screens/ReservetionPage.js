import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const ReservetionPage = () => {
    const route = useRoute();
    const  reserve = route.params;
  return (
    <View>
      <Text>ReservetionPage</Text>
    </View>
  )
}

export default ReservetionPage