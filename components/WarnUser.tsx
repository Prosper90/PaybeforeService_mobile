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
import React, { useContext, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { END_URL, getTime } from "../utility/constants";
import * as SecureStore from "expo-secure-store";
import { makeCall } from "../utility/makeCall";
import { Notifier, NotifierComponents, Easing } from "react-native-notifier";
import { DataContext } from "../utility/context";
import useUpdateProfileAndTransaction from "../app/hooks/useApiUpdate";

export default function WarnUser() {
  const [loading, setLoading] = useState<boolean>(false);
  const { cancelPayment, setCancelPayment } = useContext(DataContext);
  const { updateProfile, updateTransaction } = useUpdateProfileAndTransaction();

  const cancelTx = async () => {
    try {
      console.log(cancelPayment, "checking cancel payment");

      if (cancelPayment.code === "") {
        Notifier.showNotification({
          title: "Cancel Payment",
          description: `Code needed`,
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
        return;
      }
      const storedToken = await SecureStore.getItemAsync("tokenKey");
      setLoading(true);
      const endpoint = `${END_URL}/payment/cancelPayment`;
      console.log(endpoint, "checking endpoint");

      const data = {
        code: cancelPayment.code,
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
          title: "Cancel Payment",
          description: `transaction cancelled`,
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
        await updateTransaction();
        setCancelPayment({
          modal: false,
          code: "",
        });
      } else {
        setLoading(false);
        //this is a warning
        // ToastAndroid.show(`${response.message}`, ToastAndroid.SHORT);
        Notifier.showNotification({
          title: "Login Failed",
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

  const handleContinue = async () => {
    await cancelTx();
    // setCancelPayment({
    //   modal: false,
    //   code: ""
    // });
  };

  const handleCancel = () => {
    setCancelPayment({
      modal: false,
      code: "",
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={cancelPayment.modal}
      onRequestClose={() => {
        handleCancel();
      }}
    >
      <View className="flex-1 px- bg-[#00000056] relative justify-center">
        <View className="h-auto items-center p-5 pb-6 mx-4 rounded-2xl bg-white ">
          <TouchableOpacity
            className="absolute right-6 top-3"
            onPress={() => handleCancel()}
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
            } text-xl font-semibold mt-7 text-black`}
          >
            Are you sure you want to do this ?
          </Text>

          <View className="flex flex-row w-[100%] justify-center items-center gap-3 mt-3">
            <TouchableOpacity
              onPress={handleContinue}
              className="border-2 mt-3 items-center justify-center bg-[#6E3EFF] rounded-full w-[50%] border-white"
            >
              <Text className="text-white font-bold text-base p-3 ">
                {loading ? "Loading..." : "Continue"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCancel}
              className="border-2 mt-3 items-center justify-center bg-[#6E3EFF] rounded-full w-[50%] border-white"
            >
              <Text className="text-white font-bold text-base p-3 ">Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
