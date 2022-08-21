import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Image
} from 'react-native'
import * as Linking from "expo-linking";

import PrimaryButton from '../components/Buttons/PrimaryButton'
import { useSelector, useDispatch } from 'react-redux'
import TextArea from '../components/TextArea';
import SecondaryHeader from '../components/SecondaryHeader';
import SelectInput from '../components/SelectInput';
import DeleteButton from '../components/Buttons/DeleteButton';
import SecondaryButton from '../components/Buttons/SecondaryButton';
import TertiaryButton from '../components/Buttons/TertiaryButton';

const ContactForm = ({ navigation, route }) => {

  const [message, setMessage] = useState("")
  const [subject, setSubject] = useState("")
  const dispatch = useDispatch()
  const { user, isLoading, error } = useSelector((store) => store.user)
 
  const goBack = () => {
    navigation.goBack()
  }
  // const handleSubmit = () => {
  //   alert("Thank you for message!")
  // }
  // const callContact = () => {
  //   Linking.openURL(`tel://${+96171183511}`)
  // }
  const emailContract = () => {
    Linking.openURL("mailto:mawahibcareers@gmail.coms")
  }
  return isLoading ? (
    <View style={styles.loadingStyle}>
      <ActivityIndicator size={'large'} />
    </View>
  ) : (
      <View style={styles.container}>
        <SecondaryHeader title={'Contact us'} heart={false} noFilter/>
        <View style={styles.subContainer}>
            {/* <Text style={styles.text}>Hello Name, how can we help?</Text>
            <SelectInput 
                title="Subject*" 
                list={['Help needed', 'Report an error', 'General Feedback']}
                onSelect={(e) => setSubject(e)}
            />
            <TextArea  
                placeholder="Leave your message here" 
                onChange={(value) => setMessage(value)}
                value={message}
            />  */}
            <Text style={styles.text}>Hello, need help? Send us an email and we will get back shortly!</Text>
            <TouchableOpacity style={styles.buttons} onPress={() => emailContract()}>
                <PrimaryButton title='Send us an email' />
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.buttons} onPress={() => callContact()} >
                <TertiaryButton title='Call us' />
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.buttons} onPress={() => goBack()} >
                <SecondaryButton title='Cancel' />
            </TouchableOpacity>
            
        </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subContainer:{
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    flex: .7
     
  },
  text: {
    width: '70%',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 50,
    color: 'rgba(0,0,0,0.6)',
  },
  buttons:{
    marginTop: 20
  }
})

export default ContactForm
