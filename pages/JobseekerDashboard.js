import {
  ScrollView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view'
import { useIsFocused } from "@react-navigation/native"

import { useSelector, useDispatch } from 'react-redux'

import { addJobToFavorites, getFreelancerDashboard, removeFav } from '../reduxToolkit/freelancerSlice'

import SecondaryHeader from '../components/SecondaryHeader'
import Job from '../components/Job'
import Navbar from '../components/Navbar'
import backgroundImage from '../assets/images/currentBg.png'
import totalBg from '../assets/images/totalBg.png'
import SeekerDashJob from '../components/SeekerDashJob'
import { getFavoriteJob } from '../reduxToolkit/jobSlice'

const JobseekerDashboard = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  const [favRoute, setFavRoute] = useState(false)
  const [favJobs, setFavJobs] = useState([])

  const { user } = useSelector((store) => store.user)
  const { freelancer } = useSelector((store) => store.freelancer)
  const { dashboard } = useSelector((store) => store.freelancer)
  const { currentJobs, pastJobs, totalWorkingTime, totalCashEarned } = dashboard
  const totalMonths =
    totalWorkingTime > 30 ? Math.floor(totalWorkingTime / 30) : 0
  const totalDays =
    totalWorkingTime > 30 ? Math.floor(totalWorkingTime % 30) : totalWorkingTime

  const dispatch = useDispatch()
  

  useEffect(() => {
    if(isFocused){
      setFavRoute(false)
    }
    console.log("id",freelancer.id)
    dispatch(getFreelancerDashboard(user.freelancerId))
    dispatch(getFavoriteJob(freelancer.id))
    .then()
    .catch(err => console.log(err))
  }, [route, isFocused])


  const navigatePrevious = (id) => {
    // navigation.navigate('jobDescription', {id})
  }
  const navigate = (i) => {
    // navigation.navigate('jobDescription', {id})
  }
  const RenderItem = (data, index) => {
    return (
      <View style={styles.renderItem}>
        <SeekerDashJob
          heart={true}
          title={currentJobs[0]?.title}
          description={currentJobs[0]?.description}
          price={currentJobs[0]?.budget}
          navigate={navigatePrevious}
          disabled
          job={currentJobs[0]}
        />
      </View>
    )
  }

  const MaskedTitle = ({ title }) => {
    return (
      <MaskedView
        style={styles.titleContainer}
        maskElement={
          <Text style={[styles.title, { backgroundColor: 'transparent' }]}>
            {title}
          </Text>
        }
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={['#31BEBB', '#655BDA']}
        >
          <Text style={[styles.title, { opacity: 0 }]}>{title}</Text>
        </LinearGradient>
      </MaskedView>
    )
  }

  const TotalContainer = ({ month, day }) => {
    return (
      <ImageBackground
        source={totalBg}
        style={styles.totalContainer}
        resizeMode='contain'
      >
        <View style={styles.sub}>
          <Text style={styles.totalText}>{Math.round(month)}</Text>
          <Text style={styles.totalText2}>
            {month === 1 ? 'month' : 'months'}
          </Text>
        </View>
        <View style={styles.borderL} />
        <View style={[styles.sub]}>
          <Text style={styles.totalText}>{ !isNaN(Math.ceil(day)) ? Math.ceil(day) : 0}</Text>
          <Text style={styles.totalText2}>{Math.ceil(day) === 1 ? 'day' : 'days'}</Text>
        </View>
      </ImageBackground>
    )
  }
  const TotalContainer2 = ({ n }) => {
    return (
      <ImageBackground
        source={totalBg}
        style={[styles.totalContainer]}
        resizeMode='contain'
      >
        <View style={[styles.totalContainer2]}>
          <Text style={styles.totalText}>{n}</Text>
          <Text style={[styles.totalText2, styles.textPadding]}>AED</Text>
        </View>
      </ImageBackground>
    )
  }
  const likeJob = (id) => {
    dispatch(
      addJobToFavorites({
        id: id,
        freelancerId: freelancer.id
      })
    )
    .unwrap()
    .then(res => console.log("res like", res))
    .catch(err => console.log("error", err))
  }

  const unLikeJob = (id) => {
    dispatch(
      removeFav({
        id: id,
        freelancerId: freelancer.id

      })
    )
    .unwrap()
    .then(res => console.log("res like", res))
    .catch(err => console.log("error", err))
  }
  const renderItem = (data) => {
    return  <Job {...data.item} navigate={navigate} data={data} likeJob={likeJob} like dash unLikeJob={unLikeJob}/>
  }
  return (
    <View style={styles.container}>

      { !favRoute
        ? <ScrollView style={styles.container4}>
          <SecondaryHeader 
            title={`Hi ${user.name}`} 
            heart={true} fav={true} 
            setFavRoute={setFavRoute} 
            favRoute={favRoute}
          />
          <View style={styles.row2}>
            <View style={styles.col}>
              <Text style={styles.colText}>Total Working Time</Text>
              <TotalContainer month={totalMonths} day={totalDays} />
            </View>
            <View style={styles.col}>
              <Text style={styles.colText}>Total Cash Earned</Text>
              <TotalContainer2 n={totalCashEarned} />
            </View>
          </View>
          {currentJobs?.length >= 1 ? (
            <View style={styles.current}>
              <Image style={styles.background} source={backgroundImage} />
              <View style={styles.currentSub}>
                <Text style={[styles.title2]}>Current Job</Text>

                <SeekerDashJob
                  heart={true}
                  current={true}
                  title={currentJobs[0]?.title}
                  description={currentJobs[0]?.description}
                  price={currentJobs[0]?.budget}
                  navigate={navigatePrevious}
                  disabled
                  job={currentJobs[0]}
                />
              </View>
            </View>
          ) : null
          }
          {pastJobs?.length >= 1 ? (
            <View>
              <MaskedTitle title='Previous Jobs' />

              {pastJobs.map((data, i) => (
                <RenderItem data={data} index={i} key={data.id} />
              ))}
            </View>
          ) : null}
        </ScrollView>
        : <View style={styles.container}>
            <SecondaryHeader 
              title={`Hi ${user.name}`} 
              heart={true} fav={true} 
              setFavRoute={setFavRoute} 
              favRoute={favRoute}
            />
            {
              favJobs.length>0 && 
              <FlatList
                  data={favJobs}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={{marginTop: -20, zIndex: 9999}}
                  style={styles.jobs}
                />
            }
          </View>
        }


      <Navbar active='Dashboard' navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  background: {
    height: 300,
    width: '100%',
    position: 'absolute',
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
  flatlist: {
    marginTop: -25,
  },
  titleContainer: {
    alignSelf: 'flex-start',
    left: 20,
    marginBottom: 20,
    top: 5,
  },
  title: {
    fontSize: 20,
    paddingBottom: 15,
    fontFamily: 'PoppinsS',
  },
  title2: {
    fontSize: 20,
    top: 35,
    fontFamily: 'PoppinsS',
    left: 20,
    marginBottom: 35,
    color: 'white',
  },
  currentSub: {
    top: -10,
    height: 310,
  },
  totalImg: {
    position: 'absolute',
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 175,
    height: 65,
  },
  totalText: {
    color: 'white',
    fontFamily: 'PoppinsB',
    fontSize: 20,
  },
  totalText2: {
    color: 'white',
    fontFamily: 'PoppinsR',
    fontSize: 9,
    top: -4,
  },
  sub: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  borderL: {
    borderLeftWidth: 1,
    borderLeftColor: 'white',
    width: 1,
    height: '50%',
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    width: '95%',
    marginBottom: 20,
    paddingVertical: 10,
  },
  col: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalContainer2: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textPadding: {
    left: 5,
  },
  colText: {
    fontSize: 13,
    fontFamily: 'PoppinsR',
    letterSpacing: 1.5,
    bottom: 10,
  },
})

export default JobseekerDashboard
