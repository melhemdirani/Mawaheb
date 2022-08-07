import React, { useState, useLayoutEffect, useEffect } from 'react'
import { View, ScrollView, StyleSheet, FlatList, Text } from 'react-native'

import { Notifier, Easing } from 'react-native-notifier'

import SecondaryHeader from '../components/SecondaryHeader'
import Job from '../components/Job'
import Navbar from '../components/Navbar'
import { CustomNotification } from '../components/CustomNotifications'
import { notify } from '../components/Notifyme.js'
import { getAllJobs } from '../reduxToolkit/jobSlice'
import { useDispatch, useSelector } from 'react-redux'

const JobsPage = ({ navigation, name, notifications }) => {
  const [notificationIndex, setNotifcaitonIndex] = useState(0)
  const { jobs } = useSelector((store) => store.job)
  const { user } = useSelector((store) => store.user)


  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllJobs())
  }, [])

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

  const navigate = (id) => {
    console.log('routing')
    navigation.navigate('jobDescription', { id })
  }

  const renderItem = (data) => {
    return <Job {...data.item} navigate={navigate} />
  }
  let welcomeMessage = `Hi ${user?.name}`
  return (
    <View style={styles.container}>
      <SecondaryHeader title={welcomeMessage}></SecondaryHeader>

      <FlatList
        data={jobs.length ? jobs : { id: 0, title: 'No Jobs Found' }}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        // contentContainerStyle={{paddingBottom: 200}}
        style={styles.jobs}
      ></FlatList>

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
    flex: 1,
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
