import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view'
import Carousel from 'react-native-anchor-carousel'
import { Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { getClientDashboard } from '../reduxToolkit/clientSlice'

import SecondaryHeader from '../components/SecondaryHeader'
import Job from '../components/Job'
import Navbar from '../components/Navbar'
import backgroundImage from '../assets/images/currentBg.png'
import totalBg from '../assets/images/totalBg.png'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import SimplePaginationDot from '../components/SimplePaginationDot'
import { ActivityIndicator } from 'react-native'
import JobClient from '../components/JobClient'

const ClientDashboard = ({ navigation, route }) => {
  const { width: windowWidth } = Dimensions.get('window')
  const { client, clientDashboard, isLoading } = useSelector(
    (store) => store.client
  )
  const { user } = useSelector((store) => store.user)
  const { job } = useSelector((store) => store.user)
  const { numOfJobs, numOfContracts } = clientDashboard
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
    
  const [currentJobs, setCurrentJobs] = useState({})
  const [pastJobs, setPastJobs] = useState({})
  useEffect(() => {
    setLoading(true)
    dispatch(getClientDashboard(user?.clientId || client.id))
    .unwrap()
    .then((res) =>  { 
        setCurrentJobs(res.currentJobs); 
        setPastJobs(res.pastJobs); 
        setLoading(false) 
    })
    .catch(err => {console.log("error getting client dashboard", err);    setLoading(false)})
  }, [route])

  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = React.useRef()
  function handleCarouselScrollEnd(item, index) {
    setCurrentIndex(index)
  }
  const navigate = (id) => {
    navigation.navigate('jobDescriptionClient', { job: id })
  }

  const renderItem = ({ item, index }) => {

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          carouselRef.current.scrollToIndex(index)
        }}
      >
        <JobClient
          heart={true}
          current={true}
          description={item.description}
          navigate={navigate}
          id={item.id}
          item={item}
        />
      </TouchableOpacity>
    )
  }

  const RenderItem = (data) => {
    let lastOne = data.index === pastJobs.length - 1 ? true : false
    return (
      <View style={styles.renderItem}>
        <JobClient
          description={data.data.description}
          price={data.data.budget}
          lastOne={lastOne}
          heart={true}
          id={data.id}
          item={data.data}
          navigate={navigate}
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

  const TotalContainer = ({ freelancers, employees }) => {
    return (
      <ImageBackground
        source={totalBg}
        style={styles.totalContainer}
        resizeMode='contain'
      >
        <View style={styles.sub}>
          <Text style={styles.totalText}>{freelancers}</Text>
          <Text style={styles.totalText2}>freelancers</Text>
        </View>
        <View style={styles.borderL} />
        <View style={[styles.sub]}>
          <Text style={styles.totalText}>{employees}</Text>
          <Text style={styles.totalText2}>employees</Text>
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
          <Text style={[styles.totalText2, styles.textPadding]}>
            {n === 1 ? 'jobs' : 'jobs'}
          </Text>
        </View>
      </ImageBackground>
    )
  }
  const navigatePosting = () => {
    navigation.navigate('jobPosting')
  }
  return loading ? <View>
    <ActivityIndicator size={"large"} />
  </View>
  :(
    <View style={styles.container}>
      <ScrollView style={styles.container4}>
        <SecondaryHeader title={'Welcome'} heart={true} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigatePosting()}
        >
          <PrimaryButton title='Post a new job' />
        </TouchableOpacity>
        <View style={styles.row2}>
          <View style={styles.col}>
            <Text style={styles.colText}>Number of Contracts</Text>
            <TotalContainer freelancers={12} employees={25} />
          </View>
          <View style={styles.col}>
            <Text style={styles.colText}>Total Jobs Posted</Text>
            <TotalContainer2 n={numOfJobs} />
          </View>
        </View>
        {currentJobs?.length >= 1 ? (
          <View style={styles.current}>
            <Image style={styles.background} source={backgroundImage} />
            <View style={styles.currentSub}>
              <Text style={[styles.title2]}>Current Jobs</Text>

              <Carousel
                ref={carouselRef}
                data={currentJobs}
                renderItem={renderItem}
                style={styles.carousel}
                itemWidth={windowWidth}
                containerWidth={windowWidth}
                separatorWidth={0}
                onScrollEnd={handleCarouselScrollEnd}
              />
              <SimplePaginationDot
                currentIndex={currentIndex}
                length={currentJobs?.length}
              />
            </View>
          </View>
        ) : (
          <Text style={styles.noCurrent}>No current jobs</Text>
        )}
        {pastJobs?.length >= 1 ? (
          <View>
            <MaskedTitle title='Previous Jobs' />

            {pastJobs.map((data, i) => (
              <RenderItem data={data} index={i} key={data.id} />
            ))}
          </View>
        ) : !currentJobs?.length >= 1 
        ?(
          <Text style={styles.noCurrent}>No previous jobs</Text>
        ): null
      }
      </ScrollView>
      <Navbar active='Dashboard' navigation={navigation} client />
    </View>
  )
}

const styles = StyleSheet.create({
  carousel: {
    flexGrow: 0,
    zIndex: 999,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  background: {
    height: 340,
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
    marginTop: 30,
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
    marginBottom: 20,
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
  textPadding: {
    left: 5,
  },
  colText: {
    fontSize: 13,
    fontFamily: 'PoppinsR',
    letterSpacing: 1,
    bottom: 10,
  },
  button: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  loading: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
})

export default ClientDashboard
