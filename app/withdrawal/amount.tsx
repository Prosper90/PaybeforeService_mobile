import { useRouter } from "expo-router";
import React, { useContext } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { DataContext } from "../../utility/context";
import { Notifier, NotifierComponents, Easing } from "react-native-notifier";

export default function amount() {
  const router = useRouter();
  const { userProfile, withdraw, setWithdraw } = useContext(DataContext);

  const goNext = () => {
    if (userProfile) {
      if (userProfile?.balances?.main_wallet < parseInt(withdraw.amount)) {
        Notifier.showNotification({
          title: "Withdrawal Issue",
          description: `Insufficient Amount`,
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
    }
    router.push("/withdrawal/choose");
  };
  return (
    <SafeAreaView className="flex-1 bg-[#fafafa] px-5">
      <StatusBar animated={true} backgroundColor="#6E3EFF" />
      <View className="flex flex-col h-[90%] justify-between">
        <View className="h-auto pb-8 items-center pt-5 rounded-2xl mx-5 ">
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
            Enter the amount you wish to withdraw to your bank account.
          </Text>
          <View className="flex-row items-center border border-[#DADADA] bg-[#F7F5FF]  rounded-full my-4 px-5 w-full">
            <Text className=" text-base text-gray-500 px-2 font-semibold mr-2 ">
              ₦
            </Text>
            <TextInput
              style={{ height: 60 }}
              placeholder="Enter amount"
              className="w-3/5 py-2 text-base border-[#DADADA] border-l pl-5"
              keyboardType="number-pad"
              onChangeText={(newText) =>
                setWithdraw((prevWithdraw: any) => ({
                  ...prevWithdraw,
                  amount: newText,
                }))
              }
              defaultValue={withdraw?.amount}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => goNext()}
          className="border-2 mt-3 items-center justify-center bg-[#6E3EFF] rounded-full w-full border-white"
        >
          <Text className="text-white font-bold text-lg p-3 ">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
