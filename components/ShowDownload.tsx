import {
  Modal,
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
import React, { useRef, useState, useContext, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import icons from "./icons/Icons";
import { downloadReceipt, formatDate } from "../utility/constants";
import ViewShot from "react-native-view-shot";
import { DataContext } from "../utility/context";
import { Error, Success, Warn } from "./SvgItems";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ShowDownload({
  type,
  showDownload,
  setShowDownload,
}: any) {
  const {
    selectedViewTransaction,
    setSelectedViewTransaction,
    selectedViewDispute,
    setSelectedViewDispute,
  } = useContext(DataContext);
  const viewShotRef = useRef(null);

  const handleShareImage = async () => {
    // console.log(viewShotRef, "Opening all things");

    if (viewShotRef.current.capture) {
      await downloadReceipt("image", viewShotRef);
    } else {
      console.error("viewShotRef is not initialized");
    }
  };

  const handleSharePDF = async () => {
    if (viewShotRef.current.capture) {
      await downloadReceipt("pdf", viewShotRef);
    } else {
      console.error("viewShotRef is not initialized");
    }
  };

  {
    /* ref={viewShotRef} */
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showDownload}
      onRequestClose={() => {
        setShowDownload(false);
      }}
    >
      <SafeAreaView className="relative h-[100%]">
        <TouchableOpacity
          className="w-[100%] absolute"
          onPress={() => setShowDownload(false)}
        >
          <MaterialCommunityIcons
            name={"close"}
            size={40}
            className=""
            color="#FFF"
          />
        </TouchableOpacity>

        {type === "transaction" ? (
          <SafeAreaView className="flex-1 px- bg-[#000000] px-5 justify-center items-center ">
            <ViewShot ref={viewShotRef}>
              <View className="p-2 flex flex-col justify-center items-center bg-[#fff] w-[99%] rounded-xl">
                {selectedViewTransaction?.status === "success" ? (
                  <Success />
                ) : selectedViewTransaction?.status === "incomplete" ||
                  selectedViewTransaction?.status === "pending" ? (
                  <Warn />
                ) : (
                  <Error />
                )}

                {/* Transaction details */}
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
                          {formatDate(
                            selectedViewTransaction?.payment?.created
                          )}
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
                      <Text className="text-base font-normal text-[#555555]">
                        Date
                      </Text>
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
                    <Text className="text-base font-normal text-[#555555]">
                      Status
                    </Text>
                    <Text className="text-xs font-medium text-[#A23EFF] ">
                      <View className="p-1 bg-[#A23EFF] rounded-full"></View>{" "}
                      {selectedViewTransaction?.status}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
                    <Text className="text-base font-normal text-[#555555]">
                      Note
                    </Text>
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
              </View>
            </ViewShot>
          </SafeAreaView>
        ) : type === "dispute" ? (
          <View
            ref={viewShotRef}
            options={{ format: "jpg", quality: 0.9 }}
            className="p-5 flex flex-col justify-center items-center "
          >
            {/* Dispute details */}
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
                <Text className="text-base font-normal text-[#555555]">
                  Date
                </Text>
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
                <Text className="text-base font-normal text-[#555555]">
                  Status
                </Text>
                <Text className="text-xs font-medium text-[#A23EFF] ">
                  <View className="p-1 bg-[#A23EFF] rounded-full"></View>{" "}
                  {selectedViewDispute?.status}
                </Text>
              </View>
              <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
                <Text className="text-base font-normal text-[#555555]">
                  Note
                </Text>
                <Text className="text-base font-medium text-[#000]">
                  {selectedViewDispute?.reason}
                </Text>
              </View>
            </View>
            <View className="flex justify-center gap-4">
              <TouchableOpacity
                onPress={() => handleShareImage()}
                className="border-2 items-center justify-center bg-[#6E3EFF] rounded-full w-full border-white"
              >
                <Text className="text-white font-bold text-lg p-3 ">Image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSharePDF()}
                className="border-2 items-center justify-center bg-[#6E3EFF] rounded-full w-full border-white"
              >
                <Text className="text-white font-bold text-lg p-3 ">PDF</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        <View className="flex flex-col justify-center items-center gap-4 w-[100%] absolute bottom-10">
          <TouchableOpacity
            onPress={() => handleShareImage()}
            className=" items-center justify-center bg-transparent rounded-full w-24 "
          >
            <Text className="text-white font-bold text-lg py-2 ">Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSharePDF()}
            className=" items-center justify-center bg-transparent rounded-full w-24"
          >
            <Text className="text-white font-bold text-lg py-2 ">PDF</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

//08066294253
