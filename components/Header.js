import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import backgroundImage from '../assets/backgroundHeader.jpg'
import bodyImage from '../assets/body.png'
import backIcon from '../assets/backIcon.png'
const Header = ({ icon, title, numOfPage, rightIcon }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        style={styles.background}
        resizeMode='cover'
      >
        <View style={styles.info}>
          <Image source={backIcon} style={styles.backIcon}></Image>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.page}>{numOfPage}</Text>
        </View>
        <ImageBackground
          source={bodyImage}
          style={styles.body}
        ></ImageBackground>
      </ImageBackground>
      <Image source={icon} style={styles.icon}></Image>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: 850,
  },
  body: {
    position: 'absolute',
    top: 150,
    width: '100%',
    height: '100%',
  },
  icon: {
    position: 'absolute',
    top: 150,
    left: 140,
  },
  info: {
    top: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  page: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '200',
  },
  rightIcon: {},
  backIcon: {},
})

export default Header
