import React, {useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

import Inputs from './Inputs';
import SelectInput from './SelectInput';
import TextArea from './TextArea';
import DurationInputs from './DurationInputs';
import DailyRate from './DailyRate';
import DateInputs from './DateInputs';
import DeleteButton from './Buttons/DeleteButton';

function RoleForm({handleChange, title, additional, onRoleDelete, role}) {


    return (
        <View style={styles.subContainer}>
            <SelectInput 
                title="Role*" 
                placeholder="First Name" 
                list={["Camera man", "option2", "option3"]}
                onSelect={(value) => handleChange('role', value, title)}
            /> 
            <Inputs  
                placeholder="Project Title*"
                onChange={(value) => handleChange('projectTitle', value, title)}
            /> 
            <SelectInput 
                title="Location*" 
                placeholder="First Name" 
                onSelect={(value) => handleChange('location', value, title)}
                list={["Camera man", "option2", "option3"]}
            /> 
            <TextArea  
                placeholder="Key Responsibilities" 
                onChange={(value) => handleChange('keyResponsibilities', value, title)}
            /> 
            <DailyRate  
                placeholder="Your daily rate*"
                onChange={(value) => handleChange('dailyRate', parseInt(value), title)}
            />
            <DateInputs 
                placeholder="Role Start Date*"
                onChange={(value) => handleChange('startDate', value, title)}
            /> 
            <DateInputs 
                placeholder="Role End Date*"
                onChange={(value) => handleChange('endDate', value, title)}
            /> 

            {
                additional && 
                <TouchableOpacity style={styles.DeleteButton} onPress={() => onRoleDelete(title)}>
                    <DeleteButton title={"Delete Role"}/>
                </TouchableOpacity>
            }

            <LinearGradient
                start={{x:0, y: 0}}
                end={{x:1, y: 1}}
                colors={['#31BEBB', '#655BDA' ]}
                style={{height: 5, width: "100%", marginTop: 5}}
            />          
        </View>
    )
}

const styles = StyleSheet.create({
    subContainer:{
      alignItems: "center",
      paddingTop: 30,
    },
    DeleteButton:{
        marginVertical: 40
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