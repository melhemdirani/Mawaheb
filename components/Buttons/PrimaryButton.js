import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View, ActivityIndicator } from 'react-native';

const PrimaryButton = ({title, activity}) => {

  return (
      <View
        style={
          styles.wrapperCustom
        }
      >
        { activity ?
          <View style={{flexDirection: "row"}}>
            <Text style={[styles.text, {marginRight: 15}]}>
            {title}
          </Text>
            <ActivityIndicator  size={"small"} color="white"/>
          </View>
          :<Text style={styles.text}>
            {title}
          </Text>
        }
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
      fontFamily: 'PoppinsS'
    },
    wrapperCustom: {
      borderRadius: 30,
      backgroundColor: "#23CDB0",
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
      fontFamily: 'PoppinsB'
    },
    wrapperCustom: {
      borderRadius: 30,
      backgroundColor: "#23CDB0",
      alignItems: "center",
      padding: 6,
      width: 255
    },
  })


export default PrimaryButton;