
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, {useEffect, useState} from 'react';



import Header from '../components/Header';
import settingsIcon from '../assets/images/signUp.png';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import Inputs from '../components/Inputs';
import { useDispatch ,useSelector} from 'react-redux'
import { loginUser } from '../reduxToolkit/userSlice'


const LoginJobseeker = ({navigation, signIn, notifications, name}) => {

    const {
        user
    } = useSelector((store) => store.user)

    const dispatch = useDispatch()

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const login = async () => {
        setLoading(true)
        if (email === '' || password === '') {
           return alert("Please fill in email and password")
        } else {
            dispatch(loginUser({ email: email.toLocaleLowerCase(), password }))
            .unwrap()
            .then((res) =>{
                setLoading(false)
                if(res.user.role === 'freelancer'){
                    navigation.navigate('seeker_dash')
                } else{
                    navigation.navigate('recruiter_dashboard')
                }
          
                
            }).catch(error => {
                console.log("error", error);
                setLoading(false);
            })
        }
    }

  


    return loading ? <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
        <ActivityIndicator size={"large"} />
    </View>
    :(
        <View style={styles.container}>
            <Header icon={settingsIcon}  title="Log in" goBack={navigation.goBack}/>
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