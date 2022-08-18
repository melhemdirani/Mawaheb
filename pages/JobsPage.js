import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, RecyclerViewBackedScrollViewComponent, ActivityIndicator } from 'react-native'

import { getFreelancer } from '../reduxToolkit/freelancerSlice'

import SecondaryHeader from '../components/SecondaryHeader'
import Job from '../components/Job'
import Navbar from '../components/Navbar'
import { getAllJobs } from '../reduxToolkit/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import JobFiltering from '../components/JobFiltering'

//freelancer job page

const JobsPage = ({ navigation, route }) => {
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
  const { freelancer } = useSelector((store) => store.freelancer)
  const [jobs, setJobs] = useState([])
  const { user } = useSelector((store) => store.user)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState(filterInitial)
  const [showFilter, setShowFilter] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [page, setPage] = useState(1)
  const [numberOfPages, setNumberOfPages]= useState(-1)
  const [scrolled, setScrolled]= useState(false)

  const dispatch = useDispatch()

  useEffect(() => {

    if(freelancer === {} || freelancer === undefined || freelancer.id === undefined ){
      dispatch(getFreelancer(user.freelancerId))
      .unwrap()
      .then((response) => {
        setLoading(false)
        if(!showFilter){ 
          setLoading(true)
          let newFilters = ""
          Object.keys(filters).map((keyName, i) =>{
            let value = filters[keyName]  === "All Cities" || filters[keyName] === "All Categories" ? "" : filters[keyName]
            newFilters= newFilters + `${keyName}=${value}&`
          })
          dispatch(getAllJobs({
            filters:newFilters + `page=${page}`, 
            id: response.freelancer.id
          }))
          .unwrap()
          .then((response) => {
            setNumberOfPages(response.numOfPages)
            setJobs(response.jobs)
            setLoading(false)
          })
          .catch((error) => {
            console.log("error", error)
            setLoading(false)
          })
        }
      })
      .catch((error) => {
        setLoading(false)
      })
  } 
  else {
    if(!showFilter){ 
      setLoading(true)
      let newFilters = ""
      Object.keys(filters).map((keyName, i) =>{
        let value = filters[keyName]  === "All Cities" || filters[keyName] === "All Categories" ? "" : filters[keyName]
        newFilters= newFilters + `${keyName}=${value}&`
      })
      dispatch(getAllJobs({
        filters:newFilters + `page=${page}`, 
        id: freelancer.id
      }))
      .unwrap()
      .then((response) => {
        setNumberOfPages(response.numOfPages)
        setJobs(response.jobs)
        setLoading(false)
      })
      .catch((error) => {
        console.log("error", error)
        setLoading(false)
      })
    }

  }
  }, [route, filters])
  useEffect(() => {
    if(!showFilter && jobs.length &&  numberOfPages !== -1 && scrolled ){
      let newFilters = ""
      Object.keys(filters).map((keyName, i) =>{
        let value = filters[keyName]  === "All Cities" || filters[keyName] === "All Categories" ? "" : filters[keyName]
        newFilters= newFilters + `${keyName}=${value}&`
      })
      dispatch(getAllJobs(
       newFilters + `page=${page}`
      ))
      .unwrap()
      .then((response) => {
        setJobs(response.jobs)
        setLoading(false)
      })
      .catch((error) => {
        console.log("error", error.message)
      })
    }
  }, [page, scrolled])
 

  const navigate = (id, data) => {
    navigation.navigate('jobDescription', { id})
  }

  const renderItem = (data) => {
    return  <Job {...data.item} navigate={navigate} data={data}/>
  }
  let welcomeMessage = `Hi ${user?.name}`
  const handleFilterChange = (name, value) => {
    setFilters( data => ({
      ...data,
      [name]: value
    }))
  }
  const handlePageChange = () => {
    if(page < numberOfPages ){
      setScrolled(true)
      setPage(page + 1)
    }
  }

  return (
    <View style={styles.container}>
      <SecondaryHeader 
        title={welcomeMessage} 
        onFilter={() => setShowFilter(!showFilter)}
        handleChange={handleFilterChange}
        filter 
        showSearch={showSearch}
        search
        setShowSearch={setShowSearch}
      />
      {(jobs === undefined  || loading)
        ?<View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
          <ActivityIndicator size={"large"} color="#4E84D5"/>
        </View>
        : showFilter
        ? <JobFiltering 
            handleChange={handleFilterChange}
            filters={filters}
            onClick={() => setShowFilter(false)}
          />
        :<FlatList
          data={jobs.length ? jobs : { id: 0, title: 'No Jobs Found' }}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{marginTop: -20, zIndex: 9999}}
          style={styles.jobs}
          onEndReachedThreshold={.4}
          onEndReached={() => handlePageChange()}
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