import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Switch,
    Pressable,
    TouchableOpacity
  } from 'react-native';

  import Inputs from '../components/Inputs';
  import UploadCard from '../components/UploadCard';
  import PrimaryButton from '../components/Buttons/PrimaryButton';

  import Header from '../components/Header';
  import payment from '../assets/images/paymentIcon.png';
  import checked from '../assets/images/checked.png';
  import unChecked from '../assets/images/unChecked.png';

  
  const PaymentPage = ({navigation}) => {
    const [isEnabled, setIsEnabled] = useState(false)
    const [card, setCard] = useState(true)
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

    const onPostClick = () => {
      alert("Thank you! Your job was posted")
      navigation.navigate('recruiter_dashboard')
    }

    const Prepaid = () => {
        return(
            <View style={styles.PrepaidView}>
                <View style={[styles.checkContainer, styles.checkContainer2]}>
                    <Pressable style={styles.checkContainer} onPress={() => setCard(true)}>
                        <Image
                            style={styles.check}
                            source={card ? checked : unChecked}
                        />
                        <Text style={styles.checkText}>Pay With Card</Text>
                    </Pressable>
                    <Pressable style={styles.checkContainer} onPress={() => setCard(false)}>
                        <Image
                            style={styles.check}
                            source={!card ? checked : unChecked}
                        />
                        <Text style={styles.checkText}>Bank Transfer</Text>
                    </Pressable>
                </View>
                {   
                    card 
                    ? <View style={styles.PrepaidView}>
                        <Inputs placeholder='Card Number*' style={styles.input} />
                        <Inputs placeholder='Card Holder Name*' style={styles.input} />
                        <Inputs placeholder='CCV*' style={styles.input} />
                    </View>
                    : <View style={styles.PrepaidView}>
                        <Inputs placeholder='Bank Name*' style={styles.input} />
                        <Inputs placeholder='Swift Code*' style={styles.input} />
                        <Inputs placeholder='IBAN*' style={styles.input} />
                        <Inputs placeholder='Address*' style={styles.input} />
                    </View>
                }

            </View>
        )
    }
    return (
      <ScrollView style={styles.wrapper}>
        <Header 
          title='Payment Details' 
          icon={payment} 
          numOfPage='2/2'
          hidden={false}
          goBack={navigation.goBack}
        />
        <View style={styles.container}>
          <Text>Upload a PO document to finalize your job posting.</Text>
            <View style={styles.form}>
                <View style={styles.privacy}>
                    <Text style={!isEnabled ? styles.picked : styles.notPicked}>Pre-paid </Text>
                    <Switch
                    style={styles.switch}
                    ios_backgroundColor='#23CDB0'
                    trackColor={{ false: '#23CDB0', true: '#23CDB0' }}
                    thumbColor={'#f4f3f4'}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    ></Switch>
                    <Text style={isEnabled ? styles.picked : styles.notPicked}> Post-paid</Text>
                </View>
            </View>
            {
                !isEnabled ?
                <Prepaid />
                :
                <View style={[styles.PrepaidView, {paddingTop: 30}]} >
                    <UploadCard title="Upload PO Document*"/> 
                    <Inputs placeholder='Billing Address*' style={styles.input} />
                    <Inputs placeholder='Billing E-mail*' style={styles.input} />

                </View>

            }
            <TouchableOpacity style={styles.btnContainer} onPress={() => onPostClick()}>
                <PrimaryButton title='Pay and Post Job' />
            </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
  
  const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: '#fff',
      flex: 1,
    },
    PrepaidView:{
        width: "100%",
        alignItems: "center"
    },  
    checkText:{
        fontFamily: 'PoppinsR',
        fontSize: 13,
        marginLeft: 10,
        top: 3
    },
    checkContainer:{
        flexDirection: "row",
        alignSelf: "center",
        paddingVertical: 20,
    }, 
    checkContainer2:{
        justifyContent: "space-between",
        width: "85%"
    }, 
    container: {
      marginTop: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 13,
      fontFamily: 'PoppinsR',
      color: "rgba(0,0,0,.6)"
    },
    form: {
      width: '100%',
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnContainer: {
      width: '90%',
      alignItems: 'center',
      marginTop: 10,
      paddingBottom: 40
    },
    btn: {
      marginTop: 10,
    },
    btnText: {
      fontSize: 15,
      fontFamily: 'PoppinsS',
      letterSpacing: 2,
      textTransform: 'uppercase',
    },
    privacy: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '80%',
      top: -5,
      marginBottom: 8
    },
    switch: {
      transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    },
    notPicked:{
      fontFamily: "PoppinsL",
      color: "rgba(0,0,0,.5)",
      fontSize: 15
    },
    picked:{
      fontFamily: "PoppinsL",
      fontSize: 15
  
    }
  })
  
  export default PaymentPage
  