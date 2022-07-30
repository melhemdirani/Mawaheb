import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Switch,
  SafeAreaView
} from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import post from '../assets/images/postJob.png'
import Inputs from '../components/Inputs'
import UploadCard from '../components/UploadCard'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import TertiaryButton from '../components/Buttons/TertiaryButton'
import SecondaryButton from '../components/Buttons/SecondaryButton'
import SelectInput from '../components/SelectInput'
import DurationInputs from '../components/DurationInputs'
import TextArea from '../components/TextArea'

const JobPostingPage = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

  const paymentNav = () => {
    navigation.navigate('payment')
  }
  return (
    <ScrollView style={styles.wrapper}>
      <Header 
        title='Post a Job' 
        icon={post} 
        numOfPage='1/2'
        hidden={false}
        goBack={navigation.goBack}
        />
      <View style={styles.container}>
        <Text style={styles.text}>Answer the questions below in order to </Text>
        <Text style={styles.text}>find the best job for you</Text>
        <View style={styles.form}>
            <SelectInput title="Job Title" list={["Senior Production Manager", "option2", "option3"]}/> 
            <DurationInputs placeholder="Job Duration*"/>  
            <Inputs placeholder='Location*' style={styles.input} />
            <Inputs placeholder='Years of experience*' style={styles.input} />
            <SelectInput title="Budget" list={["option1", "option2", "option3"]}/> 
            <TextArea  placeholder="Job Description*"/>  
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
        </View>
        <View style={styles.btnContainer}>
          <PrimaryButton title='Continue to Payment' navigate={paymentNav}/>
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

export default JobPostingPage
