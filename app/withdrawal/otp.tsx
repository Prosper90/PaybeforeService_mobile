import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { DataContext } from "../../utility/context";
import OtpInput from "../../components/OtpInput";
import * as SecureStore from "expo-secure-store";
import { END_URL } from "../../utility/constants";
import { makeCall } from "../../utility/makeCall";
import { Notifier, Easing, NotifierComponents } from "react-native-notifier";

export default function otp() {
  const [otp, setOtp] = useState<string>(""); // Initialize with an empty string
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { userProfile, withdraw, setWithdraw } = useContext(DataContext);

  // const onChange = (value: string) => setOtp(value);

  // const onChange = (value: number) => setOtp(value);

  const onChange = async (value: string) => {
    try {
      console.log(value, "checking the value");
      setOtp(value);

      if (value.length === 4) {
        console.log("far passed");

        if (userProfile?.pin !== parseInt(value)) {
          // setLoading(false);
          console.log("initializing, oo");

          Notifier.showNotification({
            title: "Pin",
            description: `digit pin incorrect`,
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
          return;
        }
        const storedToken = await SecureStore.getItemAsync("tokenKey");
        setLoading(true);
        const endpoint = `${END_URL}/user/withdraw`;
        console.log(endpoint, "checking endpoint");

        const data = {
          amount: withdraw.amount,
          bank_code: withdraw.bankCode,
          bank_name: withdraw.bankName,
          account_number: withdraw.accNo,
          account_name: withdraw.accName,
          currency: "NGN",
          description: withdraw.details,
        };
        const headers = {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        };

        const response = await makeCall(endpoint, data, headers, "put");

        //   console.log(response, "omo oooh");
        if (response.status) {
          setLoading(false);
          setWithdraw((prevWithdraw: any) => ({
            ...prevWithdraw,
            status: true,
          }));
          Notifier.showNotification({
            title: "Pin",
            description: `${response.message}`,
            Component: NotifierComponents.Notification,
            componentProps: {
              imageSource: require("../../assets/images/notifysuccess.png"),
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
          router.push("/withdrawal/complete");
        } else {
          setLoading(false);
          setWithdraw((prevWithdraw: any) => ({
            ...prevWithdraw,
            status: false,
          }));
          //this is a warning
          Notifier.showNotification({
            title: "Pin",
            description: `${response.message}`,
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
      }
    } catch (error) {
      // Error in making the request or server returned an error status
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#fafafa]">
      <StatusBar animated={true} backgroundColor="#6E3EFF" />
      <View className="flex flex-col h-[90%] justify-between">
        <View className="h-auto pb-8 items-center pt-5 px-5 rounded-2xl mx-5 ">
          <Text
            className={`${
              Platform.OS === "ios" && "text-sm"
            } text-xl font-semibold mt-5 text-black`}
          >
            Authorize Payment
          </Text>
          <Text
            className={`${
              Platform.OS === "ios" && "text-sm"
            } text-base font-normal text-center my-2 px-4 text-[#555555]`}
          >
            Enter your 4 digit secure PIN to complete this transaction
          </Text>
          <OtpInput value={otp} valueLength={4} onChange={onChange} />
        </View>
        {/* <TouchableOpacity
          onPress={() => router.push("/withdrawal/choose")}
          className="border-2 mt-3 items-center justify-center bg-[#6E3EFF] rounded-full w-full border-white"
        >
          <Text className="text-white font-bold text-lg p-3 ">Continue</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
}
