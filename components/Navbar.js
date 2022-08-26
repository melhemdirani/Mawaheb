import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, Pressable, Platform } from 'react-native';

import { useDispatch , useSelector} from 'react-redux';
import { getNotifications, setNotificationsSeen } from '../reduxToolkit/userSlice'

import jobsA from '../assets/images/jobsA.png'
import jobsN from '../assets/images/jobsN.png'
import notifcationN from '../assets/images/notifcationN.png'
import notifcationA from '../assets/images/notificationA.png'
import settingsA from '../assets/images/settingsA.png'
import settingsN from '../assets/images/settingsN.png'
import dashboardA from '../assets/images/dashboardA.png'
import dashboardN from '../assets/images/dashboardN.png'


function Navbar({active, navigation}) {
    const {
        user,
        notifications,
        notificationsSeen
    } = useSelector((store) => store.user)
    const { client} = useSelector((store) => store.client)
    const { freelancer} = useSelector((store) => store.freelancer)
    const onJobsPress = () => {
        if(user.role === 'client'){
            navigation.navigate('recruiter_Jobs')
        }  else {
            navigation.navigate('jobseeker_jobs')
        }
    }
    const onDashPress = () => {
        if(user.role === 'client'){
            navigation.navigate('recruiter_dashboard')
        }   else {
            navigation.navigate('seeker_dash')
        }
    }
    const dispatch = useDispatch()


    useEffect(() => {
        if (user?.role === 'client' && (user.clientId || client.id)) {
          dispatch(getNotifications({ id: user.clientId ? user.clientId : client.id, role: user.role }))
          .unwrap()
          .then((res) => console.log("notifcations", res.notifications.slice(-5)))
          .catch((err) => console.log("error notifications", err))
        } else if (user.role === 'freelancer' && (user.freelancerId || freelancer.id)) {
          dispatch(getNotifications({ 
            id: user.freelancerId ? user.freelancerId : freelancer.id, 
            role: user.role 
          }))
          .unwrap()
          .then((res) => console.log("notifcations", res))
          .catch((err) => console.log("error notifications"))
        }
      }, [])
      useEffect(() => {
        setNotificationsSeen(false)
      }, [notifications])
    return (
        <View style={[styles.container, styles.shadowProp]}>
            <Pressable style={styles.Pressable}  onPress={() => onJobsPress()}>
                <Image
                    style={styles.rate}
                    source={active === 'Jobs' ? jobsA : jobsN}
                />
                <Text style={active === 'Jobs' ? styles.text2 : styles.text}>Jobs</Text>
            </Pressable>
            <Pressable style={styles.Pressable}  onPress={() => onDashPress()}>
                <Image
                    style={styles.rate}
                    source={active === 'Dashboard' ? dashboardA : dashboardN}

                />
                <Text style={active === 'Dashboard' ? styles.text2 : styles.text}>Dashboard</Text>
            </Pressable>
            <Pressable style={styles.Pressable}  onPress={() => navigation.navigate('notifications')}>
               {  notifications && notifications.length > 0 &&
                    <View>
                        <View style={styles.newNotification} >
                                <Text style={styles.notificationsCount}>{notifications.length}</Text>
                            </View>
                    </View>
                }
                <Image
                    style={styles.rate}
                    source={active === 'Notifications' ? notifcationA : notifcationN}
                />

                <Text style={active === 'Notifications' ? styles.text2 : styles.text}>Notifications</Text>
            </Pressable>
            <Pressable style={styles.Pressable}  onPress={() => navigation.navigate('settings')}>
                <Image
                    style={styles.rate}
                    source={active === 'Settings' ? settingsA : settingsN}
                    
                />
                <Text style={active === 'Settings' ? styles.text2 : styles.text}>Settings</Text>
                
            </Pressable>

        </View>
    )
}

const styles =  Platform.OS === 'android'
    ? StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: "space-between",
            height: 90,
            paddingTop: 20,
            paddingLeft: 40,
            paddingRight: 40,
            left: -10,
            width: "105%",
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            backgroundColor: "white"
        },
        text:{
            color: "#929495",
            fontSize: 12,
            fontFamily: 'PoppinsR'
        }, 
        text2:{
            color: "#107DC5",
            fontSize: 12,
            fontFamily: 'PoppinsS'
        },
        Pressable:{
            alignItems: "center"
        },
        shadowProp: {  
            backgroundColor: "rgba(255,255,255,0)" ,
            shadowColor: "rgba(0,0,0,.4)",
            elevation: 5,
            borderTopRadius: 24,
            shadowOffset: {
              width: 2,
              height: -4,
            },
            shadowRadius: 24,
        }, 
        newNotification:{
            backgroundColor: "red",
            width: 15,
            height: 15,
            borderRadius: 50,
            position: "absolute",
            marginTop: -10,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row"
        },
        notificationsCount:{
            fontSize: 10,
            color: "white",
        }
    })
    : StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: "space-between",
            height: 90,
            paddingTop: 20,
            paddingLeft: 40,
            paddingRight: 40,
            width: "100%",
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            backgroundColor: "white"
        },
        text:{
            color: "#929495",
            fontSize: 12,
            fontFamily: 'PoppinsR'
        },
        text2:{
            color: "#107DC5",
            fontSize: 12,
            fontFamily: 'PoppinsS'
        },
        Pressable:{
            alignItems: "center"
        },
        shadowProp: {  
            shadowOffset: {width: 2, height: 1},  
            shadowColor: 'rgba(0, 0, 0, 0.1)',  
            shadowOpacity: 1,  
            shadowRadius: 10,  
        }, 
        newNotification:{
            backgroundColor: "red",
            width: 15,
            height: 15,
            borderRadius: 50,
            position: "absolute",
            marginTop: -10,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row"
        },
        notificationsCount:{
            fontSize: 10,
            color: "white",
        }
    })





export default Navbar