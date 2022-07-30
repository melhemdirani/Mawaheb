import { View, Text, Image, StyleSheet, ImageBackground, Pressable } from 'react-native'
import React from 'react'
import backgroundImage from '../assets/images/backgroundHeader.jpg'
import bodyImage from '../assets/images/body.png'
import backIcon from '../assets/images/backIcon.png'
import testImage from '../assets/images/test.png'
import { LinearGradient } from 'expo-linear-gradient'

const Header = ({ icon, title, numOfPage, rightIcon, hidden, numberHidded, goBack, profile, rating }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        style={styles.background}
        resizeMode='cover'
      >
        <View style={!hidden ? styles.info : !numberHidded ? styles.info2 : styles.info3}>
          {
            !hidden && 
            <Pressable onPress={() => goBack()}>
              <Image onPress={() => goBack()} source={backIcon} style={styles.backIcon}/>
            </Pressable>
          }
          <Text style={styles.text}>{title}</Text>
          {
            numberHidded
            ? <Image source={rightIcon} style={styles.page2}></Image>
            : <Text style={styles.page}>{numOfPage}</Text>
          }
        </View>
        <ImageBackground
          source={testImage}
          style={styles.body}
        ></ImageBackground>
      </ImageBackground>
      { 
        profile
        ? <View style={styles.iconsContainer}>
            <LinearGradient
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={[ '#23CDB0','#23CDB0','#23CDB0', '#0482AA', ]}
              style={styles.iconContainer}
            >
              <Image source={icon} style={styles.iconP}></Image>
            </LinearGradient>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>{rating}</Text>
            </View>
          </View>
        : <Image source={icon} style={styles.icon}></Image>
      }
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
  iconContainer: {
    borderRadius: 100,
    padding: 5
  },
  iconsContainer: {
    position: 'absolute',
    top: 140,
    left: 140,
    alignItems: "center"
  },
  iconP:{
    width: 90,
    height: 90
  },
  info: {
    position: 'relative',
    top: 100,
    flexDirection: 'row',
    alignSelf: "center",
    width: "90%",
    alignItems: 'center',
    justifyContent: "space-between"
  },
  info2: {
    position: 'relative',
    top: 100,
    flexDirection: 'row',
    alignSelf: "center",
    width: "90%",
    alignItems: 'center',
    justifyContent: "center"
  },
  info3: {
    position: 'relative',
    top: 100,
    flexDirection: 'row',
    alignSelf: "center",
    width: "90%",
    alignItems: 'center',
    justifyContent: "flex-end"
  },
  text: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'PoppinsS',
  },
  page: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '200',
  },
  page2:{
  },
  rating:{
    color: "white",
    fontSize: 14,
    fontFamily: "PoppinsS"
  },
  ratingContainer:{
    backgroundColor: "#9C88FD",
    paddingHorizontal: 9,
    borderRadius: 100,
    top: -10
  },

  rightIcon: {},
  backIcon: {
  },
})

export default Header
