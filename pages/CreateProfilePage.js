import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native'
import React from 'react'
import Header from '../components/Header'
import signUp from '../assets/images/signUp.png'
import Inputs from '../components/Inputs'
import UploadCard from '../components/UploadCard'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

const CreateProfilePage = ({  navigation }) => {
  const navigateExperience = () => {
    navigation.navigate("experience")
  } 

  return (
    <ScrollView style={styles.container}>
      <Header
        icon={signUp}
        title='Create Profile'
        // numOfPage={<Image source={trash}></Image>}
        numOfPage='2/5'
        hidden={false}
        goBack={navigation.goBack}
      />
      <View style={styles.subContainer}>
        <Text style={styles.text}>
          Fill and upload the below required field and documents
        </Text>
        <Inputs title='Continue to Payment' placeholder='Passport Number*' />
        <UploadCard title='Copy of passport' />
        <UploadCard title='Copy of residency visa' />
        <Pressable style={styles.nextButton} >
          <PrimaryButton title='Next' navigate={navigateExperience} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("experience")}>
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
  },
  skipText:{
    fontFamily: 'PoppinsS',
    fontSize: 15,
    marginTop: -25,
    marginBottom: 80,
    letterSpacing: 2
  }
})

export default CreateProfilePage
