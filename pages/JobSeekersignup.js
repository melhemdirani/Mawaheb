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
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import signUp from '../assets/images/signUp.png'
import { validate } from 'react-email-validator';

import Header from '../components/Header'
import Inputs from '../components/Inputs'

import PrimaryButton from '../components/Buttons/PrimaryButton'
import { useSelector, useDispatch } from 'react-redux'
import { registerUser, updateUser } from '../reduxToolkit/userSlice'
import PhoneInputs from '../components/PhoneInput';
import UploadCard from '../components/UploadCard';
import ImageCard from '../components/ImageCard';
import { ObjectIsEqual } from '../components/ObjectIsEqual';

const JobSeekersignup = ({ navigation, route }) => {

  const [uploaded, setUploaded] = useState(false)
  const [activity, setActivity] = useState(false)
  const [changedValues, setChangedValues] = useState(false)
  const [startUpload, setStartUpload] = useState(false)
  const [image, setImage] = useState("")

 
  const initialState = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    phoneNb: '',
    profileImage: '' 
  }
  const [values, setValues] = useState(initialState)
  const dispatch = useDispatch()
  const { user, isLoading, error } = useSelector((store) => store.user)
  const { role } = route.params

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value })
    setChangedValues(true)
  }

  const navigateNext =() => {
    console.log("hi")
    navigation.navigate('JobSignUpb')

  }
  const submit = () => {
    const { name, email, password, phoneNb } = values
    
    if (!name || !email || !password || !phoneNb) {
        console.log("phoneNb submitted", values)

      return alert('Please fill all the fields')
    } 
    if( !validate(email)){
      return alert("Please enter a valid email address")
    }
    if(user !== undefined &&  user.userId !== undefined && user !== {}){
      if(changedValues){
        console.log("updating")
        dispatch(
          updateUser({
            name: values.name + " " + values.lastName,
            email: values.email,
            phoneNb: parseFloat(values.phoneNb),
            role: role,
            profileImage: "image",
            userId: user.userId.id
          },)
        )
        .unwrap()
        .then((response) => {
          console.log("response updating", response)
          navigateNext()
          setChangedValues(false)
        })
        .catch((error) => {
          console.log("error updating", error.message)
  
        })
      } else {
        console.log("navigating no updates")
        navigateNext()
      }
    } else {
      console.log("user", user)
      dispatch(
        registerUser({
          name: values.name + " " + values.lastName,
          email: values.email,
          password: values.password,  
          phoneNb: parseFloat(values.phoneNb),
          role: role,
          profileImage: image
        })
      )
      .unwrap()
      .then((response) => {
        console.log("response registiring", response)
        setChangedValues(false)
        navigateNext()
      })
      .catch((error) => {
        if(error === "Email already in use"){
          alert("This email is already in use, please register using another email address")
        } else{
          alert("Error registering")
        }
        console.log("error", error)

      })
    }
   
  }


  const selectFile = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    })
    if (!result.cancelled) {
      setActivity(true)
      setImage(result.uri)
      upload(result.uri)
    }
  }
  const upload = async (uri) => {
    try {
      const response = await FileSystem.uploadAsync(
        `http://localhost:4000/api/v1/auth/uploadImage/`,
        uri,
        {
          fieldName: 'files',
          httpMethod: 'post',
          uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
        },
       
      )
      const img = JSON.parse(response.body).imageUrl
      handleChange({
        name: 'profileImage',
        value: img,
      })
      setUploaded(true)
      setActivity(false)

    } catch (error) {
      console.log(error)
    }
  }
  const onImageDelete = () => {
    setUploaded(false)
    setImage('')
    activity && setActivity(false)
    handleChange({
      name: 'profileImage',
      value: '',
    })

  }
  return isLoading ? (
    <View style={styles.loadingStyle}>
      <ActivityIndicator size={'large'} />
    </View>
  ) : (
      <View style={styles.container}>
        <KeyboardAvoidingView   behavior={Platform.OS === 'ios' ? 'position' : 'paddingBottom'}   style={{backgroundColor: "white"}}  >
          <ScrollView>
            <Header
              icon={signUp}
              title='Create Profile'
              // numOfPage={<Image source={trash}></Image>}
              numOfPage='1/6'
              hidden={false}
              goBack={navigation.goBack}
            />
            <View style={styles.subContainer}>
              <Text style={styles.text}>
                Create and verify your profile in less than 2 minutes. Fill in your name and upload a picture of your passport, ID, and Visa.
              </Text>
              { 
                image.length && !uploaded
                ? <View style={{width: "100%", alignItems: "center"}}>
                    <View style={styles.ActivityIndicator}>
                      <ActivityIndicator size={"large"} />
                    </View>
                    <Image source={{uri:image}} style={styles.Imagecontainer} />
                  </View>
                : image.length && uploaded
                ? <ImageCard uri={image} onImageDelete={onImageDelete} />
                : <UploadCard title='Profile Picture' selectFile={selectFile}/>
              }
              <Inputs
                title='Continue to Payment'
                placeholder='First Name*'
                onChange={(value) => handleChange('name', value)}
                value={values.name}
              />
              <Inputs
                title='Continue to Payment'
                placeholder='Last Name*'
                onChange={(value) => handleChange('lastName', value)}
                value={values.lastName}
              />
              <Inputs
                title='Continue to Payment'
                placeholder='Email*'
                onChange={(value) => handleChange('email', value)}
                value={values.email}
              />

              <Inputs
                title='Continue to Payment'
                placeholder='Password*'
                onChange={(value) => handleChange('password', value)}
                value={values.password}
              />
              <PhoneInputs
                title='Continue to Payment'
                placeholder='Phone Number*'
                onChange={(value) => handleChange('phoneNb', value)}
                value={values.phoneNb}
              />
              <TouchableOpacity style={styles.nextButton} onPress={() => submit()}>
                <PrimaryButton title='Next' activity={activity}/>
              </TouchableOpacity>
            </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  Imagecontainer: {
    justifyContent: 'center',
    height: 230,
    width: '85%',
    borderRadius: 20,
    marginVertical: 10,
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
  loadingStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  ActivityIndicator:{
    position: "absolute",
    zIndex: 999,
    alignItems: "center",
    justifyContent: "center",
    height: 230,
    backgroundColor:"rgba(255,255,255,.8)",
    width: "85%",
    marginVertical: 10
  }
})

export default JobSeekersignup
