import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, RecyclerViewBackedScrollViewComponent, ActivityIndicator } from 'react-native'

import { getFreelancer } from '../reduxToolkit/freelancerSlice'

import SecondaryHeader from '../components/SecondaryHeader'
import Job from '../components/Job'
import Navbar from '../components/Navbar'
import { getAllJobs } from '../reduxToolkit/jobSlice'
import { useDispatch, useSelector } from 'react-redux'

const JobsPage = ({ navigation, route }) => {
   
  const { jobs } = useSelector((store) => store.job)
  const { freelancer } = useSelector((store) => store.freelancer)
  const { user } = useSelector((store) => store.user)
  const [loading, setLoading] = useState(false)


  const dispatch = useDispatch()
  useEffect(() => {
    setLoading(true)
    dispatch(getAllJobs(user.freelancerId))
    .unwrap()
    .then((response) => {
      console.log("response registiring", response)
      dispatch(getFreelancer(user.freelancerId))
      .unwrap()
      .then(() => {
        setLoading(false)
      })
      .catch((error) => {
        console.log("error", error.message)
        setLoading(false)
      })
    })
    .catch((error) => {
      console.log("error", error.message)
      setLoading(false)
    })
  }, [route])

  

  const navigate = (id) => {
    navigation.navigate('jobDescription', { id})
  }

  const renderItem = (data) => {
    return <Job {...data.item} navigate={navigate} />
  }
  let welcomeMessage = `Hi ${user?.name}`
  return (
    <View style={styles.container}>
      <SecondaryHeader title={welcomeMessage}></SecondaryHeader>
      {(jobs === undefined  || loading)
        ?<View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
          <ActivityIndicator size={"large"} color="#4E84D5"/>
        </View>
      :<FlatList
        data={jobs.length ? jobs : { id: 0, title: 'No Jobs Found' }}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        // contentContainerStyle={{paddingBottom: 200}}
        style={styles.jobs}
      />
    }
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