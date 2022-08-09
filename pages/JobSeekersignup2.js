import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
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


const JobSeekersignup2 = ({  navigation, }) => {
  const initialState = {
    expirationDate: new Date(),
    emiratesId: '',
    emiratesIdFrontSide: '',
    emiratesIdBackSide: '',
  }
  const dispatch = useDispatch()

  const [values, setValues] = useState(initialState)
  const [imageLoading, setImageLoading] = useState(false)
  const [imageLoading2, setImageLoading2] = useState(false)

  const {
    freelancer,
    isLoading,
    error,
    expirationDate,
    emiratesId,
    emiratesIdFrontSide,
    emiratesIdBackSide,
  } = useSelector((store) => store.freelancer)
  
  const onSubmit = () => {
    if(!isLoading && uploaded && uploaded2){

    if (
      !emiratesIdFrontSide ||
      !emiratesIdBackSide ||
      !expirationDate ||
      !emiratesId
    ) {
      alert('Please fill all the fields')
    } else {
      dispatch(
        completedProfile(true)
      )
      navigation.navigate('JobSignUp2')
    }
  }
  else {
    if(!uploaded || !uploaded2){
      alert("Uploading, please wait")
    }
  }

  }

  const [image, setImage] = useState({})
  const [image2, setImage2] = useState({})

  const [uploaded, setUploaded] = useState(false)
  const [uploaded2, setUploaded2] = useState(false)

  const [loading, setLoading] = useState(false)


  const selectFile = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    })
    if (!result.cancelled) {
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
      setImage2(result.uri)
      console.log('result', result.uri)
      upload2(result.uri)
    }
  }

  const upload = async (uri) => {
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
        console.log('response', response)
        console.log('response body', JSON.parse(response.body).imageUrl)
        const img = JSON.parse(response.body).imageUrl
        dispatch(
          handleChange({
            name: 'emiratesIdFrontSide',
            value: img,
          })
        )
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
        { body: 'back' }
      )
      console.log('response', response)
      console.log('response body', JSON.parse(response.body).imageUrl)
      const img = JSON.parse(response.body).imageUrl
      dispatch(
        handleChange({
          name: 'emiratesIdBackSide',
          value: img,
        })
      )
      setUploaded2(true)

    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(( ) => {
    console.log("expirationDate",typeof values.expirationDate.toDateString())
  }, [values.expirationDate])
  return loading? <View  style={styles.loadingStyle}>
          <ActivityIndicator size={'large'}/>
      </View>
  :(
      <ScrollView style={styles.container}>
      <Header
          icon={signUp}
          title='Create Profile'
          // numOfPage={<Image source={trash}></Image>}
          numOfPage='2/6'
          hidden={false}
          goBack={navigation.goBack}
      />
      <View style={styles.subContainer}>
          <Text style={styles.text}>
          Fill and upload the below required field and documents 
          </Text> 
          <DateInputs 
            placeholder='Expiration Date*'
            onChange={(value) =>
              dispatch(
                handleChange({
                  name: 'expirationDate',
                  value: value,
                })
              )
            }
            value={values.expirationDate}
          />
          <Inputs 
            title='Post Job' 
            placeholder='Emirates ID Number*'  
            numeric
            onChange={(value) =>
              dispatch(handleChange({ name: 'emiratesId', value }))
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
            ? <Image source={{uri:image}} style={styles.Imagecontainer} />
          : <UploadCard title='Emirates ID back side' selectFile={selectFile}/>
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
            ? <Image source={{uri:image2}} style={styles.Imagecontainer} />
          : <UploadCard title='Emirates ID back side' selectFile={selectFile2}/>
          }
          <TouchableOpacity style={styles.nextButton} onPress={() => onSubmit()}>
            <PrimaryButton title='Next'/>
          </TouchableOpacity>
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

;


export default JobSeekersignup2
