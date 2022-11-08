import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
} from 'react-native';
import moment from 'moment';

import { useDispatch } from 'react-redux';

import { LinearGradient } from 'expo-linear-gradient';
import calendarIcon from '../assets/images/calendarIcon.png';
import checked from '../assets/images/checked.png';
import clockIcon from '../assets/images/clockIcon.png';
import locationIcon from '../assets/images/locationIcon.png';
import priceRectangle from '../assets/images/priceRectangle.png';
import heartIcon from '../assets/images/heartIcon.png';
import plusIcon from '../assets/images/plusIcon.png';
import MaskedView from '@react-native-masked-view/masked-view';
import languageIcon from '../assets/images/LanguageIcon.png';
import { getFreelancer } from '../reduxToolkit/freelancerSlice';

const JobList2 = ({
  price,
  navigate,
  job,
  freelancer,
  id,
  item,
  verified
}) => {
  const uniqueIds = [];

  const dispatch = useDispatch();

  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    dispatch(getFreelancer(freelancer.id))
    .unwrap()
    .then((res) => {
      setIsVerified(res.freelancer.isVerified)
    })
    .catch(err =>{ 
      console.log("errors", err);
  })
    
  }, [])

  const newLanguages = freelancer.languages.filter(element => {
    const isDuplicate = uniqueIds.includes(element.name);

    if (!isDuplicate) {
      uniqueIds.push(element.name);

      return true;
    }

    return false;
  });

  let rate = freelancer.roles.filter(role => {
    return role.title ===  job.title
  })

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.subHeader}>
           <View style={{alignContent: "center", justifyContent: "center"}}>
              <ImageBackground      
                  source={{uri: `http://195.110.58.234:4000${freelancer.user.profileImage}`}}
                  style={styles.profileImage}
                  imageStyle={styles.profileImage}
                  blurRadius={7}
                >
                  {isVerified && 
                    <Image
                      source={checked} 
                      style={styles.verificationMark}
                    />
                  }
              </ImageBackground>
                { freelancer.averageRating && freelancer.averageRating > 0 ?
                  <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>{freelancer.averageRating.toFixed(1)}</Text>
                  </View> : null
                }
            </View>
           
          <ImageBackground
            source={priceRectangle}
            style={styles.priceBg}
            resizeMode='contain'
          >
            <View style={styles.priceAndCurrency}>
              <Text style={styles.price}>{rate[0].dailyRate} </Text>
              <Text style={styles.currency}>AED</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.subHeader}>
          {/* <Image source={heartIcon} style={styles.heart}></Image> */}
          <Pressable onPress={() => navigate(freelancer, job)}>
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
                 {freelancer.user.name}
                </Text>
              }
            >
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['rgba(49, 190, 187, 1)', 'rgba(101, 91, 218, 1)']}
              >
                <Text style={[styles.title, { opacity: 0 }]}> {freelancer.user.name}</Text>
              </LinearGradient>
            </MaskedView>
            
            <Text style={styles.description}>{job.category} - {job.title}</Text>
            <Text style={styles.description}>{rate[0].keyResponsibilities.slice(0,40)}</Text>
          </View>
          <View style={styles.languages}>
            <Image source={languageIcon} style={styles.languageIcon}></Image>
            {newLanguages.length > 0 && newLanguages.map((language, i) => {
              return (
                <View  key={i} style={{flexDirection: "row"}}>
                  <Text style={styles.language}>{language.name}</Text>
                </View>
            )})}
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
                <Text style={styles.text}> {rate[0].endDate && moment(rate[0].endDate).format('ll')}</Text>

              </View>
              <View style={styles.footerInfo}>
                <Image source={locationIcon} style={styles.icon}></Image>
                <Text style={styles.text}>{rate[0].location}</Text>
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
    paddingHorizontal: 15,
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
    fontSize: 17,
    marginBottom: 10,
    fontFamily: 'PoppinsS',
    marginEnd: 80,
    width: '100%',
  },
  verificationMark: {
    zIndex: 999,
    top: 20,
    right: 8,
    width: 20,
    height: 20
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: 'rgba(16, 125, 197, 1)',
    borderTopWidth: 0.4,
    paddingVertical: 10,
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
    fontSize: 10
  },
  description: {
    fontFamily: 'PoppinsR',
    color: 'rgba(10, 8, 75, .6)',
    fontSize: 14
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
    marginLeft: 10,
    fontSize: 12
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
  blurredStyle: {
    height: 4,
    width: 70,
    shadowOpacity: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 5 ,
    elevation: 100,
    borderWidth: 0.5,
    borderColor: "white",
    backgroundColor: "rgba(255, 255, 255, .8)"
  },
  profileImage:{
    width: 70,
    height: 70,
    borderRadius: 50  
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
    width: 40,
    top: -10,
    justifyContent: "center",
    aligntItems: "center",
    alignSelf: "center"
  },
})
export default JobList2
