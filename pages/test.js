import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    ActivityIndicator
  } from 'react-native';
import axios from 'axios';


import { clearNotifications } from '../redux/user/user.actions';

import signUp from '../assets/images/signUp.png';

import Header from '../components/Header';
import Inputs from '../components/Inputs';
import PrimaryButton from '../components/Buttons/PrimaryButton';

const JobSeekersignup = ({  navigation, notifications, clearNotifications }) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log("notifications")
    clearNotifications()
  }, [])

  const [clearUser, setClearUser] = useState(false)

  useEffect(() => {
    if(!clearUser){
      setClearUser(true)
    }
  }, [])

  const navigate2 = () => {
    navigation.navigate("JobSignUpb")
  }
  const login = async () => {
    let url = "http://194.5.157.234:4000/api/v1/auth/login"
    try {
    const data = await axios.post(url,{
      email:'Abc',
      password: 'abc',
    })
    const {user}=data.data
    const status = data.status
    navigate2()
    setLoading(false)

    } catch (error) {
      console.log(error.response.data.msg)
      setLoading(false)
      alert("Error logging in")
    }
  }
 

  const register = async () => {
    let url = "http://194.5.157.234:4000/api/v1/auth/register"
    if(name === '' || email === '' || phone === '' || password === '' ){
      return alert('Please fill in all required inputs*')
    }
    setLoading(true)
    try {
    const data = await axios.post(url,{
      name:name,
      email:email,
      password: password,
      role:"freelancer", // set to role from store
      phoneNb: phone
    })
    const {user}= data.data
    console.log("user", user)
    const status =  data.status
    navigate2()
    setLoading(false)
    } catch (error) {
      console.log(error.response.data.msg)
        setLoading(false)
      if(error.response.data.msg === 'Email already in use'){
        alert('Email already in use, please try again with a different email address')
      }
    }
  }
  const logout = async () => {
    let url = "http://194.5.157.234:4000/api/v1/auth/logout/"

    try {
      const data = await axios.get(url)
     console.log("data",data)
      
    } catch (error) {
      console.log(error.response.data.msg)
    }

  }



  return loading ?
    <View  style={styles.loadingStyle}>
      <ActivityIndicator size={'large'}/>
    </View>
    :(
      <ScrollView style={styles.container}>
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
            Fill and upload the below required field and documents {name}
          </Text> 
          <Inputs title='Continue to Payment' placeholder='Name*' onChange={setName}/>
          <Inputs title='Continue to Payment' placeholder='Email*' onChange={setEmail} />
          <Inputs title='Continue to Payment' placeholder='Password*' onChange={setPassword} />
          <Inputs title='Continue to Payment' placeholder='Phone Number*' onChange={setPhone}/>
          <Pressable style={styles.nextButton} >
            <PrimaryButton title='Next' navigate={register} />
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
    justifyContent: "center",
    height: 230,
    width: "85%",
    borderRadius: 20,
    marginVertical: 10
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
  loadingStyle:{
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  }
})
const mapStateToProps =  ({
  user: {user},
  id: {id},
  notifications: {notifications},
  name: {name},
})   => ({
  user,
  notifications,
  name,
  id,
})

const mapDispatchToProps = (dispatch) => ({
  clearNotifications: () => clearNotifications(),
});



export default JobSeekersignup
