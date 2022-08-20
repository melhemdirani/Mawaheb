import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Button , TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { RoleList } from '../assets/data/RolesList';


import { useDispatch, useSelector } from 'react-redux';
import MaskedView from '@react-native-masked-view/masked-view';
import Header from '../components/Header';
import signUp from '../assets/images/experienceIcon.png';
import PrimaryButton from '../components/Buttons/PrimaryButton'
import AddRoleButton from '../components/Buttons/AddRoleButton';
import RoleForm from '../components/RoleForm';

import {
  addRoles,
  completedProfile,
  deleteFreelancerRole
} from '../reduxToolkit/freelancerSlice'
import SelectInput from '../components/SelectInput';
import DeleteButton from '../components/Buttons/DeleteButton';
import DailyRate from '../components/DailyRate';
import Inputs from '../components/Inputs';


const ExperiencePage = ({ navigation, route }) => {
  const {update} = route.params
  const {
    freelancer,
  } = useSelector((store) => store.freelancer)
  const form = {
    category:'',
    title:'',
    projectTitle: '',
    location: '',
    keyResponsibilities: '',
    dailyRate: '',
    startDate: "",
    endDate: "",
    isLatest: true,
    isMostNotable: false,
    dailyRate: '',
    yearsOfExperience: ""
  }
  const form2 = {
    category:'',
    title:'',
    projectTitle: '',
    location: '',
    keyResponsibilities: '',
    dailyRate: '',
    startDate: "",
    endDate: "",
    isLatest: false,
    dailyRate:'',
    isMostNotable: true,
    yearsOfExperience: ""
  }

  let newExperience = freelancer.roles !== undefined ?  freelancer.roles.map((n, i, arr) => (
    { category: n.category,  
      title: n.title,
      dailyRate: n.dailyRate,
      latest: n, 
      yearsOfExperience: n.yearsOfExperience,
      notable: arr[i + 1] 
    }))
    .filter((n, i) => i % 2 === 0)
    : null

  const [experiences, setExperiences] = useState(
    update && freelancer.roles !== undefined && freelancer.roles.length > 0
    ? newExperience
    : [{
      category: "", 
      title:"" , 
      dailyRate: "", 
      yearsOfExperience: "", 
      latest:form, 
      notable:form2
    }]
  )

  let AllRoles = []

  const goBack = () => {
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
      title, 
      category, 
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
      checkIfEmpty(title) 
      || checkIfEmpty(projectTitle) 
      || checkIfEmpty(category) 
      || checkIfEmpty(location) 
      || checkIfEmpty(keyResponsibilities) 
      || checkIfEmpty(dailyRate)
      || dailyRate === NaN
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
    setExperiences(data => {
      return [ 
        ...data.slice(0, index), 
        { 
          ...data[index], 
          latest :{
            ...data[index].latest,
            [name]: value 
          },
          notable :{
            ...data[index].notable,
            [name]: value 
          },
          [name] :value,
        },
          ...data.slice(index+1)
      ]
    });

  }
  
  const onRoleDelete = (index) => {
    if(update && experiences[index].latest.id !== undefined){
   
      dispatch(
        deleteFreelancerRole(experiences[index].notable.id)
      ).then(res => console.log("response deleteing lanugage", res))
      .catch(err => console.log(err))
      dispatch(
        deleteFreelancerRole(experiences[index].latest.id)
      ).then(res => console.log("response deleteing lanugage", res))
      .catch(err => console.log(err))
    }
    setExperiences(data => {
      return [ ...data.slice(0, index),  ...data.slice(index+1)]
    });
  }
  const languageNavigate = () => {
    navigation.navigate('language', {update: update});

  }
  const handleSubmit = () => {
    let submit = true
    experiences.map( exp => {
      if(checkRoleEmpty(exp.latest) || checkRoleEmpty(exp.notable)  ){
        submit = false
        return alert("Please enter all values before proceeding")
      }
      if(isNaN(exp.dailyRate)){
        submit = false
        return alert("Improper value for your preferred daily wage")
      }
      const allowed = [
        'id', 
        'category', 
        'title', 
        'projectTitle', 
        'location', 
        'keyResponsibilities',
        'dailyRate',
        'startDate',
        'endDate',
        'isLatest',
        'dailyRate',
        'isMostNotable',
        'yearsOfExperience',
      ];

      const filtered = (raw) => Object.keys(raw)
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = raw[key];
        return obj;
      }, {})
      ;
        AllRoles.push(filtered(exp.latest))
        AllRoles.push(filtered(exp.notable))
        console.log("all roles", AllRoles)
     
    })
    if(submit){
      console.log("all rolesss", AllRoles)
      dispatch( addRoles(AllRoles) )
      dispatch(completedProfile(true))
      languageNavigate()
    }
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
    setExperiences(
      data => ([
        ...data,
        {category: "", title:"" ,dailyRate: "", yearsOfExperience:" ", latest:form, notable:form2}
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
            <View style={{width: "100%", alignItems: "center"}} key={i}>
              <View style={{width: "100%", alignItems: "center", marginTop: 50}}>
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
              <DailyRate  
                placeholder="Your preferred daily wage*"
                onChange={(value) => handleCategoryChange('dailyRate', parseInt(value), i)}
                valued
                value={role.dailyRate}
              />
              <Inputs  
                placeholder="Years of experience for this category*"
                onChange={(value) => handleCategoryChange('yearsOfExperience', value, i)}
                value={role.yearsOfExperience}
              />
              </View>
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
              {
                i !== 0 && 
                <TouchableOpacity style={styles.DeleteButton} onPress={() => onRoleDelete(i)}>
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
    fontSize: 18,
    fontFamily: 'PoppinsS'
  },
  skipText:{
    fontFamily: 'PoppinsS',
    alignSelf: "center",
    fontSize: 15,
    marginTop: 25,
    marginBottom: 80,
    letterSpacing: 2
  },
  DeleteButton:{
    marginVertical: 40
},
})


  
  export default ExperiencePage