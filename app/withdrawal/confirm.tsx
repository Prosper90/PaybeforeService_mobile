import { useRouter } from "expo-router";
import React, { useContext } from "react";
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
import { Image } from "react-native";
import { images } from "../../images";

export default function confirm() {
  const router = useRouter();
  const { withdraw, setWithdraw } = useContext(DataContext);
  return (
    <SafeAreaView className="flex-1 bg-[#fafafa]">
      <StatusBar animated={true} backgroundColor="#6E3EFF" />
      <View className="flex flex-col h-[90%] justify-between px-5">
        <View className="w-[100%]">
          <Text className="font-ui-semi font-semibold text-lg text-[#0D0033] mb-2 mt-5 text-center ">
            Confirm Details
          </Text>
          <Text className="text-[#555] text-xs text-center">
            Kindly confirm the details of your withdrawal below
          </Text>
          <View className="cursor-pointer border border-[#DADADA] hover:bg-[#FFF] border-border rounded-[10px] p-2 mt-7">
            <View className="">
              {images.map((item, index) => {
                if (item.name === withdraw?.bankName) {
                  return (
                    <Image
                      key={index}
                      source={item.img_url}
                      style={{ width: 50, height: 50, borderRadius: 100 }}
                    />
                  );
                }
              })}
            </View>
            <View className="flex flex-row justify-between w-100 mt-5">
              <View className=" text-[#555] text-xs flex flex-col gap-3 text-start">
                <Text className="">Bank Name</Text>
                <Text className="">Account Name</Text>
                <Text className="">Account Number</Text>
                <Text className="">Narration</Text>
                <Text className="">Transaction Fee</Text>
                <Text className="">Reference</Text>
                <Text className="">Amount</Text>
              </View>
              <View className=" font-bold text-[#0D0033] flex flex-col gap-3 text-xs text-end">
                <Text className="">{withdraw.bankName}</Text>
                <Text
                  className="text-xs whitespace-pre-wrap w-20"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {withdraw.accName}
                </Text>
                <Text className="">{withdraw.accNo}</Text>
                <Text className="">{withdraw.details}</Text>
                <Text className="">₦50</Text>
                <Text className="">-</Text>
                <Text className="">#{withdraw.amount}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* <TouchableOpacity
          onPress={() => router.push("/withdrawal/otp")}
          className="border-2 mt-3 items-center justify-center bg-[#6E3EFF] rounded-full w-full border-white"
        >
          <Text className="text-white font-bold text-lg p-3 ">Continue</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => router.push("/withdrawal/otp")}
          className="border-2 mt-3 items-center justify-center bg-[#6E3EFF] rounded-full w-full border-white"
        >
          <Text className="text-white font-bold text-lg p-3 ">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
