import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, Image, DatePickerIOS, Platform} from 'react-native';
import DateTimePicker, {DateTimePickerAndroid} from '@react-native-community/datetimepicker';

import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const DateInputs = ({title, placeholder, onChange, dateType}) => {
    // const [text, setText] = useState("")

    let shown = Platform.OS === 'ios' ? false : true
    const [changed, setChanged] = useState(false)
    const [chosenDate, setChosenDate] = useState(new Date());


    // useEffect(() => {
    //     if(text.length > 0 && !changed){
    //         setChanged(true)
    //     }
    //     if(text.length < 1 && changed){
    //         setChanged(false)
    //     }
    // }, [text])
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(shown);
    
    const onChangeDate = (event, selectedDate) => {
      const currentDate = selectedDate;
      if(Platform.OS === 'ios'){
        setShow(true);
      } else{
        setShow(false);
      }
      setDate(currentDate);
      setChanged(true);
      if(!dateType){
        onChange(date.toDateString())
      } else{
        onChange(date)

      }
    };
    
    const showMode = (currentMode) => {
      DateTimePickerAndroid.open({
        value: date,
        onChange: onChangeDate,
        mode: currentMode,
        is24Hour: false,
      });
      if (Platform.OS === 'android') {
        setShow(false);
        // for iOS, add a button that closes the picker
      } 
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    return (
        <Pressable 
            style={
                !changed 
                ? [styles.container, styles.borderBottom] 
                : styles.container
            }
            onPress={() => showDatepicker()}
        >
           
                {changed && <MaskedView maskElement={ <Text style={[styles.label, {backgroundColor: "transparent"}]}>{placeholder}</Text>}>
                    <LinearGradient
                      start={{x:0, y: 0}}
                      end={{x:1, y: 1}}
                      colors={['#23CDB0', '#9C88FD','#9C88FD', '#9C88FD', ]}
                    >
                      <Text style={[styles.label, {opacity: 0}]}>{placeholder}</Text>
                    </LinearGradient>
                </MaskedView>   
                }
                { !show && <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    onChange={onChangeDate}
                    style={{left: 20, opacity: 0.02, width: "100%", position: "absolute", zIndex: 999, padding: 20}}
                  />}
                
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    { 
                      changed 
                      ? <Text style={[
                        styles.wrapperCustom,
                        ]}
                      >
                        {date.toDateString()}
                      </Text>
                      :<Text style={styles.wrapperCustom2}> {placeholder}</Text>
                    }
                    <Image
                      style={styles.rate}
                      source={require('../assets/images/date.png')}
                    />
                </View>
             
              { changed && 
                <LinearGradient
                  start={{x:0, y: 0}}
                  end={{x:1, y: 1}}
                  colors={['#23CDB0', '#9C88FD','#9C88FD', '#9C88FD', ]}
                  style={{height: 2, marginBottom: -10, marginTop: 10}}
                />
              } 
        </Pressable>
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
    fontSize: 15,
    paddingLeft: 20,
    fontFamily: 'PoppinsR'
  },
  wrapperCustom2: {
    fontSize: 15,
    paddingLeft: 20,
    fontFamily: 'PoppinsR',
    color: 'rgba(0,0,0,.5)'
  },
  label:{
    paddingLeft: 20,
    fontSize: 10,
    textTransform: "uppercase",
    fontFamily: 'PoppinsS'
  },
  rate:{
    marginRight: 15,
    alignSelf:"flex-end"
  },
  subContainer:{
    marginTop: 5,
  }
});

export default DateInputs;
