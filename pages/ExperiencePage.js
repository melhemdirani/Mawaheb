import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

import React from 'react'
import Header from '../components/Header'
import signUp from '../assets/images/experienceIcon.png'
import Inputs from '../components/Inputs'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import SelectInput from '../components/SelectInput';
import TextArea from '../components/TextArea';
import DurationInputs from '../components/DurationInputs';
import DailyRate from '../components/DailyRate';
import AddRoleButton from '../components/Buttons/AddRoleButton';

const ExperiencePage = () => {

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
                numOfPage='2/4'
                hidden={false}
            />
            <View style={styles.subContainer}>
                <Text style={styles.text}>
                    Lorem ipsum dolor sit ameno
                </Text>
                <MaskedTitle title="Latest Role"/>
                <SelectInput 
                    title="Role*" 
                    placeholder="First Name" 
                    list={["Camera man", "option2", "option3"]}
                /> 
                <Inputs  placeholder="Project Title*"/> 
                <SelectInput 
                    title="Location*" 
                    placeholder="First Name" 
                    list={["Camera man", "option2", "option3"]}
                /> 
                <TextArea  placeholder="Key Responsibilities"/> 
                <Inputs  placeholder="Passport Number*"/>
                <DurationInputs placeholder="Role Duration*"/> 
                <DailyRate placeholder="Your daily rate*"/>
                <LinearGradient
                    start={{x:0, y: 0}}
                    end={{x:1, y: 1}}
                    colors={['#31BEBB', '#655BDA' ]}
                    style={{height: 5, width: "100%", marginTop: 5}}
                />
            </View>
            <View style={styles.subContainer2}>
                <MaskedTitle title="Most Notable Project "/>
                <SelectInput 
                    title="Role*" 
                    placeholder="First Name" 
                    list={["Camera man", "option2", "option3"]}
                /> 
                <Inputs  placeholder="Project Title*"/> 
                <SelectInput 
                    title="Location*" 
                    placeholder="First Name" 
                    list={["Camera man", "option2", "option3"]}
                /> 
                <TextArea  placeholder="Key Responsibilities"/> 
                <Inputs  placeholder="Passport Number*"/>
                <DurationInputs placeholder="Role Duration*"/> 
                <DailyRate placeholder="Your daily rate*"/>
                <LinearGradient
                    start={{x:0, y: 0}}
                    end={{x:1, y: 1}}
                    colors={['#31BEBB', '#655BDA' ]}
                    style={{height: 5, width: "100%", marginTop: 5}}
                />
                 <Pressable style={styles.nextButton}>
                    <AddRoleButton title="Add another role"/> 
                </Pressable>
                <LinearGradient
                    start={{x:0, y: 0}}
                    end={{x:1, y: 1}}
                    colors={['#31BEBB', '#655BDA' ]}
                    style={{height: 5, width: "100%", marginTop: 5}}
                />
                <Pressable style={styles.nextButton}>
                    <PrimaryButton title="Next"/> 
                </Pressable>
                <Text style={styles.skipText}>
                    SKIP
                </Text>
            </View>
           
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    width: "70%",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 25,
    color: "rgba(0,0,0,0.6)"
  },
  nextButton:{
    paddingVertical: 40
  },
  titleContainer:{
    alignSelf: "flex-start",
    left: 30,
    marginBottom: 20
  },
  title:{
    fontSize: 20,
    fontFamily: 'PoppinsS'
  },
  skipText:{
    fontFamily: 'PoppinsS',
    fontSize: 15,
    marginTop: -25,
    marginBottom: 80,
    letterSpacing: 2
  }
})

export default ExperiencePage
