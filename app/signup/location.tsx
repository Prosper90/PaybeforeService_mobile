/** @format */

import {
	Image,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import { Link } from 'expo-router';


export default function location() {
	return (
		<View className='flex-1 bg-[#FAFAFA] items-center relative px-8'>
			<StatusBar
				animated={true}
				backgroundColor='#6E3EFF'
			/>
			<View className='mt-2 justify-center items-center h-4/5'>
				<Image
					className='h-52 w-52 mb-5 object-contain'
					source={require('../../assets/images/location.png')}
				/>
				<Text className=' text-2xl text-center font-medium mt-3'>
					You need to enable location inorder to use
					Swiftsettle
				</Text>
				<Text className=' text-lg text-center  mt-3'>
					You need to enable location inorder to use
					Swiftsettle
				</Text>
			</View>
			<TouchableOpacity className='border-2 items-center absolute bottom-8 justify-center bg-[#6E3EFF] rounded-full w-full border-white'>
				<Link className='py-3' href='/(dashboard)/home'>
					<Text className='text-white font-bold text-lg p-3 '>
						Continue
					</Text>
				</Link>
			</TouchableOpacity>
		</View>
	);
}
