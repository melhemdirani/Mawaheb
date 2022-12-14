import React, { useState } from 'react';
import { ScrollView ,View, StyleSheet, Platform, TouchableOpacity, Pressable, ActivityIndicator} from 'react-native';
import { useDispatch ,useSelector} from 'react-redux'
import * as Linking from "expo-linking";
import { StackActions } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { clearUser, logout, setCredentials } from '../reduxToolkit/userSlice'

import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Setting from '../components/Setting';
import PrimaryButton from '../components/Buttons/PrimaryButton';

import settingsIcon from '../assets/images/settingsIcon.png';
import profileSetting from '../assets/images/profileSetting.png';
import termsSetting from '../assets/images/termsSetting.png';
import deleteAccount from '../assets/images/deleteAccount.png';
import aboutSetting from '../assets/images/aboutSetting.png';
import logoutSetting from '../assets/images/logoutSetting.png';
import changePass from '../assets/images/changePass.png';
import { clearClient } from '../reduxToolkit/clientSlice';
import { clearFreelancerState } from '../reduxToolkit/freelancerSlice';



const SettingsPage = ({navigation, role}) => {
    const { user } = useSelector((state) => state.user)
    
    const [reload, setReload] = useState(true)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    
    const logoutUser = () => {
        setLoading(true)
        dispatch(
            logout()
        )
        .unwrap()
        .then( res => {
            dispatch(
                clearUser()
            )
            dispatch(
                clearClient()
            )
            dispatch(
                clearFreelancerState()
            )
            dispatch(
                setCredentials({})
            )
                navigation.dispatch(
                    CommonActions.reset({
                        routes:[{ 
                            name: 'SignIn', 
                            params: {reload}
                        }]
                    })
                )
            setLoading(false)
        })
        .catch( err => {
            alert("You are not logged in")
            console.log("err", err)
            navigation.dispatch(
                CommonActions.reset({
                    routes:[{ 
                        name: 'SignIn', 
                        params: {reload}
                    }]
                })
            )
            setLoading(false)
        })
     
    }

    const navigateContact = () => {
        navigation.navigate('contact')

    }
    const navigateProfile = () => {
        if(user.role === 'freelancer'){
            navigation.navigate('freelancerProfile')
        } else{
            navigation.navigate('clientProfile' )
            
        }

    }
    const navigatePass = () => {
        navigation.navigate("updatePass", {role: user.role})
    }
    const deleteNav = () => {
        navigation.navigate("deletePage", {role: user.role})
    }

    const openTerms = () => {
   
        Linking.openURL(`https://mawahib.reboost.live/`)
      }
 
    return loading ? <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <ActivityIndicator size={"large"}  color="#4E84D5" />
    </View>
    :(
        <View style={styles.container}>
            <ScrollView style={styles.container4}>
                <Header icon={settingsIcon} hidden title="Settings" />
                <View style={styles.settingsContainer}>
                    <Setting title="My Profile" icon={profileSetting} action={navigateProfile}/>
                    {/* <Setting title="Language" icon={languageSetting}/>
                    <Setting title="Privacy Policy" icon={privacySetting}/> */}
                    <Setting title="Privacy policy" icon={termsSetting} action={openTerms}/>
                    <Setting title="Support" icon={aboutSetting} action={navigateContact}/>
                    <Setting title="Update password" icon={changePass} action={navigatePass}/>
                    <Setting title="Logout" icon={logoutSetting} action={logoutUser}/>
                    <Setting title="Delete account" icon={deleteAccount} action={deleteNav}/>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => navigateContact()}>
                    <PrimaryButton title="Contact US"/> 
                </TouchableOpacity>
            </ScrollView>
            <Navbar active="Settings" navigation={navigation} client={role === 'client' ? true : false}/>
        </View>
    )
}

const styles = Platform.OS === 'android'
    ? StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
        },
        button:{
            top: 50,
            alignSelf: "center"
        },
        settingsContainer:{
            marginTop: 35
        }
    
    })
    : StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
        },
        button:{
            top: 50,
            alignSelf: "center"
        },
        settingsContainer:{
            marginTop: 35
        }
    
    })


export default SettingsPage