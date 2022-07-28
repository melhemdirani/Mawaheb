import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import congratsBg from '../assets/images/congratsBg.png'
import congratsProfileBg from '../assets/images/congratsProfileBg.png'
import handShakeIcon from '../assets/images/handShakeIcon.png'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import TertiaryButton from '../components/Buttons/TertiaryButton'

const FreelanceAcceptedPage = () => {
  return (
    <View style={styles.wrapper}>
      <Header title='Let’s get the job done' hidden={true} />
      <View style={styles.container}>
        <Text style={styles.text}> Congratulations!</Text>
        <ImageBackground
          source={congratsBg}
          style={styles.congratsBg}
          resizeMode='stretch'
        >
          <Image
            source={congratsProfileBg}
            style={styles.congratsProfileBg}
          ></Image>
          <Text style={styles.name}>Ahmad Mohamad</Text>
          <Image source={handShakeIcon} style={styles.handShakeIcon}></Image>
        </ImageBackground>
        <View style={styles.btnContainer}>
          <View style={styles.primary}>
          
            <PrimaryButton title='Contact Ahmad' />
          </View>

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
    fontSize: 35,
    textAlign: 'center',
    marginTop: 40,
    color: '#31BEBB',
    fontFamily: 'PoppinsB',
    marginBottom: 80,
  },
  congratsBg: {
    width: '100%',
    height: 300,
  },
  congratsProfileBg: {
    height: 200,
    top: -90,
    left: 100,
  },
  handShakeIcon: {
   top: -200,
   left: 140,
  },
  name: {

    fontSize: 20,
    color: '#fff',
    fontFamily: 'PoppinsS',
    textAlign: 'center',
    marginTop: -10,
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
   

  }
})


export default FreelanceAcceptedPage
