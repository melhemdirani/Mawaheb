import React, {useState} from 'react';
import Carousel from 'react-native-anchor-carousel'; 
import PaginationDot from 'react-native-animated-pagination-dot'
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
  Pressable
} from 'react-native'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import SecondaryButton from '../components/Buttons/SecondaryButton'
import TertiaryButton from '../components/Buttons/TertiaryButton'
import axios from 'axios'
import { useEffect } from 'react'


const height = Dimensions.get('window').height

export default function SignupPage({ navigation }) {
  const {width: windowWidth} = Dimensions.get('window');
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = React.useRef(null);
  function handleCarouselScrollEnd(item, index) {
      setCurrentIndex(index);
  }
  const navigateJob = () => {
    navigation.navigate('JobSignUp', { role: 'freelancer', update: false })
  }
  const navigateLogin = () => {
    navigation.navigate('login')
  }
  const navigateCSignup = () => {
    navigation.navigate('recruiter_signup', { role: 'client' })

  }

  const renderItem = ({item, index}) => {
    return(
      <Pressable
        onPress={() => {
        carouselRef.current.scrollToIndex(index);
        }}
      >
        <Image
          style={styles.image}
          source={require('../assets/images/signupheader.png')}
        />
        <Text style={styles.header}>Quick Easy Simple!</Text>
      </Pressable>

    )
  }
  
  return (
    <ScrollView style={styles.container}>
        <Carousel
          ref={carouselRef}
          data={[1, 2, 3, 4, 5]}
          renderItem={renderItem}
          style={styles.carousel}
          itemWidth={windowWidth }
          containerWidth={windowWidth}
          separatorWidth={0}
          onScrollEnd={handleCarouselScrollEnd}
        />
        <View style={styles.dots}>
          <PaginationDot
              activeDotColor={'#16DBC7'}
              curPage={currentIndex}
              maxPage={5}
          />
        </View>
       
      <Text style={styles.text}>
        <Text style={styles.text1}>Mawahib </Text>
        connects businesses with professional freelancers and agencies around the MENA region.
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => {navigateJob()}}>
          <PrimaryButton title='Looking for a job' />
        </TouchableOpacity>
        <View style={styles.spacing} />
        <TouchableOpacity onPress={() => {navigateCSignup()}}>
          <SecondaryButton title='Looking for a resource'  />
        </TouchableOpacity>
        <View style={styles.spacing} />
        <TouchableOpacity onPress={() => {navigateLogin()}}>
        <TertiaryButton title='Login' />
        </TouchableOpacity>
      </View>
 
    </ScrollView>
  )
}

const styles =
  Platform.OS === 'android'
    ? StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: 'white',
        },
        buttons:{
          alignSelf: "center"
        },
        dots:{
          zIndex: 999,
          marginTop: -30,
          marginLeft: 30,
          alignSelf: "flex-start"
        },
        carousel: {
          flexGrow: 0,
          zIndex:999,
        },
        header: {
          position: 'absolute',
          top: 108,
          alignSelf: 'flex-start',
          fontSize: 40,
          fontWeight: '800',
          maxWidth: '40%',
          height: 300,
          color: 'white',
          left: 15,
          lineHeight: 45,
          fontFamily: 'PoppinsB',
        },
        image: {
          width: '100%',
          height: 490,
          marginTop: -50,
          zIndex: -1
        },
        spacing: {
          marginBottom: 12,
        },
        text: {
          color: 'black',
          width: '90%',
          marginTop: 25,
          fontSize: 16,
          alignSelf: "center",
          lineHeight: 18,
          marginBottom: 20,
          fontFamily: 'PoppinsR',
        },
        text1: {
          color: '#9C88FD',
          fontWeight: '700',
        },
      })
    : StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: 'white',
        },
        buttons:{
          alignSelf: "center"
        },
        carousel: {
          flexGrow: 0,
          zIndex:999,
        },
        dots:{
          zIndex: 999,
          marginTop: -30,
          marginLeft: 30,
          alignSelf: "flex-start"
        },
        header: {
          position: 'absolute',
          top: 88,
          alignSelf: 'flex-start',
          fontSize: 40,
          fontWeight: '800',
          maxWidth: '55%',
          height: 300,
          color: 'white',
          left: 15,
          lineHeight: 45,
          fontFamily: 'PoppinsB',
        },
        image: {
          width: '100%',
          height: 500,
        },
        spacing: {
          marginBottom: 10,
        },
        text: {
          color: 'black',
          width: '90%',
          marginTop: 30,
          alignSelf: "center",
          fontSize: 17,
          lineHeight: 25,
          marginBottom: 30,
          fontFamily: 'PoppinsR',
        },
        text1: {
          color: '#9C88FD',
          fontWeight: '700',
        },
      })
