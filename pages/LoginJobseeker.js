import { View, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import { Notifier, Easing } from 'react-native-notifier'
import axios from 'axios'

import { signIn } from '../redux/user/user.actions'

import Header from '../components/Header'
import settingsIcon from '../assets/images/signUp.png'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import Inputs from '../components/Inputs'
import { CustomNotification } from '../components/CustomNotifications'
import { loginUser } from '../reduxToolkit/userSlice'
import { useDispatch ,useSelector} from 'react-redux'

const LoginJobseeker = ({ navigation, signIn, notifications, name }) => {
  const dispatch = useDispatch()

  const [notificationIndex, setNotifcaitonIndex] = useState(0)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const {user, isLoading, error} = useSelector((store) => store.user)

  const notify = (name, description) => {
    let newName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    Notifier.showNotification({
      title: newName,
      description: description,
      duration: 0,
      Component: CustomNotification,
      showAnimationDuration: 800,
      showEasing: Easing.bounce,
      onHidden: () => console.log('Hidden'),
      onPress: () => console.log('Pressed'),
      hideOnPress: false,
    })
  }
  const login = async () => {
    if (email === '' || password === '') {
      notify(name, 'Please fill all the fields')
    } else {
      dispatch(loginUser({ email, password }))
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

  const navigate = () => {
    // will use the above method when backend is ready
    let role = 'freelancer'
    let names = 'johN'
    let newName = names.charAt(0).toUpperCase() + names.slice(1).toLowerCase()
    notify(name, 'Welcome back!')
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
        urgent: false,
      },
    ]

    signIn({ role: role, name: newName, notifications: newNotifications })
    if (role === 'client') {
      navigation.navigate('recruiter_Jobs')
    } else if (role === 'freelancer') {
      navigation.navigate('jobseeker_jobs')
    } else alert('Error logging in')
  }

  return (
    <View style={styles.container}>
      <Header icon={settingsIcon} title='Log in' goBack={navigation.goBack} />
      <View style={styles.container4}>
        <Inputs
          placeholder='Email'
          style={styles.container4}
          onChange={setEmail}
        />
        <Inputs
          placeholder='Password'
          style={styles.container4}
          onChange={setPassword}
        />
      </View>
      <View style={styles.container4}>
        <PrimaryButton title='Log in' navigate={login} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  container4: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
    top: 100,
    marginBottom: 100,
  },
  button: {
    top: 120,
    alignSelf: 'center',
  },
})

export default LoginJobseeker
