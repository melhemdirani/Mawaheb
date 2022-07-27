import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const Inputs = ({title, placeholder}) => {

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
                style={
                styles.wrapperCustom
                }
                onChangeText={(e) => setText(e)}
                placeholder={placeholder}
                placeholderTextColor="rgba(0,0,0,.5)"
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
    width: "100%",
    paddingLeft: 20

  },
  label:{
    paddingLeft: 20,
    fontSize: 10,
    textTransform: "uppercase",
    fontWeight: "600"
  }
});

export default Inputs;
