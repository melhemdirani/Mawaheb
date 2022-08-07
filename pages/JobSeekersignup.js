import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native'
import axios from 'axios'


import signUp from '../assets/images/signUp.png'

import Header from '../components/Header'
import Inputs from '../components/Inputs'

import PrimaryButton from '../components/Buttons/PrimaryButton'
import { useSelector, useDispatch } from 'react-redux'
import { registerUser } from '../reduxToolkit/userSlice'
import PhoneInputs from '../components/PhoneInput'

const JobSeekersignup = ({ navigation, route }) => {

  const [clearedUser, setClearedUser] = useState(false)

 
  const initialState = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    phoneNb: '',
  }
  const [values, setValues] = useState(initialState)
  const dispatch = useDispatch()
  const { user, isLoading, error } = useSelector((store) => store.user)
  const { role } = route.params

  const handleChange = (name, value) => {
    console.log(values)
    setValues({ ...values, [name]: value })
  }


  const submit = () => {
    const { name, email, password, phoneNb } = values
    if (!name || !email || !password || !phoneNb) {
      alert('Please fill all the fields')
    }
    console.log(user, error)
    dispatch(
      registerUser({
        name: values.name + " " + values.lastName,
        email: values.email,
        password: values.password,
        phoneNb: values.phoneNb,
        role: role,
      })
    )
  }
  useEffect(() => {
    console.log("navigating users", Object.keys(user).length !== 0)
    console.log("navigating users2", user)
    if (Object.keys(user).length !== 0) {
      user.role === 'freelancer'
        ? navigation.navigate('JobSignUpb')
        : navigation.navigate('recruiter_signup')
    }
  }, [user])

  return isLoading ? (
    <View style={styles.loadingStyle}>
      <ActivityIndicator size={'large'} />
    </View>
  ) : (
      <View style={styles.container}>
        <KeyboardAvoidingView   behavior={Platform.OS === 'ios' ? 'position' : 'paddingBottom'}   style={{backgroundColor: "white"}}  >
          <ScrollView>
            <Header
              icon={signUp}
              title='Create Profile'
              // numOfPage={<Image source={trash}></Image>}
              numOfPage='1/6'
              hidden={false}
              goBack={navigation.goBack}
            />
            <View style={styles.subContainer}>
              <Text style={styles.text}>
                Fill and upload the below required field and documents
              </Text>
              <Inputs
                title='Continue to Payment'
                placeholder='First Name*'
                onChange={(value) => handleChange('name', value)}
                value={values.name}
              />
              <Inputs
                title='Continue to Payment'
                placeholder='Last Name*'
                onChange={(value) => handleChange('lastName', value)}
                value={values.lastName}
              />
              <Inputs
                title='Continue to Payment'
                placeholder='Email*'
                onChange={(value) => handleChange('email', value)}
                value={values.email}
              />

              <Inputs
                title='Continue to Payment'
                placeholder='Password*'
                onChange={(value) => handleChange('password', value)}
                value={values.password}
              />
              <PhoneInputs
                title='Continue to Payment'
                placeholder='Phone Number*'
                onChange={(value) => handleChange('phoneNb', value)}
                value={values.phoneNb}
              />
              <TouchableOpacity style={styles.nextButton} onPress={() => submit()}>
                <PrimaryButton title='Next' />
              </TouchableOpacity>
            </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  Imagecontainer: {
    justifyContent: 'center',
    height: 230,
    width: '85%',
    borderRadius: 20,
    marginVertical: 10,
  },
  subContainer: {
    alignItems: 'center',
    paddingTop: 50,
  },
  text: {
    width: '70%',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 15,
    color: 'rgba(0,0,0,0.6)',
  },
  nextButton: {
    paddingVertical: 40,
  },
  loadingStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
})

export default JobSeekersignup
