import React from 'react'
import { Image, StyleSheet, Text, View, Pressable} from 'react-native';


function Setting({title, icon, action}) {

    return action ?(
        <Pressable onPress={() => action()} style={styles.container}>
            <Image
                style={styles.image}
                source={icon}
            />
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
    :(
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={icon}
            />
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        marginTop: 70,
        marginTop: 15,
        alignItems: "center",
        borderBottomColor: "rgba(16, 125, 197, .2)",
        borderBottomWidth: 1,
        alignSelf: "center",
        width: "90%",
        paddingBottom: 15
    },
    image:{
        marginLeft: 5,
        marginRight: 20,
    },
    text:{
        fontFamily: "PoppinsR",
        fontSize: 14,
        letterSpacing: 1.5
    }
 

});
  

export default Setting