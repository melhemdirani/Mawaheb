import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { connect } from 'react-redux';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { setUser } from '../redux/user/user.actions';

import Header from '../components/Header';
import signUp from '../assets/images/experienceIcon.png';
import Inputs from '../components/Inputs';
import PrimaryButton from '../components/Buttons/PrimaryButton'
import SelectInput from '../components/SelectInput';
import TextArea from '../components/TextArea';
import DurationInputs from '../components/DurationInputs';
import DailyRate from '../components/DailyRate';
import AddRoleButton from '../components/Buttons/AddRoleButton';
import RoleForm from '../components/RoleForm';

const ExperiencePage = ({ navigation, setUser }) => {

    const [latestRole, setLatestRole] = useState({})

    const onRoleChange = () => {
        setLatestRole
    }

    const languageNavigate = () => {
        navigation.navigate('language')
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
    return (
        <ScrollView style={styles.container}>
            <Header
                icon={signUp}
                title='Experience'
                // numOfPage={<Image source={trash}></Image>}
                numOfPage='3/5'
                hidden={false}
                goBack={navigation.goBack}
            />
            <Text style={styles.text}>
                Lorem ipsums dolor sit ameno
            </Text>
            <MaskedTitle title="Latest Role "/>
            <RoleForm />
            <MaskedTitle title="Most Notable Project "/>
            <RoleForm />
            <View  style={styles.buttons1}>
              <AddRoleButton title="Add another role" />
            </View>
            <LinearGradient
                start={{x:0, y: 0}}
                end={{x:1, y: 1}}
                colors={['#31BEBB', '#655BDA' ]}
                style={{height: 5, width: "100%", marginTop: 5}}
            />
            <View  style={styles.buttons}>
              <PrimaryButton title="Next" navigate={languageNavigate}/>
            </View>
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
    color: "rgba(0,0,0,0.6)"
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

const mapStateToProps =  ({
    signedIn: {signedIn},
    notifications: {notifications},
    name: {name},
  })   => ({
    signedIn,
    notifications,
    name,
  })
  
  const mapDispatchToProps = (dispatch) => ({
    setUser: (object) => setUser(object)
  });
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(ExperiencePage)