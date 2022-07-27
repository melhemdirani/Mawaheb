
import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, Image, TextInput} from 'react-native';


import {Picker} from '@react-native-picker/picker';

const SelectInput = ({title, placeholder}) => {

    const [selected, setSelected] = useState()
    const [changed, setChanged] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState();

 
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            <Image
                style={styles.image}
                source={require('../assets/images/Vector.png')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection:"row",
    width: "85%",
    backgroundColor: "#rgba(202, 218, 221, .2)",
    height: 50,
    borderBottomColor: "#107DC5",
    borderBottomWidth: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  wrapperCustom: {
    borderRadius: 3,
    alignItems: "center",
    padding: 6,
    width: "80%",
    paddingLeft: 20
  },
  text:{
    color: "rgba(0,0,0,0.5)",
    paddingLeft: 20
  },
  image:{
    marginRight: 10,
  }
});

export default SelectInput;
