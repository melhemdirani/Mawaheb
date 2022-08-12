import React from 'react'
import {
    View,
    StyleSheet,
    Image,
    Pressable,
  } from 'react-native';
import DeleteButton2 from './Buttons/DeleteButton2';

function ImageCard({uri, onImageDelete}) {
  return uri.length &&(
    <View style={{width: "100%", alignItems: "center"}}>
        <Image source={{uri:uri}} style={styles.Imagecontainer} />
        <Pressable style={styles.deletebutton} onPress={() => onImageDelete()}>
            <DeleteButton2 title="X" />
        </Pressable>
  </View>
  )
}
const styles = StyleSheet.create({
    Imagecontainer: {
      justifyContent: "center",
      height: 230,
      width: "85%",
      borderRadius: 20,
      marginVertical: 10
    },
    subContainer: {
      alignItems: 'center',
      paddingTop: 50,
    },
    deletebutton:{
      position: "absolute",
      top: 20,
      right: 40
    }
  });
  
export default ImageCard
