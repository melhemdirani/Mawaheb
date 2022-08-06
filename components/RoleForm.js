import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view'

import Inputs from './Inputs'
import SelectInput from './SelectInput'
import TextArea from './TextArea'
import DurationInputs from './DurationInputs'
import DailyRate from './DailyRate'
import {
  updateLatestRole,
  updateNotableRole,
} from '../reduxToolkit/freelancerSlice'
import { useDispatch } from 'react-redux'

function RoleForm({ title, submit }) {
  const dispatch = useDispatch()
  const isLatestState = {
    role: '',
    projectTitle: '',
    location: '',
    keyResponsibilities: '',
    dailyRate: '',
    startDate: 'sd',
    endDate: 'sdsd',
    isLatest: true,
    isMostNotable: false,
  }
  const isNotableState = {
    role: '',
    projectTitle: '',
    location: '',
    keyResponsibilities: '',
    dailyRate: 0,
    startDate: 'sd',
    endDate: 'sdsd',
    isLatest: false,
    isMostNotable: true,
  }
  const [latestRole, setLatestRole] = useState(isLatestState)
  const [notableRole, setNotableRole] = useState(isNotableState)

  const handleChange = (name, value) => {
    if (title === 'latest') {
      setLatestRole({ ...latestRole, [name]: value })
      dispatch(updateLatestRole(latestRole))
    } else if (title === 'notable') {
      setNotableRole({ ...notableRole, [name]: value })
      dispatch(updateNotableRole(notableRole))
    }
  }

  return (
    <View style={styles.subContainer}>
      <SelectInput
        title='Role*'
        placeholder='First Name'
        list={['Camera man', 'option2', 'option3']}
        onSelect={(value) => handleChange('role', value)}
      />
      <Inputs
        placeholder='Project Title*'
        onChange={(value) => handleChange('projectTitle', value)}
      />
      <SelectInput
        title='Location*'
        placeholder='First Name'
        list={['Camera man', 'option2', 'option3']}
        onSelect={(value) => handleChange('location', value)}
      />
      <TextArea
        placeholder='Key Responsibilities'
        onChangeText={(value) => handleChange('keyResponsibilities', value)}
      />
      {/* <Inputs placeholder='Passport Number*' /> */}
      {/* <DurationInputs
        placeholder='Role Duration*'
        onChangeText={(value) => handleChange('duration', value)}
      /> */}
      <DailyRate
        placeholder='Your daily rate*'
        onChangeText={(value) => handleChange('dailyRate', parseInt(value))}
      />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['#31BEBB', '#655BDA']}
        style={{ height: 5, width: '100%', marginTop: 5 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  subContainer: {
    alignItems: 'center',
    paddingTop: 30,
  },
  subContainer2: {
    alignItems: 'center',
    paddingTop: 25,
  },
  text: {
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 50,
    color: 'rgba(0,0,0,0.6)',
  },
})
export default RoleForm
