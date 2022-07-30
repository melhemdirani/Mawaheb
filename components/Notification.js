import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';


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

const styles = StyleSheet.create({
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
        shadowOffset: {width: 5, height: 4},  
        shadowColor: '#171717',  
        shadowOpacity: .1,  
        shadowRadius: 5,  
    },  
    image:{
        marginRight: 20,
        marginBottom: -6
    }

});
  

export default Notification