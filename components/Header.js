import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, Pressable, Dimensions } from 'react-native';

import backgroundImage from '../assets/images/backgroundHeader.png'
import backIcon from '../assets/images/backIcon.png'
import testImage from '../assets/images/test.png'
import { LinearGradient } from 'expo-linear-gradient'

const width = Dimensions.get('window').width

const Header = ({ icon, title, numOfPage, rightIcon, hidden, numberHidded, goBack, profile, rating, center, onTrash, trash}) => {
  return (
    <View style={title !== "Notifications" ? styles.container: [styles.container, styles.notifications]}>
      <ImageBackground
        source={backgroundImage}
        style={styles.background}
        resizeMode='cover'
      >
        <View style={!hidden ? styles.info : !numberHidded ? styles.info2 : styles.info3}>
          {
            !hidden && goBack ?  
            <Pressable onPress={() => goBack()} style={styles.backIcon}>
              <Image source={backIcon} />
            </Pressable>
            : !hidden ?
            <Pressable  style={styles.backIcon}>
            <Image source={backIcon} />
          </Pressable>
          : null

          }
          {
            numberHidded && trash
            ? <Pressable onPress={() => onTrash()}>
                <Image source={rightIcon} style={styles.page2}  />
              </Pressable>
            : <Text style={styles.page}>{numOfPage}</Text>
          }
        </View>
        <Text style={[styles.text, center &&{ textAlign: "center"}]}>{title}</Text>
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
              <Image 
                source={{
                  uri: `http://195.110.58.234:4000${icon}`
                }} 
                style={styles.iconP} 
              />
              
            </LinearGradient>
            { rating > 0 ? 
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>{rating}</Text>
              </View> : null
            }
          </View>
        : <Image source={icon} style={styles.icon}></Image>
      }
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: "transparent !important",
    marginTop: -12,
    zIndex: -99
  },
  background: {
    width: '100%',
    height: 220,
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
    left: .5 * width - 50,
    width: 100
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
    height: 90,
    backgroundColor: "white",
    borderRadius: 50
  },
  info: {
    position: 'relative',
    top: 100,
    flexDirection: 'row',
    alignSelf: "center",
    width: "90%",
    alignItems: 'flex-start',
    justifyContent: "space-between",
  },
  info2: {
    position: 'relative',
    top: 100,
    flexDirection: 'row',
    alignSelf: "center",
    width: "90%",
    alignItems: 'flex-start',

    justifyContent: "center"
  },
  info3: {
    position: 'relative',
    top: 100,
    flexDirection: 'row',
    alignItems: 'flex-start',

    width: "90%",
    alignItems: 'center',
    justifyContent: "flex-end"
  },
  text: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'PoppinsS',
    alignSelf: "center",
    top: 90
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
   height: 40,
   width: 40,
   alignItems: "center",
   justifyContent: "center",
   marginTop: -10
  },
  notifications:{
    paddingBottom: 35,
  }
})

export default Header
