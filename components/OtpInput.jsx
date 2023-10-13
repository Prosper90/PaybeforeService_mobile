/** @format */

import React, { useMemo, useRef } from 'react';
import { View, TextInput } from 'react-native';

export const RE_DIGIT = new RegExp(/^[a-zA-Z0-9]+$/);

const OtpInput = ({ value, valueLength, onChange }) => {
	const inputRefs = useRef([]);

	const valueItems = useMemo(() => {
		const valueArray = value.split('');
		const items = [];

		for (let i = 0; i < valueLength; i++) {
			const char = valueArray[i];

			if (RE_DIGIT.test(char)) {
				items.push(char);
			} else {
				items.push('');
			}
		}
		return items;
	}, [value, valueLength]);

	const inputOnChange = (text, idx) => {
		const targetValue = RE_DIGIT.test(text) ? text : '';

		const newValue =
			value.substring(0, idx) +
			targetValue +
			value.substring(idx + 1);

		onChange(newValue);

		if (idx < valueLength - 1 && targetValue !== '') {
			// Move focus to the next input field
			inputRefs.current[idx + 1].focus();
		}
	};

	const inputOnKeyPress = (e, idx) => {
		if (e.nativeEvent.key === 'Backspace') {
			if (idx > 0) {
				const previousIdx = idx - 1;
				inputRefs.current[previousIdx].focus();
				inputOnChange('', previousIdx);
			}
		}
	};

	return (
		<View
			style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				marginTop: 4,
			}}>
			{valueItems.map((digit, idx) => (
				<TextInput
					key={idx}
					className='flex-row items-center mr-2 border border-[#DADADA] bg-[#F7F5FF] justify-center text-center text-lg font-semibold rounded-lg py-3 p px-4 marker: '
					keyboardType='numeric'
					maxLength={1}
					placeholder='-'
					value={digit}
					onChangeText={(text) => inputOnChange(text, idx)}
					onKeyPress={(e) => inputOnKeyPress(e, idx)}
					ref={(ref) => (inputRefs.current[idx] = ref)}
				/>
			))}
		</View>
	);
};

export default OtpInput;
