import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';

const AddRoleButton = ({title}) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={
          styles.wrapperCustom
        }>
            <Image
                style={styles.rate}
                source={require('../../assets/images/plussButton.png')}
            />
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
    color: "#23CDB0",
    paddingTop: 7,
    paddingBottom: 7,
    fontSize: 15,
    fontFamily: 'PoppinsS'
  },
  wrapperCustom: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#23CDB0",
    backgroundColor: "white",
    alignItems: "center",
    padding: 6,
    width: 220,
    flexDirection: "row",
    justifyContent: "center"
  },
  rate:{
    marginRight: 10
  }
  })
  : StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  text: {
    color: "#23CDB0",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    fontFamily: 'PoppinsS'
  },
  wrapperCustom: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#23CDB0",
    backgroundColor: "white",
    alignItems: "center",
    padding: 6,
    width: 220,
    flexDirection: "row",
    justifyContent: "center"
  },
  rate:{
    marginRight: 10
  }
  })

export default AddRoleButton;