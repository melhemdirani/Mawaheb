import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';

import { useDispatch } from 'react-redux';

import { languagesList } from '../assets/data/RolesList';
import Header from '../components/Header';
import icon from '../assets/images/language.png';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import SelectInput from '../components/SelectInput';
import AddRoleButton from '../components/Buttons/AddRoleButton';
import { addLanguage } from '../reduxToolkit/freelancerSlice';
import DeleteButton from '../components/Buttons/DeleteButton';
const LanguagePage = ({ navigation }) => {
  
  // const [alreadyExists, setAlreadyExists] = useState(-1)

  const dispatch = useDispatch()
  const mainLanguageState = {
    name: '',
    profeciency: '',
    already: false
  }
  const [languages, setLanguages] = useState([mainLanguageState, mainLanguageState])
  const [chosenSame, setChosenSame] = useState(false) 


  const handleLanguageChange = (name, value, index) => {
    let alreadyExists = false
    languages.map( (language, i) =>{
      if(language.name === value){
        alreadyExists= true
      }
    })

    if(alreadyExists && name === 'name'){
      setChosenSame(true)
      setLanguages(data =>{
        return [ 
          ...data.slice(0, index), 
          { 
            ...data[index], 
            [name] :value,
            already: true
          },
            ...data.slice(index+1)
        ]
      });
    } else{
      setChosenSame(false)
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
 
  }
  const navigateBank = () => {

    if(chosenSame){
      return alert("Please choose different languages")
    } 
    notFilled = false
    const alllanguages =   languages.map(language => {
      if(language.name === '' || language.profeciency === ''){
        notFilled = true
      }
      let object = {name: language.name, profeciency: language.profeciency}
       return(
        object
       )
    })
    console.log("all", alllanguages)

    if(notFilled){
      return(alert("Please fill all required fields*"))
    } else{
      dispatch(addLanguage(alllanguages))
      navigation.navigate('bank')
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
                title={i == 0 ? 'Main Language*' : i == 1 ? 'Secondary Language*' : 'Additional Language'}
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
              {
                i > 1 && <Pressable style={{marginBottom: 20}} onPress={() => onDeleteLanguage(i)}>
                  <DeleteButton title="Delete" />
                </Pressable>
              }
            </View>
          )
        }
        <Pressable style={styles.addButton} onPress={() => handleAddButton()}>
          <AddRoleButton title='Add another language' />
        </Pressable>
        <Pressable style={styles.nextButton} onPress={() => navigateBank()}>
          <PrimaryButton title='Continue' />
        </Pressable>
        <Pressable onPress={() =>  navigation.navigate('bank')}>
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
