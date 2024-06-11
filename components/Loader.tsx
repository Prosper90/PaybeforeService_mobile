import React from "react";
import { Text } from "react-native";
import { Circle } from "react-native-animated-spinkit";

export default function Loader({ textSize, textColor, loaderColor }: any) {
  return <Circle size={40} color={"#A23EFF"} />;
}
