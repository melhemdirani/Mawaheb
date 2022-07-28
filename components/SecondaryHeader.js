import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native'
import React from 'react'
import secondaryHeader from '../assets/test2.png'
import searchIcon from '../assets/search.png'
import filterIcon from '../assets/filterIcon.png'

const SecondaryHeader = ({ name }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={secondaryHeader}
        style={styles.image}
        resizeMode='cover'
      >
        <Text style={styles.text}>Hi, {name}</Text>
        <Image source={searchIcon} style={styles.searchIcon}></Image>
        <Image
          source={filterIcon}
          style={styles.filterIcon}
          resizeMode='cover'
        ></Image>
      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    zIndex: -1,
  },

  image: {
    width: '100%',
    height: 160,
    zIndex: -1,
  },
  arc: {},
  text: {
    position: 'absolute',
    top: 75,
    left: 10,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    zIndex: 1,
  },
  searchIcon: {
    position: 'absolute',
    top: 83,
    left: 300,
    height: 23,
  },
  filterIcon: {
    left: 375,
    top: 85,
    height: 25,
  },
})

export default SecondaryHeader
