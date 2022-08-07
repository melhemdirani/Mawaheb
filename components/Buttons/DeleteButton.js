import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const DeleteButton = ({title}) => {

  return (
      <View
        style={
          styles.wrapperCustom
        }
      >
        <Text style={styles.text}>
          {title}
        </Text>
    </View>
  );
};
const styles = Platform.OS ==='android' 
  ? StyleSheet.create({
    
    container: {
      justifyContent: "center",
    },
    text: {
      color: "white",
      paddingTop: 5,
      paddingBottom: 5,
      fontSize: 15,
      fontFamily: "PoppinsS"
    },
    wrapperCustom: {
      borderRadius: 30,
      backgroundColor: "#BE3142",
      alignItems: "center",
      padding: 6,
      width: 255
    },
  })
  : StyleSheet.create({
    
    container: {
      justifyContent: "center",
    },
    text: {
      color: "white",
      paddingTop: 10,
      paddingBottom: 10,
      fontSize: 16,
      fontFamily: "PoppinsS"
    },
    wrapperCustom: {
      borderRadius: 30,
      backgroundColor: "#BE3142",
      alignItems: "center",
      padding: 6,
      width: 255
    },
  })

export default DeleteButton;