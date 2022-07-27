import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View, ScrollView } from 'react-native';
import AddRoleButton from '../components/Buttons/AddRoleButton';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import SecondaryButton from '../components/Buttons/SecondaryButton';
import TertiaryButton from '../components/Buttons/TertiaryButton';
import DailyRate from '../components/DailyRate';
import DurationInputs from '../components/DurationInputs';
import Inputs from '../components/Inputs';
import Notification from '../components/Notification';
import SelectInput from '../components/SelectInput';
import TextArea from '../components/TextArea';
import UploadCard from '../components/UploadCard';

export default function SignupPage() {
  return (
    <View style={styles.container}>
      {/* <SecondaryButton title="Contact Ahmad"/>
      <PrimaryButton title="Continue to Payment"/>
      <TertiaryButton title="Continue to Payment"/>
      <AddRoleButton title="Add another role"/>
      <UploadCard title="Continue to Payment"/>
      <Inputs title="Continue to Payment" placeholder="First Name"/>
      <DailyRate title="Continue to Payment" placeholder="First Name"/>
      <DurationInputs title="Continue to Payment" placeholder="First Name"/>
      <TextArea title="Continue to Payment" placeholder="First Name"/>
      <SelectInput title="Continue to Payment" placeholder="First Name" list={["option1", "option2", "option3"]}/> */}
      <Notification title="Notification lorem ipsum dolor sit ameno" color="#31BEBB"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100
  },
  text:{
    color: "black",
  }
});
