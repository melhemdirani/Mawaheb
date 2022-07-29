import { View, Text, FlatList, StyleSheet, Image, ImageBackground } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

import SecondaryHeader from '../components/SecondaryHeader';
import Job from '../components/Job';
import Navbar from '../components/Navbar';
import backgroundImage from '../assets/images/currentBg.png'
import totalBg from '../assets/images/totalBg.png'

const JobseekerDashboard = () => {
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
                <Job 
                    title={data.item.title} 
                    description={data.item.description} 
                    price={data.item.price} 
                    lastOne={lastOne} 
                /> 
            </View>
        )
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

    const TotalContainer = ({month, day}) => {
        return(
            <View
                style={styles.totalContainer}
                resizeMode='cover'
            >
                 <Image
                    style={styles.totalImg}
                    source={totalBg}
                />
                <View  style={styles.sub}>
                    <Text style={styles.totalText}>{month}</Text>
                    <Text style={styles.totalText2}>months</Text>
                </View>
                <View  style={[styles.sub, styles.borderL]}>
                    <Text style={styles.totalText}>{day}</Text>
                    <Text style={styles.totalText2}>days</Text>
                </View>
            </View>
        )
    }
    const TotalContainer2 = ({n}) => {
        return(
            <View
                style={styles.totalContainer}
                resizeMode='cover'
            >
                 <Image
                    style={styles.totalImg}
                    source={totalBg}
                />
           
                <Text style={styles.totalText2}>days</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <SecondaryHeader title={'Hi John,'} heart={true}/>
            <View style={styles.row2}>
                <TotalContainer month={12} day={25} />
                <TotalContainer2 n="180,000" />
            </View>
            <View style={styles.current}>
                <Image
                    style={styles.background}
                    source={backgroundImage}
                />
                <View style={styles.currentSub}>
                    <Text style={[styles.title2]}>Current Job</Text>
                    <Job 
                        current={true}
                        title="Job Title Lorem Ipsum"
                        description="Job description lorom ipsum dolor sit ameno Job description lorom ipsum dolor sit ameno "
                        price={"15,000"}
                    /> 
                </View>
            </View>
            <MaskedTitle title="Previous Jobs" />
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
    background:{
        height: 300,
        width: "100%",
        position: "absolute"
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
        marginTop: -25,
    },
    titleContainer:{
        alignSelf: "flex-start",
        left: 20,
        marginBottom: 20,
        top: 5
    },
    title:{
        fontSize: 20,
        paddingBottom: 15,
        fontFamily: 'PoppinsS'
    },
    title2:{
        fontSize: 20,
        top: 30,
        fontFamily: 'PoppinsS',
        left: 20,
        marginBottom: 25,
        color: "white"
    },
    currentSub:{
        top: -10,
        height: 310
    },
    totalImg:{
        position: "absolute"
    },
    totalContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    totalText:{
        color: "white",
        fontFamily: "PoppinsB",
        fontSize: 20
    },
    totalText2:{
        color: "white",
        fontFamily: "PoppinsR",
        fontSize: 8,
        top: -4
    },
    sub:{
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20
    },
    borderL:{
        borderLeftWidth: 1,
        borderLeftColor: "white",
    },
    row2:{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 33,
        paddingRight: 93,
        marginBottom: 20
    }
 
})

export default JobseekerDashboard
