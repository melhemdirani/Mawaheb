import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, RecyclerViewBackedScrollViewComponent, ActivityIndicator } from 'react-native'

import { addJobToFavorites, getFreelancer, removeFav } from '../reduxToolkit/freelancerSlice'

import SecondaryHeader from '../components/SecondaryHeader'
import Job from '../components/Job'
import Navbar from '../components/Navbar'
import { getAllJobs } from '../reduxToolkit/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import JobFiltering from '../components/JobFiltering'
import { useIsFocused } from "@react-navigation/native"

//freelancer job page

const JobsPage = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  let filterInitial = {
    location: "",
    duration: "",
    budget: "",
    category: "unfiltered",
    title: "",
    yearsOfExperience: "",
    minBudget: "",
    maxBudget: "",
    search: "",
    sort:""
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
  const [handledCategory, setHandledCategory] = useState(false)
  const [freelancerCategories, setFreelancerCategores] = useState([])
  const dispatch = useDispatch()
  const handleFilterChange = (name, value) => {
    setFilters( data => ({
      ...data,
      [name]: value
    }))
    // setPage(1)
  }

  useEffect(() => {
    console.log("filters", filters)
  }, [filters])

  // const categories = (roles) => {
  //   let array = []
  //   roles.map(role => 
  //     array.push(role.category)
  //   )
  //   let uniqueIds = []
  //   const newLanguages = array.filter(element => {
  //     const isDuplicate = uniqueIds.includes(element);
  
  //     if (!isDuplicate) {
  //       uniqueIds.push(element);
  
  //       return true;
  //     }
  
  //     return false;
  //   });
  //   setFreelancerCategores(uniqueIds)
  //   return
  // }

 
  useEffect(() => {
    if(freelancer === {} || freelancer === undefined || freelancer.id === undefined ){
      setPage(1)
      dispatch(getFreelancer(user.freelancerId))
      .unwrap()
      .then((response) => {
        alert("getting")
        // categories(response.roles)
        if(filters.category === "unfiltered" && !handledCategory && response.freelancer){
          setFilters( data => ({
            ...data,
            category:   response.roles !== undefined ?  response.roles[0].category : ""
          }))
          setHandledCategory(true)
        } // needs testing
      })
      .catch((error) => {
        setLoading(false)
      })
    } else if(filters.category === "unfiltered" && !handledCategory){
      setFilters( data => ({
        ...data,
        category: freelancer.roles !== undefined  && freelancer.roles.length ?  freelancer.roles[0].category : "",
        title: freelancer.roles !== undefined  && freelancer.roles.length ?  freelancer.roles[0].title : ""
      }))
    }
  }, [route])

  useEffect(() => {
    // categories(freelancer.roles)

    if(!showFilter && filters.category !== "unfiltered"){ 
      setPage(1)
      setLoading(true)
      let newFilters = ""
      Object.keys(filters).map((keyName, i) =>{
        let value = (filters[keyName]  === "All Cities" || filters[keyName] === "All Categories") ? "" : filters[keyName]
        if(filters["category"] === "All Categories"){
          if( keyName === "title"){
            console.log("keyname", keyName)
            console.log("VALUE", value)
            value = ""
          }
        }
        newFilters= newFilters + `${keyName}=${value}&`
      })
      console.log("new filters", newFilters)
      dispatch(getAllJobs({
        filters:newFilters + `page=${1}`, 
        id: freelancer.id
      }))
      .unwrap()
      .then((response) => {
        console.log("response freelancer length b", response)
        setNumberOfPages(response.numOfPages)
        setJobs(response.jobs)
        setLoading(false)
      })
      .catch((error) => {
        console.log("error", error)
        setLoading(false)
      })
    }
  }, [isFocused, filters, showFilter, filters.category])
  useEffect(() => {
    if(!showFilter && jobs.length && scrolled  && filters.category !== "unfiltered"){
      console.log("starting update")
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
        console.log("response2 length", response.length )
        console.log("page", page)
        setJobs(data => ([
          ...data,
          ...response.jobs
        ]))
        setLoading(false)
      })
      .catch((error) => {
        console.log("error", error.message)
        setLoading(false)
      })
    }
  }, [page, scrolled, filters.category])
 

  const navigate = (id, client) => {
    navigation.navigate('jobDescription', { id, client})
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
    return  <Job {...data.item} navigate={navigate} data={data} likeJob={likeJob} unLikeJob={unLikeJob} like/>
  }
  let welcomeMessage = `Hi ${user?.name}`

  
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
     { loading 
      ? <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
        <ActivityIndicator size={"large"} color="#4E84D5"/>
      </View>
      :<>

          {(jobs === undefined  || loading)
            ?<View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
              <ActivityIndicator size={"large"} color="#4E84D5"/>
            </View>
            : showFilter
            ? <JobFiltering 
                handleChange={handleFilterChange}
                freelancerCategories={freelancerCategories}
                filters={filters}
                onClick={() => setShowFilter(false)}
                category={freelancer.roles?.length ? freelancer.roles[0].category : ""}
                selectedCategory={filters.category}
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
        </>
      }

      <Navbar active='Jobs' navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: "space-between"
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