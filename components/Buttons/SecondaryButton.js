import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const SecondaryButton = ({title, navigate}) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={
          styles.wrapperCustom
        }
        onPress={() =>navigate()}
      >
          <Text style={styles.text}>
            {title}
          </Text>
      </TouchableOpacity>
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
      paddingTop: 7,
      paddingBottom: 7,
      fontSize: 15,
      fontFamily: "PoppinsS"
    },
    wrapperCustom: {
      borderRadius: 30,
      backgroundColor: "#9C88FD",
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
      backgroundColor: "#9C88FD",
      alignItems: "center",
      padding: 6,
      width: 255
    },
  })

export default SecondaryButton;