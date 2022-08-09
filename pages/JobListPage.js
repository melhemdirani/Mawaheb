import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import JobList from '../components/JobList';
import SecondaryHeader from '../components/SecondaryHeader';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import arrowUpIcon from '../assets/images/arrowUpIcon.png';
import Navbar from '../components/Navbar';

import { getAllFreelancers } from '../reduxToolkit/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getApplicants, getMyJobs } from '../reduxToolkit/jobSlice';
import RenderMyjobs from '../components/RenderMyjobs';
import JobList2 from '../components/JobList2';
import RenderFreelancers from '../components/RenderFreelancers';

const JobListPage = ({ navigation }) => {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)

  const { proposals, myJobs, freelancers, isLoadingFreelancers } = useSelector((state) => state.job)
  const { user } = useSelector((state) => state.user)
  const { client } = useSelector((state) => state.client)
  useEffect(() => {
    dispatch(getMyJobs(client?.id || user?.clientId))
  }, [user])
  useEffect(() => {
    dispatch(getAllFreelancers())
    setLoaded(true)
  },[])


  const navigate = (id,price ,location,jobId) => {
    navigation.navigate('freelancerDetails', { id ,price,location ,jobId} )
  }
  return (
    <View style={styles.wrapper}>
      <SecondaryHeader title='Find the right person' />
      <View style={styles.container}>
        {
          myJobs && myJobs.map((item, i) => 
            <RenderMyjobs data={item} navigate={navigate} key={i}/>
          )
        }
      <RenderFreelancers 
        freelancers={freelancers} 
        navigate={navigate} 
        loaded={loaded} 
      />
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
