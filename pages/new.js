import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Button , TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { RoleList } from '../assets/data/RolesList';


import { useDispatch } from 'react-redux';
import MaskedView from '@react-native-masked-view/masked-view';
import Header from '../components/Header';
import signUp from '../assets/images/experienceIcon.png';
import PrimaryButton from '../components/Buttons/PrimaryButton'
import AddRoleButton from '../components/Buttons/AddRoleButton';
import RoleForm from '../components/RoleForm';

import {
  addRoles,
  completedProfile
} from '../reduxToolkit/freelancerSlice'
import SelectInput from '../components/SelectInput';


const ExperiencePage = ({ navigation }) => {
  const form = {
    projectTitle: '',
    location: '',
    keyResponsibilities: '',
    dailyRate: '',
    startDate: '',
    endDate: '',
    isLatest: true,
    isMostNotable: false,
  }
  const form2 = {
    projectTitle: '',
    location: '',
    keyResponsibilities: '',
    dailyRate: '',
    startDate: '',
    endDate: '',
    isLatest: false,
    isMostNotable: true,
  }
  const form3 = {
    projectTitle: '',
    location: '',
    keyResponsibilities: '',
    dailyRate: '',
    startDate: '',
    endDate: '',
    isLatest: false,
    isMostNotable: false,
  }
  const [latestRole, setLatestRole] = useState(form)
  const [notableRole, setNotableRole] = useState(form2)
  const [additionalRoles, setAdditionalRoles] = useState([])
  const [addIndex, setAddIndex] = useState(1)
  const [experiences, setExperiences] = useState([{category: "", title:"" , latest:form, notable:form2}])
  let AllRoles = []


  const goBack = () => {
    console.log("go back")
    navigation.goBack()
  }
 
  const dispatch = useDispatch()
 
  const checkIfEmpty = (val) => {
    if(val === ''){
      return true
    } else return false
  }
  const checkRoleEmpty = (object) => {
    let {
      role, 
      projectTitle, 
      location, 
      keyResponsibilities, 
      dailyRate, 
      startDate, 
      endDate, 
      isLatest, 
      isMostNotable
    } = object
    if(
      checkIfEmpty(role) 
      || checkIfEmpty(projectTitle) 
      || checkIfEmpty(location) 
      || checkIfEmpty(keyResponsibilities) 
      || checkIfEmpty(dailyRate) 
      || checkIfEmpty(startDate) 
      || checkIfEmpty(endDate) 
      || checkIfEmpty(isLatest) 
      || checkIfEmpty(isMostNotable) 
    ) {
      return true
    } else return false
  }

  const handleChange = (name, value, index, title) => {
    
    setExperiences(data => {
      return [ 
        ...data.slice(0, index), 
        { 
          ...data[index], 
          [title] :{
            ...data[index][title],
            [name]: value 
          }
        
        },
          ...data.slice(index+1)
      ]
    });

  }
  const handleCategoryChange = (name, value, index) => {
    console.log({
      name:name,
      value:value,
      index: index
    })
    setExperiences(data => {
      return [ 
        ...data.slice(0, index), 
        { 
          ...data[index], 
          [name] :value
        
        },
          ...data.slice(index+1)
      ]
    });

  }

  
  useEffect(() => {
    console.log("experiences", experiences)
  }, [experiences])

  const onRoleDelete = (index) => {
    console.log("hi")
    setAdditionalRoles(additionalRoles => {
      return [ ...additionalRoles.slice(0, index),  ...additionalRoles.slice(index+1)]
    });
    setAddIndex(addIndex - 1)
  }

  const handleSubmit = () => {
    if(
      checkRoleEmpty(latestRole) || checkRoleEmpty(notableRole)
    ){
      console.log("latesst", latestRole)
      console.log("notable", notableRole)
      return(
         alert("Please fill in the above roles first")
      )
    } else{
      AllRoles.push(latestRole)
      AllRoles.push(notableRole)
      if(additionalRoles.length > 0){
        additionalRoles.map( roles => {
          if( checkRoleEmpty(roles) ){
            return(
              alert("Please fill in the above roles first")
            )
          } else{
            AllRoles.push(roles)
          }
        })
      }
      dispatch(addRoles(AllRoles));
      dispatch(completedProfile(true));
      navigation.navigate('language');
    }

    console.log("ALl Roles", AllRoles)
  }
  const languageNavigate = () => {
    navigation.navigate('language');

  }


  const MaskedTitle = ({title}) => {
      return(
          <MaskedView 
              style={styles.titleContainer}
              maskElement={ 
                  <Text 
                      style={[
                          styles.title, 
                          {backgroundColor: "transparent"}
                      ]}
                  >
                      {title}
                  </Text>
              }
          >
              <LinearGradient
                  start={{x:0, y: 0}}
                  end={{x:1, y: 1}}
                  colors={['#31BEBB', '#655BDA' ]}
              >
                  <Text style={[styles.title, {opacity: 0}]}>{title}</Text>
              </LinearGradient>
          </MaskedView>
      )
  }


  const onAddClick = () => {
    setAddIndex(addIndex + 1);
    setExperiences(
      data => ([
        ...data,
        {category: "", title:"" , latest:form, notable:form2}
      ])
    )
  }
  const [index, setIndex] = useState(0)

  const list = RoleList.map(role => role.category)
  return (
      <ScrollView style={styles.container}>
          <Header
              icon={signUp}
              title='Experience'
              // numOfPage={<Image source={trash}></Image>}
              numOfPage='4/6'
              hidden={false}
              goBack={goBack}
          />
          <Text style={styles.text}>
            Fill below your latest role and any projects you think would make stand out to potential recruiters.
          </Text>
          {
            experiences && experiences.map((role, i) =>
            <View style={{width: "100%"}} key={i}>
              <SelectInput 
                  title="Role Category*" 
                  list={list}
                  onSelect={(value) => handleCategoryChange('category', value, i)}
                  setIndex={setIndex}
                  role={true}
                  value={role.category}
                  valued
              /> 
              { role.category !== "" &&
                  <SelectInput 
                      title="Role Subcategory*" 
                      list={RoleList[index].subCategories}
                      onSelect={(value) => handleCategoryChange('title', value, i)}
                      value={role.title}
                      valued
                  /> 
              }
              <MaskedTitle title={ "Latest Role"}/>
              <RoleForm 
                handleChange={handleChange} 
                title={"latest"}  
                experience={role.latest} 
                index={i}
              />
              <MaskedTitle title={ "Projects that makes you stand out"}/>
              <RoleForm 
                handleChange={handleChange}
                title={"notable"}  
                experience={role.notable} 
                index={i}
              />

            </View>
          )}
          <Pressable  style={styles.buttons1} onPress={() => onAddClick()}>
            <AddRoleButton title="Add another role" />
          </Pressable>
          <LinearGradient
              start={{x:0, y: 0}}
              end={{x:1, y: 1}}
              colors={['#31BEBB', '#655BDA' ]}
              style={{height: 5, width: "100%", marginTop: 5}}
          />
          <TouchableOpacity  style={styles.buttons} onPress={() => handleSubmit()}>
            <PrimaryButton title="Next" />
          </TouchableOpacity>
          <Pressable onPress={() => languageNavigate()}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  buttons1:{
    alignSelf: "center",
    marginVertical: 25
  },  
  buttons:{
    alignSelf: "center",
    marginTop: 25
  },  
  subContainer:{
    alignItems: "center",
    paddingTop: 50,
  },
  subContainer2:{
    alignItems: "center",
    paddingTop: 25,

  },
  text:{
    textAlign: "center",
    lineHeight: 22,
    marginTop: 50,
    width: "80%",
    color: "rgba(0,0,0,0.6)",
    alignSelf: "center"
  },
  nextButton:{
    paddingVertical: 40
  },
  titleContainer:{
    alignSelf: "flex-start",
    left: 30,
    marginTop: 40
  },
  title:{
    fontSize: 20,
    fontFamily: 'PoppinsS'
  },
  skipText:{
    fontFamily: 'PoppinsS',
    alignSelf: "center",
    fontSize: 15,
    marginTop: 25,
    marginBottom: 80,
    letterSpacing: 2
  }
})


  
  export default ExperiencePage