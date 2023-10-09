/** @format */

import {
	StatusBar,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

export default function Login() {
	return (
		<View className='flex-1 bg-[#FAFAFA] items-center relative px-8'>
			<StatusBar
				animated={true}
				backgroundColor='#6E3EFF'
			/>
			<View className='mt-2 justify-center items-center h-4/5'>
				<Text className=' text-2xl font-bold text-[#6E3EFF]'>
					PayBeforeService
				</Text>
				<Text className=' text-2xl font-medium mt-3'>
					Enter your mobile number
				</Text>
				<View className='flex-row items-center border border-[#DADADA] bg-[#F7F5FF]  rounded-full my-4 px-5 w-full'>
					<Text className=' text-base text-gray-500 font-semibold mr-2 '>
						+234
					</Text>
					<TextInput
						style={{ height: 60 }}
						placeholder='Enter phone number'
						className='w-4/5 py-2 text-base border-[#DADADA] border-l pl-5'
						keyboardType='number-pad'
						// onChangeText={newText => setText(newText)}
						// defaultValue={text}
					/>
				</View>
				<Text className='text-center text-[#555] text-base'>
					When you press 'continue,' Swiftsettle will send
					you a text message with a verification code. This
					might cost you some money for messaging and data.
					You can use the verified phone number to log in
				</Text>
			</View>
			<TouchableOpacity className='border-2 items-center absolute bottom-8 justify-center bg-[#6E3EFF] rounded-full w-full border-white'>
				<Link className='py-3' href='/signup/otp'>
					<Text className='text-white font-bold text-lg p-3 '>
						Continue
					</Text>
				</Link>
			</TouchableOpacity>
		</View>
	);
}
