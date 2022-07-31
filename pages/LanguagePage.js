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

const LanguagePage = ({ navigation }) => {
  
  const navigateBank = () => {
    navigation.navigate('bank')
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
        <Inputs placeholder='Main Language*' />
        <SelectInput
          title='Profeciency*'
          list={['option1', 'option2', 'option3']}
        />
        <Inputs placeholder='Secondary Language*' />
        <SelectInput
          title='Profeciency*'
          list={['option1', 'option2', 'option3']}
        />
        <Pressable style={styles.addButton}>
          <AddRoleButton title='Add another language' />
        </Pressable>
        <Pressable style={styles.nextButton}>
          <PrimaryButton title='Continue' navigate={navigateBank}/>
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
