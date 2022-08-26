import React, { useState, useEffect, useRef } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { ActivityIndicator, Platform, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux'
import { toolkitStore, persistor } from './reduxToolkit/store'
import AppLoading from 'expo-app-loading'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'

import SignupPage from './pages/SignupPage'
import SettingsPage from './pages/SettingsPage'
import { useFonts } from 'expo-font'
import CreateProfilePage from './pages/CreateProfilePage'
import ExperiencePage from './pages/ExperiencePage'
import LanguagePage from './pages/LanguagePage'
import BankPage from './pages/BankPage'
import ClientSignupPage from './pages/ClientSignupPage'
import Navbar from './components/Navbar'
import JobsPage from './pages/JobsPage'
import JobListPage from './pages/JobListPage'
import JobseekerDashboard from './pages/JobseekerDashboard'
import NotificationsPage from './pages/NotificationsPage'
import FreelanceAcceptedPage from './pages/FreelanceAcceptedPage'
import FreelancerDetailsPage from './pages/FreelancerDetailsPage'
import JobDonePage from './pages/JobDonePage'
import JobPostingPage from './pages/JobPostingPage'
import PaymentPage from './pages/PaymentPage'
import LoginJobseeker from './pages/LoginJobseeker'
import JobContractPage from './pages/JobContractPage'
import JobSeekersignup from './pages/JobSeekersignup'
import ClientDashboard from './pages/ClientDashboard'

import JobDetailsPage from './pages/JobDetailsPage'
import JobSeekersignup2 from './pages/JobSeekersignup2'
import * as Sentry from '@sentry/react-native'
import FreelancerProfile from './pages/FreelancerProfile'
import ClientProfile from './pages/ClientProfile'
import ContactForm from './pages/ContactForm'
import JobDetailsPage_Client from './pages/JobDetailsPage_Client'
import ContactFreelancerPage from './pages/ContactFreelancerPage'
import EditClientProfile from './pages/EditClientProfile'
import UpdatePasswordPage from './pages/UpdatePasswordPage'
import DeleteAccountPage from './pages/DeleteAccountPage'
import JobContractPageFreelancer from './pages/JobContractPageFreelancer';
import ContactCompanyPage from './pages/ContactCompanyPage';
import OtpInputs from './components/OtpInputs';



Sentry.init({
  dsn: "https://bcf01992e9f248daa3e02179837016a2@o1345605.ingest.sentry.io/6625163",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  enableNative: false
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),

});
const handleNotification = async notification => {
  console.log("notification", notification)                                                                                    
  if (notification.remote) {
    const notificationId = Notifications.presentLocalNotificationAsync({      
      title: "Follow @technoplato",  
      body: "To learn yourself goodly (also follow PewDiePie)",                                             
      ios: { _displayInForeground: true } // <-- HERE'S WHERE THE MAGIC HAPPENS                                
    });                                                                       
  }                                                   
};  


function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
 
  const Stack = createNativeStackNavigator()
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  useEffect(() => {
    
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken("token",token)
    }).catch(err => console.log("error notification", err));
    // This listener is fired whenever a notification is received while the app is foregrounded
    // Notifications.presentNotificationAsync({
    //   title: 'Welcome',
    //   // body: "I'm so proud of myself!",
    // });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      console.log("notifcation", notification)
    });
 
    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log( "response taped", response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [lastNotificationResponse]);
  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return; 
      }
      token = (await Notifications.getExpoPushTokenAsync({experienceId:'@melhemdirani/mawaheb'})).data;
    } 
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    return token;
  }
  const [loaded] = useFonts({
    PoppinsR: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsB: require('./assets/fonts/Poppins-Bold.ttf'),
    PoppinsL: require('./assets/fonts/Poppins-Light.ttf'),
    PoppinsS: require('./assets/fonts/Poppins-SemiBold.ttf'),
  })

  return !loaded ?
  <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
    <ActivityIndicator size={"large"} />
  </View>

  :(

    <Provider store={toolkitStore} screenOptions={{headerShown: false}}>
      <PersistGate persistor={persistor} loading={null}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='SignIn'
            component={SignupPage}
            options={{
              headerShown: false
            }}
          />
             <Stack.Screen
            name='otp'
            component={OtpInputs}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name='JobSignUp2'
            component={CreateProfilePage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='JobSignUp'
            component={JobSeekersignup}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='JobSignUpb'
            component={JobSeekersignup2}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='experience'
            component={ExperiencePage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='language'
            component={LanguagePage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='bank'
            component={BankPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='jobseeker_jobs'
            component={JobsPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='login'
            component={LoginJobseeker}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='contact'
            component={ContactForm}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='seeker_dash'
            component={JobseekerDashboard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='notifications'
            component={NotificationsPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='settings'
            component={SettingsPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='recruiter_signup'
            component={ClientSignupPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='recruiter_dashboard'
            component={ClientDashboard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='recruiter_Jobs'
            component={JobListPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='jobPosting'
            component={JobPostingPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='payment'
            component={PaymentPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='freelancerDetails'
            component={FreelancerDetailsPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='acceptContract'
            component={JobContractPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='acceptContractFreelancer'
            component={JobContractPageFreelancer}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='acceptedClient'
            component={FreelanceAcceptedPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='jobDoneClient'
            component={JobDonePage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='jobDescription'
            component={JobDetailsPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='jobDescriptionClient'
            component={JobDetailsPage_Client}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='freelancerProfile'
            component={FreelancerProfile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='clientProfile'
            component={ClientProfile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='contactFreelancer'
            component={ContactFreelancerPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='contactClient'
            component={ContactCompanyPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='editProfileClient'
            component={EditClientProfile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='updatePass'
            component={UpdatePasswordPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='deletePage'
            component={DeleteAccountPage}
            options={{
              headerShown: false,
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
      </PersistGate>
    </Provider>

  )
}

export default Sentry.wrap(App);