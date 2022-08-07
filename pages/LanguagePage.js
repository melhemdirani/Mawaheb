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

import Header from '../components/Header';
import icon from '../assets/images/language.png';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import SelectInput from '../components/SelectInput';
import AddRoleButton from '../components/Buttons/AddRoleButton';
import { addLanguage } from '../reduxToolkit/freelancerSlice';
const LanguagePage = ({ navigation }) => {
  
  const [addedLanguages, setAddedLanguages] = useState([])

  const dispatch = useDispatch()
  const mainLanguageState = {
    name: '',
    profeciency: '',
  }
  const secondaryLanguageState = {
    name: '',
    profeciency: '',
  }
  const [mainLanguage, setMainLanguage] = React.useState(mainLanguageState)
  const [secondaryLanguage, setSecondaryLanguage] = React.useState(
    secondaryLanguageState
  )

  const navigateBank = () => {
    const { name, profeciency } = mainLanguage
    const { name: name2, profeciency: profeciency2 } = secondaryLanguage
    if (!name || !profeciency || !name2 || !profeciency2) {
      alert('Please fill all the fields')
      return
    } else {
      dispatch(addLanguage(mainLanguage))
      dispatch(addLanguage(secondaryLanguage))
      addedLanguages.map(language => 
        dispatch(addLanguage(language))
      )
      navigation.navigate('bank')
    }
  }
  const handleMainLanguageChange = (name, value) => {
    console.log(name, value)
    setMainLanguage({ ...mainLanguage, [name]: value })
  }
  const handleSecondaryLanguageChange = (name, value) => {
    console.log(name, value)
    setSecondaryLanguage({ ...secondaryLanguage, [name]: value })
  }
  const handleAdditionalLanguages = (name, value, i) => {
    setAddedLanguages(data => {
      return [ ...data.slice(0, i), 
        {...data[i], [name]: value },
          ...data.slice(i + 1)]
    });


  }


  const RenderAddedIndex = () => {
    return  (
      <View style={{width: "100%"}}>
        {
          addedLanguages.map((e, i) =>
          <View key={i} style={{width: "100%", alignItems: "center"}}>
            <SelectInput
              title='Language*'
              list={['English', 'Arabic', 'French']}
              onSelect={(value) => handleAdditionalLanguages('name', value, i)}
              valued
              value={e.name}
            />
            <SelectInput
              title='Profeciency*'
              list={['beginner', 'intermediate', 'advanced']}
              onSelect={(value) => handleAdditionalLanguages('profeciency', value, i)}
              valued
              value={e.profeciency}
            />
          </View>
        )}
      </View>

    )
  }

  const handleAddButton = () => {

    setAddedLanguages(
      data => ([
        ...data,
        mainLanguageState
      ])
    )
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
          Lorem ipsum dolor sit amenoLorem ipsum dolor sit ameno
        </Text>
        <SelectInput
          title='Main Language*'
          list={['English', 'Arabic', 'French']}
          onSelect={(value) => handleMainLanguageChange('name', value)}
        />
        <SelectInput
          title='Profeciency*'
          list={['beginner', 'intermediate', 'advanced']}
          onSelect={(value) => handleMainLanguageChange('profeciency', value)}
        />
        <SelectInput
          title='Secondary Language*'
          list={['English', 'Arabic', 'French']}
          onSelect={(value) => handleSecondaryLanguageChange('name', value)}

        />
        <SelectInput
          title='Profeciency*'
          list={['beginner', 'intermediate', 'advanced']}
          onSelect={(value) => handleSecondaryLanguageChange('profeciency', value)}
        />
        {addedLanguages.length > 0 && <RenderAddedIndex />}
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
