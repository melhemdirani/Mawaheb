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
import {createClientProfile, updateClientProfile } from '../reduxToolkit/clientSlice';

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

import Header from '../components/Header';
import Inputs from '../components/Inputs';
import UploadCard from '../components/UploadCard';
import PrimaryButton from '../components/Buttons/PrimaryButton';

import signUp from '../assets/images/signUp.png';
import { updateUser } from '../reduxToolkit/userSlice';
import ImageCard from '../components/ImageCard';
import PhoneInputs from '../components/PhoneInput';


const EditClientProfile = ({navigation, route}) => {
    const {user, token} = useSelector( store => store.user)

    const client = route.params.clientProfile

    const {
        companyName,
        privacy, 
        signatoryName,
        signatoryTitle, 
        sign, 
        Address,
        TRN,
        email,
        phoneNb,
        tradingLicense
    } = client
  const initialState = {
    companyName, 
    privacy,
    signatoryName,
    signatoryTitle,
    sign,
    address: Address,
    TRN,
    email: user.email,
    profileImage: user.profileImage,
    phoneNb: user.phoneNb,
    tradingLicense
  }
  const [values, setValues] = useState(initialState)

  const [uploaded, setUploaded] = useState(sign !== "" || tradingLicense !== "" ? true : false)
  const [uploaded2, setUploaded2] = useState(user.profileImage !== "" ? true : false)
  const [activity, setActivity] = useState(false)
  const [changed, setChanged] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)
  const [startingToUpload, setStartingToUpload] = useState(false)
  const [image, setImage] = useState(sign !== ""  
    ?`http://195.110.58.234:4000${sign}`
    : tradingLicense !== ""
    ?`http://195.110.58.234:4000${tradingLicense}` 
    : ""
    )
  const [image2, setImage2] = useState(`http://195.110.58.234:4000${user.profileImage}`)
  const [uploadedImage, setUploadedImage] = useState("")
  const [uploadedImage2, setUploadedImage2] = useState("")

  const dispatch = useDispatch()
  useEffect(() => {

    isEnabled
      ? setValues({ ...values, privacy: 'private' })
      : setValues({ ...values, privacy: 'public' })

  }, [isEnabled])

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value })
    setChanged(true)
  }
  const onSubmit = () => {
    if(activity){
      return alert("Uploading please wait")
    }
    const {
      companyName,
      privacy,
      signatoryName,
      signatoryTitle,
      sign,
      TRN,
      address,
      email,
      phoneNb,
    } = values
    if (privacy === 'private' && (!TRN || !address || !companyName || !uploadedImage)) {
        console.log("values private", values)
      return alert('Please fill all fields')
    } else if (
      privacy === 'public' &&
      (!companyName || !signatoryName || !signatoryTitle || !uploadedImage|| !email || !phoneNb ) 
    ) {
        console.log("values public", values)
       return alert('Please fill all fieldss')
    } else if (activity){
      return alert("Uploading please wait")
    }
    else { 
      if(client.notCompleted){
        console.log("creating")
        dispatch(
          createClientProfile({
            companyName:values.companyName,
            privacy:values.privacy,
            signatoryName:values.signatoryName,
            signatoryTitle:values.signatoryTitle,
            companyName:values.companyName,
            TRN:parseInt(values.TRN),
            sign: uploadedImage,
            tradingLicense: uploadedImage,
            Address: "address",
    
          })
        )
        .unwrap()
        .then((response) => {
          console.log("creating profile", response)
          navigation.navigate('clientProfile')
        })
        .catch(error => console.log("error registering", error))
      } else{
        console.log("updating")

        dispatch(
          updateUser({
              companyName: values.companyName,
              Address: "address",
              name: values.companyName,
              email: values.email.toLowerCase(),
              phoneNb: values.phoneNb,
              role: 'client',
              profileImage: values.profileImage,
              userId: user.clientId,
              notificationToken: token
          })
        )
        .unwrap()
        .then((response) => {
          console.log("response registiring", response)
          onRegister()
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

  }

  const onRegister = () => {
    dispatch(
      updateClientProfile({
        companyName:values.companyName,
        privacy:values.privacy,
        signatoryName:values.signatoryName,
        signatoryTitle:values.signatoryTitle,
        companyName:values.companyName,
        TRN:parseInt(values.TRN),
        sign: values.sign,
        tradingLicense: values.sign,
        Address: values.address,
      })
    )
    .unwrap()
    .then((response) => {
      console.log("creating profile", response)
      setChanged(false)
      navigation.navigate('clientProfile')
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
 

  const toggleSwitch = () => {
    setUploaded(false)
    setImage("")
    setIsEnabled(!isEnabled)
  } 
  const selectFile = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })
    if (!result.cancelled) {
      setStartingToUpload(true)
      setUploaded2(false)
      upload2(result.uri)
      setImage2(result.uri)
    }
  }
  const upload2 = async (uri) => {
    try {
      const response = await FileSystem.uploadAsync(
        `http://195.110.58.234:4000/api/v1/auth/uploadImage/`,
        uri,
        {
          fieldName: 'files',
          httpMethod: 'post',
          uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
        },
       
      )
      const img = JSON.parse(response.body).imageUrl
      console.log("uploading response", img)
      // setChangedValues(true)
      setActivity(false)
      setUploadedImage2(img)
      handleChange('profileImage', img)

      setUploaded2(true)
      setChanged(true)


    } catch (error) {
      console.log(error)
      setUploaded2(false)
      alert("Error uploading")
    }
  }
  const upload = async (uri) => {
    console.log('uploading file')
    try {
      console.log('trying')
      const response = await FileSystem.uploadAsync(
        `http://195.110.58.234:4000/api/v1/auth/uploadImage/`,
        uri,
        {
          fieldName: 'files',
          httpMethod: 'post',
          uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
        },
      )
      const img = JSON.parse(response.body).imageUrl
      setUploadedImage(img)
      handleChange('sign', img)
      setUploaded(true)
      setChanged(true)
     } catch (error) {
      console.log(error)
      setUploaded(false)
      alert("Error uploading")

    }
  }

  const onImageDelete = () => {
    startingToUpload && setStartingToUpload(false)
    setUploaded(false);
    setImage("");
  }

  const onImageDelete2 = () => {
    startingToUpload && setStartingToUpload(false)
    setUploaded2(false);
    setImage2("")
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
    <KeyboardAvoidingWrapper>
  <>
        <Header title='Edit profile' icon={signUp} hidden={false} goBack={navigation.goBack}/>
        <View style={styles.container}>
          <View style={styles.form}>
              <Inputs
                  placeholder='Company Name*'
                  style={styles.input}
                  onChange={(value) => handleChange('companyName', value)}
                  value={values.companyName}
                  valued
              />
              <Inputs
                  placeholder='Email*'
                  onChange={(value) => handleChange('email', value)}
                  value={values.email}
                  valued
              />
              <PhoneInputs
                  placeholder='Phone number*'
                  onChange={(value) => handleChange('phoneNb', value)}
                  value={values.phoneNb}
              />
              { 
                  image2 !== "" && !uploaded2
                  ? <View style={{width: "100%", alignItems: "center"}}>
                      <View style={styles.ActivityIndicator}>
                    <ActivityIndicator size={"large"} color="#4E84D5"/>
                      </View>
                      <ImageCard uri={image2} onImageDelete={onImageDelete2} />
                  </View>
                  : image2 !== "" && uploaded2
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
                        <ActivityIndicator size={"large"} color="#4E84D5"/>
                          </View>
                          <ImageCard uri={image} style={styles.Imagecontainer} onImageDelete={onImageDelete}/>
                      </View>
                      : image.length && uploaded
                      ? <ImageCard uri={image} style={styles.Imagecontainer} onImageDelete={onImageDelete}/>
                      : <UploadCard title='Trading Liscence*' selectFile={selectFile2}/>
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
                      image !== "" && !uploaded
                      ? <View style={{width: "100%", alignItems: "center"}} >
                          <View style={styles.ActivityIndicator}>
                        <ActivityIndicator size={"large"} color="#4E84D5"/>
                          </View>
                          <ImageCard uri={image} style={styles.Imagecontainer} onImageDelete={onImageDelete}/>
                      </View>
                      : image !== "" && uploaded
                      ? <ImageCard uri={image} style={styles.Imagecontainer} onImageDelete={onImageDelete}/>
                      : <UploadCard title='Add Authorized Signatory*' selectFile={selectFile}/>
                  }
              </View>
            }
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={() => onSubmit()}>
            <PrimaryButton  title='Save' activity={activity}/>
            </TouchableOpacity>
            <SafeAreaView style={styles.btn}>
              <Pressable onPress={() => navigation.goBack()}>
              <Text style={styles.btnText}>Cancel</Text>
              </Pressable>
            </SafeAreaView>
          </View>
        </View>
      </>
    </KeyboardAvoidingWrapper>
    
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
    marginVertical: 10,
    zIndex: 9999
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


export default EditClientProfile
