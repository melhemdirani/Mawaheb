import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, ImageBackground, Pressable} from 'react-native';

import notificationImage from '../assets/images/notification.png';
import notificationImage2 from '../assets/images/notificationR.png';

function Notification({title, color, action, acceptContract, navCongrats, navJobs, navJobDetails, n}) {
    const onPress = () => {
        if(title === 'You have a new contract to accept or reject'){
            acceptContract(n.text, n.textOne, action)
        } else{
            if (title.includes('has accepted')){
               navCongrats(action) 
            } else if (title.includes('has applied')){
                navJobs(n.text, n.textOne, action, n.id)
            } else if (title.includes('invited')){
                navJobDetails(action)
            }
        }
    }
    return (
        <TouchableOpacity onPress={() => onPress ()}>
            <ImageBackground style={[styles.container]} source={!color ? notificationImage : notificationImage2 }>
                    <Text style={styles.text}>{title}</Text>
            </ImageBackground>
        </TouchableOpacity>

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