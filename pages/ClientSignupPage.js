import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useDispatch, useSelector } from 'react-redux';
import { createClientProfile } from '../reduxToolkit/clientSlice';

import Header from '../components/Header';
import Inputs from '../components/Inputs';
import UploadCard from '../components/UploadCard';
import PrimaryButton from '../components/Buttons/PrimaryButton';

import signUp from '../assets/images/signUp.png';
import { setUserAfterRegister } from '../reduxToolkit/userSlice';
import ImageCard from '../components/ImageCard';
import PhoneInputs from '../components/PhoneInput';


const ClientSignupPage = ({navigation}) => {
  const { client, isLoading, error } = useSelector((store) => store.client)
  const { user } = useSelector((store) => store.user)
  const [uploaded, setUploaded] = useState(false)
  const [uploaded2, setUploaded2] = useState(false)
  const [activity, setActivity] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)
  const [startingToUpload, setStartingToUpload] = useState(false)
  const [image, setImage] = useState("")
  const [image2, setImage2] = useState("")

  const initialState = {
    companyName: '',
    privacy: '',
    signatoryName: '',
    signatoryTitle: '',
    sign: 'ffff',
    address: '',
    TRN: "",
    email:"",
    password:"",
    profileImage: "",
    phoneNb: ""
  }

  const [values, setValues] = useState(initialState)
  const dispatch = useDispatch()

  const navigateLogin = () => {
   
    navigation.navigate('login')
  }
  useEffect(() => {

    isEnabled
      ? setValues({ ...values, privacy: 'private' })
      : setValues({ ...values, privacy: 'public' })

  }, [isEnabled])

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value })
  }


  const onSubmit = () => {
  
    const {
      companyName,
      privacy,
      signatoryName,
      signatoryTitle,
      sign,
      TRN,
      address,
    } = values
    if (privacy === 'private' && (!TRN || !address || !companyName)) {

      return alert('Please fill all fields')
    } else if (
      privacy === 'public' &&
      (!companyName || !signatoryName || !signatoryTitle || !sign)
    ) {
      alert('Please fill all fieldss')
      console.log(values)
    }
    else { dispatch(
        createClientProfile({
          companyName,
          privacy,
          signatoryName,
          signatoryTitle,
          sign,
          TRN: parseInt(TRN),
          Address: address,
        })
      )
      dispatch(
        setUserAfterRegister(client.id)
      )
    }
  
  }
  useEffect(() => {
    console.log("client", client)
    if (client !== undefined && Object.keys(client).length > 0 && uploaded && !isLoading) {
      navigation.navigate('recruiter_dashboard')
    }
  }, [client, isLoading])
  const toggleSwitch = () => {
    setUploaded(false)
    setImage("")
    setIsEnabled(!isEnabled)
  }
  const selectFile = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    })
    if (!result.cancelled) {
      setStartingToUpload(true)
      setUploaded(false)
      upload(result.uri)
      setImage(result.uri)
    }
  }
  const selectFile2 = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    })
    if (!result.cancelled) {
      setStartingToUpload(true)
      setUploaded(false)
      upload(result.uri)
      setImage2(result.uri)
    }
  }
  const upload = async (uri) => {
    console.log('uploading file')
    try {
      console.log('trying')
      const response = await FileSystem.uploadAsync(
        `http://194.5.157.234:4000/api/v1/freelancers/uploadImage`,
        uri,
        {
          fieldName: 'files',
          httpMethod: 'post',
          uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
        },
        { name: uri }
      )
      setValues({ ...values, profileImage: JSON.parse(response.body).imageUrl })
      setUploaded(true)
     } catch (error) {
      console.log(error)
    }
  }
  const upload2 = async (uri) => {
    console.log('uploading file')
    try {
      console.log('trying')
      const response = await FileSystem.uploadAsync(
        `http://194.5.157.234:4000/api/v1/freelancers/uploadImage`,
        uri,
        {
          fieldName: 'files',
          httpMethod: 'post',
          uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
        },
        { body : {name: uri} }
      )
      setUploaded2(true)
     } catch (error) {
      console.log(error)
    }
  }
  const onImageDelete = () => {
    startingToUpload && setStartingToUpload(false)
    setUploaded(false);
    setImage("");
  }

  useEffect(( ) => {
    if(uploaded && activity){
      setActivity(false)
    }
    if((!uploaded) && !activity && startingToUpload){
      setActivity(true)
    }
  }, [uploaded, startingToUpload])

  return (
    <ScrollView style={styles.wrapper}>
      <Header title='Client Sign Up' icon={signUp} hidden={false} goBack={navigation.goBack}/>
      <View style={styles.container}>
        <Text style={styles.text}>All you need is to fill your information below and upload a document to create your profile. </Text>
        <View style={styles.form}>
          <Inputs
            placeholder='Company Name*'
            style={styles.input}
            onChange={(value) => handleChange('companyName', value)}
            value={values.companyName}
          />
          <Inputs
            placeholder='Email*'
            onChange={(value) => handleChange('email', value)}
            value={values.email}
          />
          <PhoneInputs
            placeholder='Phone number*'
            onChange={(value) => handleChange('phoneNb', value)}
            value={values.phoneNb}
          />
          <Inputs
            placeholder='Password*'
            onChange={(value) => handleChange('password', value)}
            value={values.password}
          />
          { 
            image2.length && !uploaded2
            ? <View style={{width: "100%", alignItems: "center"}}>
                <View style={styles.ActivityIndicator}>
                  <ActivityIndicator size={"large"} />
                </View>
                <Image source={{uri:image2}} style={styles.Imagecontainer} />
              </View>
            : image2.length && uploaded2
            ? <ImageCard uri={image2} onImageDelete={onImageDelete2} />
            : <UploadCard title='Profile Picture' selectFile={selectFile2}/>
          }
          <View style={styles.privacy}>
            <Text style={!isEnabled ? styles.picked : styles.notPicked}>Public </Text>
            <Switch
              style={styles.switch}
              ios_backgroundColor='#23CDB0'
              trackColor={{ false: '#23CDB0', true: '#23CDB0' }}
              thumbColor={'#f4f3f4'}
              onValueChange={toggleSwitch}
              value={isEnabled}
            ></Switch>
            <Text style={isEnabled ? styles.picked : styles.notPicked}> Private</Text>
          </View>
          { isEnabled 
            ? <View style={{width: "100%", alignItems: "center"}}>
              <Inputs
                placeholder={'Address*'}
                style={styles.input}
                value={values.address}
                onChange={ (value) => handleChange('address', value) }
              />
              <Inputs
                placeholder={'TRN(Tax Number)*'}
                style={styles.input}
                value={ values.TRN}
                numeric
                onChange={ (value) => handleChange('TRN', parseInt(value)) }
              />
              { 
                image.length && !uploaded
                ? <View style={{width: "100%", alignItems: "center"}}>
                    <View style={styles.ActivityIndicator}>
                      <ActivityIndicator size={"large"} />
                    </View>
                    <Image source={{uri:image}} style={styles.Imagecontainer} />
                  </View>
                : image.length && uploaded
                ? <ImageCard uri={image} style={styles.Imagecontainer} onImageDelete={onImageDelete}/>
                : <UploadCard title='Trading Liscence*' selectFile={selectFile}/>
              }
            </View>
            : <View style={{width: "100%", alignItems: "center"}}>
              <Inputs
                placeholder={ 'Signatory Name*'}
                style={styles.input}
                value={values.signatoryName}
                onChange={ (value) => handleChange('signatoryName', value) }
              />
              <Inputs
                placeholder={ 'Signatory Title'}
                style={styles.input}
                value={values.signatoryTitle}
                onChange={  (value) => handleChange('signatoryTitle', value) }
              />
              { 
                image.length && !uploaded
                ? <View style={{width: "100%", alignItems: "center"}}>
                    <View style={styles.ActivityIndicator}>
                      <ActivityIndicator size={"large"} />
                    </View>
                    <Image source={{uri:image}} style={styles.Imagecontainer} />
                  </View>
                : image.length && uploaded
                ? <ImageCard uri={image} style={styles.Imagecontainer} onImageDelete={onImageDelete}/>
                : <UploadCard title='Add Authorized Signatory*' selectFile={selectFile}/>
              }
            </View>
          }
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => onSubmit()}>
           <PrimaryButton  title='Sign up' activity={activity}/>
          </TouchableOpacity>
          <SafeAreaView style={styles.btn}>
            <Pressable onPress={() => navigateLogin()}>
             <Text style={styles.btnText}>Login</Text>
            </Pressable>
          </SafeAreaView>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    flex: 1,
  },
  container: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 13,
    fontFamily: 'PoppinsR',
    color: "rgba(0,0,0,.6)",
    alignSelf: "center",
    textAlign: "center",
    width: "80%"
  },
  form: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    width: '90%',
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 40
  },
  btn: {
    marginTop: 10,
  },
  btnText: {
    fontSize: 15,
    fontFamily: 'PoppinsS',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  privacy: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    top: -5,
    marginBottom: 8
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  notPicked:{
    fontFamily: "PoppinsL",
    color: "rgba(0,0,0,.5)",
    fontSize: 15
  },
  picked:{
    fontFamily: "PoppinsL",
    fontSize: 15

  },
  Imagecontainer: {
    justifyContent: "center",
    height: 230,
    width: "85%",
    borderRadius: 20,
    marginVertical: 10
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


export default ClientSignupPage
