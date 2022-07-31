
import { View, StyleSheet, Text } from 'react-native';
import React, {useState} from 'react';
import { Notifier, Easing } from 'react-native-notifier';

import { connect } from 'react-redux';
import { signIn } from '../redux/user/user.actions';

import Header from '../components/Header';
import settingsIcon from '../assets/images/signUp.png';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import Inputs from '../components/Inputs';


const LoginJobseeker = ({navigation, signIn}) => {

    const [password, setPassword] = useState('')

    const notify = (name, description) => {
        let newName =  name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        Notifier.showNotification({
            title: newName,
            description: description,
            duration: 0,
            showAnimationDuration: 800,
            showEasing: Easing.bounce,
            onHidden: () => console.log('Hidden'),
            onPress: () => console.log('Press'),
            hideOnPress: false,
        });
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
        let name = 'johN'
        let newName =  name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

        let notifications = [
            {
                notification: 'Notification lorem ipsum dolor sit ameno', 
                urgent: false
            },
            {
                notification: 'Notification lorem ipsum dolor sit ameno', 
                urgent: true
            },
            {
                notification: 'Notification lorem ipsum dolor sit ameno', 
                urgent: false
            },
        ]
        signIn({role: role, name: newName, notifications: notifications})
        notify(name, 'Welcome to Mawahib!')
        if(role === 'client'){
            navigation.navigate('recruiter_Jobs')
        } else if (role === 'freelancer'){
            navigation.navigate('jobseeker_jobs')
        } else alert('Error logging in')
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

const mapDispatchToProps = (dispatch) => ({
    signIn: (object) => dispatch(signIn(object))
});

const mapStateToProps =  ({
    signedIn: {signedIn},
})   => ({
    signedIn,
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginJobseeker)
