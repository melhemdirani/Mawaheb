import React, { useState, useEffect, useRef } from 'react';

import * as Linking from 'expo-linking';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as Notifications from 'expo-notifications';

import SignupPage from './pages/SignupPage'
import SettingsPage from './pages/SettingsPage'
import CreateProfilePage from './pages/CreateProfilePage'
import ExperiencePage from './pages/ExperiencePage'
import LanguagePage from './pages/LanguagePage'
import BankPage from './pages/BankPage'
import ClientSignupPage from './pages/ClientSignupPage'
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
import ResetPassword from './pages/ResetPassword';




Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function AppContainer() {


    const Stack = createNativeStackNavigator()
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const prefix = Linking.createURL('/');
  
    const URL_A =  `${prefix}notifications`

    function navigate() {
        Linking.openURL(URL_A)
    }
  

    useEffect(() => {
        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
        navigate()
        // axios.post('http://195.110.58.234:4000/api/v1/test/noti',
        // {noti: notification}
        // ).then().catch(err => {
        //     console.log("error", err)
        // })

        // navigate to the destination
        });
        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response.notification.request.content.body);
            // axios.post('http://195.110.58.234:4000/api/v1/test/noti',
            // {noti: response}
            // ).then().catch(err => {
            // console.log("error", err)
            // })
            navigate()

        
        });
        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);


    return (
        <Stack.Navigator>
            
            <Stack.Screen
            name='SignIn'
            component={SignupPage}
            options={{
                headerShown: false
            }}
            />
            <Stack.Screen
            name='passwordReset'
            component={ResetPassword}
            options={{
                headerShown: false,
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
    )
}

export default AppContainer;