
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import React from 'react';

import Navbar from '../components/Navbar';
import Header from '../components/Header';
import settingsIcon from '../assets/images/settingsIcon.png';


import PrimaryButton from '../components/Buttons/PrimaryButton';
import Inputs from '../components/Inputs';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';


const LoginJobseeker = ({navigation}) => {
    const navigate = () => {
        navigation.navigate('jobseeker_jobs')
    }
 
    return (
        <View style={styles.container}>
            <Header icon={settingsIcon}  title="Log in" goBack={navigation.goBack}/>
            <View style={styles.container4}>
                <Inputs placeholder="Email" style={styles.container4}/>
                <Inputs placeholder="Password" style={styles.container4}/>
            </View>
            <View style={styles.container4}>
             <PrimaryButton title="Log in" navigate={navigate}/> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    container4:{
        alignSelf: "center",
        alignItems: "center",
        width: "100%",
        top: 100,
        marginBottom: 100
    },
    button:{
        top: 120,
        alignSelf: "center"
    }
  
})

export default LoginJobseeker
