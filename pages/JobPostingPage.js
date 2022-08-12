import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  KeyboardAvoidingView
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux';

import { createJob } from '../reduxToolkit/jobSlice';

import Header from '../components/Header';
import post from '../assets/images/postJob.png';
import Inputs from '../components/Inputs';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import SelectInput from '../components/SelectInput';
import DateInputs from '../components/DateInputs';
import TextArea from '../components/TextArea';

const JobPostingPage = ({navigation}) => {
  const initialState = {
    title: '',
    startDate: new Date(),
    endDate: new Date(),
    location: '',
    yearsOfExperience: '',
    description: '',
    budget: '',
    duration: 2
  }

  const { user } = useSelector((state) => state.user)
  const [isEnabled, setIsEnabled] = useState(false)
  const dispatch = useDispatch()
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)
  const [values, setValues] = useState(initialState)
  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value })
  }
  const paymentNav = () => {
    //add job with values and client id
    if(
      values.title === '' ||
      values.startDate  === '' ||
      values.endDate  === '' ||
      values.location === '' ||
      values.yearsOfExperience  === '' ||
      values.budget  === '' ||
      values.description === '' ||
      values.privacy === ''
    ){
      console.log("values", values)
      return alert("Please fill in all required Information")
    } else{
      dispatch(
        createJob({
          title: values.title,
          startDate: values.startDate,
          endDate: values.endDate,
          location: values.location,
          yearsOfExperience: values.yearsOfExperience,
          description: values.description,
          budget: values.budget,
          privacy: 'public',
          clientId: user.clientId,
          duration: new Date()
        })
      )
      navigation.navigate("recruiter_dashboard")
    }

  
  }

  return (
    <ScrollView style={styles.wrapper}>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={-409}>

      <Header 
        title='Post a Job' 
        icon={post} 
        numOfPage='1/2'
        hidden={false}
        goBack={navigation.goBack}
        />

      <View style={styles.container}>
        <Text style={styles.text}>Let us know what are you looking for, and fill in some details find better qualified matches. </Text>
        <View style={styles.form}>
         
            <Inputs
              placeholder='Job Title*'
              style={styles.input}
              onChange={(value) => handleChange('title', value)}
              value={values.title}
            />
            <DateInputs onChange={(value) => handleChange('startDate', value)} placeholder="Start Date" dateType/>
            <DateInputs onChange={(value) => handleChange('endDate', value)} placeholder="End Date" dateType/>
            <Inputs
              placeholder='Location*'
              style={styles.input}
              onChange={(value) => handleChange('location', value)}
              value={values.location}
            />
            <Inputs
              placeholder='Years of experience*'
              style={styles.input}
              onChange={(value) => handleChange('yearsOfExperience', value)}
              value={values.yearsOfExperience}
            />
            <SelectInput
              title='Budget'
              list={['option1', 'option2', 'option3']}
              onSelect={(value) => handleChange('budget', value)}
              value={values.budget}
            />
            <TextArea
              placeholder='Job Description*'
              onChange={(value) => handleChange('description', value)}
              value={values.description}
            />
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

        <TouchableOpacity style={styles.btnContainer} onPress={() => paymentNav()}>
          <PrimaryButton title='Continue to Payment' />
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>

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
    color: "rgba(0,0,0,.6)",
    width: "60%"
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
