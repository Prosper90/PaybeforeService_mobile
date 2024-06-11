import React, { useContext, useState } from "react";
import { DataContext } from "../../utility/context";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { END_URL } from "../../utility/constants";
import { makeCall } from "../../utility/makeCall";
import { Notifier, NotifierComponents, Easing } from "react-native-notifier";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Loading from "../../components/Loading";

export default function password() {
  const [password, setPassword] = useState<string>("");
  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { signUpData, setSignUpData } = useContext(DataContext);

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const Signup = async () => {
    try {
      setLoading(true);
      const endpoint = `${END_URL}/auth/signup`;

      const data = {
        username: signUpData.username,
        email: signUpData.email,
        password: password,
        pin: signUpData.pin,
        gender: signUpData.gender,
        date_of_birth: signUpData.date_of_birth,
      };
      const headers = {
        "Content-Type": "application/json",
      };

      const response = await makeCall(endpoint, data, headers, "post");
      //   console.log(response, "omo oooh");
      if (response.status) {
        setLoading(false);

        Notifier.showNotification({
          title: "Account",
          description: `Your Account has been created Login`,
          Component: NotifierComponents.Notification,
          componentProps: {
            imageSource: require("../../assets/images/notifysuccess.png"),
          },
          containerStyle: {
            paddingTop: 30,
          },
          showAnimationDuration: 1000,
          showEasing: Easing.bounce,
          // onHidden: () => console.log('Hidden'),
          // onPress: () => console.log('Press'),
          hideOnPress: false,
        });
        router.push("/login");
      } else {
        setLoading(false);
        //this is a warning
        Notifier.showNotification({
          title: "Account",
          description: `Account created`,
          Component: NotifierComponents.Notification,
          componentProps: {
            imageSource: require("../../assets/images/notifywarn.png"),
          },
          containerStyle: {
            paddingTop: 30,
          },
          showAnimationDuration: 800,
          showEasing: Easing.bounce,
          // onHidden: () => console.log('Hidden'),
          // onPress: () => console.log('Press'),
          hideOnPress: false,
        });
      }
    } catch (error) {
      // Error in making the request or server returned an error status
      console.error("Error:", error);
      setLoading(false);
    }
  };
  return (
    <View className="flex-1 bg-[#FAFAFA] items-center relative px-5">
      <StatusBar animated={true} backgroundColor="#6E3EFF" />
      <View className="mt-2 justify-start items-center h-4/5 pt-10">
        <Text className=" text-2xl font-medium my-3 text-[#0D0033]">
          Set you password
        </Text>
        <View className="flex-row items-center border relative border-[#DADADA] bg-[#F7F5FF]  rounded-md mb-4 px-4 w-[93%]">
          <TextInput
            style={{ height: 60 }}
            placeholder="Enter Password"
            secureTextEntry={showPassword ? true : false}
            className="w-full py-2 text-base "
            // keyboardType=''
            onChangeText={(newText) => setPassword(newText)}
            defaultValue={password}
          />
          <MaterialCommunityIcons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            className="m absolute  "
            // color="#808080"
            onPress={toggleShowPassword}
          />
        </View>
        <Text className="text-center text-[#555] text-base">
          We will use this email to contact you if the need arises
        </Text>
      </View>
      <TouchableOpacity
        onPress={Signup}
        className="border-2 items-center absolute bottom-8 justify-center bg-[#6E3EFF] rounded-full w-full border-white"
      >
        {loading ? (
          <Loading textSize="lg" textColor="#fff" loaderColor="#fff" />
        ) : (
          <Text className="text-white font-bold text-lg p-3 ">Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
