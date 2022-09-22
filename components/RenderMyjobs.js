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
  


export default function RenderMyjobs({
    job, 
    navigate,
    showApplicantsTitle, 
    setShowApplicantsTitle, 
    setShownApplicants,
    shownApplicants
}) {
    
    const [showApplicants, setShowApplicants] = useState(false)
    
    const handlePress = () => {
        if(showApplicants){
            setShowApplicantsTitle("all")
        } else{
            setShowApplicantsTitle(job.id)
        }
        setShownApplicants(!shownApplicants)
        setShowApplicants(!showApplicants)
    }
    const renderItem = (data) => {
        const {item} = data
        return Object.keys(item.freelancer).length ?  (
            <JobList
                freelancer={item.freelancer}
                navigate={navigate}
                style={styles.jobs}
                job={job}
                price={item.price}
                item={item}
            
            />
        ): <View>
        <Text>No applicants yet</Text>

        </View>
    }
    useEffect(() => {
        if(showApplicantsTitle === job.id && !showApplicants ){
            setShownApplicants(true)
            setShowApplicants(true)
        }
    }, [showApplicantsTitle])

    if (!job) {    
    return <Text>Loading</Text>
    }
    return (showApplicantsTitle === job.id || showApplicantsTitle === "all") &&(
    <View style={showApplicants ? styles.container2 : styles.container}>
        <Pressable style={styles.title} onPress={()=>handlePress()}>
            <MaskedView
                maskElement={
                <Text style={[styles.text, { backgroundColor: 'transparent' }]}>
                    {job.title} Applicants
                </Text>
                }
            >
                <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#31BEBB', '#655BDA']}
                >
                <Text style={[styles.text, { opacity: 0 }]}>
                    {job.title} Applicants
                </Text>
                </LinearGradient>
            </MaskedView>
            <Image source={arrowUpIcon} style={showApplicants ? styles.arrowUp : styles.arrowDown}></Image>
        </Pressable>
        <View style={{bheight: "100%"}}>
            { 
                showApplicants && job.proposals.length > 0
                ? <FlatList
                    data={job.proposals ? job.proposals : { id: 0, title: 'No Jobs Found' }}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.createdAt}
                    contentContainerStyle={{marginTop: -20, zIndex: 9999}}
                    style={styles.jobs}
                    onEndReachedThreshold={.4}
                />
                : showApplicants 
                ? <Text style={styles.text2}>No job applicants yet</Text>
                : null
            }
        </View>
    </View>
    )
}

const styles = StyleSheet.create({

    container2:{
        paddingBottom: 300,
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