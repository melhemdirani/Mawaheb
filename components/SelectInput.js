
import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, FlatList, Image} from 'react-native';


import {Picker} from '@react-native-picker/picker';

const SelectInput = ({title, list, onSelect}) => {

    const [selected, setSelected] = useState(null)
    const [showList, setShowList] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState();

    const onItemClick = (item) => {
        setSelected(item)
        setShowList(false)
    }

    const RenderItem = ({ data }) => (
        <Pressable style={styles.listItems} onPress={() => onItemClick(data)}>
            <Text style={styles.listText} onPress={() => onSelect(data)}>
                {data}
            </Text>
        </Pressable>
      
    );
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={selected ? styles.text2 : styles.text}>{selected === null ? title : selected}</Text>
                <Pressable onPress={() => setShowList(!showList)} style={styles.arrowButton}>
                    <Image
                        style={showList ? [styles.image, styles.rotate] : styles.image}
                        source={require('../assets/images/Vector.png')}
                    />
                </Pressable>
               
            </View>
           
            {   showList &&
                list.map((item, i) => 
                    <RenderItem 
                        data={item} 
                        style={styles.flatlist}
                        key={i}
                    />
                )
             
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width: "85%",
        marginBottom: 20,
    },
    rotate:{
        transform: [{rotate: '180deg'}]
    },  
    subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(202, 218, 221, .2)",
    height: 50,
    borderBottomColor: "#107DC5",
    borderBottomWidth: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    },
    text: {
        paddingLeft: 20,
        color: "rgba(0,0,0, .5)"
    },
 
    text2: {
        paddingLeft: 20,
        color: "rgba(0,0,0, 1)"
    },
 
    listItems:{
        backgroundColor: "rgba(202, 218, 221, .2)",
    },
    listText:{
        marginLeft: 20,
        marginTop: 5,
        marginBottom: 5,
        color: "rgba(0,0,0, .5)"

    },
    flatlist:{
        marginTop: 10
    },
    arrowButton:{
        padding: 20
    }
});

export default SelectInput;
