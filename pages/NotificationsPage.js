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
import { useIsFocused } from "@react-navigation/native"
import { deleteNotifcation, deleteNotifcations, getNotifications, setNewNotifications, setNotificationsSeen, setSeenNotifications } from '../reduxToolkit/userSlice'

import Navbar from '../components/Navbar'
import Header from '../components/Header'
import notificationIcon from '../assets/images/notificationIcon.png'
import trash from '../assets/images/trash.png'
import Notification from '../components/Notification'
import { acceptContractFreelancer } from '../reduxToolkit/freelancerSlice'
import { getClientDashboard } from '../reduxToolkit/clientSlice'
import { getFreelancer } from '../reduxToolkit/freelancerSlice';
import { getJob } from '../reduxToolkit/jobSlice'
import { setEnabled } from 'react-native/Libraries/Performance/Systrace'

const NotificationsPage = ({ navigation, role, route }) => {

  
  const { user, notifications, notificationsSeen, isLoading, newNotifications} = useSelector((store) => store.user)
  const { freelancer} = useSelector((store) => store.freelancer)
  const { client} = useSelector((store) => store.client)
  const [loading, setLoading] = useState(false)
  const notificationIds= notifications.map(item => item.id)
  const isFocused = useIsFocused();


  useEffect(() => {
    if(isFocused){
      if(user.role === "freelancer"){
        dispatch(getNotifications({ 
          id: user.freelancerId ? user.freelancerId : freelancer.id, 
          role: user.role 
        }))
      } else {
        dispatch(getNotifications({ 
          id: user.clientId 
          ? user.clientId 
          : client.id, 
          role: 
          user.role 
        }))
      }
    
      if(newNotifications > 0){
        dispatch(
          setSeenNotifications({notificationIds: notificationIds})
        )
      }
      if(!notificationsSeen){
        dispatch(setNewNotifications(0))
      }
    }
  }, [isFocused])
  const dispatch = useDispatch()
  const acceptContract = (contractId, jobId) => {
    navigation.navigate('acceptContractFreelancer', {role: "freelancer", action: contractId, jobId: jobId}) // check jobId if needed
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
  const navJobDetails = (id, invitationId) => {
    navigation.navigate('jobDescription', {id, inviteToApply: true, invitationId: invitationId})
  }

  const onDeleteNotifications = () => {
    dispatch(
      deleteNotifcations({ids: notificationIds})
    )
  }

  return loading ? <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
  <ActivityIndicator size={"large"} color="#4E84D5"/>
  </View>
  :(
    <View style={styles.container}>
      <ScrollView>
        <Header
          icon={notificationIcon}
          hidden
          rightIcon={trash}
          trash={notifications.length > 0 ? true : false}
          onTrash={() => onDeleteNotifications()}
          numberHidded
          title={'Notifications'}
        />
        {isLoading ? (
          <View style={{ marginTop: 200, backgroundColor: "white" }}>
            <ActivityIndicator size={'large'} color="#4E84D5"/>
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
