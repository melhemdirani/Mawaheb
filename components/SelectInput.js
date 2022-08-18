
import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, ScrollView, Image} from 'react-native';


import {Picker} from '@react-native-picker/picker';

const SelectInput = ({title, list, onSelect, value, valued, setIndex, role, languages, already}) => {

    const [selected, setSelected] = useState(valued ? value : "")
    const [showList, setShowList] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState();

    const onItemClick = (item, index) => {
        if(!valued){setSelected(item)}
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
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={selected || value ? styles.text2 : styles.text}> {(valued ? value === "" : selected === "") ? title : valued ? value : selected}</Text>
                <Pressable onPress={() => setShowList(!showList)} style={styles.arrowButton}>
                    <Image
                        style={showList ? [styles.image, styles.rotate] : styles.image}
                        source={require('../assets/images/Vector.png')}
                    />
                </Pressable>
               
            </View>
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
                : showList && list && list.length && !languages 
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
            {already && <Text style={{color: "#BE3142"}}>already chosen {value}</Text>}
           
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
        color: "rgba(0,0,0, .5)",
        fontFamily: "PoppinsR"
    },
 
    text2: {
        paddingLeft: 20,
        color: "rgba(0,0,0, 1)",
        fontFamily: "PoppinsR"
    },
 
    listItems:{
        backgroundColor: "rgba(202, 218, 221, .2)",
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
        padding: 20
    },
    ScrollView:{
        maxHeight: 200,
    }
});

export default SelectInput;
