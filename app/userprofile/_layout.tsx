/** @format */

import { Stack } from 'expo-router/stack';

export default function ProfileLayout() {
	return (
			<Stack>
			<Stack.Screen
				name='index'
					options={{
					headerShown: true,
					headerTitle: 'Personal Information',
					headerStyle: {
						backgroundColor: '#fff',
					},
					headerTitleAlign:'center',
					headerTintColor: '#000',
				}}
			/>
		
		</Stack>
	);
}
