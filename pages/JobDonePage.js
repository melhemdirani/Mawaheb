import React, { useState} from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';

import Header from '../components/Header';
import congratsBg from '../assets/images/congratsBg.png';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import TertiaryButton from '../components/Buttons/TertiaryButton';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import profile from '../assets/images/profile.png';
import emptyStar from '../assets/images/emptyStar.png';
import fullStar from '../assets/images/fullStar.png';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';


const JobDonePage = ({navigation}) => {

  const navigateDash = () => {
    navigation.navigate('recruiter_dashboard')
  }

  const confirmPress = () => {
    alert('Thank you for your feedback!')
    navigation.navigate('recruiter_dashboard')
  }
  const [rate, setRate] = useState(0)

  return (
    <View style={styles.wrapper}>
      <Header title='Job done!' hidden={true} icon={profile} profile rating={4.8}/>
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
        >
        {[...Array(5)].map((e, i) =>   
          <Pressable onPress={() => setRate(i)}>
            <Image source={i > rate ? emptyStar : fullStar} style={styles.starts} />
          </Pressable>
        )}
        </ImageBackground>
        <View style={styles.btnContainer}>
          <View style={styles.primary}>
            <PrimaryButton title='Confirm' navigate={confirmPress}/>
          </View>

          <TertiaryButton title='Dismiss' style={styles.contactLater}  navigate={navigateDash}/>
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
    top: 20
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
    height: 270,
    flexDirection: "row",
    alignItems: "center",
    top: -30,
    justifyContent: "space-evenly"
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
