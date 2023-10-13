/** @format */

import {
    Image,
	Modal,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import icons from './icons/Icons';

export default function SuccessModal({
	sModal,
	setSModal,
	sMsg,
	sTittle,
}: any) {
	return (
		<Modal
			animationType='slide'
			transparent={true}
			visible={sModal}
			onRequestClose={() => {
				setSModal(!sModal);
			}}>
			<View className='flex-1 px- bg-[#00000039] px-5 justify-center items-center'>
				<View className='bg-white w-full h-2/5 rounded-xl  p-5 justify-center items-center'>
					<Image source={icons.success} className='h-28 w-28' />
					<Text className={`${
							Platform.OS === 'ios' && 'text-sm'
						} text-xl font-semibold mt-5 text-black`}>{sTittle}</Text>
					<Text className={`${
							Platform.OS === 'ios' && 'text-sm'
						} text-lg text-center font-normal mt-2 text-[#555555]`}>{sMsg}</Text>
					<TouchableOpacity
						onPress={() => setSModal(!sModal)}
						className='border-2 mt-3 items-center justify-center bg-[#A23EFF] rounded-full w-2/5 border-white'>
						<Text className='text-white font-bold text-lg p-3 '>
							Okay
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({});
