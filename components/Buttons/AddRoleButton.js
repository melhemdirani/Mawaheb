import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  text: {
    color: "#23CDB0",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    fontWeight: "700",
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
});

export default AddRoleButton;