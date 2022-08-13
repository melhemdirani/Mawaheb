import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Pressable,
} from 'react-native';

import JobList2 from '../components/JobList2';

import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import arrowUpIcon from '../assets/images/arrowUpIcon.png';
  


export default function RenderFreelancers({navigate, loaded, freelancers, setShowJobs}) {

    const [showApplicants, setShowApplicants] = useState(false)
 
    const handlePress = () => {
        if(showApplicants){
            setShowJobs(true)
        } else{
            setShowJobs(false)

        }
        setShowApplicants(!showApplicants)

    }
    return (
        <View style={styles.container}>
            <Pressable style={styles.title} onPress={()=>handlePress()}>
                <MaskedView
                    maskElement={
                    <Text style={[styles.text, { backgroundColor: 'transparent' }]}>
                        View All Freelancers
                    </Text>
                    }
                >
                    <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={['#31BEBB', '#655BDA']}
                    >
                    <Text style={[styles.text, { opacity: 0 }]}>
                        Job Title Applicants
                    </Text>
                    </LinearGradient>
                </MaskedView>
                <Image source={arrowUpIcon} style={showApplicants ? styles.arrowUp : styles.arrowDown}></Image>
            </Pressable>

            <ScrollView>
                {
                    showApplicants && loaded && Object.keys(freelancers) !== 0 && freelancers.map((freelancer, i) => {
                    return freelancer.isCompleted && (
                        <JobList2 
                            languages={freelancer.languages} 
                            user={freelancer.user} 
                            roles={freelancer.roles} 
                            key={i} 
                            navigate={navigate}
                            id={freelancer.id}
                        />
                    )
                    
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    title: {
      padding: 7,
      backgroundColor: '#E7F2F9',
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 5,
    },
    text: {
      fontSize: 20,
      fontFamily: 'PoppinsS',
      justifyContent: 'center',
      paddingTop: 6,
    },
    arrowUp:{
        marginRight: 10
    },
    arrowDown:{
        marginRight: 10, 
        transform: [{ rotate: '180deg'}]
    }
  })