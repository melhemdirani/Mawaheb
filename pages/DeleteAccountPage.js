import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../components/Header';
import Inputs from '../components/Inputs';
import { useIsFocused } from "@react-navigation/native"
import DeleteButton from '../components/Buttons/DeleteButton';
import { clearClient } from '../reduxToolkit/clientSlice';
import { clearFreelancerState } from '../reduxToolkit/freelancerSlice';

import signUp from '../assets/images/signUp.png';
import { clearUser, deleteAccount, loginUser } from '../reduxToolkit/userSlice';
import PrimaryButton from '../components/Buttons/PrimaryButton';


const DeleteAccountPage = ({navigation, route}) => {
    const { user } = useSelector(store => store.user)
    const dispatch = useDispatch()
    const isFocused = useIsFocused();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [verified, setVerified] = useState(false)

    useEffect(() => {
        setVerified(false)
        setPassword("")
        setEmail("")
    }, [isFocused])

    const login = async () => {
        setLoading(true)
        if (email === '' || password === '') {
            setLoading(false)
           return alert("Please fill in email and password")
        } else {
            dispatch(loginUser({ email: email.toLocaleLowerCase(), password }))
            .unwrap()
            .then((res) =>{
                setVerified(true)
                setLoading(false)
            }).catch(error => {
                console.log("error", error);
                setLoading(false);
            })
        }
    }

    const deleteUserAccount = () => {
        if(verified){
            setLoading(true)
            dispatch(
                deleteAccount({
                userId: user.userId
            })
            )
            .unwrap()
            .then( res => {
                dispatch(
                    clearUser()
                )
                dispatch(
                    clearClient()
                )
                dispatch(
                    clearFreelancerState()
                )

                alert("Account deleted!")
                setLoading(false)

                navigation.navigate('SignIn')
            })
            .catch(err => {
                console.log("error", err)
                setLoading(false)
                alert("Error deleting")
            })
        } else{
            alert("Please login first")
        }

    }

    return loading? <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
        <ActivityIndicator size={"large"}  color="#4E84D5"/>
    </View>
    :(
        <View style={styles.wrapper}>
            <Header title='Delete your account' icon={signUp} hidden={false} goBack={navigation.goBack}/>
            <View style={styles.container}>
                { !verified  
                    ?<View style={{width: "100%", alignItems:"center"}}>
                        <Text style={styles.text}>
                            Enter you email and password before procceeding
                        </Text>
                        <View style={styles.form}>
                            <Inputs
                                placeholder='Enter your email'
                                onChange={(value) => setEmail(value)}
                                value={email}
                            />
                            <Inputs
                                placeholder='Enter your password'
                                onChange={(value) => setPassword(value)}
                                value={password}
                            />
                        </View>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity onPress={() => login()}>
                                <PrimaryButton  title='Proceed' />
                            </TouchableOpacity>
                            <SafeAreaView style={styles.btn}>
                                <Pressable onPress={() => navigation.goBack()}>
                                <Text style={styles.btnText}>Cancel</Text>
                                </Pressable>
                            </SafeAreaView>
                        </View>
                    </View>
                    :<View style={{width: "100%", alignItems:"center"}}>
                        <Text style={styles.text}>
                            Are you sure you want to delete your account?
                        </Text>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity onPress={() => deleteUserAccount()}>
                                <DeleteButton  title='Delete Account' />
                            </TouchableOpacity>
                            <SafeAreaView style={styles.btn}>
                                <Pressable onPress={() => navigation.goBack()}>
                                <Text style={styles.btnText}>Cancel</Text>
                                </Pressable>
                            </SafeAreaView>
                        </View>
                    </View>
                    }

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    flex: 1,
  },
  container: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: "space-between",
    flex: .7
  },
  text: {
    fontSize: 13,
    fontFamily: 'PoppinsR',
    color: "rgba(0,0,0,.6)",
    alignSelf: "center",
    textAlign: "center",
    width: "80%",
    marginBottom: 50
  },
  form: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    width: '90%',
    alignItems: 'center',
    marginTop: 30,
    paddingBottom: 40
  },
  btn: {
    marginTop: 10,
  },
  btnText: {
    fontSize: 15,
    fontFamily: 'PoppinsS',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  privacy: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    top: -5,
    marginBottom: 8
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  notPicked:{
    fontFamily: "PoppinsL",
    color: "rgba(0,0,0,.5)",
    fontSize: 15
  },
  picked:{
    fontFamily: "PoppinsL",
    fontSize: 15

  },
  Imagecontainer: {
    justifyContent: "center",
    height: 230,
    width: "85%",
    borderRadius: 20,
    marginVertical: 10,
    zIndex: 9999
  },
  ActivityIndicator:{
    position: "absolute",
    zIndex: 999,
    alignItems: "center",
    justifyContent: "center",
    height: 230,
    backgroundColor:"rgba(255,255,255,.8)",
    width: "85%",
    marginVertical: 10
  },
  subContainer:{

  }
})


export default DeleteAccountPage
