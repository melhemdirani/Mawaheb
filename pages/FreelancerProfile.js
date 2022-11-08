import React, {  useEffect, useLayoutEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import calendarIcon from '../assets/images/calendarIcon.png'
import clockIcon from '../assets/images/clockIcon.png'
import locationIcon from '../assets/images/locationIcon.png'
import MaskedView from '@react-native-masked-view/masked-view'
import languageIcon from '../assets/images/LanguageIcon.png'
import { useIsFocused } from "@react-navigation/native"

import PrimaryButton from '../components/Buttons/PrimaryButton'
import minusIcon from '../assets/images/minusIcon.png'
import { useSelector, useDispatch } from 'react-redux'
import { getFreelancer } from '../reduxToolkit/freelancerSlice'

const FreelancerProfile = ({ navigation, route }) => {

  const { freelancer } = useSelector((state) => state.freelancer)
  const { user } = useSelector((state) => state.user)

  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()
  const isFocused = useIsFocused();

  const [isVerified, setIsVerified] = useState({});

 

 
  useEffect(() => {
 
    if(isFocused){
      setLoading(true)
      dispatch(getFreelancer(user.freelancerId ?  user.freelancerId : freelancer.id))
      .unwrap()
      .then((res) => {
        console.log("res", res.freelancer.averageRating);
        setIsVerified(res.freelancer)
        setLoading(false)
      })
      .catch(err =>{ 
        console.log("errors", err)
        setLoading(false)
    })
    } else{
      setLoading(false)
    }
  }, [route, isFocused])

  const { id, roles, languages } = freelancer
  let users = freelancer.user !== undefined ? freelancer.user : user
  const navigateEdit = () => {
    navigation.navigate("login",{edit: true} )
  }
  const navigateComplete = () => {
    navigation.navigate('JobSignUp', { role: 'freelancer', update: true })
  }
  return loading || freelancer === undefined || freelancer === {} && user !== undefined 
    ?<View style={{marginTop: 400}}>
        <ActivityIndicator size={"large"}/>
      </View>
    :  freelancer.isCompleted &&  users.name !== undefined
    ?(
    <ScrollView style={styles.wrapper}>
      <View style={styles.header}>
        <View style={{alignContent: "center", justifyContent: "center"}}>
          {
            user.profileImage 
            ? <Image source={{uri: `http://195.110.58.234:4000${user.profileImage}`}} style={styles.profileImage}/>
            : <View style={styles.circle} />

          }
          { freelancer.averageRating && freelancer.averageRating > 0 ? 
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>{freelancer.average.toFixed(1)}</Text>
            </View> : null
          }
        </View>
        <View style={styles.subHeader}>
          <Pressable onPress={() => navigation.navigate("settings")}>
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
                  {users.name}
                </Text>
              }
            >
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['rgba(49, 190, 187, 1)', 'rgba(101, 91, 218, 1)']}
              >
                <Text style={[styles.title, { opacity: 0 }]}>{users.name}</Text>
              </LinearGradient>
            </MaskedView>
            <Text style={[styles.email]}>{user.email}</Text>

            <View style={styles.roles}>
              {roles.map((role) => {
                return (
                  <View key={role.id} style={styles.role}>
                    <View style={{ paddingHorizontal: 20 }}>
                      <Text style={styles.roleName}>{role.role}</Text>
                      <Text style={styles.roleDescription}>
                        {role.projectTitle}
                      </Text>
                      <Text style={styles.roleDescription}>
                        {role.category} - {role.title}
                      </Text>
                      <Text style={styles.roleDescription}>
                        DailyRate: {role.dailyRate} AED
                      </Text>
                      <Text style={styles.roleDescription}>
                        Key responsibilities: {role.keyResponsibilities}
                      </Text>
                      <View style={styles.roleDate}>
                        <Image
                          source={calendarIcon}
                          style={styles.calendarIcon}
                        />
                        <Text style={styles.roleDateText}>{role.startDate} - {role.endDate}</Text>
                      </View>
                    </View>
                  </View>
                )
              })}
            </View>
          </View>
          <View style={styles.languages}>
            <Image source={languageIcon} style={styles.languageIcon}></Image>
            {languages.map((item) => {
              return (
                <Text key={item.id} style={styles.language}>
                  {item.name}
                </Text>
              )
            })}
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
              <Text style={styles.text}>Day shift</Text>
            </View>
            <View style={styles.footerInfo}>
              <Image source={locationIcon} style={styles.icon}></Image>
              <Text style={styles.text}>{users.location}</Text>
            </View>
          </LinearGradient>
        </View>
      </LinearGradient>
      <TouchableOpacity style={styles.button}  onPress={() => navigateEdit()}> 
        <PrimaryButton title={freelancer.isCompleted? "Edit profile" : "Complete profile"}  />
      </TouchableOpacity>
    </ScrollView>
  )
  :(
    <ScrollView style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.subHeader}>
          {
            user.profileImage 
            ? <Image source={{uri: `http://195.110.58.234:4000${user.profileImage}`}} style={styles.profileImage}/>
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
                  {user.name}
                </Text>
              }
            >
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['rgba(49, 190, 187, 1)', 'rgba(101, 91, 218, 1)']}
              >
                <Text style={[styles.title, { opacity: 0 }]}>{user.name}</Text>
              </LinearGradient>
            </MaskedView>
            <Text style={[styles.email]}>{user.email}</Text>
          </View>
        </View>
      </LinearGradient>
      <TouchableOpacity style={styles.button}  onPress={() => navigateEdit()}> 
        <PrimaryButton title={"Complete profile"}  />
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
    paddingTop: 7,
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
  },
  text: {
    color: 'rgba(16, 125, 197, 1)',
    fontFamily: 'PoppinsR',
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
    borderRadius: 50,
    backgroundColor: "white"
  },
  email:{
    fontSize: 14,
    marginBottom: 10,
    fontFamily: 'PoppinsS',
    marginEnd: 80,
    left: 20,
    width: '100%',
    color: "rgba(0,0,0, .4)"
  },
  ratingContainer:{
    backgroundColor: "#9C88FD",
    paddingHorizontal: 9,
    borderRadius: 100,
    width: 40,
    top: -10,
    justifyContent: "center",
    aligntItems: "center",
    alignSelf: "center"
  },
  rating:{
    color: "white",
    fontSize: 14,
    fontFamily: "PoppinsS"
  },
})
export default FreelancerProfile
