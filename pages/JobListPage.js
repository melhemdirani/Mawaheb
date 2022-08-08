import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  ScrollView,
} from 'react-native'
import React, { useEffect } from 'react'
import JobList from '../components/JobList'
import SecondaryHeader from '../components/SecondaryHeader'
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'
import arrowUpIcon from '../assets/images/arrowUpIcon.png'
import { jobs } from '../assets/data/jobs'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getApplicants, getMyJobs } from '../reduxToolkit/jobSlice'

const JobListPage = ({ navigation }) => {
  const dispatch = useDispatch()
  const [showApplicants, setShowApplicants] = React.useState(false)

  const { proposals, myJobs } = useSelector((state) => state.job)
  const { user } = useSelector((state) => state.user)
  const { client } = useSelector((state) => state.client)
  useEffect(() => {
    dispatch(getMyJobs(client?.id || user?.clientId))
    console.log('myjobs', proposals)
  }, [user])
  const getProposals = (id) => {
    console.log(id)

    dispatch(getApplicants(id))
    console.log('useEffect', proposals)
  }
  const navigate = (id) => {
    console.log('routing')
    navigation.navigate('freelancerDetails', { id })
  }

  const renderItem = (data) => {
    console.log(data.item, 'proposal')
    if (!data) {
      return <Text>No Jobs</Text>
    }
    return (
      <JobList
        {...data.item}
        navigate={navigate}
        style={styles.jobs}
      />
    )
  }
  const renderMyJobs = (data) => {
    console.log('myjobs', data.item)
    if (!data) {
      return <Text>Loading</Text>
    }
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <MaskedView
            maskElement={
              <Text style={[styles.text, { backgroundColor: 'transparent' }]}>
                {data.item.title} Applicants
              </Text>
            }
          >
            <LinearGradient
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={['#31BEBB', '#655BDA']}
            >
              <Text style={[styles.text, { opacity: 0 }]}>
                Job Title Applicants
              </Text>
            </LinearGradient>
          </MaskedView>
          <Pressable onPress={()=>setShowApplicants(!showApplicants)}>
            <Image source={arrowUpIcon} style={styles.arrowUp}></Image>
          </Pressable>
        </View>

       { showApplicants &&<FlatList
          data={data.item.proposals}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.jobs}
        />}
      </View>
    )
  }

  return (
    <View style={styles.wrapper}>
      <SecondaryHeader title='Find the right person' />
      <View style={styles.container}>
        <FlatList
          data={myJobs}
          renderItem={renderMyJobs}
          keyExtractor={(item) => item.id}
          style={styles.list}
        ></FlatList>

        <Navbar active='Jobs' client navigation={navigation} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 5,
  },
  title: {
    padding: 7,
    backgroundColor: '#E7F2F9',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 20,
  },
  jobs: {
  
  
  },
  text: {
    fontSize: 20,
    fontFamily: 'PoppinsS',
    justifyContent: 'center',
    paddingTop: 6,
  },
})

export default JobListPage
