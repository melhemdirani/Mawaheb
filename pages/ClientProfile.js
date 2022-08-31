import React, {  useEffect, useLayoutEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import clockIcon from '../assets/images/clockIcon.png'
import locationIcon from '../assets/images/locationIcon.png'
import MaskedView from '@react-native-masked-view/masked-view'

import PrimaryButton from '../components/Buttons/PrimaryButton'
import minusIcon from '../assets/images/minusIcon.png'
import { useSelector, useDispatch } from 'react-redux'
import { getClientbyId } from '../reduxToolkit/clientSlice'

const ClientProfile = ({ navigation, route }) => {
  const navigateEdit = () => {
    navigation.navigate("editProfileClient", {clientProfile})
  }


  const { user } = useSelector((state) => state.user)
  const { client } = useSelector((state) => state.client)

  const [clientProfile, setClientProfile] = useState(client)

  const [loaded, setLoaded] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {

    if(clientProfile !== {} && clientProfile!== undefined ){
    if(user.clientId === undefined && !client){

      return  navigation.navigate("editProfileClient", {clientProfile: {
        companyName: "",
        privacy: "", 
        signatoryName:"",
        signatoryTitle:"", 
        sign:"", 
        Address:"",
        TRN:"",
        email:"",
        phoneNb:"",
        tradingLicense:"",
        user:{
          phoneNb:""
        },

        notCompleted: true
      }
      })

    }
    setLoaded(true)

    dispatch(getClientbyId(user.clientId ? user.clientId : client.id))
      .unwrap()
      .then(res => {
        setClientProfile(res.client)
        setLoaded(false)
      })
      .catch(err =>{
        console.log("error", err)
        setLoaded(false)
      })
    }
   

  }, [user, route])

//   useLayoutEffect(() => {
//     if(!loaded){
//       dispatch(getFreelancer(user.freelancerId))
//     }
//   }, [])


  return  loaded || !client ? <View style={{marginTop: 400}}>
        <ActivityIndicator size={"large"}/>
      </View>
    :(
    <ScrollView style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.subHeader}>
          {
            clientProfile.user.profileImage !== undefined
            ? <Image 
              source={{
                uri: `http://195.110.58.234:4000${clientProfile.user.profileImage}`
              }} 
              style={styles.profileImage}
            />
            : <View style={styles.circle} />

          }

        </View>
        <View style={styles.subHeader}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={minusIcon} style={styles.plus}></Image>
          </Pressable>
        </View>
      </View>
      <LinearGradient
        colors={[
          'rgba(202, 218, 221, 0.1)',
          'rgba(202, 218, 221, 0)',
          'rgba(202, 218, 221, 0.2)',
          'rgba(202, 218, 221, 0.2)',
          'rgba(202, 218, 221, 0.2)',
          'rgba(202, 218, 221, 0.1)',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.linear}
      >
        <View style={[styles.container, styles.shadow]}>
          <View style={styles.info}>
            <MaskedView
              maskElement={
                <Text
                  style={[styles.title, { backgroundColor: 'transparent' }]}
                >
                  {clientProfile.companyName}
                </Text>
              }
            >
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['rgba(49, 190, 187, 1)', 'rgba(101, 91, 218, 1)']}
              >
                <Text style={[styles.title, { opacity: 0 }]}> {clientProfile.companyName}</Text>
              </LinearGradient>
            </MaskedView>
            <View style={{left: 20}}>
              <Text style={styles.text}>
                Company type: <Text style={styles.text2}>{clientProfile.privacy}</Text>
              </Text>
             
              {
                clientProfile.privacy === "public"
                ?<View style={styles.descriptionContainer}>
                  <Text style={styles.text}>
                    Signatory name: <Text style={styles.text2}>{clientProfile.signatoryName}</Text>
                  </Text>
                  <Text style={styles.text}>
                    Signatory title: <Text style={styles.text2}>{clientProfile.signatoryTitle}</Text>
                  </Text>
                  <Image source={{uri: `http://195.110.58.234:4000${clientProfile.sign}`}} style={styles.Imagecontainer}/>
                </View>
                :<View style={styles.descriptionContainer}>
                  <Text style={styles.text}>
                    TRN: <Text style={styles.text2}>{clientProfile.TRN}</Text>
                  </Text>
                  <Text style={styles.text}>
                    Address: <Text style={styles.text2}>{clientProfile.Address}</Text>
                  </Text>
                  <Image source={{uri: `http://195.110.58.234:4000${clientProfile.tradingLicense}`}} style={styles.Imagecontainer}/>
                </View>
              }

            </View>
          </View>
          <LinearGradient
            colors={[
              'rgba(202, 218, 221, 0.4)',
              'rgba(202, 218, 221, 0)',
              'rgba(202, 218, 221, 0.4)',
            ]}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.footerContainer}
          >
            <View style={styles.footerInfo}>
              <Image source={clockIcon} style={styles.icon}></Image>
              <Text style={styles.text}>{clientProfile.user.phoneNb}</Text>
            </View>
            <View style={styles.footerInfo}>
              <Image source={locationIcon} style={styles.icon}></Image>
              <Text style={styles.text}>{clientProfile.user.email}</Text>
            </View>
          </LinearGradient>
        </View>
      </LinearGradient>
      <TouchableOpacity style={styles.button} onPress={() => navigateEdit()} >
        <PrimaryButton title="Edit Profile"  />
      </TouchableOpacity>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  wrapper: {
    height: 300,
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    marginTop: 70,
    flex: 1,
  },
  linear: {
    borderRadius: 30,
  },
  container: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.03)',
    position: 'relative',
    zIndex: 1,
    paddingTop: 30,
  },
  info: {
    paddingVertical: 20,
  },
  header: {
    zIndex: 1,
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginBottom: -45,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'PoppinsS',
    marginEnd: 80,
    left: 20,
    width: '100%',
  },
  footerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderColor: ' rgba(16, 125, 197, 1)',
    borderWidth: 1,
    zIndex: 999,
    backgroundColor: 'white',
  },
  priceBg: {
    width: 130,
    height: 90,
    left: 10,
    justifyContent: 'center',
  },
  price: {
    fontSize: 18,
    left: 10,
    fontWeight: 'bold',
    color: 'rgba(16, 125, 197, 1)',
  },
  heart: {},
  plus: {
    left: 10,
    top: 5,
  },
  text: {
    color: 'rgba(16, 125, 197, 1)',
    fontFamily: 'PoppinsR',
    marginLeft: 5
  },

  text2: {
    fontFamily: 'PoppinsR',
    color: "rgba(0,0,0,.5)"
  },
  description: {
    color: '#0A084B',
    fontFamily: 'PoppinsR',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shad: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: '#171717',
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  languages: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginTop: -30,
    marginBottom: 20,
    paddingRight: 20,
  },
  language: {
    fontFamily: 'PoppinsR',
    color: 'rgba(10, 8, 75, .6)',
    marginRight:10,
    marginLeft: 3
  },
  description: {
    fontFamily: 'PoppinsR',
    color: '#0A084B',
  },
  languageIcon: {
    marginLeft: 20,
  },
  priceAndCurrency: {
    flexDirection: 'row',

    alignItems: 'center',
    width: '100%',
  },
  currency: {
    fontFamily: 'PoppinsR',
    fontSize: 10,
    marginTop: 3,
    color: '#107DC5',
    padding: 10,
  },
  calendarIcon: {
    marginRight: 5,
  },
  roleDate: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  roleName: {
    fontFamily: 'PoppinsR',
    fontSize: 14,
    color: 'rgba(10, 8, 75, .6)',
    marginBottom: 5,
  },
  roleDescription: {
    fontFamily: 'PoppinsR',
    fontSize: 12,
    color: 'rgba(10, 8, 75, .6)',
    lineHeight: 20,
    marginBottom: 5,
  },
  role: {
    marginBottom: 20,
    borderBottomColor: 'rgba(16, 125, 197, .3)',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  roleDateText: {
    fontFamily: 'PoppinsR',
    fontSize: 12,
    color: '#107DC5',
  },
  button: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 90,
  },
  footerContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
    paddingVertical: 20,
    paddingLeft: 20,
  },
  profileImage:{
    width: 100,
    height: 100,
    borderRadius: 50
  },
  Imagecontainer: {
    justifyContent: 'center',
    height: 230,
    width: '85%',
    borderRadius: 20,
    marginVertical: 10,
  },
  descriptionContainer:{
    width: "100%",
  }
})
export default ClientProfile
