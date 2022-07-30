import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const PrimaryButton = ({title, navigate}) => {

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

const styles = StyleSheet.create({
  container: {
    justifyContent: "center", 
  },
  text: {
    color: "white",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    fontWeight: "700",
  },
  wrapperCustom: {
    borderRadius: 30,
    backgroundColor: "#23CDB0",
    alignItems: "center",
    padding: 6,
    width: 255
  },
});

export default PrimaryButton;