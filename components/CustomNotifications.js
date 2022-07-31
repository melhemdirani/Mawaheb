import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white',
  },
  container: {
    padding: 20,
  },
  title: { color: '#4F81D5', fontFamily: 'PoppinsB' },
  description: { color: 'rgba(0,0,0,.6)' },
});

export const CustomNotification = ({ title, description }) => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  </SafeAreaView>
);