import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'
import React from 'react'
import FormRow from '../components/FormRow'
import Header from '../components/Header'
import signUp from '../assets/signUp.png'
import backIcon from '../assets/backIcon.png'
import trash from '../assets/trash.png'

const TestingComponentPage = () => {
  return (
    //safe area

    <View style={styles.container}>
      <Header
        icon={signUp}
        title='Jobseeker Sign up'
        numOfPage={'1/4'}
      ></Header>
      <Text style={styles.text}>Testing Component Page</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    position: 'absolute',
    top: '30%',
  },
})

export default TestingComponentPage
