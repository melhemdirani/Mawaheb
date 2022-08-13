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

import { getNotifications } from '../reduxToolkit/userSlice'

import Navbar from '../components/Navbar'
import Header from '../components/Header'
import notificationIcon from '../assets/images/notificationIcon.png'
import trash from '../assets/images/trash.png'
import Notification from '../components/Notification'

const NotificationsPage = ({ navigation, role, route }) => {
  const { user, notifications, isLoading } = useSelector((store) => store.user)
  const testing = []

  const dispatch = useDispatch()

  useEffect(() => {
    if (user?.role === 'client' && user.clientId) {
      dispatch(getNotifications({ id: user.clientId, role: user.role }))
    } else if (user.role === 'freelancer' && user.freelancerId) {
      dispatch(getNotifications({ id: user.freelancerId, role: user.role }))
    } else {
      //   navigation.navigate('Login')
      alert('You are not logged in')
    }
  }, [])
  console.log('after use effect', notifications)

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
                color={n.text === 'urgent' ? true : false}
                key={i}
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
