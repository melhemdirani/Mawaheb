import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../components/Header';
import Inputs from '../components/Inputs';
import PrimaryButton from '../components/Buttons/PrimaryButton';

import signUp from '../assets/images/signUp.png';
import { updateUserPassword } from '../reduxToolkit/userSlice';


const UpdatePasswordPage = ({navigation, route}) => {
  const dispatch = useDispatch()
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [loading, setLoading] = useState(false)
  const containsNumbers = (str) => {
    return /\d/.test(str);
  }
  const updatePass = () => {
    if(newPassword !== password2 ){
      return alert("Error, passwords don't match!")
    }
    else if (newPassword.length < 8 || !containsNumbers(newPassword)){
      return alert("Password must be at least 8 characters with 1 upper case letter and 1 number")
    }
    setLoading(true)
    dispatch(
      updateUserPassword({
        oldPassword,
        newPassword
      })
    )
    .unwrap()
    .then( res => {
      setLoading(false)
      alert("Password updated!")
      navigation.goBack()
    })
    .catch(err => {
      console.log("error", err)
      setLoading(false)
      alert("Error updating password please enter the right credentials")
    })
  }

  return loading? <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
    <ActivityIndicator size={"large"}  color="#4E84D5"/>
  </View>
  :(
    <View style={styles.wrapper}>
      <Header title='Update your password' icon={signUp} hidden={false} goBack={navigation.goBack}/>
      <View style={styles.container}>
        <View style={styles.form}>
            <Inputs
                placeholder='Enter your old password'
                onChange={(value) => setOldPassword(value)}
                value={oldPassword}
            />
            <Inputs
                placeholder='Enter your new password'
                onChange={(value) => setNewPassword(value)}
                value={newPassword}
            />
             { 
                newPassword !== "" && (newPassword.length < 8 || !containsNumbers(newPassword) )&& 
                <Text style={styles.warning}>
                  Password must be at least 8 characters with 1 upper case letter and 1 number
                </Text>
              }
            <Inputs
                placeholder='Confirm your new password'
                onChange={(value) => setPassword2(value)}
                value={password2}
            />
               { 
                newPassword !== password2 && password2 !== "" &&
                <Text style={styles.warning}>
                  passwords don't match
                </Text>
              }
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => updatePass()}>
           <PrimaryButton  title='Save' />
          </TouchableOpacity>
          <SafeAreaView style={styles.btn}>
            <Pressable onPress={() => navigation.goBack()}>
             <Text style={styles.btnText}>Cancel</Text>
            </Pressable>
          </SafeAreaView>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    flex: 1,
  },
  container: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: "space-between",
    flex: .7
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
    marginVertical: 10,
    zIndex: 9999
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
    maxWidth: "90%",
  }
})


export default UpdatePasswordPage
