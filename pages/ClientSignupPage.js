import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
  SafeAreaView
} from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import signUp from '../assets/images/signUp.png'
import Inputs from '../components/Inputs'
import UploadCard from '../components/UploadCard'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import TertiaryButton from '../components/Buttons/TertiaryButton'
import SecondaryButton from '../components/Buttons/SecondaryButton'

const ClientSignupPage = ({navigation}) => {

  const navigateLogin = () => {
    navigation.navigate("login")
  } 
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)
  return (
    <ScrollView style={styles.wrapper}>
      <Header title='Client Sign Up' icon={signUp} hidden={true} />
      <View style={styles.container}>
        <Text style={styles.text}>Answer the questions below in order to </Text>
        <Text style={styles.text}>find the best job for you</Text>
        <View style={styles.form}>
          <Inputs placeholder='company Name*' style={styles.input} />
          <View style={styles.privacy}>
            <Text style={!isEnabled ? styles.picked : styles.notPicked}>Public </Text>
            <Switch
              style={styles.switch}
              ios_backgroundColor='#23CDB0'
              trackColor={{ false: '#23CDB0', true: '#23CDB0' }}
              thumbColor={'#f4f3f4'}
              onValueChange={toggleSwitch}
              value={isEnabled}
            ></Switch>
            <Text style={isEnabled ? styles.picked : styles.notPicked}> Private</Text>
          </View>
          <Inputs placeholder={isEnabled?'Address*':"Signatory Name*"} style={styles.input} />
          <Inputs placeholder={isEnabled?'TRN(Tax Number)*':"Signatory Title"} style={styles.input} />
          <UploadCard title={isEnabled?'Trading Liscence*':"Add Authorized Signatory"} />
        </View>
        <View style={styles.btnContainer}>
          <PrimaryButton title='Sign up' />
          <SafeAreaView style={styles.btn}>
            <Pressable onPress={() => navigateLogin()}>
             <Text style={styles.btnText}>Login</Text>
            </Pressable>
          </SafeAreaView>
        </View>
      </View>
    </ScrollView>
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
    color: "rgba(0,0,0,.6)"
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

  }
})

export default ClientSignupPage
