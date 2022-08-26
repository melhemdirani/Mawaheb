
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, {useEffect, useState} from 'react';
import { useIsFocused } from "@react-navigation/native"
import { StackActions } from '@react-navigation/native';



import settingsIcon from '../assets/images/signUp.png';
import { useDispatch ,useSelector} from 'react-redux'
import { clearUser, loginUser, setCredentials } from '../reduxToolkit/userSlice'
import { clearFreelancer, clearFreelancerState, getFreelancer } from '../reduxToolkit/freelancerSlice';
import { clearClient, getClientbyId } from '../reduxToolkit/clientSlice';
import Inputs from '../components/Inputs';
import Header from '../components/Header';
import PrimaryButton from '../components/Buttons/PrimaryButton';


const LoginJobseeker = ({navigation, signIn, notifications, name}) => {

    const dispatch = useDispatch()

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
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    

    const login = async () => {
    
        setLoading(true)
        if (email === '' || password === '') {
            setLoading(false)
           return alert("Please fill in email and password")
        } else {
            dispatch(loginUser({ email: email.toLocaleLowerCase(), password }))
            .unwrap()
            .then((res) =>{
                dispatch(
                    setCredentials({
                        email: email,
                        password: password,
                        role: "freelancer"
                    })
                )
                if(res.user.role === 'freelancer'){
                    dispatch(
                        getFreelancer(res.user.freelancerId)
                    ).then((res) => {
                        console.log("res", res)
                        setLoading(false)
                    
                        navigation.dispatch(
                            StackActions.replace(
                            'seeker_dash'
                        ))

                    }).catch(err =>{
                         console.log(err)
                        setLoading(false)

                        })
                } else{
                    dispatch(
                        getClientbyId(res.user.clientId)
                    ).then(() => {
                        setLoading(false)
                        navigation.dispatch(
                            StackActions.replace(
                            'recruiter_dashboard'
                        ))
                    }).catch(err => {
                        console.log(err)
                        setLoading(false)
                    })
                }
            }).catch(error => {
                console.log("error", error);
                setLoading(false);
            })
        }
    }

    const goBack = () => {
        navigation.dispatch(
            StackActions.replace(
            'SignIn'
        ))
    }
  


    return loading ? <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
        <ActivityIndicator size={"large"} />
    </View>
    :(
        <View style={styles.container}>
            <Header icon={settingsIcon}  title="Log in" goBack={goBack}/>
            <View style={styles.container4}>
                <Inputs placeholder="Email" style={styles.container4}   onChange={setEmail} value={email}/>
                <Inputs placeholder="Password" style={styles.container4} onChange={setPassword} value={password} />
            </View>
            <TouchableOpacity style={styles.container4} onPress={() => login()}>
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