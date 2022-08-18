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

import calendarIcon from '../assets/images/calendarIcon.png';
import clockIcon from '../assets/images/clockIcon.png';
import locationIcon from '../assets/images/locationIcon.png';
import priceRectangle from '../assets/images/priceRectangle.png';
import heartIcon from '../assets/images/heartIcon.png';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import minusIcon from '../assets/images/minusIcon.png';
import { getJob, applyJob, getMyJobs } from '../reduxToolkit/jobSlice';
import JobList from '../components/JobList';
import FreelancerCard from '../components/FreelancerCard';

const JobDetailsPage_Client = ({route, navigation}) => {
  const initialState = {
    title:'',
    description: '',
    budget:'',
    location:'',
    createdAt:'',
  }
  const { job } = route.params
  const { freelancer } = useSelector((state) => state.freelancer)
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const [fetched, setFetched] = useState(false)

  console.log("job", job)

  const applicants = job.proposals !== undefined ? job.proposals : []

  return  !fetched
    ?<View style={styles.loadingStyle}>
      <ActivityIndicator size={'large'} />
    </View>
    :(
    <ScrollView style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.subHeader}>
          <ImageBackground
            source={priceRectangle}
            style={styles.priceBg}
            resizeMode='contain'
          >
            <View style={styles.priceAndCurrency}>
              <Text style={styles.price}>{job.budget} </Text>
              <Text style={styles.currency}>AED</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.subHeader}>
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
                    {job.title} - {job.category}
                  </Text>
                }
              >
                <LinearGradient
                  start={{ x: 1, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={['rgba(49, 190, 187, 1)', 'rgba(101, 91, 218, 1)']}
                >
                  <Text style={[styles.title, { opacity: 0 }]}>{job.title} - {job.category}</Text>
                </LinearGradient>
              </MaskedView>
              <View >
                    <View >
                      <View style={{paddingHorizontal: 20}}>
                        <Text style={styles.roleDescription}>
                          {job.description}
                        </Text>
                      </View>
                    </View>
              </View>
          </View>
          { applicants && applicants.length > 0 &&
            <View style={{width: "100%"}}>
                <View style={styles.applicantsContainer}>

                    {
                        applicants && applicants.slice(0,8).map((app, i) =>
                            <Image 
                                source={{uri: `http://194.5.157.234:4000${app.freelancer.user.profileImage}`}} 
                                style={[styles.profileImage, i !== 0 && styles.marginLeft, {zIndex: 99 - i}]}
                                key={i}
                                blurRadius={10}
                            />
                        )
                    }

                </View> 
                <View style={styles.applicantsSecondRow}>
                    <Text style={styles.applicantsNumber}>+ {applicants.length} Applicants</Text>
                    <Pressable onPress={() => navigation.navigate("recruiter_Jobs", { id: id})}>
                        <Text style={styles.viewButton}>View All</Text>
                    </Pressable>
                </View>
                {/* <RenderItem item={job.proposals} /> */}
            </View>
          }
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
                    <Text style={styles.roleDateText}>{job.createdAt.slice(0,10)}</Text>
                </View>
                <View style={styles.footerInfo}>
                    <Image source={locationIcon} style={styles.icon}></Image>
                    <Text style={styles.text}>{job.location}</Text>
                </View>
                <View style={styles.footerInfo}>
                    <Image source={clockIcon} style={styles.icon}></Image>
                    <Text style={styles.text}> {job.shift === "day" ? "Day Shift" : "Night Shift"}</Text>
                </View>
          </LinearGradient>
        </View>
      </LinearGradient>
      {/* { !route.params.myjobs &&
        <TouchableOpacity style={styles.button} onPress={() => navigateApply()}>
          <PrimaryButton title='Apply'  />
        </TouchableOpacity>
      } */}
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
    profileImage:{
        width: 55,
        height: 55,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "white"
    },
    marginLeft:{
        marginLeft: -15 
    },
    applicantsContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        paddingLeft: 25,
        height: 80
    },
    applicantsSecondRow:{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    viewButton:{
        color: "#23CDB0",
        fontFamily: "PoppinsS",
        textTransform: "uppercase",
        fontSize: 12
    },
    applicantsNumber:{
        fontFamily: "PoppinsR",
        fontSize: 14
    }
  })


export default JobDetailsPage_Client