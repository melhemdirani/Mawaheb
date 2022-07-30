import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

import jobsA from '../assets/images/jobsA.png'
import jobsN from '../assets/images/jobsN.png'
import notifcationN from '../assets/images/notifcationN.png'
import notifcationA from '../assets/images/notificationA.png'
import settingsA from '../assets/images/settingsA.png'
import settingsN from '../assets/images/settingsN.png'
import dashboardA from '../assets/images/dashboardA.png'
import dashboardN from '../assets/images/dashboardN.png'


function Navbar({active, navigation, client}) {

    const onJobsPress = () => {
        if(client){
            navigation.navigate('recruiter_Jobs')
        }  else {
            navigation.navigate('jobseeker_jobs')
        }
    }
    const onDashPress = () => {
        if(client){
            navigation.navigate('recruiter_dashboard')
        }   else {
            navigation.navigate('seeker_dash')
        }
    }
    
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

const styles = StyleSheet.create({
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
  })

export default Navbar