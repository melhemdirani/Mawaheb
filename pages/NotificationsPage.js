import { ScrollView ,View, Text, FlatList, StyleSheet, Image, ImageBackground } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

import Navbar from '../components/Navbar';
import Header from '../components/Header';
import notificationIcon from '../assets/images/notificationIcon.png'
import trash from '../assets/images/trash.png'
import Notification from '../components/Notification';


const NotificationsPage = ({navigation}) => {
 
    return (
        <View style={styles.container}>
            <ScrollView style={styles.container4}>
                <Header icon={notificationIcon} hidden rightIcon={trash} numberHidded/>
                <Notification title="Notification lorem ipsum dolor sit ameno" color="#31BEBB"/>
                <Notification title="Notification lorem ipsum dolor sit ameno" color="#BE3142"/>
                <Notification title="Notification lorem ipsum dolor sit ameno" color="#31BEBB"/>
            </ScrollView>
            <Navbar active="Notifications" navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
  
})

export default NotificationsPage
