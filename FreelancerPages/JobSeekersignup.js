import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useSelector, useDispatch } from "react-redux";
import { StackActions } from "@react-navigation/native";

import signUp from "../assets/images/signUp.png";
import { validate } from "react-email-validator";
import { testRegister, updateUser } from "../reduxToolkit/userSlice";

import Header from "../components/Header";
import Inputs from "../components/Inputs";

import { listofCities, countryList } from "../assets/data/RolesList";

import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

import PrimaryButton from "../components/Buttons/PrimaryButton";
import PhoneInputs from "../components/PhoneInput";
import UploadCard from "../components/UploadCard";
import ImageCard from "../components/ImageCard";
import SelectInput from "../components/SelectInput";
import { handleChange } from "../reduxToolkit/freelancerSlice";

const JobSeekersignup = ({ navigation, route }) => {
  const { role, update } = route.params;

  const { user, token } = useSelector((store) => store.user);
  const { freelancer } = useSelector((store) => store.freelancer);
  console.log("freelancer", freelancer);

  const [uploaded, setUploaded] = useState(
    update && user.profileImage !== "" ? true : false
  );
  const [activity, setActivity] = useState(false);
  const [password2, setPassword2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [changedValues, setChangedValues] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(user.profileImage);
  const [image, setImage] = useState(
    update ? `http://195.110.58.234:4000${user.profileImage}` : ""
  );

  let initialState = !update
    ? {
        name: "",
        lastName: "",
        email: "",
        password: "",
        phoneNb: "",
        profileImage: "",
        location: "",
        nationality: "",
        arabicName: "",
        middleName: "",
      }
    : {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        phoneNb: user.phoneNb,
        profileImage: user.profileImage,
        location: user.location,
        nationality: freelancer.nationality ? freelancer.nationality : "",
        arabicName: freelancer.arabicName ? freelancer.arabicName : "",
        middleName: freelancer.middleName ? freelancer.middleName : "",
      };

  const [values, setValues] = useState(initialState);
  useEffect(() => {
    if (update) setValues(initialState);
  }, [route]);
  const dispatch = useDispatch();

  const handleChanges = (name, value) => {
    setChangedValues(true);
    setValues({ ...values, [name]: value });
  };

  const navigateNext = () => {
    navigation.dispatch(StackActions.replace("JobSignUpb", { update }));
  };
  const navigateUpdate = () => {
    navigation.navigate("JobSignUpb", { update });
  };

  const navigateOtp = () => {
    navigation.dispatch(StackActions.replace("otp", { update }));
  };
  const containsNumbers = (str) => {
    return /\d/.test(str);
  };
  const submit = () => {
    const {
      name,
      email,
      password,
      phoneNb,
      middleName,
      nationality,
      arabicName,
    } = values;
    if (password !== password2 && !update) {
      return alert("Error, passwords don't match!");
    }
    if (!name || !email || (!update && !password) || !phoneNb || !middleName) {
      return alert("Please fill all the fields");
    }
    if (activity) {
      alert("Please white while we upload your profile photo");
    }
    if (!validate(email)) {
      return alert("Please enter a valid email address");
    } else if (password.length < 8 || !containsNumbers(values.password)) {
      return alert(
        "Password must be at least 8 characters with 1 upper case letter and 1 number"
      );
    }
    dispatch(
      handleChange({
        name: "middleName",
        value: middleName,
      })
    );
    dispatch(
      handleChange({
        name: "arabicName",
        value: arabicName,
      })
    );
    dispatch(
      handleChange({
        name: "nationality",
        value: nationality,
      })
    );
    if (update) {
      if (changedValues || update) {
        console.log("updating");
        console.log({
          name: values.name,
          lastName: values.lastName,
          email: values.email.toLocaleLowerCase(),
          phoneNb: values.phoneNb,
          role: "freelancer",
          location: values.location,
          profileImage: uploadedImage,
          userId: update ? user.userId : user.userId.id,
          notificationToken: token,
        });
        setIsLoading(true);
        dispatch(
          updateUser({
            name: values.name,
            lastName: values.lastName,
            email: values.email.toLocaleLowerCase(),
            phoneNb: values.phoneNb,
            role: "freelancer",
            location: values.location,
            profileImage: uploadedImage,
            userId: update ? user.userId : user.userId.id,
            notificationToken: token,
          })
        )
          .unwrap()
          .then((response) => {
            console.log("new user", response);
            setIsLoading(false);
            navigateNext();
            setChangedValues(false);
          })
          .catch((error) => {
            console.log("error updating", error);
            console.log("missing", values);
            setIsLoading(false);
          });
      } else {
        console.log("navigating no updates");
        setChangedValues(false);
        navigateNext();
      }
    } else if (!update) {
      setIsLoading(true);
      dispatch(
        testRegister({
          name: values.name,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          phoneNb: values.phoneNb,
          role: role,
          profileImage: uploadedImage,
          location: values.location,
        })
      )
        .unwrap()
        .then((response) => {
          setChangedValues(false);
          setIsLoading(false);
          navigateOtp();
        })
        .catch((error) => {
          if (error === "Email already in use") {
            alert(
              "This email is already in use, please register using another email address"
            );
          } else {
            alert("Error registering");
          }
          console.log("error", error);
          setIsLoading(false);
        });
    } else {
      alert("none");
    }
  };

  const selectFile = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setActivity(true);
      setImage(result?.assets[0]?.uri);
      upload(result?.assets[0]?.uri);
    }
  };
  const upload = async (uri) => {
    console.log("uploading", uri);
    try {
      const response = await FileSystem.uploadAsync(
        `http://195.110.58.234:4000/api/v1/auth/uploadImage/`,
        uri,
        {
          fieldName: "files",
          httpMethod: "post",
          uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
        }
      );
      const img = JSON.parse(response.body).imageUrl;
      console.log("uploading response", response.body);
      setUploadedImage(img);
      setChangedValues(true);
      setUploaded(true);
      setActivity(false);
    } catch (error) {
      console.log("error uploading", error);
      setUploaded(false);
      alert("Error uploading");
    }
  };
  const onImageDelete = () => {
    setUploaded(false);
    setImage("");
    activity && setActivity(false);
    setUploadedImage("");
  };
  const goBack = () => {
    navigation.dispatch(StackActions.replace("SignIn"));
  };

  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

  return isLoading ? (
    <View style={styles.loadingStyle}>
      <ActivityIndicator size={"large"} />
    </View>
  ) : (
    <View style={styles.container}>
      <KeyboardAvoidingWrapper>
        <>
          <Header
            icon={signUp}
            title={update ? "Update profile" : "Create profile"}
            // numOfPage={<Image source={trash}></Image>}
            numOfPage="1/6"
            hidden={false}
            goBack={goBack}
          />
          <View style={styles.subContainer}>
            {!update && (
              <Text style={styles.text}>
                Create and verify your profile in less than 2 minutes. Fill in
                your name and upload a picture of your passport, ID, and Visa.
              </Text>
            )}
            {image.length && !uploaded ? (
              <View style={{ width: "100%", alignItems: "center" }}>
                <View style={styles.ActivityIndicator}>
                  <ActivityIndicator size={"large"} />
                </View>
                <Image source={{ uri: image }} style={styles.Imagecontainer} />
              </View>
            ) : image.length && uploaded ? (
              <ImageCard uri={image} onImageDelete={onImageDelete} />
            ) : (
              <UploadCard title="Profile Picture" selectFile={selectFile} />
            )}
            <Inputs
              placeholder="First Name*"
              onChange={(value) => handleChanges("name", value)}
              value={values.name}
            />
            <Inputs
              placeholder="Middle Name*"
              onChange={(value) => handleChanges("middleName", value)}
              value={values.middleName}
            />
            <Inputs
              placeholder="Last Name*"
              onChange={(value) => handleChanges("lastName", value)}
              value={values.lastName}
            />
            <Inputs
              placeholder="Full Name In Arabic (optional)"
              onChange={(value) => handleChanges("arabicName", value)}
              value={values.arabicName}
            />
            <Inputs
              placeholder="Email*"
              onChange={(value) =>
                handleChanges("email", value.toLocaleLowerCase())
              }
              value={values.email}
            />
            <SelectInput
              title="Nationality*"
              onSelect={(value) => handleChanges("nationality", value)}
              list={countryList}
              value={values.nationality}
              valued
            />
            {!update && (
              <Inputs
                placeholder="Password*"
                onChange={(value) => handleChanges("password", value)}
                value={values.password}
              />
            )}
            {!update &&
              values?.password !== "" &&
              (values?.password?.length < 8 ||
                !containsNumbers(values.password)) && (
                <Text style={styles.warning}>
                  Password must be at least 8 characters with 1 upper case
                  letter and 1 number
                </Text>
              )}
            {!update && (
              <Inputs
                placeholder="Confirm Password*"
                onChange={(e) => setPassword2(e)}
                value={password2}
              />
            )}
            {values.password !== password2 && password2 !== "" && (
              <Text style={styles.warning}>passwords don't match</Text>
            )}
            <SelectInput
              title="Location*"
              onSelect={(value) => handleChanges("location", value)}
              list={listofCities}
              value={values.location}
              valued
            />
            <PhoneInputs
              placeholder="Phone Number*"
              onChange={(value) => handleChanges("phoneNb", value)}
              value={values.phoneNb}
            />

            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => submit()}
            >
              <PrimaryButton title={"Next"} activity={activity} />
            </TouchableOpacity>
            {update && (
              <TouchableOpacity onPress={() => navigateUpdate()}>
                <Text style={styles.skipText}>SKIP</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      </KeyboardAvoidingWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  Imagecontainer: {
    justifyContent: "center",
    height: 230,
    width: "85%",
    borderRadius: 20,
    marginVertical: 10,
  },
  subContainer: {
    alignItems: "center",
    paddingTop: 50,
  },
  text: {
    width: "70%",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 15,
    color: "rgba(0,0,0,0.6)",
  },
  nextButton: {
    paddingVertical: 40,
  },
  loadingStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  ActivityIndicator: {
    position: "absolute",
    zIndex: 999,
    alignItems: "center",
    justifyContent: "center",
    height: 230,
    backgroundColor: "rgba(255,255,255,.8)",
    width: "85%",
    marginVertical: 10,
  },
  skipText: {
    fontFamily: "PoppinsS",
    fontSize: 15,
    marginTop: -25,
    marginBottom: 80,
    letterSpacing: 2,
  },
  warning: {
    alignSelf: "flex-end",
    marginTop: -10,
    marginBottom: 10,
    right: 30,
    color: "#BE3142",
    fontSize: 10,
    maxWidth: "90%",
  },
});

export default JobSeekersignup;
