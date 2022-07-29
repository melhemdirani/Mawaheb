import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import calendarIcon from '../assets/images/calendarIcon.png'
import clockIcon from '../assets/images/clockIcon.png'
import locationIcon from '../assets/images/locationIcon.png'
import priceRectangle from '../assets/images/priceRectangle.png'
import heartIcon from '../assets/images/heartIcon.png'
import plusIcon from '../assets/images/plusIcon.png'
import MaskedView from '@react-native-masked-view/masked-view'

const Job = ({ title, description, price, lastOne, current, heart }) => {
  return (
    <View
      style={lastOne ? [styles.wrapper, { marginBottom: 40 }] : styles.wrapper}
    >
      <View style={styles.header}>
        <View style={styles.subHeader}>
          <View style={styles.circle}></View>
          <ImageBackground
            source={priceRectangle}
            style={styles.priceBg}
            resizeMode='contain'
          >
            <View style={styles.priceAndCurrency}>
              <Text style={styles.price}>{price} </Text>
              <Text style={styles.currency}>AED</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.subHeader}>
          {!heart && <Image source={heartIcon} style={styles.heart}></Image>}
          <Image source={plusIcon} style={styles.plus}></Image>
        </View>
      </View>
      <LinearGradient
        colors={
          current?
          [
            '#E8EEF9',
            '#E8EEF9',
            '#E8EEF9',
            '#E8EEF9',
          ]
          :[
          'rgba(202, 218, 221, 0.1)',
          'rgba(202, 218, 221, 0)',
          'rgba(202, 218, 221, 0.2)',
          'rgba(202, 218, 221, 0.2)',
          'rgba(202, 218, 221, 0.2)',
          'rgba(202, 218, 221, 0.1)',
          ]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.linear}
      >
        <View style={[styles.container]}>
          <View style={styles.info}>
            <MaskedView
              maskElement={
                <Text
                  style={[
                    styles.title, 
                    { backgroundColor: 'transparent' }
                  ]}
                >
                  {title}
                </Text>
              }
            >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#31BEBB','#655BDA']}
              >
                <Text style={[styles.title, { opacity: 0 }]}>{title}</Text>
              </LinearGradient>
            </MaskedView>
            <Text style={styles.description}>{description}</Text>
          </View>
          <LinearGradient
            colors={
              current?
              [
                '#E3E8F2',
                '#E3E8F2',
                '#E3E8F2',
              ]
              :[
                'rgba(202, 218, 221, 0.4)',
                'rgba(202, 218, 221, 0)',
                'rgba(202, 218, 221, 0.4)',
              ]
            }
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
    </View>
  )
}
const styles = StyleSheet.create({
  wrapper: {
    zIndex: 9999,
    width: "90%",
    alignSelf: "center",
    top: -5
  },
  linear: {
    borderRadius: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.03)',
    position: 'relative',
    zIndex: 1,
    paddingTop: 15,
  },
  info: {
    padding: 20,
  },
  header: {
    zIndex: 1,
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginBottom: -45,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'PoppinsS',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: 'rgba(16, 125, 197, 1)',
    borderTopWidth: 0.4,
    paddingVertical: 15,
    paddingLeft: 25,
    width: "100%"
  },

  footerInfo: {
    flexDirection: 'row',
    marginHorizontal: 5,
    alignItems: 'center',
    paddingTop: 7,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: ' rgba(16, 125, 197, 1)',
    borderWidth: 1,
    zIndex: 999,
    backgroundColor: 'white',
  },
  priceBg: {
    width: 110,
    height: 90,
    left: 10,
    justifyContent: 'center',
  },
  price: {
    fontSize: 18,
    left: 10,
    fontWeight: 'bold',
    color: 'rgba(16, 125, 197, 1)',
  },
  heart: {},
  plus: {
    left: 10,
    marginRight: 20
  },
  text: {
    color: 'rgba(16, 125, 197, 1)',
    fontFamily: 'PoppinsR',
    fontSize: 10
  },
  description: {
    color: 'rgba(10, 8, 75, .6)',
    fontFamily: 'PoppinsR',
    fontSize: 12,
    top: -5
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: '#171717',
    shadowOpacity: 1,
    shadowRadius: 30,
    backgroundColor: "white"
  },
  priceAndCurrency: {
    flexDirection: 'row',

    alignItems: 'center',
    width: '100%',
  },
  currency: {
    fontSize: 10,
    fontFamily: 'PoppinsR',
    marginLeft: 10,
    marginTop: 5,
    color: '#107DC5',
  },
})
export default Job
