import React from 'react'
import { Image, StyleSheet, Text, View, Platform} from 'react-native';


function Notification({title, color}) {

    return (
        <View style={[styles.container, styles.shadowProp]}>
            <View style={[styles.bar, {backgroundColor: color}]} />
            <Text style={styles.text}>{title}</Text>
            <Image
                style={styles.image}
                source={require('../assets/images/notificationArrow.png')}
            />
        </View>
    )
}

const styles = Platform.OS === 'android' 
    ? StyleSheet.create({
        container:{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "white",
            alignItems: "center",
            alignSelf: "center",
            marginTop: 20,
            width: "90%",
            height: 83,
            borderBottomRightRadius: 20,
            borderTopRightRadius: 20,
        },
        bar:{
            width: 10,
            height: 72,
            bottom: -4
        },
        text:{
            color: "#0A084B",
            fontWeight: "400"
        },
        shadowProp: {  
            backgroundColor: "rgba(255,255,255,0)" ,
            shadowColor: "rgba(0,0,0,.2)",
            elevation: 5,
            shadowOffset: {
              width: 2,
              height: -4,
            },
            shadowRadius: 24,
        }, 
        image:{
            marginRight: 20,
            marginBottom: -6
        }

    })
    : StyleSheet.create({
        container:{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "white",
            alignItems: "center",
            alignSelf: "center",
            marginTop: 20,
            top: 40,
            width: "90%",
            height: 70,
            borderBottomRightRadius: 20,
            borderTopRightRadius: 20,
        },
        bar:{
            width: 10,
            height: "100%"
        },
        text:{
            color: "#0A084B",
            fontWeight: "400"
        },
        shadowProp: {  
            backgroundColor: "rgba(255,255,255,0)" ,
            shadowColor: "rgba(0,0,0,.2)",
            elevation: 5,
            shadowOffset: {
              width: 2,
              height: -4,
            },
            shadowRadius: 24,
        }, 
        image:{
            marginRight: 20,
            marginBottom: -6
        }

    });
  

export default Notification