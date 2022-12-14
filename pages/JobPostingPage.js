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

import { RoleList, listofCities } from '../assets/data/RolesList';
import Header from '../components/Header';
import post from '../assets/images/postJob.png';
import Inputs from '../components/Inputs';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import SelectInput from '../components/SelectInput';
import DateInputs from '../components/DateInputs';
import TextArea from '../components/TextArea';
import DailyRate from '../components/DailyRate';

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const JobPostingPage = ({navigation}) => {
  const initialState = {
    title: '',
    startDate: '',
    endDate: '',
    location: '',
    yearsOfExperience: '2',
    description: '',
    budget: '',
    duration: 2,
    category: '',
    shift: ''
  }

  const [index, setIndex] = useState(0)
  const { user } = useSelector((state) => state.user)
  const { client } = useSelector((state) => state.client)
  const [isEnabled, setIsEnabled] = useState(false)
  const dispatch = useDispatch()
  const toggleSwitch = () => setIsEnabled(!isEnabled)
  const [values, setValues] = useState(initialState)
  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value })
  }

  const paymentNav = () => {
    //add job with values and client id
      // return(compareDates(values.startDate, values.endDate))
    if(
      values.title === '' ||
      values.startDate  === '' ||
      values.endDate  === '' ||
      values.location === '' ||
      values.budget  === '' ||
      values.description === '' ||
      values.shift === ''
    ){
      console.log("values", values)
      return alert("Please fill in all required Information")
    } else{
      console.log("calu", values.shift)
   
      navigation.navigate("payment", {values})

      // dispatch(
      //   createJob({
      //     category: values.category,
      //     title: values.title,
      //     startDate: values.startDate,
      //     endDate: values.endDate,
      //     location: values.location,
      //     yearsOfExperience: values.yearsOfExperience,
      //     description: values.description,
      //     budget: parseInt(values.budget),
      //     privacy: isEnabled ? 'private' : 'public',
      //     clientId: user.clientId? user.clientId : client.id,
      //     duration: new Date(),
      //     shift: values.shift
      //   })
      // )
      // .unwrap()
      // .then((response) => {
      //   console.log("job for posting", response)
      //   let date = new Date()
      //   navigation.navigate('recruiter_dashboard', {id: date.toDateString()})
      // })
      // .catch((error) => {
      //   console.log("error updating", error)
      //   alert("Error creating a job, please try again later")
      //   navigation.navigate("recruiter_dashboard")
      // })
    }

  
  }
  const list = RoleList.map(role => role.category)


  return (
    <KeyboardAvoidingWrapper>
      <>
        <Header 
          title='Post a Job' 
          icon={post} 
          numOfPage='1/2'
          hidden={false}
          goBack={navigation.goBack}
          />

        <View style={styles.container}>
          <Text style={styles.text}>
            Let us know what are you looking for, and fill in some details find better qualified matches. 
          </Text>
          <View style={styles.form}>
              <SelectInput 
                  title="Role Category*" 
                  list={list}
                  onSelect={(value) => handleChange("category", value)}
                  setIndex={setIndex}
                  role={true}
                  value={values.category}

              /> 
              <SelectInput 
                  title="Job Title*" 
                  list={RoleList[index].subCategories}
                  onSelect={(value) => handleChange("title", value)}
                  value={values.title}
              />
              <DateInputs 
                onChange={(value) => handleChange('startDate', value)} 
                placeholder="Start Date" 
                dateType
                value={values.startDate}
                minimumDate={new Date()}

              />
              <DateInputs 
                onChange={(value) => handleChange('endDate', value)} 
                placeholder="End Date" 
                dateType
                value={values.endDate}
                minimumDate={values.startDate}

              />
              <SelectInput 
                  title="Location*" 
                  onSelect={(value) => handleChange('location', value)}
                  list={listofCities}
                  value={values.location}
              /> 
              <SelectInput 
                  title="Shift*" 
                  onSelect={(value) => handleChange('shift', value)}
                  list={['day', 'night']}
                  value={values.shift}

              /> 
              <DailyRate
                title='Budget'
                placeholder='Estimated Budget*'
                numeric
                onChange={(value) => handleChange('budget', value)}
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
            <PrimaryButton title='Continue to payment' />
          </TouchableOpacity>
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
    width: "70%",
    textAlign: "center"
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
