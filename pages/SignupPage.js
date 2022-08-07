import { StatusBar } from 'expo-status-bar'
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  Button,
} from 'react-native'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import SecondaryButton from '../components/Buttons/SecondaryButton'
import TertiaryButton from '../components/Buttons/TertiaryButton'
import axios from 'axios'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function SignupPage({ navigation }) {
  const navigateJob = () => {
    navigation.navigate('JobSignUp', { role: 'freelancer' })
  }
  const navigateLogin = () => {
    navigation.navigate('login')
  }
  const navigateCSignup = () => {
    navigation.navigate('JobSignUp', { role: 'client' })
  }
  const { user } = useSelector((store) => store.user)
  useEffect(() => {
    if (Object.keys(user).length > 0) {
      if (user.role === 'freelancer') {
        navigation.navigate('jobseeker_jobs')
      }
      if (user.role === 'client') {
        navigation.navigate('recruiter_dashboard')
      }
    }
  }, [user])

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/images/signupheader.png')}
      />
      <Text style={styles.header}>Quick Easy Simple!</Text>
      <Text style={styles.text}>
        <Text style={styles.text1}>Mawahib </Text>
        connects businesses with independent professionals and agencies around
        the MENA region.
      </Text>
      <PrimaryButton title='Jobseeker Sign up' navigate={navigateJob} />
      <View style={styles.spacing} />
      <SecondaryButton title='Recruiter Sign up' navigate={navigateCSignup} />
      <View style={styles.spacing} />
      <TertiaryButton title='Login' navigate={navigateLogin} />
    </View>
  )
}

const styles =
  Platform.OS === 'android'
    ? StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'white',
        },
        header: {
          position: 'absolute',
          top: 108,
          alignSelf: 'flex-start',
          fontSize: 40,
          fontWeight: '800',
          maxWidth: '40%',
          height: 300,
          color: 'white',
          left: 15,
          lineHeight: 45,
          fontFamily: 'PoppinsB',
        },
        image: {
          width: '100%',
          height: 490,
          marginTop: -50,
        },
        spacing: {
          marginBottom: 15,
        },
        text: {
          color: 'black',
          width: '90%',
          marginTop: 15,
          fontSize: 16,
          lineHeight: 18,
          marginBottom: 20,
          fontFamily: 'PoppinsR',
        },
        text1: {
          color: '#9C88FD',
          fontWeight: '700',
        },
      })
    : StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'white',
        },
        header: {
          position: 'absolute',
          top: 88,
          alignSelf: 'flex-start',
          fontSize: 40,
          fontWeight: '800',
          maxWidth: '55%',
          height: 300,
          color: 'white',
          left: 15,
          lineHeight: 45,
          fontFamily: 'PoppinsB',
        },
        image: {
          width: '100%',
          height: 500,
        },
        spacing: {
          marginBottom: 10,
        },
        text: {
          color: 'black',
          width: '90%',
          marginTop: 30,
          fontSize: 17,
          lineHeight: 25,
          marginBottom: 30,
          fontFamily: 'PoppinsR',
        },
        text1: {
          color: '#9C88FD',
          fontWeight: '700',
        },
      })
