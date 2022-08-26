import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Pressable,
    FlatList
} from 'react-native';

import JobList2 from '../components/JobList2';

import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import arrowUpIcon from '../assets/images/arrowUpIcon.png';
  


export default function RenderFreelancers({navigate, freelancers, job, alterApplicants, showApplicants, handlePageChange}) {
 
    const handlePress = () => {
        alterApplicants(showApplicants)

    }

    const [page, setPage] = useState(1)
    const renderItem = (data) => {
        let freelancer = data.item
        return (
            <JobList2 
                languages={freelancer.languages} 
                user={freelancer.user} 
                roles={freelancer.roles} 
                navigate={navigate}
                job={job}
                id={freelancer.id}
                freelancer={freelancer}
            />
        )
    }

    return (
        <View style={styles.container}>
            <Pressable style={styles.title} onPress={()=>handlePress()}>
                <MaskedView
                    maskElement={
                    <Text style={[styles.text, { backgroundColor: 'transparent' }]}>
                        Invite Freelancers To Apply
                    </Text>
                    }
                >
                    <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={['#31BEBB', '#655BDA']}
                    >
                    <Text style={[styles.text, { opacity: 0 }]}>
                        Invite Freelancers To Apply
                    </Text>
                    </LinearGradient>
                </MaskedView>
                <Image source={arrowUpIcon} style={showApplicants ? styles.arrowUp : styles.arrowDown}></Image>
            </Pressable>

            <View>
                {
                    showApplicants  && Object.keys(freelancers) !== 0 && 
                        <FlatList
                        data={freelancers}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{marginTop: -20, zIndex: 9999}}
                        style={styles.jobs}
                        onEndReachedThreshold={.4}
                        onEndReached={() => handlePageChange()}
                    />
                }
             
            </View  >
        </View>
    )
}

const styles = StyleSheet.create({
  
    title: {
      padding: 7,
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 5,
    },
    text: {
      fontSize: 17,
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
    },
    jobs:{
        paddingTop: 50,
        marginBottom: 130,
    }
  })