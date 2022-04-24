/* eslint-disable react/display-name */
import { Text } from '@bluebase/components';
import { createPlugin } from '@bluebase/core';
import { DynamicIcon } from '@bluebase/core/dist/components';
import React from 'react';
import { View } from 'react-native';

// Custom component doesn't resepect size in this plugin
export default createPlugin({
	key: 'App 4',
	name: 'Demp App 4',

	icon: {
		component: ({ size }: any) => (
			<View
				style={{
					alignItems: 'center',
					backgroundColor: 'green',
					borderRadius: 50,
					height: size,
					justifyContent: 'center',
					width: size,
				}}
			>
				<DynamicIcon type="icon" name="map" color="white" size={size - 30} />
			</View>
		),
		type: 'component',
	},

	routes: {
		name: 'App4',
		path: '',
		screen: () => <Text>App4</Text>,
	},
});
