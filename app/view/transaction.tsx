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

export default function transaction() {
  const { selectedViewTransaction, setSelectedViewTransaction } =
    useContext(DataContext);

  //   const [sModal, setSModal] = useState<boolean>(false);

  return (
    <KeyboardAwareScrollView className="flex-1 bg-[#fafafa] ">
      <View className="p-5 flex flex-col justify-center items-center ">
        {selectedViewTransaction?.status === "success" ? (
          <Success />
        ) : selectedViewTransaction?.status === "incomplete" ||
          selectedViewTransaction?.status === "pending" ? (
          <Warn />
        ) : (
          <Error />
        )}

        <View className="p-2 border border-[#DADADA] mt-5 rounded-2xl w-[100%]">
          <View
            className={`text-sm font-semibold w-[100%] flex flex-col justify-center items-center${
              selectedViewTransaction?.status === "success"
                ? "text-[#22bb33]"
                : selectedViewTransaction?.status === "incomplete"
                ? "text-[#ffcc00]"
                : "text-[#FF3E3E]"
            }`}
          >
            <Text className="text-base font-normal text-[#555555] text-center ">
              {selectedViewTransaction?.status === "success"
                ? `${selectedViewTransaction?.type} Successfull`
                : `${selectedViewTransaction?.type} Failed`}
            </Text>
            <View>
              <Text className="text-xs font-normal text-[#555555] text-center">
                {selectedViewTransaction?.type} Type
              </Text>
              {/* <Text className="text-xs font-normal text-[#555555] ">
                {selectedView?.type}
              </Text> */}
            </View>
          </View>

          <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
            <Text className="text-base font-normal text-[#555555]">
              {selectedViewTransaction?.type === "Payment"
                ? "Sender Details"
                : "Recipient Details"}
            </Text>
            <Text className="font-medium text-[#000] text-xs">
              {selectedViewTransaction?.type === "Payment"
                ? `${selectedViewTransaction?.payment?.sender?.account_name} | ${selectedViewTransaction?.payment?.sender?.account_number}`
                : `${selectedViewTransaction?.withdrawal?.reciever?.account_name} | ${selectedViewTransaction?.withdrawal?.reciever?.account_number}`}
            </Text>
          </View>
          {selectedViewTransaction?.type === "Payment" ? (
            <>
              <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
                <Text className="text-base font-normal text-[#555555]">
                  Payment Created
                </Text>
                <Text className="font-medium text-[#000] text-xs">
                  {formatDate(selectedViewTransaction?.payment?.created)}
                </Text>
              </View>
              <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
                <Text className="text-base font-normal text-[#555555]">
                  Payment Made
                </Text>
                <Text className="text-xs font-medium text-[#000]">
                  {formatDate(selectedViewTransaction?.updatedAt)}
                </Text>
              </View>
            </>
          ) : (
            <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
              <Text className="text-base font-normal text-[#555555]">Date</Text>
              <Text className="text-base font-medium text-[#000]">
                {formatDate(selectedViewTransaction?.createdAt)}
              </Text>
            </View>
          )}
          <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
            <Text className="text-base font-normal text-[#555555]">
              Transaction ID
            </Text>
            <Text className="text-xs font-medium text-[#000]">
              {selectedViewTransaction?._id}
            </Text>
          </View>
          <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
            <Text className="text-base font-normal text-[#555555]">Status</Text>
            <Text className="text-xs font-medium text-[#A23EFF] ">
              <View className="p-1 bg-[#A23EFF] rounded-full"></View>{" "}
              {selectedViewTransaction?.status}
            </Text>
          </View>
          <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
            <Text className="text-base font-normal text-[#555555]">Note</Text>
            <Text className="text-base font-medium text-[#000]">-</Text>
          </View>
          {selectedViewTransaction?.type === "Payment" ? (
            <>
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
            </>
          ) : (
            <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
              <Text className="text-base font-normal text-[#555555]">
                Amount
              </Text>
              <Text className="text-base font-medium text-[#A23EFF]">
                ₦{selectedViewTransaction?.withdrawal?.amount}
              </Text>
            </View>
          )}
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

        <View className="flex flex-row justify-center items-center gap-2 w-[100%] mt-3">
          <TouchableOpacity
            //   onPress={() => setSModal(true)}
            className="border-2 items-center justify-center  rounded-full border-[#6E3EFF] mt-10 w-[50%]"
          >
            <Text className="font-bold text-lg text-[#6E3EFF] p-3 ">
              Report
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            //   onPress={() => setSModal(true)}
            className="border-2 items-center justify-center bg-[#6E3EFF] rounded-full border-white mt-10 w-[50%]"
          >
            <Text className="text-white font-bold text-lg p-3 ">Share</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <SuccessModal sModal={sModal} sMsg="Congratulations, this payment has been sent to your main wallet." sTittle="Congratulations" setSModal={setSModal}/> */}
    </KeyboardAwareScrollView>
  );
}
