
import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import SelectDropdownWithSearch from 'react-native-select-dropdown-with-search'

import { LinearGradient } from 'expo-linear-gradient';


const SelectInput = ({title, list, onSelect, value, valued, setIndex, role, languages, already}) => {

    const [selected, setSelected] = useState(valued ? value : "")
    const [showList, setShowList] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState();

    const onItemClick = (item, index) => {
        if(!valued){setSelected(item)}
        setSelected(item)
        setShowList(false)
        if(role){
            setIndex(index)
        }
        onSelect(item)
    }
    const RenderItem = ({ data, index }) => (
        <Pressable style={styles.listItems} onPress={() => onItemClick(data, index)}>
            <Text style={styles.listText}>
                {data}
            </Text>
        </Pressable>
      
    );
    return (
        <View style={
            selected === "" && !showList 
            ? [styles.container, styles.height, styles.borderBottom] 
            : [styles.container]}
        >
             
               { (selected !== "" || value !== "")  &&
                    <MaskedView maskElement={ <Text style={[styles.label, {backgroundColor: "transparent"}]}>{title}</Text>}>
                        <LinearGradient
                            start={{x:0, y: 0}}
                            end={{x:1, y: 1}}
                            colors={['#23CDB0', '#9C88FD','#9C88FD', '#9C88FD', ]}
                        >
                        <Text style={[styles.label, {opacity: 0}]}>{title}</Text>
                        </LinearGradient>
                    </MaskedView>
                }

            <SelectDropdownWithSearch
              data={list}
              rowTextStyle={styles.text}
              buttonStyle={styles.container2}
              defaultButtonText={title}
              buttonTextStyle={styles.text}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
            renderCustomizedButtonChild={(selectedItem, index) => {
                return (
                  <View style={styles.dropdown3BtnChildStyle}>
                    {selectedItem 
                    ? <Text style={styles.text}>{selectedItem}</Text>
                    : <Text style={styles.text}>{selectedItem}</Text>
                    }
                  </View>
                );
              }}
              renderDropdownIcon={isOpened => {
                return  <Image
                    style={isOpened ? [styles.image, styles.rotate] : styles.image}
                    source={require('../assets/images/Vector.png')}
                />
              }}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return <Text style={[styles.text, {color: "black"}]}>{selectedItem}</Text>
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}

            />
            {   showList && list && list.length && languages 
                ? <ScrollView style={styles.ScrollView}>
                    {    list.map((item, i) => 
                            <RenderItem 
                                data={item.name} 
                                style={styles.flatlist}
                                key={i}
                                index={i}
                            />
                        )
                    }
                </ScrollView>
                : showList && list && list.length
                ?<ScrollView style={styles.ScrollView}>
                    {    list.map((item, i) => 
                            <RenderItem 
                                data={item} 
                                style={styles.flatlist}
                                key={i}
                                index={i}
                            />
                        )
                    }
                </ScrollView>
                : null
            }
             { (selected !== "" || value !== "")  && !showList &&
                <LinearGradient
                    start={{x:0, y: 0}}
                    end={{x:1, y: 1}}
                    colors={['#23CDB0', '#9C88FD','#9C88FD', '#9C88FD', ]}
                    style={{height: 2, }}
                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    height: {
        height: 50,
        justifyContent: "center",
    },
    container: {
        marginBottom: 20
    },  
    container2:{
        width: "85%",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: "rgba(202, 218, 221, .2)",
    },
    rotate:{
        transform: [{rotate: '180deg'}]
    },  
    subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5
    },
    dropdown1DropdownStyle: {backgroundColor: 'white'},
    dropdown1RowStyle: {backgroundColor: 'white', borderBottomColor: '#107DC5'},
    text: {
        color: "rgba(0,0,0, .5)",
        fontFamily: "PoppinsR",
        textAlign: 'left',
        fontSize: 14,
    },
 
    text2: {
        color: "rgba(0,0,0, 1)",
        fontFamily: "PoppinsR"
    },

    listText:{
        marginLeft: 20,
        marginTop: 5,
        marginBottom: 5,
        fontFamily: 'PoppinsR',
        color: "rgba(0,0,0, .5)"

    },
    flatlist:{
        marginTop: 10
    },
    arrowButton:{
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: -14,
    },
    ScrollView:{
        maxHeight: 200,
    },
    borderBottom:{
        borderBottomColor: "#107DC5",
        borderBottomWidth: 1,
    },
    label:{
        paddingLeft: 20,
        marginVertical: 5,
        fontSize: 10,
        textTransform: "uppercase",
      }
});

export default SelectInput;
