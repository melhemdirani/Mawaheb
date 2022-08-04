import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Button,
} from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'

import { clearNotifications } from '../redux/user/user.actions'

import signUp from '../assets/images/signUp.png'

import Header from '../components/Header'
import Inputs from '../components/Inputs'

import PrimaryButton from '../components/Buttons/PrimaryButton'
import { useSelector, useDispatch } from 'react-redux'
import { registerUser } from '../reduxToolkit/userSlice'

const JobSeekersignup = ({ navigation, route }) => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    phoneNb: '',
  }
  const [values, setValues] = useState(initialState)
  const dispatch = useDispatch()
  const { user, isLoading, error } = useSelector((store) => store.user)
  const { role } = route.params
  console.log(role)
  const handleChange = (name, value) => {
    console.log(values)
    setValues({ ...values, [name]: value })
  }
  // setTimeout(() => {
  //   navigation.navigate('SignIn')
  // }, 2000)

  const submit = () => {
    const { name, email, password, phoneNb } = values
    if (!name || !email || !password || !phoneNb) {
      alert('Please fill all the fields')
    }
    console.log(user, error)
    dispatch(
      registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
        phoneNb: values.phoneNb,
        role: role,
      })
    )
  }
  useEffect(() => {
    if (user) {
      user?.role === 'freelancer'
        ? navigation.navigate('JobSignUpb')
        : navigation.navigate('JobSignUp2')
    }
  }, [user])

  return isLoading ? (
    <View style={styles.loadingStyle}>
      <ActivityIndicator size={'large'} />
    </View>
  ) : (
    <ScrollView style={styles.container}>
      <Header
        icon={signUp}
        title='Create Profile'
        // numOfPage={<Image source={trash}></Image>}
        numOfPage='1/6'
        hidden={false}
      />
      <View style={styles.subContainer}>
        <Text style={styles.text}>
          Fill and upload the below required field and documents
        </Text>
        <Inputs
          title='Continue to Payment'
          placeholder='Name*'
          onChange={(value) => handleChange('name', value)}
        />
        <Inputs
          title='Continue to Payment'
          placeholder='Email*'
          onChange={(value) => handleChange('email', value)}
        />

        <Inputs
          title='Continue to Payment'
          placeholder='Password*'
          onChange={(value) => handleChange('password', value)}
        />
        <Inputs
          title='Continue to Payment'
          placeholder='Phone Number*'
          onChange={(value) => handleChange('phoneNb', value)}
        />
        <Pressable style={styles.nextButton}>
          <PrimaryButton title='Next' navigate={submit} />
        </Pressable>
      </View>
    </ScrollView>
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
