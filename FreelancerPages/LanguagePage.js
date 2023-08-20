import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';


import { languagesList } from '../assets/data/RolesList';
import Header from '../components/Header';
import icon from '../assets/images/language.png';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import SelectInput from '../components/SelectInput';
import AddRoleButton from '../components/Buttons/AddRoleButton';
import { addLanguage, deleteFreelenacerLanguage } from '../reduxToolkit/freelancerSlice';
import DeleteButton from '../components/Buttons/DeleteButton';
import { lang } from 'moment';

const LanguagePage = ({ navigation, route }) => {
  const {update} = route.params
  const {
    freelancer,
  } = useSelector((store) => store.freelancer)


  // const [alreadyExists, setAlreadyExists] = useState(-1)

  const dispatch = useDispatch()
  const mainLanguageState = {
    name: '',
    profeciency: '',
    already: false
  }

  let newLanguages =freelancer.languages !== undefined ? freelancer.languages.map(language =>{
    return {
      name: language.name,
      profeciency: language.profeciency,
      id: language.id
    }
  }) :  [mainLanguageState]

  console.log("new lagnuagess", newLanguages)
  const [languages, setLanguages] = useState(
    update && freelancer.languages !== undefined && freelancer.languages.length
    ? newLanguages
    : [mainLanguageState]
  )


  const handleLanguageChange = (name, value, index) => {
      setLanguages(data => {
        return [ 
          ...data.slice(0, index), 
          { 
            ...data[index], 
            [name] :value,
            already: false
          },
            ...data.slice(index+1)
        ]
      });
 
  }
  const bankNavigation = () => {
    navigation.navigate('bank', {update: update})

  }
  const navigateBank = () => {
    let valueArr = languages.map(function(item){ return item.name });
    let isDuplicate = valueArr.some(function(item, idx){ 
        return valueArr.indexOf(item) != idx 
    });
    if(isDuplicate){
      return alert("Please choose different languages")
    } 
    let notFilled = false
    const alllanguages =  languages.map(language => {
      if(language.name !== '' && language.profeciency !== ''){
        notFilled = false
      }  else{
        notFilled = true
      }
      let object = {
        name: language.name, 
        profeciency: language.profeciency, 
        id: language.id
      }
       return(
        object
       )
    })
    console.log("all", alllanguages)

    if(notFilled){
      return(alert("Please fill all required fields*"))
    } else{
      dispatch(addLanguage(alllanguages))
      bankNavigation()
    }
    
    // languages.map(language => 
    //   dispatch(addLanguage(language.name))
    // )
    // navigation.navigate('bank')
  }

  const [languagesArray, setLanguagesArray] = useState(languagesList)

  const handleAddButton = () => {
    setLanguages(data => {
      return [ 
        ...data,
        mainLanguageState
      ]
    });
  }
  const onDeleteLanguage = (index) => {
    if(update && languages[index].id !== undefined){
      dispatch(
        deleteFreelenacerLanguage(languages[index].id)
      ).then(res => console.log("response deleteing lanugage", res))
      .catch(err => console.log(err))
    }
    
    setLanguages(data => {
      return [ ...data.slice(0, index),  ...data.slice(index+1)]
    });
  }
  return (
    <ScrollView style={styles.container}>
      <Header
        icon={icon}
        title='Language'
        // numOfPage={<Image source={trash}></Image>}
        numOfPage='5/6'
        goBack={navigation.goBack}
        hidden={false}
      />
      <View style={styles.subContainer}>
        <Text style={styles.text}>
          Add below the languages you can speak and your level of influency for more accurate results.
        </Text>
        {
          languages.map((language, i) => 
            <View style={{width: "100%", alignItems: "center", marginVertical: 10}} key={i}>
            
               <SelectInput
                title={"Choose a language*"}
                list={languagesArray}
                languages
                valued
                value={language.name}
                onSelect={(value) => handleLanguageChange('name', value, i)}
                already={language.already}
              />
              <SelectInput
                title='Profeciency*'
                list={['Beginner', 'Intermediate', 'Advanced', 'Native']}
                onSelect={(value) => handleLanguageChange('profeciency', value.toLowerCase(), i)}
                valued
                value={language.profeciency}
              />
            
            </View>
          )
        }
        {
          languages.length > 1 && <Pressable style={{marginBottom: 20}} onPress={() => onDeleteLanguage(languages.length - 1)}>
            <DeleteButton title="Delete" />
          </Pressable>
        }
        <Pressable style={styles.addButton} onPress={() => handleAddButton()}>
          <AddRoleButton title='Add another language' />
        </Pressable>
        <Pressable style={styles.nextButton} onPress={() => navigateBank()}>
          <PrimaryButton title='Continue' />
        </Pressable>
        <Pressable onPress={() =>  bankNavigation()}>
          <Text style={styles.skipText}>
              SKIP
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subContainer: {
    alignItems: 'center',
    justifyContent: "center",
    paddingTop: 50,
  },
  text: {
    width: '70%',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 15,
    color: 'rgba(0,0,0,0.6)',
  },
  nextButton: {
    paddingVertical: 40,
  },
  addButton: {
    marginTop: 20,
    marginBottom: 60,
  },
  skipText:{
    fontFamily: 'PoppinsS',
    fontSize: 15,
    marginTop: -25,
    marginBottom: 80,
    letterSpacing: 2
  }
})

export default LanguagePage
