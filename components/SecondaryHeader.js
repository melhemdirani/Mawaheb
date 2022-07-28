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
        <View style={styles.subContainer}>
          <Text style={styles.text}>Hi, {name}</Text>
          <Image source={searchIcon} style={styles.searchIcon}></Image>
          <Image
            source={filterIcon}
            style={styles.filterIcon}
            resizeMode='cover'
          ></Image>
        </View>
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
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    zIndex: 1,
  },
  searchIcon: {
    height: 23,
    marginRight: -200
  },
  filterIcon: {
    height: 25,
  },
  subContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    top: 80,
    paddingLeft: 10,
    paddingRight: 10
  }
})

export default SecondaryHeader
