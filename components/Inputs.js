import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const Inputs = ({placeholder, onChange, numeric, value}) => {

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
            {
                changed && 
                <MaskedView maskElement={ <Text style={[styles.label, {backgroundColor: "transparent"}]}>{placeholder}</Text>}>
                    <LinearGradient
                        start={{x:0, y: 0}}
                        end={{x:1, y: 1}}
                        colors={['#23CDB0', '#9C88FD','#9C88FD', '#9C88FD', ]}
                    >
                       <Text style={[styles.label, {opacity: 0}]}>{placeholder}</Text>
                    </LinearGradient>
                </MaskedView>

            }
           
             <TextInput
              secureTextEntry={placeholder === "Password" || placeholder === "Password*" ? true : false}
              style={ [styles.wrapperCustom, !changed && { height:"100%"}] }
              placeholder={placeholder}
              keyboardType={numeric ? "numeric" : "default"}
              placeholderTextColor="rgba(0,0,0,.5)"
              onChangeText={(e) => onChangeText(e)}
              value={value}
            />

            { changed && 
                <LinearGradient
                    start={{x:0, y: 0}}
                    end={{x:1, y: 1}}
                    colors={['#23CDB0', '#9C88FD','#9C88FD', '#9C88FD', ]}
                    style={{height: 2, marginBottom: -5}}
                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    justifyContent: "center",
    width: "85%",
    backgroundColor: "rgba(202, 218, 221, .2)",
    height: 50,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  borderBottom:{
    borderBottomColor: "#107DC5",
    borderBottomWidth: 1,
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

export default Inputs;
