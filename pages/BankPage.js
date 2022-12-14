import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator
} from 'react-native';
import { StackActions } from '@react-navigation/native';

import { listofCities } from '../assets/data/RolesList';

import { createFreelancerProfile, getFreelancer, updateFreelancerProfile } from '../reduxToolkit/freelancerSlice'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../components/Header';
import Icon from '../assets/images/bankIcon.png';
import Inputs from '../components/Inputs';
import PrimaryButton from '../components/Buttons/PrimaryButton'
import SelectInput from '../components/SelectInput';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const BankPage = ({  navigation, route }) => {

  const {update} = route.params
  const bankState = {
    iban: '',
    accountName: '',
    bankName: '',
    bankAddress: '',
    city: '',
    swiftCode: '',
  }

  const [loading, setLoading] = useState(false)

  const {
    freelancer,
    expirationDate,
    emiratesId,
    emiratesIdFrontSide,
    emiratesIdBackSide,
    copyOfPassport,
    copyOfResidencyVisa,
    roles,
    languages,
    nationality,
    arabicName,
    middleName,
    birthDate
  } = useSelector((store) => store.freelancer)

  const bankState2 = update && freelancer.bankDetails !== undefined && freelancer.bankDetails !== null
  ?{
    iban: freelancer.bankDetails.iban  ? freelancer.bankDetails.iban : "",
    accountName: freelancer.bankDetails.accountName ? freelancer.bankDetails.accountName : "",
    bankName: freelancer.bankDetails.bankName  ? freelancer.bankDetails.bankName : "",
    bankAddress: freelancer.bankDetails.bankAddress ? freelancer.bankDetails.bankAddress : "",
    city: freelancer.bankDetails.city  ? freelancer.bankDetails.city : "",
    swiftCode: freelancer.bankDetails.swiftCode   ? freelancer.bankDetails.swiftCode : "",
  }: bankState
  

  const [bank, setBank] = useState(
    bankState2
  )
 
  const dispatch = useDispatch()
  const handleChange = (name, value) => {
    console.log(name, value)
    setBank({ ...bank, [name]: value })
  }

  const checkBankEmpty = () => {
    if(
      bank.iban === ''
      || bank.accountName === ''
      || bank.bankName === ''
      || bank.bankAddress === ''
      || bank.city === ''
      || bank.swiftCode === ''
    ){
      console.log("bank empty", bank)
      return true
    } else{
      console.log("bank not empty", bank)

      return false
    }
  }

  const checkCompleteProfile = () => {
    if (
      expirationDate  === "" ||
      emiratesId  === "" ||
      emiratesIdFrontSide  ===  "" ||
      emiratesIdBackSide  === "" ||
      copyOfPassport === "",
      copyOfResidencyVisa  ===  "" ||
      roles === "" ||
      roles === [] ||
      languages === "" ||
      languages === [] ||
      bank === "" ||
      middleName === ""||
      nationality  === ""||
      arabicName === ""||
      checkBankEmpty()
      ){
        return false
    } else return true
  }
 
  const updateProfile = () => {

    
    setLoading(true)
    dispatch(
      updateFreelancerProfile({ 
        freelancer: {
        profile: {
          expirationDate, 
          emiratesId,
          emiratesIdFrontSide,
          emiratesIdBackSide,
          copyOfPassport,
          copyOfResidencyVisa,
          middleName,
          nationality,
          birthDate: new Date (birthDate),
          arabicName,
          isCompleted: checkCompleteProfile(),
        },
        roles: roles,
        languages: languages,
        bankDetails: !checkBankEmpty() ? bank : undefined,
      },
      id: freelancer.id
        
      })
    )
    .unwrap()
    .then(() => {
      setLoading(false)
      navigation.dispatch(
        StackActions.replace('settings')
      )
    })
    .catch((error) => {
      setLoading(false)
      alert("error!")
      console.log("error", error)
    })
  }
 
  const createJobSeeker = () => {
    setLoading(true)
    dispatch(
      createFreelancerProfile({
        profile: {
          expirationDate, 
          emiratesId,
          emiratesIdFrontSide,
          emiratesIdBackSide,
          copyOfPassport,
          copyOfResidencyVisa,
          middleName,
          nationality,
          arabicName,
          birthDate: new Date (birthDate),
          isCompleted:  checkCompleteProfile(),
        },
        roles: roles,
        languages: languages,
        bankDetails: !checkBankEmpty() ? bank : undefined,
      })
    )
    .unwrap()
    .then((response) => {
      setLoading(false)
      navigation.dispatch(
        StackActions.replace('seeker_dash', 
          {register: true}
        )
      )
    })
    .catch(() => {
      setLoading(false)
      alert("Error registiring")
      navigation.dispatch(
        StackActions.replace('SignIn')
      )
    })
  }
  const skip = () => {
    if(update){
      updateProfile()
    } else {
      createJobSeeker()
    }

  }
  const handleSubmit = () => {
    freelancer.id === undefined ? createJobSeeker () : updateProfile () 
  }

  return loading ?
  <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
    <ActivityIndicator size={"large"} color="#4E84D5"/>
  </View>

  : (
    <KeyboardAvoidingWrapper>
      <>
        <Header
          icon={Icon}
          title='Bank Details'
          // numOfPage={<Image source={trash}></Image>}
          numOfPage='6/6'
          hidden={false}
          goBack={navigation.goBack}
        />
        <View style={styles.subContainer}>
          <Text style={styles.text}>
            Fill your bank account details in the fields provided below for secure banking proccesses .
          </Text>
          <Inputs
            placeholder='Your IBAN*'
            onChange={(value) => handleChange('iban', value)}
            value={bank.iban}
          />
          <Inputs
            placeholder='Account holder*'
            onChange={(value) => handleChange('accountName', value)}
            value={bank.accountName}
          />
          <Inputs
            placeholder={`Bank's name*`}
            onChange={(value) => handleChange('bankName', value)}
            value={bank.bankName}
          />
          <Inputs
            placeholder={`Bank's address*`}
            onChange={(value) => handleChange('bankAddress', value)}
            value={bank.bankAddress}
          />
          <SelectInput 
            title='City*'
            onSelect={(value) => handleChange('city', value)}
            list={listofCities}
            value={bank.city}
            valued
          /> 
          <Inputs
            placeholder='Swift Code*'
            value={bank.swiftCode}
            onChange={(value) => handleChange('swiftCode', value)}
          />
          <Pressable style={styles.nextButton} onPress={() => handleSubmit()}>
            <PrimaryButton title={update ? 'Update profile' : 'Create Profile'} />
          </Pressable>
          <Pressable onPress={() =>  skip()}>
            <Text style={styles.skipText}>
                SKIP
            </Text>
          </Pressable>
        </View>
      </>
    </KeyboardAvoidingWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    marginTop: 10,
  },
  addButton: {
    marginTop: 20,
    marginBottom: 60,
  },
  skipText:{
    fontFamily: 'PoppinsS',
    fontSize: 15,
    marginTop: -25,
    marginBottom: 80,
    letterSpacing: 2
  }
})

export default BankPage
