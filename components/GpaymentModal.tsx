/** @format */

import {
  Modal,
  Platform,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { END_URL, getTime } from "../utility/constants";
import * as SecureStore from "expo-secure-store";
import { makeCall } from "../utility/makeCall";
import { Notifier, NotifierComponents, Easing } from "react-native-notifier";
import useUpdateProfileAndTransaction from "../app/hooks/useApiUpdate";
import Loading from "./Loading";

export default function GpaymentModal({
  modalVisible,
  setModalVisible,
  setPaymentModal,
  setPaymentLink,
  setPaymentId,
  setDuration,
  setlistenSocket,
}: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  let urlLink = "https://paybeforeservice.com/";
  const { updateProfile, updateTransaction } = useUpdateProfileAndTransaction();

  const generatePayment = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("tokenKey");
      setLoading(true);
      const endpoint = `${END_URL}/payment/generatePaymentLink`;
      console.log(endpoint, "checking endpoint");

      const data = {
        amount: amount !== "" ? parseInt(amount) : null,
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
          title: "Generate Payment",
          description: `${response?.message}`,
          Component: NotifierComponents.Notification,
          componentProps: {
            imageSource: require("../assets/images/notifysuccess.png"),
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
        setPaymentLink(`${urlLink}?payment=${response.data.linkID}`);
        setPaymentId(response.data);
        const timeGet = getTime(response.data.expired);
        setDuration(timeGet);
        setlistenSocket(true);
        //call the other modal for id and link and set this one off
        setPaymentModal(true);
        setModalVisible(false);
        await updateTransaction();
      } else {
        setLoading(false);
        //this is a warning
        // ToastAndroid.show(`${response.message}`, ToastAndroid.SHORT);
        Notifier.showNotification({
          title: "Generate Payment",
          description: `${response?.message}`,
          Component: NotifierComponents.Notification,
          componentProps: {
            imageSource: require("../assets/images/notifywarn.png"),
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
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View className="flex-1 px- bg-[#00000056] relative justify-center">
        <View className="h-auto items-center p-5 pb-6 mx-4 rounded-2xl bg-white ">
          <TouchableOpacity
            className="absolute right-6 top-3"
            onPress={() => setModalVisible(!modalVisible)}
          >
            <MaterialCommunityIcons
              name={"close"}
              size={20}
              className="m absolute  "
              color="#000"
            />
          </TouchableOpacity>
          <Text
            className={`${
              Platform.OS === "ios" && "text-sm"
            } text-xl font-semibold mt-5 text-black`}
          >
            Enter Amount
          </Text>
          <Text
            className={`${
              Platform.OS === "ios" && "text-sm"
            } text-base font-normal text-center my-2 px-4 text-[#555555]`}
          >
            Enter the amount you want to receive from your client, and a payment
            link will be generated that you can send to them
          </Text>
          <View className="flex-row items-center border border-[#DADADA] bg-[#F7F5FF]  rounded-full my-4 px-5 w-full">
            <Text className=" text-base text-gray-500 px-2 font-semibold mr-2 ">
              ₦
            </Text>
            <TextInput
              style={{ height: 60 }}
              placeholder="Enter amount"
              className="w-3/5 py-2 text-base border-[#DADADA] border-l pl-5"
              keyboardType="default"
              onChangeText={(newText) => setAmount(newText)}
              // defaultValue={text}
            />
          </View>
          <TouchableOpacity
            onPress={generatePayment}
            className="border-2 mt-3 items-center justify-center bg-[#6E3EFF] rounded-full w-full border-white"
          >
            {loading ? (
              <Loading textSize="lg" textColor="#fff" loaderColor="#fff" />
            ) : (
              <Text className="text-white font-bold text-lg p-3 ">Login</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
