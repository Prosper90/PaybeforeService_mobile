/** @format */

import {
	Image,
	Platform,
	SafeAreaView,
    Keyboard,
	Text,
	TextInput,
	TouchableOpacity,
	View,
    KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';
import icons from '../../components/icons/Icons';
import SuccessModal from '../../components/SuccessModal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function redeem() {
   const [sModal, setSModal] = useState(false);
    
	return (
		<KeyboardAwareScrollView  className='flex-1 bg-[#fafafa] '>
        
			<View className='p-5'>
				<Text className='text-[#555555] text-base'>
					Enter the redemption code sent to you to receive
					this payment in your main wallet.
				</Text>

				<View className='p-5 border border-[#DADADA] mt-5 rounded-2xl'>
					<View className='flex-row items-center gap-4'>
						<Image
							source={icons.tableSvg}
							className={`${
								Platform.OS === 'ios' && 'h-10 w-10'
							} h-14 w-14`}
						/>
						<Text className='text-base font-medium text-[#000]'>
							Received from client
						</Text>
					</View>
					<View className='flex-row items-center gap-4 justify-between mt-2 px-2'>
						<Text className='text-base font-normal text-[#555555]'>
							Full Name
						</Text>
						<Text className='text-base font-medium text-[#000]'>
							Anonymous
						</Text>
					</View>
					<View className='flex-row items-center gap-4 justify-between mt-2 px-2'>
						<Text className='text-base font-normal text-[#555555]'>
							Date
						</Text>
						<Text className='text-base font-medium text-[#000]'>
							26/7/2023
						</Text>
					</View>
					<View className='flex-row items-center gap-4 justify-between mt-2 px-2'>
						<Text className='text-base font-normal text-[#555555]'>
							Time
						</Text>
						<Text className='text-base font-medium text-[#000]'>
							2.30PM
						</Text>
					</View>
					<View className='flex-row items-center gap-4 justify-between mt-2 px-2'>
						<Text className='text-base font-normal text-[#555555]'>
							Transaction ID
						</Text>
						<Text className='text-base font-medium text-[#000]'>
							567773DTYY373
						</Text>
					</View>
					<View className='flex-row items-center gap-4 justify-between mt-2 px-2'>
						<Text className='text-base font-normal text-[#555555]'>
							Status
						</Text>
						<Text className='text-base font-medium text-[#A23EFF] '>
							<View className='p-1 bg-[#A23EFF] rounded-full'></View>{' '}
							Pending
						</Text>
					</View>
					<View className='flex-row items-center gap-4 justify-between mt-2 px-2'>
						<Text className='text-base font-normal text-[#555555]'>
							Note
						</Text>
						<Text className='text-base font-medium text-[#000]'>
							-
						</Text>
					</View>
					<View className='flex-row items-center gap-4 justify-between mt-2 px-2'>
						<Text className='text-base font-normal text-[#555555]'>
							Amount
						</Text>
						<Text className='text-base font-medium text-[#A23EFF]'>
							₦30,000
						</Text>
					</View>
				</View>
				<Text className='mt-5 mx-1 font-semibold text-[#555555] text-sm'>
					Enter code
				</Text>
				<View className='flex-row items-center border border-[#DADADA] bg-[#fff]  rounded-2xl  my-4 px-5 w-full'>
					<TextInput
						style={{ height: 60 }}
						placeholder='Enter redeem code'
						className='w-full py-2 text-base pl-5'
						keyboardType='default'
						// onChangeText={newText => setText(newText)}
						// defaultValue={text}
					/>
				</View>
				<TouchableOpacity onPress={() => setSModal(true)} className='border-2 items-center justify-center bg-[#6E3EFF] rounded-full w-full border-white'>
						<Text className='text-white font-bold text-lg p-3 '>
							Continue
						</Text>
				</TouchableOpacity>
			</View>
            <SuccessModal sModal={sModal} sMsg="Congratulations, this payment has been sent to your main wallet." sTittle="Congratulations" setSModal={setSModal}/>
		</KeyboardAwareScrollView>
	);
}

//08066294253
