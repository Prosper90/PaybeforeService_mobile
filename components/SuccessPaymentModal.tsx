/** @format */

import {
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import icons from "./icons/Icons";
import { SuccessPayment } from "./SvgItems";
import ConfettiCannon from "react-native-confetti-cannon";
import { DataContext } from "../utility/context";

interface SuccessModalProps {
  successPayment: boolean;
  setSuccessPayment: React.Dispatch<React.SetStateAction<boolean>>;
  // Add any other props you need here
}

export default function SuccessPaymentModal() {
  const { paymentPaidFor, successPayment, setSuccessPayment } =
    useContext(DataContext);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={successPayment}
      onRequestClose={() => {
        setSuccessPayment(false);
      }}
    >
      <View className="w-full flex justify-center items-center h-full left-0 top-0 bg-black/70  z-[99999999] text-[#fff]">
        {/* <Confetti active={confettiActiveDashboard} config={config} /> */}
        <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
        <View className="h-auto flex flex-col justify-center items-center relative p-5 rounded-md w-[100%]">
          <View className="w-full flex flex-col justify-center items-center">
            <SuccessPayment />
            <Text className="font-ui-semi text-[24px] mt-5 text-[#FFF] mb-2 text-center sm:text-[20px] whitespace-nowrap">
              Congratulations
            </Text>
          </View>

          <Text className="text-[#fff] text-center whitespace-nowrap">
            {`payment for ${paymentPaidFor} has been Recieved.`}
          </Text>
          <TouchableOpacity
            className="mt-3 items-center justify-center bg-[#6E3EFF] rounded-full w-full  py-3 "
            onPress={() => setSuccessPayment(false)}
          >
            <Text className="text-lg text-[#fff]">ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
