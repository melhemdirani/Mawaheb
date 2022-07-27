import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';

const UploadCard = ({title}) => {

  return (
    <View style={styles.container}>
        <ImageBackground style={ styles.backgroundImage } 
            resizeMode='stretch' 
            source={require('../assets/images/uploadCard2.png')}
        >
          
        <Image
            style={styles.card}
            source={require('../assets/images/uploadCard.png')}
        />
        <View style={styles.add}>
            <Image
                source={require('../assets/images/addButton.png')}
            />
            <Text style={styles.title}>
                {title}
            </Text>
        </View>

      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    height: 230,
    width: "90%",
    borderRadius: 20,
  },
  add:{
    position: "absolute",
    zIndex: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  title:{
    marginTop: 10
  },
  backgroundImage:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card:{
    marginBottom: 15,
  },

});

export default UploadCard;