import {
  ScrollView,
  View,
  StyleSheet,
  Platform,
  Text,
  ActivityIndicator,
  TouchableHighlight,
  Pressable,
  Image
} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from "@react-navigation/native"
import { deleteNotifcation, deleteNotifcations, getNotifications, setNewNotifications, setNotificationsSeen, setSeenNotifications } from '../reduxToolkit/userSlice'
import { SwipeListView } from 'react-native-swipe-list-view';

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

  const getNotificationsFunction = () => {
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

  useEffect(() => {
    if(isFocused){
      getNotificationsFunction()
    }
  }, [isFocused])


  const onDeleteNotification = (id) => {
    console.log("id", id)
    dispatch(
      deleteNotifcations({ids: [id]})
    ).then(() => getNotificationsFunction() )
    .catch(err => console.log("er, err", err))
  }
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

 


  const renderHiddenItem = (data) => (
    <TouchableHighlight 
      style={[styles.backRightBtn,  styles.backRightBtnRight]} 
      onPress={() => onDeleteNotification(data.item.id)}
    >
        <Image style={styles.trash} source={trash} />
    </TouchableHighlight>
  );

  return loading ? <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
  <ActivityIndicator size={"large"} color="#4E84D5"/>
  </View>
  :(
    <View style={styles.container}>
      <View style={styles.container}>
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
            <SwipeListView
              data={notifications}
              renderItem={ (data, rowMap) => {
                const n = data.item
                return(
                    <Notification
                    title={n.message}
                    action={n.text}
                    color={n.text === 'urgent' ? true : false}
                    key={data.index}
                    acceptContract={acceptContract}
                    navJobs={navJobs}
                    navJobDetails={navJobDetails}
                    navCongrats={navCongrats}
                    n={n}
                  />
              )}}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={0}
              rightOpenValue={-80}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
            />
            
        ) : (
          <View style={styles.container4}>
            <Text style={{ marginTop: 200, alignSelf: 'center' }}>
              No notifications at the moment
            </Text>
          </View>
        )}
      </View>
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
        rowBack: {
          alignItems: 'center',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 15,
      },
      backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
      right: 0,
      backgroundColor: 'red',
      height: 60,
      width: 60,
      marginTop: 28,
      borderRadius: 15,
      marginRight: 15
    },
        })
    : StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: 'white',
        },
        container4: {
          marginTop: 40,
          paddingBottom: 100
        },
        rowBack: {
          alignItems: 'center',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
      },
      backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        right: 0,
        backgroundColor: 'red',
        height: 60,
        width: 60,
        marginTop: 28,
        borderRadius: 15,
        marginRight: 15
    },
   
  })

export default NotificationsPage
