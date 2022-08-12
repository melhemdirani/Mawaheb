import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Checkbox from 'expo-checkbox';

import Header from '../components/Header'
import jobContractIcon from '../assets/images/jobContractIcon.png'
import priceRectangle from '../assets/images/priceRectangle.png'
import calendarIcon from '../assets/images/calendarIcon.png'
import clockIcon from '../assets/images/clockIcon.png'
import locationIcon from '../assets/images/locationIcon.png'
import { freelancerDetails } from '../assets/data/freelancerDetails'
import { LinearGradient } from 'expo-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view'
import checkbox from '../assets/images/checkbox.png'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import btnBackground from '../assets/images/btnBackground.png'

const JobContractPage = ({navigation}) => {
  const [isChecked, setChecked] = useState(false);
  const { id, title, price, roles, languages, location, shift } =
    freelancerDetails
  const { id: roleId, description, name, date } = roles[0]

  const navigateAccept = () => {
    if(!isChecked){
      return alert("Please read and accept the terms and conditions")
    }
    navigation.navigate('acceptedClient')

  }
  return (
    <ScrollView style={styles.wrapper}>
      <Header title='Job Contract' icon={jobContractIcon} goBack={navigation.goBack} />
      <SafeAreaView style={styles.container}>
        <View style={styles.titleHeader}>
          <Text style={styles.text}>
            Please read carefully the below contract and accept
          </Text>
          <Text style={styles.text}>
            the terms and conditions. Your contract will be 
          </Text>
          <Text style={styles.text}>
            legally registered once the freelancer signs it.
          </Text>
        </View>
        <View style={styles.header}>
          <View style={styles.subHeader}>
            <ImageBackground
              source={priceRectangle}
              style={styles.priceBg}
              resizeMode='contain'
            >
              <View style={styles.priceAndCurrency}>
                <Text style={styles.price}>15000 </Text>
                <Text style={styles.currency}>AED</Text>
              </View>
            </ImageBackground>
          </View>
        </View>
        <LinearGradient
          colors={[
            'rgba(202, 218, 221, 0.1)',
            'rgba(202, 218, 221, 0)',
            'rgba(202, 218, 221, 0.2)',
            'rgba(202, 218, 221, 0.2)',
            'rgba(202, 218, 221, 0.2)',
            'rgba(202, 218, 221, 0.1)',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.linear}
        >
          <View style={[styles.container2, styles.shadow]}>
            <View style={styles.info}>
              <MaskedView
                maskElement={
                  <Text
                    style={[styles.title, { backgroundColor: 'transparent' }]}
                  >
                    {title}
                  </Text>
                }
              >
                <LinearGradient
                  start={{ x: 1, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={['rgba(49, 190, 187, 1)', 'rgba(101, 91, 218, 1)']}
                >
                  <Text style={[styles.title, { opacity: 0 }]}>{title}</Text>
                </LinearGradient>
              </MaskedView>
              <Text style={styles.description}>{description}</Text>
            </View>
            <LinearGradient
              colors={[
                'rgba(202, 218, 221, 0.4)',
                'rgba(202, 218, 221, 0)',
                'rgba(202, 218, 221, 0.4)',
              ]}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.footer}>
                <View style={styles.footerInfo}>
                  <Image source={calendarIcon} style={styles.icon}></Image>
                  <Text style={styles.text}> {date}</Text>
                </View>
                <View style={styles.footerInfo}>
                  <Image source={clockIcon} style={styles.icon}></Image>
                  <Text style={styles.text}> {shift}</Text>
                </View>
                <View style={styles.footerInfo}>
                  <Image source={locationIcon} style={styles.icon}></Image>
                  <Text style={styles.text}>{location}</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </LinearGradient>
        <View style={styles.contractFees}>
          <View style={styles.feeAndPrice}>
            <Text style={styles.fee}>Freelancer Fees</Text>
            <Text style={styles.price}>15,000 AED</Text>
          </View>
          <View style={styles.feeAndPrice}>
            <Text style={styles.fee}>Tax</Text>
            <Text style={styles.price}>800 AED</Text>
          </View>
          <View style={styles.feeAndPrice}>
            <Text style={styles.fee}>Service Fees(20%)</Text>
            <Text style={styles.price}>3000 AED</Text>
          </View>
          <View style={styles.feeAndPrice}>
            <Text style={styles.fee}>Total Fees</Text>
            <Text style={styles.price}>18800 AED</Text>
          </View>
        </View>
        <View style={styles.parties}>
          <View style={styles.partyAndName}>
            <MaskedView
              maskElement={
                <Text
                  style={[styles.party, { backgroundColor: 'transparent' }]}
                >
                  First Party
                </Text>
              }
            >
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#31BEBB', '#655BDA']}
              >
                <Text style={[styles.party, { opacity: 0 }]}>First Party</Text>
              </LinearGradient>
            </MaskedView>
            <Text style={styles.companyName}>Company Name</Text>
          </View>
          <View style={styles.partyAndName}>
            <MaskedView
              maskElement={
                <Text
                  style={[styles.party, { backgroundColor: 'transparent' }]}
                >
                  Second Party
                </Text>
              }
            >
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#31BEBB', '#655BDA']}
              >
                <Text style={[styles.party, { opacity: 0 }]}>Second Party</Text>
              </LinearGradient>
            </MaskedView>
            <Text style={styles.companyName}>Freelancer Name blurred</Text>
          </View>
          <Text style={styles.revealText}>
            Will be revealed after signing the contract
          </Text>
          <Text style={styles.jobDescription}>
            Job description lorom ipsum dolor sit ameno Job description lorom
            sit ameno Job description lorom ipsum dolor sit ameno Job
            description lorom ipsum dolor sit ameno Job description lorom ipsum
            dolor sit ameno it ameno Job description lorom ipsum dolor sit ameno
            Job description lorom ipsum dolor sit ameno Job description Job
            description lorom ipsum dolor sit ameno Job description lorom sit
            ameno Job description lorom ipsum dolor sit ameno Job description
            lorom ipsum dolor sit ameno Job description lorom ipsum dolor sit
            ameno it ameno Job description lorom ipsum dolor sit ameno Job
            description lorom ipsum dolor sit ameno Job description Job
            description lorom ipsum dolor sit ameno Job description lorom sit
            ameno Job description lorom ipsum dolor sit ameno Job description
            lorom ipsum dolor sit ameno Job description lorom ipsum dolor sit
            ameno it ameno Job description lorom ipsum dolor sit ameno Job
            description lorom ipsum dolor sit ameno Job description Job
            description lorom ipsum dolor sit ameno Job description lorom sit
            ameno Job description lorom ipsum dolor sit ameno Job description
            lorom ipsum dolor sit ameno Job description lorom ipsum dolor sit
            ameno it ameno Job description lorom ipsum dolor sit ameno Job
            description lorom ipsum dolor sit ame
          </Text>
          <View style={styles.checkboxAndConfirm}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
              color={"#31BEBB"}
            />
            <Text style={styles.confirm}>
              I hereby confirm all the mentioned in this contract
            </Text>
          </View>
        </View>
      </SafeAreaView>
      <ImageBackground
        source={btnBackground}
        style={styles.btnBg}
        resizeMode="stretch"
      >
        <TouchableOpacity style={styles.btn} onPress={() => navigateAccept()}>
          <PrimaryButton title='Accept and Sign' />
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    width: "90%",
    alignSelf: "center"
  },
  container2:{
  },
  info: {
    padding: 20,
    paddingLeft: 35,
  },
  titleHeader: {
    marginTop: 50,
    alignItems: "center"
  },
  text: {
    fontSize: 13,
    fontFamily: 'PoppinsR',
    textAlign: "center",
    color: 'rgba(0, 0, 0, .6)',
  },
  header: {
    zIndex: 1,
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: -45,
  },
  priceBg: {
    width: 110,
    height: 90,
    left: 10,
    justifyContent: 'center',
  },
  price: {
    fontSize: 15,
    left: 10,
    color: 'rgba(16, 125, 197, 1)',
    fontFamily: 'PoppinsS',
  },
  priceAndCurrency: {
    flexDirection: 'row',

    alignItems: 'center',
    width: '100%',
  },
  currency: {
    fontSize: 10,
    fontFamily: 'PoppinsR',
    marginLeft: 10,
    marginTop: 3,
    color: '#107DC5',
  },
  title: {
    fontSize: 20,
    marginTop: 15,
    marginBottom: 10,
    fontFamily: 'PoppinsS',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: 'rgba(16, 125, 197, 1)',
    borderTopWidth: 0.4,
    padding: 20,
    width: '100%',
  },

  footerInfo: {
    flexDirection: 'row',

    alignItems: 'center',
    paddingTop: 7,
  },
  description: {
    color: 'rgba(10, 8, 75, .6)',
    fontFamily: 'PoppinsR',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  feeAndPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    borderBottomColor: '#107DC5',
    borderBottomWidth: 0.5,
  },
  fee: {
    fontSize: 12,
    fontFamily: 'PoppinsR',
    color: '#107DC5',
  },
  contractFees: {
    marginTop: 20,
    paddingHorizontal: 5,
  },
  parties: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  party: {
    fontSize: 16,
    fontFamily: 'PoppinsS',
    width: 150,
  },
  partyAndName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  companyName: {
    color: 'rgba(0,0,0,.6)',
    fontFamily: 'PoppinsR',
    fontSize: 13,
  },
  revealText: {
    marginTop: -10,
    fontSize: 10,
    color: '#107DC5',
    fontFamily: 'PoppinsL',
  },
  jobDescription: {
    marginTop: 20,
    fontFamily: 'PoppinsR',
    color: 'rgba(10, 8, 75, .6)',
  },
  checkboxAndConfirm: {
    paddingHorizontal: 4,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  confirm: {
    marginLeft: 5,
    color: '#212121',
    fontFamily: 'PoppinsR',
    fontSize: 12,
    width: '100%',
  },
  btnBg: {

    height: '100%',
    marginTop: 20,


  },
  btn: {
    alignItems: 'center',

    width: '100%',
    alignSelf: 'center',
    padding: 40,
  },
  linear:{
    width: "100%",
    borderRadius: 20
  },
  checkbox:{
  }
})

export default JobContractPage
