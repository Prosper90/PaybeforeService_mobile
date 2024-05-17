/** @format */

import {
  StatusBar,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { Link, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { END_URL } from "../../utility/constants";
import { makeCall } from "../../utility/makeCall";
import * as SecureStore from "expo-secure-store";
import { DataContext } from "../../utility/context";
import { Notifier, Easing, NotifierComponents } from "react-native-notifier";

export default function Login() {
  //   const [passwordT, setPasswordT] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(false);
  //useContext data's
  const { setUserProfile } = useContext(DataContext);

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //   const goBack = () => {
  //     console.log("hi hi hi there");
  //     router.push("/home");
  //   };

  const Login = async () => {
    try {
      if (email === "" || password === "") {
        ToastAndroid.show(
          `email and password cannot be empty`,
          ToastAndroid.SHORT
        );
        return;
      }
      setLoading(true);
      const endpoint = `${END_URL}/auth/login`;
      console.log(endpoint, "checking endpoint");

      const data = {
        email: email,
        password: password,
      };
      const headers = {
        "Content-Type": "application/json",
      };

      const response = await makeCall(endpoint, data, headers, "post");

      //   console.log(response, "omo oooh");

      if (response.status) {
        setLoading(false);
        ToastAndroid.show(`${response.message}`, ToastAndroid.SHORT);
        console.log(typeof response.token, "likeeeeee");
        setUserProfile(response.data);
        await SecureStore.setItemAsync("tokenKey", String(response.token));
        router.push("/home"); // Navigate to the '/signup/otp' route
      } else {
        setLoading(false);
        //this is a warning
        // ToastAndroid.show(`${response.message}`, ToastAndroid.SHORT);
        // Notifier.showNotification({
        //   title: "Login Failed",
        //   description: `${response?.message}`,
        //   Component: NotifierComponents.Alert,
        //   componentProps: {
        //     alertType: "error",
        //     titleStyle: {
        //       fontWeight: "800",
        //       fontSize: 15,
        //       textAlign: "center",
        //     },
        //   },
        //   containerStyle: {
        //     paddingTop: 30,
        //   },
        //   showAnimationDuration: 800,
        //   showEasing: Easing.bounce,
        //   // onHidden: () => console.log('Hidden'),
        //   // onPress: () => console.log('Press'),
        //   hideOnPress: false,
        // });
        Notifier.showNotification({
          title: "Login Failed",
          description: `${response?.message}`,
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

      <View className="mt-8 justify-center items-center h-3/5 w-full relative">
        <Text className="text-[#6E3EFF] text-4xl font-bold mb-5">
          PayBeforeService
        </Text>

        {/* <View className="w-[100%] absolute top-[70]">
          <MaterialCommunityIcons
            name="arrow-left-drop-circle"
            size={40}
            className=""
            color="#6E3EFF"
            onPress={goBack}
          />
        </View> */}

        <View className="mt-5">
          {/* <Text className=" text-xl font-medium text-[#555555] my-3">
            Email Address
          </Text> */}
          <View className="flex-row items-center border border-[#DADADA] bg-[#F7F5FF]  rounded-md mb-4 px-4 w-full">
            <TextInput
              style={{ height: 60 }}
              placeholder="Enter Email address"
              className="w-full py-2 text-base "
              keyboardType="default"
              onChangeText={(newText) => setEmail(newText)}
              defaultValue={email}
            />
          </View>
          {/* <Text className="text-xl font-medium text-[#555555] my-3">
            Password
          </Text> */}
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
          <Link
            href="/login/forget"
            className="text-xl text-right font-medium text-[#6E3EFF] mb-3"
          >
            Forgot passsword?
          </Link>
        </View>
        <TouchableOpacity
          onPress={Login}
          className="border-2 items-center  bg-[#6E3EFF] rounded-full mt-2 w-full border-white"
        >
          <Text className="text-white font-bold text-lg p-3 ">
            {loading ? "Loading..." : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
