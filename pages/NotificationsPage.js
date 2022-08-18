import {
  ScrollView,
  View,
  StyleSheet,
  Platform,
  Text,
  ActivityIndicator,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setNotificationsSeen } from '../reduxToolkit/userSlice'

import Navbar from '../components/Navbar'
import Header from '../components/Header'
import notificationIcon from '../assets/images/notificationIcon.png'
import trash from '../assets/images/trash.png'
import Notification from '../components/Notification'
import { acceptContractFreelancer } from '../reduxToolkit/freelancerSlice'
import { getClientDashboard } from '../reduxToolkit/clientSlice'

const NotificationsPage = ({ navigation, role, route }) => {
  const { user, notifications, notificationsSeen, isLoading } = useSelector((store) => store.user)
  const { freelancer} = useSelector((store) => store.freelancer)
  const { client} = useSelector((store) => store.client)
  const testing = []

  useEffect(() => {
    console.log("notificationsSeens", notificationsSeen)
    if(!notificationsSeen){
      dispatch(setNotificationsSeen(true))
    }
  }, [route])
  const dispatch = useDispatch()
  const acceptContract = (action) => {
    navigation.navigate('acceptContract', {action, role: "freelancer"})
  }
  const navCongrats = (action) => {
    navigation.navigate('acceptedClient')
  }
  const navJobs = (action) => {
    navigation.navigate('recruiter_Jobs')

  }


  return (
    <View style={styles.container}>
      <ScrollView>
        <Header
          icon={notificationIcon}
          hidden
          rightIcon={trash}
          numberHidded
          title={'Notifications'}
        />
        {isLoading ? (
          <View style={{ marginTop: 200 }}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : notifications.length > 0 ? (
          <View style={styles.container4}>
            {notifications.map((n, i) => (
              <Notification
                title={n.message}
                action={n.text}
                color={n.text === 'urgent' ? true : false}
                key={i}
                acceptContract={acceptContract}
                navJobs={navJobs}
                navCongrats={navCongrats}
              />
            ))}
          </View>
        ) : (
          <View style={styles.container4}>
            <Text style={{ marginTop: 200, alignSelf: 'center' }}>
              No notifications at the moment
            </Text>
          </View>
        )}
      </ScrollView>
      <Navbar
        active='Notifications'
        navigation={navigation}
        client={role === 'client' ? true : false}
      />
    </View>
  )
}

const styles =
  Platform.OS === 'android'
    ? StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: 'white',
        },
        container4: {
          marginTop: 40,
        },
      })
    : StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: 'white',
        },
        container4: {
          marginTop: 40,
        },
      })

export default NotificationsPage
