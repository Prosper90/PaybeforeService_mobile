import {
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react"; 
import icons from "../../components/icons/Icons";

export default function Successpage() {
  return (
    <View className="flex-1 px- bg-white px-5 justify-center items-center">
      <View className="bg-white w-full h-2/5 rounded-xl  p-5 justify-center items-center">
        <Image source={icons.reset} className="h-28 w-28" />
        <Text
          className={`${
            Platform.OS === "ios" && "text-sm"
          } text-xl font-semibold mt-5 text-black`}
        >
          Mail successfully sent
        </Text>
        <Text
          className={`${
            Platform.OS === "ios" && "text-sm"
          } text-lg text-center font-normal mt-2 text-[#555555]`}
        >
          If the email address is valid, we'`ll send you a password reset link.
          Check your inbox and spam folder, or try resending the request if
          needed
        </Text>
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
