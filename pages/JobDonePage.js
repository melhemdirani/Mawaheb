import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import congratsBg from '../assets/images/congratsBg.png'
import congratsProfileBg from '../assets/images/congratsProfileBg.png'
import handShakeIcon from '../assets/images/handShakeIcon.png'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import TertiaryButton from '../components/Buttons/TertiaryButton'
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'

const JobDonePage = () => {
  return (
    <View style={styles.wrapper}>
      <Header title='Let’s get the job done' hidden={true} />
      <View style={styles.container}>
        <MaskedView
          maskElement={
            <Text style={[styles.text, { backgroundColor: 'transparent' }]}>
              How was your experience with ahmad?
            </Text>
          }
        >
          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#31BEBB', '#655BDA']}
          >
            <Text style={[styles.text, { opacity: 0 }]}>
              How was your experience with ahmad?
            </Text>
          </LinearGradient>
        </MaskedView>

        <ImageBackground
          source={congratsBg}
          style={styles.congratsBg}
          resizeMode='stretch'
        ></ImageBackground>
        <View style={styles.btnContainer}>
          <View style={styles.primary}>
            <PrimaryButton title='Confirm' />
          </View>

          <TertiaryButton title='Dismiss' style={styles.contactLater} />
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
    fontSize: 17,
    textAlign: 'center',
    marginTop: 40,
    color: '#31BEBB',
    fontFamily: 'PoppinsS',
    marginBottom: 80,
    width: '100%',
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
  contactLater: {},
})

export default JobDonePage
