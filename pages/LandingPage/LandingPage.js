import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native';

export default function LandingPage() {
  return (
    <ImageBackground style={ styles.container } 
      resizeMode='cover' 
      source={require('../../assets/backgroundColors.png')}

    >
      <ImageBackground style={ styles.bgImage2 } 
        resizeMode='cover' 
        source={require('../../assets/background1.png')}
      >
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require('../../assets/mawaheb_logo.png')}
          />
          <Text style={styles.text}>© 2022 Mawahib. All rights reserved.</Text>
          <Text style={styles.text2}>Powered by Reboost</Text>
          <StatusBar style="auto" />
        </View>
      </ImageBackground>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bgImage2:{
    flex: 1,
    width: "100%"
  },
  text:{
    color: "white",
    marginBottom: '3%'
  },
  text2:{
    color: "white",
    marginBottom: '15%'

  },
  logo:{
    marginBottom: '70%'
  }
});
