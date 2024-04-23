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
				
				<Text className=' text-2xl font-medium mt-3'>
					What is your email?
				</Text>
				<View className='flex-row items-center border border-[#DADADA] bg-[#F7F5FF]  rounded-full my-4 px-5 w-full'>
					<TextInput
						style={{ height: 60 }}
						placeholder='Enter phone email'
						className='w-full py-2 text-base pl-5'
						keyboardType='default'
						// onChangeText={newText => setText(newText)}
						// defaultValue={text}
					/>
				</View>
				<Text className='text-center text-[#555] text-base'>
					We will use this email to contact you if the need
					arise
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
