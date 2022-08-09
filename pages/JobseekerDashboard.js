import { ScrollView ,View, Text, FlatList, StyleSheet, Image, ImageBackground } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

import SecondaryHeader from '../components/SecondaryHeader';
import Job from '../components/Job';
import Navbar from '../components/Navbar';
import backgroundImage from '../assets/images/currentBg.png'
import totalBg from '../assets/images/totalBg.png'

const JobseekerDashboard = ({navigation}) => {
    const Data = [
        {   
            id:0,
            title: 'Job Title Lorem Ipsum1',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate blanditiis doloremque itaque praesentium',
            roleDescription: 'Job description lorom ipsum dolor sit ameno Job description lorom  sit ameno Job description lorom ipsum dolor sit ameno Job description lorom ipsum dolor sit ameno Job description lorom ipsum dolor sit ameno it ameno Job description lorom ipsum dolor sit ameno Job description lorom ipsum dolor sit ameno Job description',
            price: 15000,
            date: '30 May-2020',
            shift: 'day shift',
            location: 'Sharjah',
        },
        {
            id:1,
            title: 'Job Title Lorem Ipsum2',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate blanditiis doloremque itaque praesentium1',
            roleDescription: 'Job description lorom ipsum dolor sit ameno Job description lorom  sit ameno Job description lorom ipsum dolor sit ameno Job description lorom ipsum dolor sit ameno Job description lorom ipsum dolor sit ameno it ameno Job description lorom ipsum dolor sit ameno Job description lorom ipsum dolor sit ameno Job description',
            price: 10000,
            date: '30 May-2020',
            shift: 'day shift',
            location: 'Sharjah',
        },
        {
            id:2,
            title: 'Job Title Lorem Ipsum3',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate blanditiis doloremque itaque praesentium2',
            price: 20000,
            roleDescription: 'Job description lorom ipsum dolor sit ameno Job description lorom  sit ameno Job description lorom ipsum dolor sit ameno Job description lorom ipsum dolor sit ameno Job description lorom ipsum dolor sit ameno it ameno Job description lorom ipsum dolor sit ameno Job description lorom ipsum dolor sit ameno Job description',
            date: '30 May-2020',
            shift: 'day shift',
            location: 'Sharjah',
        }
    ]

    const currentJob =  {   
        id:0,
        title: 'Job Title Lorem Ipsum1',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate blanditiis doloremque itaque praesentium',
        roleDescription: 'Job description lorom ipsum dolor sit ameno Job description lorom  sit ameno Job description lorom ipsum dolor sit ameno Job description lorom ipsum dolor sit ameno Job description lorom ipsum dolor sit ameno it ameno Job description lorom ipsum dolor sit ameno Job description lorom ipsum dolor sit ameno Job description',
        price: 15000,
        date: '30 May-2020',
        shift: 'day shift',
        location: 'Sharjah',
    }
    const navigatePrevious = (i) => {
        navigation.navigate('jobDescription', {myjobs: true, data: currentJob })
    }
    const navigate = (i) => {
        navigation.navigate('jobDescription', {myjobs: true, data: Data[i] })
    }
    const RenderItem = (data, index) => {
        let lastOne = data.index === Data.length - 1 ? true : false

        return(
            <View style={styles.renderItem}>
                <Job 
                    title={data.data.title} 
                    description={data.data.description} 
                    price={data.data.price} 
                    lastOne={lastOne} 
                    heart={true}
                    navigate={navigate}
                    id={data.index}
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
            <ImageBackground
                source={totalBg}
                style={styles.totalContainer}
                resizeMode='contain'
            >
                <View  style={styles.sub}>
                    <Text style={styles.totalText}>{month}</Text>
                    <Text style={styles.totalText2}>months</Text>
                </View>
                <View style={styles.borderL} />
                <View  style={[styles.sub]}>
                    <Text style={styles.totalText}>{day}</Text>
                    <Text style={styles.totalText2}>days</Text>
                </View>
            </ImageBackground>
        )
    }
    const TotalContainer2 = ({n}) => {
        return(
            <ImageBackground
                source={totalBg}
                style={[styles.totalContainer]}
                resizeMode='contain'
            >
                <View style={[styles.totalContainer2]}>
                    <Text style={styles.totalText}>{n}</Text>
                    <Text style={[styles.totalText2, styles.textPadding]}>AED</Text>
                </View>
            </ImageBackground>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container4}>
            <SecondaryHeader title={'Hi John,'} heart={true}/>
            <View style={styles.row2}>
                <View style={styles.col}>
                    <Text style={styles.colText}>Total Working Time</Text>
                    <TotalContainer month={12} day={25} />
                </View>
                <View style={styles.col}>
                    <Text style={styles.colText}>Total Cash Earned</Text>
                    <TotalContainer2 n="180,000" />
                </View>
             
            </View>
            <View style={styles.current}>
                <Image
                    style={styles.background}
                    source={backgroundImage}
                />
                <View style={styles.currentSub}>
                    <Text style={[styles.title2]}>Current Job</Text>
                    <Job
                        heart={true}
                        current={true}
                        title={currentJob.title}
                        description={currentJob.description}
                        price={currentJob.price}
                        navigate={navigatePrevious}
                    /> 
                </View>
            </View>
            <MaskedTitle title="Previous Jobs" />
            {
                Data && Data.map((data, i ) => <RenderItem data={data} index={i} key={i} />)
            }
            </ScrollView>

            <Navbar active="Dashboard" navigation={navigation}/>
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
        top: 35,
        fontFamily: 'PoppinsS',
        left: 20,
        marginBottom: 35,
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
        width: 175,
        height: 65,
    },
    totalText:{
        color: "white",
        fontFamily: "PoppinsB",
        fontSize: 20
    },
    totalText2:{
        color: "white",
        fontFamily: "PoppinsR",
        fontSize: 9,
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
        width: 1,
        height: "50%"
    },
    row2:{
        flexDirection: "row",
        justifyContent: "space-around",
        alignSelf: "center",
        width: "95%",
        marginBottom: 20,
        paddingVertical: 10
    },
    col:{
        alignItems: "center",
        justifyContent: "center"
    },
    totalContainer2:{
        flexDirection: "row",
        alignItems: "flex-end"
    },
    textPadding:{
        left: 5
    },
    colText:{
        fontSize: 13,
        fontFamily: "PoppinsR",
        letterSpacing: 1.5,
        bottom: 10
    }
    
 
})

export default JobseekerDashboard
