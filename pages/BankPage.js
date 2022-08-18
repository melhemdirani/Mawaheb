import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable
} from 'react-native';

import { createFreelancerProfile } from '../reduxToolkit/freelancerSlice'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../components/Header';
import Icon from '../assets/images/bankIcon.png';
import Inputs from '../components/Inputs';
import PrimaryButton from '../components/Buttons/PrimaryButton'

const BankPage = ({  navigation }) => {
  const bankState = {
    iban: '',
    accountName: '',
    bankName: '',
    bankAddress: '',
    city: '',
    swiftCode: '',
  }
  const [bank, setBank] = React.useState(bankState)

  const {
    freelancer,
    isLoading,
    error,
    expirationDate,
    emiratesId,
    emiratesIdFrontSide,
    emiratesIdBackSide,
    copyOfPassport,
    copyOfResidencyVisa,
    completedProfile,
    roles,
    languages,
  } = useSelector((store) => store.freelancer)

  const {user} = useSelector(store => store.user)
  console.log("userr", user)

  const [isCompleted, setIsCompleted] = useState(true)

  const checkComplete = () => {
    completedProfile.map( item =>{
      if(item === false){
        return setIsCompleted(false)
      }

    }) 
  }
  useEffect(() => {
    checkComplete()
  }, [])

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

 
  const createJobSeeker = () => {
    console.log("roles", roles)
    dispatch(
      createFreelancerProfile({
        profile: {
          expirationDate,
          emiratesId,
          emiratesIdFrontSide,
          emiratesIdBackSide,
          copyOfPassport,
          copyOfResidencyVisa,
          isCompleted: !checkBankEmpty() && isCompleted ? true : false,
        },
        roles: roles,
        languages: languages,
        bankDetails: !checkBankEmpty() ? bank : undefined,
      })
    )
    .unwrap()
    .then((response) => {
      console.log("response registiring", response)
      navigation.navigate('jobseeker_jobs')
    })
    .catch((error) => {
      console.log("error", error.message)
    })
  }


  return (
    <ScrollView style={styles.container}>
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
        />
        <Inputs
          placeholder='Account holder*'
          onChange={(value) => handleChange('accountName', value)}
        />
        <Inputs
          placeholder={`Bank's name*`}
          onChange={(value) => handleChange('bankName', value)}
        />
        <Inputs
          placeholder={`Bank's address*`}
          onChange={(value) => handleChange('bankAddress', value)}
        />

        <Inputs
          placeholder='City*'
          onChange={(value) => handleChange('city', value)}
        />
        <Inputs
          placeholder='Swift Code*'
          onChange={(value) => handleChange('swiftCode', value)}
        />
        <Pressable style={styles.nextButton} onPress={() => createJobSeeker()}>
          <PrimaryButton title='Create Profile' />
        </Pressable>
        <Pressable onPress={() =>  createJobSeeker()}>
          <Text style={styles.skipText}>
              SKIP
          </Text>
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
