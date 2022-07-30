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
  
  const JobSeekersignup = ({  navigation }) => {
    const navigateExperience = () => {
      navigation.navigate("JobSignUp2")
    } 
  
    return (
      <ScrollView style={styles.container}>
        <Header
          icon={signUp}
          title='Create Profile'
          // numOfPage={<Image source={trash}></Image>}
          numOfPage='1/5'
          hidden={false}
          goBack={navigation.goBack}
        />
        <View style={styles.subContainer}>
          <Text style={styles.text}>
            Fill and upload the below required field and documents
          </Text>
          <Inputs title='Continue to Payment' placeholder='Name*' />
          <Inputs title='Continue to Payment' placeholder='Email*' />
          <Inputs title='Continue to Payment' placeholder='Phone Number*' />
          <Pressable style={styles.nextButton} >
            <PrimaryButton title='Next' navigate={navigateExperience} />
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
  })
  
  export default JobSeekersignup
  