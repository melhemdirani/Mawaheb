import React from 'react';
import { Pressable, StyleSheet, Text, View, Image, Button } from 'react-native';

function PrimaryButton({title}) {
    const onPress = () => {

    }
  return (
    <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{"title"}</Text>
    </Pressable>
          
  )
}


const styles = StyleSheet.create({
    button:{
    

    },
    text:{
        color: "white",
        backgroundColor: "#23CDB0",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 100,
        paddingRight: 100,
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
  
export default PrimaryButton