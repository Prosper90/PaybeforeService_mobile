import React from "react";
import { Text } from "react-native";
import { Flow } from "react-native-animated-spinkit";

export default function Loading({ textSize, textColor, loaderColor }: any) {
  return (
    <Text className={`text-[${textColor}] font-bold text-${textSize} p-3`}>
      Loading{" "}
      {/* <LoaderKit
        style={{ width: 20, height: 20 }}
        name={"BallPulseSync"} // Optional: see list of animations below
        color={`${loaderColor}`} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
      /> */}
      <Flow size={20} color={`${loaderColor}`} />
    </Text>
  );
}
