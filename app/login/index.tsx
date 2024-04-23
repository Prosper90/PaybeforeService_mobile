/** @format */

import {
  StatusBar,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SignUp() {
	const [password, setPassword] = useState('');

	// State variable to track password visibility
	const [showPassword, setShowPassword] = useState(false);

	// Function to toggle the password visibility state
	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<View className='flex-1 bg-[#FAFAFA] items-center relative px-8'>
    	<StatusBar
				animated={true}
				backgroundColor='#6E3EFF'
			/>
			<View className='mt-2 justify-center items-center h-4/5 w-full'>
				<View>
					<Text className=' text-xl font-medium text-[#555555] my-3'>
						Email Address
					</Text>
					<View className='flex-row items-center border border-[#DADADA] bg-[#F7F5FF]  rounded-md mb-4 px-4 w-full'>
						<TextInput
							style={{ height: 60 }}
							placeholder='Email address'
							className='w-full py-2 text-base '
							keyboardType='default'
							// onChangeText={newText => setText(newText)}
							// defaultValue={text}
						/>
					</View>
					<Text className='text-xl font-medium text-[#555555] my-3'>
						Password
					</Text>
					<View className='flex-row items-center border relative border-[#DADADA] bg-[#F7F5FF]  rounded-md mb-4 px-4 w-[93%]'>
						<TextInput
							style={{ height: 60 }}
							placeholder='Password'
							secureTextEntry={showPassword ? true : false}
							className='w-full py-2 text-base '
							// keyboardType=''
							// onChangeText={newText => setText(newText)}
							// defaultValue={text}
						/>
						<MaterialCommunityIcons
							name={showPassword ? 'eye-off' : 'eye'}
							size={24}
							className='m absolute  '
							// color="#808080"
							onPress={toggleShowPassword}
						/>
					</View>
					<Link
						href='/login/forget'
						className='text-xl text-right font-medium text-[#6E3EFF] mb-3'>
						Forgot passsword?
					</Link>
				</View>
				<TouchableOpacity className='border-2 items-center  -center bg-[#6E3EFF] rounded-full mt-2 w-full border-white'>
					<Link className='py-3' href='/(dashboard)/home'>
						<Text className='text-white font-bold text-lg p-3 '>
							Login
						</Text>
					</Link>
				</TouchableOpacity>
			</View>
		</View>
	);
}
