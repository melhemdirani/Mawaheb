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
import JobDonePage from './pages/JobDonePage';
import JobPostingPage from './pages/JobPostingPage';
import PaymentPage from './pages/PaymentPage';
import LoginJobseeker from './pages/LoginJobseeker';
import JobSeekersignup from './pages/JobSeekersignup';
import ClientDashboard from './pages/ClientDashboard';

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
    <NavigationContainer>
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
      </Stack.Navigator>
   
    </NavigationContainer>
  )
}
