import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import TestingComponentPage from './pages/TestingComponentPage';
import { useFonts } from 'expo-font';
import CreateProfilePage from './pages/CreateProfilePage';
import ExperiencePage from './pages/ExperiencePage';
import LanguagePage from './pages/LanguagePage';
import BankPage from './pages/BankPage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    PoppinsR: require('./assets/fonts/Poppins-Regular.ttf'),  
    PoppinsB: require('./assets/fonts/Poppins-Bold.ttf'),
    PoppinsL: require('./assets/fonts/Poppins-Light.ttf'),
    PoppinsS: require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  if (!loaded) {
    return <ActivityIndicator size={'large'}/>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={BankPage}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

