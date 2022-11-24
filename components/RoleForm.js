import React, {useState} from 'react';
import { View, StyleSheet} from 'react-native';
import { RoleList, countryList } from '../assets/data/RolesList';

import Inputs from './Inputs';
import SelectInput from './SelectInput';
import TextArea from './TextArea';
import DateInputs from './DateInputs';

function RoleForm({handleChange, title, index, experience}) {
    return (
        <View style={styles.subContainer}>
            <Inputs  
                placeholder="Project Title*"
                onChange={(value) => handleChange('projectTitle', value, index, title)}
                value={experience.projectTitle}
            /> 
            <SelectInput 
                title="Location*" 
                placeholder="First Name" 
                onSelect={(value) => handleChange('location', value, index, title)}
                list={countryList}
                valued
                value={experience.location}
            /> 
            <TextArea  
                placeholder="Your key responsibilities" 
                onChange={(value) => handleChange('keyResponsibilities', value, index, title)}
                value={experience.keyResponsibilities}
                valued
            /> 
            <DateInputs 
                placeholder="Role Start Date*"
                onChange={(value) => handleChange('startDate', value, index, title)}
                valued
                value={experience.startDate}
            /> 
            <DateInputs 
                minimumDate={experience.startDate ? new Date(experience.startDate) : null}
                placeholder="Role End Date*"
                onChange={(value) => handleChange('endDate', value, index, title)}
                valued
                value={experience.endDate}
            />         
        </View>
    )
}

const styles = StyleSheet.create({
    subContainer:{
      paddingTop: 30,
      width: "100%",
      alignItems: "center"
    },
    subContainer2:{
      alignItems: "center",
      paddingTop: 25,
    },
    text:{
      textAlign: "center",
      lineHeight: 22,
      marginTop: 50,
      color: "rgba(0,0,0,0.6)"
    },
  })
export default RoleForm