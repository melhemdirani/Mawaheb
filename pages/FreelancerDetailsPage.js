import React, {  useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import calendarIcon from '../assets/images/calendarIcon.png'
import clockIcon from '../assets/images/clockIcon.png'
import locationIcon from '../assets/images/locationIcon.png'
import priceRectangle from '../assets/images/priceRectangle.png'
import heartIcon from '../assets/images/heartIcon.png'
import languageIcon from '../assets/images/LanguageIcon.png'
import { clearFreelancer } from '../reduxToolkit/freelancerSlice'
import { clearJob } from '../reduxToolkit/jobSlice'
import { inviteFreelancer } from '../reduxToolkit/clientSlice'


import PrimaryButton from '../components/Buttons/PrimaryButton'
import minusIcon from '../assets/images/minusIcon.png'
import { useSelector, useDispatch } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'

const FreelancerDetailsPage = ({ navigation, route }) => {
  
  
  useEffect(() => {
    if(freelancer === undefined || job === undefined){
      alert("Freelancer not found")
      navigation.goBack()
    }
  }, [])
  const { freelancer,  job, invite} = route.params
  // let invite = jobId === "job.id" ? true : false
  const { user: userState } = useSelector((state) => state.user)


  const dispatch = useDispatch()
  const navigateContract = () => {
   if(invite){
      dispatch(inviteFreelancer({
        freelancerId: freelancer.id,
        jobId: job.id
      })).then(response => {
        console.log("response invite", response)
        alert("Invitation sent!")
        navigation.goBack()
      })
      .catch(err => {
        navigation.goBack()
        console.log("error ivnite", err)
      })
    } else{
       navigation.navigate('acceptContract', {role : 'client', freelancerId: freelancer.id, userState, jobId: job.id})
    }
  }

  const newRoles = freelancer!== undefined && freelancer.roles !== undefined ?  freelancer.roles.filter(element => {
    return [element.category === job.category]
  }): []

  const uniqueIds = [];

  const newLanguages = freelancer.languages.filter(element => {
    const isDuplicate = uniqueIds.includes(element.name);

    if (!isDuplicate) {
      uniqueIds.push(element.name);

      return true;
    }

    return false;
  });

  const navigateBack = () => {
    clearFreelancer()
    clearJob()
    navigation.goBack()
  }
  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.subHeader}>
        { freelancer.user !== undefined && freelancer.user.profileImage.length &&
          <Image      
              source={{uri: `http://194.5.157.234:4000${freelancer.user.profileImage}`}} 
              style={styles.profileImage}
              blurRadius={7}
            />
          }
          <ImageBackground
            source={priceRectangle}
            style={styles.priceBg}
            resizeMode='contain'
          >
            <View style={styles.priceAndCurrency}>
              <Text style={styles.price}>{freelancer.roles[0].dailyRate} </Text>
              <Text style={styles.currency}>AED</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.subHeader}>
          <Image source={heartIcon} style={styles.heart}></Image>
          <Pressable onPress={() => navigateBack()}>
            <Image source={minusIcon} style={styles.plus}></Image>
          </Pressable>
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
            {/* <MaskedView
              maskElement={
                <Text
                  style={[styles.title, { backgroundColor: 'transparent',  }]}
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
            </MaskedView> */}
            <View>
              <Text style={[styles.title, {color: "rgba(202, 218, 221, 0.2)"}]}> {freelancer.user.name}</Text>

            </View>
            <View style={styles.roles}>
              { 
                newRoles.length > 0 && newRoles !== undefined
                ? newRoles.map((role) => {
                return (
                  <View key={role.id} style={[styles.role, !role.isLatest && styles.role2]}>
                    <View style={{ paddingHorizontal: 20 }}>
                    { role.isLatest &&
                      <Text style={styles.roleDescription}>
                        Role: {role.title}
                      </Text>
                    }
                    <Text style={styles.roleDescription}>
                       {role.isLatest ? "Latest role" : "Most Notable"}
                      </Text>
                      <Text style={styles.roleDescription}>
                        {role.projectTitle}
                      </Text>
                    
                      <Text style={styles.roleDescription}>
                       Key responsibilities: {role.keyResponsibilities}
                      </Text>
                      <View style={styles.roleDate}>
                        <Image
                          source={calendarIcon}
                          style={styles.calendarIcon}
                        />
                        <Text style={styles.roleDateText}>{role.startDate} - {role.endDate}</Text>
                      </View>
                    </View>
                  </View>
                )
              })
              : <Text>No Relevant Roles</Text>
            }
            </View>
          </View>
          <View style={styles.languages}>
            <Image source={languageIcon} style={styles.languageIcon}></Image>
            {newLanguages.length > 0 && newLanguages.map((item, i) => {
              return (
                  <Text  style={styles.language} key={i}>
                    {item.name}
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
            style={styles.footerContainer}
          >
            <View style={styles.footerInfo}>
              <Image source={clockIcon} style={styles.icon}></Image>
              <Text style={styles.text}>Day shift</Text>
            </View>
            <View style={styles.footerInfo}>
              <Image source={locationIcon} style={styles.icon}></Image>
              <Text style={styles.text}>{freelancer.roles[0].location}</Text>
            </View>
          </LinearGradient>
        </View>
      </LinearGradient>
      <TouchableOpacity style={styles.button} onPress={() => navigateContract()}>
        <PrimaryButton title={invite ? 'Invite applicant to apply': 'Accept Applicant'}  />
      </TouchableOpacity>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  wrapper: {
    height: 300,
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    marginTop: 70,
    flex: 1,
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
    paddingVertical: 20,
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
    left: 20,
    width: '100%',
    shadowColor: "rgba(101, 91, 218, 1)",
    shadowOffset: {
      width: 5,
      height: -4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    textTransform: "capitalize",
    fontWeight: "bold",
    elevation: 10,
    textShadowColor: "rgba(101, 91, 218, 9)",
    textShadowOffset: {
      width: -4,
      height: 4,
    },
    textShadowRadius: 7,
    textTransform: "capitalize",
  },
  footerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 7,
    marginRight: 30
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: "white"
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: "wrap",
    width: '100%',
    marginTop: -30,
    marginBottom: 20,
    paddingRight: 20,
  },
  language: {
    fontFamily: 'PoppinsR',
    color: 'rgba(10, 8, 75, .6)',
    marginRight:10,
    marginLeft: 3
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
    color: 'rgba(10, 8, 75, .6)',
    marginBottom: 5,
  },
  roleDescription: {
    fontFamily: 'PoppinsR',
    fontSize: 12,
    color: 'rgba(10, 8, 75, .6)',
    lineHeight: 20,
    marginBottom: 5,
  },
  role: {
    borderBottomColor: 'rgba(16, 125, 197, .3)',
    paddingBottom: 20,
  },
  role2: {
    borderBottomWidth: 1,
    marginBottom: 25,

  },
  roleDateText: {
    fontFamily: 'PoppinsR',
    fontSize: 12,
    color: '#107DC5',
  },
  button: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 90,
  },
  footerContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
    paddingVertical: 20,
    paddingLeft: 20,
  },
})
export default FreelancerDetailsPage
