import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    TouchableOpacity,
    Pressable,
    ScrollView,
    ActivityIndicator,
  } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { getClientbyId } from '../reduxToolkit/clientSlice';
import calendarIcon from '../assets/images/calendarIcon.png';
import clockIcon from '../assets/images/clockIcon.png';
import locationIcon from '../assets/images/locationIcon.png';
import priceRectangle from '../assets/images/priceRectangle.png';
import heartIcon from '../assets/images/heartIcon.png';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import minusIcon from '../assets/images/minusIcon.png';
import { getJob, applyJob, acceptInvitation } from '../reduxToolkit/jobSlice';


// error here
const JobDetailsPage = ({route, navigation}) => {
  const initialState = {
    title:'',
    description: '',
    budget:'',
    location:'',
    createdAt:'',
  }
  const [job, setJob] = useState(initialState)
  const { id } = route.params
  const { freelancer } = useSelector((state) => state.freelancer)
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [applied, setApplied] = useState(false)
  const [loading, setLoading] = useState(true)
  const [client, setClient] = useState({})

  useEffect(() => {
    setLoading(true)
    dispatch(
      getJob(id)
    )
    .unwrap()
    .then(res => {
      setJob(res.job)
      dispatch(getClientbyId(res.job.clientId))
      .unwrap()
      .then( res => {
        console.log("res", res.client.user.profileImage)
        setClient(res.client)
        setLoading(false)
      })
      .catch(err => {
        console.log("erorr", err)
        setLoading(false)
      })
    })
    .catch(err => {
      console.log("err", err)
      setLoading(false)
    })
    console.log("freelancer", freelancer)
  }, [route])

  const navigateApply = () => {
    const newRoles = freelancer.roles ? freelancer.roles.filter(element => {
      return element.category === job.category && element.title === job.title
    }) : null
    if(!freelancer.isCompleted){
      alert("Please complete your profile before applying")
      return navigation.navigate("freelancerProfile")
    } else if(newRoles === null || newRoles === undefined || newRoles.length === 0){
      return alert("You can only apply to jobs with same categories as your filled work experience")
    } else{
      if(route.params.inviteToApply){
        dispatch(
          acceptInvitation({
            jobId: id,
            freelancerId: freelancer.id ? freelancer.id : user.freelancerId,
            invitationId: route.params.invitationId
          })
        )
        .then(res => {
          dispatch(
            applyJob({
              jobId: id,
              freelancerId: freelancer.id ? freelancer.id : user.freelancerId,
              price: newRoles.length ? newRoles[0].dailyRate : 0,
            })
          ).then(res => {
            console.log("res accepting invitation", res)
            if(res.payload !== undefined && res.payload === "You are not qualified for this job"){
              alert("You can only apply to jobs with same categories as your work experience")
            } else if(res.payload !== undefined && res.payload === "You have already applied for this job"){
              alert("You have already applied for this job")
            } 
            setApplied(!applied)
            navigation.goBack({applied: applied})
          })
  
        }) 
        .catch(err => console.log("error applying", err))

      } else {
        dispatch(
          applyJob({
            jobId: id,
            freelancerId: freelancer.id ? freelancer.id : user.freelancerId,
            price: newRoles.length ? newRoles[0].dailyRate : 0,
          })
        ).then(res => {
          console.log("res", res)
          if(res.payload !== undefined && res.payload === "You are not qualified for this job"){
            alert("You can only apply to jobs with same categories as your work experience")
          } else if(res.payload !== undefined && res.payload === "You have already applied for this job"){
            alert("You have already applied for this job")
          } 
          setApplied(!applied)
          navigation.goBack({applied: applied})
  
        }) 
        .catch(err => console.log("error applying", err))
      }
    }
  }

  useLayoutEffect(() => {
    dispatch(getJob(id))  
  }, [id])


  const { title, description, budget, location, createdAt } = job
  
  return loading ?  <View style={styles.loadingStyle}>
      <ActivityIndicator size={'large'} />
    </View>
    :(
    <ScrollView style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.subHeader}>
          { client.user && client.user.profileImage !== undefined &&
            <Image      
              source={{uri: `http://195.110.58.234:4000${client.user.profileImage}`}} 
              style={styles.profileImage}
              blurRadius={7}
            />
          }
          <ImageBackground
            source={priceRectangle}
            style={styles.priceBg}
            resizeMode='contain'
          >
            <View style={styles.priceAndCurrency}>
              <Text style={styles.price}>{budget} </Text>
              <Text style={styles.currency}>AED</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.subHeader}>
          <Image source={heartIcon} style={styles.heart}></Image>
          <Pressable onPress={() => navigation.goBack()} style={styles.minusContainer}>
            <Image source={minusIcon} style={styles.plus} />
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
                    {title}
                  </Text>
                }
              >
                <LinearGradient
                  start={{ x: 1, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={['rgba(49, 190, 187, 1)', 'rgba(101, 91, 218, 1)']}
                >
                  <Text style={[styles.title, { opacity: 0 }]}>{title}</Text>
                </LinearGradient>
              </MaskedView>
              <View style={{paddingHorizontal: 20}}>
                <Text style={styles.roleDescription}>
                  {description}
                </Text>
                <View style={{flexDirection: "row"}}>
                  <Text style={styles.roleDateText}>{moment(job.startDate).format('ll')}</Text> 
                  <Text style={styles.roleDateText}> - {moment(job.endDate).format('ll')}</Text>
                </View>
            
              </View>
              <View>

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
                <Image
                    source={calendarIcon}
                    style={styles.calendarIcon}
                ></Image>
                <Text style={styles.text}>{moment(job.startDate).format('ll')}</Text>
            </View>
            <View style={styles.footerInfo}>
                <Image source={clockIcon} style={styles.icon}></Image>
                <Text style={styles.text}> {job.shift !== undefined && (job.shift.charAt(0).toUpperCase() + job.shift.slice(1))} shift</Text>
            </View>
            <View style={styles.footerInfo}>
                <Image source={locationIcon} style={styles.icon}></Image>
                <Text style={styles.text}>{location}</Text>
            </View>
        
          </LinearGradient>
        </View>
      </LinearGradient>
      { !route.params.myjobs &&
        <TouchableOpacity style={styles.button} onPress={() => navigateApply()}>
          <PrimaryButton title={route.params.inviteToApply ? 'Accept Invitation' : 'Apply'}  />
        </TouchableOpacity>
      }
    </ScrollView>
  )
}

  const styles = StyleSheet.create({
    wrapper: {
      height: 300,
      padding: 20,
      width: "100%",
      alignSelf: "center",
      marginTop: 70,
      flex: 1,
    },
    minusContainer:{
      padding: 15,
      marginLeft: 15,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    },
    linear: {
      borderRadius: 30,
      width: "100%"
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,.03)',
      position: 'relative',
      zIndex: 1,
      paddingTop: 30,
    },
    info: {
      paddingVertical: 20,
      borderBottomColor: 'rgba(16, 125, 197, .3)',
      borderBottomWidth: 1,
      width: "100%"
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
    },
    text: {
      color: 'rgba(16, 125, 197, 1)',
      fontFamily: 'PoppinsR',
      fontSize: 10
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
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginTop: -30,
      marginBottom: 20,
      paddingRight: 20
    },
    language: {
      fontFamily: 'PoppinsR',
      color: 'rgba(10, 8, 75, .6)',
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

      paddingBottom: 20,
    },
    roleDateText: {
      fontFamily: 'PoppinsR',
      fontSize: 12,
      color: '#107DC5',
    },
    button:{
     alignItems: 'center',
     marginTop: 40,
     marginBottom: 90
  
    },
    footerContainer:{
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 20,
      paddingHorizontal: 20
    },
    loadingStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    profileImage: {
      width: 60,
      height: 60,
      borderRadius: 50,
      borderColor: ' rgba(16, 125, 197, 1)',
      borderWidth: 1,
      zIndex: 999,
      backgroundColor: 'white',
    },
  })


export default JobDetailsPage