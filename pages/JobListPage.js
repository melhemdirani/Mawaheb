import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import JobList from '../components/JobList'
import SecondaryHeader from '../components/SecondaryHeader'
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'
import arrowUpIcon from '../assets/images/arrowUpIcon.png'
import Navbar from '../components/Navbar'

import { getAllFreelancers } from '../reduxToolkit/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getApplicants, getMyJobs } from '../reduxToolkit/jobSlice'
import RenderMyjobs from '../components/RenderMyjobs'
import JobList2 from '../components/JobList2'
import RenderFreelancers from '../components/RenderFreelancers'

//client side

const JobListPage = ({ navigation, route }) => {
  let filterInitial = {
    location: "",
    duration: "",
    budget: "",
    category: "",
    title: "",
    yearsOfExperience: "",
    minBudget: "",
    maxBudget: "",
    search: "",
  }
  const [filters, setFilters] = useState(filterInitial)
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  const { myJobs } = useSelector(
    (state) => state.job
  )
  const { user } = useSelector((state) => state.user)
  const { client } = useSelector((state) => state.client)
  useEffect(() => {
    dispatch(getMyJobs(client?.id || user?.clientId))
    .unwrap()
    .then(
      res => console.log("res get my jobs", res)
    )
    .catch(err => console.log("error getting my job", error))
  }, [])

  useEffect(() => {
    if(route.params !== undefined && route.params.id !== undefined){
      console.log("route id", route.params.id)
      setShowApplicantsTitle(route.params.id)
    } else{ 
      console.log("no id", route.params)
    }
  }, [route])

  const [showApplicantsTitle, setShowApplicantsTitle] = useState('all')
  const [showJobs, setShowJobs] = useState(true)

  const navigate = (freelancer, jobId) => {
    navigation.navigate('freelancerDetails', {freelancer, jobId })
  }
  const handleFilterChange = (name, value) => {
    setFilters( data => ({
      ...data,
      [name]: value
    }))
  }
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} >
        <SecondaryHeader title='Find the right talent.' />
        {showJobs && myJobs.map((item, i) => (
            <RenderMyjobs
              data={item}
              navigate={navigate}
              key={i}
              showApplicantsTitle={showApplicantsTitle}
              setShowApplicantsTitle={setShowApplicantsTitle}
            />
          ))}
        {/* {showFreelancers && 
          <RenderFreelancers
            freelancers={freelancers}
            navigate={navigate}
            loaded={loaded}
            showFreelancers={showFreelancers}
            setShowFreelancers={setShowFreelancers}
            setShowJobs={setShowJobs}
          />
        } */}
        
      </ScrollView>
      <Navbar active='Jobs' client navigation={navigation} />
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
  jobs: {},
  text: {
    fontSize: 20,
    fontFamily: 'PoppinsS',
    justifyContent: 'center',
    paddingTop: 6,
  },
})

export default JobListPage
