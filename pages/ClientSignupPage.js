import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Switch,
} from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import signUp from '../assets/images/signUp.png'
import Inputs from '../components/Inputs'
import UploadCard from '../components/UploadCard'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import TertiaryButton from '../components/Buttons/TertiaryButton'
import SecondaryButton from '../components/Buttons/SecondaryButton'

const ClientSignupPage = () => {
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
            <Text style={styles.public}>Public </Text>
            <Switch
              style={styles.switch}
              ios_backgroundColor='green'
              trackColor={{ false: '#767577', true: '#23CDB0' }}
              thumbColor={'#f4f3f4'}
              onValueChange={toggleSwitch}
              value={isEnabled}
            ></Switch>
            <Text style={styles.private}> Private</Text>
          </View>
          <Inputs placeholder='Address*' style={styles.input} />
          <Inputs placeholder='TRN(Tax Number)*' style={styles.input} />
          <UploadCard title='Trading Liscence*' />
        </View>
        <View style={styles.btnContainer}>
          <PrimaryButton title='Sign up' />
          <View style={styles.btn}>
            <Text style={styles.btnText}>Login</Text>
          </View>
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
    fontSize: 15,
    fontFamily: 'PoppinsR',
  },
  form: {
    width: '90%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
  },
  btn: {
    marginTop: 15,
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
    marginVertical: 5,
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
})

export default ClientSignupPage
