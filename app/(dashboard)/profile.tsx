/** @format */

import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function profile() {
	return (
		<View>
			<StatusBar
				animated={true}
				backgroundColor='#6E3EFF'
			/>
			<Text>profile</Text>
		</View>
	);
}

const styles = StyleSheet.create({});
