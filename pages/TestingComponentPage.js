import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'
import React from 'react'
import FormRow from '../components/FormRow'
import Header from '../components/Header'
import signUp from '../assets/images/signUp.png'
import backIcon from '../assets/images/backIcon.png'
import trash from '../assets/images/trash.png'
import SecondaryHeader from '../components/SecondaryHeader'
import Job from '../components/Job'

const TestingComponentPage = () => {
  return (
    //safe area

    <View style={styles.container}>
      {/* <Header
        icon={signUp}
        title='Jobseeker Sign up'
        // numOfPage={<Image source={trash}></Image>}
        numOfPage='1/4'
        hidden={false}
 
     
      ></Header> */}
      <SecondaryHeader name={'John'}></SecondaryHeader>
      <View style={styles.jobs}>
        <Job
          title={'Job Title Lorem Ipsum'}
          description={
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate blanditiis doloremque itaque praesentium '
          }
          price={100}
        ></Job>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  jobs: {
    padding: 10,
  },
  body: {
    padding: 20,
  },
  backIcon: {
    display: 'none',
  },
})

export default TestingComponentPage
