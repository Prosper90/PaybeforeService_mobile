import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { DataContext } from "../../utility/context";
import SelectBankComp from "../../components/SelectBankComp";
import { Path, Svg } from "react-native-svg";
import { Notifier, Easing, NotifierComponents } from "react-native-notifier";
import { END_URL } from "../../utility/constants";
import * as SecureStore from "expo-secure-store";
import { makeCall } from "../../utility/makeCall";
import { Bank } from "../../utility/types";
import { supportedBanks } from "./constants";
import { images } from "../../images";

export default function bankDetails() {
  const [selBank, setSelBank] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingAccN, setLoadingAccN] = useState<boolean>(false);
  // const [showBankImg, setShowBankImg] = useState<Bank>(images[0]);
  // const [getBanks, setGetBanks] = useState<Bank[]>(images);
  // const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const router = useRouter();
  const { withdraw, setWithdraw } = useContext(DataContext);

  //Add beneficairy
  const addBeneFiciary = async () => {
    try {
      if (withdraw.bankName === "") {
        Notifier.showNotification({
          title: "Add Beneficiary",
          description: `Select Bank to Proceed`,
          duration: 0,
          showAnimationDuration: 800,
          showEasing: Easing.bounce,
          // onHidden: () => console.log('Hidden'),
          // onPress: () => console.log('Press'),
          hideOnPress: false,
        });
        return;
      }
      if (withdraw.accNo === "") {
        Notifier.showNotification({
          title: "Add Beneficiary",
          description: `Please Enter account number to proceed`,
          duration: 0,
          showAnimationDuration: 800,
          showEasing: Easing.bounce,
          // onHidden: () => console.log('Hidden'),
          // onPress: () => console.log('Press'),
          hideOnPress: false,
        });
        return;
      }
      if (withdraw.accName === "") {
        Notifier.showNotification({
          title: "Add Beneficiary",
          description: `Add account name`,
          duration: 0,
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

      const endpoint = `${END_URL}/bene/addbeneficiary`;
      const data = {
        account_Name: withdraw.accName,
        account_Number: withdraw.accNo,
        bank_Name: withdraw.bankName,
        bank_Code: withdraw.bankCode,
        img_url_phone: withdraw.bankImg,
      };
      const headers = {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json",
      };
      const response = await makeCall(endpoint, data, headers, "post");

      if (response.status) {
        // console.log(response);
        Notifier.showNotification({
          title: "Add Beneficiary",
          description: `${response?.message}`,
          Component: NotifierComponents.Notification,
          componentProps: {
            imageSource: require("../../assets/images/notifysuccess.png"),
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
        setLoading(false);
      } else {
        Notifier.showNotification({
          title: "Add Beneficiary",
          description: `${response.message}`,
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
        setLoading(false);
        return;
      }
    } catch (error) {
      // Error in making the request or server returned an error status
      console.error("Error:", error);
      setLoading(false);
      return;
    }
  };

  const setAndSetDetails = async (e: any) => {
    const newValue = e;
    setWithdraw((prevWithdraw: any) => ({
      ...prevWithdraw,
      accNo: newValue,
    }));

    if (newValue.length === 10) {
      setLoadingAccN(true);
      try {
        const storedToken = await SecureStore.getItemAsync("tokenKey");

        const endpoint = `${END_URL}/user/getAccountName/${newValue}/${withdraw.bankShortCode}`;
        const headers = {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json", // You may include this header if required by the API
        };
        const response = await makeCall(endpoint, {}, headers, "get");

        if (response.status) {
          setLoadingAccN(false);
          console.log(response);
          // setAccname(response.data.data.account_name);
          setWithdraw((prevWithdraw: any) => ({
            ...prevWithdraw,
            accName: response.data.data.account_name,
          }));
        } else {
          setLoadingAccN(false);
          Notifier.showNotification({
            title: "Account gotten",
            description: `${response?.message}`,
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
      } catch (error) {
        console.error("Error:", error);
        return;
      }
    }
  };

  const goNext = () => {
    if (
      withdraw.accName === "" &&
      withdraw.accNo === "" &&
      withdraw.bankCode === ""
    ) {
      Notifier.showNotification({
        title: "Withdrawal",
        description: `Add the complete details to continue`,
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
    router.push(`withdrawal/confirm`);
  };

  // let imagePath: string;

  // if (withdraw.bankName !== "") {
  //   imagePath =
  //     showBankImg?.img_url ?? require("../../assets/banks/access-bank.png");
  // } else {
  //   imagePath =
  //     images[0]?.img_url ?? require("../../assets/banks/access-bank.png");
  // }

  useEffect(() => {
    // const matchingIndices: number[] = images.reduce(
    //   (acc: number[], bank, index) => {
    //     if (bank.name === withdraw.bankName) {
    //       acc.push(index);
    //     }
    //     return acc;
    //   },
    //   []
    // );
    // setSelectedIndex(matchingIndices[0]);
    // setGetBanks(images);
  }, [withdraw.bankName]);

  return (
    <SafeAreaView className="flex-1 bg-[#fafafa] px-5">
      <StatusBar animated={true} backgroundColor="#6E3EFF" />
      <View className="flex flex-col h-[90%] justify-between items-center w-[100%]">
        <View className="h-auto pb-8 items-center pt-5 rounded-2xl mx-5 w-[100%]">
          <Text
            className={`${
              Platform.OS === "ios" && "text-sm"
            } text-xl font-semibold mt-5 text-black`}
          >
            Bank Details
          </Text>
          <Text
            className={`${
              Platform.OS === "ios" && "text-sm"
            } text-base font-normal text-center my-2 px-4 text-[#555555]`}
          >
            Kindly fill in your bank details
          </Text>
          <View className="mt-5 w-[100%]">
            <View className="flex flex-col gap-3 w-[100%]">
              <View className="w-100 p-3 border border-[#DADADA] rounded-[15px] font-normal text-[14px] w-full">
                <TouchableOpacity
                  onPress={() => setSelBank(true)}
                  className="flex flex-row justify-between items-center w-100 cursor-pointer"
                >
                  <View className="flex flex-row items-center gap-3 w-[90%]">
                    {images.map((item, index) => {
                      if (item.name === withdraw?.bankName) {
                        return (
                          <Image
                            key={index}
                            source={item.img_url}
                            style={{ width: 40, height: 40, borderRadius: 50 }}
                          />
                        );
                      }
                    })}
                    {/* <TextInput
                      style={{ height: 60, width: 100 }}
                      defaultValue={withdraw.bankName}
                      placeholder={"Bank Name"}
                      className={`outline-none bg-transparent text-[#555] font-semibold text-lg w-full text-center`}
                      readOnly
                    /> */}
                    <Text className="text-[#555] font-semibold text-lg text-center">
                      {withdraw.bankName}
                    </Text>
                  </View>

                  <Svg width="10" height="5" viewBox="0 0 10 5" fill="none">
                    <Path d="M0 0L5 5L10 0H0Z" fill="#555555" />
                  </Svg>
                </TouchableOpacity>
              </View>

              <View className="w-100 p-3 border border-[#DADADA] rounded-[15px] font-normal text-[14px] w-full">
                <TextInput
                  placeholder="Account Number"
                  defaultValue={withdraw.accNo}
                  onChangeText={(e) => setAndSetDetails(e)}
                  className="outline-none bg-transparent text-[#555] text-start w-[100%] h-auto"
                />
              </View>

              <View className="p-3 border border-[#DADADA] rounded-[15px] font-normal text-[14px] w-full">
                <TextInput
                  defaultValue={withdraw.accName}
                  placeholder={` ${loadingAccN ? "..." : "Account Name"}`}
                  onChangeText={(newText) =>
                    setWithdraw((prevWithdraw: any) => ({
                      ...prevWithdraw,
                      accName: newText,
                    }))
                  }
                  className="outline-none bg-transparent text-[#555] text-start w-[100%] h-auto"
                />
              </View>

              <View className="p-3 py-10 border border-[#DADADA] rounded-[15px] font-normal text-[14px] flex w-full">
                <TextInput
                  placeholder="Narration(optional)"
                  onChangeText={(newText) =>
                    setWithdraw((prevWithdraw: any) => ({
                      ...prevWithdraw,
                      details: newText,
                    }))
                  }
                  className="outline-none bg-transparent text-[#555] text-start w-[100%] h-auto"
                />
              </View>
            </View>
          </View>
        </View>

        <View className="flex flex-row justify-center items-center gap-2 w-[90%] mt-3">
          <TouchableOpacity
            onPress={() => addBeneFiciary()}
            className="items-center justify-center  rounded-full border border-[#6E3EFF] mt-10 w-[50%]"
          >
            <Text className="font-bold text-lg text-[#6E3EFF] p-3 ">
              {loading ? "Loading..." : "Save"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => goNext()}
            className="border-2 items-center justify-center bg-[#6E3EFF] rounded-full border-white mt-10 w-[50%]"
          >
            <Text className="text-white font-bold text-lg p-3 ">Continue</Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity
          onPress={() => router.push("/withdrawal/choose")}
          className="border-2 mt-3 items-center justify-center bg-[#6E3EFF] rounded-full w-full border-white"
        >
          <Text className="text-white font-bold text-lg p-3 ">Continue</Text>
        </TouchableOpacity> */}
      </View>
      <SelectBankComp selBank={selBank} setSelBank={setSelBank} />
    </SafeAreaView>
  );
}
