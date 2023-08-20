import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useDispatch, useSelector } from 'react-redux';
import { createClientProfile } from '../reduxToolkit/clientSlice';
import { StackActions } from '@react-navigation/native';

import Header from '../components/Header';
import Inputs from '../components/Inputs';
import PrimaryButton from '../components/Buttons/PrimaryButton';

import signUp from '../assets/images/signUp.png';
import { registerUser, testRegister } from '../reduxToolkit/userSlice';
import PhoneInputs from '../components/PhoneInput';

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';


const CreateClientPage = ({navigation}) => {
  const { token } = useSelector((store) => store.user)
  const [changed, setChanged] = useState(false)
  const [password2, setPassword2] = useState("")

  const initialState = {
    companyName: '',
    email:"",
    password:"",
    phoneNb: "",
  }

  const [values, setValues] = useState(initialState)
  const dispatch = useDispatch()
  
  const containsNumbers = (str) => {
    return /\d/.test(str);
  }
  const navigateLogin = () => {
    navigation.dispatch(
      StackActions.replace('login', {edit: false})
    )
  }
 

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value })
    setChanged(true)
  }


  const onSubmit = () => {
    const {
      companyName,
      privacy,
      email,
      phoneNb,
      password,
    } = values
    if (
      privacy === 'public' &&
      (!companyName  || !email || !password || !phoneNb ) 
    ) {
       return alert('Please fill all fieldss')
    } 
    if(password !== password2 ){
      return alert("Error, passwords don't match!")
    }
    else if (password.length < 8 || !containsNumbers(values.password)){
      return alert("Password must be at least 8 characters with 1 upper case letter and 1 number")
    }
    else { 
      dispatch(
        testRegister({
          name: companyName,
          email: values.email.toLowerCase(),
          password: values.password,  
          phoneNb: phoneNb,
          notificationToken: token,
          role: 'client',
        })
      )
      .unwrap()
      .then((response) => {
        console.log("response registiring", response)
        navigation.dispatch(
            StackActions.replace('otp', {update: false, role: "client"})
          )
      })
      .catch((error) => {
        if(error === "Email already in use"){
          alert("This email is already in use, please register using another email address")
        } else{
          alert("Error registering")
        }
        console.log("error", error.message)
      })
    }
  }

  
  const goBack = () => {
    navigation.dispatch(
      StackActions.replace('SignIn')
    )
  }


  return (

    <KeyboardAvoidingWrapper>
      <>
        <Header title='Client Sign Up' icon={signUp} hidden={false} goBack={goBack}/>
        <View style={styles.container}>
          <Text style={styles.text}>All you need is to fill your information below and upload a document to create your profile. </Text>
          
          <View style={styles.form}>
            <Inputs
              placeholder='Company Name*'
              style={styles.input}
              onChange={(value) => handleChange('companyName', value)}
              value={values.companyName}
            />
            <Inputs
              placeholder='Email*'
              onChange={(value) => handleChange('email', value)}
              value={values.email}
            />
            <PhoneInputs
              placeholder='Phone number*'
              onChange={(value) => handleChange('phoneNb', value)}
              value={values.phoneNb}
            />
            <View style={{marginTop: 20}}/>
            <Inputs
              placeholder='Password*'
              onChange={(value) => handleChange('password', value)}
              value={values.password}
            />
            { 
              values.password !== "" && (values.password.length < 8 || !containsNumbers(values.password) )&& 
              <Text style={styles.warning}>
                Password must be at least 8 characters with 1 upper case letter and 1 number
              </Text>
            }
            <Inputs
              placeholder='Confirm Password*'
              onChange={(e) => setPassword2(e)}
              value={password2}
            />
            { 
              values.password !== password2 && password2 !== "" &&
              <Text style={styles.warning}>
                passwords don't match
              </Text>
            }
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={() => onSubmit()}>
            <PrimaryButton  title='Sign up' />
            </TouchableOpacity>
            <SafeAreaView style={styles.btn}>
              <Pressable onPress={() => navigateLogin()}>
              <Text style={styles.btnText}>Login</Text>
              </Pressable>
            </SafeAreaView>
          </View>
        </View>
      </>
    </KeyboardAvoidingWrapper>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    flex: 1,
  },
  container: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 13,
    fontFamily: 'PoppinsR',
    color: "rgba(0,0,0,.6)",
    alignSelf: "center",
    textAlign: "center",
    width: "80%"
  },
  form: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    width: '90%',
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 40
  },
  btn: {
    marginTop: 10,
  },
  btnText: {
    fontSize: 15,
    fontFamily: 'PoppinsS',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  privacy: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    top: -5,
    marginBottom: 8
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  notPicked:{
    fontFamily: "PoppinsL",
    color: "rgba(0,0,0,.5)",
    fontSize: 15
  },
  picked:{
    fontFamily: "PoppinsL",
    fontSize: 15

  },
  Imagecontainer: {
    justifyContent: "center",
    height: 230,
    width: "85%",
    borderRadius: 20,
    marginVertical: 10
  },
  ActivityIndicator:{
    position: "absolute",
    zIndex: 999,
    alignItems: "center",
    justifyContent: "center",
    height: 230,
    backgroundColor:"rgba(255,255,255,.8)",
    width: "85%",
    marginVertical: 10
  },
  warning:{
    alignSelf: "flex-end",
    marginTop: -10,
    marginBottom: 10,
    right: 30,
    color: "#BE3142",
    fontSize: 10,
    maxWidth: "90%"
  }
})


export default CreateClientPage
