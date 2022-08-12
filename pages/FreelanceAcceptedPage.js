import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';

import Header from '../components/Header';
import congratsBg from '../assets/images/congratsBg.png';
import party from '../assets/images/party.png';
import profile from '../assets/images/profile.png';
import handShakeIcon from '../assets/images/handShakeIcon.png';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import TertiaryButton from '../components/Buttons/TertiaryButton';
import { LinearGradient } from 'expo-linear-gradient';


const FreelanceAcceptedPage = ({navigation}) => {

  const navigateDone = () => {
    navigation.navigate('jobDoneClient')
  }
  return (
    <View style={styles.wrapper}>
      <Header title='Something big is going to happen. We can feel it!' hidden={true} />
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
                source={profile}
                style={styles.profile}
              />
            </LinearGradient>
            <Image source={handShakeIcon} style={styles.handShakeIcon}/>
          </View>
          <Text style={styles.name}>Ahmad Mohamad</Text>
        </ImageBackground>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.primary} onPress={() => navigateDone()}>
            <PrimaryButton title='Contact Ahmad'  />
          </TouchableOpacity>
          <TertiaryButton title='Contact later' style={styles.contactLater} />
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
  }
})


export default FreelanceAcceptedPage
