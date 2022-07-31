import React, { useState } from 'react';
import { ScrollView ,View, StyleSheet, Text} from 'react-native';
import { connect } from 'react-redux';

import { signOut } from '../redux/user/user.actions';

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



const SettingsPage = ({navigation, signOut, role}) => {

    const [reload, setReload] = useState(true)
    
    const logout = () => {
        signOut()
        navigation.navigate('Home', {reload})
    }
 
    return (
        <View style={styles.container}>
            <ScrollView style={styles.container4}>
                <Header icon={settingsIcon} hidden title="Settings"/>
                <Text>s{role}</Text>
                <Setting title="My Profile" icon={profileSetting}/>
                <Setting title="Language" icon={languageSetting}/>
                <Setting title="Privacy Policy" icon={privacySetting}/>
                <Setting title="Terms and Conditions" icon={termsSetting}/>
                <Setting title="About Mawahib" icon={aboutSetting}/>
                <Setting title="Logout" icon={logoutSetting} action={logout}/>
                <View style={styles.button}>
                    <PrimaryButton title="Contact US"/> 
                </View>

            </ScrollView>
            <Navbar active="Settings" navigation={navigation} client={role === 'client' ? true : false}/>
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

const mapDispatchToProps = (dispatch) => ({
    signOut: (role) => dispatch(signOut(role))
});

const mapStateToProps =  ({
    role: {role},
})   => ({
    role
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)