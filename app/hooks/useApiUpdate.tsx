import { useContext } from "react";
import { DataContext } from "../../utility/context";
import * as SecureStore from "expo-secure-store";
import { END_URL } from "../../utility/constants";
import { makeCall } from "../../utility/makeCall";
import { ToastAndroid } from "react-native";
import { router } from "expo-router";

const useUpdateProfileAndTransaction = () => {
  const { setUserProfile, setRecentTransactions } = useContext(DataContext);

  const updateProfile = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("tokenKey");
      // setLoading(true);
      const endpoint = `${END_URL}/user/getProfile`;
      console.log(endpoint, "checking endpoint");
      const headers = {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json",
      };
      const response = await makeCall(endpoint, {}, headers, "get");
      // console.log(response, "omo oooh jjjk");
      if (response.status) {
        // Call setUserProfile function here
        setUserProfile(response.data);
      }
    } catch (error) {
      // Error in making the request or server returned an error status
      console.error("Error:", error);
      // setLoading(false);
    }
  };

  const updateTransaction = async () => {
    const storedToken = await SecureStore.getItemAsync("tokenKey");
    // console.log(storedToken, "token key");
    const endpoint = `${END_URL}/transaction/getTx?page=${1}`;
    const headers = {
      Authorization: `Bearer ${storedToken}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await makeCall(endpoint, {}, headers, "get");
      // console.log(response, "inside transaction");
      if (!response.status) {
        if (response.data.message === "invalid token") {
          await SecureStore.setItemAsync("tokenKey", "");
          ToastAndroid.show(`Session expired`, ToastAndroid.SHORT);
          router.push("/login");
          return;
        }
      } else {
        // Call setRecentTransactions function here
        // setAllTxData(response.allTx);
        // setTxLoading(false);
        setRecentTransactions(response.allTx);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { updateProfile, updateTransaction };
};

export default useUpdateProfileAndTransaction;
