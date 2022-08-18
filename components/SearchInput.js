import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const SearchInput = ({placeholder, onChange, value}) => {

    const [text, setText] = useState("")
    const [changed, setChanged] = useState(false)

    useEffect(() => {
        if(text.length > 0 && !changed){
            setChanged(true)
        }
        if(text.length < 1 && changed){
            setChanged(false)
        }
    }, [text])

    const onChangeText = (e) => {
      setText(e)
      onChange(e)
    }

    return (
        <View style={!changed ? [styles.container, styles.borderBottom] : styles.container}>
        
             <TextInput
              secureTextEntry={placeholder === "Password" || placeholder === "Password*" ? true : false}
              style={ [styles.wrapperCustom, !changed && { height:"100%"}] }
              placeholder={placeholder}
              placeholderTextColor="rgba(0,0,0,.5)"
              onChangeText={(e) => onChangeText(e)}
              value={value}
            />

        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    justifyContent: "center",
    width: "70%",
    marginRight: 10,
    height: 30,
    borderRadius: 8,
    backgroundColor: "white"
  },
  borderBottom:{
  },
  text: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    fontWeight: "700",
  },
  wrapperCustom: {
    borderRadius: 3,
    alignItems: "center",
    padding: 6,
    paddingLeft: 20,
    fontFamily: 'PoppinsR',
  },
  label:{
    paddingLeft: 20,
    fontSize: 10,
    textTransform: "uppercase",
  }
});

export default SearchInput;
