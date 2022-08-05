import React, { useState, useEffect } from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view'

const DurationInputs = ({ title, placeholder, onChangeText }) => {
  const [text, setText] = useState('')
  const [changed, setChanged] = useState(false)

  useEffect(() => {
    if (text.length > 0 && !changed) {
      setChanged(true)
    }
    if (text.length < 1 && changed) {
      setChanged(false)
    }
  }, [text])
  const handleChange = (name, value) => {
    setText(value)
    onChangeText(value)
  }

  return (
    <View
      style={
        !changed ? [styles.container, styles.borderBottom] : styles.container
      }
    >
      {changed && (
        <MaskedView
          maskElement={
            <Text style={[styles.label, { backgroundColor: 'transparent' }]}>
              {placeholder}
            </Text>
          }
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#23CDB0', '#9C88FD', '#9C88FD', '#9C88FD']}
          >
            <Text style={[styles.label, { opacity: 0 }]}>{placeholder}</Text>
          </LinearGradient>
        </MaskedView>
      )}
      <View style={styles.subContainer}>
        <TextInput
          style={styles.wrapperCustom}
          onChangeText={(text) => handleChange(title, text)}
          placeholder={placeholder}
          placeholderTextColor='rgba(0,0,0,.5)'
        />
        <Image
          style={styles.rate}
          source={require('../assets/images/date.png')}
        />
      </View>
      {changed && (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={['#23CDB0', '#9C88FD', '#9C88FD', '#9C88FD']}
          style={{ height: 2, marginBottom: -10, marginTop: 10 }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    justifyContent: 'center',
    width: '85%',
    backgroundColor: 'rgba(202, 218, 221, .2)',
    height: 50,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  borderBottom: {
    borderBottomColor: '#107DC5',
    borderBottomWidth: 1,
  },
  text: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    fontWeight: '700',
  },
  wrapperCustom: {
    borderRadius: 3,
    alignItems: 'center',
    paddingLeft: 20,
  },
  label: {
    paddingLeft: 20,
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  rate: {
    marginRight: 10,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
})

export default DurationInputs
