import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native'
import React from 'react'
import FormRow from '../components/FormRow'
import Header from '../components/Header'
import Icon from '../assets/images/bankIcon.png'
import backIcon from '../assets/images/backIcon.png'
import trash from '../assets/images/trash.png'
import SecondaryHeader from '../components/SecondaryHeader'
import Job from '../components/Job'
import Inputs from '../components/Inputs'
import UploadCard from '../components/UploadCard'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import SelectInput from '../components/SelectInput'
import AddRoleButton from '../components/Buttons/AddRoleButton'

const BankPage = () => {
  return (
    <ScrollView style={styles.container}>
      <Header
        icon={Icon}
        title='Bank Details'
        // numOfPage={<Image source={trash}></Image>}
        numOfPage='4/4'
        hidden={false}
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
          <PrimaryButton title='Create Profile' />
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
})

export default BankPage
