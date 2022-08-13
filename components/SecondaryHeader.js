import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native'
import React from 'react'
import secondaryHeader from '../assets/images/test2.png'
import searchIcon from '../assets/images/search.png'
import heartIcon from '../assets/images/heart.png'
import filterIcon from '../assets/images/filterIcon.png'

const SecondaryHeader = ({ title, heart, noFilter }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={secondaryHeader}
        style={styles.image}
        resizeMode='cover'
      >
        <View style={styles.subContainer}>
          <Text style={styles.text}>{title}</Text>
          <View style={!heart ? styles.miniContainer : styles.miniContainer2}>
            {!heart && <Image source={searchIcon} style={styles.searchIcon}></Image>}
            {!noFilter && <Image
              source={ heart ? heartIcon : filterIcon}
              style={styles.filterIcon}
              resizeMode='cover'
            />}
          </View>
       
        </View>
      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    zIndex: -99
  },
  miniContainer:{
    flexDirection: "row",
    width: 100,
    justifyContent: "space-between"
  },  
  miniContainer2:{
    flexDirection: "row",
    width: 20,
    justifyContent: "space-between"
  },  
  image: {
    width: '100%',
    height: 130,
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
  },
  filterIcon: {
    right: 10
  },
  subContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    top: 60,
    paddingLeft: 10,
    paddingRight: 10
  },
})

export default SecondaryHeader
