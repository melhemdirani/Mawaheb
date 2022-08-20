import React, {useState} from 'react';
import { View, StyleSheet,Pressable, KeyboardAvoidingView, ScrollView} from 'react-native';

import { RoleList2, listofCities2 } from '../assets/data/RolesList';

import Inputs from './Inputs';
import SelectInput from './SelectInput';
import TextArea from './TextArea';
import DateInputs from './DateInputs';
import PrimaryButton from './Buttons/PrimaryButton';

function ProposalFiltiring({handleChange, filters, onClick}) {
    
    const sortList = [
      {
        value: "",
        display: "Sort Any"
      },
      {
        value: "latest",
        display: "Sort by latest"
      },
      {
        value: "oldest",
        display: "Sort by oldest"
      },
      // {
      //   value: "cheapest",
      //   display: "Sort by price ascending"
      // },
      // {
      //   value: "expensive",
      //   display: "Sort by price descending"
      // },
      // {
      //   value: "mostExperience",
      //   display: "Sort by experience descending"
      // },
      // {
      //   value: "leastExperience",
      //   display: "Sort by experience ascending"
      // },
    ]
    const sortList2 = {
      "Sort by latest": "latest",
      "Sort by oldest": "oldest",
      // "Sort by price ascending": "cheapest",
      // "Sort by price descending": "expensive",
      // "Sort by experience descending": "mostExperience",
      // "Sort by experience ascending": "leastExperience",
      "Sort any": "leastExperience",
    }
    const sortList3 = {
      "": "Sort any",
      latest: "Sort by latest",
      oldest: "Sort by oldest",
      // cheapest: "Sort by price ascending",
      // expensive: "Sort by price descending",
      // mostExperience: "Sort by experience descending",
      // leastExperience: "Sort by experience ascending"
    }
    const [index, setIndex] = useState(0)
    const list = RoleList2.map(role => role.category)
    const newSortList = sortList.map(item => item.display)
    let newListofCites = listofCities2
    return (
        <ScrollView contentContainerStyle={styles.subContainer}>
            <View style={{width: "100%", alignItems: "center"}}>
                  <SelectInput 
                      title="Filter by category" 
                      list={list}
                      onSelect={(value) => handleChange('category', value)}
                      setIndex={setIndex}
                      role={true}
                      value={filters.category}
                      valued
                  /> 
                { filters.category !== "" && filters.category !== "All Categories" &&
                    <SelectInput 
                        title="Filter by subcategory" 
                        list={RoleList2[index].subCategories}
                        onSelect={(value) => handleChange('title', value)}
                        value={filters.title}
                        valued
                    /> 
                }
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
  })
export default ProposalFiltiring