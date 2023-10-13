/** @format */

import {
	Modal,
	Platform,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function WithdrawModal({
	withdrawModal,
	setWithdrawModal,
}: any) {
	return (
		<Modal
			animationType='slide'
			transparent={true}
			visible={withdrawModal}
			onRequestClose={() => {
				setWithdrawModal(!withdrawModal);
			}}>
			
			<View className='flex-1 px- bg-[#00000056] relative justify-center'>
				<View className='h-auto pb-8 items-center pt-5 px-5 rounded-2xl mx-5 bg-white '>
					<TouchableOpacity
						className='absolute right-6 top-3'
						onPress={() =>
							setWithdrawModal(!withdrawModal)
						}>
						<MaterialCommunityIcons
							name={'close'}
							size={20}
							className='m absolute  '
							color='#000'
						/>
					</TouchableOpacity>
					<Text
						className={`${
							Platform.OS === 'ios' && 'text-sm'
						} text-xl font-semibold mt-5 text-black`}>
						Enter Amount
					</Text>
					<Text
						className={`${
							Platform.OS === 'ios' && 'text-sm'
						} text-base font-normal text-center my-2 px-4 text-[#555555]`}>
						Enter the amount you wish to withdraw to your bank account.
					</Text>
					<View className='flex-row items-center border border-[#DADADA] bg-[#F7F5FF]  rounded-full my-4 px-5 w-full'>
						<Text className=' text-base text-gray-500 px-2 font-semibold mr-2 '>
							₦
						</Text>
						<TextInput
							style={{ height: 60 }}
							placeholder='Enter amount'
							className='w-3/5 py-2 text-base border-[#DADADA] border-l pl-5'
							keyboardType='number-pad'
							// onChangeText={newText => setText(newText)}
							// defaultValue={text}
						/>
					</View>
					<TouchableOpacity
						onPress={() =>{ router.push('/payment/choose');
						setWithdrawModal(!withdrawModal)
						}}
						className='border-2 mt-3 items-center justify-center bg-[#6E3EFF] rounded-full w-full border-white'>
						<Text className='text-white font-bold text-lg p-3 '>
							Withdraw
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}
