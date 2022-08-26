import React, {useState} from 'react';
import { View, StyleSheet,Pressable, KeyboardAvoidingView, ScrollView, Text} from 'react-native';

import { RoleList2, listofCities2 } from '../assets/data/RolesList';

import Inputs from './Inputs';
import SelectInput from './SelectInput';
import TextArea from './TextArea';
import DateInputs from './DateInputs';
import PrimaryButton from './Buttons/PrimaryButton';

function JobFiltering({handleChange, filters, onClick, category, selectedCategory, freelancerCategories}) {
 
    const sortList = [
      {
        value: "",
        display: "Sort any"
      },
      {
        value: "latest",
        display: "Sort by latest"
      },
      {
        value: "oldest",
        display: "Sort by oldest"
      },
      {
        value: "lowest",
        display: "Sort by budget ascending"
      },
      {
        value: "highest",
        display: "Sort by budget descending"
      },
      {
        value: "mostExperience",
        display: "Sort by experience descending"
      },
      {
        value: "leastExperience",
        display: "Sort by experience ascending"
      },
    ]
    const sortList2 = {
      "Sort any": "",
      "Sort by latest": "latest",
      "Sort by oldest": "oldest",
      "Sort by budget ascending": "lowest",
      "Sort by budget descending": "highest",
      "Sort by experience descending": "mostExperience",
      "Sort by experience ascending": "leastExperience",
    }
    const sortList3 = {
      "": "Sort any",
      latest: "Sort by latest",
      oldest: "Sort by oldest",
      lowest: "Sort by budget ascending",
      highest: "Sort by budget descending",
      mostExperience: "Sort by experience descending",
      leastExperience: "Sort by experience ascending"
    }
    const [index, setIndex] = useState(0)
    const list = RoleList2.map(role => role.category)
    const newSortList = sortList.map(item => item.display)
    let newListofCites = listofCities2

    const checkCategory = () => {
      let available = false
      freelancerCategories.map(cat => {
        if (cat === selectedCategory){
          available = true
        }
      })
      return available
    }
    return (
        <ScrollView contentContainerStyle={styles.subContainer}>
            <View style={{width: "100%", alignItems: "center"}}>
                <SelectInput    
                    title="Filter by location" 
                    placeholder="First Name" 
                    onSelect={(value) => handleChange('location', value)}
                    list={listofCities2}
                    valued
                    value={filters.location}
                /> 
                  <SelectInput 
                      title="Filter by category" 
                      list={list}
                      onSelect={(value) => handleChange('category', value)}
                      setIndex={setIndex}
                      role={true}
                      value={filters.category}
                      valued
                  /> 
                  {/* {
                    !checkCategory() && 
                    <Text style={styles.warning}>
                      You can only apply to categories related to your experience
                    </Text>
                  } */}
                { filters.category !== "" && filters.category !== "All Categories" &&
                  <View style={{width: "100%", alignItems: "center"}}>
                    <SelectInput 
                        title="Filter by subcategory" 
                        list={RoleList2[index].subCategories}
                        onSelect={(value) => handleChange('title', value)}
                        value={filters.title}
                        valued
                    /> 
                  </View>
                }
                <Inputs
                  placeholder='Minimum budget'
                  onChange={(value) => handleChange('minBudget', value)}
                  numeric
                  value={filters.minBudget.toString()}
                />
                <Inputs
                  placeholder='Maximum budget'
                  onChange={(value) => handleChange('maxBudget',value)}
                  numeric
                  value={filters.maxBudget.toString()}

                />
                  <SelectInput 
                      title="Sort by" 
                      list={newSortList}
                      onSelect={(value) => handleChange('sort', sortList2[value])}
                      value={sortList3[filters.sort]}
                      valued
                  /> 
            </View>
            <KeyboardAvoidingView  behavior='position'>
                <Pressable onPress={() => onClick()}>
                  <PrimaryButton title={"Filter Jobs"} />
                </Pressable>
            </KeyboardAvoidingView>
                
              <View />
        </ScrollView>
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
    warning:{
      alignSelf: "flex-end",
      marginTop: -10,
      marginBottom: 10,
      right: 30,
      color: "#BE3142",
      fontSize: 10
    }
  })
export default JobFiltering