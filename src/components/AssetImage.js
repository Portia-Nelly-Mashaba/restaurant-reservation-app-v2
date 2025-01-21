import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const AssetImage = ({data, width, height, mode, radius}) => {
  return (
    <Image source={data} style={styles.image(width, height, mode, radius)}/>
  )
}

export default AssetImage

const styles =  StyleSheet.create({
    image: (width, height, mode, radius) => ({
            width: width,
            height: height,
            resizeMode: mode,
            borderRadius: radius,
        
    })
})