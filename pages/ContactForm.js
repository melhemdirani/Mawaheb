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
import emailjs from "emailjs-com";

import PrimaryButton from '../components/Buttons/PrimaryButton'
import { useSelector, useDispatch } from 'react-redux'
import TextArea from '../components/TextArea';
import SecondaryHeader from '../components/SecondaryHeader';
import SelectInput from '../components/SelectInput';
import DeleteButton from '../components/Buttons/DeleteButton';
import SecondaryButton from '../components/Buttons/SecondaryButton';

const ContactForm = ({ navigation, route }) => {

  const [message, setMessage] = useState("")
  const [subject, setSubject] = useState("")
  const dispatch = useDispatch()
  const { user, isLoading, error } = useSelector((store) => store.user)
 
  const goBack = () => {
    navigation.goBack()
  }
    console.log("user contact", user)

  const handleSubmit = () => {
    alert("Thank you for message!")
  }

  return isLoading ? (
    <View style={styles.loadingStyle}>
      <ActivityIndicator size={'large'} />
    </View>
  ) : (
      <View style={styles.container}>
        <SecondaryHeader title={'Contact us'} heart={false} noFilter/>
        <View style={styles.subContainer}>
            <Text style={styles.text}>Hello Name, how can we help?</Text>
            <SelectInput 
                title="Subject*" 
                list={['Help needed', 'Report an error', 'General Feedback']}
                onSelect={(e) => setSubject(e)}
            />
            <TextArea  
                placeholder="Leave your message here" 
                onChange={(value) => setMessage(value)}
                value={message}
            /> 
            <TouchableOpacity style={styles.buttons} onPress={() => handleSubmit()}>
                <PrimaryButton title='Send message' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons} onPress={() => goBack()} >
                <SecondaryButton title='cancel' />
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
    alignItems: "center"
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
