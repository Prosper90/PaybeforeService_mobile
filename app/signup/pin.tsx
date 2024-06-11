import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import { Text, View } from "react-native";
import OtpInput from "../../components/OtpInput";
import { DataContext } from "../../utility/context";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { END_URL } from "../../utility/constants";

export default function pin() {
  const [otp, setOtp] = useState<string>(""); // Initialize with an empty string
  const [loading, setLoading] = useState<boolean>(false);
  const { setSignUpData } = useContext(DataContext);

  const onChange = (value: string) => setOtp(value);

  const goNext = () => {
    setSignUpData((prev) => ({
      ...prev,
      pin: parseInt(otp),
    }));
    router.push("/signup/password");
  };

  return (
    <View className="flex-1 bg-[#FAFAFA] items-center relative px-5">
      <StatusBar animated={true} backgroundColor="#6E3EFF" />
      <View className="mt-8 justify-start items-center h-3/5 pt-10">
        <Text className=" text-2xl text-center font-medium my-3 text-[#0D0033]">
          Enter Safety Pin
        </Text>

        <OtpInput value={otp} valueLength={4} onChange={onChange} />
        <Text className="text-center text-[#555] text-base mt-2">
          This pin is for security purpose and for withdrawals
        </Text>
      </View>
      <TouchableOpacity
        onPress={goNext}
        className="border-2 items-center justify-center bg-[#6E3EFF] rounded-full w-full border-white px-28"
      >
        <Text className="text-white font-bold text-lg p-3 ">Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
