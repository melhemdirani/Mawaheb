
import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';

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

            <View style={styles.subContainer}>
                <Text 
                    style={selected || value ? styles.text2 : styles.text}> 
                    {(valued && value !== "" ) ? value : selected !== "" ? selected : title}
                </Text>
                <Pressable 
                    onPress={() => setShowList(!showList)} 
                    style={
                        selected !== "" && !showList
                        ? styles.arrowButton
                        : [styles.arrowButton, {marginTop: 5}]
                    }
                >
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
    container:{
        width: "85%",
        marginBottom: 20,
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
