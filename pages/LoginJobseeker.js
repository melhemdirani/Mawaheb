
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Text, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import { StackActions } from '@react-navigation/native';



import settingsIcon from '../assets/images/signUp.png';
import { useDispatch , useSelector} from 'react-redux'
import { clearUser, loginUser, setCredentials } from '../reduxToolkit/userSlice'
import { clearFreelancerState, getFreelancer } from '../reduxToolkit/freelancerSlice';
import { clearClient, getClientbyId } from '../reduxToolkit/clientSlice';
import Inputs from '../components/Inputs';
import Header from '../components/Header';
import PrimaryButton from '../components/Buttons/PrimaryButton';


const LoginJobseeker = ({navigation, signIn, notifications, name, route}) => {
  
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
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    
    const navigateNextClient = () => {
        if(route.params.edit){
            navigation.navigate(
                'editProfileClient',
                {clientProfile: route.params.clientProfiles}
            )
        } else {
            navigation.dispatch(
                StackActions.replace(
                'recruiter_dashboard'
            ))
        }
   
        
    }
    const navigateNextFreelancer = () => {
        if(route.params.edit){
            navigation.navigate(
                'JobSignUp',
                { role: 'freelancer', update: true }
            )
        } else {
            navigation.dispatch(
                StackActions.replace(
                'seeker_dash'
            ))
        }
    
    }

    const login = async () => {
    
        setLoading(true)
        if (email === '' || password === '') {
            setLoading(false)
           return alert("Please fill in email and password")
        } else {
            dispatch(loginUser({ 
                email: email.toLocaleLowerCase(), 
                password,
                notificationToken: token
            }))
            .unwrap()
            .then((res) =>{
                dispatch(
                    setCredentials({
                        email: email,
                        password: password,
                        role: "freelancer",
                    })
                )
                if(res.user.role === 'freelancer'){
                    dispatch(
                        getFreelancer(res.user.freelancerId)
                    ).then((res) => {
                        setLoading(false)
                        navigateNextFreelancer()
                    }).catch(err =>{
                         console.log(err)
                        setLoading(false)

                        })
                } else{
                    dispatch(
                        getClientbyId(res.user.clientId)
                    ).then((res) => {
                        setLoading(false)
                        navigateNextClient()
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
  


    return loading ? <View style={{alignItems: "center", justifyContent: "center", flex: 1, backgroundColor: "white"}}>
      <ActivityIndicator size={"large"} color="#4E84D5"/>
    </View>
    :(
        <View style={styles.container}>
            <Header icon={settingsIcon}  title={route.params.edit ? "Log in to Edit" :"Log in"} goBack={goBack}/>
            <View style={styles.container4}>
                <Inputs placeholder="Email" style={styles.container4}   onChange={setEmail} value={email}/>
                <Inputs placeholder="Password" style={styles.container4} onChange={setPassword} value={password} />
            </View>
            <Pressable onPress={() => navigation.navigate("passwordReset")}>
                <Text style={styles.text}>Forgot password</Text>
            </Pressable>
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
    },
    text:{
        color: "#4E84D5",
        left: 30
    }
  
})



export default LoginJobseeker