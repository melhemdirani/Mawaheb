import { View, ScrollView, FlatList, StyleSheet, Image } from 'react-native'
import React from 'react'
import SecondaryHeader from '../components/SecondaryHeader'
import Job from '../components/Job'
import Navbar from '../components/Navbar'

const JobsPage = () => {
    const Data = [
        {   
            id:0,
            title: 'Job Title Lorem Ipsum1',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate blanditiis doloremque itaque praesentium',
            price: 100
        },
        {
            id:1,
            title: 'Job Title Lorem Ipsum2',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate blanditiis doloremque itaque praesentium1',
            price: 200
        },
        {
            id:2,
            title: 'Job Title Lorem Ipsum3',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate blanditiis doloremque itaque praesentium2',
            price: 200
        }
    ]
    const renderItem = (data) => {
        let lastOne = data.index === Data.length - 1 ? true : false
        return(
            <View style={styles.renderItem}>
                <Job title={data.item.title} description={data.item.description} price={data.item.price} lastOne={lastOne} /> 
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <SecondaryHeader title={'Hi John'}></SecondaryHeader>
            <FlatList 
                data={Data} 
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.flatlist}
            />
            <Navbar />
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
  flatlist:{
      marginTop: -38,
      paddingTop: 38,
  }
})

export default JobsPage
