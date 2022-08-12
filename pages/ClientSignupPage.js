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
} from 'react-native'

import { useDispatch, useSelector } from 'react-redux';
import { createClientProfile } from '../reduxToolkit/clientSlice';

import Header from '../components/Header';
import Inputs from '../components/Inputs';
import UploadCard from '../components/UploadCard';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import signUp from '../assets/images/signUp.png';
import { setUserAfterRegister } from '../reduxToolkit/userSlice';
import ImageCard from '../components/ImageCard';


const ClientSignupPage = ({navigation}) => {
  const { client, isLoading, error } = useSelector((store) => store.client)
  const { user } = useSelector((store) => store.user)
  const [uploaded, setUploaded] = useState(false)
  const [activity, setActivity] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)
  const [startingToUpload, setStartingToUpload] = useState(false)
  const [image, setImage] = useState("")

  const initialState = {
    companyName: '',
    privacy: '',
    signatoryName: '',
    signatoryTitle: '',
    sign: 'ffff',
    address: '',
    TRN: "",
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
    if(!uploaded){
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
    } = values
    if (privacy === 'private' && (!TRN || !address || !companyName)) {
      alert('Please fill all fields')
      return
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
    if (Object.keys(client).length > 0 && uploaded && !isLoading) {
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
      upload(result.uri)
      setImage(result.uri)
      console.log("uploaded")

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
        { body: 'front' }
      )
      {
        isEnabled
          ? setValues({
              ...values,
              tradingLiscence: JSON.parse(response.body).imageUrl,
            })
          : setValues({ ...values, sign: JSON.parse(response.body).imageUrl })
      }
      setUploaded(true)
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
      <Header title='Client Sign Up' icon={signUp} hidden={true} />
      <View style={styles.container}>
        <Text style={styles.text}>Answer the questions below in order to </Text>
        <Text style={styles.text}>find the best job for you</Text>
        <View style={styles.form}>
          <Inputs
            placeholder='company Name*'
            style={styles.input}
            onChange={(value) => handleChange('companyName', value)}
            value={values.companyName}
          />
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
    color: "rgba(0,0,0,.6)"
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

const mapDispatchToProps = (dispatch) => ({
  signIn: (object) => dispatch(signIn(object))
});



export default ClientSignupPage
