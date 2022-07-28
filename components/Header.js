import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import backgroundImage from '../assets/images/backgroundHeader.jpg'
import bodyImage from '../assets/images/body.png'
import backIcon from '../assets/images/backIcon.png'
import testImage from '../assets/images/test.png'
const Header = ({ icon, title, numOfPage, rightIcon, hidden }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        style={styles.background}
        resizeMode='cover'
      >
        <View style={styles.info}>
          {!hidden && <Image source={backIcon} style={styles.backIcon}></Image>}
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.page}>{numOfPage}</Text>
        </View>
        <ImageBackground
          source={testImage}
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
    width: '100%',
    height: 200,
  },
  body: {
    position: 'absolute',
    width: '100%',
    height: 100,
    top: 150,
  },
  icon: {
    position: 'absolute',
    top: 140,
    left: 140,
  },
  info: {
    position: 'relative',
    top: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#fff',

    left: 120,
    fontFamily: 'PoppinsS',
  },
  page: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '200',
    left: 190,
  },

  rightIcon: {},
  backIcon: {
    left: 10,
  },
})

export default Header
