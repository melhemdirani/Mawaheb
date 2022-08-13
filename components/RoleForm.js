import React, {useState} from 'react';
import { View, StyleSheet, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { RoleList, listofCities } from '../assets/data/RolesList';

import Inputs from './Inputs';
import SelectInput from './SelectInput';
import TextArea from './TextArea';
import DurationInputs from './DurationInputs';
import DailyRate from './DailyRate';
import DateInputs from './DateInputs';
import DeleteButton from './Buttons/DeleteButton';

function RoleForm({handleChange, title, additional, onRoleDelete, role, experience}) {
    const [index, setIndex] = useState(0)
    const [showSub, setShowSub] = useState(false)
    const onRoleSelect = (value) => {
       handleChange('category', value, title)
       setShowSub(true)
    }
    const list = RoleList.map(role => role.category)
    console.log("experience", experience)
    return (
        <View style={styles.subContainer}>
            <SelectInput 
                title="Role Category*" 
                list={list}
                onSelect={(value) => onRoleSelect(value)}
                setIndex={setIndex}
                role={true}
                value={experience.category}
                valued
            /> 
           { showSub &&
                <SelectInput 
                    title="Role Subcategory*" 
                    list={RoleList[index].subCategories}
                    onSelect={(value) => handleChange('role', value, title)}
                    value={experience.role}
                    valued
                 /> 
            }
            <Inputs  
                placeholder="Project Title*"
                onChange={(value) => handleChange('projectTitle', value, title)}
                value={experience.projecTitle}
            /> 
            <SelectInput 
                title="Location*" 
                placeholder="First Name" 
                onSelect={(value) => handleChange('location', value, title)}
                list={listofCities}
                valued
                value={experience.location}
            /> 
            <TextArea  
                placeholder="Your key responsibilities" 
                onChange={(value) => handleChange('keyResponsibilities', value, title)}
                value={experience.keyResponsibilities}
            /> 
            <DailyRate  
                placeholder="Your daily wages*"
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