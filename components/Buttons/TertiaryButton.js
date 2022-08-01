import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const TertiaryButton = ({title, navigate}) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={
          styles.wrapperCustom
        }
        onPress={() => navigate()}
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
      color: "black",
      paddingTop: 7,
      paddingBottom: 7,
      fontSize: 15,
      fontFamily: 'PoppinsS'
    },
    wrapperCustom: {
      borderRadius: 30,
      backgroundColor: "white",
      alignItems: "center",
      padding: 6,
      borderColor: "black",
      borderWidth:1,
      width: 255
    },
  })
  : StyleSheet.create({
    container: {
      justifyContent: "center",
    },
    text: {
      color: "black",
      paddingTop: 10,
      paddingBottom: 10,
      fontSize: 16,
      fontFamily: 'PoppinsS'
    },
    wrapperCustom: {
      borderRadius: 30,
      backgroundColor: "white",
      alignItems: "center",
      padding: 6,
      borderColor: "black",
      borderWidth:1,
      width: 255
    },
  })

export default TertiaryButton;