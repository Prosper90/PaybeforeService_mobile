/** @format */

import {
  Image,
  Platform,
  SafeAreaView,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import React, { useContext, useState } from "react";
import icons from "../../components/icons/Icons";
import SuccessModal from "../../components/SuccessModal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as SecureStore from "expo-secure-store";
import { END_URL, formatDate } from "../../utility/constants";
import { makeCall } from "../../utility/makeCall";
import { Notifier, NotifierComponents, Easing } from "react-native-notifier";
import { DataContext } from "../../utility/context";

export default function redeem() {
  const [sModal, setSModal] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { selectedViewTransaction, setSelectedViewTransaction } =
    useContext(DataContext);

  const redeem = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("tokenKey");
      setLoading(true);
      const endpoint = `${END_URL}/payment/redeemPayment`;
      console.log(endpoint, "checking endpoint");

      const data = {
        redeemCode: inputValue,
      };
      const headers = {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json",
      };

      const response = await makeCall(endpoint, data, headers, "post");

      //   console.log(response, "omo oooh");
      if (response.status) {
        setLoading(false);
        // ToastAndroid.show(`${response?.message}`, ToastAndroid.SHORT);
        Notifier.showNotification({
          title: "Redeem payment",
          description: `${response?.message}`,
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
        setSModal(true);
      } else {
        setLoading(false);
        //this is a warning
        // ToastAndroid.show(`${response.message}`, ToastAndroid.SHORT);
        Notifier.showNotification({
          title: "Redeem payment",
          description: `${response?.message}`,
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
      }
    } catch (error) {
      // Error in making the request or server returned an error status
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView className="flex-1 bg-[#fafafa] ">
      <View className="p-5">
        <Text className="text-[#555555] text-base">
          Enter the redemption code sent to you to receive this payment in your
          main wallet.
        </Text>

        <View className="p-5 border border-[#DADADA] mt-5 rounded-2xl">
          <View className="flex-row items-center gap-4">
            <Image
              source={icons.tableSvg}
              className={`${Platform.OS === "ios" && "h-10 w-10"} h-14 w-14`}
            />
            <Text className="text-base font-medium text-[#000]">
              Received from client
            </Text>
          </View>
          <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
            <Text className="text-base font-normal text-[#555555]">
              Sender Details
            </Text>
            <Text className="text-base font-medium text-[#000]">
              {selectedViewTransaction?.type === "Payment"
                ? `${selectedViewTransaction?.payment?.sender?.account_name} | ${selectedViewTransaction?.payment?.sender?.account_number}`
                : `${selectedViewTransaction?.withdrawal?.reciever?.account_name} | ${selectedViewTransaction?.withdrawal?.reciever?.account_number}`}
            </Text>
          </View>
          <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
            <Text className="text-base font-normal text-[#555555]">
              Payment Created
            </Text>
            <Text className="text-base font-medium text-[#000]">
              {formatDate(selectedViewTransaction?.payment?.created)}
            </Text>
          </View>
          <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
            <Text className="text-base font-normal text-[#555555]">
              Payment Made
            </Text>
            <Text className="text-base font-medium text-[#000]">
              {formatDate(selectedViewTransaction?.updatedAt)}
            </Text>
          </View>
          <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
            <Text className="text-base font-normal text-[#555555]">
              Transaction ID
            </Text>
            <Text className="text-base font-medium text-[#000]">
              {selectedViewTransaction?._id}
            </Text>
          </View>
          <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
            <Text className="text-base font-normal text-[#555555]">Status</Text>
            <Text className="text-base font-medium text-[#A23EFF] ">
              <View className="p-1 bg-[#A23EFF] rounded-full"></View>
              {selectedViewTransaction?.status}
            </Text>
          </View>
          <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
            <Text className="text-base font-normal text-[#555555]">Note</Text>
            <Text className="text-base font-medium text-[#000]">-</Text>
          </View>
          <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
            <Text className="text-base font-normal text-[#555555]">
              Amount Created
            </Text>
            <Text className="text-base font-medium text-[#A23EFF]">
              ₦{selectedViewTransaction?.payment?.amount_created}
            </Text>
          </View>
          <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
            <Text className="text-base font-normal text-[#555555]">
              Amount Paid
            </Text>
            <Text className="text-base font-medium text-[#A23EFF]">
              ₦{selectedViewTransaction?.payment?.amount_paid}
            </Text>
          </View>
        </View>
        <Text className="mt-5 mx-1 font-semibold text-[#555555] text-sm">
          Enter code
        </Text>
        <View className="flex-row items-center border border-[#DADADA] bg-[#fff]  rounded-2xl  my-4 px-5 w-full">
          <TextInput
            style={{ height: 60 }}
            placeholder="Enter redeem code"
            className="w-full py-2 text-base pl-5"
            keyboardType="default"
            onChangeText={(newText) => setInputValue(newText)}
            // defaultValue={text}
          />
        </View>
        <TouchableOpacity
          onPress={() => redeem()}
          className="border-2 items-center justify-center bg-[#6E3EFF] rounded-full w-full border-white"
        >
          <Text className="text-white font-bold text-lg p-3 ">Continue</Text>
        </TouchableOpacity>
      </View>
      <SuccessModal
        sModal={sModal}
        sMsg="Congratulations, this payment has been sent to your main wallet."
        sTittle="Congratulations"
        setSModal={setSModal}
      />
    </KeyboardAwareScrollView>
  );
}

//08066294253
