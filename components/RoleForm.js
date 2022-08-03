import React, {useState} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

import Inputs from './Inputs';
import SelectInput from './SelectInput';
import TextArea from './TextArea';
import DurationInputs from './DurationInputs';
import DailyRate from './DailyRate';

function RoleForm() {

    const [form, setForm] = useState({})


    const onRoleSelect = (item) => {
        setForm(
            form => ({
                ...form,
                role: item
            })
        )
    }
    const onLocationSelect = (item) => {
        setForm(
            form => ({
                ...form,
                location: item
            })
        )
    }
    
    const onProjectChange = (item) => {
        setForm(
            form => ({
                ...form,
                title: item
            })
        )
    }
    const onResChange = (item) => {
        setForm(
            form => ({
                ...form,
                responsibilities: item
            })
        )
    }

    return (
        <View style={styles.subContainer}>
            <SelectInput 
                title="Role*" 
                placeholder="First Name" 
                list={["Camera man", "option2", "option3"]}
                onSelect={onRoleSelect}
            /> 
            <Inputs  placeholder="Project Title*" onChange={onProjectChange}/> 
            <SelectInput 
                title="Location*" 
                placeholder="First Name" 
                onSelect={onLocationSelect}
                list={["Camera man", "option2", "option3"]}
            /> 
            <TextArea  placeholder="Key Responsibilities" onChange={onResChange}/> 
            <Inputs  placeholder="Passport Number*"/>
            <DurationInputs placeholder="Role Duration*"/> 
            <DailyRate placeholder="Your daily rate*"/>
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