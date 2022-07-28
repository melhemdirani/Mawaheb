import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import calendarIcon from '../assets/calendarIcon.png'
import clockIcon from '../assets/clockIcon.png'
import locationIcon from '../assets/locationIcon.png'
import priceRectangle from '../assets/priceRectangle.png'
import heartIcon from '../assets/heartIcon.png'
import plusIcon from '../assets/plusIcon.png'
import MaskedView from '@react-native-masked-view/masked-view'

const Job = ({ title, description }) => {
  return (
    <LinearGradient
      colors={[
        'rgba(202, 218, 221, 0.3)',
        'rgba(202, 218, 221, 0)',
        'rgba(202, 218, 221, 0.3)',
      ]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.circle}></View>
          <ImageBackground
            source={priceRectangle}
            style={styles.priceBg}
            resizeMode='contain'
          ></ImageBackground>
          <Text style={styles.price}>100 </Text>
          <Image source={heartIcon} style={styles.heart}></Image>
          <Image source={plusIcon} style={styles.plus}></Image>
        </View>

        <View style={styles.info}>
          <MaskedView
            maskElement={
              <Text style={[styles.title, { backgroundColor: 'transparent' }]}>
                {title}
              </Text>
            }
          >
            <LinearGradient
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={['rgba(49, 190, 187, 1)', 'rgba(101, 91, 218, 1)']}
            >
              <Text style={[styles.title, { opacity: 0 }]}>{title}</Text>
            </LinearGradient>
          </MaskedView>

          <Text style={styles.description}> {description}</Text>
        </View>

        <LinearGradient
          colors={[
            'rgba(202, 218, 221, 0.4)',
            'rgba(202, 218, 221, 0)',
            'rgba(202, 218, 221, 0.4)',
          ]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.footer}>
            <View style={styles.footerInfo}>
              <Image source={calendarIcon} style={styles.icon}></Image>
              <Text style={styles.text}> 10/10/2020</Text>
            </View>
            <View style={styles.footerInfo}>
              <Image source={clockIcon} style={styles.icon}></Image>
              <Text style={styles.text}> Day Shift</Text>
            </View>
            <View style={styles.footerInfo}>
              <Image source={locationIcon} style={styles.icon}></Image>
              <Text style={styles.text}> 123 Main St</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </LinearGradient>
  )
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    position: 'relative',
    zIndex: 1,
  },
  info: {
    padding: 20,
    borderBottomColor: 'rgba(16, 125, 197, 1)',
    borderBottomWidth: 0.4,
  },
  header: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 20,
  },

  footerInfo: {
    flexDirection: 'row',
    marginHorizontal: 12,
    alignItems: 'center',
    paddingTop: 7,
  },
  circle: {
    position: 'absolute',
    top: -30,
    left: -160,

    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: ' rgba(16, 125, 197, 1)',
    borderWidth: 1,
    zIndex: 999,
  },
  priceBg: {
    position: 'absolute',
    top: -49,
    left: -100,

    width: 90,
    height: 90,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    top: -18,
    left: -90,
    color: 'rgba(16, 125, 197, 1)',
  },
  heart: {
    position: 'absolute',
    top: -10,
    left: 100,
  },
  plus: {
    position: 'absolute',
    top: -10,
    left: 135,
  },
  text: {
    color: ' rgba(16, 125, 197, 1)',
  },
  description: {},
})
export default Job
