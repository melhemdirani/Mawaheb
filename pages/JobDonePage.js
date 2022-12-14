import React, { useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Platform, Pressable, TouchableOpacity } from 'react-native';
import { StackActions } from '@react-navigation/native';

import { useDispatch } from 'react-redux'
import {  getFreelancer } from '../reduxToolkit/freelancerSlice';

import Header from '../components/Header';
import congratsBg from '../assets/images/congratsBg.png';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import TertiaryButton from '../components/Buttons/TertiaryButton';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import profile from '../assets/images/profile.png';
import emptyStar from '../assets/images/emptyStar.png';
import fullStar from '../assets/images/fullStar.png';
import { setJobRated } from '../reduxToolkit/jobSlice';
import { reviewFreelancer } from '../reduxToolkit/clientSlice';


const JobDonePage = ({navigation, route}) => {
  const {user, jobId, clientId, freelancerId} = route.params
  const [prevRate, setPrevRate] = useState(0)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      getFreelancer(freelancerId)
    ).then(res => setPrevRate(res.payload.freelancer.averageRating))
    .catch(err => console.log("err", err))
  }, [])

  const navigateDash = () => {
    dispatch(
      setJobRated(jobId)
    ).unwrap()
    .then(() => {
      navigation.dispatch(
        StackActions.replace(
        'recruiter_dashboard'
      ))
    })
    .catch(err => console.log(err))
  }
  const [rate, setRate] = useState(0)


  const confirmPress = () => {
    dispatch(
      reviewFreelancer({
        jobId: jobId,
        freelancerId: freelancerId,
        clientId: clientId,
        comment: "noComment",
        rating: rate
      })
    ).unwrap()
    .then(() => {
      dispatch(
        setJobRated(jobId)
      ).unwrap()
      .then(() => {
        alert('Thank you for your feedback!')
        navigation.dispatch(
          StackActions.replace(
          'recruiter_dashboard'
        ))
      })
    })
    .catch(err => console.log(err))
  
  }
  return (
    <View style={styles.wrapper}>
      <Header title='Job done!' hidden={true} icon={user.profileImage} profile rating={prevRate.toFixed(1)}/>
      <View style={styles.container}>
        <MaskedView
          maskElement={
            <Text style={[styles.text, { backgroundColor: 'transparent' }]}>
              {`How was your experience with ${user.name}?`}
            </Text>
          }
        >
          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#31BEBB', '#655BDA']}
          >
            <Text style={[styles.text, { opacity: 0 }]}>
             {`How was your experience with ${user.name}?`}
            </Text>
          </LinearGradient>
        </MaskedView>

        <ImageBackground
          source={congratsBg}
          style={styles.congratsBg}
          resizeMode='stretch'
        >
        {[...Array(5)].map((e, i) =>   
          <Pressable onPress={() => setRate(i)} key={i}>
            <Image source={i > rate ? emptyStar : fullStar} style={styles.starts} />
          </Pressable>
        )}
        </ImageBackground>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.primary} onPress={() => confirmPress() }>
            <PrimaryButton title='Confirm' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.primary} onPress={() => navigateDash() }>
            <TertiaryButton title='Dismiss' style={styles.contactLater}  />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = Platform.OS === 'android'
  ? StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: '#fff',
    },
    container: {
      flex: 1,
      top: 20
    },
    text: {
      fontSize: 17,
      textAlign: 'center',
      marginTop: 50,
      color: '#31BEBB',
      fontFamily: 'PoppinsS',
      marginBottom: 60,
      width: '100%',
    },
    congratsBg: {
      width: '100%',
      height: 200,
      flexDirection: "row",
      alignItems: "center",
      top: -30,
      justifyContent: "space-evenly"
    },
    congratsProfileBg: {
      height: 200,
      top: -90,
      left: 100,
    },
    handShakeIcon: {
      top: -200,
      left: 140,
    },
    name: {
      fontSize: 20,
      color: '#fff',
      fontFamily: 'PoppinsS',
      textAlign: 'center',
      marginTop: -10,
    },
    btnContainer: {
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    primary: {
      marginBottom: 20,
    },
    contactLater: {},
  })
  : StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: '#fff',
    },
    container: {
      flex: 1,
      top: 20
    },
    text: {
      fontSize: 17,
      textAlign: 'center',
      marginTop: 50,
      color: '#31BEBB',
      fontFamily: 'PoppinsS',
      marginBottom: 80,
      width: '100%',
    },
    congratsBg: {
      width: '100%',
      height: 200,
      flexDirection: "row",
      alignItems: "center",
      top: -30,
      justifyContent: "space-evenly"
    },
    congratsProfileBg: {
      height: 200,
      top: -90,
      left: 100,
    },
    handShakeIcon: {
      top: -200,
      left: 140,
    },
    name: {
      fontSize: 20,
      color: '#fff',
      fontFamily: 'PoppinsS',
      textAlign: 'center',
      marginTop: -10,
    },
    btnContainer: {
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 40,
    },
    primary: {
      marginBottom: 20,
    },
    contactLater: {},
  })

export default JobDonePage
