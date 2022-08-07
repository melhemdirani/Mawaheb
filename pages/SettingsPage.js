import React, { useState } from 'react';
import { ScrollView ,View, StyleSheet, Platform, TouchableOpacity} from 'react-native';


import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Setting from '../components/Setting';
import PrimaryButton from '../components/Buttons/PrimaryButton';

import settingsIcon from '../assets/images/settingsIcon.png';
import profileSetting from '../assets/images/profileSetting.png';
import languageSetting from '../assets/images/languageSetting.png';
import privacySetting from '../assets/images/privacySetting.png';
import termsSetting from '../assets/images/termsSetting.png';
import aboutSetting from '../assets/images/aboutSetting.png';
import logoutSetting from '../assets/images/logoutSetting.png';



const SettingsPage = ({navigation, role}) => {

    const [reload, setReload] = useState(true)
    
    const logout = () => {
        navigation.navigate('SignIn', {reload})
    }
 
    return (
        <View style={styles.container}>
            <ScrollView style={styles.container4}>
                <Header icon={settingsIcon} hidden title="Settings"/>
                <View style={styles.settingsContainer}>
                    <Setting title="My Profile" icon={profileSetting}/>
                    <Setting title="Language" icon={languageSetting}/>
                    <Setting title="Privacy Policy" icon={privacySetting}/>
                    <Setting title="Terms and Conditions" icon={termsSetting}/>
                    <Setting title="About Mawahib" icon={aboutSetting}/>
                    <Setting title="Logout" icon={logoutSetting} action={logout}/>
                </View>
                <View style={styles.button}>
                    <PrimaryButton title="Contact US"/> 
                </View>
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
            top: 120,
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
            top: 120,
            alignSelf: "center"
        },
        settingsContainer:{
            marginTop: 35
        }
    
    })


export default SettingsPage