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

export default function Melhem_Components() {
  return (
    <View style={styles.container}>
      <SecondaryButton title="Contact Ahmad"/>     {/* Violete button */}
      <PrimaryButton title="Continue to Payment"/> {/* Green background Button */}
      <TertiaryButton title="Continue to Payment"/>     {/* black and white button */}
  
      <AddRoleButton title="Add another role"/> {/* Green Button with white background */}
      <UploadCard title="Continue to Payment"/>  {/* Create account -04 */}
      <Inputs title="Continue to Payment" placeholder="First Name"/>  {/* Text input  */}
      <DailyRate title="Continue to Payment" placeholder="First Name"/> {/* Daily Rate input */}
      <DurationInputs title="Continue to Payment" placeholder="First Name"/>  {/* Role Duration input */}
      <TextArea title="Continue to Payment" placeholder="First Name"/>  {/* Text area Input  */}
      <SelectInput title="Continue to Payment" placeholder="First Name" list={["option1", "option2", "option3"]}/>  {/* Select input */}
      <Notification title="Notification lorem ipsum dolor sit ameno" color="#31BEBB"/>  {/* Notifications */}
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
