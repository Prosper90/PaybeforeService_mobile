import React, { useContext, useState } from "react";
import {
  Image,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import icons from "../../components/icons/Icons";
import { DataContext } from "../../utility/context";
import { Error, Success, Warn } from "../../components/SvgItems";
import { formatDate } from "../../utility/constants";

export default function dispute() {
  const { selectedViewDispute, setSelectedViewDispute } =
    useContext(DataContext);

  //   const [sModal, setSModal] = useState<boolean>(false);

  return (
    <KeyboardAwareScrollView className="flex-1 bg-[#fafafa] ">
      <View className="p-5 flex flex-col justify-center items-center ">
        {/* {selectedViewDispute?.status === "success" ? (
          <Success />
        ) : 
          selectedViewDispute?.status === "pending" ? (
          <Warn />
        ) : (
          <Error />
        )} */}

        <View className="p-2 border border-[#DADADA] mt-5 rounded-2xl w-[100%]">
          <View
            className={`text-sm font-semibold w-[100%] flex flex-col justify-center items-center${
              selectedViewDispute?.status === "success"
                ? "text-[#22bb33]"
                : selectedViewDispute?.status === "incomplete"
                ? "text-[#ffcc00]"
                : "text-[#FF3E3E]"
            }`}
          >
            <Text className="text-base font-normal text-[#555555] text-center ">
              {selectedViewDispute?.status === "success"
                ? `${selectedViewDispute?.type} Successfull`
                : `${selectedViewDispute?.type} Failed`}
            </Text>
            <View>
              <Text className="text-xs font-normal text-[#555555] text-center">
                {selectedViewDispute?.type} Type
              </Text>
              {/* <Text className="text-xs font-normal text-[#555555] ">
                {selectedView?.type}
              </Text> */}
            </View>
          </View>

          <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
            <Text className="text-base font-normal text-[#555555]">
              Dispute Id
            </Text>
            <Text className="font-medium text-[#000] text-xs">
              {selectedViewDispute?.dispute_id}
            </Text>
          </View>
          {selectedViewDispute?.type === "transaction" && (
            <>
              <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
                <Text className="text-base font-normal text-[#555555]">
                  Transaction Amount
                </Text>
                <Text className="font-medium text-[#000] text-xs">
                  {selectedViewDispute?.amount}
                </Text>
              </View>
              <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
                <Text className="text-base font-normal text-[#555555]">
                  Sender
                </Text>
                <Text className="text-xs font-medium text-[#000]">
                  {selectedViewDispute?.sender}
                </Text>
              </View>

              <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
                <Text className="text-base font-normal text-[#555555]">
                  Reciever
                </Text>
                <Text className="text-xs font-medium text-[#000]">
                  {selectedViewDispute?.reciever}
                </Text>
              </View>
            </>
          )}
          <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
            <Text className="text-base font-normal text-[#555555]">Date</Text>
            <Text className="text-base font-medium text-[#000]">
              {formatDate(selectedViewDispute?.createdAt)}
            </Text>
          </View>

          <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
            <Text className="text-base font-normal text-[#555555]">
              Updated
            </Text>
            <Text className="text-xs font-medium text-[#000]">
              {formatDate(selectedViewDispute?.updatedAt)}
            </Text>
          </View>
          <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
            <Text className="text-base font-normal text-[#555555]">Status</Text>
            <Text className="text-xs font-medium text-[#A23EFF] ">
              <View className="p-1 bg-[#A23EFF] rounded-full"></View>{" "}
              {selectedViewDispute?.status}
            </Text>
          </View>
          <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
            <Text className="text-base font-normal text-[#555555]">Note</Text>
            <Text className="text-base font-medium text-[#000]">
              {selectedViewDispute?.reason}
            </Text>
          </View>
        </View>
        {/* <Text className="mt-5 mx-1 font-semibold text-[#555555] text-sm">
          Enter code
        </Text> */}

        {/* <TouchableOpacity
          onPress={() => setSModal(true)}
          className="border-2 items-center justify-center bg-[#6E3EFF] rounded-full w-full border-white"
        >
          <Text className="text-white font-bold text-lg p-3 ">Continue</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          //   onPress={() => setSModal(true)}
          className="border-2 items-center justify-center bg-[#6E3EFF] rounded-full w-full border-white mt-10"
        >
          <Text className="text-white font-bold text-lg p-3 ">
            {selectedViewDispute?.status}
          </Text>
        </TouchableOpacity>
      </View>
      {/* <SuccessModal sModal={sModal} sMsg="Congratulations, this payment has been sent to your main wallet." sTittle="Congratulations" setSModal={setSModal}/> */}
    </KeyboardAwareScrollView>
  );
}
