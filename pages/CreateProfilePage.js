import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useSelector, useDispatch } from 'react-redux';

import { handleChange } from '../reduxToolkit/freelancerSlice';


import signUp from '../assets/images/signUp.png';

import Header from '../components/Header';
import Inputs from '../components/Inputs';
import UploadCard from '../components/UploadCard';
import PrimaryButton from '../components/Buttons/PrimaryButton';



const CreateProfilePage = ({  navigation }) => {
  
  const dispatch = useDispatch()

  const {
    copyOfPassport,
    copyOfResidencyVisa
  } = useSelector((store) => store.freelancer)

  const [uploaded, setUploaded] = useState(false)
  const [uploaded2, setUploaded2] = useState(false)

  const [passCopy, setPassCopy] = useState({})
  const [visaCopy, setVisaCopy] = useState({})

  useEffect(() => {
    console.log("copyOfResidencyVisa", copyOfResidencyVisa)
    console.log("copyOfPassport", copyOfPassport)
  }, [copyOfPassport,copyOfResidencyVisa ])
  const navigateExperience = () => {
    // setUser({copyOfPassport: "", copyOfResidencyVisa: ""})
    navigation.navigate("experience")
  } 

  // const register = async () => {
  //   let url = "http://194.5.157.234:4000/api/v1/freelancers/"
  //   if(expiration === '' || image === '' || image2 === '' || id === '' ){
  //     return alert('Please fill in all required inputs*')
  //   }
  //   try {
  //   const {data} = await axios.post(url,{
  //       expirationDate:expiration,
  //       emiratesIdFrontSide:imageurl1,
  //       emiratesIdBackSide: imageurl2,
  //       emiratesId: id
  //   })
  //     navigation.navigate("JobSignUp2")
  //     console.log("data", data)
  //   } catch (error) {
  //     console.log(error.response.data.msg)
  //   } 

  // }
  const selectFile = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      setPassCopy(result.uri);
      setUploaded(true)
      dispatch(
        handleChange({
          name: 'copyOfPassport',
          value: result.uri,
        })
      )
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
      setVisaCopy(result.uri);
      setUploaded2(true)
      dispatch(
        handleChange({
          name: 'copyOfResidencyVisa',
          value: result.uri,
        })
      )
    }
  };
  const handleSubmit = () => {
    console.log("pass",copyOfPassport )
    console.log("res",copyOfResidencyVisa )
    if(copyOfPassport === '' || copyOfResidencyVisa === ''){
      alert("Please upload all required documents")
    } else{
      navigation.navigate("experience")
    }
  }
  return (
    <ScrollView style={styles.container}>
      <Header
        icon={signUp}
        title='Create Profile'
        // numOfPage={<Image source={trash}></Image>}
        numOfPage='3/6'
        hidden={false}
        goBack={navigation.goBack}
      />
      <View style={styles.subContainer}>
        <Text style={styles.text}>
          Upload the below documents
        </Text>
          {
            uploaded  
            ? <Image source={{uri:passCopy}} style={styles.Imagecontainer} />
            : <UploadCard title='Copy of passport' selectFile={selectFile} />
          }
          {
            uploaded2  
            ? <Image source={{uri:visaCopy}} style={styles.Imagecontainer} />
            : <UploadCard title='Copy of residency visa' selectFile={selectFile2} />
          }
        <TouchableOpacity onPress={() => handleSubmit()} style={styles.nextButton} >
          <PrimaryButton title='Next' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("experience")}>
          <Text style={styles.skipText}>
              SKIP
          </Text>
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
  skipText:{
    fontFamily: 'PoppinsS',
    fontSize: 15,
    marginTop: -25,
    marginBottom: 80,
    letterSpacing: 2
  },
  Imagecontainer: {
    justifyContent: "center",
    height: 230,
    width: "85%",
    borderRadius: 20,
    marginVertical: 10
  },
})




export default CreateProfilePage
