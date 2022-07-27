import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

export default function SignupPage() {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>SignupPage</Text>
        <PrimaryButton title="Contact Ahmad"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color: "black",
  }
});
