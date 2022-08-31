import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'

import Header from '../components/Header';
import congratsBg from '../assets/images/congratsBg.png';
import party from '../assets/images/party.png';
import profile from '../assets/images/profile.png';
import handShakeIcon from '../assets/images/handShakeIcon.png';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import TertiaryButton from '../components/Buttons/TertiaryButton';
import { LinearGradient } from 'expo-linear-gradient';
import { getFreelancer } from '../reduxToolkit/freelancerSlice';
import { getClientbyId } from '../reduxToolkit/clientSlice';


const FreelancerSigned = ({navigation, route}) => {
  const [acceptedFreelancer, setAcceptedFreelancer] = useState({})
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const {role, action} = route.params
  useEffect(() => {
    if(role === "client"){
      dispatch(getFreelancer(action))
      .unwrap()
      .then( res => {
        console.log("ress", res);
        setAcceptedFreelancer(res.freelancer);
        setLoading(false)
      })
      .catch(err => {
        console.log("error", err)
        setLoading(false)
      })
    } else{
      dispatch(getClientbyId(action))
      .unwrap()
      .then( res => {
        console.log("ress", res);
        setAcceptedFreelancer(res.client);
        setLoading(false)
      })
      .catch(err => {
        console.log("error", err)
        setLoading(false)
      })
    }
  }, [])
  const navigateDone = () => {
    if(role === 'client'){
      navigation.navigate('recruiter_dashboard')
    } else{
       navigation.navigate('seeker_dash')
    }
  }
  const navigateContact = () => {
    if(role === "client"){
      navigation.navigate('contactFreelancer')
    } else {
      navigation.navigate('contactClient')

    }
  }
  return loading? <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
    <ActivityIndicator size={"large"} color="#4E84D5"/>
  </View>
  :(
    <View style={styles.wrapper}>
      <Header title='Something big is going to happen. We can feel it!' hidden={true} center/>
      <View style={styles.container}>
        <Text style={styles.text}> Congratulations!</Text>
        <ImageBackground
          source={congratsBg}
          style={styles.congratsBg}
          resizeMode='stretch'
        >
          <View style={styles.imageContainer}>
            <Image source={party} style={styles.party}/>
             
            <LinearGradient
              start={{x:0, y: 0}}
              end={{x:1, y: 1}}
              colors={['#107DC5', '#23CDB0','#23CDB0','#23CDB0', '#0482AA', ]}
              style={styles.proifleContainer}
            >
            <Image      
              source={{uri: `http://195.110.58.234:4000${acceptedFreelancer.user.profileImage}`}} 
              style={styles.profileImage}
            />
            </LinearGradient>
            <Image source={handShakeIcon} style={styles.handShakeIcon}/>
          </View>
          <Text style={styles.name}>{acceptedFreelancer.user.name}</Text>
        </ImageBackground>
        <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.primary} onPress={() => navigateContact()}>
              <PrimaryButton title={`Contact ${acceptedFreelancer.user.name}`} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.primary} onPress={() => navigateDone()}>
              <TertiaryButton title='Contact later' style={styles.contactLater} />
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    marginTop: 40,
    color: '#31BEBB',
    fontFamily: 'PoppinsB',
    marginBottom: 80,
  },
  congratsBg: {
    width: '100%',
    height: 270,
  },
  proifleContainer: {
    backgroundColor: "#23CDB0",
    borderRadius: 100,
    padding: 10
  },
  handShakeIcon: {
    top: -50
  },
  name: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'PoppinsB',
    textAlign: 'center',
    top: -80
  },
  btnContainer: {
   alignItems: 'center',
   justifyContent: 'space-between',
   marginTop: 40,
  },
  primary: {
   marginBottom: 20,
  
  },
  contactLater: {
   

  },
  imageContainer:{
    alignItems: "center",
    zIndex: 99,
    top: -40
  },
  party:{
    position: "absolute",
    top: -70,
    zIndex: -1
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderColor: ' rgba(16, 125, 197, 1)',
    borderWidth: 1,
    zIndex: 999,
    backgroundColor: 'white',
  },
})


export default FreelancerSigned
