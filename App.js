import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import SettingsPage from './pages/SettingsPage';
import { useFonts } from 'expo-font';
import CreateProfilePage from './pages/CreateProfilePage';
import ExperiencePage from './pages/ExperiencePage';
import LanguagePage from './pages/LanguagePage';
import BankPage from './pages/BankPage';
import ClientSignupPage from './pages/ClientSignupPage';
import Navbar from './components/Navbar';
import JobsPage from './pages/JobsPage';
import JobListPage from './pages/JobListPage';
import JobseekerDashboard from './pages/JobseekerDashboard';
import NotificationsPage from './pages/NotificationsPage';
import FreelanceAcceptedPage from './pages/FreelanceAcceptedPage';
import FreelancerDetailsPage from './pages/FreelancerDetailsPage';
import JobDonePage from './pages/JobDonePage';
import JobPostingPage from './pages/JobPostingPage';
import PaymentPage from './pages/PaymentPage';
import LoginJobseeker from './pages/LoginJobseeker';
import JobContractPage from './pages/JobContractPage';
import JobSeekersignup from './pages/JobSeekersignup';
import ClientDashboard from './pages/ClientDashboard';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NotifierWrapper } from 'react-native-notifier';

const Stack = createNativeStackNavigator()

export default function App() {
  const [loaded] = useFonts({
    PoppinsR: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsB: require('./assets/fonts/Poppins-Bold.ttf'),
    PoppinsL: require('./assets/fonts/Poppins-Light.ttf'),
    PoppinsS: require('./assets/fonts/Poppins-SemiBold.ttf'),
  })

  if (!loaded) {
    return <ActivityIndicator size={'large'} />
  }

  return (
  <Provider store={store}>
    <NotifierWrapper>
      <NavigationContainer>
        <PersistGate persistor={persistor}>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={LandingPage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignupPage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="JobSignUp2"
              component={CreateProfilePage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="JobSignUp"
              component={JobSeekersignup}
              options={{
                headerShown: false,
            }}
            />
            <Stack.Screen
              name="experience"
              component={ExperiencePage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="language"
              component={LanguagePage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="bank"
              component={BankPage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="jobseeker_jobs"
              component={JobsPage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="login"
              component={LoginJobseeker}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="seeker_dash"
              component={JobseekerDashboard}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="notifications"
              component={NotificationsPage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="settings"
              component={SettingsPage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="recruiter_signup"
              component={ClientSignupPage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="recruiter_dashboard"
              component={ClientDashboard}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="recruiter_Jobs"
              component={JobListPage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="jobPosting"
              component={JobPostingPage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="payment"
              component={PaymentPage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="freelancerDetails"
              component={FreelancerDetailsPage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="acceptContract"
              component={JobContractPage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="acceptedClient"
              component={FreelanceAcceptedPage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="jobDoneClient"
              component={JobDonePage}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </PersistGate>
      </NavigationContainer>
    </NotifierWrapper>
  </Provider>

  )
}
