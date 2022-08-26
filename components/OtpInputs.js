import OTPInputView from '@twotalltotems/react-native-otp-input'
import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    TouchableOpacity
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackActions } from '@react-navigation/native';

import Header from './Header';
import otpIcon from '../assets/images/otpIcon.png';
import PrimaryButton from './Buttons/PrimaryButton';
import { verifyUser } from '../reduxToolkit/userSlice';

export default OtpInputs = ({navigation, route}) => {

    const {update} = route.params
    const [otpCode, setOtpCode ] = useState()
    const dispatch = useDispatch()

    const navigateNext =() => {
        navigation.dispatch(
          StackActions.replace('JobSignUpb', {update})
        )
    
      }
    const {
        user
    } = useSelector((store) => store.user)
    console.log("user", user)

    const onNextClick = () => {
        console.log("code", otpCode)
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
    const onResend = () => {

    }
    return(
        <View style={styles.container}>
            <Header icon={otpIcon} hidden title="OTP Verification" />
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
            <TouchableOpacity onPress={() => onNextClick()} style={styles.button}>
                  <PrimaryButton title={"Next"} />
            </TouchableOpacity>
            {/* <Pressable onPress={() =>  skip()} style={styles.button2}>
                <Text style={styles.skipText}>
                    Resend Code
                </Text>
            </Pressable> */}
           
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
});