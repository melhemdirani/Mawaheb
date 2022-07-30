import { View, ScrollView, FlatList, StyleSheet, Image } from 'react-native'
import React from 'react'
import SecondaryHeader from '../components/SecondaryHeader'
import Job from '../components/Job'
import Navbar from '../components/Navbar'

const JobsPage = ({navigation}) => {
    const Data = [
        {   
            id:0,
            title: 'Job Title Lorem Ipsum1',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate blanditiis doloremque itaque praesentium',
            price: 15000
        },
        {
            id:1,
            title: 'Job Title Lorem Ipsum2',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate blanditiis doloremque itaque praesentium1',
            price: 10000
        },
        {
            id:2,
            title: 'Job Title Lorem Ipsum3',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate blanditiis doloremque itaque praesentium2',
            price: 20000
        }
    ]
    const RenderItem = ({data}) => {
        return(
            <View style={styles.renderItem}>
                <Job title={data.title} description={data.description} price={data.price} /> 
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <ScrollView >
                <SecondaryHeader title={'Hi John'}></SecondaryHeader>
                {
                    Data && Data.map((data, i) => 
                        <RenderItem key={i} data={data} />
                    )

                }
            </ScrollView>
            <Navbar active="Jobs" navigation={navigation}/>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    jobs: {
        padding: 10,
    },
    renderItem:{
    },
    body: {
        padding: 20,
    },
    backIcon: {
        display: 'none',
    },
})

export default JobsPage
