import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useSelector, useDispatch } from "react-redux";

import {
  handleChange,
  completedProfile,
} from "../reduxToolkit/freelancerSlice";

import signUp from "../assets/images/signUp.png";

import Header from "../components/Header";
import UploadCard from "../components/UploadCard";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import ImageCard from "../components/ImageCard";

const CreateProfilePage = ({ navigation, route }) => {
  const { update } = route.params;
  const { freelancer } = useSelector((store) => store.freelancer);
  const [dispatched, setDipatched] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (update && !dispatched) {
      dispatch(
        handleChange({
          name: "copyOfPassport",
          value:
            freelancer.copyOfPassport !== null &&
            freelancer.copyOfPassport !== ""
              ? freelancer.copyOfPassport
              : "",
        })
      );
      dispatch(
        handleChange({
          name: "copyOfResidencyVisa",
          value:
            freelancer.copyOfResidencyVisa !== null &&
            freelancer.copyOfResidencyVisa !== ""
              ? freelancer.copyOfResidencyVisa
              : "",
        })
      );
      setDipatched(true);
    }
  }, []);

  const { copyOfPassport, copyOfResidencyVisa } = useSelector(
    (store) => store.freelancer
  );

  const [uploaded, setUploaded] = useState(
    freelancer.copyOfPassport !== undefined ? true : false
  );
  const [uploaded2, setUploaded2] = useState(
    freelancer.copyOfPassport !== undefined ? true : false
  );

  const [passCopy, setPassCopy] = useState(
    update &&
      freelancer.copyOfPassport !== undefined &&
      freelancer.copyOfPassport !== null
      ? `http://195.110.58.234:4000${freelancer.copyOfPassport}`
      : ""
  );
  const [visaCopy, setVisaCopy] = useState(
    update &&
      freelancer.copyOfResidencyVisa !== undefined &&
      freelancer.copyOfPassport !== null
      ? `http://195.110.58.234:4000${freelancer.copyOfResidencyVisa}`
      : ""
  );

  const [startingToUpload, setStartingToUpload] = useState(false);
  const [activity, setActivity] = useState(false);

  const navigateExperience = () => {
    // setUser({copyOfPassport: "", copyOfResidencyVisa: ""})
    navigation.navigate("experience", { update });
  };

  const upload2 = async (uri) => {
    console.log("uploading file");
    try {
      console.log("trying");
      const response = await FileSystem.uploadAsync(
        `http://195.110.58.234:4000/api/v1/freelancers/uploadImage`,
        uri,
        {
          fieldName: "files",
          httpMethod: "post",
          uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
        },
        { body: "back" }
      );

      const img = JSON.parse(response.body).imageUrl;
      dispatch(
        handleChange({
          name: "copyOfResidencyVisa",
          value: img,
        })
      );
      setUploaded2(true);
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
        `http://195.110.58.234:4000/api/v1/freelancers/uploadImage`,
        uri,
        {
          fieldName: "files",
          httpMethod: "post",
          uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
        },
        { body: "back" }
      );

      const img = JSON.parse(response.body).imageUrl;
      dispatch(
        handleChange({
          name: "copyOfPassport",
          value: img,
        })
      );
      setUploaded(true);
    } catch (error) {
      console.log(error);
      setUploaded(false);
      alert("Error uploading");
    }
  };
  const selectFile = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      !startingToUpload && setStartingToUpload(true);
      setPassCopy(result?.assets[0]?.uri);
      setUploaded(false);
      upload(result?.assets[0]?.uri);
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
      !startingToUpload && setStartingToUpload(true);
      setVisaCopy(result?.assets[0]?.uri);
      setUploaded2(false);
      upload2(result?.assets[0]?.uri);
    }
  };
  const handleSubmit = () => {
    if (!uploaded || !uploaded2) {
      return alert("Uploading, please wait");
    }
    if (
      copyOfPassport === "" ||
      copyOfResidencyVisa === "" ||
      !uploaded2 ||
      !uploaded
    ) {
      alert("Please upload all required documents");
    } else {
      dispatch(completedProfile(true));
      navigateExperience();
    }
  };
  const onImageDelete = () => {
    startingToUpload && setStartingToUpload(false);
    setUploaded(false);
    setPassCopy({});
    dispatch(
      handleChange({
        name: "copyOfPassport",
        value: "",
      })
    );
  };
  const onImageDelete2 = () => {
    startingToUpload && setStartingToUpload(false);
    setUploaded2(false);
    setVisaCopy({});
    dispatch(
      handleChange({
        name: "copyOfResidencyVisa",
        value: "",
      })
    );
  };
  useEffect(() => {
    if (uploaded && uploaded2 && activity) {
      setActivity(false);
    }
    if ((!uploaded || !uploaded2) && !activity && startingToUpload) {
      setActivity(true);
    }
  }, [uploaded, uploaded2, startingToUpload]);

  return (
    <ScrollView style={styles.container}>
      <Header
        icon={signUp}
        title="Create Profile"
        // numOfPage={<Image source={trash}></Image>}
        numOfPage="3/6"
        hidden={false}
        goBack={navigation.goBack}
      />
      <View style={styles.subContainer}>
        <Text style={styles.text}>
          Create and verify your profile in less than 2 minutes. Fill in your
          name and upload a picture of your passport, ID, and Visa
        </Text>
        {passCopy.length && !uploaded ? (
          <View style={{ width: "100%", alignItems: "center" }}>
            <View style={styles.ActivityIndicator}>
              <ActivityIndicator size={"large"} color="#4E84D5" />
            </View>
            <Image source={{ uri: passCopy }} style={styles.Imagecontainer} />
          </View>
        ) : passCopy.length && uploaded ? (
          <ImageCard uri={passCopy} onImageDelete={onImageDelete} />
        ) : (
          <UploadCard
            title="Copy of your passport’s information page"
            selectFile={selectFile}
          />
        )}
        {visaCopy.length && !uploaded2 ? (
          <View style={{ width: "100%", alignItems: "center" }}>
            <View style={styles.ActivityIndicator}>
              <ActivityIndicator size={"large"} color="#4E84D5" />
            </View>
            <Image source={{ uri: visaCopy }} style={styles.Imagecontainer} />
          </View>
        ) : visaCopy.length && uploaded2 ? (
          <ImageCard uri={visaCopy} onImageDelete={onImageDelete2} />
        ) : (
          <UploadCard
            title="Copy of your residency visa"
            selectFile={selectFile2}
          />
        )}
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.nextButton}
        >
          <PrimaryButton title="Next" activity={activity} />
        </TouchableOpacity>
        {!activity && (
          <TouchableOpacity onPress={() => navigateExperience()}>
            <Text style={styles.skipText}>SKIP</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  skipText: {
    fontFamily: "PoppinsS",
    fontSize: 15,
    marginTop: -25,
    marginBottom: 80,
    letterSpacing: 2,
  },
  Imagecontainer: {
    justifyContent: "center",
    height: 230,
    width: "85%",
    borderRadius: 20,
    marginVertical: 10,
  },
  loadingStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    position: "absolute",
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
});

export default CreateProfilePage;
