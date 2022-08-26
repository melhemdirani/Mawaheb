import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Pressable,
  } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useSelector, useDispatch } from 'react-redux';


import signUp from '../assets/images/signUp.png';

import Header from '../components/Header';
import Inputs from '../components/Inputs';
import UploadCard from '../components/UploadCard';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import DateInputs from '../components/DateInputs';
import { handleChange, completedProfile } from '../reduxToolkit/freelancerSlice';
import ImageCard from '../components/ImageCard';


const JobSeekersignup2 = ({  navigation, route }) => {
  const {
    freelancer,
    isLoading,
    error,
    expirationDate,
    emiratesId,
    emiratesIdFrontSide,
    emiratesIdBackSide,
  } = useSelector((store) => store.freelancer)
  

  const { update } = route.params
  const initialState = update
  ? {
    expirationDate: freelancer.expirationDate !== undefined ? freelancer.expirationDate : "",
    emiratesId: freelancer.emiratesId !== undefined ? freelancer.emiratesId : "",
    emiratesIdFrontSide: freelancer.emiratesIdFrontSide !== undefined ? freelancer.emiratesIdFrontSide : "",
    emiratesIdBackSide: freelancer.emiratesIdBackSide!== undefined ? freelancer.emiratesIdBackSide : "",
  }
  : {
    expirationDate: '',
    emiratesId: '',
    emiratesIdFrontSide: '',
    emiratesIdBackSide: '',
  }
  const dispatch = useDispatch()

  const [values, setValues] = useState(initialState)
  const [activity, setActivity] = useState(false)
  const [startingToUpload, setStartingTopUpload] = useState(false)
  const [dispatched, setDipatched] = useState(false)
  const [uploadedImage, setUploadeImage] = useState( update &&  freelancer.emiratesIdFrontSide !== undefined ? freelancer.emiratesIdFrontSide : '')
  const [uploadedImage2, setUploadeImage2] = useState( update && freelancer.emiratesIdBackSide !== undefined  ? freelancer.emiratesIdBackSide : '')
  
  const submitNewValues = () => {
    dispatch(
      handleChange({
        name: 'emiratesIdFrontSide',
        value: uploadedImage,
      })
    )
    dispatch(
      handleChange({
        name: 'expirationDate',
        value: values.expirationDate,
      })
    )
    dispatch(
      handleChange({
        name: 'emiratesId',
        value: values.emiratesId,
      })
    )
    dispatch(
      handleChange({
        name: 'emiratesIdBackSide',
        value: uploadedImage2,
      })
    )
    
  }
  useEffect(() => {
    if(update && !dispatched){
      submitNewValues()
      setDipatched(true)
    }
  }, [])

  const handleValuesChange = ({name, value}) => {
    console.log("name", name)
    console.log("value", value)
    setValues({...values, [name]: value})
  }
  const navigateNext = () => {
    navigation.navigate('JobSignUp2', {update: update})

  }
  useEffect(() => {
    console.log("values changed", values)
  }, [values])
  const onSubmit = () => {
    if (
      !uploadedImage.length > 0 ||
      !uploadedImage2.length >0 ||
      !values.expirationDate.length > 0 ||
      !values.emiratesId.length > 0
    ) {
      if(activity && expirationDate.length > 0 && emiratesId.length > 0){
        return alert("Uploading please wait")
      }
      else {
        return alert('Please fill all the fields')
      }
    } 
    if(!isLoading && uploaded && uploaded2){
    submitNewValues();
    dispatch(
      completedProfile(true)
    );
    navigateNext();
  }
  else {
    if(activity){
      alert("Uploading, please wait")
    }
  }

  }

  const [image, setImage] = useState(update && freelancer.emiratesIdFrontSide !== undefined && freelancer.emiratesIdFrontSide !== null ?`http://195.110.58.234:4000${freelancer.emiratesIdFrontSide}` : {})
  const [image2, setImage2] = useState(update && freelancer.emiratesIdBackSide !== undefined && freelancer.emiratesIdBackSide !== null ?`http://195.110.58.234:4000${freelancer.emiratesIdBackSide}` : {})
  console.log("freelancer.emiratesIdFrontSide", freelancer.emiratesIdBackSide)
  const [uploaded, setUploaded] = useState(freelancer.emiratesIdFrontSide !== undefined ? true :false)
  const [uploaded2, setUploaded2] = useState(freelancer.emiratesIdBackSide !== undefined ? true :false)

  const [loading, setLoading] = useState(false)


  const selectFile = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    })
    if (!result.cancelled) {
      !startingToUpload && setStartingTopUpload(true)
      setUploaded(false)

      setImage(result.uri)
      upload(result.uri)
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
      !startingToUpload && setStartingTopUpload(true)
      setUploaded2(false)
      setImage2(result.uri)
      console.log('result', result.uri)
      upload2(result.uri)
    }
  }

  const upload = async (uri) => {
      try {
        console.log('trying')
        const response = await FileSystem.uploadAsync(
          `http://195.110.58.234:4000/api/v1/freelancers/uploadImage`,
          uri,
          {
            fieldName: 'files',
            httpMethod: 'post',
            uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
          },
          { body: 'front' }
        )
        console.log('response', response)
        console.log('response body', JSON.parse(response.body).imageUrl)
        const img = JSON.parse(response.body).imageUrl
        console.log("image to be 222", img)
        setUploadeImage(img)
        setUploaded(true)

      } catch (error) {
        console.log(error)
        setUploaded(false)
        alert("Error uploading")
      }

  }
  const upload2 = async (uri) => {
    console.log('uploading file')
    try {
      console.log('trying')
      const response = await FileSystem.uploadAsync(
        `http://195.110.58.234:4000/api/v1/freelancers/uploadImage`,
        uri,
        {
          fieldName: 'files',
          httpMethod: 'post',
          uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
        },
      )
      console.log('response', response)
      console.log('response body', JSON.parse(response.body).imageUrl)
      const img = JSON.parse(response.body).imageUrl
      setUploadeImage2(img)
      setUploaded2(true)

    } catch (error) {
      console.log(error)
      setUploaded2(false)
      alert("Error uploading")
    }
  }

  const onImageDelete = () => {
    setStartingTopUpload(false)
    setUploaded(false);
    setImage({});
    setUploadeImage("")

  }

  const onImageDelete2 = () => {
    setStartingTopUpload(false)
    setUploaded2(false)
    setImage2({})
    setUploadeImage2("")
  }
  useEffect(( ) => {
    if(uploaded && uploaded2 && activity){
      setActivity(false)
    }
    if((!uploaded || !uploaded2) && !activity && startingToUpload){
      setActivity(true)
    }
  }, [uploaded, uploaded2, startingToUpload])

  useEffect(() => {
   console.log("uploadedImage", freelancer.emiratesIdBackSide) 
  }, [freelancer.emiratesIdBackSide])
  return loading? <View  style={styles.loadingStyle}>
          <ActivityIndicator size={'large'}/>
      </View>
  :(
      <ScrollView style={styles.container}>
      <Header
          icon={signUp}
          title={update ?'Update Profile' :'Create Profile'}
          // numOfPage={<Image source={trash}></Image>}
          numOfPage='2/6'
          hidden={false}
          goBack={navigation.goBack}
      />
      <View style={styles.subContainer}>
          { !update &&
            <Text style={styles.text}>
              Create and verify your profile in less than 2 minutes. Fill in your name and upload a picture of your passport, ID, and Visa.
            </Text> 
          }
          <Inputs 
            title='Post Job' 
            placeholder='Emirates ID Number*'  
            numeric
            onChange={(value) =>
              handleValuesChange({ name: 'emiratesId', value })
            }
            value={values.emiratesId}
          />
          <DateInputs 
            placeholder='Expiration Date*'
            valued
            value={values.expirationDate}
            onChange={(value) =>
                handleValuesChange({
                  name: 'expirationDate',
                  value: value,
                })
            }
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
            ? <ImageCard uri={image} onImageDelete={() => onImageDelete()} />

            : <UploadCard title='Front side of your Emirates ID' selectFile={selectFile}/>
          }
          { 
            image2.length && !uploaded2
            ? <View style={{width: "100%", alignItems: "center"}}>
                <View style={styles.ActivityIndicator}>
                  <ActivityIndicator size={"large"} />
                </View>
                <Image source={{uri:image2}} style={styles.Imagecontainer} />
              </View>
            : image2.length && uploaded2
            ? <ImageCard uri={image2} onImageDelete={() => onImageDelete2()} />
            : <UploadCard title='Back side of your Emirates ID' selectFile={selectFile2}/>
          }
          <TouchableOpacity style={styles.nextButton} onPress={() => onSubmit()}>
            <PrimaryButton title='Next' activity={activity}/>
          </TouchableOpacity>
          { update &&
            <TouchableOpacity onPress={() =>  navigateNext()}>
              <Text style={styles.skipText}>
                  SKIP
              </Text>
            </TouchableOpacity>
          }
        </View>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  Imagecontainer: {
    justifyContent: "center",
    height: 230,
    width: "85%",
    borderRadius: 20,
    marginVertical: 10
  },
  subContainer: {
    alignItems: 'center',
    paddingTop: 50,
  },
  text: {
    width: '72%',
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
  },
  deletebutton:{
    position: "absolute",
    top: 20,
    right: 40
  },
  skipText:{
    fontFamily: 'PoppinsS',
    fontSize: 15,
    marginTop: -25,
    marginBottom: 80,
    letterSpacing: 2
  }
})

;


export default JobSeekersignup2
