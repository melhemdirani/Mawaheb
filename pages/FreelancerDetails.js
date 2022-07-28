import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import calendarIcon from '../assets/images/calendarIcon.png'
import clockIcon from '../assets/images/clockIcon.png'
import locationIcon from '../assets/images/locationIcon.png'
import priceRectangle from '../assets/images/priceRectangle.png'
import heartIcon from '../assets/images/heartIcon.png'
import plusIcon from '../assets/images/plusIcon.png'
import MaskedView from '@react-native-masked-view/masked-view'
import languageIcon from '../assets/images/LanguageIcon.png'
import languageCircle from '../assets/images/languageCircle.png'
import { freelancerDetails } from '../assets/data/freelancerDetails'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import minusIcon from '../assets/images/minusIcon.png'

const FreelancerDetails = ({

}) => {
  const { id, title, price, roles, languages, location, shift } =
    freelancerDetails

  return (
    <SafeAreaView style={styles.wrapper}>
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
              <Text style={styles.currency}>AED per day</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.subHeader}>
          <Image source={heartIcon} style={styles.heart}></Image>
          <Image source={minusIcon} style={styles.plus}></Image>
        </View>
      </View>
      <LinearGradient
        colors={[
          'rgba(202, 218, 221, 0.1)',
          'rgba(202, 218, 221, 0)',
          'rgba(202, 218, 221, 0.2)',
          'rgba(202, 218, 221, 0.2)',
          'rgba(202, 218, 221, 0.2)',
          'rgba(202, 218, 221, 0.1)',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.linear}
      >
        <View style={[styles.container, styles.shadow]}>
          <View style={styles.info}>
            <MaskedView
              maskElement={
                <Text
                  style={[styles.title, { backgroundColor: 'transparent' }]}
                >
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
            <View style={styles.roles}>
              {roles.map((role) => {
                return (
                  <View key={role.id} style={styles.role}>
                    <Text style={styles.roleName}>{role.name}</Text>
                    <Text style={styles.roleDescription}>
                      {role.description}
                    </Text>
                    <View style={styles.roleDate}>
                      <Image
                        source={calendarIcon}
                        style={styles.calendarIcon}
                      ></Image>
                      <Text style={styles.roleDateText}>{role.date}</Text>
                    </View>
                  </View>
                )
              })}
            </View>
          </View>
          <View style={styles.languages}>
            <Image source={languageIcon} style={styles.languageIcon}></Image>

            {languages.map((item, i) => {
              return (
                <Text key={i} style={styles.language}>
                  {item}
                </Text>
              )
            })}
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
                <Image source={clockIcon} style={styles.icon}></Image>
                <Text style={styles.text}> {shift}</Text>
              </View>
              <View style={styles.footerInfo}>
                <Image source={locationIcon} style={styles.icon}></Image>
                <Text style={styles.text}>{location}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </LinearGradient>
      <View style={styles.button}>
        <PrimaryButton title='Accept Applicant' />
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  wrapper: {
    height: 300,
    padding: 20,
    marginTop: 70,
    flex: 1,
  },
  linear: {
    borderRadius: 30,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.03)',
    position: 'relative',
    zIndex: 1,
    paddingTop: 30,
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
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'PoppinsS',
    marginEnd: 80,
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '92%',
    alignItems: 'center',


    padding: 20,
  },

  footerInfo: {
    flexDirection: 'row',

    alignItems: 'center',
    paddingTop: 7,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderColor: ' rgba(16, 125, 197, 1)',
    borderWidth: 1,
    zIndex: 999,
    backgroundColor: 'white',
  },
  priceBg: {
    width: 130,
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
  },
  text: {
    color: 'rgba(16, 125, 197, 1)',
    fontFamily: 'PoppinsR',
  },
  description: {
    color: '#0A084B',
    fontFamily: 'PoppinsR',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shad: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: '#171717',
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  languages: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
    marginEnd: 60,
    marginTop: -30,
    marginBottom: 20,
  },
  language: {
    fontFamily: 'PoppinsR',
  },
  description: {
    fontFamily: 'PoppinsR',
    color: '#0A084B',
  },
  languageIcon: {
    marginLeft: 20,
  },
  priceAndCurrency: {
    flexDirection: 'row',

    alignItems: 'center',
    width: '100%',
  },
  currency: {
    fontFamily: 'PoppinsR',
    fontSize: 10,
    marginTop: 3,
    color: '#107DC5',
    padding: 10,
  },
  calendarIcon: {
    marginRight: 5,
  },
  roleDate: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  roleName: {
    fontFamily: 'PoppinsR',
    fontSize: 14,
    color: '#0A084B',
    marginBottom: 5,
  },
  roleDescription: {
    fontFamily: 'PoppinsR',
    fontSize: 12,
    color: '#0A084B',
    marginBottom: 5,
  },
  role: {
    marginBottom: 20,
    borderBottomColor: '#107DC5',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  roleDateText: {
    fontFamily: 'PoppinsR',
    fontSize: 12,
    color: '#107DC5',
  },
  button:{
   alignItems: 'center',
   marginTop: 20,

  }
})
export default FreelancerDetails
