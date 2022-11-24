import React, { useEffect } from 'react';
import * as Linking from 'expo-linking';
import { initStripe } from '@stripe/stripe-react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { ActivityIndicator, View, StatusBar } from 'react-native';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { toolkitStore, persistor } from './reduxToolkit/store';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';
import { useFonts } from 'expo-font'
import * as Sentry from '@sentry/react-native'

import AppContainer from './AppContainer';




Sentry.init({
  dsn: "https://bcf01992e9f248daa3e02179837016a2@o1345605.ingest.sentry.io/6625163",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  // enableNative: false
});


const prefix = Linking.createURL('/');

function App() {
  console.log("prefix", prefix)
  const config = {
    screens:{
      notifications: "notifications"
    }
  }
  console.log("perfix", prefix)
  const linking = {
    prefixes: [prefix],
    config
  };

  const navigationRef = createNavigationContainerRef()


  useEffect(() => {
    initStripe({
      publishableKey: "pk_test_51LNgzpL3Oi9cGlpnLiMoA82Evd2j6Ua1UBhIsqSVxyisutC3RxMBhyhGNXcL5Y3yCuqzgXCoiahjnS4RZQqtO8g400GToPoRvh",
    });
  }, [])
 
  const [loaded] = useFonts({
    PoppinsR: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsB: require('./assets/fonts/Poppins-Bold.ttf'),
    PoppinsL: require('./assets/fonts/Poppins-Light.ttf'),
    PoppinsS: require('./assets/fonts/Poppins-SemiBold.ttf'),
  })


  return !loaded ?
  <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
  <ActivityIndicator size={"large"} color="#4E84D5"/>
  </View>

  :(
    <>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <StripeProvider
        publishableKey="pk_test_51LNgzpL3Oi9cGlpnLiMoA82Evd2j6Ua1UBhIsqSVxyisutC3RxMBhyhGNXcL5Y3yCuqzgXCoiahjnS4RZQqtO8g400GToPoRvh"
      >
        <Provider store={toolkitStore} screenOptions={{headerShown: false}}>
          <PersistGate persistor={persistor} loading={null}>
          <NavigationContainer ref={navigationRef} linking={linking}>
          <AppContainer />
          </NavigationContainer>
          </PersistGate>
        </Provider>
      </StripeProvider>
    </>

  )
}

export default Sentry.wrap(App);