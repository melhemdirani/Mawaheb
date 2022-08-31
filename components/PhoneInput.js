import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import PhoneInput from 'react-native-phone-input';

import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const PhoneInputs = ({placeholder, onChange, numeric, value}) => {

    const [text, setText] = useState(value)
    const [changed, setChanged] = useState(false)
    const phoneRef = useRef(undefined);

    useEffect(() => {
        if(text && !changed){
            setChanged(true)
        }
        if(!text && changed){
            setChanged(false)
        }
    }, [text])

    const onChangePhonenumber = (e) => {
      setText(e)
      onChange(e)
    }
    return (
         <View  style={!changed ? [styles.container, styles.borderBottom] : styles.container}>
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
           
             <PhoneInput
              style={
              styles.wrapperCustom
              }
              ref={phoneRef}
              placeholder={placeholder}
              placeholderTextColor="rgba(0,0,0,.5)"
              onChangePhoneNumber={(e) => onChangePhonenumber(e)}
              initialCountry={'ae'}
              initialValue={value}
              autoFormat={true}
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
    width: "85%",
    backgroundColor: "rgba(202, 218, 221, .2)",
    height: 50,
    borderTopLeftRadius: 8,
    justifyContent: "center",
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
    paddingLeft: 20,
    fontFamily: 'PoppinsR',
  },
  label:{
    paddingLeft: 20,
    fontSize: 10,
    textTransform: "uppercase",
  },
});

export default PhoneInputs;
