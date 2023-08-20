import React, { useState, useEffect, useRef } from "react";

import * as Linking from "expo-linking";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";

import SettingsPage from "./pages/SettingsPage";
import NotificationsPage from "./pages/NotificationsPage";
import LoginJobseeker from "./pages/LoginJobseeker";
import ContactForm from "./pages/ContactForm";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
import DeleteAccountPage from "./pages/DeleteAccountPage";
import OtpInputs from "./components/OtpInputs";
import ResetPassword from "./pages/ResetPassword";

import SignupPage from "./FreelancerPages/SignupPage";
import FreelancerProfile from "./FreelancerPages/FreelancerProfile";
import FreelancerDetailsPage from "./FreelancerPages/FreelancerDetailsPage";
import FreelanceAcceptedPage from "./FreelancerPages/FreelanceAcceptedPage";
import BankPage from "./FreelancerPages/BankPage";
import ExperiencePage from "./FreelancerPages/ExperiencePage";
import LanguagePage from "./FreelancerPages/LanguagePage";
import JobsPage from "./FreelancerPages/JobsPage";
import JobseekerDashboard from "./FreelancerPages/JobseekerDashboard";
import JobSeekersignup from "./FreelancerPages/JobSeekersignup"; // 1/6
import JobDetailsPage from "./FreelancerPages/JobDetailsPage";
import JobSeekersignup2 from "./FreelancerPages/JobSeekersignup2"; // 2/6
import ContactCompanyPage from "./FreelancerPages/ContactCompanyPage";
import JobContractPageFreelancer from "./FreelancerPages/JobContractPageFreelancer";
import CreateProfilePage from "./FreelancerPages/CreateProfilePage"; // 3/6

import ClientDashboard from "./ClientPages/ClientDashboard";
import ClientProfile from "./ClientPages/ClientProfile";
import JobContractPage from "./ClientPages/JobContractPage";
import ClientSignupPage from "./ClientPages/ClientSignupPage";
import JobDetailsPage_Client from "./ClientPages/JobDetailsPage_Client";
import JobDonePage from "./ClientPages/JobDonePage";
import PaymentPage from "./ClientPages/PaymentPage";
import JobPostingPage from "./ClientPages/JobPostingPage";
import ContactFreelancerPage from "./ClientPages/ContactFreelancerPage";
import EditClientProfile from "./ClientPages/EditClientProfile";
import JobListPage from "./ClientPages/JobListPage";
import CreateClientPage from "./ClientPages/CreateClientPage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function AppContainer() {
  const Stack = createNativeStackNavigator();
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const prefix = Linking.createURL("/");

  const URL_A = `${prefix}notifications`;

  function navigate() {
    Linking.openURL(URL_A);
  }

  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        navigate();
        // axios.post('http://195.110.58.234:4000/api/v1/test/noti',
        // {noti: notification}
        // ).then().catch(err => {
        //     console.log("error", err)
        // })

        // navigate to the destination
      });
    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response.notification.request.content.body);
        // axios.post('http://195.110.58.234:4000/api/v1/test/noti',
        // {noti: response}
        // ).then().catch(err => {
        // console.log("error", err)
        // })
        navigate();
      });
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignupPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="passwordReset"
        component={ResetPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="otp"
        component={OtpInputs}
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
        name="JobSignUpb"
        component={JobSeekersignup2}
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
        name="contact"
        component={ContactForm}
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
        component={CreateClientPage}
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
        name="acceptContractFreelancer"
        component={JobContractPageFreelancer}
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
      <Stack.Screen
        name="jobDescription"
        component={JobDetailsPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="jobDescriptionClient"
        component={JobDetailsPage_Client}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="freelancerProfile"
        component={FreelancerProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="clientProfile"
        component={ClientProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="contactFreelancer"
        component={ContactFreelancerPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="contactClient"
        component={ContactCompanyPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="editProfileClient"
        component={EditClientProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="updatePass"
        component={UpdatePasswordPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="deletePage"
        component={DeleteAccountPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="clientsignup2"
        component={ClientSignupPage}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default AppContainer;
