import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const DeleteButton2 = ({title}) => {
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
    text: {
        color: "white",
        fontSize: 16,
        fontFamily: "PoppinsS"
      },
      wrapperCustom: {
        borderRadius:100,
        width: 40,
        height: 40,
        backgroundColor: "#BE3142",
        alignItems: "center",
        justifyContent: "center",
      },
  })
  : StyleSheet.create({
    text: {
      color: "white",
      fontSize: 16,
      fontFamily: "PoppinsS"
    },
    wrapperCustom: {
      borderRadius:100,
      width: 40,
      height: 40,
      backgroundColor: "#BE3142",
      alignItems: "center",
      justifyContent: "center",
    },
  })

export default DeleteButton2;