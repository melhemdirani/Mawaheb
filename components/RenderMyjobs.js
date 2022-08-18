import React, { useEffect, useState } from 'react';
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
import { ScrollView } from 'react-native-gesture-handler';
  


export default function RenderMyjobs({data, navigate,showApplicantsTitle, setShowApplicantsTitle}) {
    const [showApplicants, setShowApplicants] = useState(false)
    const handlePress = () => {
        if(showApplicants){
            setShowApplicantsTitle("all")
        } else{
            setShowApplicantsTitle(data.id)
        }
        setShowApplicants(!showApplicants)
    }
    const RenderItem = ({item}) => {
       
        return Object.keys(item.freelancer).length ?  (
            <JobList
                freelancer={item.freelancer}
                navigate={navigate}
                style={styles.jobs}
                job={data}
                item={item}
            />
        ): <Text>No proposals yet</Text>
    }
    useEffect(() => {
        if(showApplicantsTitle === data.id && !showApplicants ){
            setShowApplicants(true)
        }
    }, [showApplicantsTitle])
    if (!data) {    
    return <Text>Loading</Text>
    }
    return (showApplicantsTitle === data.id || showApplicantsTitle === "all") && (
    <View style={showApplicants ? styles.container2 : styles.container}>
        <Pressable style={styles.title} onPress={()=>handlePress()}>
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
                    {data.title} Applicants
                </Text>
                </LinearGradient>
            </MaskedView>
            <Image source={arrowUpIcon} style={showApplicants ? styles.arrowUp : styles.arrowDown}></Image>
        </Pressable>
        <ScrollView>
            { 
                showApplicants &&  data.proposals.length > 0 ? data.proposals.map((item, i) => 
                    <RenderItem item={item} key={i} />
                )
                : showApplicants 
                ? <Text style={styles.text2}>No job applicants yet</Text>
                : null
            }
        </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    container2:{
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
    text2: {
        lineHeight: 22,
        fontSize: 20,
        left: 10,
        marginVertical: 5,
        color: 'rgba(0,0,0,0.6)',
    },
    arrowUp:{
        marginRight: 10
    },
    arrowDown:{
        marginRight: 10, 
        transform: [{ rotate: '180deg'}]
    }
  })