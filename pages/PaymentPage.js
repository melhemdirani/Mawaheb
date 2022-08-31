import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Switch,
    Pressable,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import Inputs from '../components/Inputs';
import UploadCard from '../components/UploadCard';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryButton from '../components/Buttons/PrimaryButton';

import Header from '../components/Header';
import payment from '../assets/images/paymentIcon.png';
import checked from '../assets/images/checked.png';
import unChecked from '../assets/images/unChecked.png';
import { createJob } from '../reduxToolkit/jobSlice';
import ImageCard from '../components/ImageCard';

  
  const PaymentPage = ({navigation, route}) => {
    const {values} = route.params
    console.log("params", route)
    const { user } = useSelector((state) => state.user)
    const { client } = useSelector((state) => state.client)

    const dispatch = useDispatch()

    const intitialState = {
      cardNumber:"",
      cardHolder: "",
      ccv: "",
      bankName: "",
      swift: "",
      iban: "",
      address: "",
      po: "",
      billingAddress: "",
      billingEmail:""
    }
    const [paymentDetails, setPaymentDetails] = useState(intitialState)
    const handleChange = (name, value) => {
      setPaymentDetails({...paymentDetails, [name]: value})
    }
    const [isEnabled, setIsEnabled] = useState(false)
    const [card, setCard] = useState(true)
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

    const onPostClick = () => {
       dispatch(
        createJob({
          category: values.category,
          title: values.title,
          startDate: values.startDate,
          endDate: values.endDate,
          location: values.location,
          yearsOfExperience: values.yearsOfExperience,
          description: values.description,
          budget: parseInt(values.budget),
          privacy: isEnabled ? 'private' : 'public',
          clientId: user.clientId? user.clientId : client.id,
          duration: new Date(),
          shift: values.shift
        })
      )
      .unwrap()
      .then((response) => {
        alert("Thank you! Your job was posted")
        let date = new Date()
        navigation.navigate('recruiter_dashboard', {id: date.toDateString()})
      })
      .catch((error) => {
        console.log("error updating", error)
        alert("Error creating a job, please try again later")
        navigation.navigate("recruiter_dashboard")
      })
    }
    const [image, setImage] = useState("")
    const [uploaded, setUploaded] = useState(false)

    const onImageDelete = () => {
      setImage("");
      setUploaded(false)
    }
    const selectFile = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      })
      if (!result.cancelled) {
        setImage(result.uri)
        setTimeout(() => {
          setUploaded(true)
        }, 500)
        
      }
    }
    // const upload = async (uri) => {
    //   console.log("uploading")
    //   try {
    //     const response = await FileSystem.uploadAsync(
    //       `http://195.110.58.234:4000/api/v1/auth/uploadImage/`,
    //       uri,
    //       {
    //         fieldName: 'files',
    //         httpMethod: 'post',
    //         uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
    //       },
         
    //     )
    //     const img = JSON.parse(response.body).imageUrl
    //     console.log("uploading response", img)
    //     setUploadedImage(img)
    //   } catch (error) {
    //     console.log("error uploading", error)
    //     setUploaded(false)
    //     alert("Error uploading")
    //   }
    // }

    return (
      <ScrollView style={styles.wrapper}>
        <Header 
          title='Payment Details' 
          icon={payment} 
          numOfPage='2/2'
          hidden={false}
          goBack={navigation.goBack}
        />
        <View style={styles.container}>
          <Text style={styles.text}>{
            isEnabled ? "Upload a PO document to finalize your job posting" 
            : "Payment option just for testing, simply click pay and post a job"
            }
          </Text>
            <View style={styles.form}>
                <View style={styles.privacy}>
                    <Text style={!isEnabled ? styles.picked : styles.notPicked}>Pre-paid </Text>
                    <Switch
                    style={styles.switch}
                    ios_backgroundColor='#23CDB0'
                    trackColor={{ false: '#23CDB0', true: '#23CDB0' }}
                    thumbColor={'#f4f3f4'}
                    onValueChange={() => toggleSwitch() }
                    value={isEnabled}
                    ></Switch>
                    <Text style={isEnabled ? styles.picked : styles.notPicked}> Post-paid</Text>
                </View>
            </View>
            {
              !isEnabled ?
              <View style={styles.PrepaidView}>
                <View style={[styles.checkContainer, styles.checkContainer2]}>
                    <Pressable style={styles.checkContainer} onPress={() => setCard(true)}>
                        <Image
                            style={styles.check}
                            source={card ? checked : unChecked}
                        />
                        <Text style={styles.checkText}>Pay With Card</Text>
                    </Pressable>
                    <Pressable style={styles.checkContainer} onPress={() => setCard(false)}>
                        <Image
                            style={styles.check}
                            source={!card ? checked : unChecked}
                        />
                        <Text style={styles.checkText}>Bank Transfer</Text>
                    </Pressable>
                </View>
              
                {   
                    card 
                    ? <View style={styles.PrepaidView}>
                            <Inputs 
                            placeholder='Card Number*' 
                            value={paymentDetails.cardNumber}
                            onChange={(value) =>handleChange("cardNumber", value)}
                            />
                            <Inputs 
                            placeholder='Card Holder Name*' 
                            value={paymentDetails.cardHolder}
                            onChange={(value) => handleChange("cardHolder", value)}
                            />
                            <Inputs 
                            placeholder='CCV*' 
                            value={paymentDetails.ccv}
                            onChange={(value) =>handleChange("ccv", value)}
                            />
                    </View>
                    : <View style={styles.PrepaidView}>
                        <Inputs 
                          placeholder='Bank Name*' 
                          value={paymentDetails.bankName}
                          onChange={(value) =>handleChange("bankName", value)}/>
                        <Inputs 
                          placeholder='Swift Code*' 
                          value={paymentDetails.swift}
                          onChange={(value) =>handleChange("swift", value)}/>
                        <Inputs 
                          placeholder='IBAN*' 
                          value={paymentDetails.iban}
                          onChange={(value) => handleChange('iban', value)}
                          />
                        <Inputs 
                          placeholder='Address*' 
                          value={paymentDetails.address}
                          onChange={(value) =>handleChange("address", value)}
                        />
                    </View>
                }

              </View>
              :
              <View style={[styles.PrepaidView, {paddingTop: 30}]} >
                { 
                  image.length && !uploaded
                  ? <View style={{width: "100%", alignItems: "center"}}>
                      <View style={styles.ActivityIndicator}>
                      <ActivityIndicator size={"large"} color="#4E84D5"/>
                      </View>
                      <Image source={{uri:image}} style={styles.Imagecontainer} />
                    </View>
                  : image.length && uploaded
                  ? <ImageCard uri={image} onImageDelete={onImageDelete} />
                  : <UploadCard title='Upload PO Document*' selectFile={selectFile}/>
                }
                <Inputs 
                  placeholder='Billing Address*' 
                  value={paymentDetails.billingAddress}
                  onChange={(value) =>handleChange("billingAddress", value)}
                />
                <Inputs 
                  placeholder='Billing E-mail*' 
                  value={paymentDetails.billingEmail}
                  onChange={(value) =>handleChange("billingEmail", value)}
                />
              </View>
            }
            <TouchableOpacity style={styles.btnContainer} onPress={() => onPostClick()}>
                <PrimaryButton title='Pay and Post Job' />
            </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
  
  const styles = StyleSheet.create({
    paymentWrapper:{
      width: "85%",
      alignItems: "center",
      borderBottomColor: "#107DC5",
      borderBottomWidth: 1,
      marginBottom: 20
    },
    Imagecontainer: {
      justifyContent: 'center',
      height: 230,
      width: '85%',
      borderRadius: 20,
      marginVertical: 10,
    },
    wrapper: {
      backgroundColor: '#fff',
      flex: 1,
    },
    PrepaidView:{
        width: "100%",
        alignItems: "center"
    },  
    checkText:{
        fontFamily: 'PoppinsR',
        fontSize: 13,
        marginLeft: 10,
        top: 3
    },
    checkContainer:{
        flexDirection: "row",
        alignSelf: "center",
        paddingVertical: 20,
    }, 
    checkContainer2:{
        justifyContent: "space-between",
        width: "85%"
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
    text: {
      fontSize: 13,
      fontFamily: 'PoppinsR',
      color: "rgba(0,0,0,.6)",
      alignSelf: "center",
      textAlign: "center",
      width: "80%"
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
  })
  
  export default PaymentPage
  