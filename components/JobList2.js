import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import calendarIcon from '../assets/images/calendarIcon.png';
import clockIcon from '../assets/images/clockIcon.png';
import locationIcon from '../assets/images/locationIcon.png';
import priceRectangle from '../assets/images/priceRectangle.png';
import heartIcon from '../assets/images/heartIcon.png';
import plusIcon from '../assets/images/plusIcon.png';
import MaskedView from '@react-native-masked-view/masked-view';
import languageIcon from '../assets/images/LanguageIcon.png';

const JobList2 = ({
  roles,
  languages,
  user,
  id,
  navigate
}) => {

  console.log("roles", roles)
  const uniqueIds = [];

  const newLanguages = languages.filter(element => {
    const isDuplicate = uniqueIds.includes(element.name);

    if (!isDuplicate) {
      uniqueIds.push(element.name);

      return true;
    }

    return false
  });
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.subHeader}>
          <View style={styles.circle}></View>
          <ImageBackground
            source={priceRectangle}
            style={styles.priceBg}
            resizeMode='contain'
          >
            <View style={styles.priceAndCurrency}>
              <Text style={styles.price}>{roles.length > 0 && roles[0].dailyRate}</Text>
              <Text style={styles.currency}>AED</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.subHeader}>
          <Image source={heartIcon} style={styles.heart}></Image>
          <Pressable onPress={() => navigate(id,2000,"job.location","job.id")}>
            <Image source={plusIcon} style={styles.plus}></Image>
          </Pressable>
        </View>
      </View>
      <LinearGradient
        colors={[
          'rgba (202, 218, 221, 0.1)',
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
                  Blurred Name
                </Text>
              }
            >
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['rgba(49, 190, 187, 1)', 'rgba(101, 91, 218, 1)']}
              >
                <Text style={[styles.title, { opacity: 0 }]}>{user.name}</Text>
              </LinearGradient>
            </MaskedView>
            
          </View>
          <View style={styles.languages}>
            <Image source={languageIcon} style={styles.languageIcon}></Image>
            {newLanguages.length > 0 && newLanguages.map((language, i) => {
              return <Text key={i} style={styles.language}>{language.name}</Text>
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
                <Image source={calendarIcon} style={styles.icon}></Image>
                <Text style={styles.text}> {user.createdAt.slice(0,9)}</Text>
              </View>
              <View style={styles.footerInfo}>
                <Image source={clockIcon} style={styles.icon}></Image>
                <Text style={styles.text}>Day shift</Text>
              </View>
              <View style={styles.footerInfo}>
                <Image source={locationIcon} style={styles.icon}></Image>
                <Text style={styles.text}>Location</Text>
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
    height: 300,
    marginTop: -5,
    paddingHorizontal: 15
  },
  linear: {
    borderRadius: 30,
  },
  container: {
    justifyContent: 'center',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: 'rgba(16, 125, 197, 1)',
    borderTopWidth: 0.4,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },

  footerInfo: {
    flexDirection: 'row',
    marginHorizontal: 12,
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
    fontFamily: 'PoppinsR',
    color: 'rgba(10, 8, 75, .6)',
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '80%',
    marginEnd: 60,
    marginTop: -10,
    marginBottom: 20,
  },
  language: {
    fontFamily: 'PoppinsR',
    color: 'rgba(10, 8, 75, .6)',
    marginLeft: 10
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
    marginLeft: 7,
    color: '#107DC5',
    padding: 10,
  },
})
export default JobList2
