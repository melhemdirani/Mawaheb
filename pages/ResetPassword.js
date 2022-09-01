
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import React, {useEffect, useState} from 'react';
import { useIsFocused } from "@react-navigation/native"
import { StackActions } from '@react-navigation/native';



import settingsIcon from '../assets/images/signUp.png';
import { useDispatch , useSelector} from 'react-redux'
import { clearUser, createOTP, loginUser, resetPassword, setCredentials } from '../reduxToolkit/userSlice'
import { clearFreelancerState, getFreelancer } from '../reduxToolkit/freelancerSlice';
import { clearClient, getClientbyId } from '../reduxToolkit/clientSlice';
import Inputs from '../components/Inputs';
import Header from '../components/Header';
import PrimaryButton from '../components/Buttons/PrimaryButton';


const ResetPassword = ({navigation, signIn, notifications, name}) => {
  
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const {token} = useSelector(store => store.user)
    useEffect(() => {
        dispatch(
            clearFreelancerState()
        )
        dispatch(
            clearUser()
        )
        dispatch(
            clearClient()
        )
    }, [])

    const [email, setEmail] = useState('')
    
    const navigateOTP = async () => {
    
        if (email === '') {
           return alert("Please fill in your email address")
        } else {
            setLoading(true)
            dispatch(
                createOTP({email: email.toLowerCase()})
            ).unwrap()
            .then(
                () => {
                    setLoading(false)
                    navigation.dispatch(
                        StackActions.replace(
                        'otp', {reset: true, email: email}
                    ))
                }

            )
            .catch(err => {
                setLoading(false)
                console.log("error creating otp", err)
                if(err === "User not found"){
                    alert("Please enter a correct email address")
                }
            })
        }
    }
    const goBack = () => {
        navigation.dispatch(
            StackActions.replace(
            'SignIn'
        ))
    }
  


    return  loading ?  <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <ActivityIndicator size={"large"} color="#4E84D5"/>
    </View>
    :(
        <View style={styles.container}>
            <Header icon={settingsIcon}  title="Reset Password" goBack={goBack}/>
            <Text style={styles.text}>
                Please enter your email address
            </Text>
            <View style={styles.container4}>
                <Inputs placeholder="Email" style={styles.container4}   onChange={setEmail} value={email}/>
            </View>
            <TouchableOpacity style={styles.container4} onPress={() => navigateOTP()}>
             <PrimaryButton title="Send OTP"/> 
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
    },
    text: {
        width: '100%',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 15,
        top: 60,
        color: 'rgba(0,0,0,0.6)',
    },
  
})



export default ResetPassword