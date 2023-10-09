import React, { useMemo } from "react";
import { View, TextInput } from "react-native";

export const RE_DIGIT = new RegExp(/^[a-zA-Z0-9]+$/); // Allow letters (both uppercase and lowercase) and numbers

const OtpInput = ({ value, valueLength, onChange }) => {
  const valueItems = useMemo(() => {
    const valueArray = value.split("");
    const items = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];

      if (RE_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push("");
      }
    }
    return items;
  }, [value, valueLength]);

  const inputOnChange = (text, idx) => {
    const targetValue = RE_DIGIT.test(text) ? text : "";

    const newValue =
      value.substring(0, idx) +
      targetValue +
      value.substring(idx + 1);

    onChange(newValue);
  };

  const inputOnKeyPress = (e, idx) => {
    if (e.nativeEvent.key === "Backspace") {
      if (idx > 0) {
        const previousIdx = idx - 1;
        inputRefs[previousIdx].focus();
        inputOnChange("", previousIdx);
      }
    }
  };

  const inputRefs = [];

  return (
    <View className="flex-row gap-2 my-4">
      {valueItems.map((digit, idx) => (
        <TextInput
          key={idx}
         className='flex-row items-center border border-[#DADADA] bg-[#F7F5FF] justify-center text-center text-lg font-semibold rounded-lg py-3 p px-4 marker: '
          keyboardType="numeric"
          maxLength={1}
          placeholder="-"
          value={digit}
          onChangeText={(text) => inputOnChange(text, idx)}
          onKeyPress={(e) => inputOnKeyPress(e, idx)}
          ref={(ref) => (inputRefs[idx] = ref)}
        />
      ))}
    </View>
  );
};


export default OtpInput;
