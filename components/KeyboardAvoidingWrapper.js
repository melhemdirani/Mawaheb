import React from 'react';

import { KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, Keyboard, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: '#fff',
      flex: 1,
    }
});

const keyboardVerticalOffset = Platform.OS === 'ios' ? 20 : 5;

const KeyboardAvoidingWrapper = ({ children }) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={0}
    >
        <ScrollView style={styles.wrapper} >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                {children}
            </TouchableWithoutFeedback>
        </ScrollView>
    </KeyboardAvoidingView>
  )
}


export default KeyboardAvoidingWrapper