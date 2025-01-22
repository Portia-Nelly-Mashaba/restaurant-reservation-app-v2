import { Image, StyleSheet } from 'react-native'
import React from 'react'

const NetworkImage = ({data, width, height, mode, radius}) => {
  return (
    <Image source={{uri: data}} style={styles.image(width, height, mode, radius)}/>
  )
}

export default NetworkImage

const styles =  StyleSheet.create({
    image: (width, height, mode, radius) => ({
            width: width,
            height: height,
            resizeMode: mode,
            borderRadius: radius,
        
    })
})