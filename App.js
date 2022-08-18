import React, { useMemo } from 'react'
import { ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { toolkitStore } from './reduxToolkit/store'

import LandingPage from './pages/LandingPage'
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


Sentry.init({
  dsn: "https://bcf01992e9f248daa3e02179837016a2@o1345605.ingest.sentry.io/6625163",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  enableNative: false
});

const Stack = createNativeStackNavigator()
function App() {

  const [loaded] = useFonts({
    PoppinsR: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsB: require('./assets/fonts/Poppins-Bold.ttf'),
    PoppinsL: require('./assets/fonts/Poppins-Light.ttf'),
    PoppinsS: require('./assets/fonts/Poppins-SemiBold.ttf'),
  })



  return !loaded ?
  <ActivityIndicator size={'large'} />
  : (

    <Provider store={toolkitStore} screenOptions={{headerShown: false}}>
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  )
}

export default Sentry.wrap(App);