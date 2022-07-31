import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Icon from '../assets/images/bankIcon.png'
import Inputs from '../components/Inputs'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

const BankPage = ({  navigation }) => {
  const navigate = () => {
    navigation.navigate('jobseeker_jobs')
  }

  return (
    <ScrollView style={styles.container}>
      <Header
        icon={Icon}
        title='Bank Details'
        // numOfPage={<Image source={trash}></Image>}
        numOfPage='5/5'
        hidden={false}
        goBack={navigation.goBack}
      />
      <View style={styles.subContainer}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amenoLorem ipsum dolor sit ameno
        </Text>
        <Inputs placeholder='IBAN*' />
        <Inputs placeholder='Account Name*' />
        <Inputs placeholder='Bank Name*' />
        <Inputs placeholder='Bank Address*' />
        <Inputs placeholder='City*' />
        <Inputs placeholder='Swift Code*' />
        <Pressable style={styles.nextButton}>
          <PrimaryButton title='Create Profile' navigate={navigate}/>
        </Pressable>
        <Pressable onPress={() =>  navigation.navigate('jobseeker_jobs')}>
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
