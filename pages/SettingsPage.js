import { ScrollView ,View, Text, FlatList, StyleSheet, Image, ImageBackground } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

import Navbar from '../components/Navbar';
import Header from '../components/Header';
import settingsIcon from '../assets/images/settingsIcon.png';
import profileSetting from '../assets/images/profileSetting.png';
import languageSetting from '../assets/images/languageSetting.png';
import privacySetting from '../assets/images/privacySetting.png';
import termsSetting from '../assets/images/termsSetting.png';
import aboutSetting from '../assets/images/aboutSetting.png';
import logoutSetting from '../assets/images/logoutSetting.png';

import Setting from '../components/Setting';
import PrimaryButton from '../components/Buttons/PrimaryButton';


const SettingsPage = ({navigation}) => {
 
    return (
        <View style={styles.container}>
            <ScrollView style={styles.container4}>
                <Header icon={settingsIcon} hidden title="Settings"/>
                <Setting title="My Profile" icon={profileSetting}/>
                <Setting title="Language" icon={languageSetting}/>
                <Setting title="Privacy Policy" icon={privacySetting}/>
                <Setting title="Terms and Conditions" icon={termsSetting}/>
                <Setting title="About Mawahib" icon={aboutSetting}/>
                <Setting title="Logout" icon={logoutSetting}/>
                <View style={styles.button}>
                    <PrimaryButton title="Contact US"/> 
                </View>

            </ScrollView>
            <Navbar active="Settings" navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    button:{
        top: 120,
        alignSelf: "center"
    }
  
})

export default SettingsPage
