import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const TextArea = ({placeholder, onChange, value, valued}) => {

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
      onChange(e)
      setText(e)
    }
 
    return (
        <View style={!changed ? [styles.container, styles.borderBottom] : styles.container}>
            <View style={styles.view2}>
            {
                changed && 
                <View style={{height: 14}}>
                  <MaskedView maskElement={ <Text style={[styles.label, {backgroundColor: "transparent"}]}>{placeholder}</Text>}>
                      <LinearGradient
                          start={{x:0, y: 0}}
                          end={{x:1, y: 1}}
                          colors={['#23CDB0', '#9C88FD','#9C88FD', '#9C88FD', ]}
                      >
                        <Text style={[styles.label, {opacity: 0}]}>{ placeholder}</Text>
                      </LinearGradient>
                  </MaskedView>
                </View>
                

            }
            <TextInput
                multiline
                scrollEnabled={false}
                style={
                styles.wrapperCustom
                }
                placeholder={placeholder}
                placeholderTextColor="rgba(0,0,0,.5)"
                onChangeText={(e) => onChangeText(e)}
                value={valued ? value : text}
            />
            </View>
            { changed && 
                <LinearGradient
                    start={{x:0, y: 0}}
                    end={{x:1, y: 1}}
                    colors={['#23CDB0', '#9C88FD','#9C88FD', '#9C88FD', ]}
                    style={{height: 2}}
                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    justifyContent: "space-between",
    width: "85%",
    backgroundColor: "rgba(202, 218, 221, .2)",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  borderBottom:{
    borderBottomColor: "#107DC5",
    borderBottomWidth: 1,
  },
  view2:{
    paddingTop: 5
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
    width: "100%",
    paddingLeft: 20,
    height: 150,

  },
  label:{
    paddingLeft: 20,
    fontSize: 10,
    textTransform: "uppercase",
    fontWeight: "600"
  }
});

export default TextArea;
