import React from 'react'
import { Image, StyleSheet, Text, View, ImageBackground} from 'react-native';
import notificationImage from '../assets/images/notification.png'
import notificationImage2 from '../assets/images/notificationR.png'

function Notification({title, color}) {

    return (
        <ImageBackground style={[styles.container]} source={!color ? notificationImage : notificationImage2 }>
            <Text style={styles.text}>{title}</Text>
        </ImageBackground>
    )
}

const styles = 
    StyleSheet.create({
        container:{
            flexDirection: "row",
            justifyContent: "flex-start",
            backgroundColor: "white",
            alignItems: "center",
            alignSelf: "center",
            marginTop: 20,
            width: "100%",
            height: 83,
            borderBottomRightRadius: 20,
            borderTopRightRadius: 20,
        },
        bar:{
            width: 10,
            height: "100%",
        },
        text:{
            color: "#0A084B",
            fontWeight: "400",
            paddingLeft: 40,

        },
        shadowProp: {  
            backgroundColor: "rgba(255,255,255,0)" ,
            shadowColor: "rgba(0,0,0,.2)",
            elevation: 4,
            shadowOffset: {
              width: 2,
              height: 4,
            },
            shadowRadius: 24,
        }, 
        image:{
            marginRight: 20,
        }

    })
   

export default Notification