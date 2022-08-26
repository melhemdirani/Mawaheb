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

import { deleteNotifcation, deleteNotifcations, setNotificationsSeen } from '../reduxToolkit/userSlice'

import Navbar from '../components/Navbar'
import Header from '../components/Header'
import notificationIcon from '../assets/images/notificationIcon.png'
import trash from '../assets/images/trash.png'
import Notification from '../components/Notification'
import { acceptContractFreelancer } from '../reduxToolkit/freelancerSlice'
import { getClientDashboard } from '../reduxToolkit/clientSlice'
import { getFreelancer } from '../reduxToolkit/freelancerSlice';
import { getJob } from '../reduxToolkit/jobSlice'

const NotificationsPage = ({ navigation, role, route }) => {
  const { user, notifications, notificationsSeen, isLoading } = useSelector((store) => store.user)
  const { freelancer} = useSelector((store) => store.freelancer)
  const { job} = useSelector((store) => store.job)
  const { client} = useSelector((store) => store.client)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log("notificationsSeens", notificationsSeen)
    if(!notificationsSeen){
      dispatch(setNotificationsSeen(true))
    }
  }, [route])
  const dispatch = useDispatch()
  const acceptContract = (contractId, jobId) => {
    navigation.navigate('acceptContractFreelancer', {role: "freelancer", action: contractId})
  }
  const navCongrats = (action) => {
    navigation.navigate('acceptedClient', {action, role: user.role})
  }
  const navJobs = (freelancerId, jobId, action, notificationId) => {
    setLoading(true)

    if(freelancerId === "propsal" || jobId === "propsal" || action === "proposal"){
      return setLoading(false)
    } else{

    dispatch(getJob(jobId))
    .unwrap()
    .then((response) =>{
      dispatch(
        getFreelancer(freelancerId)
      ) .then( res => {
        console.log("res", res.payload.freelancer)
        setTimeout(() => {
          if(
            response.job ===null || 
            response.job ===undefined || 
            response.job ==={} || 
            res.payload.freelancer ===null || 
            res.payload.freelancer ==={} || 
            res.payload.freelancer ===undefined 
          ){
             setLoading(false)
            return alert("Notification expired")
          } else {
            setLoading(false)
            dispatch( 
              deleteNotifcation(notificationId)
            )
            navigation.navigate('freelancerDetails', {job: response.job, freelancer: res.payload.freelancer})
          }
        }, (400));
      
      })
    })
    .catch(err=> {
      console.log("eror", err)
      setLoading(false)
      // return alert("Notification has expired")
    })
  }

    
  }
  const navJobDetails = (id) => {
    navigation.navigate('jobDescription', {id})
  }

  const onDeleteNotifications = () => {
     let notificationIds= notifications.map(item => item.id)
    dispatch(
      deleteNotifcations({ids: notificationIds})
    )
  }

  return loading ? <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
    <ActivityIndicator size={"large"} />
  </View>
  :(
    <View style={styles.container}>
      <ScrollView>
        <Header
          icon={notificationIcon}
          hidden
          rightIcon={trash}
          trash
          onTrash={() => onDeleteNotifications()}
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
                navJobDetails={navJobDetails}
                navCongrats={navCongrats}
                n={n}
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
