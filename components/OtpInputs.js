import OTPInputView from '@twotalltotems/react-native-otp-input'
import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackActions } from '@react-navigation/native';

import Header from './Header';
import otpIcon from '../assets/images/otpIcon.png';
import PrimaryButton from './Buttons/PrimaryButton';
import { resetPassword, verifyUser, createOTP } from '../reduxToolkit/userSlice';
import Inputs from './Inputs';

export default OtpInputs = ({navigation, route}) => {

    const {update} = route.params
    const [otpCode, setOtpCode ] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [showPasswords, setShowPasswords] = useState(false)
    const [loading, setLoading] = useState(false)

    const containsNumbers = (str) => {
      return /\d/.test(str);
    }
    const dispatch = useDispatch()

    const navigateNext =() => {
      if (route.params.role === "client"){
        return  navigation.dispatch(
          StackActions.replace('clientsignup2')
        )
      } else {
        navigation.dispatch(
          StackActions.replace('JobSignUpb', {update})
        )
      }
    }
    const {
        user
    } = useSelector((store) => store.user)
    const onNextClick = () => {
      if(otpCode.length < 4){
        return alert("Please enter your OTP")
      }
      if(route.params.reset){
        if(showPasswords){
          if(password === ""|| password2 === "" ){
            return alert("Please enter all inputs")
          }
          if (password.length < 8 || !containsNumbers(password) ){
            return alert(" Password must be at least 8 characters with 1 upper case letter and 1 number")
          }
          if (password2 !== password){
            return alert("Error, passwords don't match!")
          }
          dispatch(
            resetPassword({
              email: route.params.email.toLowerCase(),
              password: password,
              otp: otpCode
            })
          ).unwrap()
          .then( (res) => {
            console.log("Response", res)
            alert("Congratulations, your'e password is updated!");
            navigation.dispatch(
              StackActions.replace('login', {edit: false})
            )
          }).catch((err) => {
            alert("OTP is incorrect!")
            setOtpCode("")
            setPassword("")
            setPassword2("")
            setShowPasswords(false)
            console.log("Errror reseting ", err)
          })
        } else {
          setShowPasswords(true)
        }
      } else {

        dispatch(
            verifyUser({
                email: user.email,
                otp: otpCode
            })
        )
        .unwrap()
        .then(res => {
            if(res.msg === "user verified !"){
                alert(`Thank you ${user.name}! Your account was registerd!`)
                navigateNext()
            }
        })
        .catch(err => {
            console.log("error", err)
            alert("Error, please try again")
        })
      }


    }   
    const onResend = () => {
      setLoading(true)
      if(route.params.reset){
        dispatch(
          createOTP({email: route.params.email.toLowerCase()})
        ).unwrap()
        .then(() => {
          alert("New OTP sent!")
          setLoading(false)
        })
        .catch(err => {
          console.log("error creating otp", err)
          alert("Error sending a new OTP")
          setLoading(false)
        })
      } else {
        dispatch(
          createOTP({email: user.email})
        ).unwrap()
        .then(() => {
          alert("New OTP sent!");
          setLoading(false)
        })
        .catch(err => {
          console.log("error creating otp", err)
          alert("Error sending a new OTP")
          setLoading(false)
        })
      }

    }
    return loading ?  <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <ActivityIndicator size={"large"} color="#4E84D5"/>
    </View>
    :(
        <View style={styles.container}>
            <Header icon={otpIcon} hidden title="OTP Verification" />
            {  ((route.params.reset && !showPasswords) || !route.params.reset) &&
              <View style={{alignItems: "center"}}>
                  <Text style={styles.text}>
                  Type below the 4 digits recieved by email on the email address
                  </Text>
                  <OTPInputView
                      style={{width: '80%', height: 200}}
                      pinCount={4}
                      // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                      // onCodeChanged = {code => { this.setState({code})}}
                      autoFocusOnLoad
                      codeInputFieldStyle={styles.underlineStyleBase}
                      codeInputHighlightStyle={styles.underlineStyleHighLighted}
                      onCodeFilled = {(code) => {
                          setOtpCode(code)
                      }}
                  />
              </View>
            }
            { route.params.reset && showPasswords &&
              <View style={styles.container4}>
                <Inputs placeholder="New Password*" onChange={setPassword} value={password} />
                { 
                  password !== "" && (password.length < 8 || !containsNumbers(password) )&& 
                  <Text style={styles.warning}>
                    Password must be at least 8 characters with 1 upper case letter and 1 number
                  </Text>
                }
                <Inputs
                  placeholder='Confirm Password*'
                  onChange={(e) => setPassword2(e)}
                  value={password2}
                />
                  { 
                    password !== password2 && password2 !== "" &&
                    <Text style={styles.warning}>
                      passwords don't match
                    </Text>
                  }
              </View>
            } 
            <TouchableOpacity onPress={() => onNextClick()} style={styles.button}>
                  <PrimaryButton title={"Next"} />
            </TouchableOpacity>
            <Pressable onPress={() =>  onResend()} style={styles.button2}>
                <Text style={styles.skipText}>
                    Resend Code
                </Text>
            </Pressable>
           
        </View>


    )
}


const styles = StyleSheet.create({
container:{
    backgroundColor: "white",
    flex: 1,
},
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#40ABD1",
  },

  underlineStyleBase: {
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: "#40ABD1",
    color: "black",
    backgroundColor: "#F4F8F8",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: 50,
    marginLeft: 10,
    marginRight: 20

  },

  underlineStyleHighLighted: {
    borderColor: "#40ABD1",
  },
  button:{
    alignSelf: "center"
  },
  button2:{
    alignSelf: "center",
    marginTop: 50
  },
  skipText:{
    fontFamily: 'PoppinsS',
    fontSize: 15,
    marginTop: -25,
    marginBottom: 80,
    letterSpacing: 2
  }, 
  text: {
    width: '70%',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 55,
    marginBottom: -20,
    color: 'rgba(0,0,0,0.6)',
  },
  container4:{
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
    top: 100,
    marginBottom: 150
  },
  warning:{
    alignSelf: "flex-end",
    marginTop: -10,
    marginBottom: 10,
    right: 30,
    color: "#BE3142",
    fontSize: 10,
    maxWidth: "80%"
  }
});