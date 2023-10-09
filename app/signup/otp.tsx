/** @format */

import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import OtpInput from '../../components/OtpInput';
import { Link } from 'expo-router';

export default function otp() {
	const [otp, setOtp] = useState(''); // Initialize with an empty string

	// Define your onChange function to update the 'otp' state
	const onChange = (value: string) => setOtp(value);


	return (
		<View className='flex-1 bg-[#FAFAFA] items-center relative px-8'>
			<StatusBar
				animated={true}
				backgroundColor='#6E3EFF'
			/>
			<View className='mt-2 justify-center items-center h-4/5'>
				<Text className=' text-xl font-bold text-[#6E3EFF]'>
					PayBeforeService
				</Text>
				<Text className=' text-2xl text-center font-medium mt-3'>
					Enter the six-digit code we sent to you
				</Text>
						<OtpInput
							value={otp}
							valueLength={6}
							onChange={onChange}
						/>
			
			</View>
			<TouchableOpacity className='border-2 items-center absolute bottom-8 justify-center bg-[#6E3EFF] rounded-full w-full border-white'>
				<Link className='py-3' href='/signup/email'>
					<Text className='text-white font-bold text-lg p-3 '>
						Continue
					</Text>
				</Link>
			</TouchableOpacity>
		</View>
	);
}
