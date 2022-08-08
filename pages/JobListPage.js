import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import JobList from '../components/JobList'
import SecondaryHeader from '../components/SecondaryHeader'
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'
import arrowUpIcon from '../assets/images/arrowUpIcon.png'
import { jobs } from '../assets/data/jobs'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getApplicants } from '../reduxToolkit/jobSlice'

const JobListPage = ({ navigation }) => {
  const dispatch = useDispatch()
  const { applicants } = useSelector((state) => state.job)
  useEffect(() => {
    dispatch(getApplicants())
  })

  const renderItem = (data) => {
    return <JobList {...data.item} navigate={detailsNavigate} />
  }

  return (
    <View style={styles.wrapper}>
      <SecondaryHeader title='Find the right person' />
      <View style={styles.container}>
        <View style={styles.title}>
          <MaskedView
            maskElement={
              <Text style={[styles.text, { backgroundColor: 'transparent' }]}>
                Job Title Applicants
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
          <Image source={arrowUpIcon} style={styles.arrowUp}></Image>
        </View>

        <FlatList
          data={jobs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          // contentContainerStyle={{paddingBottom: 200}}

          style={styles.jobs}
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
  },
  title: {
    padding: 7,
    backgroundColor: '#E7F2F9',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -15,
  },
  jobs: {
    padding: 7,
  },
  text: {
    fontSize: 20,
    fontFamily: 'PoppinsS',
    justifyContent: 'center',
    paddingTop: 6,
  },
})

export default JobListPage
