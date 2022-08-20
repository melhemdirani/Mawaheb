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
import ProposalFiltiring from '../components/ProposalFiltiring'

//client side

const JobListPage = ({ navigation, route }) => {
  let filterInitial = {
    category: "",
    title: "",
    search: "",
    sort:"",
  }
  const [filters, setFilters] = useState(filterInitial)
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [myJobs, setMyjobs] = useState([])
  const { user } = useSelector((state) => state.user)
  const { client } = useSelector((state) => state.client)
  const [shownApplicants, setShownApplicants] = useState(false)

  useEffect(() => {
    let newFilters = ""
    Object.keys(filters).map((keyName, i) =>{
      let value = filters[keyName]  === "All Cities" || filters[keyName] === "All Categories" ? "" : filters[keyName]
      newFilters= newFilters + `${keyName}=${value}&`
    })
    dispatch(getMyJobs({
      filters:newFilters, 
      id: user.clientId !== undefined ? user.clientId : client.id
    }))
    .unwrap()
    .then(res => {
      setMyjobs(res.myJobs)
      setLoaded(true)
    })
    .catch(err => console.log("error getting my job", err))
  }, [filters, showFilters])

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

  const navigate = (freelancer, job) => {
    navigation.navigate('freelancerDetails', {freelancer, job, invite: false })
  }
  const handleFilterChange = (name, value) => {
    setFilters( data => ({
      ...data,
      [name]: value
    }))
  }
  return loaded && (
    <View style={styles.wrapper}>
      <View style={styles.container} >
        <SecondaryHeader 
          title='Find the right talent.'
          onFilter={() => setShowFilters(!showFilters)}
          handleChange={handleFilterChange}
          search={false}
          filter 
         />

         { shownApplicants 
          ?<View>
            { showJobs && !showFilters?
              myJobs.map((item, i) => (
                  <RenderMyjobs
                    job={item}
                    navigate={navigate}
                    key={i}
                    setShownApplicants={setShownApplicants}
                    shownApplicants={shownApplicants}
                    showApplicantsTitle={showApplicantsTitle}
                    setShowApplicantsTitle={setShowApplicantsTitle}
                  />
                ))
                : showFilters 
                ? <ProposalFiltiring 
                    handleChange={handleFilterChange}
                    filters={filters}
                    onClick={() => setShowFilters(false)}
                  />
                : null
            }
          </View>
          :<ScrollView>
            { showJobs && !showFilters?
              myJobs.map((item, i) => (
                  <RenderMyjobs
                    job={item}
                    navigate={navigate}
                    key={i}
                    showApplicantsTitle={showApplicantsTitle}
                    shownApplicants={shownApplicants}
                    setShownApplicants={setShownApplicants}
                    setShowApplicantsTitle={setShowApplicantsTitle}
                  />
                ))
                : showFilters 
                ? <ProposalFiltiring 
                    handleChange={handleFilterChange}
                    filters={filters}
                    onClick={() => setShowFilters(false)}
                  />
                : null
            }
          </ScrollView>
         }

      
        
      </View>
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
