import React, { useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

import SecondaryHeader from '../components/SecondaryHeader'
import Job from '../components/Job'
import Navbar from '../components/Navbar'
import { getAllJobs } from '../reduxToolkit/jobSlice'
import { useDispatch, useSelector } from 'react-redux'

const JobsPage = ({ navigation }) => {
  
  const { jobs } = useSelector((store) => store.job)
  const { user } = useSelector((store) => store.user)

  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(getAllJobs(user.freelancerId))
  }, [])

  
  const navigate = (id) => {
    console.log('routing')
    navigation.navigate('jobDescription', { id })
  }

  const renderItem = (data) => {
    return <Job {...data.item} navigate={navigate} />
  }
  let welcomeMessage = `Hi ${user?.name}`
  return jobs !== undefined &&(
    <View style={styles.container}>
      <SecondaryHeader title={welcomeMessage}></SecondaryHeader>

      <FlatList
        data={jobs.length ? jobs : { id: 0, title: 'No Jobs Found' }}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        // contentContainerStyle={{paddingBottom: 200}}
        style={styles.jobs}
      />

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