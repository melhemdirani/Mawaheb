import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import SecondaryButton from '../components/Buttons/SecondaryButton';
import TertiaryButton from '../components/Buttons/TertiaryButton';
import Inputs from '../components/Inputs';
import SelectInput from '../components/SelectInput';
import UploadCard from '../components/UploadCard';

export default function SignupPage() {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>SignupPage</Text>
        <SecondaryButton title="Contact Ahmad"/>
        <PrimaryButton title="Continue to Payment"/>
        <TertiaryButton title="Continue to Payment"/>
        <UploadCard title="Continue to Payment"/>
        <Inputs title="Continue to Payment" placeholder="First Name"/>
        <SelectInput title="Continue to Payment" placeholder="First Name"/>
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
