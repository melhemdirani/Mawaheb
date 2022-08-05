import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native'
import React from 'react'
import Header from '../components/Header'
import icon from '../assets/images/language.png'
import Inputs from '../components/Inputs'
import UploadCard from '../components/UploadCard'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import SelectInput from '../components/SelectInput'
import AddRoleButton from '../components/Buttons/AddRoleButton'
import { addLanguage } from '../reduxToolkit/freelancerSlice'
import { useDispatch } from 'react-redux'

const LanguagePage = ({ navigation }) => {
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
    dispatch(addLanguage(mainLanguage))
    dispatch(addLanguage(secondaryLanguage))
    navigation.navigate('bank')
  }

  const handleMainLanguageChange = (name, value) => {
    console.log(name, value)
    setMainLanguage({ ...mainLanguage, [name]: value })
  }
  const handleSecondaryLanguageChange = (name, value) => {
    console.log(name, value)
    setSecondaryLanguage({ ...secondaryLanguage, [name]: value })
  }
  return (
    <ScrollView style={styles.container}>
      <Header
        icon={icon}
        title='Language'
        // numOfPage={<Image source={trash}></Image>}
        numOfPage='4/5'
        goBack={navigation.goBack}
        hidden={false}
      />
      <View style={styles.subContainer}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amenoLorem ipsum dolor sit ameno
        </Text>
        <Inputs
          placeholder='Main Language*'
          onChange={(value) => handleMainLanguageChange('name', value)}
        />
        <SelectInput
          title='Profeciency*'
          list={['beginner', 'intermediate', 'advanced']}
          onSelect={(value) => handleMainLanguageChange('profeciency', value)}
        />
        <Inputs
          placeholder='Secondary Language*'
          onChange={(value) => handleSecondaryLanguageChange('name', value)}
        />
        <SelectInput
          title='Profeciency*'
          list={['beginner', 'intermediate', 'advanced']}
          onSelect={(value) =>
            handleSecondaryLanguageChange('profeciency', value)
          }
        />
        <Pressable style={styles.addButton}>
          <AddRoleButton title='Add another language' />
        </Pressable>
        <Pressable style={styles.nextButton}>
          <PrimaryButton title='Continue' navigate={navigateBank} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('bank')}>
          <Text style={styles.skipText}>SKIP</Text>
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
  skipText: {
    fontFamily: 'PoppinsS',
    fontSize: 15,
    marginTop: -25,
    marginBottom: 80,
    letterSpacing: 2,
  },
})

export default LanguagePage
