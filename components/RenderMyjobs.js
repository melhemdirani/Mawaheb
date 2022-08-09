import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    Pressable,
} from 'react-native';

import JobList from '../components/JobList';

import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import arrowUpIcon from '../assets/images/arrowUpIcon.png';
  


export default function RenderMyjobs({data, navigate}) {

    const [showApplicants, setShowApplicants] = useState(false)
 
    const renderItem = (data) => {
        if (!data) {
        return <Text>No Jobs</Text>
        }
        return (
            <JobList
                {...data.item}
                navigate={navigate}
                style={styles.jobs}
            />
        )
    }
    if (!data) {
    return <Text>Loading</Text>
    }
    return (
    <View style={styles.container}>
        <Pressable style={styles.title} onPress={()=>setShowApplicants(!showApplicants)}>
            <MaskedView
                maskElement={
                <Text style={[styles.text, { backgroundColor: 'transparent' }]}>
                    {data.title} Applicants
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

        { showApplicants &&
            <FlatList
                data={data.proposals}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.jobs}
            />
        }
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