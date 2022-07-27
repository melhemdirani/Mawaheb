import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const PrimaryButton = ({title}) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={
          styles.wrapperCustom
        }>
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
    color: "white",
    backgroundColor: "#23CDB0",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    fontWeight: "700",
    paddingLeft: 60,
    paddingRight: 60,
  },
  wrapperCustom: {
    borderRadius: 22,
    backgroundColor: "#23CDB0",
    padding: 6
  },
});

export default PrimaryButton;