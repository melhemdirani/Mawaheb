import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
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
      <Image
        style={styles.image}
        source={require('../assets/images/signupheader.png')}
      />
      <Text style={styles.header}>
        Quick Easy Simple!
      </Text>
      <Text style={styles.text}>
        <Text style={styles.text1}>
          Mawahib{" "}
        </Text>
        connects businesses with independent professionals and agencies around the MENA region.
      </Text>
      <PrimaryButton title="Jobseeker Sign up"/> 
      <View style={styles.spacing}/> 
      <SecondaryButton title="Recruiter Sign up"/>   
      <View style={styles.spacing}/> 
      <TertiaryButton title="Continue to Payment"/>    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  header:{
    position: "absolute",
    top: 88,
    alignSelf: "flex-start",
    fontSize: 40,
    fontWeight: "800",
    maxWidth: "55%",
    height: 300,
    color: "white",
    left: 15,
    lineHeight: 45,
    fontFamily: "PoppinsB"

  },
  image:{
    width: "100%",
  },
  spacing:{
    marginBottom: 15  
  },
  text:{
    color: "black",
    width: "90%",
    marginTop: 30,
    fontSize: 17,
    lineHeight: 25,
    marginBottom: 30,
    fontFamily: "PoppinsR"
  },
  text1:{
    color: "#9C88FD",
    fontWeight: "700"
  }
});
