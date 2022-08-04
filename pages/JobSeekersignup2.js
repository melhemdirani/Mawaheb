import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    Image,
    ScrollView,
    Pressable,
  } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { connect } from 'react-redux';

import { setUserId } from '../redux/user/user.actions';
import { signIn } from '../redux/user/user.actions';

import signUp from '../assets/images/signUp.png';

import Header from '../components/Header';
import Inputs from '../components/Inputs';
import UploadCard from '../components/UploadCard';
import PrimaryButton from '../components/Buttons/PrimaryButton';

const JobSeekersignup = ({  navigation, setUserId, signIn }) => {
  setUserId()
  const [id, setId] = useState()
  const [expiration, setExpiration] = useState('')
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [imageurl1, setImageurl1] = useState()
  const [imageurl2, setImageurl2] = useState()
  const [uploaded, setUploaded]  = useState(false)

  const [loading, setLoading] = useState(false)

  const navigateExperience = () => {
    navigation.navigate("JobSignUp2")
  } 
  signIn()
  const register = async () => {
    let url = "http://194.5.157.234:4000/api/v1/freelancers/"
    if(expiration === '' || image === '' || image2 === '' || id === '' ){
      return alert('Please fill in all required inputs*')
    }
    try {
    const {data} = await axios.post(url,{
        expirationDate:expiration,
        emiratesIdFrontSide:imageurl1,
        emiratesIdBackSide: imageurl2,
        emiratesId: id
    })
      navigation.navigate("JobSignUp2")
      console.log("data", data)
    } catch (error) {
      console.log(error.response.data.msg)
    }

  }

  
  const selectFile = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      upload(result.uri)
    }
  };
  const selectFile2 = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      setImage2(result.uri);
      console.log("result", result.uri)
      upload2(result.uri)

    }
  };

  const upload = async(uri) => {
    console.log("uploading file")
    try {
      console.log("trying")
      const response = await FileSystem.uploadAsync(
        `http://194.5.157.234:4000/api/v1/freelancers/uploadImage`,
        uri,
        {
          fieldName: "files",
          httpMethod: "post",
          uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
        },
        {body: "front"}
      )
      console.log(JSON.stringify(response, null, 4))
      console.log("response", response)
      console.log("response body", JSON.parse(response.body).imageUrl)
      setImageurl1(JSON.parse(response.body).imageUrl)
    } catch(error) {
      console.log(error)
    }
  }
  const upload2 = async(uri) => {
    console.log("uploading file")
    try {
      console.log("trying")
      const response = await FileSystem.uploadAsync(
        `http://194.5.157.234:4000/api/v1/freelancers/uploadImage`,
        uri,
        {
          fieldName: "files",
          httpMethod: "post",
          uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
        },
        {body: "back"}

      )
      console.log(JSON.stringify(response, null, 4))
      console.log("response", response)
      console.log("response body", JSON.parse(response.body).imageUrl)

      setImageurl2(JSON.parse(response.body).imageUrl)

    } catch(error) {
      console.log(error)
    }
  }
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
            <Inputs title='Continue to Payment' placeholder='Expiration Date*'onChange={setExpiration}/>
            <Inputs title='Continue to Payment' placeholder='Emirates ID Number*' onChange={setId} numeric/>
            { 
            image 
            ? <Image source={{uri:image}} style={styles.Imagecontainer} />
            : <UploadCard title='Emirates ID front side' selectFile={selectFile}/>
            }
            { 
            image2 
            ? <Image source={{uri:image2}} style={styles.Imagecontainer} />
            : <UploadCard title='Emirates ID back side' selectFile={selectFile2}/>
            }
            <Pressable style={styles.nextButton} >
            <PrimaryButton title='Next' navigate={register} />
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

})

;
const mapDispatchToProps = (dispatch) => {
  return {
    setUserId: (id) => dispatch(id),
    signIn: () => signIn(),
  }
}



export default connect(null, mapDispatchToProps)(JobSeekersignup)
