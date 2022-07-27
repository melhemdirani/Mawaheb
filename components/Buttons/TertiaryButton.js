import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const TertiaryButton = ({title}) => {

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
    color: "black",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    fontWeight: "700",
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
});

export default TertiaryButton;