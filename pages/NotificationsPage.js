import { ScrollView ,View, StyleSheet, Platform, Text } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';

import { clearNotifications } from '../redux/user/user.actions';

import Navbar from '../components/Navbar';
import Header from '../components/Header';
import notificationIcon from '../assets/images/notificationIcon.png'
import trash from '../assets/images/trash.png'
import Notification from '../components/Notification';


const NotificationsPage = ({navigation, role, notifications, clearNotifications}) => {
    
    const onTrashPress = () => {
        clearNotifications()
    }

    return (
        <View style={styles.container}>
            <ScrollView >
                <Header icon={notificationIcon} hidden rightIcon={trash} numberHidded onTrashPress={onTrashPress}/>
                <View style={styles.container4} />
                {
                    notifications && notifications.map((n,i) =>
                        <Notification title={n.notification} color={n.urgent ?  "#BE3142": "#31BEBB"}/>
                    )
                }
            </ScrollView>
            <Navbar active="Notifications" navigation={navigation} client={role === 'client' ? true : false}/>
        </View>
    )
}

const styles = Platform.OS === "android"
? StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    container4: {
        marginTop: 40
    },
})
: StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
})

const mapStateToProps =  ({
    notifications: {notifications},
    role: {role},
    })   => ({
    notifications,
    role,
})
    
const mapDispatchToProps = (dispatch) => ({
    clearNotifications: (object) => dispatch(clearNotifications(object))
});

export default connect(mapStateToProps, mapDispatchToProps )(NotificationsPage)
