import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useDispatch, useSelector } from "react-redux";
import { createClientProfile } from "../reduxToolkit/clientSlice";
import { StackActions } from "@react-navigation/native";

import Header from "../components/Header";
import Inputs from "../components/Inputs";
import UploadCard from "../components/UploadCard";
import PrimaryButton from "../components/Buttons/PrimaryButton";

import signUp from "../assets/images/signUp.png";
import { registerUser } from "../reduxToolkit/userSlice";
import ImageCard from "../components/ImageCard";
import PhoneInputs from "../components/PhoneInput";

import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

const ClientSignupPage = ({ navigation }) => {
  const { user } = useSelector((store) => store.user);
  const { client } = useSelector((store) => store.client);
  console.log("user", user.name);
  const [uploaded, setUploaded] = useState(false);
  const [uploaded2, setUploaded2] = useState(false);
  const [activity, setActivity] = useState(false);
  const [changed, setChanged] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [startingToUpload, setStartingToUpload] = useState(false);
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [uploadedImage2, setUploadedImage2] = useState("");
  const initialState = {
    companyName: "",
    privacy: "",
    signatoryName: "",
    signatoryTitle: "",
    sign: "ffff",
    address: "",
    TRN: "",
    email: "",
    password: "",
    profileImage: "",
    phoneNb: "",
    tradingLicense: "",
  };

  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();

  const navigateLogin = () => {
    navigation.dispatch(StackActions.replace("login", { edit: false }));
  };
  useEffect(() => {
    isEnabled
      ? setValues({ ...values, privacy: "private" })
      : setValues({ ...values, privacy: "public" });
  }, [isEnabled]);

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
    setChanged(true);
  };

  const onSubmit = () => {
    const {
      companyName,
      privacy,
      signatoryName,
      signatoryTitle,
      TRN,
      address,
    } = values;
    if (privacy === "private" && (!TRN || !address || !companyName)) {
      console.log("private", values);
      return alert("Please fill all fields");
    } else if (
      privacy === "public" &&
      (!signatoryName || !signatoryTitle || !uploadedImage)
    ) {
      console.log("public", values);
      return alert("Please fill all fieldss");
    } else if (activity) {
      return alert("Uploading please wait");
    } else {
      onRegister();
    }
  };

  const onRegister = () => {
    dispatch(
      createClientProfile({
        companyName: user.name,
        privacy: values.privacy,
        signatoryName: values.signatoryName,
        signatoryTitle: values.signatoryTitle,
        TRN: parseInt(values.TRN),
        sign: uploadedImage,
        tradingLicense: uploadedImage,
        Address: values.address,
      })
    )
      .unwrap()
      .then((response) => {
        console.log("creating profile", response);
        setChanged(false);
        navigation.dispatch(StackActions.replace("recruiter_dashboard"));
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
      });
  };

  const toggleSwitch = () => {
    setUploaded(false);
    setImage("");
    setIsEnabled(!isEnabled);
  };
  const selectFile = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setStartingToUpload(true);
      setUploaded(false);
      upload(result?.assets[0]?.uri);
      setImage(result?.assets[0]?.uri);
    }
  };
  const selectFile2 = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setStartingToUpload(true);
      setUploaded2(false);
      upload2(result?.assets[0]?.uri);
      setImage2(result?.assets[0]?.uri);
    }
  };
  const upload2 = async (uri) => {
    console.log("uploading");
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
      console.log("uploading response", img);
      // setChangedValues(true)
      setActivity(false);
      setUploadedImage2(img);
      setUploaded2(true);
      setChanged(true);
    } catch (error) {
      console.log(error);
      setUploaded2(false);
      alert("Error uploading");
    }
  };
  const upload = async (uri) => {
    console.log("uploading file");
    try {
      console.log("trying");
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
      setUploadedImage(img);
      setUploaded(true);
      setChanged(true);
    } catch (error) {
      setUploaded(false);
      alert("Error uploading");
    }
  };

  const onImageDelete = () => {
    startingToUpload && setStartingToUpload(false);
    setUploaded(false);
    setUploadedImage("");
    setImage("");
  };

  const onImageDelete2 = () => {
    startingToUpload && setStartingToUpload(false);
    setUploaded2(false);
    setUploadedImage2("");
    setImage2("");
  };

  useEffect(() => {
    if (uploaded && activity) {
      setActivity(false);
    }
    if (!uploaded && !activity && startingToUpload) {
      setActivity(true);
    }
  }, [uploaded, startingToUpload]);

  const goBack = () => {
    navigation.dispatch(StackActions.replace("SignIn"));
  };

  return (
    <KeyboardAvoidingWrapper>
      <>
        <Header
          title="Client Sign Up"
          icon={signUp}
          hidden={false}
          goBack={goBack}
        />
        <View style={styles.container}>
          <Text style={styles.text}>
            All you need is to fill your information below and upload a document
            to create your profile.{" "}
          </Text>
          <View style={styles.form}>
            {image2.length && !uploaded2 ? (
              <View style={{ width: "100%", alignItems: "center" }}>
                <View style={styles.ActivityIndicator}>
                  <ActivityIndicator size={"large"} color="#4E84D5" />
                </View>
                <Image source={{ uri: image2 }} style={styles.Imagecontainer} />
              </View>
            ) : image2.length && uploaded2 ? (
              <ImageCard uri={image2} onImageDelete={onImageDelete2} />
            ) : (
              <UploadCard title="Profile Picture" selectFile={selectFile2} />
            )}
            <View style={styles.privacy}>
              <Text style={!isEnabled ? styles.picked : styles.notPicked}>
                Governmental
              </Text>
              <Switch
                style={styles.switch}
                ios_backgroundColor="#23CDB0"
                trackColor={{ false: "#23CDB0", true: "#23CDB0" }}
                thumbColor={"#f4f3f4"}
                onValueChange={toggleSwitch}
                value={isEnabled}
              ></Switch>
              <Text style={isEnabled ? styles.picked : styles.notPicked}>
                Commercial
              </Text>
            </View>
            {isEnabled ? (
              <View style={{ width: "100%", alignItems: "center" }}>
                <Inputs
                  placeholder={"Address*"}
                  style={styles.input}
                  value={values.address}
                  onChange={(value) => handleChange("address", value)}
                />
                <Inputs
                  placeholder={"TRN(Tax Number)*"}
                  style={styles.input}
                  value={values.TRN}
                  numeric
                  onChange={(value) => handleChange("TRN", parseInt(value))}
                />
                {image.length && !uploaded ? (
                  <View style={{ width: "100%", alignItems: "center" }}>
                    <View style={styles.ActivityIndicator}>
                      <ActivityIndicator size={"large"} color="#4E84D5" />
                    </View>
                    <Image
                      source={{ uri: image }}
                      style={styles.Imagecontainer}
                    />
                  </View>
                ) : image.length && uploaded ? (
                  <ImageCard
                    uri={image}
                    style={styles.Imagecontainer}
                    onImageDelete={onImageDelete}
                  />
                ) : (
                  <UploadCard
                    title="Trading Liscence*"
                    selectFile={selectFile}
                  />
                )}
              </View>
            ) : (
              <View style={{ width: "100%", alignItems: "center" }}>
                <Inputs
                  placeholder={"Signatory Name*"}
                  style={styles.input}
                  value={values.signatoryName}
                  onChange={(value) => handleChange("signatoryName", value)}
                />
                <Inputs
                  placeholder={"Signatory Title"}
                  style={styles.input}
                  value={values.signatoryTitle}
                  onChange={(value) => handleChange("signatoryTitle", value)}
                />
                {image.length && !uploaded ? (
                  <View style={{ width: "100%", alignItems: "center" }}>
                    <View style={styles.ActivityIndicator}>
                      <ActivityIndicator size={"large"} color="#4E84D5" />
                    </View>
                    <Image
                      source={{ uri: image }}
                      style={styles.Imagecontainer}
                    />
                  </View>
                ) : image.length && uploaded ? (
                  <ImageCard
                    uri={image}
                    style={styles.Imagecontainer}
                    onImageDelete={onImageDelete}
                  />
                ) : (
                  <UploadCard
                    title="Add Authorized Signatory*"
                    selectFile={selectFile}
                  />
                )}
              </View>
            )}
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={() => onSubmit()}>
              <PrimaryButton title="Sign up" activity={activity} />
            </TouchableOpacity>
            <SafeAreaView style={styles.btn}>
              <Pressable onPress={() => navigateLogin()}>
                <Text style={styles.btnText}>Login</Text>
              </Pressable>
            </SafeAreaView>
          </View>
        </View>
      </>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
    flex: 1,
  },
  container: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 13,
    fontFamily: "PoppinsR",
    color: "rgba(0,0,0,.6)",
    alignSelf: "center",
    textAlign: "center",
    width: "80%",
  },
  form: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  btnContainer: {
    width: "90%",
    alignItems: "center",
    marginTop: 10,
    paddingBottom: 40,
  },
  btn: {
    marginTop: 10,
  },
  btnText: {
    fontSize: 15,
    fontFamily: "PoppinsS",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  privacy: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    top: -5,
    marginBottom: 8,
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  notPicked: {
    fontFamily: "PoppinsL",
    color: "rgba(0,0,0,.5)",
    fontSize: 15,
  },
  picked: {
    fontFamily: "PoppinsL",
    fontSize: 15,
  },
  Imagecontainer: {
    justifyContent: "center",
    height: 230,
    width: "85%",
    borderRadius: 20,
    marginVertical: 10,
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

export default ClientSignupPage;
