
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import { Notifier, Easing } from 'react-native-notifier';
import axios from 'axios';


import Header from '../components/Header';
import settingsIcon from '../assets/images/signUp.png';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import Inputs from '../components/Inputs';
import { CustomNotification } from '../components/CustomNotifications';


const LoginJobseeker = ({navigation, signIn, notifications, name}) => {
    console.log("login page")

    const [notificationIndex, setNotifcaitonIndex] = useState(0)
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

  
    const login = async () => {
        let url = "http://194.5.157.234:4000/api/v1/auth/login"
        if(email === '' || password === '' ){
          return alert('Please fill in all required inputs*')
        }
        try {
        const {data} = await axios.post(url,{
          email:email,
          password: password,
        })
        const {user}=data
          
        } catch (error) {
        }
      }
    // const navigate = () => {
    //     axios.post(`${backendUrl}signin`, {
    //       email: email,
    //       password: password
    //     })
    //     .then(function (response) {
    //         if(response.data === 'success'){
    //             let role = res.data[0].role
    //             let name = res.data[0].name
    //             let notifications = res.data[0].notifications
    //             signIn({role: role, name: name, notifications: notifications})
    //             notify()
    //             if(role === 'client'){
    //                 navigation.navigate('recruiter_Jobs')
    //             } else {
    //                 navigation.navigate('jobseeker_jobs')
    //             }

    //         } else{
    //             alert("Wrong email or password!")
    //         }
    //     })
    //     .catch(function (error) {
    //       alert("Error loading your profile")
    //     })
    // }

    const navigate = () => { // will use the above method when backend is ready
        let role = 'freelancer' 
        let names = 'johN'
        let newName =  names.charAt(0).toUpperCase() + names.slice(1).toLowerCase();
        let newNotifications = [
            {
                notification: 'Notification lorem ipsum dolor sit amenos', 
                urgent: false,
            },
            {
                notification: 'Notification lorem ipsum dolor sit ameno2', 
                urgent: true,
            },
            {
                notification: 'Notification lorem ipsum dolor sit ameno3', 
                urgent: false
            },
        ]

        signIn({role: role, name: newName, notifications: newNotifications})
        if(role === 'client'){
            navigation.navigate('recruiter_Jobs')
        } else if (role === 'freelancer'){
            navigation.navigate('jobseeker_jobs')
        } else alert('Error logging in')
    }
    
    const navigate2 = () => {
        navigation.navigate('jobseeker_jobs')
    }
    return (
        <View style={styles.container}>
            <Header icon={settingsIcon}  title="Log in" goBack={navigation.goBack}/>
            <View style={styles.container4}>
                <Inputs placeholder="Email" style={styles.container4}  />
                <Inputs placeholder="Password" style={styles.container4} />
            </View>
            <TouchableOpacity style={styles.container4} onPress={() => navigate2()}>
             <PrimaryButton title="Log in"/> 
            </TouchableOpacity>
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