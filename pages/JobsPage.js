import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'

import { Notifier, Easing } from 'react-native-notifier'

import SecondaryHeader from '../components/SecondaryHeader'
import Job from '../components/Job'
import Navbar from '../components/Navbar'
import { CustomNotification } from '../components/CustomNotifications'
import { notify } from '../components/Notifyme.js'

const JobsPage = ({ navigation, name, notifications }) => {
  const [notificationIndex, setNotifcaitonIndex] = useState(0)

  const alterNotificationIndex = () => {
    if (notificationIndex === notifications.length - 1) {
      return
    } else {
      setNotifcaitonIndex(notificationIndex + 1)
    }
  }

  // useEffect(() => {
  //     if(notifications.length)
  //     notify(name, notifications[notificationIndex].notification, alterNotificationIndex)
  // }, [notifications, notificationIndex])

  const Data = [
    {
      id: 0,
      title: 'Job Title Lorem Ipsum1',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate blanditiis doloremque itaque praesentium',
      roleDescription:
        'Job description lorom ipsum dolor sit ameno Job description lorom  sit ameno Job description lorom ipsum dolor sit ameno Job description lorom ipsum dolor sit ameno Job description lorom ipsum dolor sit ameno it ameno Job description lorom ipsum dolor sit ameno Job description lorom ipsum dolor sit ameno Job description',
      price: 15000,
      date: '30 May-2020',
      shift: 'day shift',
      location: 'Sharjah',
    },
    {
      id: 1,
      title: 'Job Title Lorem Ipsum2',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate blanditiis doloremque itaque praesentium1',
      roleDescription:
        'Job description lorom ipsum dolor sit ameno Job description lorom  sit ameno Job description lorom ipsum dolor sit ameno Job description lorom ipsum dolor sit ameno Job description lorom ipsum dolor sit ameno it ameno Job description lorom ipsum dolor sit ameno Job description lorom ipsum dolor sit ameno Job description',
      price: 10000,
      date: '30 May-2020',
      shift: 'day shift',
      location: 'Sharjah',
    },
    {
      id: 2,
      title: 'Job Title Lorem Ipsum3',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate blanditiis doloremque itaque praesentium2',
      price: 20000,
      roleDescription:
        'Job description lorom ipsum dolor sit ameno Job description lorom  sit ameno Job description lorom ipsum dolor sit ameno Job description lorom ipsum dolor sit ameno Job description lorom ipsum dolor sit ameno it ameno Job description lorom ipsum dolor sit ameno Job description lorom ipsum dolor sit ameno Job description',
      date: '30 May-2020',
      shift: 'day shift',
      location: 'Sharjah',
    },
  ]

  const navigate = (i) => {
    console.log('routing')
    navigation.navigate('jobDescription', { myjobs: false, data: Data[i] })
  }

  const RenderItem = ({ data, i }) => {
    return (
      <View style={styles.renderItem}>
        <Job
          title={data.title}
          description={data.description}
          price={data.price}
          navigate={navigate}
          i={i}
        />
      </View>
    )
  }
  let welcomeMessage = `Hi ${name},`
  return (
    <View style={styles.container}>
      <ScrollView>
        <SecondaryHeader title={welcomeMessage}></SecondaryHeader>
        {Data &&
          Data.map((data, i) => <RenderItem key={i} data={data} i={i} />)}
      </ScrollView>
      <Navbar active='Jobs' navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  jobs: {
    padding: 10,
  },
  renderItem: {},
  body: {
    padding: 20,
  },
  backIcon: {
    display: 'none',
  },
})

export default JobsPage
