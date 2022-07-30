import { StatusBar } from 'expo-status-bar'
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button,
} from 'react-native'
import AddRoleButton from '../components/Buttons/AddRoleButton'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import SecondaryButton from '../components/Buttons/SecondaryButton'
import TertiaryButton from '../components/Buttons/TertiaryButton'
import DailyRate from '../components/DailyRate'
import DurationInputs from '../components/DurationInputs'
import Inputs from '../components/Inputs'
import Notification from '../components/Notification'
import SelectInput from '../components/SelectInput'
import TextArea from '../components/TextArea'
import UploadCard from '../components/UploadCard'
import axios from 'axios'
import { useEffect } from 'react'

export default function SignupPage({ navigation }) {
  const register = async () => {
    let url = "http://192.168.16.102:4000/api/v1/auth/register"

    try {
      const {data} = await axios.post(url,{
        name:"melhem",
        email:"melhem@melhem",
        password:"123456",
        role:"client",
        phoneNb:"0541234567"

      })
   const {user}=data
    console.log(user)
      
    } catch (error) {
      console.log(error.response.data.msg)
    }

  }

  useEffect(() => {}, [])

  const navigateJob = () => {
    navigation.navigate('JobSignUp')
  }
  const navigateLogin = () => {
    navigation.navigate('login')
  }
  const navigateCSignup = () => {
    navigation.navigate('recruiter_signup')
  }

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
      <Button title='clickme' onPress={() => register()}></Button>
      <PrimaryButton title='Jobseeker Sign up' navigate={navigateJob} />
      <View style={styles.spacing} />
      <SecondaryButton title='Recruiter Sign up' navigate={navigateCSignup} />
      <View style={styles.spacing} />
      <TertiaryButton title='Login' navigate={navigateLogin} />
    </View>
  )
}

const styles = StyleSheet.create({
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
  },
  spacing: {
    marginBottom: 15,
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
