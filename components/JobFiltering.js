import React, {useState} from 'react';
import { View, StyleSheet,Pressable} from 'react-native';

import { RoleList2, listofCities2 } from '../assets/data/RolesList';

import Inputs from './Inputs';
import SelectInput from './SelectInput';
import TextArea from './TextArea';
import DateInputs from './DateInputs';
import PrimaryButton from './Buttons/PrimaryButton';

function JobFiltering({handleChange, filters, onClick}) {
   
    const [index, setIndex] = useState(0)
    const list = RoleList2.map(role => role.category)
    let newListofCites = listofCities2
    return (
        <View style={styles.subContainer}>
            <View style={{width: "100%", alignItems: "center"}}>
                <SelectInput    
                    title="Filter by location*" 
                    placeholder="First Name" 
                    onSelect={(value) => handleChange('location', value)}
                    list={listofCities2}
                    valued
                    value={filters.location}
                /> 
                    <SelectInput 
                        title="Filter by category*" 
                        list={list}
                        onSelect={(value) => handleChange('category', value)}
                        setIndex={setIndex}
                        role={true}
                        value={filters.category}
                        valued
                    /> 
                { filters.category !== "" && filters.category !== "All Categories" &&
                    <SelectInput 
                        title="Filter by subcategory*" 
                        list={RoleList2[index].subCategories}
                        onSelect={(value) => handleChange('title', value)}
                        value={filters.title}
                        valued
                    /> 
                }
                <Inputs
                  placeholder='Minimum budget'
                  onChange={(value) => handleChange('budget', parseInt(value))}
                  numeric
                />
                <Inputs
                  placeholder='Maximum budget'
                  onChange={(value) => handleChange('budget', parseInt(value))}
                  numeric
                />
            </View>
                <Pressable onPress={() => onClick()}>
                    <PrimaryButton title={"Filter Jobs"} />
                </Pressable>
              <View />
        </View>
    )
}

const styles = StyleSheet.create({
    subContainer:{
      paddingTop: 30,
      width: "100%",
      alignItems: "center",
      flex: 1,
      justifyContent: "space-between"
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
export default JobFiltering